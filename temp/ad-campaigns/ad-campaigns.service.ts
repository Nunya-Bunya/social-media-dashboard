import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { 
  CreateAdCampaignDto, 
  UpdateAdCampaignDto, 
  CreateAdCreativeDto, 
  UpdateAdCreativeDto,
  TrackAdAnalyticsDto,
  CreateSplitTestDto,
  UpdateSplitTestDto,
  CreateSalesFunnelDto,
  UpdateSalesFunnelDto,
  CreateIntegrationDto,
  UpdateIntegrationDto,
  AnalyticsOverviewDto,
  SyncAnalyticsDto
} from './dto/ad-campaigns.dto';
import { 
  AdPlatform, 
  AdStatus, 
  AdType, 
  CreativeType, 
  TestStatus, 
  TestVariant,
  FunnelStatus 
} from '@prisma/client';

@Injectable()
export class AdCampaignsService {
  constructor(private prisma: PrismaService) {}

  // Ad Campaign Management
  async createAdCampaign(tenantId: string, userId: string, createDto: CreateAdCampaignDto) {
    const { brandId, clientId, ...campaignData } = createDto;

    // Validate brand exists and belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: brandId, tenantId }
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    // Validate client if provided
    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, tenantId }
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    return this.prisma.adCampaign.create({
      data: {
        ...campaignData,
        brandId,
        clientId,
        createdBy: userId,
        tenantId,
        startDate: campaignData.startDate ? new Date(campaignData.startDate) : null,
        endDate: campaignData.endDate ? new Date(campaignData.endDate) : null,
      },
      include: {
        brand: true,
        client: true,
        creator: true,
        adCreatives: true,
        adAnalytics: {
          orderBy: { date: 'desc' },
          take: 1
        }
      }
    });
  }

  async getAdCampaigns(tenantId: string, filters: any = {}) {
    const { 
      platform, 
      status, 
      adType, 
      clientId, 
      brandId, 
      page = 1, 
      limit = 20,
      search 
    } = filters;

    const where: any = { tenantId };

    if (platform) where.platform = platform;
    if (status) where.status = status;
    if (adType) where.adType = adType;
    if (clientId) where.clientId = clientId;
    if (brandId) where.brandId = brandId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [campaigns, total] = await Promise.all([
      this.prisma.adCampaign.findMany({
        where,
        include: {
          brand: true,
          client: true,
          creator: true,
          adCreatives: true,
          adAnalytics: {
            orderBy: { date: 'desc' },
            take: 1
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.adCampaign.count({ where })
    ]);

    return {
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getAdCampaign(tenantId: string, campaignId: string) {
    const campaign = await this.prisma.adCampaign.findFirst({
      where: { id: campaignId, tenantId },
      include: {
        brand: true,
        client: true,
        creator: true,
        adCreatives: true,
        adAnalytics: {
          orderBy: { date: 'desc' }
        },
        splitTests: {
          include: {
            adCampaign: true
          }
        }
      }
    });

    if (!campaign) {
      throw new NotFoundException('Ad campaign not found');
    }

    return campaign;
  }

  async updateAdCampaign(tenantId: string, campaignId: string, updateDto: UpdateAdCampaignDto) {
    const campaign = await this.getAdCampaign(tenantId, campaignId);

    const updateData: any = { ...updateDto };
    
    if (updateDto.startDate) {
      updateData.startDate = new Date(updateDto.startDate);
    }
    if (updateDto.endDate) {
      updateData.endDate = new Date(updateDto.endDate);
    }

    return this.prisma.adCampaign.update({
      where: { id: campaignId },
      data: updateData,
      include: {
        brand: true,
        client: true,
        creator: true,
        adCreatives: true
      }
    });
  }

  async deleteAdCampaign(tenantId: string, campaignId: string) {
    await this.getAdCampaign(tenantId, campaignId);

    return this.prisma.adCampaign.delete({
      where: { id: campaignId }
    });
  }

  async launchAdCampaign(tenantId: string, campaignId: string) {
    const campaign = await this.getAdCampaign(tenantId, campaignId);

    if (campaign.status !== AdStatus.DRAFT) {
      throw new BadRequestException('Only draft campaigns can be launched');
    }

    if (!campaign.adCreatives.length) {
      throw new BadRequestException('Campaign must have at least one creative');
    }

    return this.prisma.adCampaign.update({
      where: { id: campaignId },
      data: {
        status: AdStatus.ACTIVE,
        launchedAt: new Date()
      },
      include: {
        brand: true,
        client: true,
        creator: true,
        adCreatives: true
      }
    });
  }

  async pauseAdCampaign(tenantId: string, campaignId: string) {
    const campaign = await this.getAdCampaign(tenantId, campaignId);

    if (campaign.status !== AdStatus.ACTIVE) {
      throw new BadRequestException('Only active campaigns can be paused');
    }

    return this.prisma.adCampaign.update({
      where: { id: campaignId },
      data: {
        status: AdStatus.PAUSED,
        pausedAt: new Date()
      }
    });
  }

  async duplicateAdCampaign(tenantId: string, campaignId: string) {
    const originalCampaign = await this.getAdCampaign(tenantId, campaignId);

    const { id, createdAt, updatedAt, launchedAt, pausedAt, ...campaignData } = originalCampaign;

    const duplicatedCampaign = await this.prisma.adCampaign.create({
      data: {
        ...campaignData,
        name: `${campaignData.name} (Copy)`,
        status: AdStatus.DRAFT,
        tenantId
      }
    });

    // Duplicate creatives
    for (const creative of originalCampaign.adCreatives) {
      const { id: creativeId, createdAt: creativeCreatedAt, updatedAt: creativeUpdatedAt, ...creativeData } = creative;
      await this.prisma.adCreative.create({
        data: {
          ...creativeData,
          adCampaignId: duplicatedCampaign.id,
          tenantId
        }
      });
    }

    return this.getAdCampaign(tenantId, duplicatedCampaign.id);
  }

  // Ad Creative Management
  async createAdCreative(tenantId: string, createDto: CreateAdCreativeDto) {
    const { brandId, adCampaignId, ...creativeData } = createDto;

    // Validate brand exists and belongs to tenant
    const brand = await this.prisma.brand.findFirst({
      where: { id: brandId, tenantId }
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    // Validate campaign if provided
    if (adCampaignId) {
      const campaign = await this.prisma.adCampaign.findFirst({
        where: { id: adCampaignId, tenantId }
      });
      if (!campaign) {
        throw new NotFoundException('Ad campaign not found');
      }
    }

    return this.prisma.adCreative.create({
      data: {
        ...creativeData,
        brandId,
        adCampaignId,
        tenantId
      },
      include: {
        brand: true,
        adCampaign: true
      }
    });
  }

  async getAdCreatives(tenantId: string, filters: any = {}) {
    const { 
      platform, 
      type, 
      brandId, 
      adCampaignId, 
      page = 1, 
      limit = 20 
    } = filters;

    const where: any = { tenantId };

    if (platform) where.platform = platform;
    if (type) where.type = type;
    if (brandId) where.brandId = brandId;
    if (adCampaignId) where.adCampaignId = adCampaignId;

    const skip = (page - 1) * limit;

    const [creatives, total] = await Promise.all([
      this.prisma.adCreative.findMany({
        where,
        include: {
          brand: true,
          adCampaign: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.adCreative.count({ where })
    ]);

    return {
      creatives,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getAdCreative(tenantId: string, creativeId: string) {
    const creative = await this.prisma.adCreative.findFirst({
      where: { id: creativeId, tenantId },
      include: {
        brand: true,
        adCampaign: true,
        assets: true
      }
    });

    if (!creative) {
      throw new NotFoundException('Ad creative not found');
    }

    return creative;
  }

  async updateAdCreative(tenantId: string, creativeId: string, updateDto: UpdateAdCreativeDto) {
    await this.getAdCreative(tenantId, creativeId);

    return this.prisma.adCreative.update({
      where: { id: creativeId },
      data: updateDto,
      include: {
        brand: true,
        adCampaign: true
      }
    });
  }

  async deleteAdCreative(tenantId: string, creativeId: string) {
    await this.getAdCreative(tenantId, creativeId);

    return this.prisma.adCreative.delete({
      where: { id: creativeId }
    });
  }

  // Analytics Management
  async trackAdAnalytics(tenantId: string, campaignId: string, analyticsDto: TrackAdAnalyticsDto) {
    await this.getAdCampaign(tenantId, campaignId);

    return this.prisma.adAnalytics.create({
      data: {
        ...analyticsDto,
        adCampaignId: campaignId,
        date: new Date(analyticsDto.date)
      }
    });
  }

  async getAdAnalytics(tenantId: string, campaignId: string, filters: any = {}) {
    await this.getAdCampaign(tenantId, campaignId);

    const { startDate, endDate, page = 1, limit = 50 } = filters;

    const where: any = { adCampaignId: campaignId };

    if (startDate) {
      where.date = { gte: new Date(startDate) };
    }
    if (endDate) {
      where.date = { ...where.date, lte: new Date(endDate) };
    }

    const skip = (page - 1) * limit;

    const [analytics, total] = await Promise.all([
      this.prisma.adAnalytics.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.adAnalytics.count({ where })
    ]);

    return {
      analytics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getAnalyticsOverview(tenantId: string, overviewDto: AnalyticsOverviewDto) {
    const { startDate, endDate, platform, clientId, brandId } = overviewDto;

    const where: any = { 
      tenantId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    };

    if (platform) where.platform = platform;
    if (clientId) where.clientId = clientId;
    if (brandId) where.brandId = brandId;

    const campaigns = await this.prisma.adCampaign.findMany({
      where,
      include: {
        adAnalytics: {
          where: {
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          }
        }
      }
    });

    // Calculate overview metrics
    const totalSpend = campaigns.reduce((sum, campaign) => {
      return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
        return campaignSum + analytics.spend;
      }, 0);
    }, 0);

    const totalImpressions = campaigns.reduce((sum, campaign) => {
      return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
        return campaignSum + analytics.impressions;
      }, 0);
    }, 0);

    const totalClicks = campaigns.reduce((sum, campaign) => {
      return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
        return campaignSum + analytics.clicks;
      }, 0);
    }, 0);

    const totalConversions = campaigns.reduce((sum, campaign) => {
      return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
        return campaignSum + (analytics.conversions || 0);
      }, 0);
    }, 0);

    const overallROI = totalSpend > 0 ? 
      campaigns.reduce((sum, campaign) => {
        return sum + campaign.adAnalytics.reduce((campaignSum, analytics) => {
          return campaignSum + (analytics.roi || 0);
        }, 0);
      }, 0) / campaigns.length : 0;

    return {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      overallROI,
      averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      averageCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
      averageCPA: totalConversions > 0 ? totalSpend / totalConversions : 0,
      campaignCount: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === AdStatus.ACTIVE).length
    };
  }

  // Split Testing Management
  async createSplitTest(tenantId: string, createDto: CreateSplitTestDto) {
    const { adCampaignId, ...testData } = createDto;

    // Validate campaign exists and belongs to tenant
    const campaign = await this.prisma.adCampaign.findFirst({
      where: { id: adCampaignId, tenantId }
    });
    if (!campaign) {
      throw new NotFoundException('Ad campaign not found');
    }

    return this.prisma.splitTest.create({
      data: {
        ...testData,
        adCampaignId,
        tenantId,
        startDate: new Date(testData.startDate),
        endDate: testData.endDate ? new Date(testData.endDate) : null
      },
      include: {
        adCampaign: true
      }
    });
  }

  async getSplitTests(tenantId: string, filters: any = {}) {
    const { 
      status, 
      adCampaignId, 
      page = 1, 
      limit = 20 
    } = filters;

    const where: any = { tenantId };

    if (status) where.status = status;
    if (adCampaignId) where.adCampaignId = adCampaignId;

    const skip = (page - 1) * limit;

    const [tests, total] = await Promise.all([
      this.prisma.splitTest.findMany({
        where,
        include: {
          adCampaign: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.splitTest.count({ where })
    ]);

    return {
      tests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getSplitTest(tenantId: string, testId: string) {
    const test = await this.prisma.splitTest.findFirst({
      where: { id: testId, tenantId },
      include: {
        adCampaign: {
          include: {
            adAnalytics: true
          }
        }
      }
    });

    if (!test) {
      throw new NotFoundException('Split test not found');
    }

    return test;
  }

  async updateSplitTest(tenantId: string, testId: string, updateDto: UpdateSplitTestDto) {
    await this.getSplitTest(tenantId, testId);

    const updateData: any = { ...updateDto };
    
    if (updateDto.endDate) {
      updateData.endDate = new Date(updateDto.endDate);
    }

    return this.prisma.splitTest.update({
      where: { id: testId },
      data: updateData,
      include: {
        adCampaign: true
      }
    });
  }

  async declareWinner(tenantId: string, testId: string, winner: TestVariant) {
    const test = await this.getSplitTest(tenantId, testId);

    if (test.status !== TestStatus.RUNNING) {
      throw new BadRequestException('Only running tests can have winners declared');
    }

    return this.prisma.splitTest.update({
      where: { id: testId },
      data: {
        winner,
        status: TestStatus.COMPLETED,
        endDate: new Date()
      },
      include: {
        adCampaign: true
      }
    });
  }

  // Sales Funnel Management
  async createSalesFunnel(tenantId: string, userId: string, createDto: CreateSalesFunnelDto) {
    const { clientId, ...funnelData } = createDto;

    // Validate client if provided
    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, tenantId }
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    return this.prisma.salesFunnel.create({
      data: {
        ...funnelData,
        clientId,
        createdBy: userId,
        tenantId
      },
      include: {
        client: true,
        creator: true
      }
    });
  }

  async getSalesFunnels(tenantId: string, filters: any = {}) {
    const { 
      status, 
      clientId, 
      page = 1, 
      limit = 20 
    } = filters;

    const where: any = { tenantId };

    if (status) where.status = status;
    if (clientId) where.clientId = clientId;

    const skip = (page - 1) * limit;

    const [funnels, total] = await Promise.all([
      this.prisma.salesFunnel.findMany({
        where,
        include: {
          client: true,
          creator: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.prisma.salesFunnel.count({ where })
    ]);

    return {
      funnels,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getSalesFunnel(tenantId: string, funnelId: string) {
    const funnel = await this.prisma.salesFunnel.findFirst({
      where: { id: funnelId, tenantId },
      include: {
        client: true,
        creator: true
      }
    });

    if (!funnel) {
      throw new NotFoundException('Sales funnel not found');
    }

    return funnel;
  }

  async updateSalesFunnel(tenantId: string, funnelId: string, updateDto: UpdateSalesFunnelDto) {
    await this.getSalesFunnel(tenantId, funnelId);

    return this.prisma.salesFunnel.update({
      where: { id: funnelId },
      data: updateDto,
      include: {
        client: true,
        creator: true
      }
    });
  }

  async deleteSalesFunnel(tenantId: string, funnelId: string) {
    await this.getSalesFunnel(tenantId, funnelId);

    return this.prisma.salesFunnel.delete({
      where: { id: funnelId }
    });
  }

  // Integration Management
  async createIntegration(tenantId: string, createDto: CreateIntegrationDto) {
    return this.prisma.integration.create({
      data: {
        ...createDto,
        tenantId
      }
    });
  }

  async getIntegrations(tenantId: string) {
    return this.prisma.integration.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getIntegration(tenantId: string, integrationId: string) {
    const integration = await this.prisma.integration.findFirst({
      where: { id: integrationId, tenantId }
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    return integration;
  }

  async updateIntegration(tenantId: string, integrationId: string, updateDto: UpdateIntegrationDto) {
    await this.getIntegration(tenantId, integrationId);

    return this.prisma.integration.update({
      where: { id: integrationId },
      data: updateDto
    });
  }

  async deleteIntegration(tenantId: string, integrationId: string) {
    await this.getIntegration(tenantId, integrationId);

    return this.prisma.integration.delete({
      where: { id: integrationId }
    });
  }

  // Platform Sync
  async syncAnalytics(tenantId: string, syncDto: SyncAnalyticsDto) {
    // This would integrate with actual platform APIs
    // For now, return a mock response
    return {
      message: `Syncing analytics for ${syncDto.platform}`,
      syncedAt: new Date(),
      recordsProcessed: Math.floor(Math.random() * 100) + 1
    };
  }

  // Statistics
  async getAdCampaignStats(tenantId: string) {
    const [
      totalCampaigns,
      activeCampaigns,
      pausedCampaigns,
      draftCampaigns,
      totalSpend,
      totalImpressions,
      totalClicks
    ] = await Promise.all([
      this.prisma.adCampaign.count({ where: { tenantId } }),
      this.prisma.adCampaign.count({ where: { tenantId, status: AdStatus.ACTIVE } }),
      this.prisma.adCampaign.count({ where: { tenantId, status: AdStatus.PAUSED } }),
      this.prisma.adCampaign.count({ where: { tenantId, status: AdStatus.DRAFT } }),
      this.prisma.adAnalytics.aggregate({
        where: { adCampaign: { tenantId } },
        _sum: { spend: true }
      }),
      this.prisma.adAnalytics.aggregate({
        where: { adCampaign: { tenantId } },
        _sum: { impressions: true }
      }),
      this.prisma.adAnalytics.aggregate({
        where: { adCampaign: { tenantId } },
        _sum: { clicks: true }
      })
    ]);

    return {
      totalCampaigns,
      activeCampaigns,
      pausedCampaigns,
      draftCampaigns,
      totalSpend: totalSpend._sum.spend || 0,
      totalImpressions: totalImpressions._sum.impressions || 0,
      totalClicks: totalClicks._sum.clicks || 0,
      averageCTR: totalImpressions._sum.impressions > 0 ? 
        (totalClicks._sum.clicks / totalImpressions._sum.impressions) * 100 : 0
    };
  }
}
