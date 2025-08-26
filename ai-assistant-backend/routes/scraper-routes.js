const express = require('express');
const ScraperService = require('../services/scraper-service');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const scraperService = new ScraperService();
const prisma = new PrismaClient();

// Initialize scraper service on startup
scraperService.initialize().catch(console.error);

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const scraperLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many scrape requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/scraper/run - Run a new scrape job
router.post('/run', scraperLimiter, async (req, res) => {
  try {
    const { name, industry, location } = req.body;

    // Validation
    if (!name || !industry || !location) {
      return res.status(400).json({
        error: 'Missing required fields: name, industry, location'
      });
    }

    // Get test tenant and user (for demo purposes)
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

    // Create scrape job
    const job = await scraperService.createScrapeJob({
      name,
      industry,
      location,
      createdBy: user.id,
      tenantId: tenant.id
    });

    // Run the job synchronously for testing
    try {
      await scraperService.runScrapeJob(job.id);
      console.log('✅ Scrape job completed successfully');
    } catch (error) {
      console.error('❌ Scrape job failed:', error);
    }

    res.status(201).json({
      message: 'Scrape job started successfully',
      job: {
        id: job.id,
        name: job.name,
        industry: job.industry,
        location: job.location,
        status: job.status,
        progress: job.progress
      }
    });

  } catch (error) {
    console.error('Error starting scrape job:', error);
    res.status(500).json({ error: 'Failed to start scrape job' });
  }
});

// GET /api/scraper/jobs - List all scrape jobs
router.get('/jobs', async (req, res) => {
  try {
    const { status, page, limit } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (page) filters.page = parseInt(page);
    if (limit) filters.limit = parseInt(limit);

    const jobs = await scraperService.getScrapeJobs(filters);
    res.json(jobs);

  } catch (error) {
    console.error('Error fetching scrape jobs:', error);
    res.status(500).json({ error: 'Failed to fetch scrape jobs' });
  }
});

// GET /api/scraper/jobs/:id - Get specific scrape job
router.get('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.scrapeJob.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, email: true }
        },
        leads: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { leads: true }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ error: 'Scrape job not found' });
    }

    res.json(job);

  } catch (error) {
    console.error('Error fetching scrape job:', error);
    res.status(500).json({ error: 'Failed to fetch scrape job' });
  }
});

// GET /api/leads - List all business leads with filters
router.get('/leads', async (req, res) => {
  try {
    const { industry, location, status, page, limit, source } = req.query;
    
    const filters = {};
    if (industry) filters.industry = industry;
    if (location) filters.location = location;
    if (status) filters.status = status;
    if (page) filters.page = parseInt(page);
    if (limit) filters.limit = parseInt(limit);

    const leads = await scraperService.getLeads(filters);
    res.json(leads);

  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// GET /api/leads/:id - Get specific lead
router.get('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await prisma.businessLead.findUnique({
      where: { id },
      include: {
        scrapeJob: true,
        assignedUser: {
          select: { id: true, email: true }
        }
      }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);

  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// PATCH /api/leads/:id - Update lead status
router.patch('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo } = req.body;

    // Validation
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['NEW', 'CONTACTED', 'FOLLOWED_UP', 'QUALIFIED', 'CLOSED', 'LOST'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = {
      status,
      notes: notes || undefined,
      assignedTo: assignedTo || undefined,
      updatedAt: new Date()
    };

    const lead = await prisma.businessLead.update({
      where: { id },
      data: updateData,
      include: {
        scrapeJob: true,
        assignedUser: {
          select: { id: true, email: true }
        }
      }
    });

    res.json({
      message: 'Lead updated successfully',
      lead
    });

  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// POST /api/leads/:id/assign - Assign lead to user
router.post('/leads/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const lead = await prisma.businessLead.update({
      where: { id },
      data: {
        assignedTo: userId,
        updatedAt: new Date()
      },
      include: {
        assignedUser: {
          select: { id: true, email: true }
        }
      }
    });

    res.json({
      message: 'Lead assigned successfully',
      lead
    });

  } catch (error) {
    console.error('Error assigning lead:', error);
    res.status(500).json({ error: 'Failed to assign lead' });
  }
});

// GET /api/leads/export/csv - Export leads as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const { industry, location, status } = req.query;
    
    const filters = {};
    if (industry) filters.industry = industry;
    if (location) filters.location = location;
    if (status) filters.status = status;

    const csvContent = await scraperService.exportLeadsCsv(filters);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="business-leads.csv"');
    res.send(csvContent);

  } catch (error) {
    console.error('Error exporting leads:', error);
    res.status(500).json({ error: 'Failed to export leads' });
  }
});

