"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Upload, 
  FileText, 
  Palette, 
  Users, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  ImageIcon,
  Link,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ClientData {
  companyName: string;
  industry: string;
  targetAudience: string;
  brandColors: string[];
  logo: File | null;
  brandGuidelines: File | null;
  socialAccounts: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  goals: string[];
  budget: string;
  timeline: string;
}

const onboardingSteps: OnboardingStep[] = [
  { id: 'company', title: 'Company Information', description: 'Basic company details and contact info', completed: false },
  { id: 'branding', title: 'Brand Identity', description: 'Logo, colors, and brand guidelines', completed: false },
  { id: 'social', title: 'Social Media Accounts', description: 'Connect existing social media profiles', completed: false },
  { id: 'goals', title: 'Marketing Goals', description: 'Define your objectives and timeline', completed: false },
  { id: 'review', title: 'Review & Complete', description: 'Review all information and finish setup', completed: false }
];

const industries = [
  'Personal Injury Law',
  'Corporate Law',
  'Family Law',
  'Criminal Defense',
  'Real Estate Law',
  'Employment Law',
  'Tax Law',
  'Estate Planning',
  'Immigration Law',
  'Other'
];

const targetAudiences = [
  'Small Business Owners',
  'Entrepreneurs',
  'Professionals',
  'Individuals',
  'Families',
  'Corporations',
  'Startups',
  'Other'
];

const marketingGoals = [
  'Increase Brand Awareness',
  'Generate More Leads',
  'Improve Client Engagement',
  'Establish Thought Leadership',
  'Drive Website Traffic',
  'Build Community',
  'Increase Client Retention',
  'Other'
];

const budgets = [
  'Under $500/month',
  '$500-$1,000/month',
  '$1,000-$2,500/month',
  '$2,500-$5,000/month',
  '$5,000+/month'
];

const timelines = [
  'Immediate (This week)',
  'Within 30 days',
  'Within 60 days',
  'Within 90 days',
  'Flexible'
];

