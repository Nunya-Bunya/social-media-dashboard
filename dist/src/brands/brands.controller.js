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
exports.BrandsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const brands_service_1 = require("./brands.service");
const brands_dto_1 = require("./dto/brands.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let BrandsController = class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    async createBrand(createBrandDto, req) {
        return this.brandsService.createBrand(createBrandDto, req.user.tenantId);
    }
    async getBrands(pagination, req) {
        return this.brandsService.getBrands(req.user.tenantId, pagination);
    }
    async getBrand(id, req) {
        return this.brandsService.getBrand(id, req.user.tenantId);
    }
    async updateBrand(id, updateBrandDto, req) {
        return this.brandsService.updateBrand(id, updateBrandDto, req.user.tenantId);
    }
    async deleteBrand(id, req) {
        return this.brandsService.deleteBrand(id, req.user.tenantId);
    }
    async getBrandStats(id, req) {
        return this.brandsService.getBrandStats(id, req.user.tenantId);
    }
};
exports.BrandsController = BrandsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new brand' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Brand created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brands_dto_1.CreateBrandDto, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all brands with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brands retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "getBrands", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific brand' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "getBrand", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a brand' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, brands_dto_1.UpdateBrandDto, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a brand' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete brand with associated projects' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "deleteBrand", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get brand statistics' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "getBrandStats", null);
exports.BrandsController = BrandsController = __decorate([
    (0, swagger_1.ApiTags)('brands'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsController);
//# sourceMappingURL=brands.controller.js.map