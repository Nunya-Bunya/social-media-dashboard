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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let TemplatesService = class TemplatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTemplate(createTemplateDto, tenantId) {
        const existingTemplate = await this.prisma.template.findFirst({
            where: {
                name: createTemplateDto.name,
                brandId: createTemplateDto.brandId,
                tenantId,
            },
        });
        if (existingTemplate) {
            throw new common_1.BadRequestException('Template name already exists for this brand');
        }
        const brand = await this.prisma.brand.findFirst({
            where: { id: createTemplateDto.brandId, tenantId },
        });
        if (!brand) {
            throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
        }
        const template = await this.prisma.template.create({
            data: {
                ...createTemplateDto,
                tenantId,
            },
            include: {
                brand: true,
                assets: true,
            },
        });
        return template;
    }
    async getTemplates(tenantId, pagination) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', brandId, type } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            tenantId,
            ...(brandId && { brandId }),
            ...(type && { type }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [templates, total] = await Promise.all([
            this.prisma.template.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    brand: true,
                    _count: {
                        select: {
                            videoProjects: true,
                            printProjects: true,
                            assets: true,
                        },
                    },
                },
            }),
            this.prisma.template.count({ where }),
        ]);
        return {
            data: templates,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getTemplate(id, tenantId) {
        const template = await this.prisma.template.findFirst({
            where: { id, tenantId },
            include: {
                brand: true,
                assets: true,
                _count: {
                    select: {
                        videoProjects: true,
                        printProjects: true,
                    },
                },
                videoProjects: {
                    take: 5,
                    orderBy: { updatedAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        updatedAt: true,
                    },
                },
                printProjects: {
                    take: 5,
                    orderBy: { updatedAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        return template;
    }
    async updateTemplate(id, updateTemplateDto, tenantId) {
        const existingTemplate = await this.prisma.template.findFirst({
            where: { id, tenantId },
        });
        if (!existingTemplate) {
            throw new common_1.NotFoundException('Template not found');
        }
        if (updateTemplateDto.name && updateTemplateDto.name !== existingTemplate.name) {
            const nameConflict = await this.prisma.template.findFirst({
                where: {
                    name: updateTemplateDto.name,
                    brandId: existingTemplate.brandId,
                    tenantId,
                    id: { not: id },
                },
            });
            if (nameConflict) {
                throw new common_1.BadRequestException('Template name already exists for this brand');
            }
        }
        if (updateTemplateDto.brandId && updateTemplateDto.brandId !== existingTemplate.brandId) {
            const brand = await this.prisma.brand.findFirst({
                where: { id: updateTemplateDto.brandId, tenantId },
            });
            if (!brand) {
                throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
            }
        }
        const template = await this.prisma.template.update({
            where: { id },
            data: updateTemplateDto,
            include: {
                brand: true,
                assets: true,
            },
        });
        return template;
    }
    async deleteTemplate(id, tenantId) {
        const template = await this.prisma.template.findFirst({
            where: { id, tenantId },
            include: {
                _count: {
                    select: {
                        videoProjects: true,
                        printProjects: true,
                    },
                },
            },
        });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        if (template._count.videoProjects > 0 || template._count.printProjects > 0) {
            throw new common_1.BadRequestException('Cannot delete template that is associated with projects. Please reassign or delete them first.');
        }
        await this.prisma.template.delete({
            where: { id },
        });
        return { message: 'Template deleted successfully' };
    }
    async duplicateTemplate(id, tenantId, duplicateData) {
        const originalTemplate = await this.prisma.template.findFirst({
            where: { id, tenantId },
            include: {
                assets: true,
            },
        });
        if (!originalTemplate) {
            throw new common_1.NotFoundException('Template not found');
        }
        const nameConflict = await this.prisma.template.findFirst({
            where: {
                name: duplicateData.name,
                brandId: originalTemplate.brandId,
                tenantId,
            },
        });
        if (nameConflict) {
            throw new common_1.BadRequestException('Template name already exists for this brand');
        }
        const duplicatedTemplate = await this.prisma.template.create({
            data: {
                name: duplicateData.name,
                description: duplicateData.description || originalTemplate.description,
                type: originalTemplate.type,
                brandId: originalTemplate.brandId,
                tenantId,
                metadata: originalTemplate.metadata,
                isActive: false,
            },
        });
        if (originalTemplate.assets.length > 0) {
            const assetDuplicates = originalTemplate.assets.map(asset => ({
                name: asset.name,
                kind: asset.kind,
                url: asset.url,
                metadata: asset.metadata,
                templateId: duplicatedTemplate.id,
                tenantId,
            }));
            await this.prisma.asset.createMany({
                data: assetDuplicates,
            });
        }
        return this.prisma.template.findFirst({
            where: { id: duplicatedTemplate.id },
            include: {
                brand: true,
                assets: true,
            },
        });
    }
    async getTemplateStats(id, tenantId) {
        const template = await this.prisma.template.findFirst({
            where: { id, tenantId },
        });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const [videoStats, printStats, assetStats] = await Promise.all([
            this.prisma.videoProject.groupBy({
                by: ['status'],
                where: { templateId: id },
                _count: { status: true },
            }),
            this.prisma.printProject.groupBy({
                by: ['status'],
                where: { templateId: id },
                _count: { status: true },
            }),
            this.prisma.asset.groupBy({
                by: ['kind'],
                where: { templateId: id },
                _count: { kind: true },
            }),
        ]);
        return {
            templateId: id,
            videoProjects: {
                total: videoStats.reduce((acc, stat) => acc + stat._count.status, 0),
                byStatus: videoStats.reduce((acc, stat) => {
                    acc[stat.status] = stat._count.status;
                    return acc;
                }, {}),
            },
            printProjects: {
                total: printStats.reduce((acc, stat) => acc + stat._count.status, 0),
                byStatus: printStats.reduce((acc, stat) => {
                    acc[stat.status] = stat._count.status;
                    return acc;
                }, {}),
            },
            assets: {
                total: assetStats.reduce((acc, stat) => acc + stat._count.kind, 0),
                byKind: assetStats.reduce((acc, stat) => {
                    acc[stat.kind] = stat._count.kind;
                    return acc;
                }, {}),
            },
        };
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map