import { PrismaService } from '../common/prisma.service';
import { CreateAdCampaignDto, UpdateAdCampaignDto, CreateAdCreativeDto, UpdateAdCreativeDto, TrackAdAnalyticsDto, CreateSplitTestDto, UpdateSplitTestDto, CreateSalesFunnelDto, UpdateSalesFunnelDto, CreateIntegrationDto, UpdateIntegrationDto, AnalyticsOverviewDto, SyncAnalyticsDto } from './dto/ad-campaigns.dto';
import { TestVariant } from '@prisma/client';
export declare class AdCampaignsService {
    private prisma;
    constructor(prisma: PrismaService);
    createAdCampaign(tenantId: string, userId: string, createDto: CreateAdCampaignDto): Promise<any>;
    getAdCampaigns(tenantId: string, filters?: any): Promise<{
        campaigns: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAdCampaign(tenantId: string, campaignId: string): Promise<any>;
    updateAdCampaign(tenantId: string, campaignId: string, updateDto: UpdateAdCampaignDto): Promise<any>;
    deleteAdCampaign(tenantId: string, campaignId: string): Promise<any>;
    launchAdCampaign(tenantId: string, campaignId: string): Promise<any>;
    pauseAdCampaign(tenantId: string, campaignId: string): Promise<any>;
    duplicateAdCampaign(tenantId: string, campaignId: string): Promise<any>;
    createAdCreative(tenantId: string, createDto: CreateAdCreativeDto): Promise<any>;
    getAdCreatives(tenantId: string, filters?: any): Promise<{
        creatives: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAdCreative(tenantId: string, creativeId: string): Promise<any>;
    updateAdCreative(tenantId: string, creativeId: string, updateDto: UpdateAdCreativeDto): Promise<any>;
    deleteAdCreative(tenantId: string, creativeId: string): Promise<any>;
    trackAdAnalytics(tenantId: string, campaignId: string, analyticsDto: TrackAdAnalyticsDto): Promise<any>;
    getAdAnalytics(tenantId: string, campaignId: string, filters?: any): Promise<{
        analytics: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getAnalyticsOverview(tenantId: string, overviewDto: AnalyticsOverviewDto): Promise<{
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
    createSplitTest(tenantId: string, createDto: CreateSplitTestDto): Promise<any>;
    getSplitTests(tenantId: string, filters?: any): Promise<{
        tests: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getSplitTest(tenantId: string, testId: string): Promise<any>;
    updateSplitTest(tenantId: string, testId: string, updateDto: UpdateSplitTestDto): Promise<any>;
    declareWinner(tenantId: string, testId: string, winner: TestVariant): Promise<any>;
    createSalesFunnel(tenantId: string, userId: string, createDto: CreateSalesFunnelDto): Promise<any>;
    getSalesFunnels(tenantId: string, filters?: any): Promise<{
        funnels: any;
        pagination: {
            page: any;
            limit: any;
            total: any;
            pages: number;
        };
    }>;
    getSalesFunnel(tenantId: string, funnelId: string): Promise<any>;
    updateSalesFunnel(tenantId: string, funnelId: string, updateDto: UpdateSalesFunnelDto): Promise<any>;
    deleteSalesFunnel(tenantId: string, funnelId: string): Promise<any>;
    createIntegration(tenantId: string, createDto: CreateIntegrationDto): Promise<any>;
    getIntegrations(tenantId: string): Promise<any>;
    getIntegration(tenantId: string, integrationId: string): Promise<any>;
    updateIntegration(tenantId: string, integrationId: string, updateDto: UpdateIntegrationDto): Promise<any>;
    deleteIntegration(tenantId: string, integrationId: string): Promise<any>;
    syncAnalytics(tenantId: string, syncDto: SyncAnalyticsDto): Promise<{
        message: string;
        syncedAt: Date;
        recordsProcessed: number;
    }>;
    getAdCampaignStats(tenantId: string): Promise<{
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
