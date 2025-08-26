"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  Users, 
  FileText, 
  Star, 
  Building2, 
  Target, 
  TrendingUp, 
  Palette,
  Calendar,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Plus,
  Settings,
  Zap,
  Clock,
  UserCheck,
  AlertTriangle
} from "lucide-react"

interface OnboardingManagementProps {
  selectedCompany: any
}

interface Project {
  id: string
  name: string
  description: string
  type: string
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  timeline: {
    startDate: string
    endDate: string
    estimatedHours: number
  }
  resources: {
    team: string[]
    budget: number
    tools: string[]
  }
  dependencies: string[]
  progress: number
  aiSuggestion: string
}

interface QuestionnaireData {
  businessBasics: {
    companyName: string
    industry: string
    website: string
    location: string
    yearsInBusiness: string
    employeeCount: string
  }
  targetAudience: {
    primaryAudience: string
    ageRange: string
    incomeLevel: string
    interests: string[]
    painPoints: string[]
  }
  competitors: {
    mainCompetitors: string[]
    competitiveAdvantages: string
    marketPosition: string
  }
  brandIdentity: {
    brandValues: string[]
    colorPreferences: string[]
    stylePreferences: string[]
    brandVoice: string
  }
  goals: {
    primaryGoals: string[]
    timeline: string
    budget: string
    successMetrics: string[]
  }
}

