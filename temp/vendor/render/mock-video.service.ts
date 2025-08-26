import { Injectable } from '@nestjs/common';
import { VideoRenderProvider, VideoRenderJob, VideoRenderResult } from './video.provider';

@Injectable()
export class MockVideoRenderService implements VideoRenderProvider {
  private jobs = new Map<string, VideoRenderJob>();
  private results = new Map<string, VideoRenderResult>();

  async submitJob(job: VideoRenderJob): Promise<string> {
    this.jobs.set(job.id, job);
    
    // Simulate async processing
    setTimeout(async () => {
      const mockResult: VideoRenderResult = {
        jobId: job.id,
        status: 'completed',
        outputUrl: `https://mock-video-service.com/outputs/${job.id}.mp4`,
        metadata: {
          renderTime: 30000, // 30 seconds
          fileSize: '15.2MB',
          resolution: '1920x1080',
        },
      };
      
      this.results.set(job.id, mockResult);
    }, 5000); // Simulate 5 second processing time

    return job.id;
  }

  async getJobStatus(jobId: string): Promise<VideoRenderResult> {
    const result = this.results.get(jobId);
    
    if (!result) {
      const job = this.jobs.get(jobId);
      if (job) {
        return {
          jobId,
          status: 'completed' as const, // Mock always completes
          outputUrl: `https://mock-video-service.com/outputs/${jobId}.mp4`,
          metadata: {
            renderTime: 30000,
            fileSize: '15.2MB',
            resolution: '1920x1080',
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
    return ['mp4', 'mov', 'avi', 'webm'];
  }

  async getEstimatedRenderTime(properties: any): Promise<number> {
    // Mock estimation based on properties
    const baseTime = 30000; // 30 seconds base
    const complexityMultiplier = properties?.complexity || 1;
    const resolutionMultiplier = properties?.resolution === '4k' ? 2 : 1;
    
    return Math.round(baseTime * complexityMultiplier * resolutionMultiplier);
  }
}
