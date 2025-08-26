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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemplateDto = exports.CreateTemplateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateTemplateDto {
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template type', enum: client_1.TemplateType }),
    (0, class_validator_1.IsEnum)(client_1.TemplateType),
    __metadata("design:type", typeof (_a = typeof client_1.TemplateType !== "undefined" && client_1.TemplateType) === "function" ? _a : Object)
], CreateTemplateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template metadata' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTemplateDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether template is active', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTemplateDto.prototype, "isActive", void 0);
class UpdateTemplateDto {
}
exports.UpdateTemplateDto = UpdateTemplateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template type', enum: client_1.TemplateType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TemplateType),
    __metadata("design:type", typeof (_b = typeof client_1.TemplateType !== "undefined" && client_1.TemplateType) === "function" ? _b : Object)
], UpdateTemplateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template metadata' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateTemplateDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether template is active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTemplateDto.prototype, "isActive", void 0);
//# sourceMappingURL=templates.dto.js.map