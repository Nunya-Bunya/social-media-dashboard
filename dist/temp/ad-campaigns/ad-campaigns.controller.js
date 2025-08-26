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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdCampaignsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const ad_campaigns_service_1 = require("./ad-campaigns.service");
const ad_campaigns_dto_1 = require("./dto/ad-campaigns.dto");
let AdCampaignsController = class AdCampaignsController {
    constructor(adCampaignsService) {
        this.adCampaignsService = adCampaignsService;
    }
    async createAdCampaign(req, createDto) {
        return this.adCampaignsService.createAdCampaign(req.user.tenantId, req.user.id, createDto);
    }
    async getAdCampaigns(req, query) {
        return this.adCampaignsService.getAdCampaigns(req.user.tenantId, query);
    }
    async getAdCampaign(req, id) {
        return this.adCampaignsService.getAdCampaign(req.user.tenantId, id);
    }
    async updateAdCampaign(req, id, updateDto) {
        return this.adCampaignsService.updateAdCampaign(req.user.tenantId, id, updateDto);
    }
    async deleteAdCampaign(req, id) {
        return this.adCampaignsService.deleteAdCampaign(req.user.tenantId, id);
    }
    async launchAdCampaign(req, id) {
        return this.adCampaignsService.launchAdCampaign(req.user.tenantId, id);
    }
    async pauseAdCampaign(req, id) {
        return this.adCampaignsService.pauseAdCampaign(req.user.tenantId, id);
    }
    async duplicateAdCampaign(req, id) {
        return this.adCampaignsService.duplicateAdCampaign(req.user.tenantId, id);
    }
    async createAdCreative(req, createDto) {
        return this.adCampaignsService.createAdCreative(req.user.tenantId, createDto);
    }
    async getAdCreatives(req, query) {
        return this.adCampaignsService.getAdCreatives(req.user.tenantId, query);
    }
    async getAdCreative(req, id) {
        return this.adCampaignsService.getAdCreative(req.user.tenantId, id);
    }
    async updateAdCreative(req, id, updateDto) {
        return this.adCampaignsService.updateAdCreative(req.user.tenantId, id, updateDto);
    }
    async deleteAdCreative(req, id) {
        return this.adCampaignsService.deleteAdCreative(req.user.tenantId, id);
    }
    async trackAdAnalytics(req, id, analyticsDto) {
        return this.adCampaignsService.trackAdAnalytics(req.user.tenantId, id, analyticsDto);
    }
    async getAdAnalytics(req, id, query) {
        return this.adCampaignsService.getAdAnalytics(req.user.tenantId, id, query);
    }
    async getAnalyticsOverview(req, overviewDto) {
        return this.adCampaignsService.getAnalyticsOverview(req.user.tenantId, overviewDto);
    }
    async createSplitTest(req, createDto) {
        return this.adCampaignsService.createSplitTest(req.user.tenantId, createDto);
    }
    async getSplitTests(req, query) {
        return this.adCampaignsService.getSplitTests(req.user.tenantId, query);
    }
    async getSplitTest(req, id) {
        return this.adCampaignsService.getSplitTest(req.user.tenantId, id);
    }
    async updateSplitTest(req, id, updateDto) {
        return this.adCampaignsService.updateSplitTest(req.user.tenantId, id, updateDto);
    }
    async declareWinner(req, id, body) {
        return this.adCampaignsService.declareWinner(req.user.tenantId, id, body.winner);
    }
    async createSalesFunnel(req, createDto) {
        return this.adCampaignsService.createSalesFunnel(req.user.tenantId, req.user.id, createDto);
    }
    async getSalesFunnels(req, query) {
        return this.adCampaignsService.getSalesFunnels(req.user.tenantId, query);
    }
    async getSalesFunnel(req, id) {
        return this.adCampaignsService.getSalesFunnel(req.user.tenantId, id);
    }
    async updateSalesFunnel(req, id, updateDto) {
        return this.adCampaignsService.updateSalesFunnel(req.user.tenantId, id, updateDto);
    }
    async deleteSalesFunnel(req, id) {
        return this.adCampaignsService.deleteSalesFunnel(req.user.tenantId, id);
    }
    async createIntegration(req, createDto) {
        return this.adCampaignsService.createIntegration(req.user.tenantId, createDto);
    }
    async getIntegrations(req) {
        return this.adCampaignsService.getIntegrations(req.user.tenantId);
    }
    async getIntegration(req, id) {
        return this.adCampaignsService.getIntegration(req.user.tenantId, id);
    }
    async updateIntegration(req, id, updateDto) {
        return this.adCampaignsService.updateIntegration(req.user.tenantId, id, updateDto);
    }
    async deleteIntegration(req, id) {
        return this.adCampaignsService.deleteIntegration(req.user.tenantId, id);
    }
    async syncAnalytics(req, syncDto) {
        return this.adCampaignsService.syncAnalytics(req.user.tenantId, syncDto);
    }
    async getAdCampaignStats(req) {
        return this.adCampaignsService.getAdCampaignStats(req.user.tenantId);
    }
};
exports.AdCampaignsController = AdCampaignsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ad campaign' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campaign created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand or client not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.CreateAdCampaignDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "createAdCampaign", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ad campaigns with filtering' }),
    (0, swagger_1.ApiQuery)({ name: 'platform', required: false, enum: ['FACEBOOK', 'INSTAGRAM', 'GOOGLE_ADS', 'TIKTOK', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'SNAPCHAT', 'PINTEREST'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'] }),
    (0, swagger_1.ApiQuery)({ name: 'adType', required: false, enum: ['IMAGE', 'VIDEO', 'CAROUSEL', 'STORY', 'REEL', 'TEXT'] }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaigns retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdCampaigns", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdCampaign", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.UpdateAdCampaignDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "updateAdCampaign", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "deleteAdCampaign", null);
__decorate([
    (0, common_1.Post)(':id/launch'),
    (0, swagger_1.ApiOperation)({ summary: 'Launch an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign launched successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Campaign cannot be launched' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "launchAdCampaign", null);
__decorate([
    (0, common_1.Post)(':id/pause'),
    (0, swagger_1.ApiOperation)({ summary: 'Pause an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign paused successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Campaign cannot be paused' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "pauseAdCampaign", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, swagger_1.ApiOperation)({ summary: 'Duplicate an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign duplicated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "duplicateAdCampaign", null);
__decorate([
    (0, common_1.Post)('creatives'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ad creative' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Creative created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand or campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.CreateAdCreativeDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "createAdCreative", null);
__decorate([
    (0, common_1.Get)('creatives'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ad creatives with filtering' }),
    (0, swagger_1.ApiQuery)({ name: 'platform', required: false, enum: ['FACEBOOK', 'INSTAGRAM', 'GOOGLE_ADS', 'TIKTOK', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'SNAPCHAT', 'PINTEREST'] }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['IMAGE', 'VIDEO', 'CAROUSEL', 'STORY', 'REEL'] }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'adCampaignId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Creatives retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdCreatives", null);
__decorate([
    (0, common_1.Get)('creatives/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific ad creative' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creative ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Creative retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Creative not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdCreative", null);
__decorate([
    (0, common_1.Put)('creatives/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an ad creative' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creative ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Creative updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Creative not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.UpdateAdCreativeDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "updateAdCreative", null);
__decorate([
    (0, common_1.Delete)('creatives/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an ad creative' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creative ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Creative deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Creative not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "deleteAdCreative", null);
__decorate([
    (0, common_1.Post)(':id/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Track analytics for an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Analytics tracked successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.TrackAdAnalyticsDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "trackAdAnalytics", null);
__decorate([
    (0, common_1.Get)(':id/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get analytics for an ad campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdAnalytics", null);
__decorate([
    (0, common_1.Post)('analytics/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get analytics overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics overview retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.AnalyticsOverviewDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAnalyticsOverview", null);
__decorate([
    (0, common_1.Post)('split-tests'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new split test' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Split test created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.CreateSplitTestDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "createSplitTest", null);
__decorate([
    (0, common_1.Get)('split-tests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all split tests with filtering' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['RUNNING', 'PAUSED', 'COMPLETED', 'CANCELLED'] }),
    (0, swagger_1.ApiQuery)({ name: 'adCampaignId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Split tests retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getSplitTests", null);
__decorate([
    (0, common_1.Get)('split-tests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific split test' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Split test ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Split test retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Split test not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getSplitTest", null);
__decorate([
    (0, common_1.Put)('split-tests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a split test' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Split test ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Split test updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Split test not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.UpdateSplitTestDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "updateSplitTest", null);
__decorate([
    (0, common_1.Post)('split-tests/:id/winner'),
    (0, swagger_1.ApiOperation)({ summary: 'Declare a winner for a split test' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Split test ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Winner declared successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot declare winner' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Split test not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "declareWinner", null);
__decorate([
    (0, common_1.Post)('funnels'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new sales funnel' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sales funnel created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Client not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.CreateSalesFunnelDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "createSalesFunnel", null);
__decorate([
    (0, common_1.Get)('funnels'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all sales funnels with filtering' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'] }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sales funnels retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getSalesFunnels", null);
__decorate([
    (0, common_1.Get)('funnels/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific sales funnel' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Sales funnel ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sales funnel retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sales funnel not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getSalesFunnel", null);
__decorate([
    (0, common_1.Put)('funnels/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a sales funnel' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Sales funnel ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sales funnel updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sales funnel not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.UpdateSalesFunnelDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "updateSalesFunnel", null);
__decorate([
    (0, common_1.Delete)('funnels/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a sales funnel' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Sales funnel ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sales funnel deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sales funnel not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "deleteSalesFunnel", null);
__decorate([
    (0, common_1.Post)('integrations'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Integration created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.CreateIntegrationDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "createIntegration", null);
__decorate([
    (0, common_1.Get)('integrations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all platform integrations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integrations retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getIntegrations", null);
__decorate([
    (0, common_1.Get)('integrations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific platform integration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Integration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Integration not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getIntegration", null);
__decorate([
    (0, common_1.Put)('integrations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a platform integration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Integration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Integration not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ad_campaigns_dto_1.UpdateIntegrationDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "updateIntegration", null);
__decorate([
    (0, common_1.Delete)('integrations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a platform integration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Integration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Integration not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "deleteIntegration", null);
__decorate([
    (0, common_1.Post)('sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Sync analytics from platform APIs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics synced successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ad_campaigns_dto_1.SyncAnalyticsDto]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "syncAnalytics", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ad campaign statistics overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdCampaignsController.prototype, "getAdCampaignStats", null);
exports.AdCampaignsController = AdCampaignsController = __decorate([
    (0, swagger_1.ApiTags)('Ad Campaigns'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ad-campaigns'),
    __metadata("design:paramtypes", [ad_campaigns_service_1.AdCampaignsService])
], AdCampaignsController);
//# sourceMappingURL=ad-campaigns.controller.js.map