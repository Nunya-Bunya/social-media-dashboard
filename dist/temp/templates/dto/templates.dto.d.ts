import { TemplateType } from '@prisma/client';
export declare class CreateTemplateDto {
    name: string;
    description?: string;
    type: TemplateType;
    brandId: string;
    metadata?: Record<string, any>;
    isActive?: boolean;
}
export declare class UpdateTemplateDto {
    name?: string;
    description?: string;
    type?: TemplateType;
    brandId?: string;
    metadata?: Record<string, any>;
    isActive?: boolean;
}
