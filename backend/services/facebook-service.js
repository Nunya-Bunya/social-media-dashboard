const axios = require('axios');
const config = require('../config/social-media');

class FacebookService {
  constructor() {
    this.baseUrl = config.facebook.graphApiUrl;
    this.apiVersion = config.facebook.apiVersion;
  }

  // Get Facebook Pages for a user
  async getPages(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.apiVersion}/me/accounts`, {
        params: {
          access_token: accessToken,
          fields: 'id,name,access_token,category,fan_count,picture'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching Facebook pages:', error.response?.data || error.message);
      throw new Error('Failed to fetch Facebook pages');
    }
  }

  // Get Instagram Business Account connected to a Facebook Page
  async getInstagramAccount(pageId, pageAccessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.apiVersion}/${pageId}`, {
        params: {
          access_token: pageAccessToken,
          fields: 'instagram_business_account{id,username,name,profile_picture_url,followers_count,media_count}'
        }
      });
      return response.data.instagram_business_account;
    } catch (error) {
      console.error('Error fetching Instagram account:', error.response?.data || error.message);
      return null;
    }
  }

  // Create a Facebook Page Post
  async createPagePost(pageId, pageAccessToken, postData) {
    try {
      const { message, link, imageUrl } = postData;
      const postParams = {
        access_token: pageAccessToken,
        message
      };

      if (link) postParams.link = link;
      if (imageUrl) postParams.url = imageUrl;

      const response = await axios.post(
        `${this.baseUrl}/${this.apiVersion}/${pageId}/feed`,
        postParams
      );

      return {
        id: response.data.id,
        message,
        link,
        imageUrl,
        platform: 'facebook',
        status: 'published'
      };
    } catch (error) {
      console.error('Error creating Facebook post:', error.response?.data || error.message);
      throw new Error('Failed to create Facebook post');
    }
  }

  // Create an Instagram Post
  async createInstagramPost(instagramAccountId, pageAccessToken, postData) {
    try {
      const { imageUrl, caption, location } = postData;

      // First, create a media container
      const mediaResponse = await axios.post(
        `${this.baseUrl}/${this.apiVersion}/${instagramAccountId}/media`,
        {
          access_token: pageAccessToken,
          image_url: imageUrl,
          caption: caption || '',
          location_id: location || null
        }
      );

      const mediaId = mediaResponse.data.id;

      // Then publish the media
      const publishResponse = await axios.post(
        `${this.baseUrl}/${this.apiVersion}/${instagramAccountId}/media_publish`,
        {
          access_token: pageAccessToken,
          creation_id: mediaId
        }
      );

      return {
        id: publishResponse.data.id,
        mediaId,
        caption,
        imageUrl,
        platform: 'instagram',
        status: 'published'
      };
    } catch (error) {
      console.error('Error creating Instagram post:', error.response?.data || error.message);
      throw new Error('Failed to create Instagram post');
    }
  }

  // Get Instagram Media Insights
  async getInstagramInsights(mediaId, pageAccessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.apiVersion}/${mediaId}/insights`, {
        params: {
          access_token: pageAccessToken,
          metric: 'impressions,reach,engagement,saved'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching Instagram insights:', error.response?.data || error.message);
      return [];
    }
  }

  // Get Facebook Page Insights
  async getPageInsights(pageId, pageAccessToken, metrics = ['page_impressions', 'page_engaged_users']) {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.apiVersion}/${pageId}/insights`, {
        params: {
          access_token: pageAccessToken,
          metric: metrics.join(','),
          period: 'day'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching page insights:', error.response?.data || error.message);
      return [];
    }
  }

  // Validate Access Token
  async validateToken(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.apiVersion}/me`, {
        params: {
          access_token: accessToken,
          fields: 'id,name,email'
        }
      });
      return {
        valid: true,
        user: response.data
      };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.error?.message || 'Invalid token'
      };
    }
  }
}

module.exports = new FacebookService();


