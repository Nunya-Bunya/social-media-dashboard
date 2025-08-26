import { PrismaService } from '../common/prisma.service';
import { LeadService } from './lead.service';
export declare class CRMService {
    private readonly prisma;
    private readonly leadService;
    constructor(prisma: PrismaService, leadService: LeadService);
    getDashboard(tenantId: string): Promise<{
        totalLeads: any;
        newLeads: any;
        qualifiedLeads: any;
        totalClients: any;
        leadStats: any;
        conversionRate: number;
    }>;
    getPipeline(tenantId: string): Promise<{
        leads: any;
        stages: {
            new: any;
            contacted: any;
            qualified: any;
            proposal: any;
            negotiation: any;
            closed: any;
        };
    }>;
    getForecast(tenantId: string, months?: number): Promise<{
        totalLeads: any;
        conversionRate: number;
        avgDealValue: number;
        projectedRevenue: number;
        monthlyProjection: number;
    }>;
    getAnalytics(tenantId: string, period?: 'week' | 'month' | 'quarter' | 'year'): Promise<{
        period: "week" | "month" | "quarter" | "year";
        totalLeads: any;
        leadsByStatus: any;
        conversionRate: number;
    }>;
    getRecentActivity(tenantId: string, limit?: number): Promise<any>;
    searchCRM(tenantId: string, query: string): Promise<{
        leads: any;
        clients: any;
        totalResults: any;
    }>;
    generateReport(tenantId: string, type: 'leads' | 'pipeline' | 'forecast', options?: any): Promise<{
        type: string;
        totalLeads: any;
        leadsByStatus: any;
        leadsBySource: any;
        leads: any;
    } | {
        type: string;
        stages: {
            new: any;
            contacted: any;
            qualified: any;
            proposal: any;
            negotiation: any;
            closed: any;
        };
        totalLeads: any;
        conversionRates: {
            newToContacted: number;
            contactedToQualified: number;
            qualifiedToClosed: number;
        };
    } | {
        totalLeads: any;
        conversionRate: number;
        avgDealValue: number;
        projectedRevenue: number;
        monthlyProjection: number;
        type: string;
        period: string;
    }>;
    private generateLeadsReport;
    private generatePipelineReport;
    private generateForecastReport;
}
