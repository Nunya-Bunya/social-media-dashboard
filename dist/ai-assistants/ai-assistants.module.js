"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAssistantsModule = void 0;
const common_1 = require("@nestjs/common");
const ai_assistants_controller_1 = require("./ai-assistants.controller");
const ai_assistants_service_1 = require("./ai-assistants.service");
const prisma_service_1 = require("../common/prisma.service");
let AIAssistantsModule = class AIAssistantsModule {
};
exports.AIAssistantsModule = AIAssistantsModule;
exports.AIAssistantsModule = AIAssistantsModule = __decorate([
    (0, common_1.Module)({
        controllers: [ai_assistants_controller_1.AIAssistantsController],
        providers: [ai_assistants_service_1.AIAssistantsService, prisma_service_1.PrismaService],
        exports: [ai_assistants_service_1.AIAssistantsService],
    })
], AIAssistantsModule);
//# sourceMappingURL=ai-assistants.module.js.map