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
exports.LeadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let LeadService = class LeadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLead(tenantId, createLeadDto) {
        return this.prisma.lead.create({
            data: {
                ...createLeadDto,
                tenantId,
            },
            include: {
                client: true,
                assignedUser: true,
                deals: true,
                activities: true,
            },
        });
    }
    async getLeads(tenantId, filters) {
        const where = { tenantId };
        if (filters?.status)
            where.status = filters.status;
        if (filters?.source)
            where.source = filters.source;
        if (filters?.assignedTo)
            where.assignedTo = filters.assignedTo;
        if (filters?.clientId)
            where.clientId = filters.clientId;
        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search, mode: 'insensitive' } },
                { lastName: { contains: filters.search, mode: 'insensitive' } },
                { email: { contains: filters.search, mode: 'insensitive' } },
                { company: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.lead.findMany({
            where,
            include: {
                client: true,
                assignedUser: true,
                deals: true,
                activities: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getLead(tenantId, id) {
        return this.prisma.lead.findFirst({
            where: { id, tenantId },
            include: {
                client: true,
                assignedUser: true,
                deals: true,
                activities: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }
    async updateLead(tenantId, id, updateLeadDto) {
        return this.prisma.lead.update({
            where: { id, tenantId },
            data: updateLeadDto,
            include: {
                client: true,
                assignedUser: true,
                deals: true,
                activities: true,
            },
        });
    }
    async deleteLead(tenantId, id) {
        return this.prisma.lead.delete({
            where: { id, tenantId },
        });
    }
    async scoreLead(tenantId, id, score) {
        return this.prisma.lead.update({
            where: { id, tenantId },
            data: { score },
        });
    }
    async getLeadStats(tenantId) {
        const [total, byStatus, bySource] = await Promise.all([
            this.prisma.lead.count({ where: { tenantId } }),
            this.prisma.lead.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { status: true },
            }),
            this.prisma.lead.groupBy({
                by: ['source'],
                where: { tenantId },
                _count: { source: true },
            }),
        ]);
        return {
            total,
            byStatus,
            bySource,
        };
    }
    async createActivity(tenantId, createActivityDto) {
        const lead = await this.prisma.lead.findFirst({
            where: { id: createActivityDto.leadId, tenantId },
        });
        if (!lead) {
            throw new Error('Lead not found');
        }
        return this.prisma.leadActivity.create({
            data: createActivityDto,
            include: {
                lead: true,
            },
        });
    }
    async getActivities(tenantId, leadId) {
        const where = {};
        if (leadId) {
            where.leadId = leadId;
            const lead = await this.prisma.lead.findFirst({
                where: { id: leadId, tenantId },
            });
            if (!lead) {
                throw new Error('Lead not found');
            }
        }
        return this.prisma.leadActivity.findMany({
            where,
            include: {
                lead: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateActivity(tenantId, id, updateActivityDto) {
        const activity = await this.prisma.leadActivity.findFirst({
            where: { id },
            include: { lead: true },
        });
        if (!activity || activity.lead.tenantId !== tenantId) {
            throw new Error('Activity not found');
        }
        return this.prisma.leadActivity.update({
            where: { id },
            data: updateActivityDto,
            include: {
                lead: true,
            },
        });
    }
    async deleteActivity(tenantId, id) {
        const activity = await this.prisma.leadActivity.findFirst({
            where: { id },
            include: { lead: true },
        });
        if (!activity || activity.lead.tenantId !== tenantId) {
            throw new Error('Activity not found');
        }
        return this.prisma.leadActivity.delete({
            where: { id },
        });
    }
    async convertToDeal(tenantId, leadId, dealData) {
        const lead = await this.prisma.lead.findFirst({
            where: { id: leadId, tenantId },
        });
        if (!lead) {
            throw new Error('Lead not found');
        }
        return this.prisma.$transaction(async (tx) => {
            const deal = await tx.deal.create({
                data: {
                    ...dealData,
                    leadId,
                    tenantId,
                },
            });
            await tx.lead.update({
                where: { id: leadId },
                data: { status: 'CLOSED_WON' },
            });
            return deal;
        });
    }
};
exports.LeadService = LeadService;
exports.LeadService = LeadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadService);
//# sourceMappingURL=lead.service.js.map