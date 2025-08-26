"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    const tenant = await prisma.tenant.create({
        data: {
            name: 'Nunya Bunya Marketing',
            domain: 'nunyabunya.com',
            settings: {
                theme: 'light',
                timezone: 'America/New_York',
            },
        },
    });
    const user = await prisma.user.create({
        data: {
            email: 'admin@nunyabunya.com',
            password: '$2b$10$example.hash',
            role: 'ADMIN',
            tenantId: tenant.id,
        },
    });
    const businesses = [
        {
            name: 'Merkel & Conner',
            businessType: 'law',
            description: 'Personal injury law firm',
            prompt: 'You are an AI assistant for Merkel & Conner, a personal injury law firm. Help with legal marketing, client communication, and case management.',
        },
        {
            name: 'Conner Injury Law',
            businessType: 'law',
            description: 'Specialized injury law practice',
            prompt: 'You are an AI assistant for Conner Injury Law. Focus on personal injury cases, client intake, and legal marketing strategies.',
        },
        {
            name: 'MBCS',
            businessType: 'consulting',
            description: 'Business consulting services',
            prompt: 'You are an AI assistant for MBCS, a business consulting firm. Help with business strategy, process optimization, and client management.',
        },
        {
            name: 'Nunya Bunya',
            businessType: 'marketing',
            description: 'Marketing agency',
            prompt: 'You are an AI assistant for Nunya Bunya Marketing. Help with campaign management, client strategy, and marketing automation.',
        },
        {
            name: 'Power Portraits',
            businessType: 'photography',
            description: 'Professional photography company',
            prompt: 'You are an AI assistant for Power Portraits. Help with client bookings, portfolio management, and marketing for photography services.',
        },
        {
            name: 'B.C. Media',
            businessType: 'media',
            description: 'Media production company',
            prompt: 'You are an AI assistant for B.C. Media. Help with video production, content creation, and media marketing.',
        },
        {
            name: 'ORCA Awards',
            businessType: 'awards',
            description: 'Award recognition program',
            prompt: 'You are an AI assistant for ORCA Awards. Help with award nominations, event planning, and recognition programs.',
        },
        {
            name: 'Stumpy Tail Catalogue',
            businessType: 'retail',
            description: 'Pet supply retail business',
            prompt: 'You are an AI assistant for Stumpy Tail Catalogue. Help with inventory management, customer service, and e-commerce marketing.',
        },
        {
            name: 'The Conner Store',
            businessType: 'retail',
            description: 'General retail store',
            prompt: 'You are an AI assistant for The Conner Store. Help with retail operations, customer service, and store marketing.',
        },
    ];
    for (const business of businesses) {
        const brand = await prisma.brand.create({
            data: {
                name: business.name,
                website: `https://${business.name.toLowerCase().replace(/\s+/g, '')}.com`,
                logoUrl: `https://example.com/logos/${business.name.toLowerCase().replace(/\s+/g, '')}.png`,
                palette: {
                    primary: '#3B82F6',
                    secondary: '#10B981',
                    accent: '#F59E0B',
                },
                fonts: {
                    primary: 'Inter',
                    secondary: 'Poppins',
                },
                tenantId: tenant.id,
                createdBy: user.id,
            },
        });
        await prisma.aIAssistant.create({
            data: {
                name: `${business.name} Assistant`,
                description: business.description,
                businessType: business.businessType,
                prompt: business.prompt,
                settings: {
                    model: 'gpt-4',
                    temperature: 0.7,
                    maxTokens: 2000,
                },
                isActive: true,
                brandId: brand.id,
                createdBy: user.id,
                tenantId: tenant.id,
            },
        });
    }
    const clients = [
        {
            name: 'John Smith',
            email: 'john@example.com',
            company: 'Smith Enterprises',
            industry: 'Technology',
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            company: 'Johnson Consulting',
            industry: 'Consulting',
        },
        {
            name: 'Mike Davis',
            email: 'mike@example.com',
            company: 'Davis Manufacturing',
            industry: 'Manufacturing',
        },
    ];
    for (const clientData of clients) {
        await prisma.client.create({
            data: {
                ...clientData,
                targetAudience: {
                    age: '25-45',
                    income: '$50k-$100k',
                    interests: ['business', 'technology'],
                },
                budget: 5000,
                goals: ['increase sales', 'brand awareness'],
                tenantId: tenant.id,
            },
        });
    }
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${businesses.length} businesses with AI assistants`);
    console.log(`👥 Created ${clients.length} sample clients`);
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map