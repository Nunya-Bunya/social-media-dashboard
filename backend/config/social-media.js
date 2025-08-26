require('dotenv').config();

module.exports = {
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    apiVersion: 'v18.0',
    graphApiUrl: 'https://graph.facebook.com',
    permissions: ['pages_manage_posts', 'pages_read_engagement', 'instagram_basic', 'instagram_content_publish']
  },
  threads: {
    appId: process.env.THREADS_APP_ID,
    appSecret: process.env.THREADS_APP_SECRET,
    apiVersion: 'v18.0',
    graphApiUrl: 'https://graph.facebook.com',
    permissions: ['instagram_basic', 'instagram_content_publish']
  },
  instagram: {
    apiVersion: 'v18.0',
    graphApiUrl: 'https://graph.facebook.com',
    permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments']
  },
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    apiUrl: 'https://api.linkedin.com/v2',
    permissions: ['w_member_social', 'r_liteprofile']
  },
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    apiUrl: 'https://api.twitter.com/2'
  },
  scheduling: {
    timezone: process.env.DEFAULT_TIMEZONE || 'UTC',
    maxScheduledPosts: 100,
    retryAttempts: 3
  }
};
