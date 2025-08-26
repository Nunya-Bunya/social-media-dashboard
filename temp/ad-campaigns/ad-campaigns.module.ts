import { Module } from '@nestjs/common';
import { AdCampaignsController } from './ad-campaigns.controller';
import { AdCampaignsService } from './ad-campaigns.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AdCampaignsController],
  providers: [AdCampaignsService],
  exports: [AdCampaignsService]
})
export class AdCampaignsModule {}
