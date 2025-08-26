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
exports.PrintService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let PrintService = class PrintService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(createProjectDto, tenantId) {
        const brand = await this.prisma.brand.findFirst({
            where: { id: createProjectDto.brandId, tenantId },
        });
        if (!brand) {
            throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
        }
        if (createProjectDto.templateId) {
            const template = await this.prisma.template.findFirst({
                where: { id: createProjectDto.templateId, tenantId },
            });
            if (!template) {
                throw new common_1.BadRequestException('Template not found or does not belong to tenant');
            }
        }
        if (createProjectDto.assetIds && createProjectDto.assetIds.length > 0) {
            const assets = await this.prisma.asset.findMany({
                where: { id: { in: createProjectDto.assetIds }, tenantId },
            });
            if (assets.length !== createProjectDto.assetIds.length) {
                throw new common_1.BadRequestException('Some assets not found or do not belong to tenant');
            }
        }
        const project = await this.prisma.printProject.create({
            data: {
                ...createProjectDto,
                tenantId,
                assets: createProjectDto.assetIds ? {
                    connect: createProjectDto.assetIds.map(id => ({ id })),
                } : undefined,
            },
            include: {
                brand: true,
                template: true,
                assets: true,
                variants: true,
            },
        });
        return project;
    }
    async getProjects(tenantId, pagination) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', brandId, status } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            tenantId,
            ...(brandId && { brandId }),
            ...(status && { status }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [projects, total] = await Promise.all([
            this.prisma.printProject.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    brand: true,
                    template: true,
                    _count: {
                        select: {
                            variants: true,
                            assets: true,
                        },
                    },
                },
            }),
            this.prisma.printProject.count({ where }),
        ]);
        return {
            data: projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getProject(id, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id, tenantId },
            include: {
                brand: true,
                template: true,
                assets: true,
                variants: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        return project;
    }
    async updateProject(id, updateProjectDto, tenantId) {
        const existingProject = await this.prisma.printProject.findFirst({
            where: { id, tenantId },
        });
        if (!existingProject) {
            throw new common_1.NotFoundException('Print project not found');
        }
        if (updateProjectDto.brandId && updateProjectDto.brandId !== existingProject.brandId) {
            const brand = await this.prisma.brand.findFirst({
                where: { id: updateProjectDto.brandId, tenantId },
            });
            if (!brand) {
                throw new common_1.BadRequestException('Brand not found or does not belong to tenant');
            }
        }
        if (updateProjectDto.templateId && updateProjectDto.templateId !== existingProject.templateId) {
            const template = await this.prisma.template.findFirst({
                where: { id: updateProjectDto.templateId, tenantId },
            });
            if (!template) {
                throw new common_1.BadRequestException('Template not found or does not belong to tenant');
            }
        }
        let assetUpdates = {};
        if (updateProjectDto.assetIds) {
            assetUpdates = {
                assets: {
                    set: updateProjectDto.assetIds.map(id => ({ id })),
                },
            };
        }
        const project = await this.prisma.printProject.update({
            where: { id },
            data: {
                ...updateProjectDto,
                ...assetUpdates,
                assetIds: undefined,
            },
            include: {
                brand: true,
                template: true,
                assets: true,
                variants: true,
            },
        });
        return project;
    }
    async deleteProject(id, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        if (project.status === 'RENDERING' || project.status === 'EXPORTING') {
            throw new common_1.BadRequestException('Cannot delete project that is currently being processed');
        }
        await this.prisma.printProject.delete({
            where: { id },
        });
        return { message: 'Print project deleted successfully' };
    }
    async createVariant(projectId, aspect, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        const variant = await this.prisma.printVariant.create({
            data: {
                aspect,
                projectId,
                tenantId,
                status: 'DRAFT',
            },
        });
        return variant;
    }
    async getProjectStats(tenantId) {
        const [totalProjects, statusStats, brandStats] = await Promise.all([
            this.prisma.printProject.count({ where: { tenantId } }),
            this.prisma.printProject.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { status: true },
            }),
            this.prisma.printProject.groupBy({
                by: ['brandId'],
                where: { tenantId },
                _count: { brandId: true },
            }),
        ]);
        const statusBreakdown = statusStats.reduce((acc, stat) => {
            acc[stat.status] = stat._count.status;
            return acc;
        }, {});
        const brandBreakdown = brandStats.reduce((acc, stat) => {
            acc[stat.brandId] = stat._count.brandId;
            return acc;
        }, {});
        return {
            totalProjects,
            statusBreakdown,
            brandBreakdown,
        };
    }
};
exports.PrintService = PrintService;
exports.PrintService = PrintService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrintService);
//# sourceMappingURL=print.service.js.map