"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Globe,
  Users,
  Clock,
  Star,
  Zap,
  Shield,
  Activity,
  Download,
  Plus,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  Monitor,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Brain,
  Lightbulb,
  Target,
  PieChart,
  LineChart,
  AlertTriangle,
  Info,
  Award,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ArrowLeft,
  FileText,
  Link,
  Rocket
} from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  domain: string;
  logo: string;
  industry: string;
  size: 'small' | 'medium' | 'large';
  threatLevel: 'low' | 'medium' | 'high';
  seoScore: number;
  socialScore: number;
  contentScore: number;
  overallScore: number;
  organicTraffic: number;
  socialFollowers: number;
  contentFrequency: number;
  keywordRankings: number;
  backlinks: number;
  topKeywords: string[];
  socialPlatforms: string[];
  contentThemes: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  lastUpdated: string;
}

interface MarketGap {
  id: string;
  category: string;
  description: string;
  opportunity: 'high' | 'medium' | 'low';
  estimatedValue: number;
  competitors: string[];
  recommendedAction: string;
  timeline: string;
}

interface CompetitiveAlert {
  id: string;
  type: 'new_content' | 'ranking_change' | 'social_activity' | 'backlink_change' | 'content_launch';
  competitor: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  actionRequired: boolean;
}

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'Smith Law Group',
    domain: 'smithlawgroup.com',
    logo: 'SL',
    industry: 'Personal Injury',
    size: 'large',
    threatLevel: 'high',
    seoScore: 85,
    socialScore: 78,
    contentScore: 82,
    overallScore: 82,
    organicTraffic: 45000,
    socialFollowers: 12500,
    contentFrequency: 15,
    keywordRankings: 1200,
    backlinks: 850,
    topKeywords: ['personal injury lawyer', 'car accident attorney', 'medical malpractice'],
    socialPlatforms: ['facebook', 'linkedin', 'instagram', 'twitter'],
    contentThemes: ['client success stories', 'legal tips', 'industry news'],
    strengths: ['Strong SEO presence', 'High content frequency', 'Large social following'],
    weaknesses: ['Limited video content', 'Weak mobile optimization', 'Slow response time'],
    opportunities: ['Video content creation', 'Mobile app development', '24/7 chat support'],
    threats: ['New competitors entering market', 'Algorithm changes', 'Economic downturn'],
    lastUpdated: '2024-12-23T10:00:00'
  },
  {
    id: '2',
    name: 'Johnson & Associates',
    domain: 'johnsonlaw.com',
    logo: 'JA',
    industry: 'Corporate Law',
    size: 'medium',
    threatLevel: 'medium',
    seoScore: 78,
    socialScore: 72,
    contentScore: 75,
    overallScore: 75,
    organicTraffic: 32000,
    socialFollowers: 8900,
    contentFrequency: 12,
    keywordRankings: 950,
    backlinks: 620,
    topKeywords: ['business lawyer', 'contract attorney', 'corporate law'],
    socialPlatforms: ['linkedin', 'facebook', 'twitter'],
    contentThemes: ['business insights', 'legal compliance', 'industry trends'],
    strengths: ['Strong LinkedIn presence', 'Quality content', 'Good client reviews'],
    weaknesses: ['Limited social media engagement', 'Slow website', 'Poor mobile experience'],
    opportunities: ['Social media expansion', 'Website redesign', 'Content marketing'],
    threats: ['Competition from larger firms', 'Technology disruption', 'Client budget cuts'],
    lastUpdated: '2024-12-23T09:30:00'
  },
  {
    id: '3',
    name: 'Legal Partners',
    domain: 'legalpartners.com',
    logo: 'LP',
    industry: 'Family Law',
    size: 'small',
    threatLevel: 'low',
    seoScore: 72,
    socialScore: 68,
    contentScore: 70,
    overallScore: 70,
    organicTraffic: 28000,
    socialFollowers: 6500,
    contentFrequency: 8,
    keywordRankings: 800,
    backlinks: 450,
    topKeywords: ['family law', 'divorce attorney', 'child custody'],
    socialPlatforms: ['facebook', 'instagram'],
    contentThemes: ['family advice', 'legal guidance', 'community support'],
    strengths: ['Personal touch', 'Local reputation', 'Client relationships'],
    weaknesses: ['Limited online presence', 'Low content frequency', 'No video content'],
    opportunities: ['Digital transformation', 'Content creation', 'Social media growth'],
    threats: ['Online competition', 'Client expectations', 'Technology gap'],
    lastUpdated: '2024-12-23T08:45:00'
  }
];

