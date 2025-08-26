"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRenderService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const prisma_service_1 = require("../common/prisma.service");
let VideoRenderService = class VideoRenderService {
    constructor(prisma, videoRenderProvider, videoRenderQueue) {
        this.prisma = prisma;
        this.videoRenderProvider = videoRenderProvider;
        this.videoRenderQueue = videoRenderQueue;
    }
    async startRender(projectId, renderDto, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, tenantId },
            include: { variants: true, brand: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        if (!project.script) {
            throw new common_1.BadRequestException('Project must have a script before rendering');
        }
        if (project.status === 'RENDERING') {
            throw new common_1.BadRequestException('Project is already being rendered');
        }
        await this.prisma.videoProject.update({
            where: { id: projectId },
            data: { status: 'RENDERING' },
        });
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
    async getRenderStatus(projectId, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, tenantId },
            include: { variants: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        const activeJobs = await this.videoRenderQueue.getActive();
        const projectJob = activeJobs.find(job => job.data.projectId === projectId);
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
    async cancelRender(projectId, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        if (project.status !== 'RENDERING') {
            throw new common_1.BadRequestException('Project is not currently rendering');
        }
        const activeJobs = await this.videoRenderQueue.getActive();
        const projectJob = activeJobs.find(job => job.data.projectId === projectId);
        if (projectJob) {
            await this.videoRenderProvider.cancelJob(projectJob.data.jobId);
            await projectJob.remove();
        }
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
    async getEstimatedRenderTime(renderDto) {
        return this.videoRenderProvider.getEstimatedRenderTime(renderDto);
    }
    async retryRender(projectId, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
        if (project.status !== 'FAILED') {
            throw new common_1.BadRequestException('Project must be in FAILED status to retry');
        }
        const failedJob = await this.prisma.job.findFirst({
            where: {
                projectId,
                type: 'VIDEO_RENDER',
                status: 'FAILED',
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!failedJob) {
            throw new common_1.BadRequestException('No failed render job found');
        }
        const renderDto = {
            format: failedJob.metadata?.format || 'MP4',
            quality: failedJob.metadata?.quality || 'HD',
            aspectRatio: failedJob.metadata?.aspectRatio || '16:9',
        };
        return this.startRender(projectId, renderDto, tenantId);
    }
    async getRenderHistory(projectId, tenantId) {
        const project = await this.prisma.videoProject.findFirst({
            where: { id: projectId, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Video project not found');
        }
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
};
exports.VideoRenderService = VideoRenderService;
exports.VideoRenderService = VideoRenderService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bull_1.InjectQueue)('videoRenderQueue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, Object])
], VideoRenderService);
//# sourceMappingURL=video.render.service.js.map