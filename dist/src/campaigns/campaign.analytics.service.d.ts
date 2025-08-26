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
        campaign: {
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                website: string | null;
                logoUrl: string | null;
                palette: import("@prisma/client/runtime/library").JsonValue | null;
                fonts: import("@prisma/client/runtime/library").JsonValue | null;
                createdBy: string;
            };
            client: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
            description: string | null;
            brandId: string | null;
            clientId: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            type: import(".prisma/client").$Enums.CampaignType;
            status: import(".prisma/client").$Enums.CampaignStatus;
            strategy: import("@prisma/client/runtime/library").JsonValue | null;
            startDate: Date | null;
            endDate: Date | null;
            timeline: import("@prisma/client/runtime/library").JsonValue | null;
            goal: import(".prisma/client").$Enums.CampaignGoal;
            contentDeliverables: import("@prisma/client/runtime/library").JsonValue | null;
            kpis: import("@prisma/client/runtime/library").JsonValue | null;
            recommendations: import("@prisma/client/runtime/library").JsonValue | null;
        };
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
        topCampaigns: {
            id: string;
            name: string;
            brand: any;
            client: any;
            performance: any;
        }[];
        totalCampaigns: number;
        activeCampaigns: number;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    getClientPerformance(clientId: string, tenantId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        client: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
        campaigns: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
            description: string | null;
            brandId: string | null;
            clientId: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            type: import(".prisma/client").$Enums.CampaignType;
            status: import(".prisma/client").$Enums.CampaignStatus;
            strategy: import("@prisma/client/runtime/library").JsonValue | null;
            startDate: Date | null;
            endDate: Date | null;
            timeline: import("@prisma/client/runtime/library").JsonValue | null;
            goal: import(".prisma/client").$Enums.CampaignGoal;
            contentDeliverables: import("@prisma/client/runtime/library").JsonValue | null;
            kpis: import("@prisma/client/runtime/library").JsonValue | null;
            recommendations: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        performance: any;
        dateRange: {
            start: Date;
            end: Date;
        };
    }>;
    generatePerformanceReport(campaignId: string, tenantId: string, reportType?: 'daily' | 'weekly' | 'monthly'): Promise<{
        campaign: {
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                website: string | null;
                logoUrl: string | null;
                palette: import("@prisma/client/runtime/library").JsonValue | null;
                fonts: import("@prisma/client/runtime/library").JsonValue | null;
                createdBy: string;
            };
            client: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
            description: string | null;
            brandId: string | null;
            clientId: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            type: import(".prisma/client").$Enums.CampaignType;
            status: import(".prisma/client").$Enums.CampaignStatus;
            strategy: import("@prisma/client/runtime/library").JsonValue | null;
            startDate: Date | null;
            endDate: Date | null;
            timeline: import("@prisma/client/runtime/library").JsonValue | null;
            goal: import(".prisma/client").$Enums.CampaignGoal;
            contentDeliverables: import("@prisma/client/runtime/library").JsonValue | null;
            kpis: import("@prisma/client/runtime/library").JsonValue | null;
            recommendations: import("@prisma/client/runtime/library").JsonValue | null;
        };
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
            topCampaigns: {
                id: string;
                name: string;
                brand: any;
                client: any;
                performance: any;
            }[];
            totalCampaigns: number;
            activeCampaigns: number;
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
