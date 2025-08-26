import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaigns.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
import { CampaignAiService } from './campaign.ai.service';
import { CampaignAnalyticsService } from './campaign.analytics.service';
import { CampaignTemplatesService } from './campaign.templates.service';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly campaignAiService: CampaignAiService,
    private readonly campaignAnalyticsService: CampaignAnalyticsService,
    private readonly campaignTemplatesService: CampaignTemplatesService,
  ) {}

  async createCampaign(createCampaignDto: CreateCampaignDto, tenantId: string, userId: string) {
    // Verify brand belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: createCampaignDto.brandId, tenantId },
    });

    if (!brand) {
      throw new BadRequestException('Brand not found or does not belong to tenant');
    }

    // Verify client belongs to tenant if provided
    if (createCampaignDto.clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: createCampaignDto.clientId, tenantId },
      });

      if (!client) {
        throw new BadRequestException('Client not found or does not belong to tenant');
      }
    }

    // Verify template belongs to tenant if provided
    if (createCampaignDto.templateId) {
      const template = await this.prisma.campaignTemplate.findUnique({
        where: { id: createCampaignDto.templateId },
      });

      if (!template) {
        throw new BadRequestException('Campaign template not found');
      }
    }

    // Verify assets belong to tenant if provided
    if (createCampaignDto.assetIds && createCampaignDto.assetIds.length > 0) {
      const assets = await this.prisma.asset.findMany({
        where: { id: { in: createCampaignDto.assetIds }, tenantId },
      });

      if (assets.length !== createCampaignDto.assetIds.length) {
        throw new BadRequestException('Some assets not found or do not belong to tenant');
      }
    }

    const campaign = await this.prisma.campaign.create({
      data: {
        ...createCampaignDto,
        tenantId,
        createdBy: userId,
        assets: createCampaignDto.assetIds ? {
          connect: createCampaignDto.assetIds.map(id => ({ id })),
        } : undefined,
      },
      include: {
        brand: true,
        client: true,
        template: true,
        assets: true,
        creator: {
          select: { id: true, email: true },
        },
      },
    });

    // Increment template usage count if template was used
    if (createCampaignDto.templateId) {
      await this.campaignTemplatesService.incrementUsageCount(createCampaignDto.templateId);
    }

    return campaign;
  }

  async getCampaigns(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status, type, goal, clientId, brandId } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      tenantId,
      ...(status && { status }),
      ...(type && { type }),
      ...(goal && { goal }),
      ...(clientId && { clientId }),
      ...(brandId && { brandId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [campaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          client: true,
          template: true,
          _count: {
            select: {
              kpis: true,
              analytics: true,
            },
          },
        },
      }),
      this.prisma.campaign.count({ where }),
    ]);

    return {
      data: campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getCampaign(id: string, tenantId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
      include: {
        brand: true,
        client: true,
        template: true,
        assets: true,
        kpis: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        analytics: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        creator: {
          select: { id: true, email: true },
        },
      },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  async updateCampaign(id: string, updateCampaignDto: UpdateCampaignDto, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const existingCampaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!existingCampaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be updated (not completed or cancelled)
    if (existingCampaign.status === 'COMPLETED' || existingCampaign.status === 'CANCELLED') {
      throw new BadRequestException('Cannot update completed or cancelled campaigns');
    }

    // Verify brand belongs to tenant if brandId is being updated
    if (updateCampaignDto.brandId && updateCampaignDto.brandId !== existingCampaign.brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: updateCampaignDto.brandId, tenantId },
      });

      if (!brand) {
        throw new BadRequestException('Brand not found or does not belong to tenant');
      }
    }

    // Verify client belongs to tenant if clientId is being updated
    if (updateCampaignDto.clientId && updateCampaignDto.clientId !== existingCampaign.clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: updateCampaignDto.clientId, tenantId },
      });

      if (!client) {
        throw new BadRequestException('Client not found or does not belong to tenant');
      }
    }

    // Handle asset updates
    let assetUpdates = {};
    if (updateCampaignDto.assetIds) {
      assetUpdates = {
        assets: {
          set: updateCampaignDto.assetIds.map(id => ({ id })),
        },
      };
    }

    const campaign = await this.prisma.campaign.update({
      where: { id },
      data: {
        ...updateCampaignDto,
        ...assetUpdates,
        assetIds: undefined, // Remove from data as it's handled separately
      },
      include: {
        brand: true,
        client: true,
        template: true,
        assets: true,
      },
    });

    return campaign;
  }

  async deleteCampaign(id: string, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be deleted
    if (campaign.status === 'ACTIVE' || campaign.status === 'PLANNED') {
      throw new BadRequestException('Cannot delete active or planned campaigns');
    }

    await this.prisma.campaign.delete({
      where: { id },
    });

    return { message: 'Campaign deleted successfully' };
  }

  async launchCampaign(id: string, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be launched
    if (campaign.status !== 'DRAFT' && campaign.status !== 'PLANNED') {
      throw new BadRequestException('Campaign cannot be launched from current status');
    }

    // Validate campaign has required elements
    if (!campaign.content || !campaign.targetAudience) {
      throw new BadRequestException('Campaign must have content and target audience before launch');
    }

    // Update campaign status
    const updatedCampaign = await this.prisma.campaign.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        launchedAt: new Date(),
      },
      include: {
        brand: true,
        client: true,
        template: true,
      },
    });

    return updatedCampaign;
  }

  async pauseCampaign(id: string, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be paused
    if (campaign.status !== 'ACTIVE') {
      throw new BadRequestException('Only active campaigns can be paused');
    }

    const updatedCampaign = await this.prisma.campaign.update({
      where: { id },
      data: { status: 'PAUSED' },
    });

    return updatedCampaign;
  }

  async resumeCampaign(id: string, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be resumed
    if (campaign.status !== 'PAUSED') {
      throw new BadRequestException('Only paused campaigns can be resumed');
    }

    const updatedCampaign = await this.prisma.campaign.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });

    return updatedCampaign;
  }

  async completeCampaign(id: string, tenantId: string) {
    // Check if campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Check if campaign can be completed
    if (campaign.status !== 'ACTIVE' && campaign.status !== 'PAUSED') {
      throw new BadRequestException('Campaign cannot be completed from current status');
    }

    const updatedCampaign = await this.prisma.campaign.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return updatedCampaign;
  }

  async duplicateCampaign(id: string, tenantId: string, duplicateData: { name: string; description?: string }) {
    // Get original campaign
    const originalCampaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
      include: { assets: true },
    });

    if (!originalCampaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Create duplicate campaign
    const duplicatedCampaign = await this.prisma.campaign.create({
      data: {
        name: duplicateData.name,
        description: duplicateData.description || originalCampaign.description,
        goal: originalCampaign.goal,
        type: originalCampaign.type,
        brandId: originalCampaign.brandId,
        clientId: originalCampaign.clientId,
        templateId: originalCampaign.templateId,
        targetAudience: originalCampaign.targetAudience,
        content: originalCampaign.content,
        budget: originalCampaign.budget,
        status: 'DRAFT',
        tenantId,
        createdBy: originalCampaign.createdBy,
        assets: originalCampaign.assets.length > 0 ? {
          connect: originalCampaign.assets.map(asset => ({ id: asset.id })),
        } : undefined,
      },
      include: {
        brand: true,
        client: true,
        template: true,
        assets: true,
      },
    });

    return duplicatedCampaign;
  }

  async getCampaignStats(tenantId: string) {
    const [totalCampaigns, statusStats, typeStats, goalStats] = await Promise.all([
      this.prisma.campaign.count({ where: { tenantId } }),
      this.prisma.campaign.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { status: true },
      }),
      this.prisma.campaign.groupBy({
        by: ['type'],
        where: { tenantId },
        _count: { type: true },
      }),
      this.prisma.campaign.groupBy({
        by: ['goal'],
        where: { tenantId },
        _count: { goal: true },
      }),
    ]);

    const statusBreakdown = statusStats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status;
      return acc;
    }, {});

    const typeBreakdown = typeStats.reduce((acc, stat) => {
      acc[stat.type] = stat._count.type;
      return acc;
    }, {});

    const goalBreakdown = goalStats.reduce((acc, stat) => {
      acc[stat.goal] = stat._count.goal;
      return acc;
    }, {});

    return {
      totalCampaigns,
      statusBreakdown,
      typeBreakdown,
      goalBreakdown,
    };
  }

  async getClientCampaigns(clientId: string, tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
    // Verify client belongs to tenant
    const client = await this.prisma.client.findFirst({
      where: { id: clientId, tenantId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      clientId,
      tenantId,
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [campaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          template: true,
          _count: {
            select: {
              kpis: true,
              analytics: true,
            },
          },
        },
      }),
      this.prisma.campaign.count({ where }),
    ]);

    return {
      data: campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getBrandCampaigns(brandId: string, tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>> {
    // Verify brand belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: brandId, tenantId },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      brandId,
      tenantId,
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [campaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          client: true,
          template: true,
          _count: {
            select: {
              kpis: true,
              analytics: true,
            },
          },
        },
      }),
      this.prisma.campaign.count({ where }),
    ]);

    return {
      data: campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
