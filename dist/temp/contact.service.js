"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ContactService = class ContactService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createContact(tenantId, createContactDto) {
        return this.prisma.contact.create({
            data: {
                ...createContactDto,
                tenantId,
            },
        });
    }
    async getContacts(tenantId, filters) {
        const where = { tenantId };
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
    async getContact(tenantId, id) {
        return this.prisma.contact.findFirst({
            where: { id, tenantId },
        });
    }
    async updateContact(tenantId, id, updateContactDto) {
        return this.prisma.contact.update({
            where: { id, tenantId },
            data: updateContactDto,
        });
    }
    async deleteContact(tenantId, id) {
        return this.prisma.contact.delete({
            where: { id, tenantId },
        });
    }
    async addTag(tenantId, id, tag) {
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
    async removeTag(tenantId, id, tag) {
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
    async getContactStats(tenantId) {
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
        const tagCounts = {};
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
    async bulkImport(tenantId, contacts) {
        const data = contacts.map(contact => ({
            ...contact,
            tenantId,
        }));
        return this.prisma.contact.createMany({
            data,
            skipDuplicates: true,
        });
    }
    async exportContacts(tenantId, format = 'json') {
        const contacts = await this.prisma.contact.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
        });
        if (format === 'csv') {
            const headers = ['firstName', 'lastName', 'email', 'phone', 'company', 'position', 'tags', 'notes'];
            const csvContent = [
                headers.join(','),
                ...contacts.map(contact => headers.map(header => {
                    const value = contact[header];
                    if (Array.isArray(value)) {
                        return `"${value.join(';')}"`;
                    }
                    return value ? `"${value}"` : '';
                }).join(','))
            ].join('\n');
            return csvContent;
        }
        return contacts;
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ContactService);
//# sourceMappingURL=contact.service.js.map