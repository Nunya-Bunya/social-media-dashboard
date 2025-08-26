import { Job } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { PrintRenderProvider } from '../vendor/render/print.provider';
import { S3Service } from '../storage/s3.service';
export declare class PrintProcessor {
    private readonly prisma;
    private readonly printRenderProvider;
    private readonly s3Service;
    private readonly logger;
    constructor(prisma: PrismaService, printRenderProvider: PrintRenderProvider, s3Service: S3Service);
    handleExport(job: Job): Promise<void>;
    handleBatchExport(job: Job): Promise<any[]>;
}
