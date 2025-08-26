import { VideoRenderProvider, VideoRenderJob, VideoRenderResult } from './video.provider';
export declare class MockVideoRenderService implements VideoRenderProvider {
    private jobs;
    private results;
    submitJob(job: VideoRenderJob): Promise<string>;
    getJobStatus(jobId: string): Promise<VideoRenderResult>;
    cancelJob(jobId: string): Promise<boolean>;
    getSupportedFormats(): Promise<string[]>;
    getEstimatedRenderTime(properties: any): Promise<number>;
}
