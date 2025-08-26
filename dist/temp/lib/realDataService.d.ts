export declare class RealDataService {
    private static instance;
    static getInstance(): RealDataService;
    getSocialMediaMetrics(): Promise<any>;
    getSeoMetrics(): Promise<any>;
    getBusinessMetrics(): Promise<any>;
    getContentMetrics(): Promise<any>;
    getClientMetrics(): Promise<any>;
    getCompetitiveData(): Promise<any>;
    getSocialListeningData(): Promise<any>;
    private getMockSocialMediaData;
    private getMockSeoData;
    private getMockBusinessData;
    private getMockContentData;
    private getMockClientData;
    private getMockCompetitiveData;
    private getMockSocialListeningData;
}
export declare const realDataService: RealDataService;
export declare class RealTimeDataManager {
    private refreshIntervals;
    private dataCache;
    private subscribers;
    subscribe(dataType: string, callback: (data: any) => void): () => void;
    private startRealTimeUpdates;
    private stopRealTimeUpdates;
    private getRefreshInterval;
    private fetchData;
    private notifySubscribers;
    getCachedData(dataType: string): any;
    refreshData(dataType: string): Promise<any>;
    cleanup(): void;
}
export declare const realTimeDataManager: RealTimeDataManager;
