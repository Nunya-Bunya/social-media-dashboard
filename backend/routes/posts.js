const express = require('express');
const { supabase } = require('../lib/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, image_url, tags } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: 'Post content is required' });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: userId,
          content,
          image_url: image_url || null,
          tags: tags || [],
          created_at: new Date().toISOString()
        }
      ])
      .select(`
        *,
        users!inner(username, full_name, avatar_url)
      `)
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all posts (with pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, user_id } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('posts')
      .select(`
        *,
        users!inner(username, full_name, avatar_url),
        likes(count),
        comments(count)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: posts, error, count } = await query;

    if (error) {
      throw error;
    }

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || posts.length
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        users!inner(username, full_name, avatar_url),
        likes(count),
        comments(count)
      `)
      .eq('id', id)
      .single();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a post
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, image_url, tags } = req.body;
    const userId = req.user.userId;

    // Check if post exists and belongs to user
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existingPost.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update({
        content: content || undefined,
        image_url: image_url || undefined,
        tags: tags || undefined,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a post
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if post exists and belongs to user
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existingPost.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like/Unlike a post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if already liked
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (error) throw error;

      res.json({ message: 'Post unliked', liked: false });
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert([
          {
            post_id: id,
            user_id: userId,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like/Unlike error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


