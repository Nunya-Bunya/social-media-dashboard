import { CRMService } from './crm.service';
import { LeadService } from './lead.service';
import { PrismaService } from '../common/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class CRMController {
    private readonly crmService;
    private readonly leadService;
    private readonly prisma;
    constructor(crmService: CRMService, leadService: LeadService, prisma: PrismaService);
    createLead(createLeadDto: any, req: any): any;
    findAllLeads(pagination: PaginationDto, req: any): any;
    findOneLead(id: string, req: any): any;
    updateLead(id: string, updateLeadDto: any, req: any): any;
    removeLead(id: string, req: any): any;
    getDashboard(req: any): Promise<{
        totalLeads: any;
        newLeads: any;
        qualifiedLeads: any;
        totalClients: any;
        leadStats: any;
        conversionRate: number;
    }>;
    createLeadActivity(id: string, createActivityDto: any, req: any): Promise<any>;
    getLeadActivities(id: string, req: any): Promise<any>;
    updateLeadActivity(id: string, updateActivityDto: any, req: any): Promise<any>;
    removeLeadActivity(id: string, req: any): any;
}
