import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CampaignsService } from './campaigns.service';
import { CampaignAiService } from './campaign.ai.service';
import { CampaignAnalyticsService } from './campaign.analytics.service';
import { CampaignTemplatesService } from './campaign.templates.service';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  GenerateCampaignDto,
  CampaignTemplateDto,
  CampaignKpiDto,
  CampaignAnalyticsDto,
} from './dto/campaigns.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('campaigns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly campaignAiService: CampaignAiService,
    private readonly campaignAnalyticsService: CampaignAnalyticsService,
    private readonly campaignTemplatesService: CampaignTemplatesService,
  ) {}

  // Campaign CRUD Operations
  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
    @Request() req: any,
  ) {
    return this.campaignsService.createCampaign(createCampaignDto, req.user.tenantId, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'] })
  @ApiQuery({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] })
  @ApiQuery({ name: 'goal', required: false, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] })
  @ApiQuery({ name: 'clientId', required: false, type: String })
  @ApiQuery({ name: 'brandId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Campaigns retrieved successfully' })
  async getCampaigns(
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.campaignsService.getCampaigns(req.user.tenantId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.getCampaign(id, req.user.tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign updated successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async updateCampaign(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
    @Request() req: any,
  ) {
    return this.campaignsService.updateCampaign(id, updateCampaignDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign deleted successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async deleteCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.deleteCampaign(id, req.user.tenantId);
  }

  // Campaign Lifecycle Operations
  @Post(':id/launch')
  @ApiOperation({ summary: 'Launch a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign launched successfully' })
  @ApiResponse({ status: 400, description: 'Campaign cannot be launched' })
  async launchCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.launchCampaign(id, req.user.tenantId);
  }

  @Post(':id/pause')
  @ApiOperation({ summary: 'Pause a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign paused successfully' })
  async pauseCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.pauseCampaign(id, req.user.tenantId);
  }

  @Post(':id/resume')
  @ApiOperation({ summary: 'Resume a paused campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign resumed successfully' })
  async resumeCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.resumeCampaign(id, req.user.tenantId);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark a campaign as completed' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign marked as completed' })
  async completeCampaign(@Param('id') id: string, @Request() req: any) {
    return this.campaignsService.completeCampaign(id, req.user.tenantId);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 201, description: 'Campaign duplicated successfully' })
  async duplicateCampaign(
    @Param('id') id: string,
    @Body() duplicateData: { name: string; description?: string },
    @Request() req: any,
  ) {
    return this.campaignsService.duplicateCampaign(id, req.user.tenantId, duplicateData);
  }

  // AI Campaign Generation
  @Post('generate')
  @ApiOperation({ summary: 'Generate AI-powered campaign plan' })
  @ApiResponse({ status: 201, description: 'Campaign plan generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateCampaign(
    @Body() generateDto: GenerateCampaignDto,
    @Request() req: any,
  ) {
    return this.campaignAiService.generateCampaignPlan(generateDto, req.user.tenantId);
  }

  @Post(':id/generate-assets')
  @ApiOperation({ summary: 'Generate AI-powered campaign assets' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Assets generated successfully' })
  async generateAssets(
    @Param('id') id: string,
    @Body() body: { assetType: string; context?: any },
    @Request() req: any,
  ) {
    return this.campaignAiService.generateCampaignAssets(id, body.assetType, body.context, req.user.tenantId);
  }

  @Post(':id/optimize-content')
  @ApiOperation({ summary: 'Optimize campaign content using AI' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Content optimized successfully' })
  async optimizeContent(
    @Param('id') id: string,
    @Body() body: { content: string; optimizationType: string },
    @Request() req: any,
  ) {
    return this.campaignAiService.optimizeCampaignContent(id, body.content, body.optimizationType, req.user.tenantId);
  }

  // Campaign Analytics & KPIs
  @Post(':id/kpis')
  @ApiOperation({ summary: 'Track campaign KPI' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 201, description: 'KPI tracked successfully' })
  async trackKpi(
    @Param('id') id: string,
    @Body() kpiDto: CampaignKpiDto,
    @Request() req: any,
  ) {
    return this.campaignAnalyticsService.trackKpi(id, kpiDto, req.user.tenantId);
  }

  @Post(':id/analytics')
  @ApiOperation({ summary: 'Track campaign analytics' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 201, description: 'Analytics tracked successfully' })
  async trackAnalytics(
    @Param('id') id: string,
    @Body() analyticsDto: CampaignAnalyticsDto,
    @Request() req: any,
  ) {
    return this.campaignAnalyticsService.trackAnalytics(id, analyticsDto, req.user.tenantId);
  }

  @Get(':id/performance')
  @ApiOperation({ summary: 'Get campaign performance data' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Performance data retrieved successfully' })
  async getCampaignPerformance(
    @Param('id') id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Request() req: any,
  ) {
    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate),
    } : undefined;

    return this.campaignAnalyticsService.getCampaignPerformance(id, req.user.tenantId, dateRange);
  }

  @Get(':id/report')
  @ApiOperation({ summary: 'Generate campaign performance report' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'type', required: false, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  async generateReport(
    @Param('id') id: string,
    @Query('type') type: 'daily' | 'weekly' | 'monthly' = 'weekly',
    @Request() req: any,
  ) {
    return this.campaignAnalyticsService.generatePerformanceReport(id, req.user.tenantId, type);
  }

  // Campaign Templates
  @Get('templates')
  @ApiOperation({ summary: 'Get campaign templates' })
  @ApiQuery({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] })
  @ApiQuery({ name: 'goal', required: false, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Templates retrieved successfully' })
  async getTemplates(
    @Query('type') type?: string,
    @Query('goal') goal?: string,
    @Query('category') category?: string,
  ) {
    return this.campaignTemplatesService.getTemplates({ type, goal, category });
  }

  @Get('templates/suggestions')
  @ApiOperation({ summary: 'Get template suggestions based on goal and type' })
  @ApiQuery({ name: 'goal', required: true, enum: ['BRAND_AWARENESS', 'LEAD_GENERATION', 'SEO_RANKING', 'SALES_CONVERSION', 'CUSTOMER_RETENTION', 'TRAFFIC_DRIVE', 'ENGAGEMENT_BOOST', 'REPUTATION_MANAGEMENT'] })
  @ApiQuery({ name: 'type', required: false, enum: ['SOCIAL_MEDIA', 'EMAIL_MARKETING', 'VIDEO_CONTENT', 'PRINT_MEDIA', 'SEO_OPTIMIZATION', 'PAID_ADVERTISING', 'INFLUENCER_MARKETING', 'PR_AND_MEDIA', 'CONTENT_MARKETING', 'EVENT_MARKETING'] })
  @ApiQuery({ name: 'budget', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Template suggestions retrieved successfully' })
  async getTemplateSuggestions(
    @Query('goal') goal: string,
    @Query('type') type?: string,
    @Query('budget') budget?: number,
  ) {
    return this.campaignTemplatesService.getTemplateSuggestions(goal as any, type as any, budget);
  }

  @Post('templates')
  @ApiOperation({ summary: 'Create a new campaign template' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  async createTemplate(@Body() templateDto: CampaignTemplateDto) {
    return this.campaignTemplatesService.createTemplate(templateDto);
  }

  @Get('templates/:id')
  @ApiOperation({ summary: 'Get a specific campaign template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully' })
  async getTemplate(@Param('id') id: string) {
    return this.campaignTemplatesService.getTemplate(id);
  }

  @Put('templates/:id')
  @ApiOperation({ summary: 'Update a campaign template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  async updateTemplate(
    @Param('id') id: string,
    @Body() templateDto: Partial<CampaignTemplateDto>,
  ) {
    return this.campaignTemplatesService.updateTemplate(id, templateDto);
  }

  @Delete('templates/:id')
  @ApiOperation({ summary: 'Delete a campaign template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  async deleteTemplate(@Param('id') id: string) {
    return this.campaignTemplatesService.deleteTemplate(id);
  }

  // Campaign Suggestions
  @Get('suggestions')
  @ApiOperation({ summary: 'Get AI-powered campaign suggestions' })
  @ApiQuery({ name: 'clientId', required: true, type: String })
  @ApiQuery({ name: 'brandId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Suggestions retrieved successfully' })
  async getSuggestions(
    @Query('clientId') clientId: string,
    @Query('brandId') brandId: string,
    @Request() req: any,
  ) {
    return this.campaignAiService.generateCampaignSuggestions(clientId, brandId, req.user.tenantId);
  }

  // Campaign Statistics
  @Get('stats/overview')
  @ApiOperation({ summary: 'Get campaign statistics overview' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getCampaignStats(@Request() req: any) {
    return this.campaignsService.getCampaignStats(req.user.tenantId);
  }

  @Get('stats/performance')
  @ApiOperation({ summary: 'Get tenant performance insights' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Performance insights retrieved successfully' })
  async getPerformanceInsights(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Request() req: any,
  ) {
    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate),
    } : undefined;

    return this.campaignAnalyticsService.getPerformanceInsights(req.user.tenantId, dateRange);
  }

  // Client and Brand Specific Campaigns
  @Get('client/:clientId')
  @ApiOperation({ summary: 'Get campaigns for a specific client' })
  @ApiParam({ name: 'clientId', description: 'Client ID' })
  @ApiResponse({ status: 200, description: 'Client campaigns retrieved successfully' })
  async getClientCampaigns(
    @Param('clientId') clientId: string,
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.campaignsService.getClientCampaigns(clientId, req.user.tenantId, pagination);
  }

  @Get('brand/:brandId')
  @ApiOperation({ summary: 'Get campaigns for a specific brand' })
  @ApiParam({ name: 'brandId', description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand campaigns retrieved successfully' })
  async getBrandCampaigns(
    @Param('brandId') brandId: string,
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.campaignsService.getBrandCampaigns(brandId, req.user.tenantId, pagination);
  }

  // Client Performance
  @Get('client/:clientId/performance')
  @ApiOperation({ summary: 'Get client performance data' })
  @ApiParam({ name: 'clientId', description: 'Client ID' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Client performance retrieved successfully' })
  async getClientPerformance(
    @Param('clientId') clientId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Request() req: any,
  ) {
    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate),
    } : undefined;

    return this.campaignAnalyticsService.getClientPerformance(clientId, req.user.tenantId, dateRange);
  }

  // Seed Default Templates
  @Post('templates/seed')
  @ApiOperation({ summary: 'Seed default campaign templates' })
  @ApiResponse({ status: 200, description: 'Default templates seeded successfully' })
  async seedDefaultTemplates() {
    return this.campaignTemplatesService.seedDefaultTemplates();
  }
}
