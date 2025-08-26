import { CampaignsService } from './campaigns.service';
import { CampaignAiService } from './campaign.ai.service';
import { CampaignAnalyticsService } from './campaign.analytics.service';
import { CampaignTemplatesService } from './campaign.templates.service';
import { CreateCampaignDto, UpdateCampaignDto, GenerateCampaignDto, CampaignTemplateDto, CampaignKpiDto, CampaignAnalyticsDto } from './dto/campaigns.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class CampaignsController {
    private readonly campaignsService;
    private readonly campaignAiService;
    private readonly campaignAnalyticsService;
    private readonly campaignTemplatesService;
    constructor(campaignsService: CampaignsService, campaignAiService: CampaignAiService, campaignAnalyticsService: CampaignAnalyticsService, campaignTemplatesService: CampaignTemplatesService);
    createCampaign(createCampaignDto: CreateCampaignDto, req: any): Promise<any>;
    getCampaigns(pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getCampaign(id: string, req: any): Promise<any>;
    updateCampaign(id: string, updateCampaignDto: UpdateCampaignDto, req: any): Promise<any>;
    deleteCampaign(id: string, req: any): Promise<{
        message: string;
    }>;
    launchCampaign(id: string, req: any): Promise<any>;
    pauseCampaign(id: string, req: any): Promise<any>;
    resumeCampaign(id: string, req: any): Promise<any>;
    completeCampaign(id: string, req: any): Promise<any>;
    duplicateCampaign(id: string, duplicateData: {
        name: string;
        description?: string;
    }, req: any): Promise<any>;
    generateCampaign(generateDto: GenerateCampaignDto, req: any): Promise<{
        success: boolean;
        campaignPlan: any;
        savedPlanId: any;
        message: string;
    }>;
    generateAssets(id: string, body: {
        assetType: string;
        context?: any;
    }, req: any): Promise<{
        success: boolean;
        assets: string;
        assetType: string;
        campaignId: string;
    }>;
    optimizeContent(id: string, body: {
        content: string;
        optimizationType: string;
    }, req: any): Promise<{
        success: boolean;
        originalContent: string;
        optimizedContent: string;
        optimizationType: string;
        campaignId: string;
    }>;
    trackKpi(id: string, kpiDto: CampaignKpiDto, req: any): Promise<any>;
    trackAnalytics(id: string, analyticsDto: CampaignAnalyticsDto, req: any): Promise<any>;
    getCampaignPerformance(id: string, startDate?: string, endDate?: string, req: any): Promise<{
        campaign: any;
        analytics: any;
        kpis: any;
        performance: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    generateReport(id: string, type: 'daily' | 'weekly' | 'monthly', req: any): Promise<{
        campaign: any;
        report: any;
        dateRange: {
            start: Date;
            end: Date;
        };
        reportType: "daily" | "weekly" | "monthly";
    }>;
    getTemplates(type?: string, goal?: string, category?: string): Promise<any>;
    getTemplateSuggestions(goal: string, type?: string, budget?: number): Promise<any>;
    createTemplate(templateDto: CampaignTemplateDto): Promise<any>;
    getTemplate(id: string): Promise<any>;
    updateTemplate(id: string, templateDto: Partial<CampaignTemplateDto>): Promise<any>;
    deleteTemplate(id: string): Promise<any>;
    getSuggestions(clientId: string, brandId: string, req: any): Promise<{
        success: boolean;
        suggestions: any[];
        performanceAnalysis: any;
    }>;
    getCampaignStats(req: any): Promise<{
        totalCampaigns: any;
        statusBreakdown: any;
        typeBreakdown: any;
        goalBreakdown: any;
    }>;
    getPerformanceInsights(startDate?: string, endDate?: string, req: any): Promise<{
        performance: {
            aggregatePerformance: any;
            topCampaigns: any;
            totalCampaigns: any;
            activeCampaigns: any;
            dateRange: {
                start: Date;
                end: Date;
            };
        };
        insights: any[];
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    getClientCampaigns(clientId: string, pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getBrandCampaigns(brandId: string, pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getClientPerformance(clientId: string, startDate?: string, endDate?: string, req: any): Promise<{
        client: any;
        campaigns: any;
        performance: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    seedDefaultTemplates(): Promise<void>;
}
