const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { supabase } = require('../lib/supabase');
const facebookService = require('../services/facebook-service');
const linkedinService = require('../services/linkedin-service');
const schedulerService = require('../services/scheduler-service');

const router = express.Router();

// Post immediately to connected platforms
router.post('/publish', authenticateToken, async (req, res) => {
  try {
    const { content, platforms } = req.body;
    const userId = req.user.userId;

    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({ 
        error: 'Content and at least one platform are required' 
      });
    }

    // Get user's social connections
    const { data: connections, error: connectionsError } = await supabase
      .from('social_connections')
      .select('*')
      .eq('user_id', userId)
      .in('platform', platforms);

    if (connectionsError) throw connectionsError;

    if (connections.length === 0) {
      return res.status(400).json({ 
        error: 'No connected accounts found for the specified platforms' 
      });
    }

    const results = [];
    const errors = [];

    // Post to each platform
    for (const connection of connections) {
      try {
        let result;
        
        switch (connection.platform) {
          case 'facebook':
            result = await this.publishToFacebook(connection, content);
            break;
          case 'instagram':
            result = await this.publishToInstagram(connection, content);
            break;
          case 'linkedin':
            result = await this.publishToLinkedIn(connection, content);
            break;
          default:
            throw new Error(`Unsupported platform: ${connection.platform}`);
        }
        
        results.push({
          platform: connection.platform,
          result,
          success: true
        });
      } catch (error) {
        errors.push({
          platform: connection.platform,
          error: error.message,
          success: false
        });
      }
    }

    // Store post in database
    const { data: post, error: postError } = await supabase
      .from('social_posts')
      .insert({
        user_id: userId,
        content,
        platforms: platforms,
        status: errors.length === 0 ? 'published' : 'partial_failure',
        results: { results, errors },
        published_at: new Date().toISOString()
      })
      .select()
      .single();

    if (postError) throw postError;

    res.json({
      message: 'Post published successfully',
      post: {
        id: post.id,
        content,
        platforms,
        results,
        errors,
        status: post.status
      }
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).json({ error: 'Failed to publish post' });
  }
});

// Schedule a post for later publication
router.post('/schedule', authenticateToken, async (req, res) => {
  try {
    const { content, platforms, scheduled_time } = req.body;
    const userId = req.user.userId;

    if (!content || !platforms || !scheduled_time) {
      return res.status(400).json({ 
        error: 'Content, platforms, and scheduled_time are required' 
      });
    }

    // Validate scheduled time
    const scheduledDate = new Date(scheduled_time);
    if (scheduledDate <= new Date()) {
      return res.status(400).json({ 
        error: 'Scheduled time must be in the future' 
      });
    }

    // Get user's social connections
    const { data: connections, error: connectionsError } = await supabase
      .from('social_connections')
      .select('*')
      .eq('user_id', userId)
      .in('platform', platforms);

    if (connectionsError) throw connectionsError;

    if (connections.length === 0) {
      return res.status(400).json({ 
        error: 'No connected accounts found for the specified platforms' 
      });
    }

    // Create scheduled post in database
    const { data: scheduledPost, error: postError } = await supabase
      .from('scheduled_posts')
      .insert({
        user_id: userId,
        content,
        platforms: platforms,
        scheduled_time: scheduledDate.toISOString(),
        status: 'scheduled'
      })
      .select()
      .single();

    if (postError) throw postError;

    // Schedule the post
    await schedulerService.schedulePost(scheduledPost);

    res.json({
      message: 'Post scheduled successfully',
      scheduledPost: {
        id: scheduledPost.id,
        content,
        platforms,
        scheduled_time: scheduledPost.scheduled_time,
        status: scheduledPost.status
      }
    });
  } catch (error) {
    console.error('Error scheduling post:', error);
    res.status(500).json({ error: 'Failed to schedule post' });
  }
});

// Get user's scheduled posts
router.get('/scheduled', authenticateToken, async (req, res) => {
  try {
    const scheduledPosts = await schedulerService.getUserScheduledPosts(req.user.userId);
    res.json({ scheduledPosts });
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled posts' });
  }
});

