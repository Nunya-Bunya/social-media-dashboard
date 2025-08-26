import { apiClient } from './api';

// Real Data Service - Connects to actual APIs and databases
export class RealDataService {
  private static instance: RealDataService;
  
  public static getInstance(): RealDataService {
    if (!RealDataService.instance) {
      RealDataService.instance = new RealDataService();
    }
    return RealDataService.instance;
  }

  // Social Media Real Data
  async getSocialMediaMetrics() {
    try {
      // Get real data from your backend API
      const response = await apiClient.get('/social-media/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching social media metrics:', error);
      // Fallback to mock data if API fails
      return this.getMockSocialMediaData();
    }
  }

  // SEO Real Data
  async getSeoMetrics() {
    try {
      const response = await apiClient.get('/seo/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
      return this.getMockSeoData();
    }
  }

  // Business Performance Real Data
  async getBusinessMetrics() {
    try {
      const response = await apiClient.get('/business/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching business metrics:', error);
      return this.getMockBusinessData();
    }
  }

  // Content Performance Real Data
  async getContentMetrics() {
    try {
      const response = await apiClient.get('/content/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching content metrics:', error);
      return this.getMockContentData();
    }
  }

  // Client Data Real Data
  async getClientMetrics() {
    try {
      const response = await apiClient.get('/clients/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching client metrics:', error);
      return this.getMockClientData();
    }
  }

  // Competitive Intelligence Real Data
  async getCompetitiveData() {
    try {
      const response = await apiClient.get('/competitive/intelligence');
      return response.data;
    } catch (error) {
      console.error('Error fetching competitive data:', error);
      return this.getMockCompetitiveData();
    }
  }

  // Social Listening Real Data
  async getSocialListeningData() {
    try {
      const response = await apiClient.get('/social-listening/mentions');
      return response.data;
    } catch (error) {
      console.error('Error fetching social listening data:', error);
      return this.getMockSocialListeningData();
    }
  }

  // Mock Data Fallbacks (to be replaced with real API calls)
  private getMockSocialMediaData() {
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

  private getMockSeoData() {
    return {
      organicTraffic: 0,
      keywordRankings: 0,
      backlinks: 0,
      seoScore: 0
    };
  }

  private getMockBusinessData() {
    return {
      totalRevenue: 0,
      activeClients: 0,
      monthlyGrowth: 0,
      clientRetention: 0
    };
  }

  private getMockContentData() {
    return {
      totalPosts: 0,
      averageEngagement: 0,
      topPerformingContent: [],
      contentCalendar: []
    };
  }

  private getMockClientData() {
    return {
      totalClients: 0,
      newClientsThisMonth: 0,
      clientSatisfaction: 0,
      averageCaseValue: 0
    };
  }

  private getMockCompetitiveData() {
    return {
      competitors: [],
      marketGaps: [],
      alerts: []
    };
  }

  private getMockSocialListeningData() {
    return {
      mentions: [],
      sentiment: { positive: 0, negative: 0, neutral: 0 },
      trendingTopics: []
    };
  }
}

// Export singleton instance
export const realDataService = RealDataService.getInstance();

// Real-time data fetching with automatic refresh
export class RealTimeDataManager {
  private refreshIntervals: Map<string, NodeJS.Timeout> = new Map();
  private dataCache: Map<string, any> = new Map();
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();

  // Subscribe to real-time data updates
  subscribe(dataType: string, callback: (data: any) => void) {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, new Set());
    }
    this.subscribers.get(dataType)!.add(callback);

    // Start real-time updates if not already running
    this.startRealTimeUpdates(dataType);

    // Return unsubscribe function
    return () => {
      this.subscribers.get(dataType)?.delete(callback);
      if (this.subscribers.get(dataType)?.size === 0) {
        this.stopRealTimeUpdates(dataType);
      }
    };
  }

  // Start real-time updates for a specific data type
  private startRealTimeUpdates(dataType: string) {
    if (this.refreshIntervals.has(dataType)) return;

    const interval = setInterval(async () => {
      try {
        const data = await this.fetchData(dataType);
        this.dataCache.set(dataType, data);
        this.notifySubscribers(dataType, data);
      } catch (error) {
        console.error(`Error updating ${dataType}:`, error);
      }
    }, this.getRefreshInterval(dataType));

    this.refreshIntervals.set(dataType, interval);
  }

  // Stop real-time updates for a specific data type
  private stopRealTimeUpdates(dataType: string) {
    const interval = this.refreshIntervals.get(dataType);
    if (interval) {
      clearInterval(interval);
      this.refreshIntervals.delete(dataType);
    }
  }

  // Get refresh interval for different data types
  private getRefreshInterval(dataType: string): number {
    switch (dataType) {
      case 'social-media':
        return 30000; // 30 seconds
      case 'seo':
        return 300000; // 5 minutes
      case 'business':
        return 600000; // 10 minutes
      case 'content':
        return 60000; // 1 minute
      case 'competitive':
        return 300000; // 5 minutes
      case 'social-listening':
        return 15000; // 15 seconds
      default:
        return 60000; // 1 minute
    }
  }

  // Fetch data from the appropriate service
  private async fetchData(dataType: string) {
    switch (dataType) {
      case 'social-media':
        return await realDataService.getSocialMediaMetrics();
      case 'seo':
        return await realDataService.getSeoMetrics();
      case 'business':
        return await realDataService.getBusinessMetrics();
      case 'content':
        return await realDataService.getContentMetrics();
      case 'client':
        return await realDataService.getClientMetrics();
      case 'competitive':
        return await realDataService.getCompetitiveData();
      case 'social-listening':
        return await realDataService.getSocialListeningData();
      default:
        throw new Error(`Unknown data type: ${dataType}`);
    }
  }

  // Notify all subscribers of data updates
  private notifySubscribers(dataType: string, data: any) {
    const subscribers = this.subscribers.get(dataType);
    if (subscribers) {
      subscribers.forEach(callback => callback(data));
    }
  }

  // Get cached data
  getCachedData(dataType: string) {
    return this.dataCache.get(dataType);
  }

  // Force refresh of specific data type
  async refreshData(dataType: string) {
    try {
      const data = await this.fetchData(dataType);
      this.dataCache.set(dataType, data);
      this.notifySubscribers(dataType, data);
      return data;
    } catch (error) {
      console.error(`Error refreshing ${dataType}:`, error);
      throw error;
    }
  }

  // Cleanup all intervals
  cleanup() {
    this.refreshIntervals.forEach(interval => clearInterval(interval));
    this.refreshIntervals.clear();
    this.subscribers.clear();
    this.dataCache.clear();
  }
}

// Export singleton instance
export const realTimeDataManager = new RealTimeDataManager();

