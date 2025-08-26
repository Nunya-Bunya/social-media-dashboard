import { ConfigService } from '@nestjs/config';
import { AiProvider } from './ai.provider';
export declare class OpenAiService implements AiProvider {
    private configService;
    private openai;
    constructor(configService: ConfigService);
    generateScript(prompt: string, context?: any): Promise<string>;
    optimizeContent(content: string, type: 'video' | 'print'): Promise<string>;
    generateCopy(brief: string, tone: string): Promise<string>;
    analyzeSentiment(content: string): Promise<{
        sentiment: string;
        score: number;
    }>;
}
