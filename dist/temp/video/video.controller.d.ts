import { VideoService } from './video.service';
import { VideoAiService } from './video.ai.service';
import { VideoRenderService } from './video.render.service';
import { CreateVideoProjectDto, UpdateVideoProjectDto, CreateVideoVariantDto, RenderVideoDto } from './dto/video.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class VideoController {
    private readonly videoService;
    private readonly videoAiService;
    private readonly videoRenderService;
    constructor(videoService: VideoService, videoAiService: VideoAiService, videoRenderService: VideoRenderService);
    createProject(createDto: CreateVideoProjectDto, req: any): Promise<any>;
    getProjects(pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getProject(id: string, req: any): Promise<any>;
    updateProject(id: string, updateDto: UpdateVideoProjectDto, req: any): Promise<any>;
    deleteProject(id: string, req: any): Promise<void>;
    createVariant(projectId: string, createVariantDto: CreateVideoVariantDto, req: any): Promise<any>;
    renderVideo(projectId: string, renderDto: RenderVideoDto, req: any): Promise<{
        jobId: import("bull").JobId;
        projectId: string;
        status: string;
        message: string;
        estimatedTime: number;
    }>;
    generateScript(projectId: string, body: {
        prompt: string;
        context?: any;
    }, req: any): Promise<{
        script: string;
        projectId: string;
        generatedAt: Date;
    }>;
    optimizeScript(projectId: string, body: {
        content: string;
    }, req: any): Promise<{
        originalContent: string;
        optimizedContent: string;
        projectId: string;
        optimizedAt: Date;
    }>;
}
