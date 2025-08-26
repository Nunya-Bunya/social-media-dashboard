import { PrismaService } from '../common/prisma.service';
import { CampaignKpiDto, CampaignAnalyticsDto } from './dto/campaigns.dto';
export declare class CampaignAnalyticsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    trackKpi(campaignId: string, kpiDto: CampaignKpiDto, tenantId: string): Promise<any>;
    trackAnalytics(campaignId: string, analyticsDto: CampaignAnalyticsDto, tenantId: string): Promise<any>;
    getCampaignPerformance(campaignId: string, tenantId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        campaign: any;
        analytics: any;
        kpis: any;
        performance: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    getTenantPerformance(tenantId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        aggregatePerformance: any;
        topCampaigns: any;
        totalCampaigns: any;
        activeCampaigns: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    getClientPerformance(clientId: string, tenantId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        client: any;
        campaigns: any;
        performance: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    generatePerformanceReport(campaignId: string, tenantId: string, reportType?: 'daily' | 'weekly' | 'monthly'): Promise<{
        campaign: any;
        report: any;
        dateRange: {
            start: Date;
            end: Date;
        };
        reportType: "daily" | "weekly" | "monthly";
    }>;
    getPerformanceInsights(tenantId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
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
    private calculatePerformanceMetrics;
    private calculateAggregatePerformance;
    private calculateClientPerformance;
    private calculateCampaignPerformance;
    private calculateTrend;
    private generateReport;
    private generateInsights;
    private generateRecommendations;
}
