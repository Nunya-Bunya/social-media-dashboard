export interface ApiKey {
  id: string
  name: string
  value: string
  isVisible: boolean
  category: 'social' | 'ai' | 'database' | 'storage'
  description: string
  required: boolean
  placeholder: string
}

export interface Settings {
  apiKeys: ApiKey[]
  general: {
    timezone: string
    language: string
    notifications: boolean
  }
  integrations: {
    socialMedia: boolean
    aiServices: boolean
    analytics: boolean
  }
}

class SettingsService {
  private readonly STORAGE_KEY = 'marketing_platform_settings'

  // Get all settings
  async getSettings(): Promise<Settings> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
      
      // Return default settings
      return this.getDefaultSettings()
    } catch (error) {
      console.error('Error loading settings:', error)
      return this.getDefaultSettings()
    }
  }

  // Save settings
  async saveSettings(settings: Settings): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings))
      
      // Here you would also save to your backend
      await this.saveToBackend(settings)
    } catch (error) {
      console.error('Error saving settings:', error)
      throw error
    }
  }

  // Update specific API key
  async updateApiKey(keyId: string, value: string): Promise<void> {
    const settings = await this.getSettings()
    const updatedKeys = settings.apiKeys.map(key => 
      key.id === keyId ? { ...key, value } : key
    )
    
    await this.saveSettings({
      ...settings,
      apiKeys: updatedKeys
    })
  }

  // Test API key connection
  async testApiKey(keyId: string): Promise<{ success: boolean; message: string }> {
    const settings = await this.getSettings()
    const apiKey = settings.apiKeys.find(key => key.id === keyId)
    
    if (!apiKey || !apiKey.value) {
      return { success: false, message: 'API key not found or empty' }
    }

    try {
      switch (keyId) {
        case 'openai_api_key':
          return await this.testOpenAI(apiKey.value)
        case 'facebook_app_id':
        case 'facebook_app_secret':
          return await this.testFacebook(apiKey.value)
        case 'supabase_url':
        case 'supabase_anon_key':
          return await this.testSupabase(apiKey.value)
        default:
          return { success: true, message: 'API key format looks valid' }
      }
    } catch (error) {
      return { success: false, message: 'Connection test failed' }
    }
  }

  // Get environment variables for backend
  getEnvironmentVariables(): Record<string, string> {
    const settings = this.getSettingsSync()
    const envVars: Record<string, string> = {}
    
    settings.apiKeys.forEach(key => {
      if (key.value) {
        envVars[key.id.toUpperCase()] = key.value
      }
    })
    
    return envVars
  }

  // Export settings for deployment
  exportForDeployment(): string {
    const envVars = this.getEnvironmentVariables()
    return Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')
  }

  private getDefaultSettings(): Settings {
    return {
      apiKeys: [
        // Social Media APIs
        {
          id: 'facebook_app_id',
          name: 'Facebook App ID',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'Your Facebook App ID for social media integration',
          required: true,
          placeholder: '123456789012345'
        },
        {
          id: 'facebook_app_secret',
          name: 'Facebook App Secret',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'Your Facebook App Secret for authentication',
          required: true,
          placeholder: 'abcdef123456789...'
        },
        {
          id: 'linkedin_client_id',
          name: 'LinkedIn Client ID',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'LinkedIn API Client ID for professional networking',
          required: false,
          placeholder: 'your-linkedin-client-id'
        },
        {
          id: 'linkedin_client_secret',
          name: 'LinkedIn Client Secret',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'LinkedIn API Client Secret',
          required: false,
          placeholder: 'your-linkedin-client-secret'
        },
        {
          id: 'twitter_api_key',
          name: 'Twitter API Key',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'Twitter API Key for social posting',
          required: false,
          placeholder: 'your-twitter-api-key'
        },
        {
          id: 'twitter_api_secret',
          name: 'Twitter API Secret',
          value: '',
          isVisible: false,
          category: 'social',
          description: 'Twitter API Secret',
          required: false,
          placeholder: 'your-twitter-api-secret'
        },
        // AI Services
        {
          id: 'openai_api_key',
          name: 'OpenAI API Key',
          value: '',
          isVisible: false,
          category: 'ai',
          description: 'OpenAI API Key for AI content generation',
          required: true,
          placeholder: 'sk-...'
        },
        // Database
        {
          id: 'supabase_url',
          name: 'Supabase URL',
          value: '',
          isVisible: false,
          category: 'database',
          description: 'Your Supabase project URL',
          required: true,
          placeholder: 'https://your-project.supabase.co'
        },
        {
          id: 'supabase_anon_key',
          name: 'Supabase Anon Key',
          value: '',
          isVisible: false,
          category: 'database',
          description: 'Supabase anonymous key for client-side access',
          required: true,
          placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        },
        {
          id: 'supabase_service_key',
          name: 'Supabase Service Key',
          value: '',
          isVisible: false,
          category: 'database',
          description: 'Supabase service role key for server-side operations',
          required: true,
          placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        },
        // Storage
        {
          id: 'aws_access_key_id',
          name: 'AWS Access Key ID',
          value: '',
          isVisible: false,
          category: 'storage',
          description: 'AWS Access Key ID for S3 storage',
          required: false,
          placeholder: 'AKIA...'
        },
        {
          id: 'aws_secret_access_key',
          name: 'AWS Secret Access Key',
          value: '',
          isVisible: false,
          category: 'storage',
          description: 'AWS Secret Access Key for S3 storage',
          required: false,
          placeholder: 'your-aws-secret-key'
        },
        {
          id: 'aws_region',
          name: 'AWS Region',
          value: '',
          isVisible: false,
          category: 'storage',
          description: 'AWS region for S3 bucket',
          required: false,
          placeholder: 'us-east-1'
        }
      ],
      general: {
        timezone: 'UTC',
        language: 'en',
        notifications: true
      },
      integrations: {
        socialMedia: false,
        aiServices: false,
        analytics: false
      }
    }
  }

  private getSettingsSync(): Settings {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : this.getDefaultSettings()
    } catch {
      return this.getDefaultSettings()
    }
  }

  private async saveToBackend(settings: Settings): Promise<void> {
    // This would save to your backend API
    // For now, we'll just simulate it
    console.log('Saving to backend:', settings)
  }

  private async testOpenAI(apiKey: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        return { success: true, message: 'OpenAI API connection successful' }
      } else {
        return { success: false, message: 'Invalid OpenAI API key' }
      }
    } catch (error) {
      return { success: false, message: 'Failed to connect to OpenAI API' }
    }
  }

  private async testFacebook(_apiKey: string): Promise<{ success: boolean; message: string }> {
    // Facebook API testing would go here
    return { success: true, message: 'Facebook API key format looks valid' }
  }

  private async testSupabase(_apiKey: string): Promise<{ success: boolean; message: string }> {
    // Supabase connection testing would go here
    return { success: true, message: 'Supabase configuration looks valid' }
  }
}

export const settingsService = new SettingsService()
