const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize test data
async function initializeTestData() {
  try {
    // Check if test tenant exists
    let testTenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    if (!testTenant) {
      testTenant = await prisma.tenant.create({
        data: {
          name: 'Test Organization',
          domain: 'test-domain',
          settings: JSON.stringify({ theme: 'light' })
        }
      });
      console.log('✅ Created test tenant:', testTenant.id);
    }

    // Check if test user exists
    let testUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'hashedpassword',
          role: 'ADMIN',
          tenantId: testTenant.id
        }
      });
      console.log('✅ Created test user:', testUser.id);
    }

    // Create some test brands
    const brands = await prisma.brand.findMany({
      where: { tenantId: testTenant.id }
    });

    if (brands.length === 0) {
      await prisma.brand.createMany({
        data: [
          {
            name: 'Merkel & Conner',
            description: 'Law firm specializing in personal injury',
            tenantId: testTenant.id
          },
          {
            name: 'Conner Injury Law',
            description: 'Personal injury law practice',
            tenantId: testTenant.id
          },
          {
            name: 'Power Portraits',
            description: 'Professional photography services',
            tenantId: testTenant.id
          }
        ]
      });
      console.log('✅ Created test brands');
    }

    console.log('🎯 Test data initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing test data:', error);
  }
}

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: '🎉 AI Assistant Backend is working!',
    timestamp: new Date().toISOString(),
    status: 'success',
    version: '1.0.0'
  });
});

// Echo endpoint
app.post('/api/test/echo', (req, res) => {
  res.json({
    message: 'Echo response',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

// AI Assistants endpoints
app.get('/api/ai-assistants', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Test tenant not found' });
    }

    const assistants = await prisma.aIAssistant.findMany({
      where: { tenantId: tenant.id },
      include: {
        brand: true,
        client: true,
        creator: true,
      },
    });
    res.json({
      data: assistants,
      meta: {
        page: 1,
        limit: 10,
        total: assistants.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('Error fetching assistants:', error);
    res.status(500).json({ error: 'Failed to fetch assistants' });
  }
});

app.post('/api/ai-assistants', async (req, res) => {
  try {
    const { name, description, businessType, prompt, settings, brandId, clientId } = req.body;
    
    const tenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Test tenant not found' });
    }

    const user = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });

    if (!user) {
      return res.status(404).json({ error: 'Test user not found' });
    }
    
    const assistant = await prisma.aIAssistant.create({
      data: {
        name,
        description,
        businessType,
        prompt,
        settings: settings ? JSON.stringify(settings) : null,
        brandId,
        clientId,
        createdBy: user.id,
        tenantId: tenant.id,
      },
      include: {
        brand: true,
        client: true,
        creator: true,
      },
    });
    
    res.status(201).json(assistant);
  } catch (error) {
    console.error('Error creating assistant:', error);
    res.status(500).json({ error: 'Failed to create assistant' });
  }
});

app.get('/api/ai-assistants/:id', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Test tenant not found' });
    }

    const assistant = await prisma.aIAssistant.findFirst({
      where: { 
        id: req.params.id, 
        tenantId: tenant.id 
      },
      include: {
        brand: true,
        client: true,
        creator: true,
        chatSessions: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
        businessDocuments: {
          orderBy: { updatedAt: 'desc' },
        },
        aiTasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!assistant) {
      return res.status(404).json({ error: 'AI Assistant not found' });
    }

    res.json(assistant);
  } catch (error) {
    console.error('Error fetching assistant:', error);
    res.status(500).json({ error: 'Failed to fetch assistant' });
  }
});

// Chat sessions
app.post('/api/ai-assistants/chat/sessions', async (req, res) => {
  try {
    const { title, assistantId } = req.body;
    
    const tenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    const user = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });
    
    const session = await prisma.chatSession.create({
      data: {
        title: title || 'New Chat',
        assistantId,
        userId: user.id,
        tenantId: tenant.id,
      },
      include: {
        assistant: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating chat session:', error);
    res.status(500).json({ error: 'Failed to create chat session' });
  }
});

app.post('/api/ai-assistants/chat/messages', async (req, res) => {
  try {
    const { content, sessionId } = req.body;
    
    // Save user message
    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'USER',
        content,
      },
    });

    // Generate AI response (simulated)
    const aiResponse = `I understand your request: "${content}". Let me help you with that.`;
    
    // Save AI response
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ASSISTANT',
        content: aiResponse,
      },
    });

    // Update session timestamp
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });

    res.status(201).json({
      userMessage,
      assistantMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Content generation
app.post('/api/ai-assistants/content/generate', async (req, res) => {
  try {
    const { type, prompt, context, parameters, assistantId } = req.body;
    
    // Simulate AI content generation
    const templates = {
      SOCIAL_POST: `📱 Social Media Post\n\n${prompt}\n\n#marketing #business`,
      BLOG_POST: `📝 Blog Post\n\nTitle: ${prompt}\n\nIntroduction:\nThis is a sample blog post introduction...`,
      AD_COPY: `🎯 Ad Copy\n\nHeadline: ${prompt}\n\nBody: Compelling ad copy that converts...`,
      EMAIL: `📧 Email\n\nSubject: ${prompt}\n\nDear [Recipient],\n\nThis is a sample email content...`,
    };

    const content = templates[type] || `Generated content for ${type}:\n\n${prompt}`;
    
    res.status(201).json({
      type,
      content,
      generatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 AI Assistant Backend running on http://localhost:${PORT}`);
  console.log(`🧪 Test endpoint available at http://localhost:${PORT}/api/test`);
  console.log(`📚 AI Assistants endpoint at http://localhost:${PORT}/api/ai-assistants`);
  
  // Initialize test data
  await initializeTestData();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
