"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.deleteClient = exports.updateClient = exports.createClient = exports.getClients = exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = exports.disconnectSocialAccount = exports.connectSocialAccount = exports.getSocialAccounts = exports.getRecentActivity = exports.getAnalytics = exports.generateCampaign = exports.deleteCampaign = exports.updateCampaign = exports.getCampaigns = exports.createCampaign = exports.deleteDeal = exports.updateDeal = exports.getDeals = exports.createDeal = exports.deleteContact = exports.updateContact = exports.getContacts = exports.createContact = exports.deleteLead = exports.updateLead = exports.getLeads = exports.createLead = exports.getForecast = exports.getPipeline = exports.getDashboardStats = exports.getCurrentUser = exports.logout = exports.register = exports.login = exports.apiClient = void 0;
const API_BASE_URL = 'http://localhost:3001/api';
class ApiClient {
    constructor() {
        this.token = null;
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('auth_token');
        }
    }
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
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
        }
        catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }
    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.token = response.token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.token);
        }
        return response;
    }
    async register(userData) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        this.token = response.token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.token);
        }
        return response;
    }
    async logout() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
    }
    async getCurrentUser() {
        return this.request('/auth/me');
    }
    async getDashboardStats(tenantId) {
        return this.request(`/crm/dashboard?tenantId=${tenantId}`);
    }
    async getPipeline(tenantId) {
        return this.request(`/crm/pipeline?tenantId=${tenantId}`);
    }
    async getForecast(tenantId, months = 3) {
        return this.request(`/crm/forecast?tenantId=${tenantId}&months=${months}`);
    }
    async createLead(tenantId, leadData) {
        return this.request(`/crm/leads?tenantId=${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(leadData),
        });
    }
    async getLeads(tenantId, filters) {
        const queryParams = new URLSearchParams({ tenantId });
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value)
                    queryParams.append(key, value.toString());
            });
        }
        return this.request(`/crm/leads?${queryParams.toString()}`);
    }
    async updateLead(tenantId, leadId, updates) {
        return this.request(`/crm/leads/${leadId}?tenantId=${tenantId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deleteLead(tenantId, leadId) {
        return this.request(`/crm/leads/${leadId}?tenantId=${tenantId}`, {
            method: 'DELETE',
        });
    }
    async createContact(tenantId, contactData) {
        return this.request(`/crm/contacts?tenantId=${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(contactData),
        });
    }
    async getContacts(tenantId, filters) {
        const queryParams = new URLSearchParams({ tenantId });
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value)
                    queryParams.append(key, value.toString());
            });
        }
        return this.request(`/crm/contacts?${queryParams.toString()}`);
    }
    async updateContact(tenantId, contactId, updates) {
        return this.request(`/crm/contacts/${contactId}?tenantId=${tenantId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deleteContact(tenantId, contactId) {
        return this.request(`/crm/contacts/${contactId}?tenantId=${tenantId}`, {
            method: 'DELETE',
        });
    }
    async createDeal(tenantId, dealData) {
        return this.request(`/crm/deals?tenantId=${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(dealData),
        });
    }
    async getDeals(tenantId, filters) {
        const queryParams = new URLSearchParams({ tenantId });
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value)
                    queryParams.append(key, value.toString());
            });
        }
        return this.request(`/crm/deals?${queryParams.toString()}`);
    }
    async updateDeal(tenantId, dealId, updates) {
        return this.request(`/crm/deals/${dealId}?tenantId=${tenantId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deleteDeal(tenantId, dealId) {
        return this.request(`/crm/deals/${dealId}?tenantId=${tenantId}`, {
            method: 'DELETE',
        });
    }
    async createCampaign(tenantId, campaignData) {
        return this.request(`/campaigns?tenantId=${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(campaignData),
        });
    }
    async getCampaigns(tenantId, filters) {
        const queryParams = new URLSearchParams({ tenantId });
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value)
                    queryParams.append(key, value.toString());
            });
        }
        return this.request(`/campaigns?${queryParams.toString()}`);
    }
    async updateCampaign(tenantId, campaignId, updates) {
        return this.request(`/campaigns/${campaignId}?tenantId=${tenantId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deleteCampaign(tenantId, campaignId) {
        return this.request(`/campaigns/${campaignId}?tenantId=${tenantId}`, {
            method: 'DELETE',
        });
    }
    async generateCampaign(tenantId, campaignData) {
        return this.request(`/campaigns/generate?tenantId=${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(campaignData),
        });
    }
    async getAnalytics(tenantId, period = 'month') {
        return this.request(`/crm/analytics?tenantId=${tenantId}&period=${period}`);
    }
    async getRecentActivity(tenantId, limit = 10) {
        return this.request(`/crm/activity?tenantId=${tenantId}&limit=${limit}`);
    }
    async getSocialAccounts() {
        return this.request('/social/accounts');
    }
    async connectSocialAccount(platform, authCode) {
        return this.request('/social/connect', {
            method: 'POST',
            body: JSON.stringify({ platform, authCode }),
        });
    }
    async disconnectSocialAccount(accountId) {
        return this.request(`/social/disconnect/${accountId}`, {
            method: 'DELETE',
        });
    }
    async createPost(postData) {
        return this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
        });
    }
    async getPosts(filters) {
        const queryParams = new URLSearchParams();
        if (filters?.status)
            queryParams.append('status', filters.status);
        if (filters?.clientId)
            queryParams.append('clientId', filters.clientId);
        const endpoint = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.request(endpoint);
    }
    async updatePost(postId, updates) {
        return this.request(`/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deletePost(postId) {
        return this.request(`/posts/${postId}`, {
            method: 'DELETE',
        });
    }
    async getClients() {
        return this.request('/users/clients');
    }
    async createClient(clientData) {
        return this.request('/users/clients', {
            method: 'POST',
            body: JSON.stringify(clientData),
        });
    }
    async updateClient(clientId, updates) {
        return this.request(`/users/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
    async deleteClient(clientId) {
        return this.request(`/users/clients/${clientId}`, {
            method: 'DELETE',
        });
    }
    isAuthenticated() {
        return !!this.token;
    }
    getToken() {
        return this.token;
    }
}
exports.apiClient = new ApiClient();
exports.login = exports.apiClient.login, exports.register = exports.apiClient.register, exports.logout = exports.apiClient.logout, exports.getCurrentUser = exports.apiClient.getCurrentUser, exports.getDashboardStats = exports.apiClient.getDashboardStats, exports.getPipeline = exports.apiClient.getPipeline, exports.getForecast = exports.apiClient.getForecast, exports.createLead = exports.apiClient.createLead, exports.getLeads = exports.apiClient.getLeads, exports.updateLead = exports.apiClient.updateLead, exports.deleteLead = exports.apiClient.deleteLead, exports.createContact = exports.apiClient.createContact, exports.getContacts = exports.apiClient.getContacts, exports.updateContact = exports.apiClient.updateContact, exports.deleteContact = exports.apiClient.deleteContact, exports.createDeal = exports.apiClient.createDeal, exports.getDeals = exports.apiClient.getDeals, exports.updateDeal = exports.apiClient.updateDeal, exports.deleteDeal = exports.apiClient.deleteDeal, exports.createCampaign = exports.apiClient.createCampaign, exports.getCampaigns = exports.apiClient.getCampaigns, exports.updateCampaign = exports.apiClient.updateCampaign, exports.deleteCampaign = exports.apiClient.deleteCampaign, exports.generateCampaign = exports.apiClient.generateCampaign, exports.getAnalytics = exports.apiClient.getAnalytics, exports.getRecentActivity = exports.apiClient.getRecentActivity, exports.getSocialAccounts = exports.apiClient.getSocialAccounts, exports.connectSocialAccount = exports.apiClient.connectSocialAccount, exports.disconnectSocialAccount = exports.apiClient.disconnectSocialAccount, exports.createPost = exports.apiClient.createPost, exports.getPosts = exports.apiClient.getPosts, exports.updatePost = exports.apiClient.updatePost, exports.deletePost = exports.apiClient.deletePost, exports.getClients = exports.apiClient.getClients, exports.createClient = exports.apiClient.createClient, exports.updateClient = exports.apiClient.updateClient, exports.deleteClient = exports.apiClient.deleteClient, exports.isAuthenticated = exports.apiClient.isAuthenticated;
//# sourceMappingURL=api.js.map