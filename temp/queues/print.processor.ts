import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { PrintRenderProvider } from '../vendor/render/print.provider';
import { S3Service } from '../storage/s3.service';

@Processor('printExportQueue')
export class PrintProcessor {
  private readonly logger = new Logger(PrintProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly printRenderProvider: PrintRenderProvider,
    private readonly s3Service: S3Service,
  ) {}

  @Process('export')
  async handleExport(job: Job) {
    const { projectId, exportDto, tenantId, project } = job.data;

    this.logger.log(`Starting print export for project ${projectId}`);

    try {
      // Update project status to EXPORTING
      await this.prisma.printProject.update({
        where: { id: projectId },
        data: { status: 'EXPORTING' },
      });

      // Create job record
      const jobRecord = await this.prisma.job.create({
        data: {
          id: job.id.toString(),
          type: 'PRINT_EXPORT',
          status: 'PROCESSING',
          projectId,
          tenantId,
          metadata: exportDto,
          startedAt: new Date(),
        },
      });

      // Submit export job to print render provider
      const renderJob = await this.printRenderProvider.submitJob({
        id: job.id.toString(),
        projectId,
        format: exportDto.format,
        quality: exportDto.quality,
        dimensions: exportDto.dimensions,
        content: project.content,
        assets: project.assets,
        brand: project.brand,
        metadata: {
          ...exportDto,
          projectId,
          tenantId,
        },
      });

      // Poll for job completion
      let isComplete = false;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes with 5-second intervals

      while (!isComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const status = await this.printRenderProvider.getJobStatus(renderJob.id);
        
        if (status.status === 'COMPLETED') {
          isComplete = true;
          
          // Upload result to S3
          const s3Key = `exports/print/${projectId}/${Date.now()}-${exportDto.format.toLowerCase()}`;
          await this.s3Service.uploadFromUrl(s3Key, status.downloadUrl);
          
          // Update project with export result
          await this.prisma.printProject.update({
            where: { id: projectId },
            data: {
              status: 'EXPORTED',
              exportUrl: s3Key,
              exportedAt: new Date(),
            },
          });

          // Update job record
          await this.prisma.job.update({
            where: { id: jobRecord.id },
            data: {
              status: 'COMPLETED',
              completedAt: new Date(),
              result: {
                s3Key,
                downloadUrl: status.downloadUrl,
                fileSize: status.fileSize,
                format: exportDto.format,
              },
            },
          });

          this.logger.log(`Print export completed for project ${projectId}`);
          
        } else if (status.status === 'FAILED') {
          throw new Error(`Print export failed: ${status.error}`);
        }
        
        attempts++;
      }

      if (!isComplete) {
        throw new Error('Print export timed out');
      }

    } catch (error) {
      this.logger.error(`Print export failed for project ${projectId}:`, error);

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

  @Process('batch-export')
  async handleBatchExport(job: Job) {
    const { projectIds, exportDto, tenantId } = job.data;

    this.logger.log(`Starting batch print export for ${projectIds.length} projects`);

    try {
      // Update all projects to EXPORTING
      await this.prisma.printProject.updateMany({
        where: { id: { in: projectIds }, tenantId },
        data: { status: 'EXPORTING' },
      });

      // Create job records for each project
      const jobRecords = await Promise.all(
        projectIds.map(projectId =>
          this.prisma.job.create({
            data: {
              type: 'PRINT_EXPORT',
              status: 'PENDING',
              projectId,
              tenantId,
              metadata: exportDto,
              batchJobId: job.id.toString(),
            },
          })
        )
      );

      // Process each project individually
      const results = [];
      for (const projectId of projectIds) {
        try {
          const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
            include: { assets: true, brand: true },
          });

          if (!project) {
            results.push({ projectId, status: 'NOT_FOUND' });
            continue;
          }

          // Submit export job
          const renderJob = await this.printRenderProvider.submitJob({
            id: `${job.id}-${projectId}`,
            projectId,
            format: exportDto.format,
            quality: exportDto.quality,
            dimensions: exportDto.dimensions,
            content: project.content,
            assets: project.assets,
            brand: project.brand,
            metadata: { ...exportDto, projectId, tenantId },
          });

          // Wait for completion (simplified for batch processing)
          const status = await this.printRenderProvider.getJobStatus(renderJob.id);
          
          if (status.status === 'COMPLETED') {
            // Upload to S3
            const s3Key = `exports/print/${projectId}/${Date.now()}-${exportDto.format.toLowerCase()}`;
            await this.s3Service.uploadFromUrl(s3Key, status.downloadUrl);
            
            // Update project
            await this.prisma.printProject.update({
              where: { id: projectId },
              data: {
                status: 'EXPORTED',
                exportUrl: s3Key,
                exportedAt: new Date(),
              },
            });

            results.push({ projectId, status: 'COMPLETED', s3Key });
          } else {
            results.push({ projectId, status: 'FAILED', error: status.error });
          }

        } catch (error) {
          results.push({ projectId, status: 'ERROR', error: error.message });
        }
      }

      // Update batch job record
      await this.prisma.job.update({
        where: { id: job.id.toString() },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          result: { results },
        },
      });

      this.logger.log(`Batch print export completed with ${results.length} results`);
      return results;

    } catch (error) {
      this.logger.error('Batch print export failed:', error);

      // Update batch job record
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
}
