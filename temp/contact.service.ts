import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/crm.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(tenantId: string, createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...createContactDto,
        tenantId,
      },
    });
  }

  async getContacts(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags,
      };
    }

    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { company: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getContact(tenantId: string, id: string) {
    return this.prisma.contact.findFirst({
      where: { id, tenantId },
    });
  }

  async updateContact(tenantId: string, id: string, updateContactDto: UpdateContactDto) {
    return this.prisma.contact.update({
      where: { id, tenantId },
      data: updateContactDto,
    });
  }

  async deleteContact(tenantId: string, id: string) {
    return this.prisma.contact.delete({
      where: { id, tenantId },
    });
  }

  async addTag(tenantId: string, id: string, tag: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, tenantId },
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    const tags = contact.tags || [];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }

    return this.prisma.contact.update({
      where: { id, tenantId },
      data: { tags },
    });
  }

  async removeTag(tenantId: string, id: string, tag: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, tenantId },
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    const tags = contact.tags || [];
    const filteredTags = tags.filter(t => t !== tag);

    return this.prisma.contact.update({
      where: { id, tenantId },
      data: { tags: filteredTags },
    });
  }

  async getContactStats(tenantId: string) {
    const [total, byCompany, byTags] = await Promise.all([
      this.prisma.contact.count({ where: { tenantId } }),
      this.prisma.contact.groupBy({
        by: ['company'],
        where: { tenantId, company: { not: null } },
        _count: { company: true },
      }),
      this.prisma.contact.findMany({
        where: { tenantId },
        select: { tags: true },
      }),
    ]);

    // Process tags
    const tagCounts: { [key: string]: number } = {};
    byTags.forEach(contact => {
      contact.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return {
      total,
      byCompany,
      byTags: Object.entries(tagCounts).map(([tag, count]) => ({ tag, count })),
    };
  }

  async bulkImport(tenantId: string, contacts: CreateContactDto[]) {
    const data = contacts.map(contact => ({
      ...contact,
      tenantId,
    }));

    return this.prisma.contact.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async exportContacts(tenantId: string, format: 'csv' | 'json' = 'json') {
    const contacts = await this.prisma.contact.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'csv') {
      // Convert to CSV format
      const headers = ['firstName', 'lastName', 'email', 'phone', 'company', 'position', 'tags', 'notes'];
      const csvContent = [
        headers.join(','),
        ...contacts.map(contact => 
          headers.map(header => {
            const value = contact[header];
            if (Array.isArray(value)) {
              return `"${value.join(';')}"`;
            }
            return value ? `"${value}"` : '';
          }).join(',')
        )
      ].join('\n');

      return csvContent;
    }

    return contacts;
  }
}
