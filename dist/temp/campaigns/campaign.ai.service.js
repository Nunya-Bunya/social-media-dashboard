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
var CampaignAiService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignAiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let CampaignAiService = CampaignAiService_1 = class CampaignAiService {
    constructor(prisma, aiProvider) {
        this.prisma = prisma;
        this.aiProvider = aiProvider;
        this.logger = new common_1.Logger(CampaignAiService_1.name);
    }
    async generateCampaignPlan(generateDto, tenantId) {
        this.logger.log(`Generating campaign plan for ${generateDto.clientName}`);
        try {
            const aiPrompt = this.buildCampaignPrompt(generateDto);
            const campaignPlan = await this.aiProvider.generateScript(aiPrompt, {
                type: 'campaign_plan',
                client: generateDto.clientName,
                business: generateDto.businessType,
                goal: generateDto.primaryGoal,
                budget: generateDto.budgetRange,
                timeline: generateDto.timeline,
            });
            const structuredPlan = this.parseCampaignPlan(campaignPlan, generateDto);
            const savedPlan = await this.saveGeneratedPlan(structuredPlan, generateDto, tenantId);
            return {
                success: true,
                campaignPlan: structuredPlan,
                savedPlanId: savedPlan.id,
                message: 'Campaign plan generated successfully',
            };
        }
        catch (error) {
            this.logger.error('Failed to generate campaign plan:', error);
            throw new Error(`Failed to generate campaign plan: ${error.message}`);
        }
    }
    async generateCampaignAssets(campaignId, assetType, context, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id: campaignId, tenantId },
            include: { brand: true, client: true },
        });
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        const assetPrompt = this.buildAssetPrompt(assetType, campaign, context);
        const generatedAssets = await this.aiProvider.generateCopy(assetPrompt, {
            type: 'campaign_assets',
            campaign: campaign.name,
            assetType,
            brand: campaign.brand.name,
        });
        return {
            success: true,
            assets: generatedAssets,
            assetType,
            campaignId,
        };
    }
    async generateCampaignSuggestions(clientId, brandId, tenantId) {
        const [client, brand, existingCampaigns] = await Promise.all([
            this.prisma.client.findFirst({ where: { id: clientId, tenantId } }),
            this.prisma.brand.findFirst({ where: { id: brandId, tenantId } }),
            this.prisma.campaign.findMany({
                where: { clientId, brandId, tenantId },
                include: { analytics: true, kpis: true }
            }),
        ]);
        if (!client || !brand) {
            throw new Error('Client or brand not found');
        }
        const performanceData = this.analyzeCampaignPerformance(existingCampaigns);
        const suggestionPrompt = this.buildSuggestionPrompt(client, brand, performanceData);
        const suggestions = await this.aiProvider.generateScript(suggestionPrompt, {
            type: 'campaign_suggestions',
            client: client.name,
            brand: brand.name,
            industry: client.industry,
            performance: performanceData,
        });
        return {
            success: true,
            suggestions: this.parseSuggestions(suggestions),
            performanceAnalysis: performanceData,
        };
    }
    async optimizeCampaignContent(campaignId, content, optimizationType, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id: campaignId, tenantId },
            include: { brand: true, targetAudience: true },
        });
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        const optimizationPrompt = this.buildOptimizationPrompt(content, optimizationType, campaign);
        const optimizedContent = await this.aiProvider.optimizeContent(optimizationPrompt);
        return {
            success: true,
            originalContent: content,
            optimizedContent,
            optimizationType,
            campaignId,
        };
    }
    buildCampaignPrompt(generateDto) {
        return `You are an expert AI Marketing Strategist. Generate a comprehensive marketing campaign plan for:

CLIENT: ${generateDto.clientName}
BUSINESS: ${generateDto.businessType}
TARGET AUDIENCE: ${generateDto.targetAudience}
PRIMARY GOAL: ${generateDto.primaryGoal}
BUDGET: ${generateDto.budgetRange}
TIMELINE: ${generateDto.timeline}
PLATFORMS: ${generateDto.preferredPlatforms?.join(', ') || 'All relevant platforms'}

Generate a complete campaign plan that includes:

1. CAMPAIGN OVERVIEW
- Campaign name and tagline
- Purpose and elevator pitch
- Key objectives and success metrics

2. TARGET AUDIENCE ANALYSIS
- Detailed buyer persona
- Pain points and motivations
- Behavioral patterns

3. CAMPAIGN STRATEGY
- Platform selection and rationale
- Content mix (organic vs paid)
- Distribution and retargeting approach

4. CONTENT DELIVERABLES
- Specific content for each platform
- Content calendar and frequency
- Asset requirements

5. TIMELINE & PHASES
- Phase 1 (Days 1-30): Pre-launch and preparation
- Phase 2 (Days 31-60): Launch and execution
- Phase 3 (Days 61-90): Optimization and scaling

6. KPIs & METRICS
- Primary and secondary metrics
- Benchmarks and targets
- Reporting schedule

7. BUDGET ALLOCATION
- Platform budget distribution
- Cost per acquisition targets
- ROI expectations

8. RECOMMENDATIONS
- Upsell opportunities
- Cross-promotion strategies
- Automation tactics

Return the response in this exact JSON format:
{
  "campaignName": "string",
  "tagline": "string",
  "goal": "string",
  "audience": {
    "profile": "string",
    "painPoints": ["string"],
    "motivations": ["string"],
    "behaviors": ["string"]
  },
  "strategy": {
    "platforms": ["string"],
    "contentMix": {
      "organic": "string",
      "paid": "string"
    },
    "approach": "string"
  },
  "deliverables": {
    "platform": ["string"]
  },
  "timeline": {
    "phase1": "string",
    "phase2": "string",
    "phase3": "string"
  },
  "kpis": ["string"],
  "budget": {
    "total": "number",
    "allocation": "object"
  },
  "recommendations": ["string"]
}`;
    }
    buildAssetPrompt(assetType, campaign, context) {
        return `Generate ${assetType} content for the marketing campaign:

CAMPAIGN: ${campaign.name}
GOAL: ${campaign.goal}
TYPE: ${campaign.type}
BRAND: ${campaign.brand.name}
TARGET AUDIENCE: ${JSON.stringify(campaign.targetAudience)}

ASSET TYPE: ${assetType}
CONTEXT: ${JSON.stringify(context)}

Generate high-quality, engaging content that aligns with the campaign objectives and brand voice.`;
    }
    buildSuggestionPrompt(client, brand, performanceData) {
        return `Based on the following data, suggest new marketing campaign ideas:

CLIENT: ${client.name}
INDUSTRY: ${client.industry}
BRAND: ${brand.name}
EXISTING CAMPAIGNS: ${performanceData.totalCampaigns}
AVERAGE PERFORMANCE: ${JSON.stringify(performanceData.averageMetrics)}

Suggest 5 innovative campaign ideas that:
1. Build on successful elements from existing campaigns
2. Target new audience segments
3. Leverage emerging trends
4. Maximize ROI within budget constraints
5. Align with client goals and industry best practices

For each suggestion, include:
- Campaign concept and name
- Target audience
- Expected outcomes
- Platform recommendations
- Budget estimate
- Timeline
- Success metrics`;
    }
    buildOptimizationPrompt(content, optimizationType, campaign) {
        return `Optimize the following content for ${optimizationType}:

ORIGINAL CONTENT: ${content}

CAMPAIGN CONTEXT:
- Goal: ${campaign.goal}
- Type: ${campaign.type}
- Target Audience: ${JSON.stringify(campaign.targetAudience)}
- Brand: ${campaign.brand.name}

OPTIMIZATION TYPE: ${optimizationType}

Optimize the content to:
- Improve engagement and conversion rates
- Align with campaign objectives
- Match target audience preferences
- Maintain brand voice and consistency
- Optimize for the specific platform/channel`;
    }
    parseCampaignPlan(aiResponse, generateDto) {
        try {
            const parsed = JSON.parse(aiResponse);
            return {
                ...parsed,
                generatedAt: new Date(),
                source: 'AI_GENERATION',
                inputData: generateDto,
            };
        }
        catch (error) {
            this.logger.warn('Failed to parse AI response as JSON, creating structured response');
            return {
                campaignName: `AI Generated Campaign for ${generateDto.clientName}`,
                tagline: 'AI-powered marketing campaign',
                goal: generateDto.primaryGoal,
                audience: {
                    profile: generateDto.targetAudience,
                    painPoints: ['To be defined'],
                    motivations: ['To be defined'],
                },
                strategy: {
                    platforms: generateDto.preferredPlatforms || ['Social Media', 'Email', 'SEO'],
                    contentMix: {
                        organic: 'AI-generated content',
                        paid: 'Strategic ad placement',
                    },
                },
                deliverables: {
                    social: ['AI-generated posts', 'Engaging content'],
                    email: ['Automated sequences', 'Personalized campaigns'],
                },
                timeline: {
                    phase1: 'Preparation and asset creation',
                    phase2: 'Launch and execution',
                    phase3: 'Optimization and scaling',
                },
                kpis: ['Reach', 'Engagement', 'Conversions', 'ROI'],
                budget: {
                    total: this.calculateBudget(generateDto.budgetRange),
                    allocation: { social: 40, email: 30, ads: 30 },
                },
                recommendations: ['Focus on high-engagement content', 'Leverage AI for personalization'],
                rawResponse: aiResponse,
                generatedAt: new Date(),
                source: 'AI_GENERATION',
                inputData: generateDto,
            };
        }
    }
    calculateBudget(budgetRange) {
        switch (budgetRange) {
            case 'LOW': return 1000;
            case 'MEDIUM': return 5000;
            case 'HIGH': return 15000;
            default: return 5000;
        }
    }
    analyzeCampaignPerformance(campaigns) {
        if (campaigns.length === 0) {
            return {
                totalCampaigns: 0,
                averageMetrics: {},
                topPerformers: [],
                recommendations: ['Start with basic campaigns to establish baseline'],
            };
        }
        const totalMetrics = campaigns.reduce((acc, campaign) => {
            if (campaign.analytics && campaign.analytics.length > 0) {
                campaign.analytics.forEach((analytics) => {
                    acc.impressions += analytics.impressions || 0;
                    acc.clicks += analytics.clicks || 0;
                    acc.conversions += analytics.conversions || 0;
                    acc.spend += analytics.spend || 0;
                    acc.revenue += analytics.revenue || 0;
                });
            }
            return acc;
        }, { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 });
        const avgMetrics = {
            impressions: totalMetrics.impressions / campaigns.length,
            clicks: totalMetrics.clicks / campaigns.length,
            conversions: totalMetrics.conversions / campaigns.length,
            spend: totalMetrics.spend / campaigns.length,
            revenue: totalMetrics.revenue / campaigns.length,
        };
        if (avgMetrics.impressions > 0) {
            avgMetrics.ctr = (avgMetrics.clicks / avgMetrics.impressions) * 100;
        }
        if (avgMetrics.spend > 0) {
            avgMetrics.roas = avgMetrics.revenue / avgMetrics.spend;
        }
        return {
            totalCampaigns: campaigns.length,
            averageMetrics: avgMetrics,
            topPerformers: campaigns
                .filter(c => c.analytics && c.analytics.length > 0)
                .sort((a, b) => {
                const aRevenue = a.analytics.reduce((sum, analytics) => sum + (analytics.revenue || 0), 0);
                const bRevenue = b.analytics.reduce((sum, analytics) => sum + (analytics.revenue || 0), 0);
                return bRevenue - aRevenue;
            })
                .slice(0, 3)
                .map(c => ({ id: c.id, name: c.name, revenue: c.analytics.reduce((sum, analytics) => sum + (analytics.revenue || 0), 0) })),
            recommendations: this.generatePerformanceRecommendations(avgMetrics),
        };
    }
    generatePerformanceRecommendations(metrics) {
        const recommendations = [];
        if (metrics.ctr < 2) {
            recommendations.push('Improve ad creative and targeting to increase click-through rates');
        }
        if (metrics.roas < 2) {
            recommendations.push('Optimize ad spend allocation and targeting for better ROI');
        }
        if (metrics.conversions < 10) {
            recommendations.push('Focus on conversion rate optimization and landing page improvements');
        }
        if (recommendations.length === 0) {
            recommendations.push('Campaign performance is strong, consider scaling successful strategies');
        }
        return recommendations;
    }
    parseSuggestions(aiResponse) {
        try {
            const parsed = JSON.parse(aiResponse);
            return Array.isArray(parsed) ? parsed : [parsed];
        }
        catch (error) {
            return [
                {
                    concept: 'AI-generated campaign suggestion',
                    targetAudience: 'To be defined',
                    expectedOutcomes: 'Improved engagement and conversions',
                    platforms: ['Social Media', 'Email'],
                    budgetEstimate: 5000,
                    timeline: '90 days',
                    successMetrics: ['Reach', 'Engagement', 'ROI'],
                },
            ];
        }
    }
    async saveGeneratedPlan(plan, generateDto, tenantId) {
        const campaign = await this.prisma.campaign.create({
            data: {
                name: plan.campaignName,
                description: plan.tagline,
                goal: generateDto.primaryGoal,
                type: this.mapGoalToType(generateDto.primaryGoal),
                status: 'DRAFT',
                brandId: generateDto.brandId,
                tenantId,
                createdBy: 'AI_SYSTEM',
                content: plan,
                targetAudience: {
                    profile: plan.audience?.profile,
                    painPoints: plan.audience?.painPoints,
                    motivations: plan.audience?.motivations,
                },
                budget: plan.budget?.total,
                startDate: new Date(),
                endDate: this.calculateEndDate(generateDto.timeline),
            },
        });
        return campaign;
    }
    mapGoalToType(goal) {
        const goalTypeMap = {
            'BRAND_AWARENESS': 'SOCIAL_MEDIA',
            'LEAD_GENERATION': 'EMAIL_MARKETING',
            'SEO_RANKING': 'SEO_OPTIMIZATION',
            'SALES_CONVERSION': 'PAID_ADVERTISING',
            'CUSTOMER_RETENTION': 'EMAIL_MARKETING',
            'TRAFFIC_DRIVE': 'CONTENT_MARKETING',
            'ENGAGEMENT_BOOST': 'SOCIAL_MEDIA',
            'REPUTATION_MANAGEMENT': 'PR_AND_MEDIA',
        };
        return goalTypeMap[goal] || 'CONTENT_MARKETING';
    }
    calculateEndDate(timeline) {
        const now = new Date();
        const days = parseInt(timeline.match(/\d+/)?.[0] || '90');
        const endDate = new Date(now);
        endDate.setDate(now.getDate() + days);
        return endDate;
    }
};
exports.CampaignAiService = CampaignAiService;
exports.CampaignAiService = CampaignAiService = CampaignAiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, Object])
], CampaignAiService);
//# sourceMappingURL=campaign.ai.service.js.map