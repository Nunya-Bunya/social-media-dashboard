import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { VendorModule } from '../vendor/vendor.module';
import { PrintController } from './print.controller';
import { PrintService } from './print.service';
import { PrintAiService } from './print.ai.service';
import { PrintRenderService } from './print.render.service';
import { PrintProcessor } from '../queues/print.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'printExportQueue',
    }),
    VendorModule,
  ],
  controllers: [PrintController],
  providers: [PrintService, PrintAiService, PrintRenderService, PrintProcessor],
  exports: [PrintService, PrintAiService, PrintRenderService],
})
export class PrintModule {}
