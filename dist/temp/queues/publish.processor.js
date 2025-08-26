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
var PublishProcessor_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const s3_service_1 = require("../storage/s3.service");
let PublishProcessor = PublishProcessor_1 = class PublishProcessor {
    constructor(prisma, s3Service) {
        this.prisma = prisma;
        this.s3Service = s3Service;
        this.logger = new common_1.Logger(PublishProcessor_1.name);
    }
    async handleVideoPublish(job) {
        const { projectId, publishDto, tenantId } = job.data;
        this.logger.log(`Starting video publish for project ${projectId}`);
        try {
            const project = await this.prisma.videoProject.findFirst({
                where: { id: projectId, tenantId },
                include: { variants: true, brand: true },
            });
            if (!project) {
                throw new Error('Video project not found');
            }
            await this.prisma.videoProject.update({
                where: { id: projectId },
                data: { status: 'PUBLISHING' },
            });
            const jobRecord = await this.prisma.job.create({
                data: {
                    id: job.id.toString(),
                    type: 'VIDEO_PUBLISH',
                    status: 'PROCESSING',
                    projectId,
                    tenantId,
                    metadata: publishDto,
                    startedAt: new Date(),
                },
            });
            const publishResults = [];
            if (publishDto.destinations.includes('social')) {
                const socialResult = await this.publishToSocialMedia(project, publishDto);
                publishResults.push({ destination: 'social', ...socialResult });
            }
            if (publishDto.destinations.includes('website')) {
                const websiteResult = await this.publishToWebsite(project, publishDto);
                publishResults.push({ destination: 'website', ...websiteResult });
            }
            if (publishDto.destinations.includes('email')) {
                const emailResult = await this.publishToEmail(project, publishDto);
                publishResults.push({ destination: 'email', ...emailResult });
            }
            await this.prisma.videoProject.update({
                where: { id: projectId },
                data: {
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                    publishMetadata: publishResults,
                },
            });
            await this.prisma.job.update({
                where: { id: jobRecord.id },
                data: {
                    status: 'COMPLETED',
                    completedAt: new Date(),
                    result: { publishResults },
                },
            });
            this.logger.log(`Video publish completed for project ${projectId}`);
            return publishResults;
        }
        catch (error) {
            this.logger.error(`Video publish failed for project ${projectId}:`, error);
            await this.prisma.videoProject.update({
                where: { id: projectId },
                data: { status: 'FAILED' },
            });
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
    async handlePrintPublish(job) {
        const { projectId, publishDto, tenantId } = job.data;
        this.logger.log(`Starting print publish for project ${projectId}`);
        try {
            const project = await this.prisma.printProject.findFirst({
                where: { id: projectId, tenantId },
                include: { variants: true, brand: true },
            });
            if (!project) {
                throw new Error('Print project not found');
            }
            await this.prisma.printProject.update({
                where: { id: projectId },
                data: { status: 'PUBLISHING' },
            });
            const jobRecord = await this.prisma.job.create({
                data: {
                    id: job.id.toString(),
                    type: 'PRINT_PUBLISH',
                    status: 'PROCESSING',
                    projectId,
                    tenantId,
                    metadata: publishDto,
                    startedAt: new Date(),
                },
            });
            const publishResults = [];
            if (publishDto.destinations.includes('social')) {
                const socialResult = await this.publishToSocialMedia(project, publishDto);
                publishResults.push({ destination: 'social', ...socialResult });
            }
            if (publishDto.destinations.includes('website')) {
                const websiteResult = await this.publishToWebsite(project, publishDto);
                publishResults.push({ destination: 'website', ...websiteResult });
            }
            if (publishDto.destinations.includes('email')) {
                const emailResult = await this.publishToEmail(project, publishDto);
                publishResults.push({ destination: 'email', ...emailResult });
            }
            await this.prisma.printProject.update({
                where: { id: projectId },
                data: {
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                    publishMetadata: publishResults,
                },
            });
            await this.prisma.job.update({
                where: { id: jobRecord.id },
                data: {
                    status: 'COMPLETED',
                    completedAt: new Date(),
                    result: { publishResults },
                },
            });
            this.logger.log(`Print publish completed for project ${projectId}`);
            return publishResults;
        }
        catch (error) {
            this.logger.error(`Print publish failed for project ${projectId}:`, error);
            await this.prisma.printProject.update({
                where: { id: projectId },
                data: { status: 'FAILED' },
            });
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
    async handleScheduledPublish(job) {
        const { scheduleId, tenantId } = job.data;
        this.logger.log(`Processing scheduled publish for schedule ${scheduleId}`);
        try {
            const schedule = await this.prisma.schedule.findFirst({
                where: { id: scheduleId, tenantId },
                include: { project: true },
            });
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            const now = new Date();
            if (schedule.scheduledAt > now) {
                await this.reschedulePublish(scheduleId, schedule.scheduledAt);
                return;
            }
            if (schedule.projectType === 'VIDEO') {
                await this.prisma.job.create({
                    data: {
                        type: 'VIDEO_PUBLISH',
                        status: 'PENDING',
                        projectId: schedule.projectId,
                        tenantId,
                        metadata: schedule.publishMetadata,
                        scheduledAt: schedule.scheduledAt,
                    },
                });
            }
            else if (schedule.projectType === 'PRINT') {
                await this.prisma.job.create({
                    data: {
                        type: 'PRINT_PUBLISH',
                        status: 'PENDING',
                        projectId: schedule.projectId,
                        tenantId,
                        metadata: schedule.publishMetadata,
                        scheduledAt: schedule.scheduledAt,
                    },
                });
            }
            await this.prisma.schedule.update({
                where: { id: scheduleId },
                data: {
                    status: 'EXECUTED',
                    executedAt: new Date(),
                },
            });
            this.logger.log(`Scheduled publish executed for schedule ${scheduleId}`);
        }
        catch (error) {
            this.logger.error(`Scheduled publish failed for schedule ${scheduleId}:`, error);
            throw error;
        }
    }
    async publishToSocialMedia(project, publishDto) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            success: true,
            message: 'Published to social media successfully',
            timestamp: new Date(),
        };
    }
    async publishToWebsite(project, publishDto) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            success: true,
            message: 'Published to website successfully',
            timestamp: new Date(),
        };
    }
    async publishToEmail(project, publishDto) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            message: 'Email campaign sent successfully',
            timestamp: new Date(),
        };
    }
    async reschedulePublish(scheduleId, scheduledAt) {
        const delay = scheduledAt.getTime() - Date.now();
        setTimeout(async () => {
        }, delay);
    }
};
exports.PublishProcessor = PublishProcessor;
__decorate([
    (0, bull_1.Process)('publish-video'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublishProcessor.prototype, "handleVideoPublish", null);
__decorate([
    (0, bull_1.Process)('publish-print'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublishProcessor.prototype, "handlePrintPublish", null);
__decorate([
    (0, bull_1.Process)('schedule-publish'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublishProcessor.prototype, "handleScheduledPublish", null);
exports.PublishProcessor = PublishProcessor = PublishProcessor_1 = __decorate([
    (0, bull_1.Processor)('publishQueue'),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof s3_service_1.S3Service !== "undefined" && s3_service_1.S3Service) === "function" ? _b : Object])
], PublishProcessor);
//# sourceMappingURL=publish.processor.js.map