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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncAnalyticsDto = exports.AnalyticsOverviewDto = exports.UpdateIntegrationDto = exports.CreateIntegrationDto = exports.UpdateSalesFunnelDto = exports.CreateSalesFunnelDto = exports.UpdateSplitTestDto = exports.CreateSplitTestDto = exports.TrackAdAnalyticsDto = exports.UpdateAdCreativeDto = exports.CreateAdCreativeDto = exports.UpdateAdCampaignDto = exports.CreateAdCampaignDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateAdCampaignDto {
}
exports.CreateAdCampaignDto = CreateAdCampaignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ad platform', enum: client_1.AdPlatform }),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_a = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _a : Object)
], CreateAdCampaignDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ad type', enum: client_1.AdType }),
    (0, class_validator_1.IsEnum)(client_1.AdType),
    __metadata("design:type", typeof (_b = typeof client_1.AdType !== "undefined" && client_1.AdType) === "function" ? _b : Object)
], CreateAdCampaignDto.prototype, "adType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Campaign budget' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Daily budget limit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdCampaignDto.prototype, "dailyBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Targeting options' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAdCampaignDto.prototype, "targeting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Client ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign start date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAdCampaignDto.prototype, "endDate", void 0);
class UpdateAdCampaignDto {
}
exports.UpdateAdCampaignDto = UpdateAdCampaignDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdCampaignDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad platform', enum: client_1.AdPlatform }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_c = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _c : Object)
], UpdateAdCampaignDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad type', enum: client_1.AdType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AdType),
    __metadata("design:type", typeof (_d = typeof client_1.AdType !== "undefined" && client_1.AdType) === "function" ? _d : Object)
], UpdateAdCampaignDto.prototype, "adType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign status', enum: client_1.AdStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AdStatus),
    __metadata("design:type", typeof (_e = typeof client_1.AdStatus !== "undefined" && client_1.AdStatus) === "function" ? _e : Object)
], UpdateAdCampaignDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign budget' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAdCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Daily budget limit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAdCampaignDto.prototype, "dailyBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Targeting options' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateAdCampaignDto.prototype, "targeting", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign start date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAdCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAdCampaignDto.prototype, "endDate", void 0);
class CreateAdCreativeDto {
}
exports.CreateAdCreativeDto = CreateAdCreativeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creative name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdCreativeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creative type', enum: client_1.CreativeType }),
    (0, class_validator_1.IsEnum)(client_1.CreativeType),
    __metadata("design:type", typeof (_f = typeof client_1.CreativeType !== "undefined" && client_1.CreativeType) === "function" ? _f : Object)
], CreateAdCreativeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ad platform', enum: client_1.AdPlatform }),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_g = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _g : Object)
], CreateAdCreativeDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad campaign ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAdCreativeDto.prototype, "adCampaignId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAdCreativeDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Media URL' }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateAdCreativeDto.prototype, "mediaUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thumbnail URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateAdCreativeDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad copy content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAdCreativeDto.prototype, "adCopy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Media dimensions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAdCreativeDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'File size in bytes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdCreativeDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Video duration in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdCreativeDto.prototype, "duration", void 0);
class UpdateAdCreativeDto {
}
exports.UpdateAdCreativeDto = UpdateAdCreativeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Creative name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdCreativeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Creative type', enum: client_1.CreativeType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CreativeType),
    __metadata("design:type", typeof (_h = typeof client_1.CreativeType !== "undefined" && client_1.CreativeType) === "function" ? _h : Object)
], UpdateAdCreativeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad platform', enum: client_1.AdPlatform }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_j = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _j : Object)
], UpdateAdCreativeDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Media URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateAdCreativeDto.prototype, "mediaUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thumbnail URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateAdCreativeDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ad copy content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateAdCreativeDto.prototype, "adCopy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Media dimensions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateAdCreativeDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'File size in bytes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAdCreativeDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Video duration in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAdCreativeDto.prototype, "duration", void 0);
class TrackAdAnalyticsDto {
}
exports.TrackAdAnalyticsDto = TrackAdAnalyticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of analytics' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TrackAdAnalyticsDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of impressions' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "impressions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of clicks' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "clicks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of conversions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "conversions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount spent' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "spend", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Revenue generated' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Click-through rate' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "ctr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cost per click' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "cpc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cost per acquisition' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "cpa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Return on investment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "roi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reach count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "reach", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Frequency' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Quality score' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackAdAnalyticsDto.prototype, "qualityScore", void 0);
class CreateSplitTestDto {
}
exports.CreateSplitTestDto = CreateSplitTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Test name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSplitTestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSplitTestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ad campaign ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSplitTestDto.prototype, "adCampaignId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Variant A configuration' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSplitTestDto.prototype, "variantA", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Variant B configuration' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSplitTestDto.prototype, "variantB", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Test start date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSplitTestDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSplitTestDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required sample size' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSplitTestDto.prototype, "sampleSize", void 0);
class UpdateSplitTestDto {
}
exports.UpdateSplitTestDto = UpdateSplitTestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSplitTestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSplitTestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test status', enum: client_1.TestStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TestStatus),
    __metadata("design:type", typeof (_k = typeof client_1.TestStatus !== "undefined" && client_1.TestStatus) === "function" ? _k : Object)
], UpdateSplitTestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Variant A configuration' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSplitTestDto.prototype, "variantA", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Variant B configuration' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSplitTestDto.prototype, "variantB", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Test end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSplitTestDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Winning variant', enum: client_1.TestVariant }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TestVariant),
    __metadata("design:type", typeof (_l = typeof client_1.TestVariant !== "undefined" && client_1.TestVariant) === "function" ? _l : Object)
], UpdateSplitTestDto.prototype, "winner", void 0);
class CreateSalesFunnelDto {
}
exports.CreateSalesFunnelDto = CreateSalesFunnelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Funnel name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSalesFunnelDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Funnel description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSalesFunnelDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Client ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSalesFunnelDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Funnel steps configuration' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSalesFunnelDto.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conversion rates data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSalesFunnelDto.prototype, "conversionRates", void 0);
class UpdateSalesFunnelDto {
}
exports.UpdateSalesFunnelDto = UpdateSalesFunnelDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Funnel name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSalesFunnelDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Funnel description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSalesFunnelDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Funnel status', enum: client_1.FunnelStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.FunnelStatus),
    __metadata("design:type", typeof (_m = typeof client_1.FunnelStatus !== "undefined" && client_1.FunnelStatus) === "function" ? _m : Object)
], UpdateSalesFunnelDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Funnel steps configuration' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSalesFunnelDto.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conversion rates data' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSalesFunnelDto.prototype, "conversionRates", void 0);
class CreateIntegrationDto {
}
exports.CreateIntegrationDto = CreateIntegrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Platform name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Integration name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'API key' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "apiKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'API secret' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "apiSecret", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Access token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Refresh token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIntegrationDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Integration settings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateIntegrationDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether integration is active', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateIntegrationDto.prototype, "isActive", void 0);
class UpdateIntegrationDto {
}
exports.UpdateIntegrationDto = UpdateIntegrationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Integration name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIntegrationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'API key' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIntegrationDto.prototype, "apiKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'API secret' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIntegrationDto.prototype, "apiSecret", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Access token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIntegrationDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Refresh token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIntegrationDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Integration settings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateIntegrationDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether integration is active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateIntegrationDto.prototype, "isActive", void 0);
class AnalyticsOverviewDto {
}
exports.AnalyticsOverviewDto = AnalyticsOverviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date range start' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AnalyticsOverviewDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date range end' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AnalyticsOverviewDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Platform filter' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_o = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _o : Object)
], AnalyticsOverviewDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Client ID filter' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AnalyticsOverviewDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Brand ID filter' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AnalyticsOverviewDto.prototype, "brandId", void 0);
class SyncAnalyticsDto {
}
exports.SyncAnalyticsDto = SyncAnalyticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Platform to sync' }),
    (0, class_validator_1.IsEnum)(client_1.AdPlatform),
    __metadata("design:type", typeof (_p = typeof client_1.AdPlatform !== "undefined" && client_1.AdPlatform) === "function" ? _p : Object)
], SyncAnalyticsDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Campaign ID to sync' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SyncAnalyticsDto.prototype, "campaignId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date range start' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SyncAnalyticsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date range end' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SyncAnalyticsDto.prototype, "endDate", void 0);
//# sourceMappingURL=ad-campaigns.dto.js.map