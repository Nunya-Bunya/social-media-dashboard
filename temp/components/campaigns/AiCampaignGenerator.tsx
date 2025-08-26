import React, { useState } from 'react';
import { 
  SparklesIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { GenerateCampaignRequest, GeneratedCampaignPlan } from '../../types/campaigns';

interface AiCampaignGeneratorProps {
  tenantId: string;
  onCampaignGenerated: (campaign: GeneratedCampaignPlan) => void;
  onClose: () => void;
}

const AiCampaignGenerator: React.FC<AiCampaignGeneratorProps> = ({
  tenantId,
  onCampaignGenerated,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedCampaignPlan | null>(null);
  
  const [formData, setFormData] = useState<GenerateCampaignRequest>({
    clientName: '',
    businessType: '',
    targetAudience: '',
    primaryGoal: 'BRAND_AWARENESS',
    additionalGoals: [],
    budgetRange: 'MEDIUM',
    preferredPlatforms: [],
    timeline: '90 days',
    existingAssets: '',
    brandId: '',
    additionalContext: {}
  });

  const campaignGoals = [
    { value: 'BRAND_AWARENESS', label: 'Brand Awareness', description: 'Increase brand recognition and visibility' },
    { value: 'LEAD_GENERATION', label: 'Lead Generation', description: 'Generate qualified leads and prospects' },
    { value: 'SEO_RANKING', label: 'SEO Ranking', description: 'Improve search engine rankings and organic traffic' },
    { value: 'SALES_CONVERSION', label: 'Sales Conversion', description: 'Drive sales and revenue growth' },
    { value: 'CUSTOMER_RETENTION', label: 'Customer Retention', description: 'Keep existing customers engaged and loyal' },
    { value: 'TRAFFIC_DRIVE', label: 'Traffic Drive', description: 'Increase website and social media traffic' },
    { value: 'ENGAGEMENT_BOOST', label: 'Engagement Boost', description: 'Improve audience engagement and interaction' },
    { value: 'REPUTATION_MANAGEMENT', label: 'Reputation Management', description: 'Build and protect brand reputation' }
  ];

  const budgetRanges = [
    { value: 'LOW', label: 'Low ($1,000 - $3,000)', description: 'Basic campaigns with limited reach' },
    { value: 'MEDIUM', label: 'Medium ($3,000 - $8,000)', description: 'Standard campaigns with good reach' },
    { value: 'HIGH', label: 'High ($8,000+)', description: 'Premium campaigns with maximum reach' }
  ];

  const platforms = [
    'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'Twitter', 'YouTube',
    'Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads',
    'Email Marketing', 'SEO', 'Content Marketing', 'Print Media',
    'Video Content', 'Influencer Marketing', 'PR & Media'
  ];

  const timelines = [
    '30 days', '60 days', '90 days', '6 months', '1 year', 'Ongoing'
  ];

  const handleInputChange = (field: keyof GenerateCampaignRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    if (goal === formData.primaryGoal) return;
    
    setFormData(prev => ({
      ...prev,
      primaryGoal: goal as any,
      additionalGoals: prev.additionalGoals.filter(g => g !== goal)
    }));
  };

  const handleAdditionalGoalToggle = (goal: string) => {
    if (goal === formData.primaryGoal) return;
    
    setFormData(prev => ({
      ...prev,
      additionalGoals: prev.additionalGoals.includes(goal as any)
        ? prev.additionalGoals.filter(g => g !== goal)
        : [...prev.additionalGoals, goal as any]
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      preferredPlatforms: prev.preferredPlatforms.includes(platform)
        ? prev.preferredPlatforms.filter(p => p !== platform)
        : [...prev.preferredPlatforms, platform]
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.clientName || !formData.businessType || !formData.targetAudience) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.preferredPlatforms.length === 0) {
      setError('Please select at least one platform');
      return false;
    }
    return true;
  };

  const generateCampaign = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/campaigns/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedPlan(result.campaignPlan);
        setStep(3);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate campaign');
      }
    } catch (error) {
      setError('An error occurred while generating the campaign');
      console.error('Error generating campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsePlan = () => {
    if (generatedPlan) {
      onCampaignGenerated(generatedPlan);
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <p className="mt-1 text-sm text-gray-500">Tell us about your client and business</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client Name *</label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter client name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Type/Industry *</label>
          <input
            type="text"
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., E-commerce, SaaS, Restaurant"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Audience *</label>
        <textarea
          value={formData.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your ideal customer (age, interests, pain points, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Timeline</label>
        <select
          value={formData.timeline}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {timelines.map(timeline => (
            <option key={timeline} value={timeline}>{timeline}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Campaign Strategy</h3>
        <p className="mt-1 text-sm text-gray-500">Define your goals and platform preferences</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Primary Goal *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campaignGoals.map(goal => (
            <button
              key={goal.value}
              type="button"
              onClick={() => handleGoalToggle(goal.value)}
              className={`p-4 text-left border rounded-lg transition-colors ${
                formData.primaryGoal === goal.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{goal.label}</div>
              <div className="text-sm text-gray-500 mt-1">{goal.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Additional Goals</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campaignGoals
            .filter(goal => goal.value !== formData.primaryGoal)
            .map(goal => (
              <button
                key={goal.value}
                type="button"
                onClick={() => handleAdditionalGoalToggle(goal.value)}
                className={`p-4 text-left border rounded-lg transition-colors ${
                  formData.additionalGoals.includes(goal.value as any)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{goal.label}</div>
                <div className="text-sm text-gray-500 mt-1">{goal.description}</div>
              </button>
            ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range *</label>
        <div className="space-y-3">
          {budgetRanges.map(budget => (
            <button
              key={budget.value}
              type="button"
              onClick={() => handleInputChange('budgetRange', budget.value)}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                formData.budgetRange === budget.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{budget.label}</div>
              <div className="text-sm text-gray-500">{budget.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Platforms *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {platforms.map(platform => (
            <button
              key={platform}
              type="button"
              onClick={() => handlePlatformToggle(platform)}
              className={`p-3 text-sm border rounded-lg transition-colors ${
                formData.preferredPlatforms.includes(platform)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Existing Assets (Optional)</label>
        <textarea
          value={formData.existingAssets}
          onChange={(e) => handleInputChange('existingAssets', e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe any existing marketing materials, brand guidelines, or assets"
        />
      </div>
    </div>
  );

  const renderGeneratedPlan = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Campaign Generated!</h3>
        <p className="mt-1 text-sm text-gray-500">Your AI-powered campaign plan is ready</p>
      </div>

      {generatedPlan && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">{generatedPlan.campaignName}</h4>
            <p className="text-sm text-gray-600">{generatedPlan.tagline}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Target Audience</h5>
              <p className="text-sm text-gray-600">{generatedPlan.audience.profile}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Platforms</h5>
              <p className="text-sm text-gray-600">{generatedPlan.strategy.platforms.join(', ')}</p>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-2">Timeline</h5>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Phase 1:</span> {generatedPlan.timeline.phase1}
              </div>
              <div className="text-sm">
                <span className="font-medium">Phase 2:</span> {generatedPlan.timeline.phase2}
              </div>
              <div className="text-sm">
                <span className="font-medium">Phase 3:</span> {generatedPlan.timeline.phase3}
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-2">Budget</h5>
            <p className="text-sm text-gray-600">${generatedPlan.budget.total.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={handleUsePlan}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Use This Plan
        </button>
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Generate New Plan
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">AI Campaign Generator</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-0.5 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-96">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderGeneratedPlan()}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={generateCampaign}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4" />
                    <span>Generate Campaign</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiCampaignGenerator;
