import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    constructor(configService: ConfigService);
    generatePresignedUploadUrl(key: string, contentType: string, expiresIn?: number): Promise<{
        uploadUrl: string;
        key: string;
    }>;
    generatePresignedDownloadUrl(key: string, expiresIn?: number): Promise<string>;
    deleteFile(key: string): Promise<void>;
    fileExists(key: string): Promise<boolean>;
    getFileUrl(key: string): string;
    generateKey(prefix: string, filename: string): string;
}
