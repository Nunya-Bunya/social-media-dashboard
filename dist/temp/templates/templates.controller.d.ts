import { TemplatesService } from './templates.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/templates.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    createTemplate(createTemplateDto: CreateTemplateDto, req: any): Promise<any>;
    getTemplates(pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getTemplate(id: string, req: any): Promise<any>;
    updateTemplate(id: string, updateTemplateDto: UpdateTemplateDto, req: any): Promise<any>;
    deleteTemplate(id: string, req: any): Promise<{
        message: string;
    }>;
    duplicateTemplate(id: string, duplicateData: {
        name: string;
        description?: string;
    }, req: any): Promise<any>;
    getTemplateStats(id: string, req: any): Promise<{
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
