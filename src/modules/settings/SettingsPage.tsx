import { useState } from 'react'
import { 
  Save, 
  Eye, 
  EyeOff, 
  Key, 
  Globe, 
  MessageSquare, 
  Share2, 
  Database,
  Cloud,
  Bot,
  Settings as SettingsIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  value: string
  isVisible: boolean
  category: 'social' | 'ai' | 'database' | 'storage'
  description: string
  required: boolean
  placeholder: string
}

export function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
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
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const toggleVisibility = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, isVisible: !key.isVisible } : key
    ))
  }

  const updateApiKey = (id: string, value: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, value } : key
    ))
  }

  const saveSettings = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would actually save to your backend
      console.log('Saving API keys:', apiKeys)
      
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <Share2 className="w-5 h-5" />
      case 'ai': return <Bot className="w-5 h-5" />
      case 'database': return <Database className="w-5 h-5" />
      case 'storage': return <Cloud className="w-5 h-5" />
      default: return <Key className="w-5 h-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'social': return 'Social Media'
      case 'ai': return 'AI Services'
      case 'database': return 'Database'
      case 'storage': return 'Storage'
      default: return 'Other'
    }
  }

  const groupedKeys = apiKeys.reduce((acc, key) => {
    if (!acc[key.category]) acc[key.category] = []
    acc[key.category].push(key)
    return acc
  }, {} as Record<string, ApiKey[]>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure API keys and integrations for your marketing platform
        </p>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">Settings saved successfully!</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">Error saving settings. Please try again.</span>
        </div>
      )}

      {/* API Keys Configuration */}
      <div className="space-y-8">
        {Object.entries(groupedKeys).map(([category, keys]) => (
          <div key={category} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              {getCategoryIcon(category)}
              <h2 className="text-xl font-semibold">{getCategoryName(category)}</h2>
            </div>
            
            <div className="space-y-4">
              {keys.map((apiKey) => (
                <div key={apiKey.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {apiKey.name}
                        {apiKey.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <p className="text-xs text-muted-foreground">{apiKey.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={apiKey.isVisible ? 'text' : 'password'}
                      value={apiKey.value}
                      onChange={(e) => updateApiKey(apiKey.id, e.target.value)}
                      placeholder={apiKey.placeholder}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility(apiKey.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded"
                    >
                      {apiKey.isVisible ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">How to Get Your API Keys</h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Facebook/Instagram</h4>
            <p>1. Go to <a href="https://developers.facebook.com" className="text-primary hover:underline">Facebook Developers</a></p>
            <p>2. Create a new app or use existing app</p>
            <p>3. Get App ID and App Secret from Settings → Basic</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">LinkedIn</h4>
            <p>1. Go to <a href="https://www.linkedin.com/developers" className="text-primary hover:underline">LinkedIn Developers</a></p>
            <p>2. Create a new app</p>
            <p>3. Get Client ID and Client Secret from Auth tab</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">OpenAI</h4>
            <p>1. Go to <a href="https://platform.openai.com/api-keys" className="text-primary hover:underline">OpenAI API Keys</a></p>
            <p>2. Create a new API key</p>
            <p>3. Copy the key (starts with sk-)</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Supabase</h4>
            <p>1. Go to your <a href="https://supabase.com" className="text-primary hover:underline">Supabase project</a></p>
            <p>2. Navigate to Settings → API</p>
            <p>3. Copy Project URL, anon key, and service role key</p>
          </div>
        </div>
      </div>
    </div>
  )
}
