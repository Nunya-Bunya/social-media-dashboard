import { PrismaService } from '../common/prisma.service';
import { CampaignTemplateDto } from './dto/campaigns.dto';
import { CampaignGoal, CampaignType } from '@prisma/client';
export declare class CampaignTemplatesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createTemplate(templateDto: CampaignTemplateDto): Promise<any>;
    getTemplates(filters?: {
        type?: CampaignType;
        goal?: CampaignGoal;
        category?: string;
        isActive?: boolean;
    }): Promise<any>;
    getTemplate(id: string): Promise<any>;
    updateTemplate(id: string, templateDto: Partial<CampaignTemplateDto>): Promise<any>;
    deleteTemplate(id: string): Promise<any>;
    getTemplateSuggestions(goal: CampaignGoal, type?: CampaignType, budget?: number): Promise<any>;
    incrementUsageCount(templateId: string): Promise<void>;
    seedDefaultTemplates(): Promise<void>;
    private calculateTemplateScore;
    private getDefaultTemplates;
}
