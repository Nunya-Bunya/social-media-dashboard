export declare enum AdPlatform {
    FACEBOOK = "FACEBOOK",
    INSTAGRAM = "INSTAGRAM",
    GOOGLE_ADS = "GOOGLE_ADS",
    TIKTOK = "TIKTOK",
    LINKEDIN = "LINKEDIN",
    TWITTER = "TWITTER",
    YOUTUBE = "YOUTUBE",
    SNAPCHAT = "SNAPCHAT",
    PINTEREST = "PINTEREST"
}
export declare enum AdStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum AdType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    CAROUSEL = "CAROUSEL",
    STORY = "STORY",
    REEL = "REEL",
    TEXT = "TEXT"
}
export declare enum CreativeType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    CAROUSEL = "CAROUSEL",
    STORY = "STORY",
    REEL = "REEL"
}
export declare enum TestStatus {
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum TestVariant {
    A = "A",
    B = "B",
    NONE = "NONE"
}
export declare enum FunnelStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED"
}
export interface AdCampaign {
    id: string;
    name: string;
    description?: string;
    platform: AdPlatform;
    status: AdStatus;
    adType: AdType;
    budget: number;
    dailyBudget?: number;
    targeting?: Record<string, any>;
    brandId: string;
    clientId?: string;
    createdBy: string;
    tenantId: string;
    startDate?: string;
    endDate?: string;
    launchedAt?: string;
    pausedAt?: string;
    createdAt: string;
    updatedAt: string;
    brand?: Brand;
    client?: Client;
    creator?: User;
    adCreatives?: AdCreative[];
    adAnalytics?: AdAnalytics[];
    splitTests?: SplitTest[];
}
export interface AdCreative {
    id: string;
    name: string;
    type: CreativeType;
    platform: AdPlatform;
    adCampaignId?: string;
    brandId: string;
    tenantId: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    adCopy?: Record<string, any>;
    dimensions?: Record<string, any>;
    fileSize?: number;
    duration?: number;
    createdAt: string;
    updatedAt: string;
    brand?: Brand;
    adCampaign?: AdCampaign;
    assets?: Asset[];
}
export interface AdAnalytics {
    id: string;
    adCampaignId: string;
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
    createdAt: string;
}
export interface SplitTest {
    id: string;
    name: string;
    description?: string;
    status: TestStatus;
    adCampaignId: string;
    tenantId: string;
    variantA: Record<string, any>;
    variantB: Record<string, any>;
    startDate: string;
    endDate?: string;
    sampleSize: number;
    confidence?: number;
    winner?: TestVariant;
    createdAt: string;
    updatedAt: string;
    adCampaign?: AdCampaign;
}
export interface SalesFunnel {
    id: string;
    name: string;
    description?: string;
    status: FunnelStatus;
    clientId?: string;
    createdBy: string;
    tenantId: string;
    steps: Record<string, any>;
    conversionRates?: Record<string, any>;
    totalConversions: number;
    totalRevenue: number;
    createdAt: string;
    updatedAt: string;
    client?: Client;
    creator?: User;
}
export interface Integration {
    id: string;
    platform: string;
    name: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    settings?: Record<string, any>;
    isActive: boolean;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}
export interface Brand {
    id: string;
    name: string;
    website?: string;
    logoUrl?: string;
    palette?: Record<string, any>;
    fonts?: Record<string, any>;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}
export interface Client {
    id: string;
    name: string;
    email: string;
    company?: string;
    industry?: string;
    targetAudience?: Record<string, any>;
    budget?: number;
    goals?: Record<string, any>;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}
export interface User {
    id: string;
    email: string;
    role: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}
