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
  Request
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery, 
  ApiParam,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { AdCampaignsService } from './ad-campaigns.service';
import { 
  CreateAdCampaignDto, 
  UpdateAdCampaignDto, 
  CreateAdCreativeDto, 
  UpdateAdCreativeDto,
  TrackAdAnalyticsDto,
  CreateSplitTestDto,
  UpdateSplitTestDto,
  CreateSalesFunnelDto,
  UpdateSalesFunnelDto,
  CreateIntegrationDto,
  UpdateIntegrationDto,
  AnalyticsOverviewDto,
  SyncAnalyticsDto
} from './dto/ad-campaigns.dto';
import { TestVariant } from '@prisma/client';

@ApiTags('Ad Campaigns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ad-campaigns')
export class AdCampaignsController {
  constructor(private readonly adCampaignsService: AdCampaignsService) {}

  // Ad Campaign Management
  @Post()
  @ApiOperation({ summary: 'Create a new ad campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Brand or client not found' })
  async createAdCampaign(
    @Request() req,
    @Body() createDto: CreateAdCampaignDto
  ) {
    return this.adCampaignsService.createAdCampaign(
      req.user.tenantId,
      req.user.id,
      createDto
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all ad campaigns with filtering' })
  @ApiQuery({ name: 'platform', required: false, enum: ['FACEBOOK', 'INSTAGRAM', 'GOOGLE_ADS', 'TIKTOK', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'SNAPCHAT', 'PINTEREST'] })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'] })
  @ApiQuery({ name: 'adType', required: false, enum: ['IMAGE', 'VIDEO', 'CAROUSEL', 'STORY', 'REEL', 'TEXT'] })
  @ApiQuery({ name: 'clientId', required: false })
  @ApiQuery({ name: 'brandId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Campaigns retrieved successfully' })
  async getAdCampaigns(
    @Request() req,
    @Query() query: any
  ) {
    return this.adCampaignsService.getAdCampaigns(req.user.tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getAdCampaign(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.getAdCampaign(req.user.tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign updated successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async updateAdCampaign(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateAdCampaignDto
  ) {
    return this.adCampaignsService.updateAdCampaign(req.user.tenantId, id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign deleted successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async deleteAdCampaign(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.deleteAdCampaign(req.user.tenantId, id);
  }

  @Post(':id/launch')
  @ApiOperation({ summary: 'Launch an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign launched successfully' })
  @ApiResponse({ status: 400, description: 'Campaign cannot be launched' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async launchAdCampaign(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.launchAdCampaign(req.user.tenantId, id);
  }

  @Post(':id/pause')
  @ApiOperation({ summary: 'Pause an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign paused successfully' })
  @ApiResponse({ status: 400, description: 'Campaign cannot be paused' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async pauseAdCampaign(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.pauseAdCampaign(req.user.tenantId, id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign duplicated successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async duplicateAdCampaign(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.duplicateAdCampaign(req.user.tenantId, id);
  }

  // Ad Creative Management
  @Post('creatives')
  @ApiOperation({ summary: 'Create a new ad creative' })
  @ApiResponse({ status: 201, description: 'Creative created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Brand or campaign not found' })
  async createAdCreative(
    @Request() req,
    @Body() createDto: CreateAdCreativeDto
  ) {
    return this.adCampaignsService.createAdCreative(req.user.tenantId, createDto);
  }

  @Get('creatives')
  @ApiOperation({ summary: 'Get all ad creatives with filtering' })
  @ApiQuery({ name: 'platform', required: false, enum: ['FACEBOOK', 'INSTAGRAM', 'GOOGLE_ADS', 'TIKTOK', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'SNAPCHAT', 'PINTEREST'] })
  @ApiQuery({ name: 'type', required: false, enum: ['IMAGE', 'VIDEO', 'CAROUSEL', 'STORY', 'REEL'] })
  @ApiQuery({ name: 'brandId', required: false })
  @ApiQuery({ name: 'adCampaignId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Creatives retrieved successfully' })
  async getAdCreatives(
    @Request() req,
    @Query() query: any
  ) {
    return this.adCampaignsService.getAdCreatives(req.user.tenantId, query);
  }

  @Get('creatives/:id')
  @ApiOperation({ summary: 'Get a specific ad creative' })
  @ApiParam({ name: 'id', description: 'Creative ID' })
  @ApiResponse({ status: 200, description: 'Creative retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Creative not found' })
  async getAdCreative(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.getAdCreative(req.user.tenantId, id);
  }

  @Put('creatives/:id')
  @ApiOperation({ summary: 'Update an ad creative' })
  @ApiParam({ name: 'id', description: 'Creative ID' })
  @ApiResponse({ status: 200, description: 'Creative updated successfully' })
  @ApiResponse({ status: 404, description: 'Creative not found' })
  async updateAdCreative(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateAdCreativeDto
  ) {
    return this.adCampaignsService.updateAdCreative(req.user.tenantId, id, updateDto);
  }

  @Delete('creatives/:id')
  @ApiOperation({ summary: 'Delete an ad creative' })
  @ApiParam({ name: 'id', description: 'Creative ID' })
  @ApiResponse({ status: 200, description: 'Creative deleted successfully' })
  @ApiResponse({ status: 404, description: 'Creative not found' })
  async deleteAdCreative(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.deleteAdCreative(req.user.tenantId, id);
  }

  // Analytics Management
  @Post(':id/analytics')
  @ApiOperation({ summary: 'Track analytics for an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 201, description: 'Analytics tracked successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async trackAdAnalytics(
    @Request() req,
    @Param('id') id: string,
    @Body() analyticsDto: TrackAdAnalyticsDto
  ) {
    return this.adCampaignsService.trackAdAnalytics(req.user.tenantId, id, analyticsDto);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get analytics for an ad campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getAdAnalytics(
    @Request() req,
    @Param('id') id: string,
    @Query() query: any
  ) {
    return this.adCampaignsService.getAdAnalytics(req.user.tenantId, id, query);
  }

  @Post('analytics/overview')
  @ApiOperation({ summary: 'Get analytics overview' })
  @ApiResponse({ status: 200, description: 'Analytics overview retrieved successfully' })
  async getAnalyticsOverview(
    @Request() req,
    @Body() overviewDto: AnalyticsOverviewDto
  ) {
    return this.adCampaignsService.getAnalyticsOverview(req.user.tenantId, overviewDto);
  }

  // Split Testing Management
  @Post('split-tests')
  @ApiOperation({ summary: 'Create a new split test' })
  @ApiResponse({ status: 201, description: 'Split test created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async createSplitTest(
    @Request() req,
    @Body() createDto: CreateSplitTestDto
  ) {
    return this.adCampaignsService.createSplitTest(req.user.tenantId, createDto);
  }

  @Get('split-tests')
  @ApiOperation({ summary: 'Get all split tests with filtering' })
  @ApiQuery({ name: 'status', required: false, enum: ['RUNNING', 'PAUSED', 'COMPLETED', 'CANCELLED'] })
  @ApiQuery({ name: 'adCampaignId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Split tests retrieved successfully' })
  async getSplitTests(
    @Request() req,
    @Query() query: any
  ) {
    return this.adCampaignsService.getSplitTests(req.user.tenantId, query);
  }

  @Get('split-tests/:id')
  @ApiOperation({ summary: 'Get a specific split test' })
  @ApiParam({ name: 'id', description: 'Split test ID' })
  @ApiResponse({ status: 200, description: 'Split test retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Split test not found' })
  async getSplitTest(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.getSplitTest(req.user.tenantId, id);
  }

  @Put('split-tests/:id')
  @ApiOperation({ summary: 'Update a split test' })
  @ApiParam({ name: 'id', description: 'Split test ID' })
  @ApiResponse({ status: 200, description: 'Split test updated successfully' })
  @ApiResponse({ status: 404, description: 'Split test not found' })
  async updateSplitTest(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateSplitTestDto
  ) {
    return this.adCampaignsService.updateSplitTest(req.user.tenantId, id, updateDto);
  }

  @Post('split-tests/:id/winner')
  @ApiOperation({ summary: 'Declare a winner for a split test' })
  @ApiParam({ name: 'id', description: 'Split test ID' })
  @ApiResponse({ status: 200, description: 'Winner declared successfully' })
  @ApiResponse({ status: 400, description: 'Cannot declare winner' })
  @ApiResponse({ status: 404, description: 'Split test not found' })
  async declareWinner(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { winner: TestVariant }
  ) {
    return this.adCampaignsService.declareWinner(req.user.tenantId, id, body.winner);
  }

  // Sales Funnel Management
  @Post('funnels')
  @ApiOperation({ summary: 'Create a new sales funnel' })
  @ApiResponse({ status: 201, description: 'Sales funnel created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async createSalesFunnel(
    @Request() req,
    @Body() createDto: CreateSalesFunnelDto
  ) {
    return this.adCampaignsService.createSalesFunnel(
      req.user.tenantId,
      req.user.id,
      createDto
    );
  }

  @Get('funnels')
  @ApiOperation({ summary: 'Get all sales funnels with filtering' })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'] })
  @ApiQuery({ name: 'clientId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Sales funnels retrieved successfully' })
  async getSalesFunnels(
    @Request() req,
    @Query() query: any
  ) {
    return this.adCampaignsService.getSalesFunnels(req.user.tenantId, query);
  }

  @Get('funnels/:id')
  @ApiOperation({ summary: 'Get a specific sales funnel' })
  @ApiParam({ name: 'id', description: 'Sales funnel ID' })
  @ApiResponse({ status: 200, description: 'Sales funnel retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Sales funnel not found' })
  async getSalesFunnel(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.getSalesFunnel(req.user.tenantId, id);
  }

  @Put('funnels/:id')
  @ApiOperation({ summary: 'Update a sales funnel' })
  @ApiParam({ name: 'id', description: 'Sales funnel ID' })
  @ApiResponse({ status: 200, description: 'Sales funnel updated successfully' })
  @ApiResponse({ status: 404, description: 'Sales funnel not found' })
  async updateSalesFunnel(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateSalesFunnelDto
  ) {
    return this.adCampaignsService.updateSalesFunnel(req.user.tenantId, id, updateDto);
  }

  @Delete('funnels/:id')
  @ApiOperation({ summary: 'Delete a sales funnel' })
  @ApiParam({ name: 'id', description: 'Sales funnel ID' })
  @ApiResponse({ status: 200, description: 'Sales funnel deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sales funnel not found' })
  async deleteSalesFunnel(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.deleteSalesFunnel(req.user.tenantId, id);
  }

  // Integration Management
  @Post('integrations')
  @ApiOperation({ summary: 'Create a new platform integration' })
  @ApiResponse({ status: 201, description: 'Integration created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createIntegration(
    @Request() req,
    @Body() createDto: CreateIntegrationDto
  ) {
    return this.adCampaignsService.createIntegration(req.user.tenantId, createDto);
  }

  @Get('integrations')
  @ApiOperation({ summary: 'Get all platform integrations' })
  @ApiResponse({ status: 200, description: 'Integrations retrieved successfully' })
  async getIntegrations(@Request() req) {
    return this.adCampaignsService.getIntegrations(req.user.tenantId);
  }

  @Get('integrations/:id')
  @ApiOperation({ summary: 'Get a specific platform integration' })
  @ApiParam({ name: 'id', description: 'Integration ID' })
  @ApiResponse({ status: 200, description: 'Integration retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async getIntegration(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.getIntegration(req.user.tenantId, id);
  }

  @Put('integrations/:id')
  @ApiOperation({ summary: 'Update a platform integration' })
  @ApiParam({ name: 'id', description: 'Integration ID' })
  @ApiResponse({ status: 200, description: 'Integration updated successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async updateIntegration(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateIntegrationDto
  ) {
    return this.adCampaignsService.updateIntegration(req.user.tenantId, id, updateDto);
  }

  @Delete('integrations/:id')
  @ApiOperation({ summary: 'Delete a platform integration' })
  @ApiParam({ name: 'id', description: 'Integration ID' })
  @ApiResponse({ status: 200, description: 'Integration deleted successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async deleteIntegration(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.adCampaignsService.deleteIntegration(req.user.tenantId, id);
  }

  // Platform Sync
  @Post('sync')
  @ApiOperation({ summary: 'Sync analytics from platform APIs' })
  @ApiResponse({ status: 200, description: 'Analytics synced successfully' })
  async syncAnalytics(
    @Request() req,
    @Body() syncDto: SyncAnalyticsDto
  ) {
    return this.adCampaignsService.syncAnalytics(req.user.tenantId, syncDto);
  }

  // Statistics
  @Get('stats/overview')
  @ApiOperation({ summary: 'Get ad campaign statistics overview' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getAdCampaignStats(@Request() req) {
    return this.adCampaignsService.getAdCampaignStats(req.user.tenantId);
  }
}
