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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const campaigns_service_1 = require("./campaigns.service");
const campaign_ai_service_1 = require("./campaign.ai.service");
const campaign_analytics_service_1 = require("./campaign.analytics.service");
const campaign_templates_service_1 = require("./campaign.templates.service");
const campaigns_dto_1 = require("./dto/campaigns.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let CampaignsController = class CampaignsController {
    constructor(campaignsService, campaignAiService, campaignAnalyticsService, campaignTemplatesService) {
        this.campaignsService = campaignsService;
        this.campaignAiService = campaignAiService;
        this.campaignAnalyticsService = campaignAnalyticsService;
        this.campaignTemplatesService = campaignTemplatesService;
    }
    async createCampaign(createCampaignDto, req) {
        return this.campaignsService.createCampaign(createCampaignDto, req.user.tenantId, req.user.id);
    }
    async getCampaigns(pagination, req) {
        return this.campaignsService.getCampaigns(req.user.tenantId, pagination);
    }
    async getCampaign(id, req) {
        return this.campaignsService.getCampaign(id, req.user.tenantId);
    }
    async updateCampaign(id, updateCampaignDto, req) {
        return this.campaignsService.updateCampaign(id, updateCampaignDto, req.user.tenantId);
    }
    async deleteCampaign(id, req) {
        return this.campaignsService.deleteCampaign(id, req.user.tenantId);
    }
    async launchCampaign(id, req) {
        return this.campaignsService.launchCampaign(id, req.user.tenantId);
    }
    async pauseCampaign(id, req) {
        return this.campaignsService.pauseCampaign(id, req.user.tenantId);
    }
    async resumeCampaign(id, req) {
        return this.campaignsService.resumeCampaign(id, req.user.tenantId);
    }
    async completeCampaign(id, req) {
        return this.campaignsService.completeCampaign(id, req.user.tenantId);
    }
    async duplicateCampaign(id, duplicateData, req) {
        return this.campaignsService.duplicateCampaign(id, req.user.tenantId, duplicateData);
    }
    async generateCampaign(generateDto, req) {
        return this.campaignAiService.generateCampaignPlan(generateDto, req.user.tenantId);
    }
    async generateAssets(id, body, req) {
        return this.campaignAiService.generateCampaignAssets(id, body.assetType, body.context, req.user.tenantId);
    }
    async optimizeContent(id, body, req) {
        return this.campaignAiService.optimizeCampaignContent(id, body.content, body.optimizationType, req.user.tenantId);
    }
    async trackKpi(id, kpiDto, req) {
        return this.campaignAnalyticsService.trackKpi(id, kpiDto, req.user.tenantId);
    }
    async trackAnalytics(id, analyticsDto, req) {
        return this.campaignAnalyticsService.trackAnalytics(id, analyticsDto, req.user.tenantId);
    }
    async getCampaignPerformance(id, startDate, endDate, req) {
        const dateRange = startDate && endDate ? {
            start: new Date(startDate),
            end: new Date(endDate),
        } : undefined;
        return this.campaignAnalyticsService.getCampaignPerformance(id, req.user.tenantId, dateRange);
    }
    async generateReport(id, type = 'weekly', req) {
        return this.campaignAnalyticsService.generatePerformanceReport(id, req.user.tenantId, type);
    }
    async getTemplates(type, goal, category) {
        return this.campaignTemplatesService.getTemplates({ type, goal, category });
    }
    async getTemplateSuggestions(goal, type, budget) {
        return this.campaignTemplatesService.getTemplateSuggestions(goal, type, budget);
    }
    async createTemplate(templateDto) {
        return this.campaignTemplatesService.createTemplate(templateDto);
    }
    async getTemplate(id) {
        return this.campaignTemplatesService.getTemplate(id);
    }
    async updateTemplate(id, templateDto) {
        return this.campaignTemplatesService.updateTemplate(id, templateDto);
    }
    async deleteTemplate(id) {
        return this.campaignTemplatesService.deleteTemplate(id);
    }
    async getSuggestions(clientId, brandId, req) {
        return this.campaignAiService.generateCampaignSuggestions(clientId, brandId, req.user.tenantId);
    }
    async getCampaignStats(req) {
        return this.campaignsService.getCampaignStats(req.user.tenantId);
    }
    async getPerformanceInsights(startDate, endDate, req) {
        const dateRange = startDate && endDate ? {
            start: new Date(startDate),
            end: new Date(endDate),
        } : undefined;
        return this.campaignAnalyticsService.getPerformanceInsights(req.user.tenantId, dateRange);
    }
    async getClientCampaigns(clientId, pagination, req) {
        return this.campaignsService.getClientCampaigns(clientId, req.user.tenantId, pagination);
    }
    async getBrandCampaigns(brandId, pagination, req) {
        return this.campaignsService.getBrandCampaigns(brandId, req.user.tenantId, pagination);
    }
    async getClientPerformance(clientId, startDate, endDate, req) {
        const dateRange = startDate && endDate ? {
            start: new Date(startDate),
            end: new Date(endDate),
        } : undefined;
        return this.campaignAnalyticsService.getClientPerformance(clientId, req.user.tenantId, dateRange);
    }
    async seedDefaultTemplates() {
        return this.campaignTemplatesService.seedDefaultTemplates();
    }
};
exports.CampaignsController = CampaignsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campaign' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campaign created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaigns_dto_1.CreateCampaignDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campaigns with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'] }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] }),
    (0, swagger_1.ApiQuery)({ name: 'goal', required: false, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaigns retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaigns", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaign", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, campaigns_dto_1.UpdateCampaignDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "updateCampaign", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "deleteCampaign", null);
__decorate([
    (0, common_1.Post)(':id/launch'),
    (0, swagger_1.ApiOperation)({ summary: 'Launch a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign launched successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Campaign cannot be launched' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "launchCampaign", null);
__decorate([
    (0, common_1.Post)(':id/pause'),
    (0, swagger_1.ApiOperation)({ summary: 'Pause a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign paused successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "pauseCampaign", null);
__decorate([
    (0, common_1.Post)(':id/resume'),
    (0, swagger_1.ApiOperation)({ summary: 'Resume a paused campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign resumed successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "resumeCampaign", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a campaign as completed' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign marked as completed' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "completeCampaign", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, swagger_1.ApiOperation)({ summary: 'Duplicate a campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campaign duplicated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "duplicateCampaign", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate AI-powered campaign plan' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campaign plan generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaigns_dto_1.GenerateCampaignDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "generateCampaign", null);
__decorate([
    (0, common_1.Post)(':id/generate-assets'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate AI-powered campaign assets' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assets generated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "generateAssets", null);
__decorate([
    (0, common_1.Post)(':id/optimize-content'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimize campaign content using AI' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Content optimized successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "optimizeContent", null);
__decorate([
    (0, common_1.Post)(':id/kpis'),
    (0, swagger_1.ApiOperation)({ summary: 'Track campaign KPI' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'KPI tracked successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, campaigns_dto_1.CampaignKpiDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "trackKpi", null);
__decorate([
    (0, common_1.Post)(':id/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Track campaign analytics' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Analytics tracked successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, campaigns_dto_1.CampaignAnalyticsDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "trackAnalytics", null);
__decorate([
    (0, common_1.Get)(':id/performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign performance data' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance data retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaignPerformance", null);
__decorate([
    (0, common_1.Get)(':id/report'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate campaign performance report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report generated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "generateReport", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign templates' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] }),
    (0, swagger_1.ApiQuery)({ name: 'goal', required: false, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Templates retrieved successfully' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('goal')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('templates/suggestions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get template suggestions based on goal and type' }),
    (0, swagger_1.ApiQuery)({ name: 'goal', required: true, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] }),
    (0, swagger_1.ApiQuery)({ name: 'budget', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template suggestions retrieved successfully' }),
    __param(0, (0, common_1.Query)('goal')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('budget')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getTemplateSuggestions", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campaign template' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Template created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaigns_dto_1.CampaignTemplateDto]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific campaign template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getTemplate", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a campaign template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a campaign template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI-powered campaign suggestions' }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Suggestions retrieved successfully' }),
    __param(0, (0, common_1.Query)('clientId')),
    __param(1, (0, common_1.Query)('brandId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getSuggestions", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign statistics overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaignStats", null);
__decorate([
    (0, common_1.Get)('stats/performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tenant performance insights' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance insights retrieved successfully' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getPerformanceInsights", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns for a specific client' }),
    (0, swagger_1.ApiParam)({ name: 'clientId', description: 'Client ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Client campaigns retrieved successfully' }),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getClientCampaigns", null);
__decorate([
    (0, common_1.Get)('brand/:brandId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns for a specific brand' }),
    (0, swagger_1.ApiParam)({ name: 'brandId', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand campaigns retrieved successfully' }),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getBrandCampaigns", null);
__decorate([
    (0, common_1.Get)('client/:clientId/performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get client performance data' }),
    (0, swagger_1.ApiParam)({ name: 'clientId', description: 'Client ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Client performance retrieved successfully' }),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "getClientPerformance", null);
__decorate([
    (0, common_1.Post)('templates/seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed default campaign templates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Default templates seeded successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "seedDefaultTemplates", null);
exports.CampaignsController = CampaignsController = __decorate([
    (0, swagger_1.ApiTags)('campaigns'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('campaigns'),
    __metadata("design:paramtypes", [campaigns_service_1.CampaignsService,
        campaign_ai_service_1.CampaignAiService,
        campaign_analytics_service_1.CampaignAnalyticsService,
        campaign_templates_service_1.CampaignTemplatesService])
], CampaignsController);
//# sourceMappingURL=campaigns.controller.js.map