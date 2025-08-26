"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPrintRenderService = void 0;
const common_1 = require("@nestjs/common");
let MockPrintRenderService = class MockPrintRenderService {
    constructor() {
        this.jobs = new Map();
        this.results = new Map();
    }
    async submitJob(job) {
        this.jobs.set(job.id, job);
        setTimeout(async () => {
            const mockResult = {
                jobId: job.id,
                status: 'completed',
                outputUrl: `https://mock-print-service.com/outputs/${job.id}.pdf`,
                metadata: {
                    exportTime: 5000,
                    fileSize: '2.1MB',
                    format: job.format,
                    pages: 1,
                },
            };
            this.results.set(job.id, mockResult);
        }, 3000);
        return job.id;
    }
    async getJobStatus(jobId) {
        const result = this.results.get(jobId);
        if (!result) {
            const job = this.jobs.get(jobId);
            if (job) {
                return {
                    jobId,
                    status: 'completed',
                    outputUrl: `https://mock-print-service.com/outputs/${jobId}.pdf`,
                    metadata: {
                        exportTime: 5000,
                        fileSize: '2.1MB',
                        format: job.format,
                        pages: 1,
                    },
                };
            }
            throw new Error('Job not found');
        }
        return result;
    }
    async cancelJob(jobId) {
        const job = this.jobs.get(jobId);
        if (job) {
            this.jobs.delete(jobId);
            return true;
        }
        return false;
    }
    async getSupportedFormats() {
        return ['pdf', 'png', 'jpg', 'svg', 'eps'];
    }
    async getEstimatedExportTime(properties) {
        const baseTime = 5000;
        const complexityMultiplier = properties?.complexity || 1;
        const formatMultiplier = properties?.format === 'pdf' ? 1 : 1.5;
        return Math.round(baseTime * complexityMultiplier * formatMultiplier);
    }
};
exports.MockPrintRenderService = MockPrintRenderService;
exports.MockPrintRenderService = MockPrintRenderService = __decorate([
    (0, common_1.Injectable)()
], MockPrintRenderService);
//# sourceMappingURL=mock-print.service.js.map