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
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let AssetsService = class AssetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAsset(createAssetDto, userId, tenantId) {
        const { projectId, clientId, ...assetData } = createAssetDto;
        if (projectId) {
            const project = await this.prisma.project.findFirst({
                where: { id: projectId, tenantId },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
        }
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, tenantId },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
        }
        const asset = await this.prisma.asset.create({
            data: {
                ...assetData,
                projectId,
                clientId,
                uploadedBy: userId,
                tenantId,
                status: 'UPLOADING',
            },
            include: {
                project: true,
                client: true,
                uploader: true,
            },
        });
        this.analyzeAsset(asset.id);
        return asset;
    }
    async getAssets(pagination, tenantId) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const where = {
            tenantId,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { tags: { hasSome: [search] } },
                ],
            }),
        };
        const [assets, total] = await Promise.all([
            this.prisma.asset.findMany({
                where,
                include: {
                    project: true,
                    client: true,
                    uploader: true,
                    optimizations: true,
                },
                orderBy: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.asset.count({ where }),
        ]);
        return {
            data: assets,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async searchAssets(searchDto, tenantId) {
        const { query, type, status, clientId, projectId, tags, dateFrom, dateTo, } = searchDto;
        const where = { tenantId };
        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { tags: { hasSome: [query] } },
                { aiTags: { hasSome: [query] } },
            ];
        }
        if (type)
            where.type = type;
        if (status)
            where.status = status;
        if (clientId)
            where.clientId = clientId;
        if (projectId)
            where.projectId = projectId;
        if (tags && tags.length > 0) {
            where.OR = [
                { tags: { hasSome: tags } },
                { aiTags: { hasSome: tags } },
            ];
        }
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom)
                where.createdAt.gte = new Date(dateFrom);
            if (dateTo)
                where.createdAt.lte = new Date(dateTo);
        }
        const assets = await this.prisma.asset.findMany({
            where,
            include: {
                project: true,
                client: true,
                uploader: true,
                optimizations: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return assets;
    }
    async getAsset(id, tenantId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id, tenantId },
            include: {
                project: true,
                client: true,
                uploader: true,
                optimizations: true,
                deployments: {
                    include: {
                        asset: true,
                    },
                },
            },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Asset not found');
        }
        return asset;
    }
    async updateAsset(id, updateAssetDto, tenantId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id, tenantId },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Asset not found');
        }
        const updatedAsset = await this.prisma.asset.update({
            where: { id },
            data: updateAssetDto,
            include: {
                project: true,
                client: true,
                uploader: true,
                optimizations: true,
            },
        });
        return updatedAsset;
    }
    async deleteAsset(id, tenantId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id, tenantId },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Asset not found');
        }
        await this.prisma.asset.update({
            where: { id },
            data: {
                status: 'ARCHIVED',
                archivedAt: new Date(),
            },
        });
        return { message: 'Asset archived successfully' };
    }
    async batchOperation(batchDto, tenantId) {
        const { assetIds, operation, data } = batchDto;
        const assets = await this.prisma.asset.findMany({
            where: {
                id: { in: assetIds },
                tenantId,
            },
        });
        if (assets.length !== assetIds.length) {
            throw new common_1.BadRequestException('Some assets not found or not accessible');
        }
        switch (operation) {
            case 'tag':
                await this.prisma.asset.updateMany({
                    where: { id: { in: assetIds } },
                    data: {
                        tags: data.tags || [],
                    },
                });
                break;
            case 'organize':
                await this.prisma.asset.updateMany({
                    where: { id: { in: assetIds } },
                    data: {
                        projectId: data.projectId,
                        clientId: data.clientId,
                    },
                });
                break;
            case 'deploy':
                const deployments = assetIds.map(assetId => ({
                    assetId,
                    platform: data.platform,
                    status: 'DRAFT',
                    scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
                    caption: data.caption,
                    hashtags: data.hashtags || [],
                    createdBy: data.userId,
                    tenantId,
                }));
                await this.prisma.deployment.createMany({
                    data: deployments,
                });
                break;
            case 'archive':
                await this.prisma.asset.updateMany({
                    where: { id: { in: assetIds } },
                    data: {
                        status: 'ARCHIVED',
                        archivedAt: new Date(),
                    },
                });
                break;
            default:
                throw new common_1.BadRequestException('Invalid operation');
        }
        return { message: `Batch ${operation} completed successfully` };
    }
    async getAssetOptimizations(assetId, tenantId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id: assetId, tenantId },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Asset not found');
        }
        const optimizations = await this.prisma.assetOptimization.findMany({
            where: { assetId },
            orderBy: { createdAt: 'desc' },
        });
        return optimizations;
    }
    async generateOptimizations(assetId, tenantId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id: assetId, tenantId },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Asset not found');
        }
        const platforms = ['INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'TIKTOK', 'YOUTUBE'];
        const formats = ['1:1', '9:16', '16:9', '4:5'];
        const optimizations = [];
        for (const platform of platforms) {
            for (const format of formats) {
                const optimization = await this.prisma.assetOptimization.create({
                    data: {
                        assetId,
                        platform: platform,
                        format,
                        fileUrl: `${asset.fileUrl}_${platform.toLowerCase()}_${format.replace(':', 'x')}`,
                        fileSize: asset.fileSize,
                        dimensions: asset.dimensions,
                        status: 'processing',
                    },
                });
                optimizations.push(optimization);
            }
        }
        this.processOptimizations(assetId);
        return optimizations;
    }
    async analyzeAsset(assetId) {
        setTimeout(async () => {
            const aiTags = ['professional', 'high-quality', 'marketing'];
            const qualityScore = Math.random() * 100;
            await this.prisma.asset.update({
                where: { id: assetId },
                data: {
                    status: 'READY',
                    aiTags,
                    qualityScore,
                },
            });
        }, 2000);
    }
    async processOptimizations(assetId) {
        setTimeout(async () => {
            await this.prisma.assetOptimization.updateMany({
                where: { assetId },
                data: { status: 'ready' },
            });
        }, 5000);
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AssetsService);
//# sourceMappingURL=assets.service.js.map