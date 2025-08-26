import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { VendorModule } from '../vendor/vendor.module';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { CampaignAiService } from './campaign.ai.service';
import { CampaignAnalyticsService } from './campaign.analytics.service';
import { CampaignTemplatesService } from './campaign.templates.service';
import { CampaignProcessor } from '../queues/campaign.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'campaignQueue',
    }),
    VendorModule,
  ],
  controllers: [CampaignsController],
  providers: [
    CampaignsService,
    CampaignAiService,
    CampaignAnalyticsService,
    CampaignTemplatesService,
    CampaignProcessor,
  ],
  exports: [
    CampaignsService,
    CampaignAiService,
    CampaignAnalyticsService,
    CampaignTemplatesService,
  ],
})
export class CampaignsModule {}