const mockMarketGaps: MarketGap[] = [
  {
    id: '1',
    category: 'Content Marketing',
    description: 'Video content creation for legal education and client testimonials',
    opportunity: 'high',
    estimatedValue: 15000,
    competitors: ['Smith Law Group', 'Johnson & Associates'],
    recommendedAction: 'Launch video content series focusing on legal education and client success stories',
    timeline: '3-6 months'
  },
  {
    id: '2',
    category: 'Social Media',
    description: 'Instagram and TikTok presence for younger client acquisition',
    opportunity: 'high',
    estimatedValue: 12000,
    competitors: ['Legal Partners'],
    recommendedAction: 'Develop Instagram strategy with educational content and behind-the-scenes content',
    timeline: '2-4 months'
  },
  {
    id: '3',
    category: 'SEO',
    description: 'Local SEO optimization for geographic keyword targeting',
    opportunity: 'medium',
    estimatedValue: 8000,
    competitors: ['Smith Law Group'],
    recommendedAction: 'Optimize for local search terms and create location-specific landing pages',
    timeline: '4-8 weeks'
  }
];

const mockAlerts: CompetitiveAlert[] = [
  {
    id: '1',
    type: 'new_content',
    competitor: 'Smith Law Group',
    title: 'New Blog Series Launched',
    description: 'Smith Law Group launched a 10-part series on "Personal Injury Law Changes 2024"',
    impact: 'high',
    timestamp: '2024-12-23T09:15:00',
    actionRequired: true
  },
  {
    id: '2',
    type: 'ranking_change',
    competitor: 'Johnson & Associates',
    title: 'Keyword Ranking Improvement',
    description: 'Johnson & Associates improved ranking for "business contract lawyer" from #8 to #3',
    impact: 'medium',
    timestamp: '2024-12-23T08:30:00',
    actionRequired: false
  },
  {
    id: '3',
    type: 'social_activity',
    competitor: 'Legal Partners',
    title: 'Increased Social Media Activity',
    description: 'Legal Partners posted 5 times this week vs. usual 2-3 posts',
    impact: 'low',
    timestamp: '2024-12-23T07:45:00',
    actionRequired: false
  }
];

