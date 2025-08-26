"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const vendor_module_1 = require("../vendor/vendor.module");
const campaigns_controller_1 = require("./campaigns.controller");
const campaigns_service_1 = require("./campaigns.service");
const campaign_ai_service_1 = require("./campaign.ai.service");
const campaign_analytics_service_1 = require("./campaign.analytics.service");
const campaign_templates_service_1 = require("./campaign.templates.service");
const campaign_processor_1 = require("../queues/campaign.processor");
let CampaignsModule = class CampaignsModule {
};
exports.CampaignsModule = CampaignsModule;
exports.CampaignsModule = CampaignsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'campaignQueue',
            }),
            vendor_module_1.VendorModule,
        ],
        controllers: [campaigns_controller_1.CampaignsController],
        providers: [
            campaigns_service_1.CampaignsService,
            campaign_ai_service_1.CampaignAiService,
            campaign_analytics_service_1.CampaignAnalyticsService,
            campaign_templates_service_1.CampaignTemplatesService,
            campaign_processor_1.CampaignProcessor,
        ],
        exports: [
            campaigns_service_1.CampaignsService,
            campaign_ai_service_1.CampaignAiService,
            campaign_analytics_service_1.CampaignAnalyticsService,
            campaign_templates_service_1.CampaignTemplatesService,
        ],
    })
], CampaignsModule);
//# sourceMappingURL=campaigns.module.js.map