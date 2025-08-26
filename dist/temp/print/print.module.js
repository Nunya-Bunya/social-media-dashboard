"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const vendor_module_1 = require("../vendor/vendor.module");
const print_controller_1 = require("./print.controller");
const print_service_1 = require("./print.service");
const print_ai_service_1 = require("./print.ai.service");
const print_render_service_1 = require("./print.render.service");
const print_processor_1 = require("../queues/print.processor");
let PrintModule = class PrintModule {
};
exports.PrintModule = PrintModule;
exports.PrintModule = PrintModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'printExportQueue',
            }),
            vendor_module_1.VendorModule,
        ],
        controllers: [print_controller_1.PrintController],
        providers: [print_service_1.PrintService, print_ai_service_1.PrintAiService, print_render_service_1.PrintRenderService, print_processor_1.PrintProcessor],
        exports: [print_service_1.PrintService, print_ai_service_1.PrintAiService, print_render_service_1.PrintRenderService],
    })
], PrintModule);
//# sourceMappingURL=print.module.js.map