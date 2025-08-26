import { Injectable } from '@nestjs/common';
import { PrintRenderProvider, PrintRenderJob, PrintRenderResult } from './print.provider';

@Injectable()
export class MockPrintRenderService implements PrintRenderProvider {
  private jobs = new Map<string, PrintRenderJob>();
  private results = new Map<string, PrintRenderResult>();

  async submitJob(job: PrintRenderJob): Promise<string> {
    this.jobs.set(job.id, job);
    
    // Simulate async processing
    setTimeout(async () => {
      const mockResult: PrintRenderResult = {
        jobId: job.id,
        status: 'completed',
        outputUrl: `https://mock-print-service.com/outputs/${job.id}.pdf`,
        metadata: {
          exportTime: 5000, // 5 seconds
          fileSize: '2.1MB',
          format: job.format,
          pages: 1,
        },
      };
      
      this.results.set(job.id, mockResult);
    }, 3000); // Simulate 3 second processing time

    return job.id;
  }

  async getJobStatus(jobId: string): Promise<PrintRenderResult> {
    const result = this.results.get(jobId);
    
    if (!result) {
      const job = this.jobs.get(jobId);
      if (job) {
        return {
          jobId,
          status: 'completed' as const, // Mock always completes
          outputUrl: `https://mock-print-service.com/outputs/${jobId}.pdf`,
          metadata: {
            exportTime: 5000,
            fileSize: '2.1MB',
            format: job.format,
            pages: 1,
          },
        };
      }
      
      throw new Error('Job not found');
    }
    
    return result;
  }

  async cancelJob(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (job) {
      this.jobs.delete(jobId);
      return true;
    }
    return false;
  }

  async getSupportedFormats(): Promise<string[]> {
    return ['pdf', 'png', 'jpg', 'svg', 'eps'];
  }

  async getEstimatedExportTime(properties: any): Promise<number> {
    // Mock estimation based on properties
    const baseTime = 5000; // 5 seconds base
    const complexityMultiplier = properties?.complexity || 1;
    const formatMultiplier = properties?.format === 'pdf' ? 1 : 1.5;
    
    return Math.round(baseTime * complexityMultiplier * formatMultiplier);
  }
}
