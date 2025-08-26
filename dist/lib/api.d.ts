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
declare class ApiClient {
    private token;
    constructor();
    private request;
    login(email: string, password: string): Promise<AuthResponse>;
    register(userData: {
        name: string;
        email: string;
        password: string;
        company?: string;
    }): Promise<AuthResponse>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User>;
    getDashboardStats(tenantId: string): Promise<DashboardStats>;
    getPipeline(tenantId: string): Promise<Pipeline>;
    getForecast(tenantId: string, months?: number): Promise<any>;
    createLead(tenantId: string, leadData: Partial<Lead>): Promise<Lead>;
    getLeads(tenantId: string, filters?: any): Promise<Lead[]>;
    updateLead(tenantId: string, leadId: string, updates: Partial<Lead>): Promise<Lead>;
    deleteLead(tenantId: string, leadId: string): Promise<void>;
    createContact(tenantId: string, contactData: Partial<Contact>): Promise<Contact>;
    getContacts(tenantId: string, filters?: any): Promise<Contact[]>;
    updateContact(tenantId: string, contactId: string, updates: Partial<Contact>): Promise<Contact>;
    deleteContact(tenantId: string, contactId: string): Promise<void>;
    createDeal(tenantId: string, dealData: Partial<Deal>): Promise<Deal>;
    getDeals(tenantId: string, filters?: any): Promise<Deal[]>;
    updateDeal(tenantId: string, dealId: string, updates: Partial<Deal>): Promise<Deal>;
    deleteDeal(tenantId: string, dealId: string): Promise<void>;
    createCampaign(tenantId: string, campaignData: Partial<Campaign>): Promise<Campaign>;
    getCampaigns(tenantId: string, filters?: any): Promise<Campaign[]>;
    updateCampaign(tenantId: string, campaignId: string, updates: Partial<Campaign>): Promise<Campaign>;
    deleteCampaign(tenantId: string, campaignId: string): Promise<void>;
    generateCampaign(tenantId: string, campaignData: any): Promise<any>;
    getAnalytics(tenantId: string, period?: 'week' | 'month' | 'quarter' | 'year'): Promise<any>;
    getRecentActivity(tenantId: string, limit?: number): Promise<any[]>;
    getSocialAccounts(): Promise<SocialAccount[]>;
    connectSocialAccount(platform: string, authCode: string): Promise<SocialAccount>;
    disconnectSocialAccount(accountId: string): Promise<void>;
    createPost(postData: Partial<Post>): Promise<Post>;
    getPosts(filters?: {
        status?: string;
        clientId?: string;
    }): Promise<Post[]>;
    updatePost(postId: string, updates: Partial<Post>): Promise<Post>;
    deletePost(postId: string): Promise<void>;
    getClients(): Promise<Client[]>;
    createClient(clientData: Partial<Client>): Promise<Client>;
    updateClient(clientId: string, updates: Partial<Client>): Promise<Client>;
    deleteClient(clientId: string): Promise<void>;
    isAuthenticated(): boolean;
    getToken(): string | null;
}
export declare const apiClient: ApiClient;
export declare const login: (email: string, password: string) => Promise<AuthResponse>, register: (userData: {
    name: string;
    email: string;
    password: string;
    company?: string;
}) => Promise<AuthResponse>, logout: () => Promise<void>, getCurrentUser: () => Promise<User>, getDashboardStats: (tenantId: string) => Promise<DashboardStats>, getPipeline: (tenantId: string) => Promise<Pipeline>, getForecast: (tenantId: string, months?: number) => Promise<any>, createLead: (tenantId: string, leadData: Partial<Lead>) => Promise<Lead>, getLeads: (tenantId: string, filters?: any) => Promise<Lead[]>, updateLead: (tenantId: string, leadId: string, updates: Partial<Lead>) => Promise<Lead>, deleteLead: (tenantId: string, leadId: string) => Promise<void>, createContact: (tenantId: string, contactData: Partial<Contact>) => Promise<Contact>, getContacts: (tenantId: string, filters?: any) => Promise<Contact[]>, updateContact: (tenantId: string, contactId: string, updates: Partial<Contact>) => Promise<Contact>, deleteContact: (tenantId: string, contactId: string) => Promise<void>, createDeal: (tenantId: string, dealData: Partial<Deal>) => Promise<Deal>, getDeals: (tenantId: string, filters?: any) => Promise<Deal[]>, updateDeal: (tenantId: string, dealId: string, updates: Partial<Deal>) => Promise<Deal>, deleteDeal: (tenantId: string, dealId: string) => Promise<void>, createCampaign: (tenantId: string, campaignData: Partial<Campaign>) => Promise<Campaign>, getCampaigns: (tenantId: string, filters?: any) => Promise<Campaign[]>, updateCampaign: (tenantId: string, campaignId: string, updates: Partial<Campaign>) => Promise<Campaign>, deleteCampaign: (tenantId: string, campaignId: string) => Promise<void>, generateCampaign: (tenantId: string, campaignData: any) => Promise<any>, getAnalytics: (tenantId: string, period?: "week" | "month" | "quarter" | "year") => Promise<any>, getRecentActivity: (tenantId: string, limit?: number) => Promise<any[]>, getSocialAccounts: () => Promise<SocialAccount[]>, connectSocialAccount: (platform: string, authCode: string) => Promise<SocialAccount>, disconnectSocialAccount: (accountId: string) => Promise<void>, createPost: (postData: Partial<Post>) => Promise<Post>, getPosts: (filters?: {
    status?: string;
    clientId?: string;
}) => Promise<Post[]>, updatePost: (postId: string, updates: Partial<Post>) => Promise<Post>, deletePost: (postId: string) => Promise<void>, getClients: () => Promise<Client[]>, createClient: (clientData: Partial<Client>) => Promise<Client>, updateClient: (clientId: string, updates: Partial<Client>) => Promise<Client>, deleteClient: (clientId: string) => Promise<void>, isAuthenticated: () => boolean;
export {};
