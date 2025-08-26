"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles,
  FileText,
  Copy,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Shield,
  Scale,
  Building2,
  Gavel,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Brain,
  Palette
} from 'lucide-react';

interface ContentTemplate {
  id: string;
  type: string;
  title: string;
  description: string;
  category: 'educational' | 'engagement' | 'branding' | 'news' | 'client-stories';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  platforms: string[];
  template: string;
  variables: string[];
  aiPrompt: string;
}

interface GeneratedContent {
  id: string;
  templateId: string;
  content: string;
  platforms: string[];
  status: 'draft' | 'ready' | 'scheduled' | 'published';
  createdAt: string;
  aiGenerated: boolean;
}

const contentTemplates: ContentTemplate[] = [
  // Educational Content
  {
    id: '1',
    type: 'Legal Tips',
    title: 'Legal Tips for Small Business Owners',
    description: 'Share practical legal advice that helps entrepreneurs avoid common pitfalls',
    category: 'educational',
    difficulty: 'easy',
    estimatedTime: '15 minutes',
    platforms: ['linkedin', 'facebook', 'twitter'],
    template: '💡 Legal Tip: [TIP_SUMMARY]\n\n[EXPLANATION]\n\nWhy this matters: [BENEFIT]\n\nNeed help? [CALL_TO_ACTION]',
    variables: ['TIP_SUMMARY', 'EXPLANATION', 'BENEFIT', 'CALL_TO_ACTION'],
    aiPrompt: 'Generate a legal tip for small business owners about [TOPIC]. Include a clear explanation and why it matters.'
  },
  {
    id: '2',
    type: 'Case Study',
    title: 'Client Success Story',
    description: 'Showcase how you helped a client achieve their legal goals',
    category: 'educational',
    difficulty: 'medium',
    estimatedTime: '30 minutes',
    platforms: ['linkedin', 'facebook'],
    template: '🏆 Success Story: [CLIENT_TYPE]\n\nChallenge: [CHALLENGE]\n\nOur Approach: [APPROACH]\n\nResult: [RESULT]\n\n[LESSON_LEARNED]',
    variables: ['CLIENT_TYPE', 'CHALLENGE', 'APPROACH', 'RESULT', 'LESSON_LEARNED'],
    aiPrompt: 'Create a client success story about [LEGAL_ISSUE] with a [CLIENT_TYPE] client. Include the challenge, approach, and positive outcome.'
  },
  {
    id: '3',
    type: 'Legal Updates',
    title: 'Recent Law Changes',
    description: 'Keep clients informed about new regulations and legal developments',
    category: 'news',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    platforms: ['linkedin', 'twitter', 'facebook'],
    template: '📢 Legal Update: [LAW_CHANGE]\n\nWhat Changed: [CHANGE_DETAILS]\n\nImpact: [IMPACT]\n\nWhat You Need to Know: [ACTION_ITEMS]',
    variables: ['LAW_CHANGE', 'CHANGE_DETAILS', 'IMPACT', 'ACTION_ITEMS'],
    aiPrompt: 'Explain the recent changes to [LAW_TOPIC] and how it affects [TARGET_AUDIENCE]. Include actionable advice.'
  },
  {
    id: '4',
    type: 'FAQ',
    title: 'Common Legal Questions',
    description: 'Answer frequently asked legal questions in simple terms',
    category: 'educational',
    difficulty: 'easy',
    estimatedTime: '20 minutes',
    platforms: ['instagram', 'facebook', 'linkedin'],
    template: '❓ Q: [QUESTION]\n\nA: [ANSWER]\n\n💡 Pro Tip: [PRO_TIP]\n\n[RELATED_SERVICES]',
    variables: ['QUESTION', 'ANSWER', 'PRO_TIP', 'RELATED_SERVICES'],
    aiPrompt: 'Answer this common legal question: [QUESTION]. Provide a clear, helpful answer with a pro tip.'
  },
  {
    id: '5',
    type: 'Industry Insights',
    title: 'Industry Trends & Analysis',
    description: 'Share insights about legal industry developments and trends',
    category: 'educational',
    difficulty: 'hard',
    estimatedTime: '45 minutes',
    platforms: ['linkedin', 'twitter'],
    template: '📊 Industry Insight: [TREND]\n\nData: [STATISTICS]\n\nAnalysis: [ANALYSIS]\n\nFuture Outlook: [PREDICTION]\n\n[EXPERT_OPINION]',
    variables: ['TREND', 'STATISTICS', 'ANALYSIS', 'PREDICTION', 'EXPERT_OPINION'],
    aiPrompt: 'Analyze the current trend in [LEGAL_AREA] and provide insights about what this means for [TARGET_AUDIENCE].'
  },
  // Engagement Content
  {
    id: '6',
    type: 'Polls & Questions',
    title: 'Legal Industry Polls',
    description: 'Engage your audience with thought-provoking questions',
    category: 'engagement',
    difficulty: 'easy',
    estimatedTime: '10 minutes',
    platforms: ['linkedin', 'instagram', 'twitter'],
    template: '🤔 Question of the Day:\n\n[QUESTION]\n\nVote below and share your thoughts in the comments!\n\n[FOLLOW_UP_QUESTION]',
    variables: ['QUESTION', 'FOLLOW_UP_QUESTION'],
    aiPrompt: 'Create an engaging legal industry question that would encourage discussion and engagement from [TARGET_AUDIENCE].'
  },
  {
    id: '7',
    type: 'Behind the Scenes',
    title: 'Law Firm Life',
    description: 'Show the human side of your legal practice',
    category: 'engagement',
    difficulty: 'easy',
    estimatedTime: '15 minutes',
    platforms: ['instagram', 'facebook', 'linkedin'],
    template: '👥 Behind the Scenes:\n\n[ACTIVITY_DESCRIPTION]\n\n[TEAM_MOMENT]\n\n[FUN_FACT]\n\n[PERSONAL_TOUCH]',
    variables: ['ACTIVITY_DESCRIPTION', 'TEAM_MOMENT', 'FUN_FACT', 'PERSONAL_TOUCH'],
    aiPrompt: 'Create a behind-the-scenes post about [ACTIVITY] at a law firm that shows the human side of legal work.'
  },
  // Branding Content
  {
    id: '8',
    type: 'Team Spotlight',
    title: 'Meet Our Team',
    description: 'Introduce your legal team and build personal connections',
    category: 'branding',
    difficulty: 'medium',
    estimatedTime: '30 minutes',
    platforms: ['linkedin', 'facebook', 'instagram'],
    template: '👨‍💼 Meet [TEAM_MEMBER_NAME]\n\nRole: [ROLE]\n\nExpertise: [EXPERTISE]\n\nFun Fact: [FUN_FACT]\n\n[PERSONAL_MESSAGE]',
    variables: ['TEAM_MEMBER_NAME', 'ROLE', 'EXPERTISE', 'FUN_FACT', 'PERSONAL_MESSAGE'],
    aiPrompt: 'Create a team spotlight post for [TEAM_MEMBER] who specializes in [LEGAL_AREA]. Make it personal and engaging.'
  },
  {
    id: '9',
    type: 'Values & Mission',
    title: 'Our Legal Philosophy',
    description: 'Share your firm\'s values and approach to legal services',
    category: 'branding',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    platforms: ['linkedin', 'facebook'],
    template: '🎯 Our Mission:\n\n[VALUE_STATEMENT]\n\nWhy This Matters: [EXPLANATION]\n\nHow We Live It: [EXAMPLE]\n\n[COMMITMENT]',
    variables: ['VALUE_STATEMENT', 'EXPLANATION', 'EXAMPLE', 'COMMITMENT'],
    aiPrompt: 'Explain our legal philosophy about [VALUE] and how it guides our work with clients.'
  },
  // News & Updates
  {
    id: '10',
    type: 'Firm News',
    title: 'Firm Announcements',
    description: 'Share important updates about your practice',
    category: 'news',
    difficulty: 'easy',
    estimatedTime: '20 minutes',
    platforms: ['linkedin', 'facebook', 'twitter'],
    template: '📢 Exciting News:\n\n[ANNOUNCEMENT]\n\nWhat This Means: [SIGNIFICANCE]\n\n[CELEBRATION]\n\n[THANK_YOU]',
    variables: ['ANNOUNCEMENT', 'SIGNIFICANCE', 'CELEBRATION', 'THANK_YOU'],
    aiPrompt: 'Announce [NEWS] for our law firm. Make it exciting and explain why it matters to our clients.'
  },
  // Client Stories
  {
    id: '11',
    type: 'Testimonial',
    title: 'Client Testimonials',
    description: 'Share positive feedback from satisfied clients',
    category: 'client-stories',
    difficulty: 'easy',
    estimatedTime: '15 minutes',
    platforms: ['linkedin', 'facebook', 'instagram'],
    template: '💬 Client Testimonial:\n\n"[TESTIMONIAL_QUOTE]"\n\n- [CLIENT_NAME], [CLIENT_TYPE]\n\n[SERVICE_PROVIDED]\n\n[GRATITUDE]',
    variables: ['TESTIMONIAL_QUOTE', 'CLIENT_NAME', 'CLIENT_TYPE', 'SERVICE_PROVIDED', 'GRATITUDE'],
    aiPrompt: 'Create a testimonial post based on this client feedback: [CLIENT_FEEDBACK]. Make it compelling and authentic.'
  },
  // Additional templates for variety
  {
    id: '12',
    type: 'Legal Myth Busting',
    title: 'Common Legal Myths',
    description: 'Debunk misconceptions about legal processes',
    category: 'educational',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    platforms: ['instagram', 'facebook', 'linkedin'],
    template: '🚫 Myth: [MYTH]\n\n✅ Fact: [FACT]\n\nWhy This Matters: [EXPLANATION]\n\n[EDUCATIONAL_NOTE]',
    variables: ['MYTH', 'FACT', 'EXPLANATION', 'EDUCATIONAL_NOTE'],
    aiPrompt: 'Debunk the common myth that [MYTH] about [LEGAL_TOPIC]. Provide the correct information and explain why it matters.'
  },
  {
    id: '13',
    type: 'Seasonal Content',
    title: 'Holiday Legal Tips',
    description: 'Connect legal advice to seasonal events and holidays',
    category: 'engagement',
    difficulty: 'easy',
    estimatedTime: '20 minutes',
    platforms: ['instagram', 'facebook', 'linkedin'],
    template: '🎉 [HOLIDAY] Legal Tips:\n\n[SEASONAL_ADVICE]\n\n[LEGAL_CONSIDERATION]\n\n[PREVENTION_TIP]\n\n[ENJOY_MESSAGE]',
    variables: ['HOLIDAY', 'SEASONAL_ADVICE', 'LEGAL_CONSIDERATION', 'PREVENTION_TIP', 'ENJOY_MESSAGE'],
    aiPrompt: 'Create legal tips related to [HOLIDAY/SEASON] that would be helpful for [TARGET_AUDIENCE].'
  },
  {
    id: '14',
    type: 'Resource Sharing',
    title: 'Helpful Legal Resources',
    description: 'Share valuable resources and tools with your audience',
    category: 'educational',
    difficulty: 'easy',
    estimatedTime: '15 minutes',
    platforms: ['linkedin', 'facebook', 'twitter'],
    template: '📚 Resource Alert:\n\n[RESOURCE_NAME]\n\nWhat It Is: [DESCRIPTION]\n\nWhy It\'s Useful: [BENEFIT]\n\n[ACCESS_INFO]\n\n[SHARE_REQUEST]',
    variables: ['RESOURCE_NAME', 'DESCRIPTION', 'BENEFIT', 'ACCESS_INFO', 'SHARE_REQUEST'],
    aiPrompt: 'Introduce this helpful legal resource: [RESOURCE]. Explain what it is and why it would benefit [TARGET_AUDIENCE].'
  },
  {
    id: '15',
    type: 'Industry Recognition',
    title: 'Awards & Recognition',
    description: 'Celebrate your firm\'s achievements and recognition',
    category: 'branding',
    difficulty: 'easy',
    estimatedTime: '20 minutes',
    platforms: ['linkedin', 'facebook', 'instagram'],
    template: '🏆 Honored to Receive: [AWARD_NAME]\n\nWhat This Means: [SIGNIFICANCE]\n\n[GRATITUDE]\n\n[COMMITMENT]\n\n[THANK_YOU]',
    variables: ['AWARD_NAME', 'SIGNIFICANCE', 'GRATITUDE', 'COMMITMENT', 'THANK_YOU'],
    aiPrompt: 'Announce that we received [AWARD/RECOGNITION]. Express gratitude and commitment to continue serving our clients.'
  },
  {
    id: '16',
    type: 'Legal History',
    title: 'Legal History Facts',
    description: 'Share interesting historical legal facts and stories',
    category: 'educational',
    difficulty: 'medium',
    estimatedTime: '30 minutes',
    platforms: ['linkedin', 'twitter', 'facebook'],
    template: '📜 Legal History Fact:\n\n[FACT_TITLE]\n\n[FACT_DESCRIPTION]\n\nHistorical Context: [CONTEXT]\n\nModern Impact: [IMPACT]\n\n[INTERESTING_NOTE]',
    variables: ['FACT_TITLE', 'FACT_DESCRIPTION', 'CONTEXT', 'IMPACT', 'INTERESTING_NOTE'],
    aiPrompt: 'Share an interesting fact about [LEGAL_HISTORY_TOPIC]. Include historical context and modern relevance.'
  },
  {
    id: '17',
    type: 'Prevention Tips',
    title: 'Legal Prevention Strategies',
    description: 'Help clients avoid legal problems before they happen',
    category: 'educational',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    platforms: ['linkedin', 'facebook', 'instagram'],
    template: '🛡️ Prevention is Better Than Cure:\n\n[RISK_AREA]\n\nWarning Signs: [WARNING_SIGNS]\n\nPrevention Steps: [PREVENTION_STEPS]\n\n[EARLY_ACTION_BENEFIT]',
    variables: ['RISK_AREA', 'WARNING_SIGNS', 'PREVENTION_STEPS', 'EARLY_ACTION_BENEFIT'],
    aiPrompt: 'Create prevention tips for [LEGAL_RISK]. Include warning signs and specific steps to avoid problems.'
  },
  {
    id: '18',
    type: 'Community Involvement',
    title: 'Community Legal Events',
    description: 'Highlight your firm\'s involvement in community legal education',
    category: 'branding',
    difficulty: 'medium',
    estimatedTime: '30 minutes',
    platforms: ['instagram', 'facebook', 'linkedin'],
    template: '🤝 Community Event:\n\n[EVENT_NAME]\n\nWhat We Did: [ACTIVITY]\n\nWhy It Matters: [IMPORTANCE]\n\n[COMMUNITY_IMPACT]\n\n[FUTURE_PLANS]',
    variables: ['EVENT_NAME', 'ACTIVITY', 'IMPORTANCE', 'COMMUNITY_IMPACT', 'FUTURE_PLANS'],
    aiPrompt: 'Describe our participation in [COMMUNITY_EVENT] and explain how it benefits the community.'
  },
  {
    id: '19',
    type: 'Technology in Law',
    title: 'Legal Tech Insights',
    description: 'Share insights about technology\'s impact on legal services',
    category: 'educational',
    difficulty: 'hard',
    estimatedTime: '40 minutes',
    platforms: ['linkedin', 'twitter'],
    template: '💻 Legal Tech Update:\n\n[TECHNOLOGY]\n\nHow It\'s Changing Law: [CHANGES]\n\nBenefits: [BENEFITS]\n\nConsiderations: [CONSIDERATIONS]\n\n[FUTURE_OUTLOOK]',
    variables: ['TECHNOLOGY', 'CHANGES', 'BENEFITS', 'CONSIDERATIONS', 'FUTURE_OUTLOOK'],
    aiPrompt: 'Explain how [LEGAL_TECH] is transforming the legal industry and what this means for clients.'
  },
  {
    id: '20',
    type: 'Wellness & Balance',
    title: 'Legal Professional Wellness',
    description: 'Address the importance of mental health and work-life balance in law',
    category: 'engagement',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    platforms: ['linkedin', 'instagram', 'facebook'],
    template: '🧘‍♀️ Wellness Wednesday:\n\n[WELLNESS_TOPIC]\n\nWhy It Matters: [IMPORTANCE]\n\nTips: [WELLNESS_TIPS]\n\n[ENCOURAGEMENT]\n\n[SUPPORT_MESSAGE]',
    variables: ['WELLNESS_TOPIC', 'IMPORTANCE', 'WELLNESS_TIPS', 'ENCOURAGEMENT', 'SUPPORT_MESSAGE'],
    aiPrompt: 'Create wellness advice for legal professionals about [WELLNESS_TOPIC]. Include practical tips and encouragement.'
  }
];

