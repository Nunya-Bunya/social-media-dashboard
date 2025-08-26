import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateVideoProjectDto, UpdateVideoProjectDto } from './dto/video.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(createDto: CreateVideoProjectDto, tenantId: string): Promise<any> {
    const { brandId, ...projectData } = createDto;

    // Verify brand belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: brandId, tenantId },
    });

    if (!brand) {
      throw new BadRequestException('Brand not found or access denied');
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

  async getProjects(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      brand: { tenantId },
      ...(search && {
        OR: [
          { script: { contains: search, mode: 'insensitive' } },
          { brand: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    // Build order by
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

  async getProject(id: string, tenantId: string): Promise<any> {
    const project = await this.prisma.videoProject.findFirst({
      where: { id, brand: { tenantId } },
      include: {
        brand: true,
        template: true,
        variants: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    return project;
  }

  async updateProject(id: string, updateDto: UpdateVideoProjectDto, tenantId: string): Promise<any> {
    // Verify project exists and belongs to tenant
    const existingProject = await this.prisma.videoProject.findFirst({
      where: { id, brand: { tenantId } },
    });

    if (!existingProject) {
      throw new NotFoundException('Video project not found');
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

  async deleteProject(id: string, tenantId: string): Promise<void> {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id, brand: { tenantId } },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    await this.prisma.videoProject.delete({
      where: { id },
    });
  }

  async createVariant(projectId: string, aspect: string, tenantId: string): Promise<any> {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, brand: { tenantId } },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    const variant = await this.prisma.videoVariant.create({
      data: {
        projectId,
        aspect: aspect as any,
      },
      include: {
        project: true,
      },
    });

    return variant;
  }
}
