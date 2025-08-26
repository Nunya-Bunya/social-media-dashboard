import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/templates.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async createTemplate(createTemplateDto: CreateTemplateDto, tenantId: string) {
    // Check if template name already exists for this tenant and brand
    const existingTemplate = await this.prisma.template.findFirst({
      where: {
        name: createTemplateDto.name,
        brandId: createTemplateDto.brandId,
        tenantId,
      },
    });

    if (existingTemplate) {
      throw new BadRequestException('Template name already exists for this brand');
    }

    // Verify brand belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: createTemplateDto.brandId, tenantId },
    });

    if (!brand) {
      throw new BadRequestException('Brand not found or does not belong to tenant');
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

  async getTemplates(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
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

  async getTemplate(id: string, tenantId: string) {
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
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  async updateTemplate(id: string, updateTemplateDto: UpdateTemplateDto, tenantId: string) {
    // Check if template exists and belongs to tenant
    const existingTemplate = await this.prisma.template.findFirst({
      where: { id, tenantId },
    });

    if (!existingTemplate) {
      throw new NotFoundException('Template not found');
    }

    // Check if new name conflicts with existing templates (excluding current template)
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
        throw new BadRequestException('Template name already exists for this brand');
      }
    }

    // Verify brand belongs to tenant if brandId is being updated
    if (updateTemplateDto.brandId && updateTemplateDto.brandId !== existingTemplate.brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: updateTemplateDto.brandId, tenantId },
      });

      if (!brand) {
        throw new BadRequestException('Brand not found or does not belong to tenant');
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

  async deleteTemplate(id: string, tenantId: string) {
    // Check if template exists and belongs to tenant
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
      throw new NotFoundException('Template not found');
    }

    // Check if template is being used by any projects
    if (template._count.videoProjects > 0 || template._count.printProjects > 0) {
      throw new BadRequestException(
        'Cannot delete template that is associated with projects. Please reassign or delete them first.',
      );
    }

    await this.prisma.template.delete({
      where: { id },
    });

    return { message: 'Template deleted successfully' };
  }

  async duplicateTemplate(id: string, tenantId: string, duplicateData: { name: string; description?: string }) {
    // Get original template
    const originalTemplate = await this.prisma.template.findFirst({
      where: { id, tenantId },
      include: {
        assets: true,
      },
    });

    if (!originalTemplate) {
      throw new NotFoundException('Template not found');
    }

    // Check if new name conflicts
    const nameConflict = await this.prisma.template.findFirst({
      where: {
        name: duplicateData.name,
        brandId: originalTemplate.brandId,
        tenantId,
      },
    });

    if (nameConflict) {
      throw new BadRequestException('Template name already exists for this brand');
    }

    // Create duplicate template
    const duplicatedTemplate = await this.prisma.template.create({
      data: {
        name: duplicateData.name,
        description: duplicateData.description || originalTemplate.description,
        type: originalTemplate.type,
        brandId: originalTemplate.brandId,
        tenantId,
        metadata: originalTemplate.metadata,
        isActive: false, // Start as inactive
      },
    });

    // Duplicate associated assets
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

  async getTemplateStats(id: string, tenantId: string) {
    const template = await this.prisma.template.findFirst({
      where: { id, tenantId },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
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
}
