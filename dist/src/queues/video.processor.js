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
var VideoRenderProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRenderProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let VideoRenderProcessor = VideoRenderProcessor_1 = class VideoRenderProcessor {
    constructor(videoRenderProvider, prisma) {
        this.videoRenderProvider = videoRenderProvider;
        this.prisma = prisma;
        this.logger = new common_1.Logger(VideoRenderProcessor_1.name);
    }
    async handleRender(job) {
        this.logger.log(`Processing video render job ${job.id} for project ${job.data.projectId}`);
        try {
            await this.prisma.videoProject.update({
                where: { id: job.data.projectId },
                data: { status: 'RENDERING' },
            });
            const renderJobId = await this.videoRenderProvider.submitJob({
                id: job.id.toString(),
                ...job.data,
            });
            this.logger.log(`Video render job ${job.id} submitted to provider with ID: ${renderJobId}`);
            await this.prisma.videoVariant.updateMany({
                where: {
                    projectId: job.data.projectId,
                    aspect: job.data.aspect,
                },
                data: { jobId: renderJobId },
            });
            await this.pollForCompletion(renderJobId, job.data.projectId);
        }
        catch (error) {
            this.logger.error(`Failed to process video render job ${job.id}:`, error);
            await this.prisma.videoProject.update({
                where: { id: job.data.projectId },
                data: { status: 'FAILED' },
            });
            throw error;
        }
    }
    async pollForCompletion(renderJobId, projectId) {
        let attempts = 0;
        const maxAttempts = 60;
        while (attempts < maxAttempts) {
            try {
                const result = await this.videoRenderProvider.getJobStatus(renderJobId);
                if (result.status === 'completed') {
                    this.logger.log(`Video render job ${renderJobId} completed successfully`);
                    await this.prisma.videoProject.update({
                        where: { id: projectId },
                        data: { status: 'RENDERED' },
                    });
                    await this.prisma.videoVariant.updateMany({
                        where: { projectId },
                        data: { url: result.outputUrl },
                    });
                    return;
                }
                else if (result.status === 'failed') {
                    throw new Error(result.error || 'Render failed');
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
                attempts++;
            }
            catch (error) {
                this.logger.error(`Error polling video render job ${renderJobId}:`, error);
                throw error;
            }
        }
        throw new Error('Video render job timed out');
    }
};
exports.VideoRenderProcessor = VideoRenderProcessor;
__decorate([
    (0, bull_1.Process)('render'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoRenderProcessor.prototype, "handleRender", null);
exports.VideoRenderProcessor = VideoRenderProcessor = VideoRenderProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('videoRenderQueue'),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], VideoRenderProcessor);
//# sourceMappingURL=video.processor.js.map