const API_BASE_URL = 'http://localhost:3001/api';

// Types for API responses
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'admin' | 'user' | 'client';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SocialAccount {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin';
  accountName: string;
  accountId: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface Post {
  id: string;
  content: string;
  mediaUrls?: string[];
  platforms: string[];
  scheduledFor?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  clientId?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  socialAccounts: SocialAccount[];
  posts: Post[];
  createdAt: string;
}

// New CRM Types
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  source: 'WEBSITE' | 'SOCIAL_MEDIA' | 'EMAIL' | 'REFERRAL' | 'PAID_ADS' | 'ORGANIC_SEARCH' | 'EVENT' | 'COLD_OUTREACH' | 'OTHER';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST' | 'DISQUALIFIED';
  score: number;
  notes?: string;
  assignedTo?: string;
  clientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  title: string;
  description?: string;
  value?: number;
  stage: 'PROSPECT' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  probability: number;
  leadId?: string;
  assignedTo?: string;
  clientId?: string;
  expectedClose?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Campaign Types
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  goal: 'BRAND_AWARENESS' | 'LEAD_GENERATION' | 'SEO_RANKING' | 'SALES_CONVERSION' | 'CUSTOMER_RETENTION' | 'TRAFFIC_DRIVE' | 'ENGAGEMENT_BOOST' | 'REPUTATION_MANAGEMENT';
  type: 'SOCIAL_MEDIA' | 'EMAIL_MARKETING' | 'VIDEO_CONTENT' | 'PRINT_MEDIA' | 'SEO_OPTIMIZATION' | 'PAID_ADVERTISING' | 'INFLUENCER_MARKETING' | 'PR_AND_MEDIA' | 'CONTENT_MARKETING' | 'EVENT_MARKETING';
  status: 'DRAFT' | 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  brandId: string;
  clientId?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  launchedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface DashboardStats {
  leads: {
    total: number;
    byStatus: any[];
    bySource: any[];
  };
  deals: {
    total: number;
    byStage: any[];
    totalValue: number;
    wonValue: number;
    winRate: number;
  };
  contacts: {
    total: number;
    byCompany: any[];
    byTags: any[];
  };
  overview: {
    totalLeads: number;
    totalDeals: number;
    totalContacts: number;
    totalValue: number;
    wonValue: number;
    winRate: number;
  };
}

export interface Pipeline {
  PROSPECT: Deal[];
  QUALIFICATION: Deal[];
  PROPOSAL: Deal[];
  NEGOTIATION: Deal[];
}

// API Client Class
class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          throw new Error('Authentication required');
        }
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication Methods
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async register(userData: { name: string; email: string; password: string; company?: string }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    this.token = response.token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // CRM Methods
  async getDashboardStats(tenantId: string): Promise<DashboardStats> {
    return this.request<DashboardStats>(`/crm/dashboard?tenantId=${tenantId}`);
  }

  async getPipeline(tenantId: string): Promise<Pipeline> {
    return this.request<Pipeline>(`/crm/pipeline?tenantId=${tenantId}`);
  }

  async getForecast(tenantId: string, months: number = 3): Promise<any> {
    return this.request<any>(`/crm/forecast?tenantId=${tenantId}&months=${months}`);
  }

  // Lead Management
  async createLead(tenantId: string, leadData: Partial<Lead>): Promise<Lead> {
    return this.request<Lead>(`/crm/leads?tenantId=${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async getLeads(tenantId: string, filters?: any): Promise<Lead[]> {
    const queryParams = new URLSearchParams({ tenantId });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    return this.request<Lead[]>(`/crm/leads?${queryParams.toString()}`);
  }

  async updateLead(tenantId: string, leadId: string, updates: Partial<Lead>): Promise<Lead> {
    return this.request<Lead>(`/crm/leads/${leadId}?tenantId=${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteLead(tenantId: string, leadId: string): Promise<void> {
    return this.request<void>(`/crm/leads/${leadId}?tenantId=${tenantId}`, {
      method: 'DELETE',
    });
  }

  // Contact Management
  async createContact(tenantId: string, contactData: Partial<Contact>): Promise<Contact> {
    return this.request<Contact>(`/crm/contacts?tenantId=${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContacts(tenantId: string, filters?: any): Promise<Contact[]> {
    const queryParams = new URLSearchParams({ tenantId });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    return this.request<Contact[]>(`/crm/contacts?${queryParams.toString()}`);
  }

  async updateContact(tenantId: string, contactId: string, updates: Partial<Contact>): Promise<Contact> {
    return this.request<Contact>(`/crm/contacts/${contactId}?tenantId=${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteContact(tenantId: string, contactId: string): Promise<void> {
    return this.request<void>(`/crm/contacts/${contactId}?tenantId=${tenantId}`, {
      method: 'DELETE',
    });
  }

  // Deal Management
  async createDeal(tenantId: string, dealData: Partial<Deal>): Promise<Deal> {
    return this.request<Deal>(`/crm/deals?tenantId=${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(dealData),
    });
  }

  async getDeals(tenantId: string, filters?: any): Promise<Deal[]> {
    const queryParams = new URLSearchParams({ tenantId });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    return this.request<Deal[]>(`/crm/deals?${queryParams.toString()}`);
  }

  async updateDeal(tenantId: string, dealId: string, updates: Partial<Deal>): Promise<Deal> {
    return this.request<Deal>(`/crm/deals/${dealId}?tenantId=${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteDeal(tenantId: string, dealId: string): Promise<void> {
    return this.request<void>(`/crm/deals/${dealId}?tenantId=${tenantId}`, {
      method: 'DELETE',
    });
  }

  // Campaign Management
  async createCampaign(tenantId: string, campaignData: Partial<Campaign>): Promise<Campaign> {
    return this.request<Campaign>(`/campaigns?tenantId=${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  async getCampaigns(tenantId: string, filters?: any): Promise<Campaign[]> {
    const queryParams = new URLSearchParams({ tenantId });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    return this.request<Campaign[]>(`/campaigns?${queryParams.toString()}`);
  }

  async updateCampaign(tenantId: string, campaignId: string, updates: Partial<Campaign>): Promise<Campaign> {
    return this.request<Campaign>(`/campaigns/${campaignId}?tenantId=${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCampaign(tenantId: string, campaignId: string): Promise<void> {
    return this.request<void>(`/campaigns/${campaignId}?tenantId=${tenantId}`, {
      method: 'DELETE',
    });
  }

  // AI Campaign Generation
  async generateCampaign(tenantId: string, campaignData: any): Promise<any> {
    return this.request<any>(`/campaigns/generate?tenantId=${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  // Analytics
  async getAnalytics(tenantId: string, period: 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<any> {
    return this.request<any>(`/crm/analytics?tenantId=${tenantId}&period=${period}`);
  }

  async getRecentActivity(tenantId: string, limit: number = 10): Promise<any[]> {
    return this.request<any[]>(`/crm/activity?tenantId=${tenantId}&limit=${limit}`);
  }

  // Social Media Methods (existing)
  async getSocialAccounts(): Promise<SocialAccount[]> {
    return this.request<SocialAccount[]>('/social/accounts');
  }

  async connectSocialAccount(platform: string, authCode: string): Promise<SocialAccount> {
    return this.request<SocialAccount>('/social/connect', {
      method: 'POST',
      body: JSON.stringify({ platform, authCode }),
    });
  }

  async disconnectSocialAccount(accountId: string): Promise<void> {
    return this.request<void>(`/social/disconnect/${accountId}`, {
      method: 'DELETE',
    });
  }

  // Posting Methods (existing)
  async createPost(postData: Partial<Post>): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async getPosts(filters?: { status?: string; clientId?: string }): Promise<Post[]> {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.clientId) queryParams.append('clientId', filters.clientId);
    
    const endpoint = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<Post[]>(endpoint);
  }

  async updatePost(postId: string, updates: Partial<Post>): Promise<Post> {
    return this.request<Post>(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePost(postId: string): Promise<void> {
    return this.request<void>(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  // Client Management Methods (existing)
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>('/users/clients');
  }

  async createClient(clientData: Partial<Client>): Promise<Client> {
    return this.request<Client>('/users/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(clientId: string, updates: Partial<Client>): Promise<Client> {
    return this.request<Client>(`/users/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteClient(clientId: string): Promise<void> {
    return this.request<void>(`/users/clients/${clientId}`, {
      method: 'DELETE',
    });
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual functions for convenience
export const {
  login,
  register,
  logout,
  getCurrentUser,
  getDashboardStats,
  getPipeline,
  getForecast,
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  createDeal,
  getDeals,
  updateDeal,
  deleteDeal,
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
  generateCampaign,
  getAnalytics,
  getRecentActivity,
  getSocialAccounts,
  connectSocialAccount,
  disconnectSocialAccount,
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getClients,
  createClient,
  updateClient,
  deleteClient,
  isAuthenticated,
} = apiClient;

