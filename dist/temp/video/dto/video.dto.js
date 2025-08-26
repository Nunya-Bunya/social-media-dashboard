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
exports.RenderVideoDto = exports.CreateVideoVariantDto = exports.UpdateVideoProjectDto = exports.CreateVideoProjectDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateVideoProjectDto {
}
exports.CreateVideoProjectDto = CreateVideoProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID for the project' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVideoProjectDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template ID for the project' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVideoProjectDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Video script content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoProjectDto.prototype, "script", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Project properties and settings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateVideoProjectDto.prototype, "properties", void 0);
class UpdateVideoProjectDto {
}
exports.UpdateVideoProjectDto = UpdateVideoProjectDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template ID for the project' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateVideoProjectDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Video script content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVideoProjectDto.prototype, "script", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Project properties and settings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateVideoProjectDto.prototype, "properties", void 0);
class CreateVideoVariantDto {
}
exports.CreateVideoVariantDto = CreateVideoVariantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['_9x16', '_1x1', '_16x9'], description: 'Video aspect ratio' }),
    (0, class_validator_1.IsEnum)(['_9x16', '_1x1', '_16x9']),
    __metadata("design:type", String)
], CreateVideoVariantDto.prototype, "aspect", void 0);
class RenderVideoDto {
}
exports.RenderVideoDto = RenderVideoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Video aspect ratio to render' }),
    (0, class_validator_1.IsEnum)(['_9x16', '_1x1', '_16x9']),
    __metadata("design:type", String)
], RenderVideoDto.prototype, "aspect", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Output format for the video' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RenderVideoDto.prototype, "outputFormat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Render properties and settings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RenderVideoDto.prototype, "properties", void 0);
//# sourceMappingURL=video.dto.js.map