"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_service_1 = require("./ai/openai.service");
const mock_video_service_1 = require("./render/mock-video.service");
const mock_print_service_1 = require("./render/mock-print.service");
let VendorModule = class VendorModule {
};
exports.VendorModule = VendorModule;
exports.VendorModule = VendorModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: ai_provider_1.AiProvider,
                useClass: openai_service_1.OpenAiService,
            },
            {
                provide: video_provider_1.VideoRenderProvider,
                useClass: mock_video_service_1.MockVideoRenderService,
            },
            {
                provide: print_provider_1.PrintRenderProvider,
                useClass: mock_print_service_1.MockPrintRenderService,
            },
        ],
        exports: [ai_provider_1.AiProvider, video_provider_1.VideoRenderProvider, print_provider_1.PrintRenderProvider],
    })
], VendorModule);
//# sourceMappingURL=vendor.module.js.map