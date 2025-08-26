import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { LeadService } from './lead.service';

@Injectable()
export class CRMService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leadService: LeadService,
  ) {}

  async getDashboard(tenantId: string) {
    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      totalClients,
      leadStats,
    ] = await Promise.all([
      this.prisma.lead.count({ where: { tenantId } }),
      this.prisma.lead.count({ 
        where: { 
          tenantId,
          status: 'NEW'
        } 
      }),
      this.prisma.lead.count({ 
        where: { 
          tenantId,
          status: 'QUALIFIED'
        } 
      }),
      this.prisma.client.count({ where: { tenantId } }),
      this.prisma.lead.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { status: true },
      }),
    ]);

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      totalClients,
      leadStats,
      conversionRate: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
    };
  }

  async getPipeline(tenantId: string) {
    const leads = await this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      leads,
      stages: {
        new: leads.filter(lead => lead.status === 'NEW'),
        contacted: leads.filter(lead => lead.status === 'CONTACTED'),
        qualified: leads.filter(lead => lead.status === 'QUALIFIED'),
        proposal: leads.filter(lead => lead.status === 'PROPOSAL_SENT'),
        negotiation: leads.filter(lead => lead.status === 'NEGOTIATION'),
        closed: leads.filter(lead => lead.status === 'CLOSED_WON' || lead.status === 'CLOSED_LOST'),
      },
    };
  }

  async getForecast(tenantId: string, months: number = 3) {
    const leads = await this.prisma.lead.findMany({
      where: { 
        tenantId,
        createdAt: {
          gte: new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        client: true,
      },
    });

    const conversionRate = 0.15; // 15% conversion rate
    const avgDealValue = 5000; // Average deal value

    const projectedRevenue = leads.length * conversionRate * avgDealValue;

    return {
      totalLeads: leads.length,
      conversionRate,
      avgDealValue,
      projectedRevenue,
      monthlyProjection: projectedRevenue / months,
    };
  }

  async getAnalytics(tenantId: string, period: 'week' | 'month' | 'quarter' | 'year' = 'month') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    const leads = await this.prisma.lead.findMany({
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
    });

    return {
      period,
      totalLeads: leads.length,
      leadsByStatus: leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {}),
      conversionRate: leads.length > 0 ? 
        (leads.filter(l => l.status === 'CLOSED_WON').length / leads.length) * 100 : 0,
    };
  }

  async getRecentActivity(tenantId: string, limit: number = 10) {
    const leads = await this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        client: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: limit,
    });

    return leads.map(lead => ({
      id: lead.id,
      type: 'lead',
      action: lead.status === 'NEW' ? 'Created' : 'Updated',
      description: `${lead.firstName} ${lead.lastName} - ${lead.status}`,
      timestamp: lead.updatedAt,
      data: lead,
    }));
  }

  async searchCRM(tenantId: string, query: string) {
    const leads = await this.prisma.lead.findMany({
      where: {
        tenantId,
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        client: true,
      },
    });

    const clients = await this.prisma.client.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return {
      leads,
      clients,
      totalResults: leads.length + clients.length,
    };
  }

  async generateReport(tenantId: string, type: 'leads' | 'pipeline' | 'forecast', options: any = {}) {
    switch (type) {
      case 'leads':
        return this.generateLeadsReport(tenantId, options);
      case 'pipeline':
        return this.generatePipelineReport(tenantId, options);
      case 'forecast':
        return this.generateForecastReport(tenantId, options);
      default:
        throw new Error(`Unknown report type: ${type}`);
    }
  }

  private async generateLeadsReport(tenantId: string, options: any) {
    const leads = await this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        client: true,
      },
    });

    return {
      type: 'leads',
      totalLeads: leads.length,
      leadsByStatus: leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {}),
      leadsBySource: leads.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {}),
      leads,
    };
  }

  private async generatePipelineReport(tenantId: string, options: any) {
    const pipeline = await this.getPipeline(tenantId);
    
    return {
      type: 'pipeline',
      stages: pipeline.stages,
      totalLeads: pipeline.leads.length,
      conversionRates: {
        newToContacted: pipeline.stages.new.length > 0 ? 
          (pipeline.stages.contacted.length / pipeline.stages.new.length) * 100 : 0,
        contactedToQualified: pipeline.stages.contacted.length > 0 ? 
          (pipeline.stages.qualified.length / pipeline.stages.contacted.length) * 100 : 0,
        qualifiedToClosed: pipeline.stages.qualified.length > 0 ? 
          (pipeline.stages.closed.length / pipeline.stages.qualified.length) * 100 : 0,
      },
    };
  }

  private async generateForecastReport(tenantId: string, options: any) {
    const months = options.months || 3;
    const forecast = await this.getForecast(tenantId, months);
    
    return {
      type: 'forecast',
      period: `${months} months`,
      ...forecast,
    };
  }
}
