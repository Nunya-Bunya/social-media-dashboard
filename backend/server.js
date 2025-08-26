const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');
const socialAuthRoutes = require('./routes/social-auth');
const socialPostingRoutes = require('./routes/social-posting');
const metricsRoutes = require('./routes/metrics');
const prMediaRoutes = require('./routes/pr-media'); // Added PR & Media routes

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/social-auth', socialAuthRoutes);
app.use('/api/social-posting', socialPostingRoutes);
app.use('/api', metricsRoutes);
app.use('/api/pr', prMediaRoutes); // Added PR & Media routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working correctly!',
    features: [
      'User Authentication (Register/Login)',
      'JWT Token Management',
      'Social Media Posts (CRUD)',
      'Comments System',
      'User Following System',
      'Like/Unlike Posts',
      'User Search & Profiles',
      'PR & Media Management (Press Releases, Media Contacts, Journalists)',
      'Media Coverage Tracking & Analytics',
      'Outreach Campaign Management',
      'Advanced PR Analytics & Insights'
    ]
  });
});

// API-only server - frontend runs separately on Next.js dev server
// Frontend should make API calls to this server at http://localhost:3001/api

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📱 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;
