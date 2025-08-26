import { 
  AdCampaign, 
  AdCreative, 
  AdAnalytics, 
  SplitTest, 
  SalesFunnel, 
  Integration,
  CreateAdCampaignRequest,
  UpdateAdCampaignRequest,
  CreateAdCreativeRequest,
  UpdateAdCreativeRequest,
  TrackAdAnalyticsRequest,
  CreateSplitTestRequest,
  UpdateSplitTestRequest,
  CreateSalesFunnelRequest,
  UpdateSalesFunnelRequest,
  CreateIntegrationRequest,
  UpdateIntegrationRequest,
  AnalyticsOverviewRequest,
  SyncAnalyticsRequest,
  AnalyticsOverview,
  AdCampaignStats,
  SyncAnalyticsResponse,
  AdCampaignFilters,
  AdCreativeFilters,
  SplitTestFilters,
  SalesFunnelFilters,
  PaginatedResponse,
  AdPlatform,
  TestVariant
} from '../types/ad-campaigns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class AdCampaignApi {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}/ad-campaigns${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Ad Campaign Management
  async createAdCampaign(data: CreateAdCampaignRequest): Promise<AdCampaign> {
    return this.request<AdCampaign>('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAdCampaigns(filters: AdCampaignFilters = {}): Promise<PaginatedResponse<AdCampaign>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    return this.request<PaginatedResponse<AdCampaign>>(`?${params.toString()}`);
  }

  async getAdCampaign(id: string): Promise<AdCampaign> {
    return this.request<AdCampaign>(`/${id}`);
  }

  async updateAdCampaign(id: string, data: UpdateAdCampaignRequest): Promise<AdCampaign> {
    return this.request<AdCampaign>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAdCampaign(id: string): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: 'DELETE',
    });
  }

  async launchAdCampaign(id: string): Promise<AdCampaign> {
    return this.request<AdCampaign>(`/${id}/launch`, {
      method: 'POST',
    });
  }

  async pauseAdCampaign(id: string): Promise<AdCampaign> {
    return this.request<AdCampaign>(`/${id}/pause`, {
      method: 'POST',
    });
  }

  async duplicateAdCampaign(id: string): Promise<AdCampaign> {
    return this.request<AdCampaign>(`/${id}/duplicate`, {
      method: 'POST',
    });
  }

  // Ad Creative Management
  async createAdCreative(data: CreateAdCreativeRequest): Promise<AdCreative> {
    return this.request<AdCreative>('/creatives', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAdCreatives(filters: AdCreativeFilters = {}): Promise<PaginatedResponse<AdCreative>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    return this.request<PaginatedResponse<AdCreative>>(`/creatives?${params.toString()}`);
  }

  async getAdCreative(id: string): Promise<AdCreative> {
    return this.request<AdCreative>(`/creatives/${id}`);
  }

  async updateAdCreative(id: string, data: UpdateAdCreativeRequest): Promise<AdCreative> {
    return this.request<AdCreative>(`/creatives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAdCreative(id: string): Promise<void> {
    return this.request<void>(`/creatives/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics Management
  async trackAdAnalytics(campaignId: string, data: TrackAdAnalyticsRequest): Promise<AdAnalytics> {
    return this.request<AdAnalytics>(`/${campaignId}/analytics`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAdAnalytics(campaignId: string, filters: any = {}): Promise<PaginatedResponse<AdAnalytics>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    return this.request<PaginatedResponse<AdAnalytics>>(`/${campaignId}/analytics?${params.toString()}`);
  }

  async getAnalyticsOverview(data: AnalyticsOverviewRequest): Promise<AnalyticsOverview> {
    return this.request<AnalyticsOverview>('/analytics/overview', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Split Testing Management
  async createSplitTest(data: CreateSplitTestRequest): Promise<SplitTest> {
    return this.request<SplitTest>('/split-tests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSplitTests(filters: SplitTestFilters = {}): Promise<PaginatedResponse<SplitTest>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    return this.request<PaginatedResponse<SplitTest>>(`/split-tests?${params.toString()}`);
  }

  async getSplitTest(id: string): Promise<SplitTest> {
    return this.request<SplitTest>(`/split-tests/${id}`);
  }

  async updateSplitTest(id: string, data: UpdateSplitTestRequest): Promise<SplitTest> {
    return this.request<SplitTest>(`/split-tests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async declareWinner(id: string, winner: TestVariant): Promise<SplitTest> {
    return this.request<SplitTest>(`/split-tests/${id}/winner`, {
      method: 'POST',
      body: JSON.stringify({ winner }),
    });
  }

  // Sales Funnel Management
  async createSalesFunnel(data: CreateSalesFunnelRequest): Promise<SalesFunnel> {
    return this.request<SalesFunnel>('/funnels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSalesFunnels(filters: SalesFunnelFilters = {}): Promise<PaginatedResponse<SalesFunnel>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    return this.request<PaginatedResponse<SalesFunnel>>(`/funnels?${params.toString()}`);
  }

  async getSalesFunnel(id: string): Promise<SalesFunnel> {
    return this.request<SalesFunnel>(`/funnels/${id}`);
  }

  async updateSalesFunnel(id: string, data: UpdateSalesFunnelRequest): Promise<SalesFunnel> {
    return this.request<SalesFunnel>(`/funnels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSalesFunnel(id: string): Promise<void> {
    return this.request<void>(`/funnels/${id}`, {
      method: 'DELETE',
    });
  }

  // Integration Management
  async createIntegration(data: CreateIntegrationRequest): Promise<Integration> {
    return this.request<Integration>('/integrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getIntegrations(): Promise<Integration[]> {
    return this.request<Integration[]>('/integrations');
  }

  async getIntegration(id: string): Promise<Integration> {
    return this.request<Integration>(`/integrations/${id}`);
  }

  async updateIntegration(id: string, data: UpdateIntegrationRequest): Promise<Integration> {
    return this.request<Integration>(`/integrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteIntegration(id: string): Promise<void> {
    return this.request<void>(`/integrations/${id}`, {
      method: 'DELETE',
    });
  }

  // Platform Sync
  async syncAnalytics(data: SyncAnalyticsRequest): Promise<SyncAnalyticsResponse> {
    return this.request<SyncAnalyticsResponse>('/sync', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Statistics
  async getAdCampaignStats(): Promise<AdCampaignStats> {
    return this.request<AdCampaignStats>('/stats/overview');
  }

  // File Upload
  async uploadMedia(file: File, onProgress?: (progress: number) => void): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Invalid response format'));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${API_BASE_URL}/media/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  }
}

export const adCampaignApi = new AdCampaignApi();
