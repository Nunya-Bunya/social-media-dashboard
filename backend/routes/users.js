const express = require('express');
const { supabase } = require('../lib/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Search users
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, full_name, bio, avatar_url, created_at')
      .or(`username.ilike.%${q}%,full_name.ilike.%${q}%`)
      .order('username')
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: users.length
      }
    });
  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile by username
router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id,
        username,
        full_name,
        bio,
        avatar_url,
        created_at,
        posts(count),
        followers(count),
        following(count)
      `)
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Follow a user
router.post('/follow/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.userId;

    if (followerId === userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    // Check if already following
    const { data: existingFollow, error: fetchError } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', userId)
      .single();

    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    // Create follow relationship
    const { error } = await supabase
      .from('follows')
      .insert([
        {
          follower_id: followerId,
          following_id: userId,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      throw error;
    }

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unfollow a user
router.delete('/follow/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.userId;

    // Remove follow relationship
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's followers
router.get('/:userId/followers', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: followers, error } = await supabase
      .from('follows')
      .select(`
        follower:users!follows_follower_id_fkey(
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const formattedFollowers = followers.map(f => f.follower);

    res.json({
      followers: formattedFollowers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: formattedFollowers.length
      }
    });
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's following
router.get('/:userId/following', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: following, error } = await supabase
      .from('follows')
      .select(`
        following:users!follows_following_id_fkey(
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const formattedFollowing = following.map(f => f.following);

    res.json({
      following: formattedFollowing,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: formattedFollowing.length
      }
    });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if current user is following another user
router.get('/:userId/following-status', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.userId;

    const { data: follow, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    res.json({ isFollowing: !!follow });
  } catch (error) {
    console.error('Check following status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


