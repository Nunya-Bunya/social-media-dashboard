import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateAssetDto, UpdateAssetDto, AssetSearchDto, BatchAssetOperationDto } from './dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async createAsset(createAssetDto: CreateAssetDto, userId: string, tenantId: string) {
    const { projectId, clientId, ...assetData } = createAssetDto;

    // Validate project and client if provided
    if (projectId) {
      const project = await this.prisma.project.findFirst({
        where: { id: projectId, tenantId },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
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

    const asset = await this.prisma.asset.create({
      data: {
        ...assetData,
        projectId,
        clientId,
        uploadedBy: userId,
        tenantId,
        status: 'UPLOADING',
      },
      include: {
        project: true,
        client: true,
        uploader: true,
      },
    });

    // Trigger AI analysis in background
    this.analyzeAsset(asset.id);

    return asset;
  }

  async getAssets(pagination: PaginationDto, tenantId: string) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

    const where = {
      tenantId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      }),
    };

    const [assets, total] = await Promise.all([
      this.prisma.asset.findMany({
        where,
        include: {
          project: true,
          client: true,
          uploader: true,
          optimizations: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.asset.count({ where }),
    ]);

    return {
      data: assets,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async searchAssets(searchDto: AssetSearchDto, tenantId: string) {
    const {
      query,
      type,
      status,
      clientId,
      projectId,
      tags,
      dateFrom,
      dateTo,
    } = searchDto;

    const where: any = { tenantId };

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { hasSome: [query] } },
        { aiTags: { hasSome: [query] } },
      ];
    }

    if (type) where.type = type;
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (projectId) where.projectId = projectId;
    if (tags && tags.length > 0) {
      where.OR = [
        { tags: { hasSome: tags } },
        { aiTags: { hasSome: tags } },
      ];
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const assets = await this.prisma.asset.findMany({
      where,
      include: {
        project: true,
        client: true,
        uploader: true,
        optimizations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return assets;
  }

  async getAsset(id: string, tenantId: string) {
    const asset = await this.prisma.asset.findFirst({
      where: { id, tenantId },
      include: {
        project: true,
        client: true,
        uploader: true,
        optimizations: true,
        deployments: {
          include: {
            asset: true,
          },
        },
      },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return asset;
  }

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto, tenantId: string) {
    const asset = await this.prisma.asset.findFirst({
      where: { id, tenantId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const updatedAsset = await this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
      include: {
        project: true,
        client: true,
        uploader: true,
        optimizations: true,
      },
    });

    return updatedAsset;
  }

  async deleteAsset(id: string, tenantId: string) {
    const asset = await this.prisma.asset.findFirst({
      where: { id, tenantId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    // Soft delete by archiving
    await this.prisma.asset.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        archivedAt: new Date(),
      },
    });

    return { message: 'Asset archived successfully' };
  }

  async batchOperation(batchDto: BatchAssetOperationDto, tenantId: string) {
    const { assetIds, operation, data } = batchDto;

    // Verify all assets belong to tenant
    const assets = await this.prisma.asset.findMany({
      where: {
        id: { in: assetIds },
        tenantId,
      },
    });

    if (assets.length !== assetIds.length) {
      throw new BadRequestException('Some assets not found or not accessible');
    }

    switch (operation) {
      case 'tag':
        await this.prisma.asset.updateMany({
          where: { id: { in: assetIds } },
          data: {
            tags: data.tags || [],
          },
        });
        break;

      case 'organize':
        await this.prisma.asset.updateMany({
          where: { id: { in: assetIds } },
          data: {
            projectId: data.projectId,
            clientId: data.clientId,
          },
        });
        break;

      case 'deploy':
        // Create deployment records
        const deployments = assetIds.map(assetId => ({
          assetId,
          platform: data.platform,
          status: 'DRAFT',
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
          caption: data.caption,
          hashtags: data.hashtags || [],
          createdBy: data.userId,
          tenantId,
        }));

        await this.prisma.deployment.createMany({
          data: deployments,
        });
        break;

      case 'archive':
        await this.prisma.asset.updateMany({
          where: { id: { in: assetIds } },
          data: {
            status: 'ARCHIVED',
            archivedAt: new Date(),
          },
        });
        break;

      default:
        throw new BadRequestException('Invalid operation');
    }

    return { message: `Batch ${operation} completed successfully` };
  }

  async getAssetOptimizations(assetId: string, tenantId: string) {
    const asset = await this.prisma.asset.findFirst({
      where: { id: assetId, tenantId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const optimizations = await this.prisma.assetOptimization.findMany({
      where: { assetId },
      orderBy: { createdAt: 'desc' },
    });

    return optimizations;
  }

  async generateOptimizations(assetId: string, tenantId: string) {
    const asset = await this.prisma.asset.findFirst({
      where: { id: assetId, tenantId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    // Generate optimizations for different platforms
    const platforms = ['INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'TIKTOK', 'YOUTUBE'];
    const formats = ['1:1', '9:16', '16:9', '4:5'];

    const optimizations = [];

    for (const platform of platforms) {
      for (const format of formats) {
        const optimization = await this.prisma.assetOptimization.create({
          data: {
            assetId,
            platform: platform as any,
            format,
            fileUrl: `${asset.fileUrl}_${platform.toLowerCase()}_${format.replace(':', 'x')}`,
            fileSize: asset.fileSize,
            dimensions: asset.dimensions,
            status: 'processing',
          },
        });
        optimizations.push(optimization);
      }
    }

    // Trigger optimization processing in background
    this.processOptimizations(assetId);

    return optimizations;
  }

  private async analyzeAsset(assetId: string) {
    // AI analysis would happen here
    // For now, we'll simulate it
    setTimeout(async () => {
      const aiTags = ['professional', 'high-quality', 'marketing'];
      const qualityScore = Math.random() * 100;

      await this.prisma.asset.update({
        where: { id: assetId },
        data: {
          status: 'READY',
          aiTags,
          qualityScore,
        },
      });
    }, 2000);
  }

  private async processOptimizations(assetId: string) {
    // Optimization processing would happen here
    // For now, we'll simulate it
    setTimeout(async () => {
      await this.prisma.assetOptimization.updateMany({
        where: { assetId },
        data: { status: 'ready' },
      });
    }, 5000);
  }
}
