import { PrismaService } from '../common/prisma.service';
import { CreateLeadDto, UpdateLeadDto, CreateActivityDto, UpdateActivityDto } from './dto/crm.dto';
export declare class LeadService {
    private prisma;
    constructor(prisma: PrismaService);
    createLead(tenantId: string, createLeadDto: CreateLeadDto): Promise<any>;
    getLeads(tenantId: string, filters?: any): Promise<any>;
    getLead(tenantId: string, id: string): Promise<any>;
    updateLead(tenantId: string, id: string, updateLeadDto: UpdateLeadDto): Promise<any>;
    deleteLead(tenantId: string, id: string): Promise<any>;
    scoreLead(tenantId: string, id: string, score: number): Promise<any>;
    getLeadStats(tenantId: string): Promise<{
        total: any;
        byStatus: any;
        bySource: any;
    }>;
    createActivity(tenantId: string, createActivityDto: CreateActivityDto): Promise<any>;
    getActivities(tenantId: string, leadId?: string): Promise<any>;
    updateActivity(tenantId: string, id: string, updateActivityDto: UpdateActivityDto): Promise<any>;
    deleteActivity(tenantId: string, id: string): Promise<any>;
    convertToDeal(tenantId: string, leadId: string, dealData: any): Promise<any>;
}