export function CompetitiveIntelligence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string>('all');

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatLevelBadge = (level: string) => {
    switch (level) {
      case 'high': return <Badge className="bg-red-100 text-red-800">High Threat</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium Threat</Badge>;
      case 'low': return <Badge className="bg-green-100 text-green-800">Low Threat</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'new_content': return <FileText className="h-4 w-4" />;
      case 'ranking_change': return <TrendingUp className="h-4 w-4" />;
      case 'social_activity': return <Users className="h-4 w-4" />;
      case 'backlink_change': return <Link className="h-4 w-4" />;
      case 'content_launch': return <Rocket className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredCompetitors = mockCompetitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competitor.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || competitor.industry === selectedIndustry;
    const matchesThreatLevel = selectedThreatLevel === 'all' || competitor.threatLevel === selectedThreatLevel;
    return matchesSearch && matchesIndustry && matchesThreatLevel;
  });

  const industries = Array.from(new Set(mockCompetitors.map(c => c.industry)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Competitive Intelligence</h2>
          <p className="text-muted-foreground">
            Monitor competitors, identify market gaps, and stay ahead of the competition
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="gaps">Market Gaps</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Competitive Landscape Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCompetitors.length}</div>
                <p className="text-xs text-muted-foreground">
                  Actively monitored
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Threat</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockCompetitors.filter(c => c.threatLevel === 'high').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Competitors to watch closely
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockMarketGaps.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Opportunities identified
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockAlerts.filter(a => a.actionRequired).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Competitive Positioning Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Positioning Matrix</CardTitle>
              <CardDescription>
                Your position relative to competitors across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockCompetitors.map((competitor) => (
                  <div key={competitor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{competitor.name}</h3>
                      {getThreatLevelBadge(competitor.threatLevel)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>SEO Score:</span>
                        <span className="font-medium">{competitor.seoScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${competitor.seoScore}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Social Score:</span>
                        <span className="font-medium">{competitor.socialScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${competitor.socialScore}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Content Score:</span>
                        <span className="font-medium">{competitor.contentScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${competitor.contentScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-muted-foreground">
                        Traffic: {competitor.organicTraffic.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Keywords: {competitor.keywordRankings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          {/* Competitor Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search competitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedThreatLevel}
              onChange={(e) => setSelectedThreatLevel(e.target.value)}
            >
              <option value="all">All Threat Levels</option>
              <option value="high">High Threat</option>
              <option value="medium">Medium Threat</option>
              <option value="low">Low Threat</option>
            </select>
          </div>

          {/* Competitors List */}
          <div className="space-y-4">
            {filteredCompetitors.map((competitor) => (
              <Card key={competitor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-blue-600">{competitor.logo}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{competitor.name}</h3>
                          <p className="text-sm text-muted-foreground">{competitor.domain}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getThreatLevelBadge(competitor.threatLevel)}
                          <Badge variant="outline" className="capitalize">
                            {competitor.size}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{competitor.seoScore}</div>
                          <div className="text-sm text-muted-foreground">SEO Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{competitor.socialScore}</div>
                          <div className="text-sm text-muted-foreground">Social Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{competitor.contentScore}</div>
                          <div className="text-sm text-muted-foreground">Content Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{competitor.overallScore}</div>
                          <div className="text-sm text-muted-foreground">Overall</div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2">Strengths</h4>
                          <div className="space-y-1">
                            {competitor.strengths.map((strength, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Weaknesses</h4>
                          <div className="space-y-1">
                            {competitor.weaknesses.map((weakness, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <XCircle className="h-3 w-3 text-red-500" />
                                <span>{weakness}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Top Keywords:</span>
                        {competitor.topKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Gap Analysis</CardTitle>
              <CardDescription>
                Identified opportunities where you can outperform competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMarketGaps.map((gap) => (
                  <div key={gap.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{gap.category}</h3>
                        <p className="text-sm text-muted-foreground">{gap.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getOpportunityColor(gap.opportunity)}`}>
                          ${gap.estimatedValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Estimated Value</div>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Competitors in this space:</h4>
                        <div className="flex space-x-2">
                          {gap.competitors.map((competitor, index) => (
                            <Badge key={index} variant="outline">
                              {competitor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommended Action:</h4>
                        <p className="text-sm text-muted-foreground">{gap.recommendedAction}</p>
                        <div className="mt-2">
                          <Badge variant="outline">
                            Timeline: {gap.timeline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <Target className="mr-2 h-4 w-4" />
                        Create Strategy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Alerts</CardTitle>
              <CardDescription>
                Real-time notifications about competitor activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${
                    alert.actionRequired ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.actionRequired ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{alert.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">
                              {alert.type.replace('_', ' ')}
                            </Badge>
                            <Badge className={`${
                              alert.impact === 'high' ? 'bg-red-100 text-red-800' :
                              alert.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {alert.impact} Impact
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Competitor: {alert.competitor}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {alert.actionRequired && (
                          <Badge className="bg-red-100 text-red-800">
                            Action Required
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

