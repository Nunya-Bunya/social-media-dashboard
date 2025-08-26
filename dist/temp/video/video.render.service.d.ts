import { Queue } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { VideoRenderProvider } from '../vendor/render/video.provider';
import { RenderVideoDto } from './dto/video.dto';
export declare class VideoRenderService {
    private readonly prisma;
    private readonly videoRenderProvider;
    private readonly videoRenderQueue;
    constructor(prisma: PrismaService, videoRenderProvider: VideoRenderProvider, videoRenderQueue: Queue);
    startRender(projectId: string, renderDto: RenderVideoDto, tenantId: string): Promise<{
        jobId: import("bull").JobId;
        projectId: string;
        status: string;
        message: string;
        estimatedTime: number;
    }>;
    getRenderStatus(projectId: string, tenantId: string): Promise<{
        projectId: string;
        status: any;
        jobStatus: import("../vendor/render/video.provider").VideoRenderResult;
        progress: any;
        estimatedTimeRemaining: any;
    }>;
    cancelRender(projectId: string, tenantId: string): Promise<{
        projectId: string;
        status: string;
        message: string;
    }>;
    getSupportedFormats(): Promise<string[]>;
    getEstimatedRenderTime(renderDto: RenderVideoDto): Promise<number>;
    retryRender(projectId: string, tenantId: string): Promise<{
        jobId: import("bull").JobId;
        projectId: string;
        status: string;
        message: string;
        estimatedTime: number;
    }>;
    getRenderHistory(projectId: string, tenantId: string): Promise<any>;
}
