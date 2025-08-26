"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realTimeDataManager = exports.RealTimeDataManager = exports.realDataService = exports.RealDataService = void 0;
const api_1 = require("./api");
class RealDataService {
    static getInstance() {
        if (!RealDataService.instance) {
            RealDataService.instance = new RealDataService();
        }
        return RealDataService.instance;
    }
    async getSocialMediaMetrics() {
        try {
            const response = await api_1.apiClient.get('/social-media/metrics');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching social media metrics:', error);
            return this.getMockSocialMediaData();
        }
    }
    async getSeoMetrics() {
        try {
            const response = await api_1.apiClient.get('/seo/metrics');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching SEO metrics:', error);
            return this.getMockSeoData();
        }
    }
    async getBusinessMetrics() {
        try {
            const response = await api_1.apiClient.get('/business/metrics');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching business metrics:', error);
            return this.getMockBusinessData();
        }
    }
    async getContentMetrics() {
        try {
            const response = await api_1.apiClient.get('/content/metrics');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching content metrics:', error);
            return this.getMockContentData();
        }
    }
    async getClientMetrics() {
        try {
            const response = await api_1.apiClient.get('/clients/metrics');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching client metrics:', error);
            return this.getMockClientData();
        }
    }
    async getCompetitiveData() {
        try {
            const response = await api_1.apiClient.get('/competitive/intelligence');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching competitive data:', error);
            return this.getMockCompetitiveData();
        }
    }
    async getSocialListeningData() {
        try {
            const response = await api_1.apiClient.get('/social-listening/mentions');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching social listening data:', error);
            return this.getMockSocialListeningData();
        }
    }
    getMockSocialMediaData() {
        return {
            totalFollowers: 0,
            totalEngagement: 0,
            totalReach: 0,
            platformBreakdown: {
                facebook: { followers: 0, engagement: 0, reach: 0 },
                instagram: { followers: 0, engagement: 0, reach: 0 },
                linkedin: { followers: 0, engagement: 0, reach: 0 },
                twitter: { followers: 0, engagement: 0, reach: 0 }
            }
        };
    }
    getMockSeoData() {
        return {
            organicTraffic: 0,
            keywordRankings: 0,
            backlinks: 0,
            seoScore: 0
        };
    }
    getMockBusinessData() {
        return {
            totalRevenue: 0,
            activeClients: 0,
            monthlyGrowth: 0,
            clientRetention: 0
        };
    }
    getMockContentData() {
        return {
            totalPosts: 0,
            averageEngagement: 0,
            topPerformingContent: [],
            contentCalendar: []
        };
    }
    getMockClientData() {
        return {
            totalClients: 0,
            newClientsThisMonth: 0,
            clientSatisfaction: 0,
            averageCaseValue: 0
        };
    }
    getMockCompetitiveData() {
        return {
            competitors: [],
            marketGaps: [],
            alerts: []
        };
    }
    getMockSocialListeningData() {
        return {
            mentions: [],
            sentiment: { positive: 0, negative: 0, neutral: 0 },
            trendingTopics: []
        };
    }
}
exports.RealDataService = RealDataService;
exports.realDataService = RealDataService.getInstance();
class RealTimeDataManager {
    constructor() {
        this.refreshIntervals = new Map();
        this.dataCache = new Map();
        this.subscribers = new Map();
    }
    subscribe(dataType, callback) {
        if (!this.subscribers.has(dataType)) {
            this.subscribers.set(dataType, new Set());
        }
        this.subscribers.get(dataType).add(callback);
        this.startRealTimeUpdates(dataType);
        return () => {
            this.subscribers.get(dataType)?.delete(callback);
            if (this.subscribers.get(dataType)?.size === 0) {
                this.stopRealTimeUpdates(dataType);
            }
        };
    }
    startRealTimeUpdates(dataType) {
        if (this.refreshIntervals.has(dataType))
            return;
        const interval = setInterval(async () => {
            try {
                const data = await this.fetchData(dataType);
                this.dataCache.set(dataType, data);
                this.notifySubscribers(dataType, data);
            }
            catch (error) {
                console.error(`Error updating ${dataType}:`, error);
            }
        }, this.getRefreshInterval(dataType));
        this.refreshIntervals.set(dataType, interval);
    }
    stopRealTimeUpdates(dataType) {
        const interval = this.refreshIntervals.get(dataType);
        if (interval) {
            clearInterval(interval);
            this.refreshIntervals.delete(dataType);
        }
    }
    getRefreshInterval(dataType) {
        switch (dataType) {
            case 'social-media':
                return 30000;
            case 'seo':
                return 300000;
            case 'business':
                return 600000;
            case 'content':
                return 60000;
            case 'competitive':
                return 300000;
            case 'social-listening':
                return 15000;
            default:
                return 60000;
        }
    }
    async fetchData(dataType) {
        switch (dataType) {
            case 'social-media':
                return await exports.realDataService.getSocialMediaMetrics();
            case 'seo':
                return await exports.realDataService.getSeoMetrics();
            case 'business':
                return await exports.realDataService.getBusinessMetrics();
            case 'content':
                return await exports.realDataService.getContentMetrics();
            case 'client':
                return await exports.realDataService.getClientMetrics();
            case 'competitive':
                return await exports.realDataService.getCompetitiveData();
            case 'social-listening':
                return await exports.realDataService.getSocialListeningData();
            default:
                throw new Error(`Unknown data type: ${dataType}`);
        }
    }
    notifySubscribers(dataType, data) {
        const subscribers = this.subscribers.get(dataType);
        if (subscribers) {
            subscribers.forEach(callback => callback(data));
        }
    }
    getCachedData(dataType) {
        return this.dataCache.get(dataType);
    }
    async refreshData(dataType) {
        try {
            const data = await this.fetchData(dataType);
            this.dataCache.set(dataType, data);
            this.notifySubscribers(dataType, data);
            return data;
        }
        catch (error) {
            console.error(`Error refreshing ${dataType}:`, error);
            throw error;
        }
    }
    cleanup() {
        this.refreshIntervals.forEach(interval => clearInterval(interval));
        this.refreshIntervals.clear();
        this.subscribers.clear();
        this.dataCache.clear();
    }
}
exports.RealTimeDataManager = RealTimeDataManager;
exports.realTimeDataManager = new RealTimeDataManager();
//# sourceMappingURL=realDataService.js.map