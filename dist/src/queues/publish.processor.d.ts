import { Job } from 'bull';
import { PrismaService } from '../common/prisma.service';
import { S3Service } from '../storage/s3.service';
export declare class PublishProcessor {
    private readonly prisma;
    private readonly s3Service;
    private readonly logger;
    constructor(prisma: PrismaService, s3Service: S3Service);
    handleVideoPublish(job: Job): Promise<any[]>;
    handlePrintPublish(job: Job): Promise<any[]>;
    handleScheduledPublish(job: Job): Promise<void>;
    private publishToSocialMedia;
    private publishToWebsite;
    private publishToEmail;
    private reschedulePublish;
}
