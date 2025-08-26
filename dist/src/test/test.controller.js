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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let TestController = class TestController {
    getTest() {
        return {
            message: '🎉 AI Assistant Backend is working!',
            timestamp: new Date().toISOString(),
            status: 'success',
            version: '1.0.0'
        };
    }
    postEcho(data) {
        return {
            message: 'Echo response',
            received: data,
            timestamp: new Date().toISOString()
        };
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Backend is working!' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getTest", null);
__decorate([
    (0, common_1.Post)('echo'),
    (0, swagger_1.ApiOperation)({ summary: 'Echo test endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Echo response' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "postEcho", null);
exports.TestController = TestController = __decorate([
    (0, swagger_1.ApiTags)('test'),
    (0, common_1.Controller)('test')
], TestController);
//# sourceMappingURL=test.controller.js.map