export function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [clientData, setClientData] = useState<ClientData>({
    companyName: '',
    industry: '',
    targetAudience: '',
    brandColors: [],
    logo: null,
    brandGuidelines: null,
    socialAccounts: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: ''
    },
    goals: [],
    budget: '',
    timeline: ''
  });

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (field: 'logo' | 'brandGuidelines', file: File) => {
    setClientData(prev => ({ ...prev, [field]: file }));
  };

  const handleColorAdd = (color: string) => {
    if (color && !clientData.brandColors.includes(color)) {
      setClientData(prev => ({ ...prev, brandColors: [...prev.brandColors, color] }));
    }
  };

  const handleColorRemove = (colorToRemove: string) => {
    setClientData(prev => ({ 
      ...prev, 
      brandColors: prev.brandColors.filter(color => color !== colorToRemove) 
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setClientData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Company Information
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., Merkel & Conner Law Firm"
                value={clientData.companyName}
                onChange={(e) => setClientData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Primary Industry *</Label>
              <select
                id="industry"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={clientData.industry}
                onChange={(e) => setClientData(prev => ({ ...prev, industry: e.target.value }))}
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Primary Target Audience *</Label>
              <select
                id="targetAudience"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={clientData.targetAudience}
                onChange={(e) => setClientData(prev => ({ ...prev, targetAudience: e.target.value }))}
              >
                <option value="">Select your target audience</option>
                {targetAudiences.map(audience => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 1: // Brand Identity
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {clientData.logo ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto h-12 w-12 text-green-500" />
                    <p className="text-sm font-medium">{clientData.logo.name}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setClientData(prev => ({ ...prev, logo: null }))}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Upload your company logo</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Brand Colors</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  className="w-16 h-10"
                  onChange={(e) => handleColorAdd(e.target.value)}
                />
                <Input
                  placeholder="e.g., #3B82F6"
                  onChange={(e) => handleColorAdd(e.target.value)}
                />
                <Button onClick={() => handleColorAdd('#3B82F6')}>Add Blue</Button>
              </div>
              {clientData.brandColors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {clientData.brandColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm">{color}</span>
                      <button
                        onClick={() => handleColorRemove(color)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Brand Guidelines (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {clientData.brandGuidelines ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto h-12 w-12 text-green-500" />
                    <p className="text-sm font-medium">{clientData.brandGuidelines.name}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setClientData(prev => ({ ...prev, brandGuidelines: null }))}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Upload brand guidelines document</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('brandGuidelines', e.target.files[0])}
                      className="hidden"
                      id="guidelines-upload"
                    />
                    <label htmlFor="guidelines-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Social Media Accounts
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span>Facebook Page URL</span>
                </Label>
                <Input
                  placeholder="https://facebook.com/yourcompany"
                  value={clientData.socialAccounts.facebook}
                  onChange={(e) => setClientData(prev => ({ 
                    ...prev, 
                    socialAccounts: { ...prev.socialAccounts, facebook: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  <span>Instagram Profile</span>
                </Label>
                <Input
                  placeholder="https://instagram.com/yourcompany"
                  value={clientData.socialAccounts.instagram}
                  onChange={(e) => setClientData(prev => ({ 
                    ...prev, 
                    socialAccounts: { ...prev.socialAccounts, instagram: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  <span>LinkedIn Company Page</span>
                </Label>
                <Input
                  placeholder="https://linkedin.com/company/yourcompany"
                  value={clientData.socialAccounts.linkedin}
                  onChange={(e) => setClientData(prev => ({ 
                    ...prev, 
                    socialAccounts: { ...prev.socialAccounts, linkedin: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span>Twitter Profile</span>
                </Label>
                <Input
                  placeholder="https://twitter.com/yourcompany"
                  value={clientData.socialAccounts.twitter}
                  onChange={(e) => setClientData(prev => ({ 
                    ...prev, 
                    socialAccounts: { ...prev.socialAccounts, twitter: e.target.value }
                  }))}
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> We'll help you connect these accounts securely. You'll be prompted to authorize access to each platform during the next step.
              </p>
            </div>
          </div>
        );

      case 3: // Marketing Goals
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What are your primary marketing goals? (Select all that apply)</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {marketingGoals.map(goal => (
                  <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={clientData.goals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="rounded"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Marketing Budget</Label>
              <select
                id="budget"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={clientData.budget}
                onChange={(e) => setClientData(prev => ({ ...prev, budget: e.target.value }))}
              >
                <option value="">Select your budget range</option>
                {budgets.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">When would you like to start?</Label>
              <select
                id="timeline"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={clientData.timeline}
                onChange={(e) => setClientData(prev => ({ ...prev, timeline: e.target.value }))}
              >
                <option value="">Select your timeline</option>
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4: // Review & Complete
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-800">Ready to Complete Setup!</h3>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Review your information below and click "Complete Setup" to finish onboarding your new client.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Name:</strong> {clientData.companyName}</div>
                  <div><strong>Industry:</strong> {clientData.industry}</div>
                  <div><strong>Target Audience:</strong> {clientData.targetAudience}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Brand Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Logo:</strong> {clientData.logo ? '✓ Uploaded' : 'Not uploaded'}</div>
                  <div><strong>Brand Guidelines:</strong> {clientData.brandGuidelines ? '✓ Uploaded' : 'Not uploaded'}</div>
                  <div><strong>Brand Colors:</strong> {clientData.brandColors.length} selected</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(clientData.socialAccounts).map(([platform, url]) => (
                    <div key={platform}>
                      <strong className="capitalize">{platform}:</strong> {url ? '✓ Connected' : 'Not connected'}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Goals & Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Goals:</strong> {clientData.goals.length} selected</div>
                  <div><strong>Budget:</strong> {clientData.budget}</div>
                  <div><strong>Timeline:</strong> {clientData.timeline}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Client Onboarding</h2>
        <p className="text-muted-foreground">
          Set up your new law firm client in just a few steps
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {onboardingSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>{onboardingSteps[currentStep].title}</span>
          </CardTitle>
          <CardDescription>
            {onboardingSteps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={currentStep === onboardingSteps.length - 1 ? () => console.log('Complete setup') : handleNext}
          disabled={
            (currentStep === 0 && (!clientData.companyName || !clientData.industry || !clientData.targetAudience)) ||
            (currentStep === 1 && !clientData.logo) ||
            (currentStep === 3 && clientData.goals.length === 0)
          }
        >
          {currentStep === onboardingSteps.length - 1 ? (
            <>
              Complete Setup
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

