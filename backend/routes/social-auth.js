const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { supabase } = require('../lib/supabase');
const facebookService = require('../services/facebook-service');
const linkedinService = require('../services/linkedin-service');

const router = express.Router();

// Facebook OAuth URL generation
router.get('/facebook/auth-url', authenticateToken, (req, res) => {
  try {
    const config = require('../config/social-media');
    const redirectUri = `${req.protocol}://${req.get('host')}/api/social-auth/facebook/callback`;
    
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${config.facebook.appId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(config.facebook.permissions.join(','))}` +
      `&response_type=code` +
      `&state=${req.user.userId}`;

    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating Facebook auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Facebook OAuth callback
router.get('/facebook/callback', authenticateToken, async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }

    // Exchange code for access token
    const config = require('../config/social-media');
    const redirectUri = `${req.protocol}://${req.get('host')}/api/social-auth/facebook/callback`;
    
    const tokenResponse = await axios.post('https://graph.facebook.com/v18.0/oauth/access_token', {
      client_id: config.facebook.appId,
      client_secret: config.facebook.appSecret,
      redirect_uri: redirectUri,
      code
    });

    const { access_token, expires_in } = tokenResponse.data;

    // Get user's Facebook pages
    const pages = await facebookService.getPages(access_token);
    
    // Store connection in database
    const { data: connection, error } = await supabase
      .from('social_connections')
      .upsert({
        user_id: req.user.userId,
        platform: 'facebook',
        access_token: access_token,
        expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
        platform_user_id: state,
        metadata: { pages }
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Facebook connected successfully',
      connection: {
        id: connection.id,
        platform: connection.platform,
        pages: pages.length,
        expires_at: connection.expires_at
      }
    });
  } catch (error) {
    console.error('Error in Facebook callback:', error);
    res.status(500).json({ error: 'Failed to connect Facebook account' });
  }
});

// LinkedIn OAuth URL generation
router.get('/linkedin/auth-url', authenticateToken, (req, res) => {
  try {
    const config = require('../config/social-media');
    const redirectUri = `${req.protocol}://${req.get('host')}/api/social-auth/linkedin/callback`;
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code` +
      `&client_id=${config.linkedin.clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(config.linkedin.permissions.join(' '))}` +
      `&state=${req.user.userId}`;

    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating LinkedIn auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// LinkedIn OAuth callback
router.get('/linkedin/callback', authenticateToken, async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }

    // Exchange code for access token
    const config = require('../config/social-media');
    const redirectUri = `${req.protocol}://${req.get('host')}/api/social-auth/linkedin/callback`;
    
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: config.linkedin.clientId,
      client_secret: config.linkedin.clientSecret
    });

    const { access_token, expires_in } = tokenResponse.data;

    // Get user's LinkedIn profile and company pages
    const profile = await linkedinService.getProfile(access_token);
    const companyPages = await linkedinService.getCompanyPages(access_token);
    
    // Store connection in database
    const { data: connection, error } = await supabase
      .from('social_connections')
      .upsert({
        user_id: req.user.userId,
        platform: 'linkedin',
        access_token: access_token,
        expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
        platform_user_id: profile.id,
        metadata: { profile, companyPages }
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'LinkedIn connected successfully',
      connection: {
        id: connection.id,
        platform: connection.platform,
        profile: profile.localizedFirstName + ' ' + profile.localizedLastName,
        companyPages: companyPages.length,
        expires_at: connection.expires_at
      }
    });
  } catch (error) {
    console.error('Error in LinkedIn callback:', error);
    res.status(500).json({ error: 'Failed to connect LinkedIn account' });
  }
});

// Get user's connected social media accounts
router.get('/connections', authenticateToken, async (req, res) => {
  try {
    const { data: connections, error } = await supabase
      .from('social_connections')
      .select('*')
      .eq('user_id', req.user.userId);

    if (error) throw error;

    res.json({ connections });
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
});

// Disconnect a social media account
router.delete('/connections/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify ownership
    const { data: connection, error: fetchError } = await supabase
      .from('social_connections')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    if (connection.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to disconnect this account' });
    }

    // Delete connection
    const { error } = await supabase
      .from('social_connections')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Account disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting account:', error);
    res.status(500).json({ error: 'Failed to disconnect account' });
  }
});

// Refresh access token (if expired)
router.post('/connections/:id/refresh', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get connection details
    const { data: connection, error: fetchError } = await supabase
      .from('social_connections')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    if (connection.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to refresh this token' });
    }

    // Check if token is expired
    if (new Date() < new Date(connection.expires_at)) {
      return res.json({ message: 'Token is still valid', connection });
    }

    // For now, return error - token refresh requires user to re-authenticate
    res.status(400).json({ 
      error: 'Token expired', 
      message: 'Please reconnect your account to refresh the token' 
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

module.exports = router;


