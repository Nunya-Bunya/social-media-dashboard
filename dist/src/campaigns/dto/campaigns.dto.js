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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignAnalyticsDto = exports.CampaignKpiDto = exports.CampaignTemplateDto = exports.GenerateCampaignDto = exports.UpdateCampaignDto = exports.CreateCampaignDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateCampaignDto {
}
exports.CreateCampaignDto = CreateCampaignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign goal', enum: client_1.CampaignGoal }),
    (0, class_validator_1.IsEnum)(client_1.CampaignGoal),
    __metadata("design:type", typeof (_a = typeof client_1.CampaignGoal !== "undefined" && client_1.CampaignGoal) === "function" ? _a : Object)
], CreateCampaignDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign type', enum: client_1.CampaignType }),
    (0, class_validator_1.IsEnum)(client_1.CampaignType),
    __metadata("design:type", typeof (_b = typeof client_1.CampaignType !== "undefined" && client_1.CampaignType) === "function" ? _b : Object)
], CreateCampaignDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Client ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign start date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign budget' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Target audience data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCampaignDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign content structure' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCampaignDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Asset IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], CreateCampaignDto.prototype, "assetIds", void 0);
class UpdateCampaignDto {
}
exports.UpdateCampaignDto = UpdateCampaignDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign goal', enum: client_1.CampaignGoal }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CampaignGoal),
    __metadata("design:type", typeof (_c = typeof client_1.CampaignGoal !== "undefined" && client_1.CampaignGoal) === "function" ? _c : Object)
], UpdateCampaignDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign type', enum: client_1.CampaignType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CampaignType),
    __metadata("design:type", typeof (_d = typeof client_1.CampaignType !== "undefined" && client_1.CampaignType) === "function" ? _d : Object)
], UpdateCampaignDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign status', enum: client_1.CampaignStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CampaignStatus),
    __metadata("design:type", typeof (_e = typeof client_1.CampaignStatus !== "undefined" && client_1.CampaignStatus) === "function" ? _e : Object)
], UpdateCampaignDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign start date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign budget' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Target audience data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateCampaignDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign content structure' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateCampaignDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Asset IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], UpdateCampaignDto.prototype, "assetIds", void 0);
class GenerateCampaignDto {
}
exports.GenerateCampaignDto = GenerateCampaignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Business type/industry' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target audience/buyer persona' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Primary goal', enum: client_1.CampaignGoal }),
    (0, class_validator_1.IsEnum)(client_1.CampaignGoal),
    __metadata("design:type", typeof (_f = typeof client_1.CampaignGoal !== "undefined" && client_1.CampaignGoal) === "function" ? _f : Object)
], GenerateCampaignDto.prototype, "primaryGoal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional goals' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.CampaignGoal, { each: true }),
    __metadata("design:type", Array)
], GenerateCampaignDto.prototype, "additionalGoals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Budget range', enum: ['LOW', 'MEDIUM', 'HIGH'] }),
    (0, class_validator_1.IsEnum)(['LOW', 'MEDIUM', 'HIGH']),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "budgetRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Preferred platforms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], GenerateCampaignDto.prototype, "preferredPlatforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign timeline' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Existing campaigns or assets' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "existingAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GenerateCampaignDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional context' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], GenerateCampaignDto.prototype, "additionalContext", void 0);
class CampaignTemplateDto {
}
exports.CampaignTemplateDto = CampaignTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign type', enum: client_1.CampaignType }),
    (0, class_validator_1.IsEnum)(client_1.CampaignType),
    __metadata("design:type", typeof (_g = typeof client_1.CampaignType !== "undefined" && client_1.CampaignType) === "function" ? _g : Object)
], CampaignTemplateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign goal', enum: client_1.CampaignGoal }),
    (0, class_validator_1.IsEnum)(client_1.CampaignGoal),
    __metadata("design:type", typeof (_h = typeof client_1.CampaignGoal !== "undefined" && client_1.CampaignGoal) === "function" ? _h : Object)
], CampaignTemplateDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignTemplateDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template structure' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignTemplateDto.prototype, "structure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Default content and copy' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignTemplateDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required assets' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignTemplateDto.prototype, "assets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Platform-specific settings' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignTemplateDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether template is active', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CampaignTemplateDto.prototype, "isActive", void 0);
class CampaignKpiDto {
}
exports.CampaignKpiDto = CampaignKpiDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'KPI metric name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignKpiDto.prototype, "metric", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'KPI value' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignKpiDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Target value' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignKpiDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unit of measurement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignKpiDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of measurement' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CampaignKpiDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data source' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignKpiDto.prototype, "source", void 0);
class CampaignAnalyticsDto {
}
exports.CampaignAnalyticsDto = CampaignAnalyticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of analytics' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CampaignAnalyticsDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Platform name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignAnalyticsDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Impressions count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "impressions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Clicks count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "clicks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conversions count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "conversions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Spend amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "spend", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Revenue amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Click-through rate' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "ctr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cost per click' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "cpc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cost per acquisition' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "cpa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Return on investment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CampaignAnalyticsDto.prototype, "roi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Engagement metrics' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignAnalyticsDto.prototype, "engagement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Demographics data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignAnalyticsDto.prototype, "demographics", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Geographic data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CampaignAnalyticsDto.prototype, "geographic", void 0);
//# sourceMappingURL=campaigns.dto.js.map