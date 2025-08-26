export declare class CreateVideoProjectDto {
    brandId: string;
    templateId?: string;
    script?: string;
    properties?: any;
}
export declare class UpdateVideoProjectDto {
    templateId?: string;
    script?: string;
    properties?: any;
}
export declare class CreateVideoVariantDto {
    aspect: string;
}
export declare class RenderVideoDto {
    aspect: string;
    outputFormat?: string;
    properties?: any;
}
