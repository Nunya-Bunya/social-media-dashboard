const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiService {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return { success: true, data }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // AI Assistant endpoints
  async getAIAssistants() {
    return this.request('/ai-assistants')
  }

  async createAIAssistant(data: any) {
    return this.request('/ai-assistants', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getChatSessions(assistantId: string) {
    return this.request(`/ai-assistants/${assistantId}/chat-sessions`)
  }

  async sendMessage(assistantId: string, sessionId: string, message: string) {
    return this.request(`/ai-assistants/${assistantId}/chat-sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message })
    })
  }

  async generateContent(assistantId: string, type: string, prompt: string) {
    return this.request(`/ai-assistants/${assistantId}/generate-content`, {
      method: 'POST',
      body: JSON.stringify({ type, prompt })
    })
  }

  // Lead Finder endpoints
  async getLeadAgents() {
    return this.request('/lead-agents')
  }

  async createLeadAgent(data: any) {
    return this.request('/lead-agents', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getLeads(filters?: any) {
    const params = filters ? `?${new URLSearchParams(filters).toString()}` : ''
    return this.request(`/leads${params}`)
  }

  async updateLeadStatus(leadId: string, status: string) {
    return this.request(`/leads/${leadId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
  }

  // Cold Call Scraper endpoints
  async startScrapeJob(data: { industry: string; location: string; sources: string[] }) {
    return this.request('/run', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getScrapeJobs() {
    return this.request('/jobs')
  }

  async getScrapedLeads(filters?: any) {
    const params = filters ? `?${new URLSearchParams(filters).toString()}` : ''
    return this.request(`/leads${params}`)
  }

  async exportLeads(format: 'csv' | 'json' = 'csv') {
    return this.request(`/leads/export?format=${format}`)
  }

  async getScraperSources() {
    return this.request('/sources')
  }

  // Test endpoint
  async testConnection() {
    return this.request('/test')
  }

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint)
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    })
  }
}

export const apiService = new ApiService()

// Hook for using API service in components
export const useApi = () => {
  return {
    // AI Assistant
    getAIAssistants: () => apiService.getAIAssistants(),
    createAIAssistant: (data: any) => apiService.createAIAssistant(data),
    getChatSessions: (assistantId: string) => apiService.getChatSessions(assistantId),
    sendMessage: (assistantId: string, sessionId: string, message: string) => 
      apiService.sendMessage(assistantId, sessionId, message),
    generateContent: (assistantId: string, type: string, prompt: string) => 
      apiService.generateContent(assistantId, type, prompt),

    // Lead Finder
    getLeadAgents: () => apiService.getLeadAgents(),
    createLeadAgent: (data: any) => apiService.createLeadAgent(data),
    getLeads: (filters?: any) => apiService.getLeads(filters),
    updateLeadStatus: (leadId: string, status: string) => apiService.updateLeadStatus(leadId, status),

    // Cold Call Scraper
    startScrapeJob: (data: any) => apiService.startScrapeJob(data),
    getScrapeJobs: () => apiService.getScrapeJobs(),
    getScrapedLeads: (filters?: any) => apiService.getScrapedLeads(filters),
    exportLeads: (format?: 'csv' | 'json') => apiService.exportLeads(format),

    // Test
    testConnection: () => apiService.testConnection(),

    // Generic
    get: <T>(endpoint: string) => apiService.get<T>(endpoint),
    post: <T>(endpoint: string, data: any) => apiService.post<T>(endpoint, data),
    put: <T>(endpoint: string, data: any) => apiService.put<T>(endpoint, data),
    patch: <T>(endpoint: string, data: any) => apiService.patch<T>(endpoint, data),
    delete: <T>(endpoint: string) => apiService.delete<T>(endpoint),
  }
}
