import { Module } from '@nestjs/common';
import { CRMController } from './crm.controller';
import { CRMService } from './crm.service';
import { LeadService } from './lead.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [CRMController],
  providers: [
    CRMService,
    LeadService,
    PrismaService,
  ],
  exports: [CRMService, LeadService],
})
export class CRMModule {}
