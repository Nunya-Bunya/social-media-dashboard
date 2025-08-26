const axios = require('axios');
const config = require('../config/social-media');

class LinkedInService {
  constructor() {
    this.baseUrl = config.linkedin.apiUrl;
  }

  // Get LinkedIn Profile
  async getProfile(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error.response?.data || error.message);
      throw new Error('Failed to fetch LinkedIn profile');
    }
  }

  // Get LinkedIn Company Pages
  async getCompanyPages(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/organizationalEntityAcls`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          q: 'roleAssignee',
          role: 'ADMINISTRATOR'
        }
      });
      return response.data.elements;
    } catch (error) {
      console.error('Error fetching company pages:', error.response?.data || error.message);
      return [];
    }
  }

  // Create LinkedIn Post (Personal Profile)
  async createPersonalPost(accessToken, postData) {
    try {
      const { text, visibility = 'PUBLIC' } = postData;
      
      const postBody = {
        author: `urn:li:person:${await this.getProfileId(accessToken)}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: text
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': visibility
        }
      };

      const response = await axios.post(
        `${this.baseUrl}/ugcPosts`,
        postBody,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      return {
        id: response.data.id,
        text,
        platform: 'linkedin',
        type: 'personal',
        status: 'published'
      };
    } catch (error) {
      console.error('Error creating LinkedIn post:', error.response?.data || error.message);
      throw new Error('Failed to create LinkedIn post');
    }
  }

  // Create LinkedIn Company Post
  async createCompanyPost(companyId, accessToken, postData) {
    try {
      const { text, visibility = 'PUBLIC' } = postData;
      
      const postBody = {
        author: `urn:li:organization:${companyId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: text
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': visibility
        }
      };

      const response = await axios.post(
        `${this.baseUrl}/ugcPosts`,
        postBody,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      return {
        id: response.data.id,
        text,
        platform: 'linkedin',
        type: 'company',
        companyId,
        status: 'published'
      };
    } catch (error) {
      console.error('Error creating LinkedIn company post:', error.response?.data || error.message);
      throw new Error('Failed to create LinkedIn company post');
    }
  }

  // Get Post Analytics
  async getPostAnalytics(postId, accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/socialMetrics/${postId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching post analytics:', error.response?.data || error.message);
      return null;
    }
  }

  // Validate Access Token
  async validateToken(accessToken) {
    try {
      const profile = await this.getProfile(accessToken);
      return {
        valid: true,
        user: profile
      };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.message || 'Invalid token'
      };
    }
  }

  // Helper method to get profile ID
  async getProfileId(accessToken) {
    const profile = await this.getProfile(accessToken);
    return profile.id;
  }
}

module.exports = new LinkedInService();


