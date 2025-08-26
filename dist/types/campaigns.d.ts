export type CampaignStatus = 'DRAFT' | 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
export type CampaignType = 'SOCIAL_MEDIA' | 'EMAIL_MARKETING' | 'VIDEO_CONTENT' | 'PRINT_MEDIA' | 'SEO_OPTIMIZATION' | 'PAID_ADVERTISING' | 'INFLUENCER_MARKETING' | 'PR_AND_MEDIA' | 'CONTENT_MARKETING' | 'EVENT_MARKETING';
export type CampaignGoal = 'BRAND_AWARENESS' | 'LEAD_GENERATION' | 'SEO_RANKING' | 'SALES_CONVERSION' | 'CUSTOMER_RETENTION' | 'TRAFFIC_DRIVE' | 'ENGAGEMENT_BOOST' | 'REPUTATION_MANAGEMENT';
export interface Campaign {
    id: string;
    name: string;
    description?: string;
    goal: CampaignGoal;
    type: CampaignType;
    status: CampaignStatus;
    brandId: string;
    clientId?: string;
    templateId?: string;
    createdBy: string;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    targetAudience?: Record<string, any>;
    content?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    launchedAt?: Date;
    completedAt?: Date;
    brand?: Brand;
    client?: Client;
    template?: CampaignTemplate;
    assets?: Asset[];
    kpis?: CampaignKPI[];
    analytics?: CampaignAnalytics[];
    creator?: User;
}
export interface CampaignTemplate {
    id: string;
    name: string;
    description?: string;
    type: CampaignType;
    goal: CampaignGoal;
    category?: string;
    structure: Record<string, any>;
    content: Record<string, any>;
    assets: Record<string, any>;
    settings: Record<string, any>;
    isActive: boolean;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CampaignKPI {
    id: string;
    campaignId: string;
    metric: string;
    value: number;
    target?: number;
    unit: string;
    date: Date;
    source?: string;
    createdAt: Date;
}
export interface CampaignAnalytics {
    id: string;
    campaignId: string;
    date: Date;
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
    createdAt: Date;
}
export interface Brand {
    id: string;
    name: string;
    website?: string;
    logoUrl?: string;
    palette?: Record<string, any>;
    fonts?: Record<string, any>;
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
}
export interface Asset {
    id: string;
    name: string;
    kind: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FONT' | 'DOCUMENT' | 'PDF';
    url: string;
    meta?: Record<string, any>;
}
export interface User {
    id: string;
    email: string;
}
export interface GenerateCampaignRequest {
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
export interface GeneratedCampaignPlan {
    campaignName: string;
    tagline: string;
    goal: string;
    audience: {
        profile: string;
        painPoints: string[];
        motivations: string[];
        behaviors: string[];
    };
    strategy: {
        platforms: string[];
        contentMix: {
            organic: string;
            paid: string;
        };
        approach: string;
    };
    deliverables: Record<string, string[]>;
    timeline: {
        phase1: string;
        phase2: string;
        phase3: string;
    };
    kpis: string[];
    budget: {
        total: number;
        allocation: Record<string, number>;
    };
    recommendations: string[];
    generatedAt: Date;
    source: string;
    inputData: GenerateCampaignRequest;
}
export interface CampaignPerformance {
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalSpend: number;
    totalRevenue: number;
    averageCtr: number;
    averageCpc: number;
    averageCpa: number;
    averageRoi: number;
    trend: 'increasing' | 'decreasing' | 'stable';
}
export interface CampaignStats {
    totalCampaigns: number;
    statusBreakdown: Record<CampaignStatus, number>;
    typeBreakdown: Record<CampaignType, number>;
    goalBreakdown: Record<CampaignGoal, number>;
}
export interface PerformanceInsights {
    performance: {
        aggregatePerformance: CampaignPerformance;
        topCampaigns: Array<{
            id: string;
            name: string;
            brand: string;
            client?: string;
            performance: CampaignPerformance;
        }>;
        totalCampaigns: number;
        activeCampaigns: number;
    };
    insights: Array<{
        type: 'warning' | 'success' | 'info';
        title: string;
        message: string;
        priority: 'high' | 'medium' | 'low';
    }>;
}
export interface CampaignFilters {
    status: string;
    type: string;
    goal: string;
    clientId: string;
    brandId: string;
}
export interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: CampaignStatus;
    type?: CampaignType;
    goal?: CampaignGoal;
    clientId?: string;
    brandId?: string;
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
