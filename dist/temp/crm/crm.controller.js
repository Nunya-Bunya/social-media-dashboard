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
exports.CRMController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crm_service_1 = require("./crm.service");
const lead_service_1 = require("./lead.service");
const prisma_service_1 = require("../common/prisma.service");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let CRMController = class CRMController {
    constructor(crmService, leadService, prisma) {
        this.crmService = crmService;
        this.leadService = leadService;
        this.prisma = prisma;
    }
    createLead(createLeadDto, req) {
        return this.leadService.create(createLeadDto, req.user.tenantId);
    }
    findAllLeads(pagination, req) {
        return this.leadService.findAll(pagination, req.user.tenantId);
    }
    findOneLead(id, req) {
        return this.leadService.findOne(id, req.user.tenantId);
    }
    updateLead(id, updateLeadDto, req) {
        return this.leadService.update(id, updateLeadDto, req.user.tenantId);
    }
    removeLead(id, req) {
        return this.leadService.remove(id, req.user.tenantId);
    }
    getDashboard(req) {
        return this.crmService.getDashboard(req.user.tenantId);
    }
    createLeadActivity(id, createActivityDto, req) {
        return this.leadService.createActivity(id, createActivityDto, req.user.tenantId);
    }
    getLeadActivities(id, req) {
        return this.leadService.getActivities(id, req.user.tenantId);
    }
    updateLeadActivity(id, updateActivityDto, req) {
        return this.leadService.updateActivity(id, updateActivityDto, req.user.tenantId);
    }
    removeLeadActivity(id, req) {
        return this.leadService.removeActivity(id, req.user.tenantId);
    }
};
exports.CRMController = CRMController;
__decorate([
    (0, common_1.Post)('leads'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lead' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lead created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "createLead", null);
__decorate([
    (0, common_1.Get)('leads'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all leads with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leads retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "findAllLeads", null);
__decorate([
    (0, common_1.Get)('leads/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lead by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lead found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lead not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "findOneLead", null);
__decorate([
    (0, common_1.Patch)('leads/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lead' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lead updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lead not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "updateLead", null);
__decorate([
    (0, common_1.Delete)('leads/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete lead' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lead deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lead not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "removeLead", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get CRM dashboard data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard data retrieved' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('leads/:id/activities'),
    (0, swagger_1.ApiOperation)({ summary: 'Create lead activity' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Activity created successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "createLeadActivity", null);
__decorate([
    (0, common_1.Get)('leads/:id/activities'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lead activities' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activities retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "getLeadActivities", null);
__decorate([
    (0, common_1.Patch)('activities/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lead activity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activity updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "updateLeadActivity", null);
__decorate([
    (0, common_1.Delete)('activities/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete lead activity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activity deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CRMController.prototype, "removeLeadActivity", null);
exports.CRMController = CRMController = __decorate([
    (0, swagger_1.ApiTags)('crm'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('crm'),
    __metadata("design:paramtypes", [crm_service_1.CRMService,
        lead_service_1.LeadService, typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CRMController);
//# sourceMappingURL=crm.controller.js.map