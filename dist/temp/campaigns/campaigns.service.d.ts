import { PrismaService } from '../common/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaigns.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
import { CampaignAiService } from './campaign.ai.service';
import { CampaignAnalyticsService } from './campaign.analytics.service';
import { CampaignTemplatesService } from './campaign.templates.service';
export declare class CampaignsService {
    private readonly prisma;
    private readonly campaignAiService;
    private readonly campaignAnalyticsService;
    private readonly campaignTemplatesService;
    constructor(prisma: PrismaService, campaignAiService: CampaignAiService, campaignAnalyticsService: CampaignAnalyticsService, campaignTemplatesService: CampaignTemplatesService);
    createCampaign(createCampaignDto: CreateCampaignDto, tenantId: string, userId: string): Promise<any>;
    getCampaigns(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getCampaign(id: string, tenantId: string): Promise<any>;
    updateCampaign(id: string, updateCampaignDto: UpdateCampaignDto, tenantId: string): Promise<any>;
    deleteCampaign(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    launchCampaign(id: string, tenantId: string): Promise<any>;
    pauseCampaign(id: string, tenantId: string): Promise<any>;
    resumeCampaign(id: string, tenantId: string): Promise<any>;
    completeCampaign(id: string, tenantId: string): Promise<any>;
    duplicateCampaign(id: string, tenantId: string, duplicateData: {
        name: string;
        description?: string;
    }): Promise<any>;
    getCampaignStats(tenantId: string): Promise<{
        totalCampaigns: any;
        statusBreakdown: any;
        typeBreakdown: any;
        goalBreakdown: any;
    }>;
    getClientCampaigns(clientId: string, tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getBrandCampaigns(brandId: string, tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
}