// Cancel a scheduled post
router.delete('/scheduled/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Verify ownership
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ error: 'Scheduled post not found' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this post' });
    }

    const cancelled = await schedulerService.cancelScheduledPost(id);
    
    if (cancelled) {
      res.json({ message: 'Scheduled post cancelled successfully' });
    } else {
      res.status(500).json({ error: 'Failed to cancel scheduled post' });
    }
  } catch (error) {
    console.error('Error cancelling scheduled post:', error);
    res.status(500).json({ error: 'Failed to cancel scheduled post' });
  }
});

// Reschedule a post
router.put('/scheduled/:id/reschedule', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduled_time } = req.body;
    const userId = req.user.userId;

    if (!scheduled_time) {
      return res.status(400).json({ error: 'New scheduled_time is required' });
    }

    // Validate scheduled time
    const scheduledDate = new Date(scheduled_time);
    if (scheduledDate <= new Date()) {
      return res.status(400).json({ error: 'Scheduled time must be in the future' });
    }

    // Verify ownership
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ error: 'Scheduled post not found' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to reschedule this post' });
    }

    const rescheduled = await schedulerService.reschedulePost(id, scheduledDate.toISOString());
    
    if (rescheduled) {
      res.json({ message: 'Post rescheduled successfully', scheduled_time });
    } else {
      res.status(500).json({ error: 'Failed to reschedule post' });
    }
  } catch (error) {
    console.error('Error rescheduling post:', error);
    res.status(500).json({ error: 'Failed to reschedule post' });
  }
});

// Get posting analytics
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { start_date, end_date } = req.query;

    let query = supabase
      .from('social_posts')
      .select('*')
      .eq('user_id', userId);

    if (start_date) {
      query = query.gte('published_at', start_date);
    }
    if (end_date) {
      query = query.lte('published_at', end_date);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    // Calculate analytics
    const analytics = {
      totalPosts: posts.length,
      successfulPosts: posts.filter(p => p.status === 'published').length,
      failedPosts: posts.filter(p => p.status === 'failed').length,
      partialFailures: posts.filter(p => p.status === 'partial_failure').length,
      platforms: {},
      engagement: {}
    };

    // Platform breakdown
    posts.forEach(post => {
      if (post.results) {
        post.results.forEach(result => {
          if (!analytics.platforms[result.platform]) {
            analytics.platforms[result.platform] = { total: 0, successful: 0, failed: 0 };
          }
          analytics.platforms[result.platform].total++;
          if (result.success) {
            analytics.platforms[result.platform].successful++;
          } else {
            analytics.platforms[result.platform].failed++;
          }
        });
      }
    });

    res.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Helper methods for publishing to different platforms
async function publishToFacebook(connection, content) {
  const { metadata } = connection;
  if (!metadata.pages || metadata.pages.length === 0) {
    throw new Error('No Facebook pages found');
  }
  
  // For now, post to the first page
  const page = metadata.pages[0];
  return await facebookService.createPagePost(page.id, page.access_token, content);
}

async function publishToInstagram(connection, content) {
  const { metadata } = connection;
  if (!metadata.pages || metadata.pages.length === 0) {
    throw new Error('No Facebook pages found for Instagram');
  }
  
  // Find page with Instagram account
  for (const page of metadata.pages) {
    const instagramAccount = await facebookService.getInstagramAccount(page.id, page.access_token);
    if (instagramAccount) {
      return await facebookService.createInstagramPost(instagramAccount.id, page.access_token, content);
    }
  }
  
  throw new Error('No Instagram account found');
}

async function publishToLinkedIn(connection, content) {
  const { metadata } = connection;
  
  if (metadata.companyPages && metadata.companyPages.length > 0) {
    // Post to company page
    const companyPage = metadata.companyPages[0];
    return await linkedinService.createCompanyPost(companyPage.organizationalTarget, connection.access_token, content);
  } else {
    // Post to personal profile
    return await linkedinService.createPersonalPost(connection.access_token, content);
  }
}

module.exports = router;


