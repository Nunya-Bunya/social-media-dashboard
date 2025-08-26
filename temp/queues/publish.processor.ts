import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { S3Service } from '../storage/s3.service';

@Processor('publishQueue')
export class PublishProcessor {
  private readonly logger = new Logger(PublishProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  @Process('publish-video')
  async handleVideoPublish(job: Job) {
    const { projectId, publishDto, tenantId } = job.data;

    this.logger.log(`Starting video publish for project ${projectId}`);

    try {
      // Verify project exists and belongs to tenant
      const project = await this.prisma.videoProject.findFirst({
        where: { id: projectId, tenantId },
        include: { variants: true, brand: true },
      });

      if (!project) {
        throw new Error('Video project not found');
      }

      // Update project status to PUBLISHING
      await this.prisma.videoProject.update({
        where: { id: projectId },
        data: { status: 'PUBLISHING' },
      });

      // Create job record
      const jobRecord = await this.prisma.job.create({
        data: {
          id: job.id.toString(),
          type: 'VIDEO_PUBLISH',
          status: 'PROCESSING',
          projectId,
          tenantId,
          metadata: publishDto,
          startedAt: new Date(),
        },
      });

      // Handle different publish destinations
      const publishResults = [];

      if (publishDto.destinations.includes('social')) {
        const socialResult = await this.publishToSocialMedia(project, publishDto);
        publishResults.push({ destination: 'social', ...socialResult });
      }

      if (publishDto.destinations.includes('website')) {
        const websiteResult = await this.publishToWebsite(project, publishDto);
        publishResults.push({ destination: 'website', ...websiteResult });
      }

      if (publishDto.destinations.includes('email')) {
        const emailResult = await this.publishToEmail(project, publishDto);
        publishResults.push({ destination: 'email', ...emailResult });
      }

      // Update project status to PUBLISHED
      await this.prisma.videoProject.update({
        where: { id: projectId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          publishMetadata: publishResults,
        },
      });

      // Update job record
      await this.prisma.job.update({
        where: { id: jobRecord.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          result: { publishResults },
        },
      });

      this.logger.log(`Video publish completed for project ${projectId}`);
      return publishResults;

    } catch (error) {
      this.logger.error(`Video publish failed for project ${projectId}:`, error);

      // Update project status to FAILED
      await this.prisma.videoProject.update({
        where: { id: projectId },
        data: { status: 'FAILED' },
      });

      // Update job record
      await this.prisma.job.update({
        where: { id: job.id.toString() },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          error: error.message,
        },
      });

      throw error;
    }
  }

  @Process('publish-print')
  async handlePrintPublish(job: Job) {
    const { projectId, publishDto, tenantId } = job.data;

    this.logger.log(`Starting print publish for project ${projectId}`);

    try {
      // Verify project exists and belongs to tenant
      const project = await this.prisma.printProject.findFirst({
        where: { id: projectId, tenantId },
        include: { variants: true, brand: true },
      });

      if (!project) {
        throw new Error('Print project not found');
      }

      // Update project status to PUBLISHING
      await this.prisma.printProject.update({
        where: { id: projectId },
        data: { status: 'PUBLISHING' },
      });

      // Create job record
      const jobRecord = await this.prisma.job.create({
        data: {
          id: job.id.toString(),
          type: 'PRINT_PUBLISH',
          status: 'PROCESSING',
          projectId,
          tenantId,
          metadata: publishDto,
          startedAt: new Date(),
        },
      });

      // Handle different publish destinations
      const publishResults = [];

      if (publishDto.destinations.includes('social')) {
        const socialResult = await this.publishToSocialMedia(project, publishDto);
        publishResults.push({ destination: 'social', ...socialResult });
      }

      if (publishDto.destinations.includes('website')) {
        const websiteResult = await this.publishToWebsite(project, publishDto);
        publishResults.push({ destination: 'website', ...websiteResult });
      }

      if (publishDto.destinations.includes('email')) {
        const emailResult = await this.publishToEmail(project, publishDto);
        publishResults.push({ destination: 'email', ...emailResult });
      }

      // Update project status to PUBLISHED
      await this.prisma.printProject.update({
        where: { id: projectId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          publishMetadata: publishResults,
        },
      });

      // Update job record
      await this.prisma.job.update({
        where: { id: jobRecord.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          result: { publishResults },
        },
      });

      this.logger.log(`Print publish completed for project ${projectId}`);
      return publishResults;

    } catch (error) {
      this.logger.error(`Print publish failed for project ${projectId}:`, error);

      // Update project status to FAILED
      await this.prisma.printProject.update({
        where: { id: projectId },
        data: { status: 'FAILED' },
      });

      // Update job record
      await this.prisma.job.update({
        where: { id: job.id.toString() },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          error: error.message,
        },
      });

      throw error;
    }
  }

  @Process('schedule-publish')
  async handleScheduledPublish(job: Job) {
    const { scheduleId, tenantId } = job.data;

    this.logger.log(`Processing scheduled publish for schedule ${scheduleId}`);

    try {
      // Get schedule details
      const schedule = await this.prisma.schedule.findFirst({
        where: { id: scheduleId, tenantId },
        include: { project: true },
      });

      if (!schedule) {
        throw new Error('Schedule not found');
      }

      // Check if it's time to publish
      const now = new Date();
      if (schedule.scheduledAt > now) {
        // Reschedule for later
        await this.reschedulePublish(scheduleId, schedule.scheduledAt);
        return;
      }

      // Create publish job based on project type
      if (schedule.projectType === 'VIDEO') {
        await this.prisma.job.create({
          data: {
            type: 'VIDEO_PUBLISH',
            status: 'PENDING',
            projectId: schedule.projectId,
            tenantId,
            metadata: schedule.publishMetadata,
            scheduledAt: schedule.scheduledAt,
          },
        });
      } else if (schedule.projectType === 'PRINT') {
        await this.prisma.job.create({
          data: {
            type: 'PRINT_PUBLISH',
            status: 'PENDING',
            projectId: schedule.projectId,
            tenantId,
            metadata: schedule.publishMetadata,
            scheduledAt: schedule.scheduledAt,
          },
        });
      }

      // Update schedule status
      await this.prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          status: 'EXECUTED',
          executedAt: new Date(),
        },
      });

      this.logger.log(`Scheduled publish executed for schedule ${scheduleId}`);

    } catch (error) {
      this.logger.error(`Scheduled publish failed for schedule ${scheduleId}:`, error);
      throw error;
    }
  }

  private async publishToSocialMedia(project: any, publishDto: any) {
    // Mock social media publishing
    // In real implementation, this would integrate with social media APIs
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: 'Published to social media successfully',
      timestamp: new Date(),
    };
  }

  private async publishToWebsite(project: any, publishDto: any) {
    // Mock website publishing
    // In real implementation, this would update the website CMS
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Published to website successfully',
      timestamp: new Date(),
    };
  }

  private async publishToEmail(project: any, publishDto: any) {
    // Mock email publishing
    // In real implementation, this would send email campaigns
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Email campaign sent successfully',
      timestamp: new Date(),
    };
  }

  private async reschedulePublish(scheduleId: string, scheduledAt: Date) {
    // Reschedule the job for later
    const delay = scheduledAt.getTime() - Date.now();
    
    // In a real implementation, you might use a different approach
    // like Bull's delay option or a cron job
    setTimeout(async () => {
      // Re-add to queue
      // This is a simplified approach - in production you'd use proper scheduling
    }, delay);
  }
}
