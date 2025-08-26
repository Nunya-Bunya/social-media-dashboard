const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testLeadSaving() {
  try {
    console.log('🧪 Testing lead saving...');
    
    // Create a test job
    const job = await prisma.scrapeJob.create({
      data: {
        name: 'Test Lead Saving',
        industry: 'Test Industry',
        location: 'Test Location',
        status: 'PENDING',
        progress: 0,
        createdBy: 'cmerrwet60002lu56r2kv69mp',
        tenantId: 'cmerrwet40000lu567mne69ly'
      }
    });
    
    console.log('✅ Created test job:', job.id);
    
    // Try to save a test lead
    const testLead = await prisma.businessLead.create({
      data: {
        businessName: 'Test Business',
        industry: 'Test Industry',
        location: 'Test Location',
        phone: '+1 (555) 123-4567',
        website: 'https://testbusiness.com',
        address: '123 Test St, Test City',
        category: 'Test Category',
        tags: JSON.stringify(['test', 'demo']),
        source: 'GOOGLE_MAPS',
        scrapeJobId: job.id,
        tenantId: 'cmerrwet40000lu567mne69ly'
      }
    });
    
    console.log('✅ Created test lead:', testLead.id);
    
    // Check if lead was saved
    const savedLead = await prisma.businessLead.findUnique({
      where: { id: testLead.id }
    });
    
    console.log('✅ Retrieved saved lead:', savedLead);
    
    // Clean up
    await prisma.businessLead.delete({
      where: { id: testLead.id }
    });
    
    await prisma.scrapeJob.delete({
      where: { id: job.id }
    });
    
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLeadSaving();
