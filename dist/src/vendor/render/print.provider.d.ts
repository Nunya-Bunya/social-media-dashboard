export interface PrintRenderJob {
    id: string;
    projectId: string;
    format: string;
    content: string;
    properties: any;
    outputFormat: string;
}
export interface PrintRenderResult {
    jobId: string;
    status: 'completed' | 'failed';
    outputUrl?: string;
    error?: string;
    metadata?: any;
}
export interface PrintRenderProvider {
    submitJob(job: PrintRenderJob): Promise<string>;
    getJobStatus(jobId: string): Promise<PrintRenderResult>;
    cancelJob(jobId: string): Promise<boolean>;
    getSupportedFormats(): Promise<string[]>;
    getEstimatedExportTime(properties: any): Promise<number>;
}
