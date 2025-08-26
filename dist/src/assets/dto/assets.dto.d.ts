import { AssetType, AssetStatus, PlatformType } from '@prisma/client';
export declare class CreateAssetDto {
    name: string;
    type: AssetType;
    fileUrl: string;
    thumbnailUrl?: string;
    originalUrl?: string;
    fileSize: number;
    dimensions?: {
        width: number;
        height: number;
    };
    duration?: number;
    metadata?: any;
    tags?: string[];
    description?: string;
    projectId?: string;
    clientId?: string;
}
export declare class UpdateAssetDto {
    name?: string;
    status?: AssetStatus;
    tags?: string[];
    aiTags?: string[];
    qualityScore?: number;
    description?: string;
    notes?: string;
    projectId?: string;
    clientId?: string;
}
export declare class AssetSearchDto {
    query?: string;
    type?: AssetType;
    status?: AssetStatus;
    clientId?: string;
    projectId?: string;
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
}
export declare class BatchAssetOperationDto {
    assetIds: string[];
    operation: 'tag' | 'organize' | 'deploy' | 'archive';
    data?: any;
}
export declare class CreateProjectDto {
    name: string;
    description?: string;
    type: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    deliverables?: any;
    timeline?: any;
    notes?: string;
    brandId?: string;
    clientId?: string;
}
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    deliverables?: any;
    timeline?: any;
    notes?: string;
}
export declare class CreateIntegrationDto {
    platform: PlatformType;
    name: string;
    config: any;
}
export declare class CreateDeploymentDto {
    assetId: string;
    platform: PlatformType;
    scheduledAt?: string;
    caption?: string;
    hashtags?: string[];
}
export declare class CreateClientPortalDto {
    name: string;
    description?: string;
    expiresAt?: string;
    settings?: any;
}
