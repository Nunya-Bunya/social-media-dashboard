import { PrismaService } from '../common/prisma.service';
import { AiProvider } from '../vendor/ai/ai.provider';
import { GenerateCampaignDto } from './dto/campaigns.dto';
export declare class CampaignAiService {
    private readonly prisma;
    private readonly aiProvider;
    private readonly logger;
    constructor(prisma: PrismaService, aiProvider: AiProvider);
    generateCampaignPlan(generateDto: GenerateCampaignDto, tenantId: string): Promise<{
        success: boolean;
        campaignPlan: any;
        savedPlanId: any;
        message: string;
    }>;
    generateCampaignAssets(campaignId: string, assetType: string, context: any, tenantId: string): Promise<{
        success: boolean;
        assets: string;
        assetType: string;
        campaignId: string;
    }>;
    generateCampaignSuggestions(clientId: string, brandId: string, tenantId: string): Promise<{
        success: boolean;
        suggestions: any[];
        performanceAnalysis: any;
    }>;
    optimizeCampaignContent(campaignId: string, content: string, optimizationType: string, tenantId: string): Promise<{
        success: boolean;
        originalContent: string;
        optimizedContent: string;
        optimizationType: string;
        campaignId: string;
    }>;
    private buildCampaignPrompt;
    private buildAssetPrompt;
    private buildSuggestionPrompt;
    private buildOptimizationPrompt;
    private parseCampaignPlan;
    private calculateBudget;
    private analyzeCampaignPerformance;
    private generatePerformanceRecommendations;
    private parseSuggestions;
    private saveGeneratedPlan;
    private mapGoalToType;
    private calculateEndDate;
}
