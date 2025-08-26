import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { AIAssistantsModule } from './ai-assistants/ai-assistants.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestModule,
    AIAssistantsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
