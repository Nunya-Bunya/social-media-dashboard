import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from './ai.provider';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService implements AiProvider {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateScript(prompt: string, context?: any): Promise<string> {
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
    } catch (error) {
      console.error('OpenAI script generation error:', error);
      throw new Error('Failed to generate script');
    }
  }

  async optimizeContent(content: string, type: 'video' | 'print'): Promise<string> {
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
    } catch (error) {
      console.error('OpenAI content optimization error:', error);
      throw new Error('Failed to optimize content');
    }
  }

  async generateCopy(brief: string, tone: string): Promise<string> {
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
    } catch (error) {
      console.error('OpenAI copy generation error:', error);
      throw new Error('Failed to generate copy');
    }
  }

  async analyzeSentiment(content: string): Promise<{ sentiment: string; score: number }> {
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
      
      // Simple sentiment parsing (in production, you'd want more robust parsing)
      const sentiment = response.toLowerCase().includes('positive') ? 'positive' : 
                       response.toLowerCase().includes('negative') ? 'negative' : 'neutral';
      
      const score = sentiment === 'positive' ? 0.8 : sentiment === 'negative' ? -0.8 : 0;

      return { sentiment, score };
    } catch (error) {
      console.error('OpenAI sentiment analysis error:', error);
      throw new Error('Failed to analyze sentiment');
    }
  }
}