function OnboardingManagement({ selectedCompany }: OnboardingManagementProps) {
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [questionnaireStep, setQuestionnaireStep] = useState(1)
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
    businessBasics: {
      companyName: '',
      industry: '',
      website: '',
      location: '',
      yearsInBusiness: '',
      employeeCount: ''
    },
    targetAudience: {
      primaryAudience: '',
      ageRange: '',
      incomeLevel: '',
      interests: [],
      painPoints: []
    },
    competitors: {
      mainCompetitors: [],
      competitiveAdvantages: '',
      marketPosition: ''
    },
    brandIdentity: {
      brandValues: [],
      colorPreferences: [],
      stylePreferences: [],
      brandVoice: ''
    },
    goals: {
      primaryGoals: [],
      timeline: '',
      budget: '',
      successMetrics: []
    }
  })

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Brand Identity Development',
      description: 'Create comprehensive brand identity including logo, style guide, and brand guidelines',
      type: 'Brand Development',
      status: 'pending',
      priority: 'high',
      timeline: {
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        estimatedHours: 40
      },
      resources: {
        team: ['Designer', 'Brand Strategist'],
        budget: 5000,
        tools: ['Figma', 'Adobe Creative Suite']
      },
      dependencies: [],
      progress: 0,
      aiSuggestion: 'Based on your industry and target audience, a strong brand identity will help differentiate you from competitors and build trust with customers.'
    },
    {
      id: '2',
      name: 'Website Redesign',
      description: 'Modernize website with improved UX, SEO optimization, and conversion-focused design',
      type: 'Web Development',
      status: 'pending',
      priority: 'high',
      timeline: {
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        estimatedHours: 80
      },
      resources: {
        team: ['Web Developer', 'UX Designer', 'SEO Specialist'],
        budget: 12000,
        tools: ['WordPress', 'Google Analytics', 'Hotjar']
      },
      dependencies: ['Brand Identity Development'],
      progress: 0,
      aiSuggestion: 'Your current website needs modernization to improve user experience and conversion rates. This should follow brand identity development.'
    },
    {
      id: '3',
      name: 'Social Media Campaign',
      description: 'Launch comprehensive social media presence across key platforms with content strategy',
      type: 'Social Media',
      status: 'pending',
      priority: 'medium',
      timeline: {
        startDate: '2024-03-01',
        endDate: '2024-04-30',
        estimatedHours: 60
      },
      resources: {
        team: ['Social Media Manager', 'Content Creator', 'Photographer'],
        budget: 8000,
        tools: ['Hootsuite', 'Canva', 'Instagram', 'LinkedIn']
      },
      dependencies: ['Brand Identity Development', 'Website Redesign'],
      progress: 0,
      aiSuggestion: 'Social media presence will help you reach your target audience and build brand awareness. Requires brand assets and website content.'
    }
  ])

  const [activeTab, setActiveTab] = useState('overview')

  const updateQuestionnaireData = (section: string, field: string, value: any) => {
    setQuestionnaireData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof QuestionnaireData],
        [field]: value
      }
    }))
  }

  const generateAISuggestions = () => {
    // This would integrate with your AI assistant to generate project suggestions
    // For now, we'll use predefined suggestions based on questionnaire data
    const suggestions = [
      {
        type: 'Brand Development',
        suggestion: 'Based on your industry and target audience, we recommend developing a comprehensive brand identity.',
        priority: 'high',
        estimatedBudget: 5000,
        timeline: '4-6 weeks'
      },
      {
        type: 'Digital Marketing',
        suggestion: 'Your target audience is highly active online. A digital marketing campaign would be highly effective.',
        priority: 'high',
        estimatedBudget: 8000,
        timeline: '8-12 weeks'
      },
      {
        type: 'Content Marketing',
        suggestion: 'Content marketing will help establish thought leadership and attract your target audience.',
        priority: 'medium',
        estimatedBudget: 3000,
        timeline: '6-8 weeks'
      }
    ]
    return suggestions
  }

  const createProjectFromSuggestion = (suggestion: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `${suggestion.type} Project`,
      description: suggestion.suggestion,
      type: suggestion.type,
      status: 'pending',
      priority: suggestion.priority,
      timeline: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        estimatedHours: 40
      },
      resources: {
        team: ['Project Manager', 'Specialist'],
        budget: suggestion.estimatedBudget,
        tools: ['Project Management Tool']
      },
      dependencies: [],
      progress: 0,
      aiSuggestion: suggestion.suggestion
    }
    setProjects(prev => [...prev, newProject])
  }

  const questionnaireSteps = [
    {
      title: 'Business Basics',
      fields: [
        { name: 'companyName', label: 'Company Name', type: 'text' },
        { name: 'industry', label: 'Industry', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Services', 'Other'] },
        { name: 'website', label: 'Website', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'yearsInBusiness', label: 'Years in Business', type: 'select', options: ['0-1', '1-3', '3-5', '5-10', '10+'] },
        { name: 'employeeCount', label: 'Number of Employees', type: 'select', options: ['1-10', '11-50', '51-200', '201-500', '500+'] }
      ]
    },
    {
      title: 'Target Audience',
      fields: [
        { name: 'primaryAudience', label: 'Primary Target Audience', type: 'text' },
        { name: 'ageRange', label: 'Age Range', type: 'select', options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
        { name: 'incomeLevel', label: 'Income Level', type: 'select', options: ['Under $30k', '$30k-$50k', '$50k-$75k', '$75k-$100k', '$100k+'] },
        { name: 'interests', label: 'Key Interests', type: 'multiselect', options: ['Technology', 'Health & Wellness', 'Travel', 'Food & Dining', 'Fashion', 'Sports', 'Entertainment', 'Business', 'Education'] },
        { name: 'painPoints', label: 'Pain Points', type: 'textarea' }
      ]
    },
    {
      title: 'Competitive Analysis',
      fields: [
        { name: 'mainCompetitors', label: 'Main Competitors', type: 'textarea' },
        { name: 'competitiveAdvantages', label: 'Competitive Advantages', type: 'textarea' },
        { name: 'marketPosition', label: 'Market Position', type: 'select', options: ['Market Leader', 'Challenger', 'Niche Player', 'New Entrant'] }
      ]
    },
    {
      title: 'Brand Identity',
      fields: [
        { name: 'brandValues', label: 'Brand Values', type: 'multiselect', options: ['Innovation', 'Quality', 'Trust', 'Sustainability', 'Customer Focus', 'Excellence', 'Integrity', 'Creativity'] },
        { name: 'colorPreferences', label: 'Color Preferences', type: 'multiselect', options: ['Blue', 'Green', 'Red', 'Purple', 'Orange', 'Yellow', 'Black', 'White', 'Gray'] },
        { name: 'stylePreferences', label: 'Style Preferences', type: 'multiselect', options: ['Modern', 'Classic', 'Minimalist', 'Bold', 'Professional', 'Creative', 'Luxury', 'Casual'] },
        { name: 'brandVoice', label: 'Brand Voice', type: 'select', options: ['Professional', 'Friendly', 'Authoritative', 'Creative', 'Casual', 'Luxury'] }
      ]
    },
    {
      title: 'Goals & Budget',
      fields: [
        { name: 'primaryGoals', label: 'Primary Goals', type: 'multiselect', options: ['Increase Brand Awareness', 'Generate Leads', 'Improve Website Traffic', 'Boost Sales', 'Enhance Customer Engagement', 'Launch New Product', 'Enter New Market'] },
        { name: 'timeline', label: 'Project Timeline', type: 'select', options: ['1-3 months', '3-6 months', '6-12 months', '12+ months'] },
        { name: 'budget', label: 'Budget Range', type: 'select', options: ['Under $5k', '$5k-$10k', '$10k-$25k', '$25k-$50k', '$50k+'] },
        { name: 'successMetrics', label: 'Success Metrics', type: 'multiselect', options: ['Website Traffic', 'Lead Generation', 'Sales Increase', 'Brand Recognition', 'Social Media Engagement', 'Customer Satisfaction'] }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">23</div>
                <div className="text-blue-400 text-sm">In onboarding process</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-200">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">147</div>
                <div className="text-green-400 text-sm">This quarter</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Avg. Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12 days</div>
                <div className="text-purple-400 text-sm">To completion</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-200">Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">4.8/5</div>
                <div className="text-orange-400 text-sm">Client rating</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Onboarding Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { client: "TechStart Inc.", step: "Package Selection", progress: 25, status: "active" },
                    { client: "Local Bakery", step: "Brand Assets", progress: 60, status: "active" },
                    { client: "Fitness Studio", step: "Questionnaire", progress: 85, status: "active" },
                    { client: "Law Firm", step: "Review & Launch", progress: 95, status: "review" },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-medium">{item.client}</div>
                        <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">Current: {item.step}</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.progress} className="flex-1 h-2" />
                        <span className="text-xs text-gray-400">{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Onboarding Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Package Selection",
                      description: "Choose service package",
                      icon: <FileText className="w-5 h-5" />,
                      completed: true,
                    },
                    {
                      step: 2,
                      title: "Brand Assets",
                      description: "Upload logos and materials",
                      icon: <Star className="w-5 h-5" />,
                      completed: true,
                    },
                    {
                      step: 3,
                      title: "Business Questionnaire",
                      description: "Complete business profile",
                      icon: <Users className="w-5 h-5" />,
                      completed: false,
                    },
                    {
                      step: 4,
                      title: "Review & Launch",
                      description: "Final review and go-live",
                      icon: <CheckCircle className="w-5 h-5" />,
                      completed: false,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${item.completed ? "bg-green-900/20 border-green-500/30" : onboardingStep === item.step ? "bg-purple-900/20 border-purple-500/30" : "bg-gray-800/50 border-gray-600/30"}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${item.completed ? "bg-green-600" : onboardingStep === item.step ? "bg-purple-600" : "bg-gray-600"}`}
                        >
                          {item.completed ? <CheckCircle className="w-4 h-4 text-white" /> : item.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            Step {item.step}: {item.title}
                          </div>
                          <div className="text-gray-400 text-sm">{item.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questionnaire" className="space-y-6">
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Questionnaire - Step {questionnaireStep} of {questionnaireSteps.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={(questionnaireStep / questionnaireSteps.length) * 100} className="h-2" />
                <div className="text-sm text-gray-400 mt-2">
                  {questionnaireSteps[questionnaireStep - 1]?.title}
                </div>
              </div>

              <div className="space-y-6">
                {questionnaireSteps[questionnaireStep - 1]?.fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium text-white">{field.label}</label>
                                         {field.type === 'text' && (
                       <Input
                         value={(questionnaireData as any)[questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', '')]?.[field.name] || ''}
                         onChange={(e) => updateQuestionnaireData(
                           questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', ''),
                           field.name,
                           e.target.value
                         )}
                         className="bg-gray-800 border-gray-600 text-white"
                       />
                     )}
                     {field.type === 'textarea' && (
                       <Textarea
                         value={(questionnaireData as any)[questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', '')]?.[field.name] || ''}
                         onChange={(e) => updateQuestionnaireData(
                           questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', ''),
                           field.name,
                           e.target.value
                         )}
                         className="bg-gray-800 border-gray-600 text-white"
                         rows={3}
                       />
                     )}
                     {field.type === 'select' && (
                       <Select
                         value={(questionnaireData as any)[questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', '')]?.[field.name] || ''}
                         onValueChange={(value) => updateQuestionnaireData(
                           questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', ''),
                           field.name,
                           value
                         )}
                       >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option} className="text-white">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                                         {field.type === 'multiselect' && (
                       <div className="space-y-2">
                         {field.options?.map((option) => (
                           <div key={option} className="flex items-center space-x-2">
                             <Checkbox
                               id={option}
                               checked={(questionnaireData as any)[questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', '')]?.[field.name]?.includes(option)}
                               onCheckedChange={(checked) => {
                                 const currentValues = (questionnaireData as any)[questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', '')]?.[field.name] || []
                                 const newValues = checked 
                                   ? [...currentValues, option]
                                   : currentValues.filter((v: string) => v !== option)
                                 updateQuestionnaireData(
                                   questionnaireSteps[questionnaireStep - 1].title.toLowerCase().replace(' ', ''),
                                   field.name,
                                   newValues
                                 )
                               }}
                             />
                             <label htmlFor={option} className="text-sm text-gray-300">{option}</label>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setQuestionnaireStep(Math.max(1, questionnaireStep - 1))}
                  disabled={questionnaireStep === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (questionnaireStep < questionnaireSteps.length) {
                      setQuestionnaireStep(questionnaireStep + 1)
                    } else {
                      setActiveTab('ai-suggestions')
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {questionnaireStep < questionnaireSteps.length ? (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Complete & Generate AI Suggestions
                      <Zap className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Project Management</h2>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-black/40 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{project.name}</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                    </div>
                    <Badge 
                      variant={project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'}
                      className="ml-2"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <div className="text-white">{project.timeline.startDate} - {project.timeline.endDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Budget:</span>
                        <div className="text-white">${project.resources.budget.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Team:</span>
                      <div className="flex gap-1">
                        {project.resources.team.map((member, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.dependencies.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-500">Depends on: {project.dependencies.join(', ')}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Timeline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-suggestions" className="space-y-6">
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI-Generated Project Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {generateAISuggestions().map((suggestion, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-600">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{suggestion.type}</CardTitle>
                          <p className="text-gray-400 text-sm mt-1">{suggestion.suggestion}</p>
                        </div>
                        <Badge 
                          variant={suggestion.priority === 'high' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {suggestion.priority} priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-400">Budget:</span>
                          <div className="text-white">${suggestion.estimatedBudget.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Timeline:</span>
                          <div className="text-white">{suggestion.timeline}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Team Required:</span>
                          <div className="text-white">2-3 members</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => createProjectFromSuggestion(suggestion)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Project
                        </Button>
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OnboardingManagement
