const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: '🎉 Test server is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', port: PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});
