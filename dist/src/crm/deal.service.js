"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let DealService = class DealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDeal(tenantId, createDealDto) {
        return this.prisma.deal.create({
            data: {
                ...createDealDto,
                tenantId,
            },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
    }
    async getDeals(tenantId, filters) {
        const where = { tenantId };
        if (filters?.stage)
            where.stage = filters.stage;
        if (filters?.assignedTo)
            where.assignedTo = filters.assignedTo;
        if (filters?.clientId)
            where.clientId = filters.clientId;
        if (filters?.leadId)
            where.leadId = filters.leadId;
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.deal.findMany({
            where,
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getDeal(tenantId, id) {
        return this.prisma.deal.findFirst({
            where: { id, tenantId },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
    }
    async updateDeal(tenantId, id, updateDealDto) {
        return this.prisma.deal.update({
            where: { id, tenantId },
            data: updateDealDto,
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
    }
    async deleteDeal(tenantId, id) {
        return this.prisma.deal.delete({
            where: { id, tenantId },
        });
    }
    async moveDealStage(tenantId, id, stage) {
        return this.prisma.deal.update({
            where: { id, tenantId },
            data: { stage },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
    }
    async closeDeal(tenantId, id, won, closedAt) {
        const stage = won ? 'CLOSED_WON' : 'CLOSED_LOST';
        return this.prisma.deal.update({
            where: { id, tenantId },
            data: {
                stage,
                closedAt: closedAt || new Date(),
            },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
    }
    async getDealStats(tenantId) {
        const [total, byStage, totalValue, wonValue] = await Promise.all([
            this.prisma.deal.count({ where: { tenantId } }),
            this.prisma.deal.groupBy({
                by: ['stage'],
                where: { tenantId },
                _count: { stage: true },
                _sum: { value: true },
            }),
            this.prisma.deal.aggregate({
                where: { tenantId },
                _sum: { value: true },
            }),
            this.prisma.deal.aggregate({
                where: { tenantId, stage: 'CLOSED_WON' },
                _sum: { value: true },
            }),
        ]);
        return {
            total,
            byStage,
            totalValue: totalValue._sum.value || 0,
            wonValue: wonValue._sum.value || 0,
            winRate: total > 0 ? (byStage.find(s => s.stage === 'CLOSED_WON')?._count.stage || 0) / total * 100 : 0,
        };
    }
    async getPipeline(tenantId) {
        const deals = await this.prisma.deal.findMany({
            where: {
                tenantId,
                stage: {
                    notIn: ['CLOSED_WON', 'CLOSED_LOST'],
                },
            },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
            orderBy: { expectedClose: 'asc' },
        });
        const pipeline = {
            PROSPECT: [],
            QUALIFICATION: [],
            PROPOSAL: [],
            NEGOTIATION: [],
        };
        deals.forEach(deal => {
            if (pipeline[deal.stage]) {
                pipeline[deal.stage].push(deal);
            }
        });
        return pipeline;
    }
    async getForecast(tenantId, months = 3) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        const deals = await this.prisma.deal.findMany({
            where: {
                tenantId,
                stage: {
                    notIn: ['CLOSED_WON', 'CLOSED_LOST'],
                },
                expectedClose: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                lead: true,
                assignedUser: true,
                client: true,
            },
        });
        const forecast = deals.reduce((total, deal) => {
            const weightedValue = (deal.value || 0) * (deal.probability || 0) / 100;
            return total + weightedValue;
        }, 0);
        return {
            deals,
            forecast,
            months,
        };
    }
    async getDealAnalytics(tenantId, period = 'month') {
        const now = new Date();
        let startDate = new Date();
        switch (period) {
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'quarter':
                startDate.setMonth(now.getMonth() - 3);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }
        const [created, closed, won] = await Promise.all([
            this.prisma.deal.count({
                where: {
                    tenantId,
                    createdAt: { gte: startDate },
                },
            }),
            this.prisma.deal.count({
                where: {
                    tenantId,
                    closedAt: { gte: startDate },
                },
            }),
            this.prisma.deal.count({
                where: {
                    tenantId,
                    stage: 'CLOSED_WON',
                    closedAt: { gte: startDate },
                },
            }),
        ]);
        return {
            period,
            created,
            closed,
            won,
            winRate: closed > 0 ? (won / closed) * 100 : 0,
        };
    }
};
exports.DealService = DealService;
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealService);
//# sourceMappingURL=deal.service.js.map