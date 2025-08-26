const ScraperService = require('./services/scraper-service');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const scraperService = new ScraperService();

async function debugScraper() {
  try {
    console.log('🔍 Debugging scraper service...');
    
    // Test individual scraper methods
    console.log('\n1. Testing Google Maps scraper...');
    const googleLeads = await scraperService.scrapeGoogleMaps('Technology', 'San Francisco, CA');
    console.log('Google Maps leads:', googleLeads);
    
    console.log('\n2. Testing Yelp scraper...');
    const yelpLeads = await scraperService.scrapeYelp('Technology', 'San Francisco, CA');
    console.log('Yelp leads:', yelpLeads);
    
    console.log('\n3. Testing Yellow Pages scraper...');
    const yellowPagesLeads = await scraperService.scrapeYellowPages('Technology', 'San Francisco, CA');
    console.log('Yellow Pages leads:', yellowPagesLeads);
    
    console.log('\n4. Testing LinkedIn scraper...');
    const linkedinLeads = await scraperService.scrapeLinkedIn('Technology', 'San Francisco, CA');
    console.log('LinkedIn leads:', linkedinLeads);
    
    // Combine all leads
    const allLeads = [...googleLeads, ...yelpLeads, ...yellowPagesLeads, ...linkedinLeads];
    console.log('\n5. All leads before cleaning:', allLeads);
    
    // Test cleaning
    console.log('\n6. Testing lead cleaning...');
    const cleanedLeads = scraperService.cleanAndDeduplicateLeads(allLeads);
    console.log('Cleaned leads:', cleanedLeads);
    
    // Test saving
    if (cleanedLeads.length > 0) {
      console.log('\n7. Testing lead saving...');
      
      // Create a test job
      const job = await prisma.scrapeJob.create({
        data: {
          name: 'Debug Test Job',
          industry: 'Technology',
          location: 'San Francisco, CA',
          status: 'PENDING',
          progress: 0,
          createdBy: 'cmerrwet60002lu56r2kv69mp',
          tenantId: 'cmerrwet40000lu567mne69ly'
        }
      });
      
      await scraperService.saveLeads(cleanedLeads, job.id, 'cmerrwet40000lu567mne69ly');
      
      // Check if leads were saved
      const savedLeads = await prisma.businessLead.findMany({
        where: { scrapeJobId: job.id }
      });
      
      console.log('Saved leads:', savedLeads);
      
      // Clean up
      await prisma.businessLead.deleteMany({
        where: { scrapeJobId: job.id }
      });
      
      await prisma.scrapeJob.delete({
        where: { id: job.id }
      });
    }
    
    console.log('\n✅ Debug completed');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugScraper();
