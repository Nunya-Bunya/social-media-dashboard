import { AdPlatform, AdStatus, AdType, CreativeType, TestStatus, TestVariant, FunnelStatus } from '@prisma/client';
export declare class CreateAdCampaignDto {
    name: string;
    description?: string;
    platform: AdPlatform;
    adType: AdType;
    budget: number;
    dailyBudget?: number;
    targeting?: Record<string, any>;
    brandId: string;
    clientId?: string;
    startDate?: string;
    endDate?: string;
}
export declare class UpdateAdCampaignDto {
    name?: string;
    description?: string;
    platform?: AdPlatform;
    adType?: AdType;
    status?: AdStatus;
    budget?: number;
    dailyBudget?: number;
    targeting?: Record<string, any>;
    startDate?: string;
    endDate?: string;
}
export declare class CreateAdCreativeDto {
    name: string;
    type: CreativeType;
    platform: AdPlatform;
    adCampaignId?: string;
    brandId: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    adCopy?: Record<string, any>;
    dimensions?: Record<string, any>;
    fileSize?: number;
    duration?: number;
}
export declare class UpdateAdCreativeDto {
    name?: string;
    type?: CreativeType;
    platform?: AdPlatform;
    mediaUrl?: string;
    thumbnailUrl?: string;
    adCopy?: Record<string, any>;
    dimensions?: Record<string, any>;
    fileSize?: number;
    duration?: number;
}
export declare class TrackAdAnalyticsDto {
    date: string;
    impressions: number;
    clicks: number;
    conversions?: number;
    spend: number;
    revenue?: number;
    ctr: number;
    cpc: number;
    cpa?: number;
    roi?: number;
    reach?: number;
    frequency?: number;
    qualityScore?: number;
}
export declare class CreateSplitTestDto {
    name: string;
    description?: string;
    adCampaignId: string;
    variantA: Record<string, any>;
    variantB: Record<string, any>;
    startDate: string;
    endDate?: string;
    sampleSize: number;
}
export declare class UpdateSplitTestDto {
    name?: string;
    description?: string;
    status?: TestStatus;
    variantA?: Record<string, any>;
    variantB?: Record<string, any>;
    endDate?: string;
    winner?: TestVariant;
}
export declare class CreateSalesFunnelDto {
    name: string;
    description?: string;
    clientId?: string;
    steps: Record<string, any>;
    conversionRates?: Record<string, any>;
}
export declare class UpdateSalesFunnelDto {
    name?: string;
    description?: string;
    status?: FunnelStatus;
    steps?: Record<string, any>;
    conversionRates?: Record<string, any>;
}
export declare class CreateIntegrationDto {
    platform: string;
    name: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    settings?: Record<string, any>;
    isActive?: boolean;
}
export declare class UpdateIntegrationDto {
    name?: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    settings?: Record<string, any>;
    isActive?: boolean;
}
export declare class AnalyticsOverviewDto {
    startDate: string;
    endDate: string;
    platform?: AdPlatform;
    clientId?: string;
    brandId?: string;
}
export declare class SyncAnalyticsDto {
    platform: AdPlatform;
    campaignId?: string;
    startDate?: string;
    endDate?: string;
}
