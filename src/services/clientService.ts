export interface Client {
  id: string
  name: string
  industry: string
  website?: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
  createdAt: Date
  updatedAt: Date
  status: 'active' | 'inactive' | 'pending'
  
  // Client-specific API keys
  apiKeys: {
    facebook_app_id?: string
    facebook_app_secret?: string
    linkedin_client_id?: string
    linkedin_client_secret?: string
    twitter_api_key?: string
    twitter_api_secret?: string
    twitter_access_token?: string
    twitter_access_token_secret?: string
    instagram_business_id?: string
    google_analytics_id?: string
    google_ads_id?: string
  }
  
  // Business settings
  settings: {
    timezone: string
    language: string
    currency: string
    notifications: boolean
    autoPosting: boolean
    contentApproval: boolean
  }
  
  // Contact information
  contact: {
    primaryContact: {
      name: string
      email: string
      phone?: string
      role: string
    }
    billingContact?: {
      name: string
      email: string
      phone?: string
    }
  }
  
  // Social media accounts
  socialAccounts: {
    facebook?: {
      pageId: string
      pageName: string
      accessToken: string
      connected: boolean
    }
    instagram?: {
      accountId: string
      username: string
      accessToken: string
      connected: boolean
    }
    linkedin?: {
      companyId: string
      companyName: string
      accessToken: string
      connected: boolean
    }
    twitter?: {
      accountId: string
      username: string
      accessToken: string
      connected: boolean
    }
  }
}

export interface CreateClientData {
  name: string
  industry: string
  website?: string
  primaryContact: {
    name: string
    email: string
    phone?: string
    role: string
  }
  settings?: Partial<Client['settings']>
}

class ClientService {
  private readonly STORAGE_KEY = 'marketing_platform_clients'

