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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const assets_service_1 = require("./assets.service");
const assets_dto_1 = require("./dto/assets.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_guard_1 = require("../common/guards/jwt.guard");
let AssetsController = class AssetsController {
    constructor(assetsService) {
        this.assetsService = assetsService;
    }
    create(createAssetDto, req) {
        return this.assetsService.createAsset(createAssetDto, req.user.userId, req.user.tenantId);
    }
    async uploadAsset(file, assetData, req) {
        const createAssetDto = {
            name: assetData.name || file.originalname,
            type: assetData.type,
            fileUrl: `uploads/${file.filename}`,
            fileSize: file.size,
            description: assetData.description,
            projectId: assetData.projectId,
            clientId: assetData.clientId,
            tags: assetData.tags ? JSON.parse(assetData.tags) : [],
        };
        return this.assetsService.createAsset(createAssetDto, req.user.userId, req.user.tenantId);
    }
    findAll(pagination, req) {
        return this.assetsService.getAssets(pagination, req.user.tenantId);
    }
    search(searchDto, req) {
        return this.assetsService.searchAssets(searchDto, req.user.tenantId);
    }
    findOne(id, req) {
        return this.assetsService.getAsset(id, req.user.tenantId);
    }
    getOptimizations(id, req) {
        return this.assetsService.getAssetOptimizations(id, req.user.tenantId);
    }
    generateOptimizations(id, req) {
        return this.assetsService.generateOptimizations(id, req.user.tenantId);
    }
    update(id, updateAssetDto, req) {
        return this.assetsService.updateAsset(id, updateAssetDto, req.user.tenantId);
    }
    remove(id, req) {
        return this.assetsService.deleteAsset(id, req.user.tenantId);
    }
    batchOperation(batchDto, req) {
        return this.assetsService.batchOperation(batchDto, req.user.tenantId);
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new asset' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Asset created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project or client not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assets_dto_1.CreateAssetDto, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload asset file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                name: { type: 'string' },
                type: { type: 'string', enum: ['PHOTO', 'VIDEO', 'AUDIO', 'DOCUMENT', 'GRAPHIC', 'ANIMATION'] },
                description: { type: 'string' },
                projectId: { type: 'string' },
                clientId: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "uploadAsset", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assets with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assets retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search assets with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assets found' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assets_dto_1.AssetSearchDto, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get asset by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asset found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Asset not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/optimizations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get asset optimizations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Optimizations retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "getOptimizations", null);
__decorate([
    (0, common_1.Post)(':id/optimize'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate optimizations for asset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Optimizations generated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "generateOptimizations", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update asset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asset updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Asset not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assets_dto_1.UpdateAssetDto, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive asset (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asset archived successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Asset not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Perform batch operations on assets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch operation completed' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assets_dto_1.BatchAssetOperationDto, Object]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "batchOperation", null);
exports.AssetsController = AssetsController = __decorate([
    (0, swagger_1.ApiTags)('assets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [assets_service_1.AssetsService])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map