import { PrismaService } from '../common/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/crm.dto';
export declare class ContactService {
    private prisma;
    constructor(prisma: PrismaService);
    createContact(tenantId: string, createContactDto: CreateContactDto): Promise<any>;
    getContacts(tenantId: string, filters?: any): Promise<any>;
    getContact(tenantId: string, id: string): Promise<any>;
    updateContact(tenantId: string, id: string, updateContactDto: UpdateContactDto): Promise<any>;
    deleteContact(tenantId: string, id: string): Promise<any>;
    addTag(tenantId: string, id: string, tag: string): Promise<any>;
    removeTag(tenantId: string, id: string, tag: string): Promise<any>;
    getContactStats(tenantId: string): Promise<{
        total: any;
        byCompany: any;
        byTags: {
            tag: string;
            count: number;
        }[];
    }>;
    bulkImport(tenantId: string, contacts: CreateContactDto[]): Promise<any>;
    exportContacts(tenantId: string, format?: 'csv' | 'json'): Promise<any>;
}
