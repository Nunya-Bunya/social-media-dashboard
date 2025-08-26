import { PrismaService } from '../common/prisma.service';
import { LeadService } from './lead.service';
export declare class CRMService {
    private readonly prisma;
    private readonly leadService;
    constructor(prisma: PrismaService, leadService: LeadService);
    getDashboard(tenantId: string): Promise<{
        totalLeads: number;
        newLeads: number;
        qualifiedLeads: number;
        totalClients: number;
        leadStats: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
        conversionRate: number;
    }>;
    getPipeline(tenantId: string): Promise<{
        leads: ({
            client: {
                id: string;
                email: string;
                company: string | null;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            company: string | null;
            position: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            status: import(".prisma/client").$Enums.LeadStatus;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
            tenantId: string;
            clientId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        stages: {
            new: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            contacted: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            qualified: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            proposal: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            negotiation: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            closed: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
        };
    }>;
    getForecast(tenantId: string, months?: number): Promise<{
        totalLeads: number;
        conversionRate: number;
        avgDealValue: number;
        projectedRevenue: number;
        monthlyProjection: number;
    }>;
    getAnalytics(tenantId: string, period?: 'week' | 'month' | 'quarter' | 'year'): Promise<{
        period: "week" | "month" | "quarter" | "year";
        totalLeads: number;
        leadsByStatus: {};
        conversionRate: number;
    }>;
    getRecentActivity(tenantId: string, limit?: number): Promise<{
        id: string;
        type: string;
        action: string;
        description: string;
        timestamp: Date;
        data: {
            client: {
                id: string;
                email: string;
                company: string | null;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            company: string | null;
            position: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            status: import(".prisma/client").$Enums.LeadStatus;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
            tenantId: string;
            clientId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }[]>;
    searchCRM(tenantId: string, query: string): Promise<{
        leads: ({
            client: {
                id: string;
                email: string;
                company: string | null;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            company: string | null;
            position: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            status: import(".prisma/client").$Enums.LeadStatus;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
            tenantId: string;
            clientId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        clients: {
            id: string;
            email: string;
            company: string | null;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        totalResults: number;
    }>;
    generateReport(tenantId: string, type: 'leads' | 'pipeline' | 'forecast', options?: any): Promise<{
        type: string;
        totalLeads: number;
        leadsByStatus: {};
        leadsBySource: {};
        leads: ({
            client: {
                id: string;
                email: string;
                company: string | null;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            company: string | null;
            position: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            status: import(".prisma/client").$Enums.LeadStatus;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
            tenantId: string;
            clientId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } | {
        type: string;
        stages: {
            new: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            contacted: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            qualified: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            proposal: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            negotiation: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
            closed: ({
                client: {
                    id: string;
                    email: string;
                    company: string | null;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    industry: string | null;
                    targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                    budget: number | null;
                    goals: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
                company: string | null;
                position: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                status: import(".prisma/client").$Enums.LeadStatus;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
                tenantId: string;
                clientId: string | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
        };
        totalLeads: number;
        conversionRates: {
            newToContacted: number;
            contactedToQualified: number;
            qualifiedToClosed: number;
        };
    } | {
        totalLeads: number;
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
