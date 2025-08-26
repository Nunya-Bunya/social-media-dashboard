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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(createProjectDto, userId, tenantId) {
        const { brandId, clientId, ...projectData } = createProjectDto;
        if (brandId) {
            const brand = await this.prisma.brand.findFirst({
                where: { id: brandId, tenantId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
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
        const project = await this.prisma.project.create({
            data: {
                ...projectData,
                brandId,
                clientId,
                createdBy: userId,
                tenantId,
            },
            include: {
                brand: true,
                client: true,
                creator: true,
                assets: {
                    include: {
                        uploader: true,
                    },
                },
            },
        });
        return project;
    }
    async getProjects(pagination, tenantId) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const where = {
            tenantId,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [projects, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                include: {
                    brand: true,
                    client: true,
                    creator: true,
                    assets: {
                        include: {
                            uploader: true,
                        },
                    },
                },
                orderBy: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.project.count({ where }),
        ]);
        return {
            data: projects,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getProject(id, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
            include: {
                brand: true,
                client: true,
                creator: true,
                assets: {
                    include: {
                        uploader: true,
                        optimizations: true,
                        deployments: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async updateProject(id, updateProjectDto, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const updatedProject = await this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
            include: {
                brand: true,
                client: true,
                creator: true,
                assets: {
                    include: {
                        uploader: true,
                    },
                },
            },
        });
        return updatedProject;
    }
    async deleteProject(id, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
            include: {
                assets: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (project.assets.length > 0) {
            throw new common_1.BadRequestException('Cannot delete project with associated assets');
        }
        await this.prisma.project.delete({
            where: { id },
        });
        return { message: 'Project deleted successfully' };
    }
    async getProjectAssets(id, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
            include: {
                assets: {
                    include: {
                        uploader: true,
                        optimizations: true,
                        deployments: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project.assets;
    }
    async getProjectStats(id, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
            include: {
                assets: {
                    include: {
                        deployments: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const totalAssets = project.assets.length;
        const totalDeployments = project.assets.reduce((acc, asset) => acc + asset.deployments.length, 0);
        const assetsByType = project.assets.reduce((acc, asset) => {
            acc[asset.type] = (acc[asset.type] || 0) + 1;
            return acc;
        }, {});
        const assetsByStatus = project.assets.reduce((acc, asset) => {
            acc[asset.status] = (acc[asset.status] || 0) + 1;
            return acc;
        }, {});
        return {
            projectId: id,
            totalAssets,
            totalDeployments,
            assetsByType,
            assetsByStatus,
            timeline: {
                startDate: project.startDate,
                endDate: project.endDate,
                status: project.status,
            },
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map