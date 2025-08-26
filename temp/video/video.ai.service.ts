import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { AiProvider } from '../vendor/ai/ai.provider';

@Injectable()
export class VideoAiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiProvider: AiProvider,
  ) {}

  async generateScript(
    projectId: string,
    prompt: string,
    context: any,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
      include: { brand: true, template: true },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Build context for AI
    const aiContext = {
      brand: project.brand,
      template: project.template,
      project: {
        title: project.title,
        description: project.description,
        targetAudience: project.targetAudience,
        callToAction: project.callToAction,
      },
      userPrompt: prompt,
      additionalContext: context,
    };

    // Generate script using AI provider
    const script = await this.aiProvider.generateScript(aiContext);

    // Update project with generated script
    await this.prisma.videoProject.update({
      where: { id: projectId },
      data: { script },
    });

    return {
      script,
      projectId,
      generatedAt: new Date(),
    };
  }

  async optimizeScript(
    projectId: string,
    content: string,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
      include: { brand: true, template: true },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Build context for optimization
    const optimizationContext = {
      originalContent: content,
      brand: project.brand,
      targetAudience: project.targetAudience,
      callToAction: project.callToAction,
      videoLength: project.duration,
    };

    // Optimize content using AI provider
    const optimizedContent = await this.aiProvider.optimizeContent(optimizationContext);

    // Update project with optimized script
    await this.prisma.videoProject.update({
      where: { id: projectId },
      data: { script: optimizedContent },
    });

    return {
      originalContent: content,
      optimizedContent,
      projectId,
      optimizedAt: new Date(),
    };
  }

  async generateCopy(
    projectId: string,
    type: 'title' | 'description' | 'callToAction',
    context: any,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
      include: { brand: true },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Build context for copy generation
    const copyContext = {
      type,
      brand: project.brand,
      project: {
        title: project.title,
        description: project.description,
        targetAudience: project.targetAudience,
      },
      additionalContext: context,
    };

    // Generate copy using AI provider
    const generatedCopy = await this.aiProvider.generateCopy(copyContext);

    // Update project with generated copy
    const updateData: any = {};
    updateData[type] = generatedCopy;

    await this.prisma.videoProject.update({
      where: { id: projectId },
      data: updateData,
    });

    return {
      type,
      generatedCopy,
      projectId,
      generatedAt: new Date(),
    };
  }

  async analyzeSentiment(
    projectId: string,
    content: string,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Analyze sentiment using AI provider
    const sentiment = await this.aiProvider.analyzeSentiment(content);

    return {
      content,
      sentiment,
      projectId,
      analyzedAt: new Date(),
    };
  }
}
