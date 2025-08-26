export interface VideoRenderJob {
  id: string;
  projectId: string;
  aspect: string;
  script: string;
  properties: any;
  outputFormat: string;
}

export interface VideoRenderResult {
  jobId: string;
  status: 'completed' | 'failed';
  outputUrl?: string;
  error?: string;
  metadata?: any;
}

export interface VideoRenderProvider {
  submitJob(job: VideoRenderJob): Promise<string>;
  getJobStatus(jobId: string): Promise<VideoRenderResult>;
  cancelJob(jobId: string): Promise<boolean>;
  getSupportedFormats(): Promise<string[]>;
  getEstimatedRenderTime(properties: any): Promise<number>;
}
