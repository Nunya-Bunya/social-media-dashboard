const { PrismaClient } = require('@prisma/client');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cron = require('node-cron');

const prisma = new PrismaClient();

class ScraperService {
  constructor() {
    this.browser = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      this.isInitialized = true;
      console.log('✅ Scraper service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize scraper service:', error);
      throw error;
    }
  }

  async createScrapeJob(data) {
    const { name, industry, location, createdBy, tenantId } = data;
    
    try {
      const job = await prisma.scrapeJob.create({
        data: {
          name,
          industry,
          location,
          createdBy,
          tenantId,
          status: 'PENDING'
        }
      });

      console.log(`📋 Created scrape job: ${job.id}`);
      return job;
    } catch (error) {
      console.error('❌ Error creating scrape job:', error);
      throw error;
    }
  }

  async runScrapeJob(jobId) {
    try {
      const job = await prisma.scrapeJob.findUnique({
        where: { id: jobId }
      });

      if (!job) {
        throw new Error('Job not found');
      }

      // Update job status to running
      await prisma.scrapeJob.update({
        where: { id: jobId },
        data: {
          status: 'RUNNING',
          startedAt: new Date(),
          progress: 0
        }
      });

      console.log(`🚀 Starting scrape job: ${job.name}`);

      // Initialize browser if needed
      await this.initialize();

      // Run scrapers for different sources
      const allLeads = [];
      
      // Google Maps scraping
      const googleLeads = await this.scrapeGoogleMaps(job.industry, job.location);
      allLeads.push(...googleLeads);
      await this.updateJobProgress(jobId, 25);

      // Yelp scraping
      const yelpLeads = await this.scrapeYelp(job.industry, job.location);
      allLeads.push(...yelpLeads);
      await this.updateJobProgress(jobId, 50);

      // Yellow Pages scraping
      const yellowPagesLeads = await this.scrapeYellowPages(job.industry, job.location);
      allLeads.push(...yellowPagesLeads);
      await this.updateJobProgress(jobId, 75);

      // LinkedIn scraping (optional)
      const linkedinLeads = await this.scrapeLinkedIn(job.industry, job.location);
      allLeads.push(...linkedinLeads);
      await this.updateJobProgress(jobId, 90);

      // Clean and deduplicate leads
      const cleanedLeads = this.cleanAndDeduplicateLeads(allLeads);
      
      // Save leads to database
      await this.saveLeads(cleanedLeads, jobId, job.tenantId);
      
      // Update job as completed
      await prisma.scrapeJob.update({
        where: { id: jobId },
        data: {
          status: 'COMPLETED',
          progress: 100,
          totalResults: cleanedLeads.length,
          completedAt: new Date()
        }
      });

      console.log(`✅ Scrape job completed: ${cleanedLeads.length} leads found`);
      return cleanedLeads;

    } catch (error) {
      console.error('❌ Error running scrape job:', error);
      
      // Update job as failed
      await prisma.scrapeJob.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          errorMessage: error.message
        }
      });
      
      throw error;
    }
  }

  async scrapeGoogleMaps(industry, location) {
    console.log(`🔍 Scraping Google Maps for ${industry} in ${location}`);
    
    // Return mock data for demo purposes
    const mockResults = [
      {
        businessName: `${industry} Solutions`,
        address: `${location}`,
        phone: '+1 (555) 123-4567',
        website: `https://${industry.toLowerCase().replace(' ', '')}solutions.com`,
        source: 'GOOGLE_MAPS',
        category: industry,
        tags: ['demo', 'mock']
      },
      {
        businessName: `${industry} Professionals`,
        address: `${location}`,
        phone: '+1 (555) 234-5678',
        website: `https://${industry.toLowerCase().replace(' ', '')}pros.com`,
        source: 'GOOGLE_MAPS',
        category: industry,
        tags: ['demo', 'mock']
      },
      {
        businessName: `${industry} Experts`,
        address: `${location}`,
        phone: '+1 (555) 345-6789',
        website: `https://${industry.toLowerCase().replace(' ', '')}experts.com`,
        source: 'GOOGLE_MAPS',
        category: industry,
        tags: ['demo', 'mock']
      }
    ];
    
    console.log(`📊 Found ${mockResults.length} businesses on Google Maps (mock data)`);
    return mockResults;
  }

  async scrapeYelp(industry, location) {
    console.log(`🔍 Scraping Yelp for ${industry} in ${location}`);
    
    // Return mock data for demo purposes
    const mockResults = [
      {
        businessName: `${industry} Services`,
        address: `${location}`,
        phone: '+1 (555) 456-7890',
        website: `https://${industry.toLowerCase().replace(' ', '')}services.com`,
        source: 'YELP',
        category: industry,
        tags: ['demo', 'mock']
      },
      {
        businessName: `${industry} Group`,
        address: `${location}`,
        phone: '+1 (555) 567-8901',
        website: `https://${industry.toLowerCase().replace(' ', '')}group.com`,
        source: 'YELP',
        category: industry,
        tags: ['demo', 'mock']
      }
    ];
    
    console.log(`📊 Found ${mockResults.length} businesses on Yelp (mock data)`);
    return mockResults;
  }

  async scrapeYellowPages(industry, location) {
    console.log(`🔍 Scraping Yellow Pages for ${industry} in ${location}`);
    
    // Return mock data for demo purposes
    const mockResults = [
      {
        businessName: `${industry} Partners`,
        address: `${location}`,
        phone: '+1 (555) 678-9012',
        website: `https://${industry.toLowerCase().replace(' ', '')}partners.com`,
        source: 'YELLOW_PAGES',
        category: industry,
        tags: ['demo', 'mock']
      },
      {
        businessName: `${industry} Associates`,
        address: `${location}`,
        phone: '+1 (555) 789-0123',
        website: `https://${industry.toLowerCase().replace(' ', '')}associates.com`,
        source: 'YELLOW_PAGES',
        category: industry,
        tags: ['demo', 'mock']
      }
    ];
    
    console.log(`📊 Found ${mockResults.length} businesses on Yellow Pages (mock data)`);
    return mockResults;
  }

  async scrapeLinkedIn(industry, location) {
    console.log(`🔍 Scraping LinkedIn for ${industry} in ${location}`);
    
    // Return mock data for demo purposes
    const mockResults = [
      {
        businessName: `${industry} Network`,
        description: `Professional ${industry} services in ${location}`,
        address: location,
        phone: '+1 (555) 890-1234',
        website: `https://${industry.toLowerCase().replace(' ', '')}network.com`,
        source: 'LINKEDIN',
        category: industry,
        tags: ['demo', 'mock']
      },
      {
        businessName: `${industry} Collective`,
        description: `Leading ${industry} solutions provider`,
        address: location,
        phone: '+1 (555) 901-2345',
        website: `https://${industry.toLowerCase().replace(' ', '')}collective.com`,
        source: 'LINKEDIN',
        category: industry,
        tags: ['demo', 'mock']
      }
    ];
    
    console.log(`📊 Found ${mockResults.length} businesses on LinkedIn (mock data)`);
    return mockResults;
  }

  cleanAndDeduplicateLeads(leads) {
    console.log(`🧹 Cleaning and deduplicating ${leads.length} leads`);
    
    const cleanedLeads = leads.map(lead => {
      const cleaned = {
        ...lead,
        businessName: this.cleanBusinessName(lead.businessName),
        phone: this.cleanPhoneNumber(lead.phone),
        email: this.extractEmail(lead.website), // Try to extract email from website
        website: this.cleanWebsite(lead.website),
        address: this.cleanAddress(lead.address)
      };
      console.log(`Cleaned lead:`, cleaned);
      return cleaned;
    }).filter(lead => {
      // Temporarily accept all leads for debugging
      const isValid = lead.businessName && lead.businessName.length > 2;
      console.log(`Lead ${lead.businessName} valid:`, isValid, `phone: ${lead.phone}, email: ${lead.email}, website: ${lead.website}`);
      return isValid;
    });

    // Remove duplicates based on business name and phone
    const uniqueLeads = [];
    const seen = new Set();
    
    cleanedLeads.forEach(lead => {
      const key = `${lead.businessName.toLowerCase()}-${lead.phone || ''}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLeads.push(lead);
      }
    });

    console.log(`✅ Cleaned and deduplicated to ${uniqueLeads.length} leads`);
    return uniqueLeads;
  }

  cleanBusinessName(name) {
    if (!name) return null;
    return name.replace(/[^\w\s&-]/g, '').trim();
  }

  cleanPhoneNumber(phone) {
    if (!phone) return null;
    // Remove all non-digit characters except + and -
    return phone.replace(/[^\d+\-]/g, '');
  }

  extractEmail(website) {
    // This is a placeholder - in a real implementation you'd scrape the website
    // to find contact information
    return null;
  }

  cleanWebsite(website) {
    if (!website) return null;
    if (!website.startsWith('http')) {
      return `https://${website}`;
    }
    return website;
  }

  cleanAddress(address) {
    if (!address) return null;
    return address.replace(/\s+/g, ' ').trim();
  }

  async saveLeads(leads, jobId, tenantId) {
    console.log(`💾 Saving ${leads.length} leads to database`);
    console.log(`Job ID: ${jobId}, Tenant ID: ${tenantId}`);
    
    try {
      const leadData = leads.map(lead => {
        const data = {
          businessName: lead.businessName,
          industry: '', // Will be filled from job
          location: '', // Will be filled from job
          email: lead.email,
          phone: lead.phone,
          website: lead.website,
          address: lead.address,
          category: lead.category,
          tags: lead.tags ? JSON.stringify(lead.tags) : null,
          source: lead.source,
          scrapeJobId: jobId,
          tenantId: tenantId
        };
        console.log(`Lead data to save:`, data);
        return data;
      });

      // Get job details to fill industry and location
      const job = await prisma.scrapeJob.findUnique({
        where: { id: jobId }
      });

      if (job) {
        leadData.forEach(lead => {
          lead.industry = job.industry;
          lead.location = job.location;
        });
      }

      // Save in batches to avoid overwhelming the database
      const batchSize = 50;
      for (let i = 0; i < leadData.length; i += batchSize) {
        const batch = leadData.slice(i, i + batchSize);
        await prisma.businessLead.createMany({
          data: batch
        });
      }

      console.log(`✅ Successfully saved ${leads.length} leads`);
    } catch (error) {
      console.error('❌ Error saving leads:', error);
      throw error;
    }
  }

  async updateJobProgress(jobId, progress) {
    try {
      await prisma.scrapeJob.update({
        where: { id: jobId },
        data: { progress }
      });
    } catch (error) {
      console.error('❌ Error updating job progress:', error);
    }
  }

  async getLeads(filters = {}) {
    const { industry, location, status, page = 1, limit = 50 } = filters;
    
    try {
      const where = {};
      if (industry) where.industry = { contains: industry, mode: 'insensitive' };
      if (location) where.location = { contains: location, mode: 'insensitive' };
      if (status) where.status = status;

      const skip = (page - 1) * limit;
      
      const [leads, total] = await Promise.all([
        prisma.businessLead.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            scrapeJob: true,
            assignedUser: {
              select: { id: true, email: true }
            }
          }
        }),
        prisma.businessLead.count({ where })
      ]);

      return {
        data: leads,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId, status, notes = null) {
    try {
      const lead = await prisma.businessLead.update({
        where: { id: leadId },
        data: {
          status,
          notes: notes || undefined,
          updatedAt: new Date()
        }
      });

      console.log(`✅ Updated lead ${leadId} status to ${status}`);
      return lead;
    } catch (error) {
      console.error('❌ Error updating lead status:', error);
      throw error;
    }
  }

  async exportLeadsCsv(filters = {}) {
    try {
      const where = {};
      if (filters.industry) where.industry = { contains: filters.industry, mode: 'insensitive' };
      if (filters.location) where.location = { contains: filters.location, mode: 'insensitive' };
      if (filters.status) where.status = filters.status;

      const leads = await prisma.businessLead.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });

      // Convert to CSV format
      const csvHeaders = [
        'Business Name',
        'Industry',
        'Location',
        'Email',
        'Phone',
        'Website',
        'Address',
        'Category',
        'Source',
        'Status',
        'Created At'
      ];

      const csvRows = leads.map(lead => [
        lead.businessName,
        lead.industry,
        lead.location,
        lead.email || '',
        lead.phone || '',
        lead.website || '',
        lead.address || '',
        lead.category || '',
        lead.source,
        lead.status,
        lead.createdAt.toISOString()
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      return csvContent;
    } catch (error) {
      console.error('❌ Error exporting leads:', error);
      throw error;
    }
  }

  async getScrapeJobs(filters = {}) {
    const { status, page = 1, limit = 20 } = filters;
    
    try {
      const where = {};
      if (status) where.status = status;

      const skip = (page - 1) * limit;
      
      const [jobs, total] = await Promise.all([
        prisma.scrapeJob.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            creator: {
              select: { id: true, email: true }
            },
            _count: {
              select: { leads: true }
            }
          }
        }),
        prisma.scrapeJob.count({ where })
      ]);

      return {
        data: jobs,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('❌ Error fetching scrape jobs:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.isInitialized = false;
    }
  }
}

module.exports = ScraperService;