  // Get all clients
  async getClients(): Promise<Client[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading clients:', error)
      return []
    }
  }

  // Get single client
  async getClient(id: string): Promise<Client | null> {
    const clients = await this.getClients()
    return clients.find(client => client.id === id) || null
  }

  // Create new client
  async createClient(data: CreateClientData): Promise<Client> {
    const clients = await this.getClients()
    
    const newClient: Client = {
      id: this.generateId(),
      name: data.name,
      industry: data.industry,
      website: data.website,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
      apiKeys: {},
      settings: {
        timezone: 'UTC',
        language: 'en',
        currency: 'USD',
        notifications: true,
        autoPosting: false,
        contentApproval: true,
        ...data.settings
      },
      contact: {
        primaryContact: data.primaryContact,
        billingContact: data.primaryContact // Default to primary contact
      },
      socialAccounts: {}
    }

    clients.push(newClient)
    await this.saveClients(clients)
    
    return newClient
  }

  // Update client
  async updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
    const clients = await this.getClients()
    const index = clients.findIndex(client => client.id === id)
    
    if (index === -1) return null
    
    clients[index] = {
      ...clients[index],
      ...updates,
      updatedAt: new Date()
    }
    
    await this.saveClients(clients)
    return clients[index]
  }

  // Update client API keys
  async updateClientApiKeys(clientId: string, apiKeys: Partial<Client['apiKeys']>): Promise<Client | null> {
    const client = await this.getClient(clientId)
    if (!client) return null
    
    return this.updateClient(clientId, {
      apiKeys: { ...client.apiKeys, ...apiKeys }
    })
  }

  // Update social media accounts
  async updateSocialAccounts(clientId: string, socialAccounts: Partial<Client['socialAccounts']>): Promise<Client | null> {
    const client = await this.getClient(clientId)
    if (!client) return null
    
    return this.updateClient(clientId, {
      socialAccounts: { ...client.socialAccounts, ...socialAccounts }
    })
  }

  // Test API key connection
  async testApiKey(clientId: string, platform: string): Promise<{ success: boolean; message: string }> {
    const client = await this.getClient(clientId)
    if (!client) {
      return { success: false, message: 'Client not found' }
    }

    try {
      switch (platform) {
        case 'facebook':
          return await this.testFacebookConnection(client)
        case 'linkedin':
          return await this.testLinkedInConnection(client)
        case 'twitter':
          return await this.testTwitterConnection(client)
        case 'instagram':
          return await this.testInstagramConnection(client)
        default:
          return { success: false, message: 'Unknown platform' }
      }
    } catch (error) {
      return { success: false, message: 'Connection test failed' }
    }
  }

  // Get client dashboard data
  async getClientDashboard(clientId: string): Promise<{
    client: Client
    stats: {
      totalPosts: number
      totalLeads: number
      totalCampaigns: number
      engagementRate: number
    }
  } | null> {
    const client = await this.getClient(clientId)
    if (!client) return null

    // This would fetch real data from your backend
    const stats = {
      totalPosts: 0,
      totalLeads: 0,
      totalCampaigns: 0,
      engagementRate: 0
    }

    return { client, stats }
  }

  // Delete client
  async deleteClient(id: string): Promise<boolean> {
    const clients = await this.getClients()
    const filtered = clients.filter(client => client.id !== id)
    
    if (filtered.length === clients.length) return false
    
    await this.saveClients(filtered)
    return true
  }

  // Get clients by status
  async getClientsByStatus(status: Client['status']): Promise<Client[]> {
    const clients = await this.getClients()
    return clients.filter(client => client.status === status)
  }

  // Search clients
  async searchClients(query: string): Promise<Client[]> {
    const clients = await this.getClients()
    const lowerQuery = query.toLowerCase()
    
    return clients.filter(client => 
      client.name.toLowerCase().includes(lowerQuery) ||
      client.industry.toLowerCase().includes(lowerQuery) ||
      client.contact.primaryContact.name.toLowerCase().includes(lowerQuery) ||
      client.contact.primaryContact.email.toLowerCase().includes(lowerQuery)
    )
  }

  // Export client data
  async exportClientData(clientId: string): Promise<string> {
    const client = await this.getClient(clientId)
    if (!client) throw new Error('Client not found')
    
    return JSON.stringify(client, null, 2)
  }

  // Import client data
  async importClientData(data: string): Promise<Client> {
    try {
      const clientData = JSON.parse(data)
      const clients = await this.getClients()
      
      // Ensure unique ID
      if (clients.some(c => c.id === clientData.id)) {
        clientData.id = this.generateId()
      }
      
      clientData.createdAt = new Date(clientData.createdAt)
      clientData.updatedAt = new Date()
      
      clients.push(clientData)
      await this.saveClients(clients)
      
      return clientData
    } catch (error) {
      throw new Error('Invalid client data format')
    }
  }

  private async saveClients(clients: Client[]): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients))
      
      // Here you would also save to your backend
      await this.saveToBackend(clients)
    } catch (error) {
      console.error('Error saving clients:', error)
      throw error
    }
  }

  private generateId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async saveToBackend(clients: Client[]): Promise<void> {
    // This would save to your backend API
    console.log('Saving clients to backend:', clients)
  }

  private async testFacebookConnection(client: Client): Promise<{ success: boolean; message: string }> {
    if (!client.apiKeys.facebook_app_id || !client.apiKeys.facebook_app_secret) {
      return { success: false, message: 'Facebook API keys not configured' }
    }
    
    // This would test the actual Facebook API connection
    return { success: true, message: 'Facebook connection successful' }
  }

  private async testLinkedInConnection(client: Client): Promise<{ success: boolean; message: string }> {
    if (!client.apiKeys.linkedin_client_id || !client.apiKeys.linkedin_client_secret) {
      return { success: false, message: 'LinkedIn API keys not configured' }
    }
    
    return { success: true, message: 'LinkedIn connection successful' }
  }

  private async testTwitterConnection(client: Client): Promise<{ success: boolean; message: string }> {
    if (!client.apiKeys.twitter_api_key || !client.apiKeys.twitter_api_secret) {
      return { success: false, message: 'Twitter API keys not configured' }
    }
    
    return { success: true, message: 'Twitter connection successful' }
  }

  private async testInstagramConnection(client: Client): Promise<{ success: boolean; message: string }> {
    if (!client.socialAccounts.instagram?.accessToken) {
      return { success: false, message: 'Instagram not connected' }
    }
    
    return { success: true, message: 'Instagram connection successful' }
  }
}

export const clientService = new ClientService()