export function ContentBasket() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [aiInput, setAiInput] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', icon: FileText },
    { id: 'educational', name: 'Educational', icon: BookOpen },
    { id: 'engagement', name: 'Engagement', icon: Users },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'news', name: 'News & Updates', icon: AlertTriangle },
    { id: 'client-stories', name: 'Client Stories', icon: Star }
  ];

  const filteredTemplates = contentTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    setActiveTab('create');
  };

  const handleAiGenerate = async () => {
    if (!selectedTemplate || !aiInput.trim()) return;

    // Simulate AI generation
    const generatedContent: GeneratedContent = {
      id: Date.now().toString(),
      templateId: selectedTemplate.id,
      content: `AI Generated Content for: ${selectedTemplate.title}\n\n${aiInput}\n\nThis is a sample AI-generated post based on your input.`,
      platforms: selectedTemplate.platforms,
      status: 'draft',
      createdAt: new Date().toISOString(),
      aiGenerated: true
    };

    setGeneratedContent(prev => [generatedContent, ...prev]);
    setAiInput('');
    setActiveTab('generated');
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Basket</h2>
          <p className="text-muted-foreground">
            20+ evergreen content templates with AI generation for consistent social media content
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <FileText className="w-3 h-3 mr-1" />
            20 Templates
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Content Templates</TabsTrigger>
          <TabsTrigger value="create">Create Content</TabsTrigger>
          <TabsTrigger value="generated">Generated Content</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search content templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge 
                        variant={template.difficulty === 'easy' ? 'default' : 
                                template.difficulty === 'medium' ? 'secondary' : 'destructive'}
                      >
                        {template.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Platforms:</span>
                      <div className="flex space-x-1">
                        {template.platforms.slice(0, 2).map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                        {template.platforms.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.platforms.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Create: {selectedTemplate.title}</span>
                </CardTitle>
                <CardDescription>
                  {selectedTemplate.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Template Preview */}
                <div className="space-y-2">
                  <Label>Template Preview</Label>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <pre className="text-sm whitespace-pre-wrap">{selectedTemplate.template}</pre>
                  </div>
                </div>

                {/* AI Generation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <Label className="text-lg font-medium">AI Content Generation</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-input">Describe what you want to create:</Label>
                    <Textarea
                      id="ai-input"
                      placeholder={`e.g., ${selectedTemplate.aiPrompt}`}
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button 
                    onClick={handleAiGenerate}
                    disabled={!aiInput.trim()}
                    className="w-full"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Generate AI Content
                  </Button>
                </div>

                {/* Manual Creation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Edit className="h-5 w-5 text-green-600" />
                    <Label className="text-lg font-medium">Manual Content Creation</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-content">Write your content:</Label>
                    <Textarea
                      id="manual-content"
                      placeholder="Write your content here..."
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Template
                    </Button>
                    <Button className="flex-1">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a Template</h3>
              <p className="text-muted-foreground">
                Choose a content template from the Templates tab to start creating content
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="generated" className="space-y-4">
          {generatedContent.length > 0 ? (
            <div className="space-y-4">
              {generatedContent.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          {content.aiGenerated && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                          <Badge variant="outline" className="capitalize">
                            {content.status}
                          </Badge>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{content.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Created: {new Date(content.createdAt).toLocaleDateString()}</span>
                          <span>Platforms: {content.platforms.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(content.content)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Generated Content Yet</h3>
              <p className="text-muted-foreground">
                Use the AI generation feature to create your first piece of content
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

