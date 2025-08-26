"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CampaignTemplatesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let CampaignTemplatesService = CampaignTemplatesService_1 = class CampaignTemplatesService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CampaignTemplatesService_1.name);
    }
    async createTemplate(templateDto) {
        const template = await this.prisma.campaignTemplate.create({
            data: templateDto,
        });
        this.logger.log(`Campaign template created: ${template.name}`);
        return template;
    }
    async getTemplates(filters) {
        const where = { ...filters };
        const templates = await this.prisma.campaignTemplate.findMany({
            where,
            orderBy: { usageCount: 'desc' },
        });
        return templates;
    }
    async getTemplate(id) {
        const template = await this.prisma.campaignTemplate.findUnique({
            where: { id },
        });
        if (!template) {
            throw new Error('Campaign template not found');
        }
        return template;
    }
    async updateTemplate(id, templateDto) {
        const template = await this.prisma.campaignTemplate.update({
            where: { id },
            data: templateDto,
        });
        this.logger.log(`Campaign template updated: ${template.name}`);
        return template;
    }
    async deleteTemplate(id) {
        const template = await this.prisma.campaignTemplate.delete({
            where: { id },
        });
        this.logger.log(`Campaign template deleted: ${template.name}`);
        return template;
    }
    async getTemplateSuggestions(goal, type, budget) {
        const where = { goal, isActive: true };
        if (type)
            where.type = type;
        const templates = await this.prisma.campaignTemplate.findMany({
            where,
            orderBy: { usageCount: 'desc' },
        });
        const scoredTemplates = templates.map(template => ({
            ...template,
            score: this.calculateTemplateScore(template, goal, type, budget),
        }));
        return scoredTemplates
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }
    async incrementUsageCount(templateId) {
        await this.prisma.campaignTemplate.update({
            where: { id: templateId },
            data: {
                usageCount: {
                    increment: 1,
                },
            },
        });
    }
    async seedDefaultTemplates() {
        const defaultTemplates = this.getDefaultTemplates();
        for (const template of defaultTemplates) {
            const existing = await this.prisma.campaignTemplate.findFirst({
                where: { name: template.name },
            });
            if (!existing) {
                await this.prisma.campaignTemplate.create({
                    data: template,
                });
                this.logger.log(`Seeded template: ${template.name}`);
            }
        }
    }
    calculateTemplateScore(template, goal, type, budget) {
        let score = 0;
        if (template.goal === goal)
            score += 10;
        if (type && template.type === type)
            score += 5;
        score += Math.min(template.usageCount / 10, 5);
        if (budget && template.settings?.estimatedBudget) {
            const budgetDiff = Math.abs(budget - template.settings.estimatedBudget);
            const budgetScore = Math.max(0, 5 - (budgetDiff / 1000));
            score += budgetScore;
        }
        return score;
    }
    getDefaultTemplates() {
        return [
            {
                name: 'TikTok UGC Challenge',
                description: 'User-generated content challenge to boost brand awareness and engagement',
                type: 'SOCIAL_MEDIA',
                goal: 'BRAND_AWARENESS',
                category: 'Social Media',
                structure: {
                    phases: ['Preparation', 'Launch', 'Amplification', 'Analysis'],
                    duration: '30 days',
                    platforms: ['TikTok', 'Instagram', 'Twitter'],
                },
                content: {
                    hashtag: '#BrandChallenge',
                    videoFormat: '15-60 second vertical videos',
                    callToAction: 'Create and share your own version',
                    prizes: 'Featured on brand page + gift cards',
                },
                assets: {
                    required: ['Brand guidelines', 'Example videos', 'Hashtag graphics'],
                    optional: ['Influencer partnerships', 'Paid promotion'],
                },
                settings: {
                    estimatedBudget: 5000,
                    targetAudience: 'Gen Z and Millennials',
                    successMetrics: ['Reach', 'Engagement', 'UGC submissions'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Instagram Reels Blitz',
                description: 'High-frequency Instagram Reels campaign to maximize reach and engagement',
                type: 'SOCIAL_MEDIA',
                goal: 'BRAND_AWARENESS',
                category: 'Social Media',
                structure: {
                    phases: ['Content Creation', 'Daily Posting', 'Engagement', 'Analysis'],
                    duration: '21 days',
                    platforms: ['Instagram', 'Facebook'],
                },
                content: {
                    frequency: 'Daily Reels',
                    themes: ['Behind the scenes', 'Product demos', 'User testimonials'],
                    hashtags: 'Mix of branded and trending hashtags',
                },
                assets: {
                    required: ['21 Reels', 'Hashtag strategy', 'Engagement plan'],
                    optional: ['Influencer collaborations', 'Paid boosts'],
                },
                settings: {
                    estimatedBudget: 3000,
                    targetAudience: 'Instagram users 18-45',
                    successMetrics: ['Reach', 'Engagement rate', 'Follower growth'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'LinkedIn Lead Gen Funnel',
                description: 'Professional lead generation campaign using LinkedIn ads and content',
                type: 'PAID_ADVERTISING',
                goal: 'LEAD_GENERATION',
                category: 'B2B Marketing',
                structure: {
                    phases: ['Audience Building', 'Content Creation', 'Ad Launch', 'Lead Nurturing'],
                    duration: '60 days',
                    platforms: ['LinkedIn', 'Email'],
                },
                content: {
                    adTypes: ['Sponsored Content', 'Message Ads', 'Dynamic Ads'],
                    content: ['Industry insights', 'Case studies', 'Expert interviews'],
                    leadMagnets: ['Whitepapers', 'Webinars', 'Free consultations'],
                },
                assets: {
                    required: ['LinkedIn Company Page', 'Lead forms', 'Nurture sequences'],
                    optional: ['Sales team integration', 'CRM automation'],
                },
                settings: {
                    estimatedBudget: 8000,
                    targetAudience: 'B2B professionals, decision makers',
                    successMetrics: ['Lead quality', 'Cost per lead', 'Conversion rate'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Email Welcome Series',
                description: '3-part email sequence to convert subscribers into engaged leads',
                type: 'EMAIL_MARKETING',
                goal: 'LEAD_GENERATION',
                category: 'Email Marketing',
                structure: {
                    phases: ['Welcome', 'Value Delivery', 'Conversion'],
                    duration: '7 days',
                    platforms: ['Email'],
                },
                content: {
                    email1: 'Welcome and set expectations',
                    email2: 'Deliver valuable content',
                    email3: 'Call to action and conversion',
                },
                assets: {
                    required: ['Email templates', 'Landing pages', 'Tracking setup'],
                    optional: ['Personalization', 'A/B testing'],
                },
                settings: {
                    estimatedBudget: 1000,
                    targetAudience: 'Email subscribers',
                    successMetrics: ['Open rate', 'Click rate', 'Conversion rate'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Retargeting Conversion Campaign',
                description: 'Multi-platform retargeting campaign to convert warm leads',
                type: 'PAID_ADVERTISING',
                goal: 'SALES_CONVERSION',
                category: 'Performance Marketing',
                structure: {
                    phases: ['Audience Segmentation', 'Creative Development', 'Multi-Platform Launch', 'Optimization'],
                    duration: '45 days',
                    platforms: ['Facebook', 'Google Ads', 'Instagram'],
                },
                content: {
                    adTypes: ['Dynamic Product Ads', 'Carousel Ads', 'Video Ads'],
                    messaging: 'Personalized offers, social proof, urgency',
                    landingPages: 'High-converting, mobile-optimized',
                },
                assets: {
                    required: ['Product catalog', 'Customer data', 'High-converting creatives'],
                    optional: ['Advanced tracking', 'Automation tools'],
                },
                settings: {
                    estimatedBudget: 12000,
                    targetAudience: 'Website visitors, cart abandoners',
                    successMetrics: ['ROAS', 'Conversion rate', 'Cost per acquisition'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: '30-Day Blog Sprint',
                description: 'Intensive content creation campaign to boost SEO rankings',
                type: 'SEO_OPTIMIZATION',
                goal: 'SEO_RANKING',
                category: 'Content Marketing',
                structure: {
                    phases: ['Keyword Research', 'Content Creation', 'Publishing', 'Promotion'],
                    duration: '30 days',
                    platforms: ['Website', 'Social Media', 'Email'],
                },
                content: {
                    frequency: 'Daily blog posts',
                    topics: 'Long-tail keywords, trending topics, evergreen content',
                    optimization: 'On-page SEO, internal linking, meta descriptions',
                },
                assets: {
                    required: ['Content calendar', 'SEO tools', 'Promotion strategy'],
                    optional: ['Guest posting', 'Influencer outreach'],
                },
                settings: {
                    estimatedBudget: 4000,
                    targetAudience: 'Search engine users',
                    successMetrics: ['Organic traffic', 'Keyword rankings', 'Backlinks'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Loyalty Program Launch',
                description: 'Customer retention campaign through loyalty rewards and exclusive offers',
                type: 'EMAIL_MARKETING',
                goal: 'CUSTOMER_RETENTION',
                category: 'Customer Marketing',
                structure: {
                    phases: ['Program Design', 'Customer Communication', 'Launch', 'Engagement'],
                    duration: '90 days',
                    platforms: ['Email', 'Website', 'Mobile App'],
                },
                content: {
                    program: 'Points system, tiers, exclusive benefits',
                    communication: 'Welcome series, progress updates, exclusive offers',
                    engagement: 'Gamification, social sharing, referrals',
                },
                assets: {
                    required: ['Loyalty platform', 'Email sequences', 'Reward catalog'],
                    optional: ['Mobile app', 'Social integration'],
                },
                settings: {
                    estimatedBudget: 6000,
                    targetAudience: 'Existing customers',
                    successMetrics: ['Retention rate', 'Lifetime value', 'Engagement'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Weekly Client Update Videos',
                description: 'AI-generated personalized video updates for each client',
                type: 'VIDEO_CONTENT',
                goal: 'CUSTOMER_RETENTION',
                category: 'Video Marketing',
                structure: {
                    phases: ['Data Collection', 'AI Generation', 'Personalization', 'Distribution'],
                    duration: 'Ongoing',
                    platforms: ['Email', 'Client Portal', 'Social Media'],
                },
                content: {
                    format: '30-60 second personalized videos',
                    elements: 'Campaign performance, insights, recommendations',
                    personalization: 'Client name, brand colors, specific metrics',
                },
                assets: {
                    required: ['AI video platform', 'Performance data', 'Brand assets'],
                    optional: ['Voice customization', 'Advanced analytics'],
                },
                settings: {
                    estimatedBudget: 2000,
                    targetAudience: 'Existing clients',
                    successMetrics: ['Engagement', 'Client satisfaction', 'Retention'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Direct Mail Postcard Campaign',
                description: 'Targeted print campaign for local businesses and high-value prospects',
                type: 'PRINT_MEDIA',
                goal: 'LEAD_GENERATION',
                category: 'Traditional Marketing',
                structure: {
                    phases: ['List Building', 'Design', 'Printing', 'Distribution', 'Follow-up'],
                    duration: '45 days',
                    platforms: ['Direct Mail', 'Email', 'Phone'],
                },
                content: {
                    design: 'Eye-catching visuals, clear value proposition, strong CTA',
                    messaging: 'Local focus, special offers, urgency',
                    followUp: 'Email sequence, phone calls, retargeting ads',
                },
                assets: {
                    required: ['Mailing list', 'Postcard design', 'Follow-up system'],
                    optional: ['QR codes', 'Personalization', 'Tracking'],
                },
                settings: {
                    estimatedBudget: 7000,
                    targetAudience: 'Local prospects, high-value customers',
                    successMetrics: ['Response rate', 'Cost per lead', 'Conversion rate'],
                },
                isActive: true,
                usageCount: 0,
            },
            {
                name: 'Micro-Influencer Collaboration',
                description: 'Authentic influencer partnerships for targeted audience reach',
                type: 'INFLUENCER_MARKETING',
                goal: 'BRAND_AWARENESS',
                category: 'Influencer Marketing',
                structure: {
                    phases: ['Influencer Research', 'Outreach', 'Content Creation', 'Amplification'],
                    duration: '60 days',
                    platforms: ['Instagram', 'TikTok', 'YouTube'],
                },
                content: {
                    collaboration: 'Sponsored posts, stories, videos, takeovers',
                    authenticity: 'Genuine product reviews, behind-the-scenes, tutorials',
                    amplification: 'Brand reposts, influencer cross-promotion',
                },
                assets: {
                    required: ['Influencer database', 'Partnership agreements', 'Content guidelines'],
                    optional: ['Product seeding', 'Event collaborations'],
                },
                settings: {
                    estimatedBudget: 10000,
                    targetAudience: 'Influencer followers, niche communities',
                    successMetrics: ['Reach', 'Engagement', 'Brand sentiment'],
                },
                isActive: true,
                usageCount: 0,
            },
        ];
    }
};
exports.CampaignTemplatesService = CampaignTemplatesService;
exports.CampaignTemplatesService = CampaignTemplatesService = CampaignTemplatesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CampaignTemplatesService);
//# sourceMappingURL=campaign.templates.service.js.map