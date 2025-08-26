import { Job } from 'bull';
import { VideoRenderProvider } from '../vendor/render/video.provider';
import { PrismaService } from '../common/prisma.service';
export interface VideoRenderJobData {
    projectId: string;
    aspect: string;
    script: string;
    properties: any;
    outputFormat: string;
}
export declare class VideoRenderProcessor {
    private readonly videoRenderProvider;
    private readonly prisma;
    private readonly logger;
    constructor(videoRenderProvider: VideoRenderProvider, prisma: PrismaService);
    handleRender(job: Job<VideoRenderJobData>): Promise<void>;
    private pollForCompletion;
}
