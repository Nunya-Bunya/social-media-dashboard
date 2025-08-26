"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockVideoRenderService = void 0;
const common_1 = require("@nestjs/common");
let MockVideoRenderService = class MockVideoRenderService {
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
                outputUrl: `https://mock-video-service.com/outputs/${job.id}.mp4`,
                metadata: {
                    renderTime: 30000,
                    fileSize: '15.2MB',
                    resolution: '1920x1080',
                },
            };
            this.results.set(job.id, mockResult);
        }, 5000);
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
                    outputUrl: `https://mock-video-service.com/outputs/${jobId}.mp4`,
                    metadata: {
                        renderTime: 30000,
                        fileSize: '15.2MB',
                        resolution: '1920x1080',
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
        return ['mp4', 'mov', 'avi', 'webm'];
    }
    async getEstimatedRenderTime(properties) {
        const baseTime = 30000;
        const complexityMultiplier = properties?.complexity || 1;
        const resolutionMultiplier = properties?.resolution === '4k' ? 2 : 1;
        return Math.round(baseTime * complexityMultiplier * resolutionMultiplier);
    }
};
exports.MockVideoRenderService = MockVideoRenderService;
exports.MockVideoRenderService = MockVideoRenderService = __decorate([
    (0, common_1.Injectable)()
], MockVideoRenderService);
//# sourceMappingURL=mock-video.service.js.map