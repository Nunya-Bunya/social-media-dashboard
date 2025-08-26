import { CampaignGoal, CampaignType, CampaignStatus } from '@prisma/client';
export declare class CreateCampaignDto {
    name: string;
    description?: string;
    goal: CampaignGoal;
    type: CampaignType;
    brandId: string;
    clientId?: string;
    templateId?: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    targetAudience?: Record<string, any>;
    content?: Record<string, any>;
    assetIds?: string[];
}
export declare class UpdateCampaignDto {
    name?: string;
    description?: string;
    goal?: CampaignGoal;
    type?: CampaignType;
    status?: CampaignStatus;
    startDate?: string;
    endDate?: string;
    budget?: number;
    targetAudience?: Record<string, any>;
    content?: Record<string, any>;
    assetIds?: string[];
}
export declare class GenerateCampaignDto {
    clientName: string;
    businessType: string;
    targetAudience: string;
    primaryGoal: CampaignGoal;
    additionalGoals?: CampaignGoal[];
    budgetRange: 'LOW' | 'MEDIUM' | 'HIGH';
    preferredPlatforms?: string[];
    timeline: string;
    existingAssets?: string;
    brandId?: string;
    additionalContext?: Record<string, any>;
}
export declare class CampaignTemplateDto {
    name: string;
    description?: string;
    type: CampaignType;
    goal: CampaignGoal;
    category?: string;
    structure: Record<string, any>;
    content: Record<string, any>;
    assets: Record<string, any>;
    settings: Record<string, any>;
    isActive?: boolean;
}
export declare class CampaignKpiDto {
    metric: string;
    value: number;
    target?: number;
    unit: string;
    date: string;
    source?: string;
}
export declare class CampaignAnalyticsDto {
    date: string;
    platform?: string;
    impressions?: number;
    clicks?: number;
    conversions?: number;
    spend?: number;
    revenue?: number;
    ctr?: number;
    cpc?: number;
    cpa?: number;
    roi?: number;
    engagement?: Record<string, any>;
    demographics?: Record<string, any>;
    geographic?: Record<string, any>;
}
