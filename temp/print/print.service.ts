import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreatePrintProjectDto, UpdatePrintProjectDto, CreatePrintVariantDto } from './dto/print.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class PrintService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(createProjectDto: CreatePrintProjectDto, tenantId: string) {
    // Verify brand belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: createProjectDto.brandId, tenantId },
    });

    if (!brand) {
      throw new BadRequestException('Brand not found or does not belong to tenant');
    }

    // Verify template belongs to tenant if provided
    if (createProjectDto.templateId) {
      const template = await this.prisma.template.findFirst({
        where: { id: createProjectDto.templateId, tenantId },
      });

      if (!template) {
        throw new BadRequestException('Template not found or does not belong to tenant');
      }
    }

    // Verify assets belong to tenant if provided
    if (createProjectDto.assetIds && createProjectDto.assetIds.length > 0) {
      const assets = await this.prisma.asset.findMany({
        where: { id: { in: createProjectDto.assetIds }, tenantId },
      });

      if (assets.length !== createProjectDto.assetIds.length) {
        throw new BadRequestException('Some assets not found or do not belong to tenant');
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

  async getProjects(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
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

  async getProject(id: string, tenantId: string) {
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
      throw new NotFoundException('Print project not found');
    }

    return project;
  }

  async updateProject(id: string, updateProjectDto: UpdatePrintProjectDto, tenantId: string) {
    // Check if project exists and belongs to tenant
    const existingProject = await this.prisma.printProject.findFirst({
      where: { id, tenantId },
    });

    if (!existingProject) {
      throw new NotFoundException('Print project not found');
    }

    // Verify brand belongs to tenant if brandId is being updated
    if (updateProjectDto.brandId && updateProjectDto.brandId !== existingProject.brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: updateProjectDto.brandId, tenantId },
      });

      if (!brand) {
        throw new BadRequestException('Brand not found or does not belong to tenant');
      }
    }

    // Verify template belongs to tenant if templateId is being updated
    if (updateProjectDto.templateId && updateProjectDto.templateId !== existingProject.templateId) {
      const template = await this.prisma.template.findFirst({
        where: { id: updateProjectDto.templateId, tenantId },
      });

      if (!template) {
        throw new BadRequestException('Template not found or does not belong to tenant');
      }
    }

    // Handle asset updates
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
        assetIds: undefined, // Remove from data as it's handled separately
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

  async deleteProject(id: string, tenantId: string) {
    // Check if project exists and belongs to tenant
    const project = await this.prisma.printProject.findFirst({
      where: { id, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Print project not found');
    }

    // Check if project is being rendered or exported
    if (project.status === 'RENDERING' || project.status === 'EXPORTING') {
      throw new BadRequestException('Cannot delete project that is currently being processed');
    }

    await this.prisma.printProject.delete({
      where: { id },
    });

    return { message: 'Print project deleted successfully' };
  }

  async createVariant(
    projectId: string,
    aspect: string,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.printProject.findFirst({
      where: { id: projectId, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Print project not found');
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

  async getProjectStats(tenantId: string) {
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
}
