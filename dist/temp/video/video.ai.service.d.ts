import { PrismaService } from '../common/prisma.service';
import { AiProvider } from '../vendor/ai/ai.provider';
export declare class VideoAiService {
    private readonly prisma;
    private readonly aiProvider;
    constructor(prisma: PrismaService, aiProvider: AiProvider);
    generateScript(projectId: string, prompt: string, context: any, tenantId: string): Promise<{
        script: string;
        projectId: string;
        generatedAt: Date;
    }>;
    optimizeScript(projectId: string, content: string, tenantId: string): Promise<{
        originalContent: string;
        optimizedContent: string;
        projectId: string;
        optimizedAt: Date;
    }>;
    generateCopy(projectId: string, type: 'title' | 'description' | 'callToAction', context: any, tenantId: string): Promise<{
        type: "description" | "title" | "callToAction";
        generatedCopy: string;
        projectId: string;
        generatedAt: Date;
    }>;
    analyzeSentiment(projectId: string, content: string, tenantId: string): Promise<{
        content: string;
        sentiment: {
            sentiment: string;
            score: number;
        };
        projectId: string;
        analyzedAt: Date;
    }>;
}
