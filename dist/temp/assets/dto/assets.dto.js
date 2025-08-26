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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientPortalDto = exports.CreateDeploymentDto = exports.CreateIntegrationDto = exports.UpdateProjectDto = exports.CreateProjectDto = exports.BatchAssetOperationDto = exports.AssetSearchDto = exports.UpdateAssetDto = exports.CreateAssetDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateAssetDto {
}
exports.CreateAssetDto = CreateAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset type', enum: client_1.AssetType }),
    (0, class_validator_1.IsEnum)(client_1.AssetType),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thumbnail URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original file URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "originalUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size in bytes' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image/video dimensions', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAssetDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Video duration in seconds', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'EXIF metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAssetDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Manual tags', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateAssetDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "clientId", void 0);
class UpdateAssetDto {
}
exports.UpdateAssetDto = UpdateAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset status', enum: client_1.AssetStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AssetStatus),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Manual tags', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateAssetDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI-generated tags', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateAssetDto.prototype, "aiTags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quality score', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAssetDto.prototype, "qualityScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssetDto.prototype, "clientId", void 0);
class AssetSearchDto {
}
exports.AssetSearchDto = AssetSearchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search query', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset type filter', enum: client_1.AssetType, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AssetType),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset status filter', enum: client_1.AssetStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AssetStatus),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client ID filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tags filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AssetSearchDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date range start', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date range end', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssetSearchDto.prototype, "dateTo", void 0);
class BatchAssetOperationDto {
}
exports.BatchAssetOperationDto = BatchAssetOperationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset IDs to operate on' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BatchAssetOperationDto.prototype, "assetIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Operation type', enum: ['tag', 'organize', 'deploy', 'archive'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BatchAssetOperationDto.prototype, "operation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Operation data', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BatchAssetOperationDto.prototype, "data", void 0);
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project type', example: 'photography' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project budget', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project deliverables', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProjectDto.prototype, "deliverables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project timeline', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProjectDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "clientId", void 0);
class UpdateProjectDto {
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project status', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project budget', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project deliverables', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProjectDto.prototype, "deliverables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project timeline', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProjectDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "notes", void 0);
class CreateIntegrationDto {
}
exports.CreateIntegrationDto = CreateIntegrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Platform type', enum: client_1.PlatformType }),
    (0, class_validator_1.IsEnum)(client_1.PlatformType),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Integration name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Integration configuration' }),
    __metadata("design:type", Object)
], CreateIntegrationDto.prototype, "config", void 0);
class CreateDeploymentDto {
}
exports.CreateDeploymentDto = CreateDeploymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Asset ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeploymentDto.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Platform type', enum: client_1.PlatformType }),
    (0, class_validator_1.IsEnum)(client_1.PlatformType),
    __metadata("design:type", String)
], CreateDeploymentDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scheduled date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDeploymentDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Post caption', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeploymentDto.prototype, "caption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hashtags', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateDeploymentDto.prototype, "hashtags", void 0);
class CreateClientPortalDto {
}
exports.CreateClientPortalDto = CreateClientPortalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Portal name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientPortalDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Portal description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientPortalDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Expiration date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClientPortalDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Portal settings', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateClientPortalDto.prototype, "settings", void 0);
//# sourceMappingURL=assets.dto.js.map