export interface Asset {
    id: string;
    name: string;
    kind: string;
    url: string;
    meta?: Record<string, any>;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAdCampaignRequest {
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
export interface UpdateAdCampaignRequest {
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
export interface CreateAdCreativeRequest {
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
export interface UpdateAdCreativeRequest {
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
export interface TrackAdAnalyticsRequest {
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
export interface CreateSplitTestRequest {
    name: string;
    description?: string;
    adCampaignId: string;
    variantA: Record<string, any>;
    variantB: Record<string, any>;
    startDate: string;
    endDate?: string;
    sampleSize: number;
}
export interface UpdateSplitTestRequest {
    name?: string;
    description?: string;
    status?: TestStatus;
    variantA?: Record<string, any>;
    variantB?: Record<string, any>;
    endDate?: string;
    winner?: TestVariant;
}
export interface CreateSalesFunnelRequest {
    name: string;
    description?: string;
    clientId?: string;
    steps: Record<string, any>;
    conversionRates?: Record<string, any>;
}
export interface UpdateSalesFunnelRequest {
    name?: string;
    description?: string;
    status?: FunnelStatus;
    steps?: Record<string, any>;
    conversionRates?: Record<string, any>;
}
export interface CreateIntegrationRequest {
    platform: string;
    name: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    settings?: Record<string, any>;
    isActive?: boolean;
}
export interface UpdateIntegrationRequest {
    name?: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    settings?: Record<string, any>;
    isActive?: boolean;
}
export interface AnalyticsOverviewRequest {
    startDate: string;
    endDate: string;
    platform?: AdPlatform;
    clientId?: string;
    brandId?: string;
}
export interface SyncAnalyticsRequest {
    platform: AdPlatform;
    campaignId?: string;
    startDate?: string;
    endDate?: string;
}
export interface AnalyticsOverview {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    overallROI: number;
    averageCTR: number;
    averageCPC: number;
    averageCPA: number;
    campaignCount: number;
    activeCampaigns: number;
}
export interface AdCampaignStats {
    totalCampaigns: number;
    activeCampaigns: number;
    pausedCampaigns: number;
    draftCampaigns: number;
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    averageCTR: number;
}
export interface SyncAnalyticsResponse {
    message: string;
    syncedAt: string;
    recordsProcessed: number;
}
export interface AdCampaignFilters {
    platform?: AdPlatform;
    status?: AdStatus;
    adType?: AdType;
    clientId?: string;
    brandId?: string;
    search?: string;
    page?: number;
    limit?: number;
}
export interface AdCreativeFilters {
    platform?: AdPlatform;
    type?: CreativeType;
    brandId?: string;
    adCampaignId?: string;
    page?: number;
    limit?: number;
}
export interface SplitTestFilters {
    status?: TestStatus;
    adCampaignId?: string;
    page?: number;
    limit?: number;
}
export interface SalesFunnelFilters {
    status?: FunnelStatus;
    clientId?: string;
    page?: number;
    limit?: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
export interface PlatformConfig {
    name: AdPlatform;
    displayName: string;
    icon: string;
    color: string;
    supportedAdTypes: AdType[];
    supportedCreativeTypes: CreativeType[];
    targetingOptions: string[];
    characterLimits: Record<string, number>;
    imageRequirements: {
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        maxFileSize: number;
        supportedFormats: string[];
    };
    videoRequirements?: {
        minDuration: number;
        maxDuration: number;
        maxFileSize: number;
        supportedFormats: string[];
    };
}
export interface TargetingOptions {
    demographics: {
        age: number[];
        gender: string[];
        location: string[];
        language: string[];
    };
    interests: string[];
    behaviors: string[];
    customAudiences: string[];
    lookalikeAudiences: string[];
}
export interface ChartDataPoint {
    date: string;
    value: number;
    label?: string;
}
export interface PerformanceMetrics {
    impressions: ChartDataPoint[];
    clicks: ChartDataPoint[];
    conversions: ChartDataPoint[];
    spend: ChartDataPoint[];
    revenue: ChartDataPoint[];
    ctr: ChartDataPoint[];
    cpc: ChartDataPoint[];
    cpa: ChartDataPoint[];
    roi: ChartDataPoint[];
}
export interface SplitTestResults {
    variantA: {
        impressions: number;
        clicks: number;
        conversions: number;
        spend: number;
        ctr: number;
        cpc: number;
        cpa: number;
        roi: number;
    };
    variantB: {
        impressions: number;
        clicks: number;
        conversions: number;
        spend: number;
        ctr: number;
        cpc: number;
        cpa: number;
        roi: number;
    };
    statisticalSignificance: number;
    confidence: number;
    winner?: TestVariant;
}
export interface FunnelStep {
    id: string;
    name: string;
    type: 'landing_page' | 'form' | 'checkout' | 'thank_you' | 'custom';
    url?: string;
    conversionRate?: number;
    visitors: number;
    conversions: number;
    revenue: number;
    position: number;
    settings?: Record<string, any>;
}
export interface FunnelFlow {
    steps: FunnelStep[];
    connections: Array<{
        from: string;
        to: string;
        conversionRate: number;
    }>;
}
export interface AdTemplate {
    id: string;
    name: string;
    description?: string;
    platform: AdPlatform;
    adType: AdType;
    category: string;
    thumbnail: string;
    structure: {
        adCopy: Record<string, any>;
        targeting: Record<string, any>;
        budget: Record<string, any>;
    };
    usageCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface FunnelTemplate {
    id: string;
    name: string;
    description?: string;
    category: string;
    thumbnail: string;
    steps: FunnelStep[];
    conversionRates: Record<string, number>;
    averageConversionRate: number;
    usageCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
