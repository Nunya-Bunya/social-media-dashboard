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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let BrandsService = class BrandsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBrand(createBrandDto, tenantId) {
        const existingBrand = await this.prisma.brand.findFirst({
            where: {
                name: createBrandDto.name,
                tenantId,
            },
        });
        if (existingBrand) {
            throw new common_1.BadRequestException('Brand name already exists for this tenant');
        }
        const brand = await this.prisma.brand.create({
            data: {
                ...createBrandDto,
                tenantId,
            },
        });
        return brand;
    }
    async getBrands(tenantId, pagination) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const skip = (page - 1) * limit;
        const where = {
            tenantId,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [brands, total] = await Promise.all([
            this.prisma.brand.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    _count: {
                        select: {
                            videoProjects: true,
                            printProjects: true,
                            templates: true,
                        },
                    },
                },
            }),
            this.prisma.brand.count({ where }),
        ]);
        return {
            data: brands,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getBrand(id, tenantId) {
        const brand = await this.prisma.brand.findFirst({
            where: { id, tenantId },
            include: {
                _count: {
                    select: {
                        videoProjects: true,
                        printProjects: true,
                        templates: true,
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
                templates: {
                    take: 5,
                    orderBy: { updatedAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        return brand;
    }
    async updateBrand(id, updateBrandDto, tenantId) {
        const existingBrand = await this.prisma.brand.findFirst({
            where: { id, tenantId },
        });
        if (!existingBrand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (updateBrandDto.name && updateBrandDto.name !== existingBrand.name) {
            const nameConflict = await this.prisma.brand.findFirst({
                where: {
                    name: updateBrandDto.name,
                    tenantId,
                    id: { not: id },
                },
            });
            if (nameConflict) {
                throw new common_1.BadRequestException('Brand name already exists for this tenant');
            }
        }
        const brand = await this.prisma.brand.update({
            where: { id },
            data: updateBrandDto,
        });
        return brand;
    }
    async deleteBrand(id, tenantId) {
        const brand = await this.prisma.brand.findFirst({
            where: { id, tenantId },
            include: {
                _count: {
                    select: {
                        videoProjects: true,
                        printProjects: true,
                        templates: true,
                    },
                },
            },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (brand._count.videoProjects > 0 || brand._count.printProjects > 0 || brand._count.templates > 0) {
            throw new common_1.BadRequestException('Cannot delete brand that is associated with projects or templates. Please reassign or delete them first.');
        }
        await this.prisma.brand.delete({
            where: { id },
        });
        return { message: 'Brand deleted successfully' };
    }
    async getBrandStats(id, tenantId) {
        const brand = await this.prisma.brand.findFirst({
            where: { id, tenantId },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        const [videoStats, printStats, templateStats] = await Promise.all([
            this.prisma.videoProject.groupBy({
                by: ['status'],
                where: { brandId: id },
                _count: { status: true },
            }),
            this.prisma.printProject.groupBy({
                by: ['status'],
                where: { brandId: id },
                _count: { status: true },
            }),
            this.prisma.template.groupBy({
                by: ['type'],
                where: { brandId: id },
                _count: { type: true },
            }),
        ]);
        return {
            brandId: id,
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
            templates: {
                total: templateStats.reduce((acc, stat) => acc + stat._count.type, 0),
                byType: templateStats.reduce((acc, stat) => {
                    acc[stat.type] = stat._count.type;
                    return acc;
                }, {}),
            },
        };
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandsService);
//# sourceMappingURL=brands.service.js.map