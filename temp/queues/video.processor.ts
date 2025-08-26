import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { VideoRenderProvider } from '../vendor/render/video.provider';
import { PrismaService } from '../common/prisma.service';

export interface VideoRenderJobData {
  projectId: string;
  aspect: string;
  script: string;
  properties: any;
  outputFormat: string;
}

@Injectable()
@Processor('videoRenderQueue')
export class VideoRenderProcessor {
  private readonly logger = new Logger(VideoRenderProcessor.name);

  constructor(
    private readonly videoRenderProvider: VideoRenderProvider,
    private readonly prisma: PrismaService,
  ) {}

  @Process('render')
  async handleRender(job: Job<VideoRenderJobData>) {
    this.logger.log(`Processing video render job ${job.id} for project ${job.data.projectId}`);

    try {
      // Update project status to rendering
      await this.prisma.videoProject.update({
        where: { id: job.data.projectId },
        data: { status: 'RENDERING' },
      });

      // Submit to render provider
      const renderJobId = await this.videoRenderProvider.submitJob({
        id: job.id.toString(),
        ...job.data,
      });

      this.logger.log(`Video render job ${job.id} submitted to provider with ID: ${renderJobId}`);

      // Update variant with job ID
      await this.prisma.videoVariant.updateMany({
        where: {
          projectId: job.data.projectId,
          aspect: job.data.aspect as any,
        },
        data: { jobId: renderJobId },
      });

      // Poll for completion (in production, you'd use webhooks or pub/sub)
      await this.pollForCompletion(renderJobId, job.data.projectId);

    } catch (error) {
      this.logger.error(`Failed to process video render job ${job.id}:`, error);
      
      // Update project status to failed
      await this.prisma.videoProject.update({
        where: { id: job.data.projectId },
        data: { status: 'FAILED' },
      });

      throw error;
    }
  }

  private async pollForCompletion(renderJobId: string, projectId: string) {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5-second intervals

    while (attempts < maxAttempts) {
      try {
        const result = await this.videoRenderProvider.getJobStatus(renderJobId);
        
        if (result.status === 'completed') {
          this.logger.log(`Video render job ${renderJobId} completed successfully`);
          
          // Update project status to rendered
          await this.prisma.videoProject.update({
            where: { id: projectId },
            data: { status: 'RENDERED' },
          });

          // Update variant with output URL
          await this.prisma.videoVariant.updateMany({
            where: { projectId },
            data: { url: result.outputUrl },
          });

          return;
        } else if (result.status === 'failed') {
          throw new Error(result.error || 'Render failed');
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;

      } catch (error) {
        this.logger.error(`Error polling video render job ${renderJobId}:`, error);
        throw error;
      }
    }

    throw new Error('Video render job timed out');
  }
}
