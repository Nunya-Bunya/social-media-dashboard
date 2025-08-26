import { PrismaService } from '../common/prisma.service';
import { CreateDealDto, UpdateDealDto } from './dto/crm.dto';
export declare class DealService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(tenantId: string, createDealDto: CreateDealDto): Promise<any>;
    getDeals(tenantId: string, filters?: any): Promise<any>;
    getDeal(tenantId: string, id: string): Promise<any>;
    updateDeal(tenantId: string, id: string, updateDealDto: UpdateDealDto): Promise<any>;
    deleteDeal(tenantId: string, id: string): Promise<any>;
    moveDealStage(tenantId: string, id: string, stage: string): Promise<any>;
    closeDeal(tenantId: string, id: string, won: boolean, closedAt?: Date): Promise<any>;
    getDealStats(tenantId: string): Promise<{
        total: any;
        byStage: any;
        totalValue: any;
        wonValue: any;
        winRate: number;
    }>;
    getPipeline(tenantId: string): Promise<{
        PROSPECT: any[];
        QUALIFICATION: any[];
        PROPOSAL: any[];
        NEGOTIATION: any[];
    }>;
    getForecast(tenantId: string, months?: number): Promise<{
        deals: any;
        forecast: any;
        months: number;
    }>;
    getDealAnalytics(tenantId: string, period?: 'week' | 'month' | 'quarter' | 'year'): Promise<{
        period: "week" | "month" | "quarter" | "year";
        created: any;
        closed: any;
        won: any;
        winRate: number;
    }>;
}
