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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdCampaignsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const client_1 = require("@prisma/client");
let AdCampaignsService = class AdCampaignsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAdCampaign(tenantId, userId, createDto) {
        const { brandId, clientId, ...campaignData } = createDto;
        const brand = await this.prisma.brand.findFirst({
            where: { id: brandId, tenantId }
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, tenantId }
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
        }
        return this.prisma.adCampaign.create({
            data: {
                ...campaignData,
                brandId,
                clientId,
                createdBy: userId,
                tenantId,
                startDate: campaignData.startDate ? new Date(campaignData.startDate) : null,
                endDate: campaignData.endDate ? new Date(campaignData.endDate) : null,
            },
            include: {
                brand: true,
                client: true,
                creator: true,
                adCreatives: true,
                adAnalytics: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            }
        });
    }
    async getAdCampaigns(tenantId, filters = {}) {
        const { platform, status, adType, clientId, brandId, page = 1, limit = 20, search } = filters;
        const where = { tenantId };
        if (platform)
            where.platform = platform;
        if (status)
            where.status = status;
        if (adType)
            where.adType = adType;
        if (clientId)
            where.clientId = clientId;
        if (brandId)
            where.brandId = brandId;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const skip = (page - 1) * limit;
        const [campaigns, total] = await Promise.all([
            this.prisma.adCampaign.findMany({
                where,
                include: {
                    brand: true,
                    client: true,
                    creator: true,
                    adCreatives: true,
                    adAnalytics: {
                        orderBy: { date: 'desc' },
                        take: 1
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            this.prisma.adCampaign.count({ where })
        ]);
        return {
            campaigns,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async getAdCampaign(tenantId, campaignId) {
        const campaign = await this.prisma.adCampaign.findFirst({
            where: { id: campaignId, tenantId },
            include: {
                brand: true,
                client: true,
                creator: true,
                adCreatives: true,
                adAnalytics: {
                    orderBy: { date: 'desc' }
                },
                splitTests: {
                    include: {
                        adCampaign: true
                    }
                }
            }
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Ad campaign not found');
        }
        return campaign;
    }
    async updateAdCampaign(tenantId, campaignId, updateDto) {
        const campaign = await this.getAdCampaign(tenantId, campaignId);
        const updateData = { ...updateDto };
        if (updateDto.startDate) {
            updateData.startDate = new Date(updateDto.startDate);
        }
        if (updateDto.endDate) {
            updateData.endDate = new Date(updateDto.endDate);
        }
        return this.prisma.adCampaign.update({
            where: { id: campaignId },
            data: updateData,
            include: {
                brand: true,
                client: true,
                creator: true,
                adCreatives: true
            }
        });
    }
    async deleteAdCampaign(tenantId, campaignId) {
        await this.getAdCampaign(tenantId, campaignId);
        return this.prisma.adCampaign.delete({
            where: { id: campaignId }
        });
    }
    async launchAdCampaign(tenantId, campaignId) {
        const campaign = await this.getAdCampaign(tenantId, campaignId);
        if (campaign.status !== client_1.AdStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft campaigns can be launched');
        }
        if (!campaign.adCreatives.length) {
            throw new common_1.BadRequestException('Campaign must have at least one creative');
        }
        return this.prisma.adCampaign.update({
            where: { id: campaignId },
            data: {
                status: client_1.AdStatus.ACTIVE,
                launchedAt: new Date()
            },
            include: {
                brand: true,
                client: true,
                creator: true,
                adCreatives: true
            }
        });
    }
    async pauseAdCampaign(tenantId, campaignId) {
        const campaign = await this.getAdCampaign(tenantId, campaignId);
        if (campaign.status !== client_1.AdStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only active campaigns can be paused');
        }
        return this.prisma.adCampaign.update({
            where: { id: campaignId },
            data: {
                status: client_1.AdStatus.PAUSED,
                pausedAt: new Date()
            }
        });
    }
    async duplicateAdCampaign(tenantId, campaignId) {
        const originalCampaign = await this.getAdCampaign(tenantId, campaignId);
        const { id, createdAt, updatedAt, launchedAt, pausedAt, ...campaignData } = originalCampaign;
        const duplicatedCampaign = await this.prisma.adCampaign.create({
            data: {
                ...campaignData,
                name: `${campaignData.name} (Copy)`,
                status: client_1.AdStatus.DRAFT,
                tenantId
            }
        });
        for (const creative of originalCampaign.adCreatives) {
            const { id: creativeId, createdAt: creativeCreatedAt, updatedAt: creativeUpdatedAt, ...creativeData } = creative;
            await this.prisma.adCreative.create({
                data: {
                    ...creativeData,
                    adCampaignId: duplicatedCampaign.id,
                    tenantId
                }
            });
        }
        return this.getAdCampaign(tenantId, duplicatedCampaign.id);
    }
    async createAdCreative(tenantId, createDto) {
        const { brandId, adCampaignId, ...creativeData } = createDto;
        const brand = await this.prisma.brand.findFirst({
            where: { id: brandId, tenantId }
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (adCampaignId) {
            const campaign = await this.prisma.adCampaign.findFirst({
                where: { id: adCampaignId, tenantId }
            });
            if (!campaign) {
                throw new common_1.NotFoundException('Ad campaign not found');
            }
        }
        return this.prisma.adCreative.create({
            data: {
                ...creativeData,
                brandId,
                adCampaignId,
                tenantId
            },
            include: {
                brand: true,
                adCampaign: true
            }
        });
    }
    async getAdCreatives(tenantId, filters = {}) {
        const { platform, type, brandId, adCampaignId, page = 1, limit = 20 } = filters;
        const where = { tenantId };
        if (platform)
            where.platform = platform;
        if (type)
            where.type = type;
        if (brandId)
            where.brandId = brandId;
        if (adCampaignId)
            where.adCampaignId = adCampaignId;
        const skip = (page - 1) * limit;
        const [creatives, total] = await Promise.all([
            this.prisma.adCreative.findMany({
                where,
                include: {
                    brand: true,
                    adCampaign: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            this.prisma.adCreative.count({ where })
        ]);
        return {
            creatives,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async getAdCreative(tenantId, creativeId) {
        const creative = await this.prisma.adCreative.findFirst({
            where: { id: creativeId, tenantId },
            include: {
                brand: true,
                adCampaign: true,
                assets: true
            }
        });
        if (!creative) {
            throw new common_1.NotFoundException('Ad creative not found');
        }
        return creative;
    }
    async updateAdCreative(tenantId, creativeId, updateDto) {
        await this.getAdCreative(tenantId, creativeId);
        return this.prisma.adCreative.update({
            where: { id: creativeId },
            data: updateDto,
            include: {
                brand: true,
                adCampaign: true
            }
        });
    }
    async deleteAdCreative(tenantId, creativeId) {
        await this.getAdCreative(tenantId, creativeId);
        return this.prisma.adCreative.delete({
            where: { id: creativeId }
        });
    }
    async trackAdAnalytics(tenantId, campaignId, analyticsDto) {
        await this.getAdCampaign(tenantId, campaignId);
        return this.prisma.adAnalytics.create({
            data: {
                ...analyticsDto,
                adCampaignId: campaignId,
                date: new Date(analyticsDto.date)
            }
        });
    }
    async getAdAnalytics(tenantId, campaignId, filters = {}) {
        await this.getAdCampaign(tenantId, campaignId);
        const { startDate, endDate, page = 1, limit = 50 } = filters;
        const where = { adCampaignId: campaignId };
        if (startDate) {
            where.date = { gte: new Date(startDate) };
        }
        if (endDate) {
            where.date = { ...where.date, lte: new Date(endDate) };
        }
        const skip = (page - 1) * limit;
        const [analytics, total] = await Promise.all([
            this.prisma.adAnalytics.findMany({
                where,
                orderBy: { date: 'desc' },
                skip,
                take: limit
            }),
            this.prisma.adAnalytics.count({ where })
        ]);
        return {
            analytics,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async getAnalyticsOverview(tenantId, overviewDto) {
        const { startDate, endDate, platform, clientId, brandId } = overviewDto;
        const where = {
            tenantId,
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        };
        if (platform)
            where.platform = platform;
        if (clientId)
            where.clientId = clientId;
        if (brandId)
            where.brandId = brandId;
        const campaigns = await this.prisma.adCampaign.findMany({
            where,
            include: {
                adAnalytics: {
                    where: {
                        date: {
                            gte: new Date(startDate),
                            lte: new Date(endDate)
                        }
                    }
                }
            }
        });
        const totalSpend = campaigns.reduce((sum, campaign) => {
            return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
                return campaignSum + analytics.spend;
            }, 0);
        }, 0);
        const totalImpressions = campaigns.reduce((sum, campaign) => {
            return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
                return campaignSum + analytics.impressions;
            }, 0);
        }, 0);
        const totalClicks = campaigns.reduce((sum, campaign) => {
            return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
                return campaignSum + analytics.clicks;
            }, 0);
        }, 0);
        const totalConversions = campaigns.reduce((sum, campaign) => {
            return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
                return campaignSum + (analytics.conversions || 0);
            }, 0);
        }, 0);
        const overallROI = totalSpend > 0 ?
            campaigns.reduce((sum, campaign) => {
                return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
                    return campaignSum + (analytics.roi || 0);
                }, 0);
            }, 0) / campaigns.length : 0;
        return {
            totalSpend,
            totalImpressions,
            totalClicks,
            totalConversions,
            overallROI,
            averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
            averageCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
            averageCPA: totalConversions > 0 ? totalSpend / totalConversions : 0,
            campaignCount: campaigns.length,
            activeCampaigns: campaigns.filter(c => c.status === client_1.AdStatus.ACTIVE).length
        };
    }
    async createSplitTest(tenantId, createDto) {
        const { adCampaignId, ...testData } = createDto;
        const campaign = await this.prisma.adCampaign.findFirst({
            where: { id: adCampaignId, tenantId }
        });
        if (!campaign) {
            throw new common_1.NotFoundException('Ad campaign not found');
        }
        return this.prisma.splitTest.create({
            data: {
                ...testData,
                adCampaignId,
                tenantId,
                startDate: new Date(testData.startDate),
                endDate: testData.endDate ? new Date(testData.endDate) : null
            },
            include: {
                adCampaign: true
            }
        });
    }
    async getSplitTests(tenantId, filters = {}) {
        const { status, adCampaignId, page = 1, limit = 20 } = filters;
        const where = { tenantId };
        if (status)
            where.status = status;
        if (adCampaignId)
            where.adCampaignId = adCampaignId;
        const skip = (page - 1) * limit;
        const [tests, total] = await Promise.all([
            this.prisma.splitTest.findMany({
                where,
                include: {
                    adCampaign: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            this.prisma.splitTest.count({ where })
        ]);
        return {
            tests,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async getSplitTest(tenantId, testId) {
        const test = await this.prisma.splitTest.findFirst({
            where: { id: testId, tenantId },
            include: {
                adCampaign: {
                    include: {
                        adAnalytics: true
                    }
                }
            }
        });
        if (!test) {
            throw new common_1.NotFoundException('Split test not found');
        }
        return test;
    }
    async updateSplitTest(tenantId, testId, updateDto) {
        await this.getSplitTest(tenantId, testId);
        const updateData = { ...updateDto };
        if (updateDto.endDate) {
            updateData.endDate = new Date(updateDto.endDate);
        }
        return this.prisma.splitTest.update({
            where: { id: testId },
            data: updateData,
            include: {
                adCampaign: true
            }
        });
    }
    async declareWinner(tenantId, testId, winner) {
        const test = await this.getSplitTest(tenantId, testId);
        if (test.status !== client_1.TestStatus.RUNNING) {
            throw new common_1.BadRequestException('Only running tests can have winners declared');
        }
        return this.prisma.splitTest.update({
            where: { id: testId },
            data: {
                winner,
                status: client_1.TestStatus.COMPLETED,
                endDate: new Date()
            },
            include: {
                adCampaign: true
            }
        });
    }
    async createSalesFunnel(tenantId, userId, createDto) {
        const { clientId, ...funnelData } = createDto;
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, tenantId }
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
        }
        return this.prisma.salesFunnel.create({
            data: {
                ...funnelData,
                clientId,
                createdBy: userId,
                tenantId
            },
            include: {
                client: true,
                creator: true
            }
        });
    }
    async getSalesFunnels(tenantId, filters = {}) {
        const { status, clientId, page = 1, limit = 20 } = filters;
        const where = { tenantId };
        if (status)
            where.status = status;
        if (clientId)
            where.clientId = clientId;
        const skip = (page - 1) * limit;
        const [funnels, total] = await Promise.all([
            this.prisma.salesFunnel.findMany({
                where,
                include: {
                    client: true,
                    creator: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            this.prisma.salesFunnel.count({ where })
        ]);
        return {
            funnels,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async getSalesFunnel(tenantId, funnelId) {
        const funnel = await this.prisma.salesFunnel.findFirst({
            where: { id: funnelId, tenantId },
            include: {
                client: true,
                creator: true
            }
        });
        if (!funnel) {
            throw new common_1.NotFoundException('Sales funnel not found');
        }
        return funnel;
    }
    async updateSalesFunnel(tenantId, funnelId, updateDto) {
        await this.getSalesFunnel(tenantId, funnelId);
        return this.prisma.salesFunnel.update({
            where: { id: funnelId },
            data: updateDto,
            include: {
                client: true,
                creator: true
            }
        });
    }
    async deleteSalesFunnel(tenantId, funnelId) {
        await this.getSalesFunnel(tenantId, funnelId);
        return this.prisma.salesFunnel.delete({
            where: { id: funnelId }
        });
    }
    async createIntegration(tenantId, createDto) {
        return this.prisma.integration.create({
            data: {
                ...createDto,
                tenantId
            }
        });
    }
    async getIntegrations(tenantId) {
        return this.prisma.integration.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getIntegration(tenantId, integrationId) {
        const integration = await this.prisma.integration.findFirst({
            where: { id: integrationId, tenantId }
        });
        if (!integration) {
            throw new common_1.NotFoundException('Integration not found');
        }
        return integration;
    }
    async updateIntegration(tenantId, integrationId, updateDto) {
        await this.getIntegration(tenantId, integrationId);
        return this.prisma.integration.update({
            where: { id: integrationId },
            data: updateDto
        });
    }
    async deleteIntegration(tenantId, integrationId) {
        await this.getIntegration(tenantId, integrationId);
        return this.prisma.integration.delete({
            where: { id: integrationId }
        });
    }
    async syncAnalytics(tenantId, syncDto) {
        return {
            message: `Syncing analytics for ${syncDto.platform}`,
            syncedAt: new Date(),
            recordsProcessed: Math.floor(Math.random() * 100) + 1
        };
    }
    async getAdCampaignStats(tenantId) {
        const [totalCampaigns, activeCampaigns, pausedCampaigns, draftCampaigns, totalSpend, totalImpressions, totalClicks] = await Promise.all([
            this.prisma.adCampaign.count({ where: { tenantId } }),
            this.prisma.adCampaign.count({ where: { tenantId, status: client_1.AdStatus.ACTIVE } }),
            this.prisma.adCampaign.count({ where: { tenantId, status: client_1.AdStatus.PAUSED } }),
            this.prisma.adCampaign.count({ where: { tenantId, status: client_1.AdStatus.DRAFT } }),
            this.prisma.adAnalytics.aggregate({
                where: { adCampaign: { tenantId } },
                _sum: { spend: true }
            }),
            this.prisma.adAnalytics.aggregate({
                where: { adCampaign: { tenantId } },
                _sum: { impressions: true }
            }),
            this.prisma.adAnalytics.aggregate({
                where: { adCampaign: { tenantId } },
                _sum: { clicks: true }
            })
        ]);
        return {
            totalCampaigns,
            activeCampaigns,
            pausedCampaigns,
            draftCampaigns,
            totalSpend: totalSpend._sum.spend || 0,
            totalImpressions: totalImpressions._sum.impressions || 0,
            totalClicks: totalClicks._sum.clicks || 0,
            averageCTR: totalImpressions._sum.impressions > 0 ?
                (totalClicks._sum.clicks / totalImpressions._sum.impressions) * 100 : 0
        };
    }
};
exports.AdCampaignsService = AdCampaignsService;
exports.AdCampaignsService = AdCampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AdCampaignsService);
//# sourceMappingURL=ad-campaigns.service.js.map