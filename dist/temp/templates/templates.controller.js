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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const templates_service_1 = require("./templates.service");
const templates_dto_1 = require("./dto/templates.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let TemplatesController = class TemplatesController {
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    async createTemplate(createTemplateDto, req) {
        return this.templatesService.createTemplate(createTemplateDto, req.user.tenantId);
    }
    async getTemplates(pagination, req) {
        return this.templatesService.getTemplates(req.user.tenantId, pagination);
    }
    async getTemplate(id, req) {
        return this.templatesService.getTemplate(id, req.user.tenantId);
    }
    async updateTemplate(id, updateTemplateDto, req) {
        return this.templatesService.updateTemplate(id, updateTemplateDto, req.user.tenantId);
    }
    async deleteTemplate(id, req) {
        return this.templatesService.deleteTemplate(id, req.user.tenantId);
    }
    async duplicateTemplate(id, duplicateData, req) {
        return this.templatesService.duplicateTemplate(id, req.user.tenantId, duplicateData);
    }
    async getTemplateStats(id, req) {
        return this.templatesService.getTemplateStats(id, req.user.tenantId);
    }
};
exports.TemplatesController = TemplatesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new template' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Template created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [templates_dto_1.CreateTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all templates with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['VIDEO', 'PRINT'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Templates retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "getTemplate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, templates_dto_1.UpdateTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete template with associated projects' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, swagger_1.ApiOperation)({ summary: 'Duplicate a template' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Template duplicated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "duplicateTemplate", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get template statistics' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "getTemplateStats", null);
exports.TemplatesController = TemplatesController = __decorate([
    (0, swagger_1.ApiTags)('templates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('templates'),
    __metadata("design:paramtypes", [templates_service_1.TemplatesService])
], TemplatesController);
//# sourceMappingURL=templates.controller.js.map