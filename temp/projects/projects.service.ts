import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from '../assets/dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto, userId: string, tenantId: string) {
    const { brandId, clientId, ...projectData } = createProjectDto;

    // Validate brand and client if provided
    if (brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: brandId, tenantId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, tenantId },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
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

  async getProjects(pagination: PaginationDto, tenantId: string) {
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

  async getProject(id: string, tenantId: string) {
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
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto, tenantId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
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

  async deleteProject(id: string, tenantId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId },
      include: {
        assets: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.assets.length > 0) {
      throw new BadRequestException('Cannot delete project with associated assets');
    }

    await this.prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  }

  async getProjectAssets(id: string, tenantId: string) {
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
      throw new NotFoundException('Project not found');
    }

    return project.assets;
  }

  async getProjectStats(id: string, tenantId: string) {
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
      throw new NotFoundException('Project not found');
    }

    const totalAssets = project.assets.length;
    const totalDeployments = project.assets.reduce(
      (acc, asset) => acc + asset.deployments.length,
      0,
    );

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
}
