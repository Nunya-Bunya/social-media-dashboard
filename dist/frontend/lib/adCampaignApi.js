"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adCampaignApi = void 0;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
class AdCampaignApi {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const config = {
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
    async createAdCampaign(data) {
        return this.request('', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getAdCampaigns(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        return this.request(`?${params.toString()}`);
    }
    async getAdCampaign(id) {
        return this.request(`/${id}`);
    }
    async updateAdCampaign(id, data) {
        return this.request(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async deleteAdCampaign(id) {
        return this.request(`/${id}`, {
            method: 'DELETE',
        });
    }
    async launchAdCampaign(id) {
        return this.request(`/${id}/launch`, {
            method: 'POST',
        });
    }
    async pauseAdCampaign(id) {
        return this.request(`/${id}/pause`, {
            method: 'POST',
        });
    }
    async duplicateAdCampaign(id) {
        return this.request(`/${id}/duplicate`, {
            method: 'POST',
        });
    }
    async createAdCreative(data) {
        return this.request('/creatives', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getAdCreatives(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        return this.request(`/creatives?${params.toString()}`);
    }
    async getAdCreative(id) {
        return this.request(`/creatives/${id}`);
    }
    async updateAdCreative(id, data) {
        return this.request(`/creatives/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async deleteAdCreative(id) {
        return this.request(`/creatives/${id}`, {
            method: 'DELETE',
        });
    }
    async trackAdAnalytics(campaignId, data) {
        return this.request(`/${campaignId}/analytics`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getAdAnalytics(campaignId, filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        return this.request(`/${campaignId}/analytics?${params.toString()}`);
    }
    async getAnalyticsOverview(data) {
        return this.request('/analytics/overview', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async createSplitTest(data) {
        return this.request('/split-tests', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getSplitTests(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        return this.request(`/split-tests?${params.toString()}`);
    }
    async getSplitTest(id) {
        return this.request(`/split-tests/${id}`);
    }
    async updateSplitTest(id, data) {
        return this.request(`/split-tests/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async declareWinner(id, winner) {
        return this.request(`/split-tests/${id}/winner`, {
            method: 'POST',
            body: JSON.stringify({ winner }),
        });
    }
    async createSalesFunnel(data) {
        return this.request('/funnels', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getSalesFunnels(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        return this.request(`/funnels?${params.toString()}`);
    }
    async getSalesFunnel(id) {
        return this.request(`/funnels/${id}`);
    }
    async updateSalesFunnel(id, data) {
        return this.request(`/funnels/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async deleteSalesFunnel(id) {
        return this.request(`/funnels/${id}`, {
            method: 'DELETE',
        });
    }
    async createIntegration(data) {
        return this.request('/integrations', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getIntegrations() {
        return this.request('/integrations');
    }
    async getIntegration(id) {
        return this.request(`/integrations/${id}`);
    }
    async updateIntegration(id, data) {
        return this.request(`/integrations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async deleteIntegration(id) {
        return this.request(`/integrations/${id}`, {
            method: 'DELETE',
        });
    }
    async syncAnalytics(data) {
        return this.request('/sync', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getAdCampaignStats() {
        return this.request('/stats/overview');
    }
    async uploadMedia(file, onProgress) {
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
                    }
                    catch (error) {
                        reject(new Error('Invalid response format'));
                    }
                }
                else {
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
exports.adCampaignApi = new AdCampaignApi();
//# sourceMappingURL=adCampaignApi.js.map