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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintAiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let PrintAiService = class PrintAiService {
    constructor(prisma, aiProvider) {
        this.prisma = prisma;
        this.aiProvider = aiProvider;
    }
    async generateContent(projectId, prompt, context, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
            include: { brand: true, template: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        const aiContext = {
            brand: project.brand,
            template: project.template,
            project: {
                title: project.title,
                description: project.description,
                targetAudience: project.targetAudience,
                callToAction: project.callToAction,
                format: project.format,
                dimensions: project.dimensions,
            },
            userPrompt: prompt,
            additionalContext: context,
        };
        const content = await this.aiProvider.generateCopy(aiContext);
        await this.prisma.printProject.update({
            where: { id: projectId },
            data: { content },
        });
        return {
            content,
            projectId,
            generatedAt: new Date(),
        };
    }
    async optimizeContent(projectId, content, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
            include: { brand: true, template: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        const optimizationContext = {
            originalContent: content,
            brand: project.brand,
            targetAudience: project.targetAudience,
            callToAction: project.callToAction,
            format: project.format,
            dimensions: project.dimensions,
        };
        const optimizedContent = await this.aiProvider.optimizeContent(optimizationContext);
        await this.prisma.printProject.update({
            where: { id: projectId },
            data: { content: optimizedContent },
        });
        return {
            originalContent: content,
            optimizedContent,
            projectId,
            optimizedAt: new Date(),
        };
    }
    async generateCopy(projectId, type, context, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
            include: { brand: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        const copyContext = {
            type,
            brand: project.brand,
            project: {
                title: project.title,
                description: project.description,
                targetAudience: project.targetAudience,
                format: project.format,
                dimensions: project.dimensions,
            },
            additionalContext: context,
        };
        const generatedCopy = await this.aiProvider.generateCopy(copyContext);
        const updateData = {};
        updateData[type] = generatedCopy;
        await this.prisma.printProject.update({
            where: { id: projectId },
            data: updateData,
        });
        return {
            type,
            generatedCopy,
            projectId,
            generatedAt: new Date(),
        };
    }
    async analyzeSentiment(projectId, content, tenantId) {
        const project = await this.prisma.printProject.findFirst({
            where: { id: projectId, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Print project not found');
        }
        const sentiment = await this.aiProvider.analyzeSentiment(content);
        return {
            content,
            sentiment,
            projectId,
            analyzedAt: new Date(),
        };
    }
};
exports.PrintAiService = PrintAiService;
exports.PrintAiService = PrintAiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, Object])
], PrintAiService);
//# sourceMappingURL=print.ai.service.js.map