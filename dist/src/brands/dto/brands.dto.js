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
exports.UpdateBrandDto = exports.CreateBrandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBrandDto {
}
exports.CreateBrandDto = CreateBrandDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand logo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand website URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Primary brand color (hex)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Secondary brand color (hex)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand tagline' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "tagline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand industry/category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "industry", void 0);
class UpdateBrandDto {
}
exports.UpdateBrandDto = UpdateBrandDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand logo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand website URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Primary brand color (hex)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Secondary brand color (hex)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand tagline' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "tagline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand industry/category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandDto.prototype, "industry", void 0);
//# sourceMappingURL=brands.dto.js.map