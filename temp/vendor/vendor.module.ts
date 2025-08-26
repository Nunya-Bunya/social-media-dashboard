import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiProvider } from './ai/ai.provider';
import { VideoRenderProvider } from './render/video.provider';
import { PrintRenderProvider } from './render/print.provider';
import { OpenAiService } from './ai/openai.service';
import { MockVideoRenderService } from './render/mock-video.service';
import { MockPrintRenderService } from './render/mock-print.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: AiProvider,
      useClass: OpenAiService,
    },
    {
      provide: VideoRenderProvider,
      useClass: MockVideoRenderService,
    },
    {
      provide: PrintRenderProvider,
      useClass: MockPrintRenderService,
    },
  ],
  exports: [AiProvider, VideoRenderProvider, PrintRenderProvider],
})
export class VendorModule {}
