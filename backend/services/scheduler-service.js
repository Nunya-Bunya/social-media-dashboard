const cron = require('node-cron');
const moment = require('moment-timezone');
const { supabase } = require('../lib/supabase');
const facebookService = require('./facebook-service');
const linkedinService = require('./linkedin-service');

class SchedulerService {
  constructor() {
    this.scheduledJobs = new Map();
    this.initializeScheduler();
  }

  // Initialize scheduler and load existing scheduled posts
  async initializeScheduler() {
    try {
      // Load all pending scheduled posts from database
      const { data: scheduledPosts, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('status', 'scheduled')
        .gte('scheduled_time', new Date().toISOString());

      if (error) {
        console.error('Error loading scheduled posts:', error);
        return;
      }

      // Schedule each post
      scheduledPosts.forEach(post => {
        this.schedulePost(post);
      });

      console.log(`Loaded ${scheduledPosts.length} scheduled posts`);
    } catch (error) {
      console.error('Error initializing scheduler:', error);
    }
  }

  // Schedule a post for later publication
  async schedulePost(postData) {
    try {
      const { id, scheduled_time, platforms } = postData;
      
      // Parse scheduled time
      const scheduledDate = moment(scheduled_time);
      const now = moment();
      
      if (scheduledDate.isBefore(now)) {
        // Post is already past due, publish immediately
        await this.publishPost(postData);
        return;
      }

      // Calculate delay in milliseconds
      const delay = scheduledDate.diff(now);
      
      // Schedule the job
      const timeoutId = setTimeout(async () => {
        await this.publishPost(postData);
      }, delay);

      // Store the timeout ID for potential cancellation
      this.scheduledJobs.set(id, timeoutId);

      // Update database status
      await supabase
        .from('scheduled_posts')
        .update({ status: 'scheduled' })
        .eq('id', id);

      console.log(`Scheduled post ${id} for ${scheduledDate.format('YYYY-MM-DD HH:mm:ss')}`);
    } catch (error) {
      console.error('Error scheduling post:', error);
    }
  }

  // Publish a post to all specified platforms
  async publishPost(postData) {
    try {
      const { id, content, platforms, user_id } = postData;
      
      const results = [];
      const errors = [];

      // Publish to each platform
      for (const platform of platforms) {
        try {
          let result;
          
          switch (platform.name) {
            case 'facebook':
              result = await this.publishToFacebook(platform, content);
              break;
            case 'instagram':
              result = await this.publishToInstagram(platform, content);
              break;
            case 'linkedin':
              result = await this.publishToLinkedIn(platform, content);
              break;
            default:
              throw new Error(`Unsupported platform: ${platform.name}`);
          }
          
          results.push({
            platform: platform.name,
            result,
            success: true
          });
        } catch (error) {
          errors.push({
            platform: platform.name,
            error: error.message,
            success: false
          });
        }
      }

      // Update database with results
      await this.updatePostStatus(id, results, errors);

      // Remove from scheduled jobs
      this.scheduledJobs.delete(id);

      console.log(`Published post ${id} to ${results.length} platforms`);
      return { results, errors };
    } catch (error) {
      console.error('Error publishing post:', error);
      throw error;
    }
  }

  // Publish to Facebook
  async publishToFacebook(platform, content) {
    const { page_id, access_token } = platform.credentials;
    return await facebookService.createPagePost(page_id, access_token, content);
  }

  // Publish to Instagram
  async publishToInstagram(platform, content) {
    const { instagram_account_id, access_token } = platform.credentials;
    return await facebookService.createInstagramPost(instagram_account_id, access_token, content);
  }

  // Publish to LinkedIn
  async publishToLinkedIn(platform, content) {
    const { access_token, company_id } = platform.credentials;
    
    if (company_id) {
      return await linkedinService.createCompanyPost(company_id, access_token, content);
    } else {
      return await linkedinService.createPersonalPost(access_token, content);
    }
  }

  // Update post status in database
  async updatePostStatus(postId, results, errors) {
    try {
      const status = errors.length === 0 ? 'published' : 'partial_failure';
      const published_at = new Date().toISOString();
      
      await supabase
        .from('scheduled_posts')
        .update({
          status,
          published_at,
          results: { results, errors }
        })
        .eq('id', postId);
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  }

  // Cancel a scheduled post
  async cancelScheduledPost(postId) {
    try {
      const timeoutId = this.scheduledJobs.get(postId);
      if (timeoutId) {
        clearTimeout(timeoutId);
        this.scheduledJobs.delete(postId);
      }

      // Update database status
      await supabase
        .from('scheduled_posts')
        .update({ status: 'cancelled' })
        .eq('id', postId);

      console.log(`Cancelled scheduled post ${postId}`);
      return true;
    } catch (error) {
      console.error('Error cancelling scheduled post:', error);
      return false;
    }
  }

  // Get all scheduled posts for a user
  async getUserScheduledPosts(userId) {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('user_id', userId)
        .order('scheduled_time', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
      return [];
    }
  }

  // Reschedule a post
  async reschedulePost(postId, newScheduledTime) {
    try {
      // Cancel existing schedule
      await this.cancelScheduledPost(postId);
      
      // Update scheduled time in database
      const { error } = await supabase
        .from('scheduled_posts')
        .update({
          scheduled_time: newScheduledTime,
          status: 'scheduled'
        })
        .eq('id', postId);

      if (error) throw error;

      // Get updated post data and reschedule
      const { data: post } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (post) {
        await this.schedulePost(post);
      }

      return true;
    } catch (error) {
      console.error('Error rescheduling post:', error);
      return false;
    }
  }

  // Get scheduler statistics
  async getSchedulerStats() {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('status, created_at');

      if (error) throw error;

      const stats = {
        total: data.length,
        scheduled: data.filter(p => p.status === 'scheduled').length,
        published: data.filter(p => p.status === 'published').length,
        failed: data.filter(p => p.status === 'failed').length,
        cancelled: data.filter(p => p.status === 'cancelled').length
      };

      return stats;
    } catch (error) {
      console.error('Error fetching scheduler stats:', error);
      return null;
    }
  }
}

module.exports = new SchedulerService();


