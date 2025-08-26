export interface AiProvider {
  generateScript(prompt: string, context?: any): Promise<string>;
  optimizeContent(content: string, type: 'video' | 'print'): Promise<string>;
  generateCopy(brief: string, tone: string): Promise<string>;
  analyzeSentiment(content: string): Promise<{ sentiment: string; score: number }>;
}