// GET /api/scraper/stats - Get scraping statistics
router.get('/stats', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findFirst({
      where: { domain: 'test-domain' }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Test tenant not found' });
    }

    const [
      totalLeads,
      totalJobs,
      leadsByStatus,
      leadsBySource,
      recentJobs
    ] = await Promise.all([
      // Total leads
      prisma.businessLead.count({
        where: { tenantId: tenant.id }
      }),
      
      // Total jobs
      prisma.scrapeJob.count({
        where: { tenantId: tenant.id }
      }),
      
      // Leads by status
      prisma.businessLead.groupBy({
        by: ['status'],
        where: { tenantId: tenant.id },
        _count: { status: true }
      }),
      
      // Leads by source
      prisma.businessLead.groupBy({
        by: ['source'],
        where: { tenantId: tenant.id },
        _count: { source: true }
      }),
      
      // Recent jobs
      prisma.scrapeJob.findMany({
        where: { tenantId: tenant.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { leads: true }
        }
      })
    ]);

    res.json({
      totalLeads,
      totalJobs,
      leadsByStatus: leadsByStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {}),
      leadsBySource: leadsBySource.reduce((acc, item) => {
        acc[item.source] = item._count.source;
        return acc;
      }, {}),
      recentJobs
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// DELETE /api/scraper/jobs/:id - Cancel a scrape job
router.delete('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.scrapeJob.findUnique({
      where: { id }
    });

    if (!job) {
      return res.status(404).json({ error: 'Scrape job not found' });
    }

    if (job.status === 'RUNNING') {
      // Update job status to cancelled
      await prisma.scrapeJob.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date()
        }
      });
    }

    res.json({
      message: 'Scrape job cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling scrape job:', error);
    res.status(500).json({ error: 'Failed to cancel scrape job' });
  }
});

// POST /api/leads/bulk-update - Bulk update lead statuses
router.post('/leads/bulk-update', async (req, res) => {
  try {
    const { leadIds, status, notes } = req.body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({ error: 'Lead IDs array is required' });
    }

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['NEW', 'CONTACTED', 'FOLLOWED_UP', 'QUALIFIED', 'CLOSED', 'LOST'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = {
      status,
      notes: notes || undefined,
      updatedAt: new Date()
    };

    await prisma.businessLead.updateMany({
      where: {
        id: { in: leadIds }
      },
      data: updateData
    });

    res.json({
      message: `Updated ${leadIds.length} leads successfully`
    });

  } catch (error) {
    console.error('Error bulk updating leads:', error);
    res.status(500).json({ error: 'Failed to bulk update leads' });
  }
});

// GET /api/scraper/sources - Get available scraping sources
router.get('/sources', (req, res) => {
  res.json({
    sources: [
      {
        id: 'GOOGLE_MAPS',
        name: 'Google Maps',
        description: 'Business listings from Google Maps',
        enabled: true
      },
      {
        id: 'YELP',
        name: 'Yelp',
        description: 'Business reviews and listings from Yelp',
        enabled: true
      },
      {
        id: 'YELLOW_PAGES',
        name: 'Yellow Pages',
        description: 'Business directory from Yellow Pages AU',
        enabled: true
      },
      {
        id: 'LINKEDIN',
        name: 'LinkedIn',
        description: 'Company profiles from LinkedIn (requires authentication)',
        enabled: false
      }
    ]
  });
});

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Scraper route error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = router;
