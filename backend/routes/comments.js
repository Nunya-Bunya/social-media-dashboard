const express = require('express');
const { supabase } = require('../lib/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { post_id, content, parent_id } = req.body;
    const userId = req.user.userId;

    if (!post_id || !content) {
      return res.status(400).json({ error: 'Post ID and content are required' });
    }

    // Check if post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .single();

    if (postError || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // If parent_id is provided, check if parent comment exists
    if (parent_id) {
      const { data: parentComment, error: parentError } = await supabase
        .from('comments')
        .select('id')
        .eq('id', parent_id)
        .single();

      if (parentError || !parentComment) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id,
          user_id: userId,
          content,
          parent_id: parent_id || null,
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
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        users!inner(username, full_name, avatar_url)
      `)
      .eq('post_id', postId)
      .is('parent_id', null) // Only top-level comments
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const { data: replies, error: repliesError } = await supabase
          .from('comments')
          .select(`
            *,
            users!inner(username, full_name, avatar_url)
          `)
          .eq('parent_id', comment.id)
          .order('created_at', { ascending: true });

        if (repliesError) {
          console.error('Error fetching replies:', repliesError);
          return { ...comment, replies: [] };
        }

        return { ...comment, replies: replies || [] };
      })
    );

    res.json({
      comments: commentsWithReplies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: comments.length
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a comment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Check if comment exists and belongs to user
    const { data: existingComment, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this comment' });
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .update({
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        users!inner(username, full_name, avatar_url)
      `)
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a comment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if comment exists and belongs to user
    const { data: existingComment, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    // Delete replies first
    await supabase
      .from('comments')
      .delete()
      .eq('parent_id', id);

    // Delete the comment
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


