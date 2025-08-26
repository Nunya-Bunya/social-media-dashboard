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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let VideoService = class VideoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(createDto, tenantId) {
        const { brandId, ...projectData } = createDto;
        const brand = await this.prisma.brand.findFirst({
            where: { id: brandId, tenantId },
        });
        if (!brand) {
            throw new common_1.BadRequestException('Brand not found or access denied');
        }
        const project = await this.prisma.videoProject.create({
            data: {
                ...projectData,
                brandId,
            },
            include: {
                brand: true,
                template: true,
                variants: true,
            },
        });
        return project;
    }
    async getProjects(tenantId, pagination) {
        const { page, limit, search, sortBy, sortOrder } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            brand: { tenantId },
            ...(search && {
                OR: [
                    { script: { contains: search, mode: 'insensitive' } },
                    { brand: { name: { contains: search, mode: 'insensitive' } } },
                ],
            }),
        };
        const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: sortOrder };
        const [projects, total] = await Promise.all([
            this.prisma.videoProject.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    brand: true,
                    template: true,
                    variants: true,
                },
            }),
            this.prisma.videoProject.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: projects,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
    async getProject(id, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id, brand: { tenantId } },
            include: {
                brand: true,
                template: true,
                variants: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        return project;
    }
    async updateProject(id, updateDto, tenantId) {
        const existingProject = await this.prisma.videoProject.findFirst({
            where: { id, brand: { tenantId } },
        });
        if (!existingProject) {
            throw new common_1.NotFoundException('Video project not found');
        }
        const project = await this.prisma.videoProject.update({
            where: { id },
            data: updateDto,
            include: {
                brand: true,
                template: true,
                variants: true,
            },
        });
        return project;
    }
    async deleteProject(id, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id, brand: { tenantId } },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        await this.prisma.videoProject.delete({
            where: { id },
        });
    }
    async createVariant(projectId, aspect, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, brand: { tenantId } },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        const variant = await this.prisma.videoVariant.create({
            data: {
                projectId,
                aspect: aspect,
            },
            include: {
                project: true,
            },
        });
        return variant;
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideoService);
//# sourceMappingURL=video.service.js.map