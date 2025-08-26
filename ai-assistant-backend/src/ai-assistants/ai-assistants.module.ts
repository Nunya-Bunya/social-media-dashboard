import { Module } from '@nestjs/common';
import { AIAssistantsController } from './ai-assistants.controller';
import { AIAssistantsService } from './ai-assistants.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [AIAssistantsController],
  providers: [AIAssistantsService, PrismaService],
  exports: [AIAssistantsService],
})
export class AIAssistantsModule {}
