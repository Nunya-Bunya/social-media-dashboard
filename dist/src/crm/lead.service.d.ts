import { PrismaService } from '../common/prisma.service';
import { CreateLeadDto, UpdateLeadDto, CreateActivityDto, UpdateActivityDto } from './dto/crm.dto';
export declare class LeadService {
    private prisma;
    constructor(prisma: PrismaService);
    createLead(tenantId: string, createLeadDto: CreateLeadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }>;
    getLeads(tenantId: string, filters?: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }[]>;
    getLead(tenantId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }>;
    updateLead(tenantId: string, id: string, updateLeadDto: UpdateLeadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }>;
    deleteLead(tenantId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }>;
    scoreLead(tenantId: string, id: string, score: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        tenantId: string;
        clientId: string | null;
        company: string | null;
        status: import(".prisma/client").$Enums.LeadStatus;
        firstName: string;
        lastName: string;
        phone: string | null;
        position: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
        score: number | null;
        notes: string | null;
        assignedTo: string | null;
    }>;
    getLeadStats(tenantId: string): Promise<{
        total: number;
        byStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
        bySource: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "source"[]> & {
            _count: {
                source: number;
            };
        })[];
    }>;
    createActivity(tenantId: string, createActivityDto: CreateActivityDto): Promise<any>;
    getActivities(tenantId: string, leadId?: string): Promise<any>;
    updateActivity(tenantId: string, id: string, updateActivityDto: UpdateActivityDto): Promise<any>;
    deleteActivity(tenantId: string, id: string): Promise<any>;
    convertToDeal(tenantId: string, leadId: string, dealData: any): Promise<any>;
}
