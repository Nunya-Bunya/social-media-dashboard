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
                name: string;
                createdAt: Date;
                id: string;
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
            clientId: string | null;
            status: import(".prisma/client").$Enums.LeadStatus;
            createdAt: Date;
            id: string;
            position: string | null;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
        })[];
        stages: {
            new: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            contacted: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            qualified: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            proposal: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            negotiation: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            closed: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
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
                name: string;
                createdAt: Date;
                id: string;
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
            clientId: string | null;
            status: import(".prisma/client").$Enums.LeadStatus;
            createdAt: Date;
            id: string;
            position: string | null;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
        };
    }[]>;
    searchCRM(tenantId: string, query: string): Promise<{
        leads: ({
            client: {
                name: string;
                createdAt: Date;
                id: string;
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
            clientId: string | null;
            status: import(".prisma/client").$Enums.LeadStatus;
            createdAt: Date;
            id: string;
            position: string | null;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
        })[];
        clients: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
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
                name: string;
                createdAt: Date;
                id: string;
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
            clientId: string | null;
            status: import(".prisma/client").$Enums.LeadStatus;
            createdAt: Date;
            id: string;
            position: string | null;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
            score: number | null;
            notes: string | null;
            assignedTo: string | null;
        })[];
    } | {
        type: string;
        stages: {
            new: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            contacted: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            qualified: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            proposal: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            negotiation: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
            })[];
            closed: ({
                client: {
                    name: string;
                    createdAt: Date;
                    id: string;
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
                clientId: string | null;
                status: import(".prisma/client").$Enums.LeadStatus;
                createdAt: Date;
                id: string;
                position: string | null;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                firstName: string;
                lastName: string;
                phone: string | null;
                source: import(".prisma/client").$Enums.LeadSource;
                score: number | null;
                notes: string | null;
                assignedTo: string | null;
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
