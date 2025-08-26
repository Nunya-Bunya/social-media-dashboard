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
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const campaign_ai_service_1 = require("./campaign.ai.service");
const campaign_analytics_service_1 = require("./campaign.analytics.service");
const campaign_templates_service_1 = require("./campaign.templates.service");
let CampaignsService = class CampaignsService {
    constructor(prisma, campaignAiService, campaignAnalyticsService, campaignTemplatesService) {
        this.prisma = prisma;
        this.campaignAiService = campaignAiService;
        this.campaignAnalyticsService = campaignAnalyticsService;
        this.campaignTemplatesService = campaignTemplatesService;
    }
    async createCampaign(createCampaignDto, tenantId, userId) {
        const brand = await this.prisma.brand.findFirst({
            where: { id: createCampaignDto.brandId, tenantId },
        });
        if (!brand) {
            throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
        }
        if (createCampaignDto.clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: createCampaignDto.clientId, tenantId },
            });
            if (!client) {
                throw new common_1.BadRequestException('Client not found or does not belong to tenant');
            }
        }
        if (createCampaignDto.templateId) {
            const template = await this.prisma.campaignTemplate.findUnique({
                where: { id: createCampaignDto.templateId },
            });
            if (!template) {
                throw new common_1.BadRequestException('Campaign template not found');
            }
        }
        if (createCampaignDto.assetIds && createCampaignDto.assetIds.length > 0) {
            const assets = await this.prisma.asset.findMany({
                where: { id: { in: createCampaignDto.assetIds }, tenantId },
            });
            if (assets.length !== createCampaignDto.assetIds.length) {
                throw new common_1.BadRequestException('Some assets not found or do not belong to tenant');
            }
        }
        const campaign = await this.prisma.campaign.create({
            data: {
                ...createCampaignDto,
                tenantId,
                createdBy: userId,
                assets: createCampaignDto.assetIds ? {
                    connect: createCampaignDto.assetIds.map(id => ({ id })),
                } : undefined,
            },
            include: {
                brand: true,
                client: true,
                template: true,
                assets: true,
                creator: {
                    select: { id: true, email: true },
                },
            },
        });
        if (createCampaignDto.templateId) {
            await this.campaignTemplatesService.incrementUsageCount(createCampaignDto.templateId);
        }
        return campaign;
    }
    async getCampaigns(tenantId, pagination) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status, type, goal, clientId, brandId } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            tenantId,
            ...(status && { status }),
            ...(type && { type }),
            ...(goal && { goal }),
            ...(clientId && { clientId }),
            ...(brandId && { brandId }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [campaigns, total] = await Promise.all([
            this.prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    brand: true,
                    client: true,
                    template: true,
                    _count: {
                        select: {
                            kpis: true,
                            analytics: true,
                        },
                    },
                },
            }),
            this.prisma.campaign.count({ where }),
        ]);
        return {
            data: campaigns,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
            include: {
                brand: true,
                client: true,
                template: true,
                assets: true,
                kpis: {
                    orderBy: { date: 'desc' },
                    take: 10,
                },
                analytics: {
                    orderBy: { date: 'desc' },
                    take: 10,
                },
                creator: {
                    select: { id: true, email: true },
                },
            },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return campaign;
    }
    async updateCampaign(id, updateCampaignDto, tenantId) {
        const existingCampaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!existingCampaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (existingCampaign.status === 'COMPLETED' || existingCampaign.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Cannot update completed or cancelled campaigns');
        }
        if (updateCampaignDto.brandId && updateCampaignDto.brandId !== existingCampaign.brandId) {
            const brand = await this.prisma.brand.findFirst({
                where: { id: updateCampaignDto.brandId, tenantId },
            });
            if (!brand) {
                throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
            }
        }
        if (updateCampaignDto.clientId && updateCampaignDto.clientId !== existingCampaign.clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: updateCampaignDto.clientId, tenantId },
            });
            if (!client) {
                throw new common_1.BadRequestException('Client not found or does not belong to tenant');
            }
        }
        let assetUpdates = {};
        if (updateCampaignDto.assetIds) {
            assetUpdates = {
                assets: {
                    set: updateCampaignDto.assetIds.map(id => ({ id })),
                },
            };
        }
        const campaign = await this.prisma.campaign.update({
            where: { id },
            data: {
                ...updateCampaignDto,
                ...assetUpdates,
                assetIds: undefined,
            },
            include: {
                brand: true,
                client: true,
                template: true,
                assets: true,
            },
        });
        return campaign;
    }
    async deleteCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.status === 'ACTIVE' || campaign.status === 'PLANNED') {
            throw new common_1.BadRequestException('Cannot delete active or planned campaigns');
        }
        await this.prisma.campaign.delete({
            where: { id },
        });
        return { message: 'Campaign deleted successfully' };
    }
    async launchCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.status !== 'DRAFT' && campaign.status !== 'PLANNED') {
            throw new common_1.BadRequestException('Campaign cannot be launched from current status');
        }
        if (!campaign.content || !campaign.targetAudience) {
            throw new common_1.BadRequestException('Campaign must have content and target audience before launch');
        }
        const updatedCampaign = await this.prisma.campaign.update({
            where: { id },
            data: {
                status: 'ACTIVE',
                launchedAt: new Date(),
            },
            include: {
                brand: true,
                client: true,
                template: true,
            },
        });
        return updatedCampaign;
    }
    async pauseCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Only active campaigns can be paused');
        }
        const updatedCampaign = await this.prisma.campaign.update({
            where: { id },
            data: { status: 'PAUSED' },
        });
        return updatedCampaign;
    }
    async resumeCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.status !== 'PAUSED') {
            throw new common_1.BadRequestException('Only paused campaigns can be resumed');
        }
        const updatedCampaign = await this.prisma.campaign.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
        return updatedCampaign;
    }
    async completeCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (campaign.status !== 'ACTIVE' && campaign.status !== 'PAUSED') {
            throw new common_1.BadRequestException('Campaign cannot be completed from current status');
        }
        const updatedCampaign = await this.prisma.campaign.update({
            where: { id },
            data: {
                status: 'COMPLETED',
                completedAt: new Date(),
            },
        });
        return updatedCampaign;
    }
    async duplicateCampaign(id, tenantId, duplicateData) {
        const originalCampaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
            include: { assets: true },
        });
        if (!originalCampaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        const duplicatedCampaign = await this.prisma.campaign.create({
            data: {
                name: duplicateData.name,
                description: duplicateData.description || originalCampaign.description,
                goal: originalCampaign.goal,
                type: originalCampaign.type,
                brandId: originalCampaign.brandId,
                clientId: originalCampaign.clientId,
                templateId: originalCampaign.templateId,
                targetAudience: originalCampaign.targetAudience,
                content: originalCampaign.content,
                budget: originalCampaign.budget,
                status: 'DRAFT',
                tenantId,
                createdBy: originalCampaign.createdBy,
                assets: originalCampaign.assets.length > 0 ? {
                    connect: originalCampaign.assets.map(asset => ({ id: asset.id })),
                } : undefined,
            },
            include: {
                brand: true,
                client: true,
                template: true,
                assets: true,
            },
        });
        return duplicatedCampaign;
    }
    async getCampaignStats(tenantId) {
        const [totalCampaigns, statusStats, typeStats, goalStats] = await Promise.all([
            this.prisma.campaign.count({ where: { tenantId } }),
            this.prisma.campaign.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { status: true },
            }),
            this.prisma.campaign.groupBy({
                by: ['type'],
                where: { tenantId },
                _count: { type: true },
            }),
            this.prisma.campaign.groupBy({
                by: ['goal'],
                where: { tenantId },
                _count: { goal: true },
            }),
        ]);
        const statusBreakdown = statusStats.reduce((acc, stat) => {
            acc[stat.status] = stat._count.status;
            return acc;
        }, {});
        const typeBreakdown = typeStats.reduce((acc, stat) => {
            acc[stat.type] = stat._count.type;
            return acc;
        }, {});
        const goalBreakdown = goalStats.reduce((acc, stat) => {
            acc[stat.goal] = stat._count.goal;
            return acc;
        }, {});
        return {
            totalCampaigns,
            statusBreakdown,
            typeBreakdown,
            goalBreakdown,
        };
    }
    async getClientCampaigns(clientId, tenantId, pagination) {
        const client = await this.prisma.client.findFirst({
            where: { id: clientId, tenantId },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            clientId,
            tenantId,
            ...(status && { status }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [campaigns, total] = await Promise.all([
            this.prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    brand: true,
                    template: true,
                    _count: {
                        select: {
                            kpis: true,
                            analytics: true,
                        },
                    },
                },
            }),
            this.prisma.campaign.count({ where }),
        ]);
        return {
            data: campaigns,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getBrandCampaigns(brandId, tenantId, pagination) {
        const brand = await this.prisma.brand.findFirst({
            where: { id: brandId, tenantId },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            brandId,
            tenantId,
            ...(status && { status }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [campaigns, total] = await Promise.all([
            this.prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    client: true,
                    template: true,
                    _count: {
                        select: {
                            kpis: true,
                            analytics: true,
                        },
                    },
                },
            }),
            this.prisma.campaign.count({ where }),
        ]);
        return {
            data: campaigns,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        campaign_ai_service_1.CampaignAiService,
        campaign_analytics_service_1.CampaignAnalyticsService,
        campaign_templates_service_1.CampaignTemplatesService])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map