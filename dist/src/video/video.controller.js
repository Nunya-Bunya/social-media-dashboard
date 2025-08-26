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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const video_service_1 = require("./video.service");
const video_ai_service_1 = require("./video.ai.service");
const video_render_service_1 = require("./video.render.service");
const video_dto_1 = require("./dto/video.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let VideoController = class VideoController {
    constructor(videoService, videoAiService, videoRenderService) {
        this.videoService = videoService;
        this.videoAiService = videoAiService;
        this.videoRenderService = videoRenderService;
    }
    async createProject(createDto, req) {
        return this.videoService.createProject(createDto, req.user.tenantId);
    }
    async getProjects(pagination, req) {
        return this.videoService.getProjects(req.user.tenantId, pagination);
    }
    async getProject(id, req) {
        return this.videoService.getProject(id, req.user.tenantId);
    }
    async updateProject(id, updateDto, req) {
        return this.videoService.updateProject(id, updateDto, req.user.tenantId);
    }
    async deleteProject(id, req) {
        return this.videoService.deleteProject(id, req.user.tenantId);
    }
    async createVariant(projectId, createVariantDto, req) {
        return this.videoService.createVariant(projectId, createVariantDto.aspect, req.user.tenantId);
    }
    async renderVideo(projectId, renderDto, req) {
        return this.videoRenderService.startRender(projectId, renderDto, req.user.tenantId);
    }
    async generateScript(projectId, body, req) {
        return this.videoAiService.generateScript(projectId, body.prompt, body.context, req.user.tenantId);
    }
    async optimizeScript(projectId, body, req) {
        return this.videoAiService.optimizeScript(projectId, body.content, req.user.tenantId);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Post)('projects'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video project created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.CreateVideoProjectDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)('projects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all video projects with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video projects retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific video project' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video project retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getProject", null);
__decorate([
    (0, common_1.Put)('projects/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a video project' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video project updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, video_dto_1.UpdateVideoProjectDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)('projects/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a video project' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video project deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Post)('projects/:id/variants'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video variant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video variant created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, video_dto_1.CreateVideoVariantDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "createVariant", null);
__decorate([
    (0, common_1.Post)('projects/:id/render'),
    (0, swagger_1.ApiOperation)({ summary: 'Start video rendering' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video rendering started successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, video_dto_1.RenderVideoDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "renderVideo", null);
__decorate([
    (0, common_1.Post)('projects/:id/generate-script'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate video script using AI' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Script generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "generateScript", null);
__decorate([
    (0, common_1.Post)('projects/:id/optimize-script'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimize video script using AI' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Video project ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Script optimized successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Video project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "optimizeScript", null);
exports.VideoController = VideoController = __decorate([
    (0, swagger_1.ApiTags)('video'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [video_service_1.VideoService,
        video_ai_service_1.VideoAiService,
        video_render_service_1.VideoRenderService])
], VideoController);
//# sourceMappingURL=video.controller.js.map