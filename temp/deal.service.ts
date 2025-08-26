import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateDealDto, UpdateDealDto } from './dto/crm.dto';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  async createDeal(tenantId: string, createDealDto: CreateDealDto) {
    return this.prisma.deal.create({
      data: {
        ...createDealDto,
        tenantId,
      },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });
  }

  async getDeals(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.stage) where.stage = filters.stage;
    if (filters?.assignedTo) where.assignedTo = filters.assignedTo;
    if (filters?.clientId) where.clientId = filters.clientId;
    if (filters?.leadId) where.leadId = filters.leadId;
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.deal.findMany({
      where,
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDeal(tenantId: string, id: string) {
    return this.prisma.deal.findFirst({
      where: { id, tenantId },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });
  }

  async updateDeal(tenantId: string, id: string, updateDealDto: UpdateDealDto) {
    return this.prisma.deal.update({
      where: { id, tenantId },
      data: updateDealDto,
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });
  }

  async deleteDeal(tenantId: string, id: string) {
    return this.prisma.deal.delete({
      where: { id, tenantId },
    });
  }

  async moveDealStage(tenantId: string, id: string, stage: string) {
    return this.prisma.deal.update({
      where: { id, tenantId },
      data: { stage },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });
  }

  async closeDeal(tenantId: string, id: string, won: boolean, closedAt?: Date) {
    const stage = won ? 'CLOSED_WON' : 'CLOSED_LOST';
    
    return this.prisma.deal.update({
      where: { id, tenantId },
      data: { 
        stage,
        closedAt: closedAt || new Date(),
      },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });
  }

  async getDealStats(tenantId: string) {
    const [total, byStage, totalValue, wonValue] = await Promise.all([
      this.prisma.deal.count({ where: { tenantId } }),
      this.prisma.deal.groupBy({
        by: ['stage'],
        where: { tenantId },
        _count: { stage: true },
        _sum: { value: true },
      }),
      this.prisma.deal.aggregate({
        where: { tenantId },
        _sum: { value: true },
      }),
      this.prisma.deal.aggregate({
        where: { tenantId, stage: 'CLOSED_WON' },
        _sum: { value: true },
      }),
    ]);

    return {
      total,
      byStage,
      totalValue: totalValue._sum.value || 0,
      wonValue: wonValue._sum.value || 0,
      winRate: total > 0 ? (byStage.find(s => s.stage === 'CLOSED_WON')?._count.stage || 0) / total * 100 : 0,
    };
  }

  async getPipeline(tenantId: string) {
    const deals = await this.prisma.deal.findMany({
      where: { 
        tenantId,
        stage: {
          notIn: ['CLOSED_WON', 'CLOSED_LOST'],
        },
      },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
      orderBy: { expectedClose: 'asc' },
    });

    // Group by stage
    const pipeline = {
      PROSPECT: [],
      QUALIFICATION: [],
      PROPOSAL: [],
      NEGOTIATION: [],
    };

    deals.forEach(deal => {
      if (pipeline[deal.stage]) {
        pipeline[deal.stage].push(deal);
      }
    });

    return pipeline;
  }

  async getForecast(tenantId: string, months: number = 3) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const deals = await this.prisma.deal.findMany({
      where: {
        tenantId,
        stage: {
          notIn: ['CLOSED_WON', 'CLOSED_LOST'],
        },
        expectedClose: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        lead: true,
        assignedUser: true,
        client: true,
      },
    });

    // Calculate weighted forecast based on probability
    const forecast = deals.reduce((total, deal) => {
      const weightedValue = (deal.value || 0) * (deal.probability || 0) / 100;
      return total + weightedValue;
    }, 0);

    return {
      deals,
      forecast,
      months,
    };
  }

  async getDealAnalytics(tenantId: string, period: 'week' | 'month' | 'quarter' | 'year' = 'month') {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const [created, closed, won] = await Promise.all([
      this.prisma.deal.count({
        where: {
          tenantId,
          createdAt: { gte: startDate },
        },
      }),
      this.prisma.deal.count({
        where: {
          tenantId,
          closedAt: { gte: startDate },
        },
      }),
      this.prisma.deal.count({
        where: {
          tenantId,
          stage: 'CLOSED_WON',
          closedAt: { gte: startDate },
        },
      }),
    ]);

    return {
      period,
      created,
      closed,
      won,
      winRate: closed > 0 ? (won / closed) * 100 : 0,
    };
  }
}
