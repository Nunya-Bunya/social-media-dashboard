import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brands.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBrand(createBrandDto: CreateBrandDto, tenantId: string) {
    // Check if brand name already exists for this tenant
    const existingBrand = await this.prisma.brand.findFirst({
      where: {
        name: createBrandDto.name,
        tenantId,
      },
    });

    if (existingBrand) {
      throw new BadRequestException('Brand name already exists for this tenant');
    }

    const brand = await this.prisma.brand.create({
      data: {
        ...createBrandDto,
        tenantId,
      },
    });

    return brand;
  }

  async getBrands(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
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

  async getBrand(id: string, tenantId: string) {
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
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto, tenantId: string) {
    // Check if brand exists and belongs to tenant
    const existingBrand = await this.prisma.brand.findFirst({
      where: { id, tenantId },
    });

    if (!existingBrand) {
      throw new NotFoundException('Brand not found');
    }

    // Check if new name conflicts with existing brands (excluding current brand)
    if (updateBrandDto.name && updateBrandDto.name !== existingBrand.name) {
      const nameConflict = await this.prisma.brand.findFirst({
        where: {
          name: updateBrandDto.name,
          tenantId,
          id: { not: id },
        },
      });

      if (nameConflict) {
        throw new BadRequestException('Brand name already exists for this tenant');
      }
    }

    const brand = await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });

    return brand;
  }

  async deleteBrand(id: string, tenantId: string) {
    // Check if brand exists and belongs to tenant
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
      throw new NotFoundException('Brand not found');
    }

    // Check if brand is being used by any projects or templates
    if (brand._count.videoProjects > 0 || brand._count.printProjects > 0 || brand._count.templates > 0) {
      throw new BadRequestException(
        'Cannot delete brand that is associated with projects or templates. Please reassign or delete them first.',
      );
    }

    await this.prisma.brand.delete({
      where: { id },
    });

    return { message: 'Brand deleted successfully' };
  }

  async getBrandStats(id: string, tenantId: string) {
    const brand = await this.prisma.brand.findFirst({
      where: { id, tenantId },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
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
}
