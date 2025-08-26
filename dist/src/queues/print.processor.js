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
var PrintProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const s3_service_1 = require("../storage/s3.service");
let PrintProcessor = PrintProcessor_1 = class PrintProcessor {
    constructor(prisma, printRenderProvider, s3Service) {
        this.prisma = prisma;
        this.printRenderProvider = printRenderProvider;
        this.s3Service = s3Service;
        this.logger = new common_1.Logger(PrintProcessor_1.name);
    }
    async handleExport(job) {
        const { projectId, exportDto, tenantId, project } = job.data;
        this.logger.log(`Starting print export for project ${projectId}`);
        try {
            await this.prisma.printProject.update({
                where: { id: projectId },
                data: { status: 'EXPORTING' },
            });
            const jobRecord = await this.prisma.job.create({
                data: {
                    id: job.id.toString(),
                    type: 'PRINT_EXPORT',
                    status: 'PROCESSING',
                    projectId,
                    tenantId,
                    metadata: exportDto,
                    startedAt: new Date(),
                },
            });
            const renderJob = await this.printRenderProvider.submitJob({
                id: job.id.toString(),
                projectId,
                format: exportDto.format,
                quality: exportDto.quality,
                dimensions: exportDto.dimensions,
                content: project.content,
                assets: project.assets,
                brand: project.brand,
                metadata: {
                    ...exportDto,
                    projectId,
                    tenantId,
                },
            });
            let isComplete = false;
            let attempts = 0;
            const maxAttempts = 60;
            while (!isComplete && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                const status = await this.printRenderProvider.getJobStatus(renderJob.id);
                if (status.status === 'COMPLETED') {
                    isComplete = true;
                    const s3Key = `exports/print/${projectId}/${Date.now()}-${exportDto.format.toLowerCase()}`;
                    await this.s3Service.uploadFromUrl(s3Key, status.downloadUrl);
                    await this.prisma.printProject.update({
                        where: { id: projectId },
                        data: {
                            status: 'EXPORTED',
                            exportUrl: s3Key,
                            exportedAt: new Date(),
                        },
                    });
                    await this.prisma.job.update({
                        where: { id: jobRecord.id },
                        data: {
                            status: 'COMPLETED',
                            completedAt: new Date(),
                            result: {
                                s3Key,
                                downloadUrl: status.downloadUrl,
                                fileSize: status.fileSize,
                                format: exportDto.format,
                            },
                        },
                    });
                    this.logger.log(`Print export completed for project ${projectId}`);
                }
                else if (status.status === 'FAILED') {
                    throw new Error(`Print export failed: ${status.error}`);
                }
                attempts++;
            }
            if (!isComplete) {
                throw new Error('Print export timed out');
            }
        }
        catch (error) {
            this.logger.error(`Print export failed for project ${projectId}:`, error);
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
    async handleBatchExport(job) {
        const { projectIds, exportDto, tenantId } = job.data;
        this.logger.log(`Starting batch print export for ${projectIds.length} projects`);
        try {
            await this.prisma.printProject.updateMany({
                where: { id: { in: projectIds }, tenantId },
                data: { status: 'EXPORTING' },
            });
            const jobRecords = await Promise.all(projectIds.map(projectId => this.prisma.job.create({
                data: {
                    type: 'PRINT_EXPORT',
                    status: 'PENDING',
                    projectId,
                    tenantId,
                    metadata: exportDto,
                    batchJobId: job.id.toString(),
                },
            })));
            const results = [];
            for (const projectId of projectIds) {
                try {
                    const project = await this.prisma.printProject.findFirst({
                        where: { id: projectId, tenantId },
                        include: { assets: true, brand: true },
                    });
                    if (!project) {
                        results.push({ projectId, status: 'NOT_FOUND' });
                        continue;
                    }
                    const renderJob = await this.printRenderProvider.submitJob({
                        id: `${job.id}-${projectId}`,
                        projectId,
                        format: exportDto.format,
                        quality: exportDto.quality,
                        dimensions: exportDto.dimensions,
                        content: project.content,
                        assets: project.assets,
                        brand: project.brand,
                        metadata: { ...exportDto, projectId, tenantId },
                    });
                    const status = await this.printRenderProvider.getJobStatus(renderJob.id);
                    if (status.status === 'COMPLETED') {
                        const s3Key = `exports/print/${projectId}/${Date.now()}-${exportDto.format.toLowerCase()}`;
                        await this.s3Service.uploadFromUrl(s3Key, status.downloadUrl);
                        await this.prisma.printProject.update({
                            where: { id: projectId },
                            data: {
                                status: 'EXPORTED',
                                exportUrl: s3Key,
                                exportedAt: new Date(),
                            },
                        });
                        results.push({ projectId, status: 'COMPLETED', s3Key });
                    }
                    else {
                        results.push({ projectId, status: 'FAILED', error: status.error });
                    }
                }
                catch (error) {
                    results.push({ projectId, status: 'ERROR', error: error.message });
                }
            }
            await this.prisma.job.update({
                where: { id: job.id.toString() },
                data: {
                    status: 'COMPLETED',
                    completedAt: new Date(),
                    result: { results },
                },
            });
            this.logger.log(`Batch print export completed with ${results.length} results`);
            return results;
        }
        catch (error) {
            this.logger.error('Batch print export failed:', error);
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
};
exports.PrintProcessor = PrintProcessor;
__decorate([
    (0, bull_1.Process)('export'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrintProcessor.prototype, "handleExport", null);
__decorate([
    (0, bull_1.Process)('batch-export'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrintProcessor.prototype, "handleBatchExport", null);
exports.PrintProcessor = PrintProcessor = PrintProcessor_1 = __decorate([
    (0, bull_1.Processor)('printExportQueue'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, s3_service_1.S3Service])
], PrintProcessor);
//# sourceMappingURL=print.processor.js.map