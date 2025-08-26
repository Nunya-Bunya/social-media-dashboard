import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateLeadDto, UpdateLeadDto, CreateActivityDto, UpdateActivityDto } from './dto/crm.dto';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async createLead(tenantId: string, createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...createLeadDto,
        tenantId,
      },
      include: {
        client: true,
        assignedUser: true,
        deals: true,
        activities: true,
      },
    });
  }

  async getLeads(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.status) where.status = filters.status;
    if (filters?.source) where.source = filters.source;
    if (filters?.assignedTo) where.assignedTo = filters.assignedTo;
    if (filters?.clientId) where.clientId = filters.clientId;
    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { company: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.lead.findMany({
      where,
      include: {
        client: true,
        assignedUser: true,
        deals: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLead(tenantId: string, id: string) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: {
        client: true,
        assignedUser: true,
        deals: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async updateLead(tenantId: string, id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: updateLeadDto,
      include: {
        client: true,
        assignedUser: true,
        deals: true,
        activities: true,
      },
    });
  }

  async deleteLead(tenantId: string, id: string) {
    return this.prisma.lead.delete({
      where: { id, tenantId },
    });
  }

  async scoreLead(tenantId: string, id: string, score: number) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: { score },
    });
  }

  async getLeadStats(tenantId: string) {
    const [total, byStatus, bySource] = await Promise.all([
      this.prisma.lead.count({ where: { tenantId } }),
      this.prisma.lead.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { status: true },
      }),
      this.prisma.lead.groupBy({
        by: ['source'],
        where: { tenantId },
        _count: { source: true },
      }),
    ]);

    return {
      total,
      byStatus,
      bySource,
    };
  }

  // Activity Management
  async createActivity(tenantId: string, createActivityDto: CreateActivityDto) {
    // Verify lead belongs to tenant
    const lead = await this.prisma.lead.findFirst({
      where: { id: createActivityDto.leadId, tenantId },
    });

    if (!lead) {
      throw new Error('Lead not found');
    }

    return this.prisma.leadActivity.create({
      data: createActivityDto,
      include: {
        lead: true,
      },
    });
  }

  async getActivities(tenantId: string, leadId?: string) {
    const where: any = {};
    
    if (leadId) {
      where.leadId = leadId;
      // Verify lead belongs to tenant
      const lead = await this.prisma.lead.findFirst({
        where: { id: leadId, tenantId },
      });
      if (!lead) {
        throw new Error('Lead not found');
      }
    }

    return this.prisma.leadActivity.findMany({
      where,
      include: {
        lead: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateActivity(tenantId: string, id: string, updateActivityDto: UpdateActivityDto) {
    // Verify activity belongs to a lead in this tenant
    const activity = await this.prisma.leadActivity.findFirst({
      where: { id },
      include: { lead: true },
    });

    if (!activity || activity.lead.tenantId !== tenantId) {
      throw new Error('Activity not found');
    }

    return this.prisma.leadActivity.update({
      where: { id },
      data: updateActivityDto,
      include: {
        lead: true,
      },
    });
  }

  async deleteActivity(tenantId: string, id: string) {
    // Verify activity belongs to a lead in this tenant
    const activity = await this.prisma.leadActivity.findFirst({
      where: { id },
      include: { lead: true },
    });

    if (!activity || activity.lead.tenantId !== tenantId) {
      throw new Error('Activity not found');
    }

    return this.prisma.leadActivity.delete({
      where: { id },
    });
  }

  // Lead Conversion
  async convertToDeal(tenantId: string, leadId: string, dealData: any) {
    const lead = await this.prisma.lead.findFirst({
      where: { id: leadId, tenantId },
    });

    if (!lead) {
      throw new Error('Lead not found');
    }

    return this.prisma.$transaction(async (tx) => {
      // Create deal
      const deal = await tx.deal.create({
        data: {
          ...dealData,
          leadId,
          tenantId,
        },
      });

      // Update lead status
      await tx.lead.update({
        where: { id: leadId },
        data: { status: 'CLOSED_WON' },
      });

      return deal;
    });
  }
}
