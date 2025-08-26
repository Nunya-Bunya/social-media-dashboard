import { PrintRenderProvider, PrintRenderJob, PrintRenderResult } from './print.provider';
export declare class MockPrintRenderService implements PrintRenderProvider {
    private jobs;
    private results;
    submitJob(job: PrintRenderJob): Promise<string>;
    getJobStatus(jobId: string): Promise<PrintRenderResult>;
    cancelJob(jobId: string): Promise<boolean>;
    getSupportedFormats(): Promise<string[]>;
    getEstimatedExportTime(properties: any): Promise<number>;
}
