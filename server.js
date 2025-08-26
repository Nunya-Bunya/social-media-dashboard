const express = require('express')
const path = require('path')
const app = express()

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Serve index.html for all routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`🌍 Health check: http://localhost:${port}/health`)
  console.log(`📱 App: http://localhost:${port}`)
})
