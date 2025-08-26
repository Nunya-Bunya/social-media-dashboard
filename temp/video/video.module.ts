import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { videoRenderQueueConfig } from '../queues/bull.config';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoAiService } from './video.ai.service';
import { VideoRenderService } from './video.render.service';
import { VideoRenderProcessor } from '../queues/video.processor';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  imports: [
    BullModule.registerQueue(videoRenderQueueConfig),
    VendorModule,
  ],
  controllers: [VideoController],
  providers: [
    VideoService,
    VideoAiService,
    VideoRenderService,
    VideoRenderProcessor,
  ],
  exports: [VideoService, VideoAiService, VideoRenderService],
})
export class VideoModule {}
