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
exports.GlobalSearchDto = exports.GenerateContentDto = exports.UpdateAITaskDto = exports.CreateAITaskDto = exports.UpdateBusinessDocumentDto = exports.CreateBusinessDocumentDto = exports.SendMessageDto = exports.CreateChatSessionDto = exports.UpdateAIAssistantDto = exports.CreateAIAssistantDto = exports.ContentType = exports.TaskPriority = exports.TaskStatus = exports.ChatMessageRole = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ChatMessageRole;
(function (ChatMessageRole) {
    ChatMessageRole["USER"] = "USER";
    ChatMessageRole["ASSISTANT"] = "ASSISTANT";
    ChatMessageRole["SYSTEM"] = "SYSTEM";
})(ChatMessageRole || (exports.ChatMessageRole = ChatMessageRole = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["COMPLETED"] = "COMPLETED";
    TaskStatus["CANCELLED"] = "CANCELLED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "LOW";
    TaskPriority["MEDIUM"] = "MEDIUM";
    TaskPriority["HIGH"] = "HIGH";
    TaskPriority["URGENT"] = "URGENT";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
var ContentType;
(function (ContentType) {
    ContentType["SOCIAL_POST"] = "SOCIAL_POST";
    ContentType["BLOG_POST"] = "BLOG_POST";
    ContentType["AD_COPY"] = "AD_COPY";
    ContentType["EMAIL"] = "EMAIL";
    ContentType["WEBSITE_CONTENT"] = "WEBSITE_CONTENT";
    ContentType["PRESS_RELEASE"] = "PRESS_RELEASE";
    ContentType["VIDEO_SCRIPT"] = "VIDEO_SCRIPT";
    ContentType["PODCAST_SCRIPT"] = "PODCAST_SCRIPT";
})(ContentType || (exports.ContentType = ContentType = {}));
class CreateAIAssistantDto {
}
exports.CreateAIAssistantDto = CreateAIAssistantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Business type', example: 'law' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Custom system prompt' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI model settings', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAIAssistantDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAIAssistantDto.prototype, "clientId", void 0);
class UpdateAIAssistantDto {
}
exports.UpdateAIAssistantDto = UpdateAIAssistantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAIAssistantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAIAssistantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Business type', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAIAssistantDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Custom system prompt', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAIAssistantDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI model settings', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateAIAssistantDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is assistant active', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAIAssistantDto.prototype, "isActive", void 0);
class CreateChatSessionDto {
}
exports.CreateChatSessionDto = CreateChatSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session title', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatSessionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatSessionDto.prototype, "assistantId", void 0);
class SendMessageDto {
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "sessionId", void 0);
class CreateBusinessDocumentDto {
}
exports.CreateBusinessDocumentDto = CreateBusinessDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBusinessDocumentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document type', example: 'strategy' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBusinessDocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document content', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBusinessDocumentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBusinessDocumentDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBusinessDocumentDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateBusinessDocumentDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBusinessDocumentDto.prototype, "assistantId", void 0);
class UpdateBusinessDocumentDto {
}
exports.UpdateBusinessDocumentDto = UpdateBusinessDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBusinessDocumentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document content', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBusinessDocumentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateBusinessDocumentDto.prototype, "metadata", void 0);
class CreateAITaskDto {
}
exports.CreateAITaskDto = CreateAITaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAITaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAITaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task priority', enum: TaskPriority, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TaskPriority),
    __metadata("design:type", String)
], CreateAITaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAITaskDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAITaskDto.prototype, "assistantId", void 0);
class UpdateAITaskDto {
}
exports.UpdateAITaskDto = UpdateAITaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task title', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAITaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAITaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task status', enum: TaskStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TaskStatus),
    __metadata("design:type", String)
], UpdateAITaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task priority', enum: TaskPriority, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TaskPriority),
    __metadata("design:type", String)
], UpdateAITaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAITaskDto.prototype, "dueDate", void 0);
class GenerateContentDto {
}
exports.GenerateContentDto = GenerateContentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content type', enum: ContentType }),
    (0, class_validator_1.IsEnum)(ContentType),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content prompt' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional context', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content parameters', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GenerateContentDto.prototype, "parameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assistant ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "assistantId", void 0);
class GlobalSearchDto {
}
exports.GlobalSearchDto = GlobalSearchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search query' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GlobalSearchDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search filters', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GlobalSearchDto.prototype, "filters", void 0);
//# sourceMappingURL=ai-assistants.dto.js.map