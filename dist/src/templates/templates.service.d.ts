import { PrismaService } from '../common/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/templates.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class TemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTemplate(createTemplateDto: CreateTemplateDto, tenantId: string): Promise<any>;
    getTemplates(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getTemplate(id: string, tenantId: string): Promise<any>;
    updateTemplate(id: string, updateTemplateDto: UpdateTemplateDto, tenantId: string): Promise<any>;
    deleteTemplate(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    duplicateTemplate(id: string, tenantId: string, duplicateData: {
        name: string;
        description?: string;
    }): Promise<any>;
    getTemplateStats(id: string, tenantId: string): Promise<{
        templateId: string;
        videoProjects: {
            total: any;
            byStatus: any;
        };
        printProjects: {
            total: any;
            byStatus: any;
        };
        assets: {
            total: any;
            byKind: any;
        };
    }>;
}
