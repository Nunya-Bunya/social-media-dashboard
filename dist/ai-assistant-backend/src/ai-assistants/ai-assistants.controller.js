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
exports.AIAssistantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ai_assistants_service_1 = require("./ai-assistants.service");
const ai_assistants_dto_1 = require("./dto/ai-assistants.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_guard_1 = require("../common/guards/jwt.guard");
let AIAssistantsController = class AIAssistantsController {
    constructor(aiAssistantsService) {
        this.aiAssistantsService = aiAssistantsService;
    }
    create(createDto, req) {
        return this.aiAssistantsService.createAssistant(createDto, req.user.userId, req.user.tenantId);
    }
    findAll(pagination, req) {
        return this.aiAssistantsService.getAssistants(pagination, req.user.tenantId);
    }
    findOne(id, req) {
        return this.aiAssistantsService.getAssistant(id, req.user.tenantId);
    }
    update(id, updateDto, req) {
        return this.aiAssistantsService.updateAssistant(id, updateDto, req.user.tenantId);
    }
    remove(id, req) {
        return this.aiAssistantsService.deleteAssistant(id, req.user.tenantId);
    }
    createChatSession(createDto, req) {
        return this.aiAssistantsService.createChatSession(createDto, req.user.userId, req.user.tenantId);
    }
    getChatSessions(assistantId, req) {
        return this.aiAssistantsService.getChatSessions(assistantId, req.user.userId, req.user.tenantId);
    }
    getChatSession(id, req) {
        return this.aiAssistantsService.getChatSession(id, req.user.userId, req.user.tenantId);
    }
    sendMessage(sendDto, req) {
        return this.aiAssistantsService.sendMessage(sendDto, req.user.userId, req.user.tenantId);
    }
    createBusinessDocument(createDto, req) {
        return this.aiAssistantsService.createBusinessDocument(createDto, req.user.tenantId);
    }
    getBusinessDocuments(assistantId, req) {
        return this.aiAssistantsService.getBusinessDocuments(assistantId, req.user.tenantId);
    }
    updateBusinessDocument(id, updateDto, req) {
        return this.aiAssistantsService.updateBusinessDocument(id, updateDto, req.user.tenantId);
    }
    deleteBusinessDocument(id, req) {
        return this.aiAssistantsService.deleteBusinessDocument(id, req.user.tenantId);
    }
    createAITask(createDto, req) {
        return this.aiAssistantsService.createAITask(createDto, req.user.userId, req.user.tenantId);
    }
    getAITasks(assistantId, req) {
        return this.aiAssistantsService.getAITasks(assistantId, req.user.userId, req.user.tenantId);
    }
    updateAITask(id, updateDto, req) {
        return this.aiAssistantsService.updateAITask(id, updateDto, req.user.userId, req.user.tenantId);
    }
    deleteAITask(id, req) {
        return this.aiAssistantsService.deleteAITask(id, req.user.userId, req.user.tenantId);
    }
    generateContent(generateDto, req) {
        return this.aiAssistantsService.generateContent(generateDto, req.user.tenantId);
    }
    globalSearch(searchDto, req) {
        return this.aiAssistantsService.globalSearch(searchDto, req.user.tenantId);
    }
};
exports.AIAssistantsController = AIAssistantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new AI Assistant' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'AI Assistant created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand or client not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.CreateAIAssistantDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all AI Assistants with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'AI Assistants retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI Assistant by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'AI Assistant found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update AI Assistant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'AI Assistant updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ai_assistants_dto_1.UpdateAIAssistantDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete AI Assistant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'AI Assistant deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('chat/sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chat session' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Chat session created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.CreateChatSessionDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "createChatSession", null);
__decorate([
    (0, common_1.Get)('chat/sessions/:assistantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat sessions for an assistant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat sessions retrieved' }),
    __param(0, (0, common_1.Param)('assistantId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "getChatSessions", null);
__decorate([
    (0, common_1.Get)('chat/session/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat session by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat session found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat session not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "getChatSession", null);
__decorate([
    (0, common_1.Post)('chat/message'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message in a chat session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat session not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.SendMessageDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('documents'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a business document' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Document created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.CreateBusinessDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "createBusinessDocument", null);
__decorate([
    (0, common_1.Get)('documents/:assistantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get business documents for an assistant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documents retrieved' }),
    __param(0, (0, common_1.Param)('assistantId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "getBusinessDocuments", null);
__decorate([
    (0, common_1.Patch)('documents/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a business document' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ai_assistants_dto_1.UpdateBusinessDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "updateBusinessDocument", null);
__decorate([
    (0, common_1.Delete)('documents/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a business document' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "deleteBusinessDocument", null);
__decorate([
    (0, common_1.Post)('tasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an AI task' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Task created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.CreateAITaskDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "createAITask", null);
__decorate([
    (0, common_1.Get)('tasks/:assistantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI tasks for an assistant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tasks retrieved' }),
    __param(0, (0, common_1.Param)('assistantId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "getAITasks", null);
__decorate([
    (0, common_1.Patch)('tasks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an AI task' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Task updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Task not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ai_assistants_dto_1.UpdateAITaskDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "updateAITask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an AI task' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Task deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Task not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "deleteAITask", null);
__decorate([
    (0, common_1.Post)('content/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate content using AI' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Content generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'AI Assistant not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.GenerateContentDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "generateContent", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Global search across all AI assistants and content' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistants_dto_1.GlobalSearchDto, Object]),
    __metadata("design:returntype", void 0)
], AIAssistantsController.prototype, "globalSearch", null);
exports.AIAssistantsController = AIAssistantsController = __decorate([
    (0, swagger_1.ApiTags)('ai-assistants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ai-assistants'),
    __metadata("design:paramtypes", [ai_assistants_service_1.AIAssistantsService])
], AIAssistantsController);
//# sourceMappingURL=ai-assistants.controller.js.map