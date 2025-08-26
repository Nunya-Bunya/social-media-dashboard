import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { VideoRenderProvider } from '../vendor/render/video.provider';
import { RenderVideoDto } from './dto/video.dto';

@Injectable()
export class VideoRenderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly videoRenderProvider: VideoRenderProvider,
    @InjectQueue('videoRenderQueue') private readonly videoRenderQueue: Queue,
  ) {}

  async startRender(
    projectId: string,
    renderDto: RenderVideoDto,
    tenantId: string,
  ) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
      include: { variants: true, brand: true },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Validate render request
    if (!project.script) {
      throw new BadRequestException('Project must have a script before rendering');
    }

    // Check if project is already rendering
    if (project.status === 'RENDERING') {
      throw new BadRequestException('Project is already being rendered');
    }

    // Update project status
    await this.prisma.videoProject.update({
      where: { id: projectId },
      data: { status: 'RENDERING' },
    });

    // Create render job
    const job = await this.videoRenderQueue.add('render', {
      projectId,
      renderDto,
      tenantId,
      project: {
        script: project.script,
        duration: project.duration,
        targetAudience: project.targetAudience,
        callToAction: project.callToAction,
        brand: project.brand,
        variants: project.variants,
      },
    });

    return {
      jobId: job.id,
      projectId,
      status: 'RENDERING',
      message: 'Video rendering started',
      estimatedTime: await this.videoRenderProvider.getEstimatedRenderTime(renderDto),
    };
  }

  async getRenderStatus(projectId: string, tenantId: string) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
      include: { variants: true },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Get active render job from queue
    const activeJobs = await this.videoRenderQueue.getActive();
    const projectJob = activeJobs.find(job => 
      job.data.projectId === projectId
    );

    if (projectJob) {
      const jobStatus = await this.videoRenderProvider.getJobStatus(projectJob.data.jobId);
      return {
        projectId,
        status: project.status,
        jobStatus,
        progress: jobStatus.progress || 0,
        estimatedTimeRemaining: jobStatus.estimatedTimeRemaining,
      };
    }

    return {
      projectId,
      status: project.status,
      jobStatus: null,
      progress: 100,
      estimatedTimeRemaining: 0,
    };
  }

  async cancelRender(projectId: string, tenantId: string) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    if (project.status !== 'RENDERING') {
      throw new BadRequestException('Project is not currently rendering');
    }

    // Find and cancel active render job
    const activeJobs = await this.videoRenderQueue.getActive();
    const projectJob = activeJobs.find(job => 
      job.data.projectId === projectId
    );

    if (projectJob) {
      // Cancel job in render provider
      await this.videoRenderProvider.cancelJob(projectJob.data.jobId);
      
      // Remove job from queue
      await projectJob.remove();
    }

    // Update project status
    await this.prisma.videoProject.update({
      where: { id: projectId },
      data: { status: 'DRAFT' },
    });

    return {
      projectId,
      status: 'DRAFT',
      message: 'Video rendering cancelled',
    };
  }

  async getSupportedFormats() {
    return this.videoRenderProvider.getSupportedFormats();
  }

  async getEstimatedRenderTime(renderDto: RenderVideoDto) {
    return this.videoRenderProvider.getEstimatedRenderTime(renderDto);
  }

  async retryRender(projectId: string, tenantId: string) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    if (project.status !== 'FAILED') {
      throw new BadRequestException('Project must be in FAILED status to retry');
    }

    // Get the last failed render attempt
    const failedJob = await this.prisma.job.findFirst({
      where: {
        projectId,
        type: 'VIDEO_RENDER',
        status: 'FAILED',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!failedJob) {
      throw new BadRequestException('No failed render job found');
    }

    // Retry with the same parameters
    const renderDto: RenderVideoDto = {
      format: failedJob.metadata?.format || 'MP4',
      quality: failedJob.metadata?.quality || 'HD',
      aspectRatio: failedJob.metadata?.aspectRatio || '16:9',
    };

    return this.startRender(projectId, renderDto, tenantId);
  }

  async getRenderHistory(projectId: string, tenantId: string) {
    // Verify project exists and belongs to tenant
    const project = await this.prisma.videoProject.findFirst({
      where: { id: projectId, tenantId },
    });

    if (!project) {
      throw new NotFoundException('Video project not found');
    }

    // Get render job history
    const renderJobs = await this.prisma.job.findMany({
      where: {
        projectId,
        type: 'VIDEO_RENDER',
      },
      orderBy: { createdAt: 'desc' },
      include: {
        metadata: true,
      },
    });

    return renderJobs.map(job => ({
      jobId: job.id,
      status: job.status,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      metadata: job.metadata,
      error: job.error,
    }));
  }
}
