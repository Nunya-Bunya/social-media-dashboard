"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let OpenAiService = class OpenAiService {
    constructor(configService) {
        this.configService = configService;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }
    async generateScript(prompt, context) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a creative scriptwriter specializing in video and marketing content.',
                    },
                    {
                        role: 'user',
                        content: `Generate a script based on: ${prompt}${context ? `\nContext: ${JSON.stringify(context)}` : ''}`,
                    },
                ],
                max_tokens: 1000,
                temperature: 0.7,
            });
            return completion.choices[0]?.message?.content || 'Failed to generate script';
        }
        catch (error) {
            console.error('OpenAI script generation error:', error);
            throw new Error('Failed to generate script');
        }
    }
    async optimizeContent(content, type) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are a content optimization expert specializing in ${type} content.`,
                    },
                    {
                        role: 'user',
                        content: `Optimize this ${type} content for better engagement:\n\n${content}`,
                    },
                ],
                max_tokens: 800,
                temperature: 0.5,
            });
            return completion.choices[0]?.message?.content || 'Failed to optimize content';
        }
        catch (error) {
            console.error('OpenAI content optimization error:', error);
            throw new Error('Failed to optimize content');
        }
    }
    async generateCopy(brief, tone) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are a copywriter specializing in marketing copy with a ${tone} tone.`,
                    },
                    {
                        role: 'user',
                        content: `Generate marketing copy based on this brief: ${brief}`,
                    },
                ],
                max_tokens: 600,
                temperature: 0.7,
            });
            return completion.choices[0]?.message?.content || 'Failed to generate copy';
        }
        catch (error) {
            console.error('OpenAI copy generation error:', error);
            throw new Error('Failed to generate copy');
        }
    }
    async analyzeSentiment(content) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sentiment analysis expert. Analyze the sentiment and provide a score from -1 to 1.',
                    },
                    {
                        role: 'user',
                        content: `Analyze the sentiment of this content: ${content}`,
                    },
                ],
                max_tokens: 200,
                temperature: 0.3,
            });
            const response = completion.choices[0]?.message?.content || '';
            const sentiment = response.toLowerCase().includes('positive') ? 'positive' :
                response.toLowerCase().includes('negative') ? 'negative' : 'neutral';
            const score = sentiment === 'positive' ? 0.8 : sentiment === 'negative' ? -0.8 : 0;
            return { sentiment, score };
        }
        catch (error) {
            console.error('OpenAI sentiment analysis error:', error);
            throw new Error('Failed to analyze sentiment');
        }
    }
};
exports.OpenAiService = OpenAiService;
exports.OpenAiService = OpenAiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAiService);
//# sourceMappingURL=openai.service.js.map