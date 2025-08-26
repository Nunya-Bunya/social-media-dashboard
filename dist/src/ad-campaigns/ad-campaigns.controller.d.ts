import { AdCampaignsService } from './ad-campaigns.service';
import { CreateAdCampaignDto, UpdateAdCampaignDto, CreateAdCreativeDto, UpdateAdCreativeDto, TrackAdAnalyticsDto, CreateSplitTestDto, UpdateSplitTestDto, CreateSalesFunnelDto, UpdateSalesFunnelDto, CreateIntegrationDto, UpdateIntegrationDto, AnalyticsOverviewDto, SyncAnalyticsDto } from './dto/ad-campaigns.dto';
import { TestVariant } from '@prisma/client';
export declare class AdCampaignsController {
    private readonly adCampaignsService;
    constructor(adCampaignsService: AdCampaignsService);
    createAdCampaign(req: any, createDto: CreateAdCampaignDto): Promise<any>;
    getAdCampaigns(req: any, query: any): Promise<{
        campaigns: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAdCampaign(req: any, id: string): Promise<any>;
    updateAdCampaign(req: any, id: string, updateDto: UpdateAdCampaignDto): Promise<any>;
    deleteAdCampaign(req: any, id: string): Promise<any>;
    launchAdCampaign(req: any, id: string): Promise<any>;
    pauseAdCampaign(req: any, id: string): Promise<any>;
    duplicateAdCampaign(req: any, id: string): Promise<any>;
    createAdCreative(req: any, createDto: CreateAdCreativeDto): Promise<any>;
    getAdCreatives(req: any, query: any): Promise<{
        creatives: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAdCreative(req: any, id: string): Promise<any>;
    updateAdCreative(req: any, id: string, updateDto: UpdateAdCreativeDto): Promise<any>;
    deleteAdCreative(req: any, id: string): Promise<any>;
    trackAdAnalytics(req: any, id: string, analyticsDto: TrackAdAnalyticsDto): Promise<any>;
    getAdAnalytics(req: any, id: string, query: any): Promise<{
        analytics: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAnalyticsOverview(req: any, overviewDto: AnalyticsOverviewDto): Promise<{
        totalSpend: any;
        totalImpressions: any;
        totalClicks: any;
        totalConversions: any;
        overallROI: number;
        averageCTR: number;
        averageCPC: number;
        averageCPA: number;
        campaignCount: any;
        activeCampaigns: any;
    }>;
    createSplitTest(req: any, createDto: CreateSplitTestDto): Promise<any>;
    getSplitTests(req: any, query: any): Promise<{
        tests: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getSplitTest(req: any, id: string): Promise<any>;
    updateSplitTest(req: any, id: string, updateDto: UpdateSplitTestDto): Promise<any>;
    declareWinner(req: any, id: string, body: {
        winner: TestVariant;
    }): Promise<any>;
    createSalesFunnel(req: any, createDto: CreateSalesFunnelDto): Promise<any>;
    getSalesFunnels(req: any, query: any): Promise<{
        funnels: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getSalesFunnel(req: any, id: string): Promise<any>;
    updateSalesFunnel(req: any, id: string, updateDto: UpdateSalesFunnelDto): Promise<any>;
    deleteSalesFunnel(req: any, id: string): Promise<any>;
    createIntegration(req: any, createDto: CreateIntegrationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        platform: import(".prisma/client").$Enums.PlatformType;
        config: import("@prisma/client/runtime/library").JsonValue;
        lastSync: Date | null;
        syncStatus: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getIntegrations(req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        platform: import(".prisma/client").$Enums.PlatformType;
        config: import("@prisma/client/runtime/library").JsonValue;
        lastSync: Date | null;
        syncStatus: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getIntegration(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        platform: import(".prisma/client").$Enums.PlatformType;
        config: import("@prisma/client/runtime/library").JsonValue;
        lastSync: Date | null;
        syncStatus: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateIntegration(req: any, id: string, updateDto: UpdateIntegrationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        platform: import(".prisma/client").$Enums.PlatformType;
        config: import("@prisma/client/runtime/library").JsonValue;
        lastSync: Date | null;
        syncStatus: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    deleteIntegration(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        platform: import(".prisma/client").$Enums.PlatformType;
        config: import("@prisma/client/runtime/library").JsonValue;
        lastSync: Date | null;
        syncStatus: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    syncAnalytics(req: any, syncDto: SyncAnalyticsDto): Promise<{
        message: string;
        syncedAt: Date;
        recordsProcessed: number;
    }>;
    getAdCampaignStats(req: any): Promise<{
        totalCampaigns: any;
        activeCampaigns: any;
        pausedCampaigns: any;
        draftCampaigns: any;
        totalSpend: any;
        totalImpressions: any;
        totalClicks: any;
        averageCTR: number;
    }>;
}
