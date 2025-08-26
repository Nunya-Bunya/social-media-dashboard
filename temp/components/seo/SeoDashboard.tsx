"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Eye,
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
  Target,
  Search,
  Monitor,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface KeywordData {
  keyword: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cpc: number;
  trend: 'up' | 'down' | 'stable';
  competitorRanks: {
    competitor: string;
    rank: number;
  }[];
}

interface SeoHealth {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  recommendations: string[];
}

interface CompetitorData {
  name: string;
  domain: string;
  seoScore: number;
  organicTraffic: number;
  keywords: number;
  backlinks: number;
  topKeywords: string[];
}

const mockKeywords: KeywordData[] = [
  {
    keyword: 'personal injury lawyer',
    currentRank: 3,
    previousRank: 5,
    searchVolume: 12000,
    difficulty: 'hard',
    cpc: 45.20,
    trend: 'up',
    competitorRanks: [
      { competitor: 'Smith Law Group', rank: 1 },
      { competitor: 'Johnson & Associates', rank: 2 },
      { competitor: 'Your Firm', rank: 3 },
      { competitor: 'Legal Partners', rank: 4 }
    ]
  },
  {
    keyword: 'business contract lawyer',
    currentRank: 7,
    previousRank: 12,
    searchVolume: 8500,
    difficulty: 'medium',
    cpc: 32.80,
    trend: 'up',
    competitorRanks: [
      { competitor: 'Corporate Legal', rank: 1 },
      { competitor: 'Business Law Pro', rank: 3 },
      { competitor: 'Your Firm', rank: 7 },
      { competitor: 'Legal Solutions', rank: 8 }
    ]
  },
  {
    keyword: 'family law attorney',
    currentRank: 15,
    previousRank: 18,
    searchVolume: 6500,
    difficulty: 'medium',
    cpc: 28.50,
    trend: 'up',
    competitorRanks: [
      { competitor: 'Family Legal', rank: 2 },
      { competitor: 'Your Firm', rank: 15 },
      { competitor: 'Legal Family', rank: 16 },
      { competitor: 'Family Law Pro', rank: 20 }
    ]
  }
];

const mockSeoHealth: SeoHealth = {
  score: 78,
  issues: [
    {
      type: 'error',
      title: 'Missing Meta Descriptions',
      description: '15 pages are missing meta descriptions, which can hurt click-through rates',
      priority: 'high'
    },
    {
      type: 'warning',
      title: 'Slow Page Speed',
      description: '3 pages are loading slower than 3 seconds, affecting user experience',
      priority: 'medium'
    },
    {
      type: 'info',
      title: 'Mobile Optimization',
      description: 'Website is mobile-friendly but could be optimized further',
      priority: 'low'
    }
  ],
  recommendations: [
    'Add meta descriptions to all pages without them',
    'Optimize images and reduce server response time',
    'Implement structured data markup for better search visibility',
    'Create more internal links between related content'
  ]
};

const mockCompetitors: CompetitorData[] = [
  {
    name: 'Smith Law Group',
    domain: 'smithlawgroup.com',
    seoScore: 85,
    organicTraffic: 45000,
    keywords: 1200,
    backlinks: 850,
    topKeywords: ['personal injury lawyer', 'car accident attorney', 'medical malpractice']
  },
  {
    name: 'Johnson & Associates',
    domain: 'johnsonlaw.com',
    seoScore: 78,
    organicTraffic: 32000,
    keywords: 950,
    backlinks: 620,
    topKeywords: ['business lawyer', 'contract attorney', 'corporate law']
  },
  {
    name: 'Legal Partners',
    domain: 'legalpartners.com',
    seoScore: 72,
    organicTraffic: 28000,
    keywords: 800,
    backlinks: 450,
    topKeywords: ['family law', 'divorce attorney', 'child custody']
  }
];

export function SeoDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Work</Badge>;
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Dashboard</h2>
          <p className="text-muted-foreground">
            Track keywords, monitor website health, and analyze competitor performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Keyword
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="health">Health Check</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* SEO Score Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getHealthScoreColor(mockSeoHealth.score)}`}>
                  {mockSeoHealth.score}/100
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {getHealthScoreBadge(mockSeoHealth.score)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracked Keywords</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKeywords.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active keyword monitoring
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5K</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>+12.3% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>+8.7% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common SEO tasks and optimizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Search className="h-6 w-6 mb-2" />
                  <span>Keyword Research</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Monitor className="h-6 w-6 mb-2" />
                  <span>Site Audit</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Performance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          {/* Keyword Search */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Keywords Table */}
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Track your keyword performance and competitor positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKeywords.map((keyword) => (
                  <div key={keyword.keyword} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{keyword.keyword}</h3>
                        <Badge variant="outline">
                          Vol: {keyword.searchVolume.toLocaleString()}
                        </Badge>
                        <Badge variant="outline">
                          CPC: ${keyword.cpc}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(keyword.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(keyword.trend)}`}>
                          {keyword.trend === 'up' ? 'Ranking Up' : keyword.trend === 'down' ? 'Ranking Down' : 'Stable'}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Your Rankings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Current Rank:</span>
                            <span className="font-medium">#{keyword.currentRank}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Previous Rank:</span>
                            <span className="font-medium">#{keyword.previousRank}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Change:</span>
                            <span className={`font-medium ${keyword.currentRank < keyword.previousRank ? 'text-green-600' : 'text-red-600'}`}>
                              {keyword.currentRank < keyword.previousRank ? '+' : ''}{keyword.previousRank - keyword.currentRank}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Competitor Rankings</h4>
                        <div className="space-y-2">
                          {keyword.competitorRanks.slice(0, 3).map((comp) => (
                            <div key={comp.competitor} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{comp.competitor}:</span>
                              <span className="font-medium">#{comp.rank}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          {/* Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Website Health Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className={`text-6xl font-bold ${getHealthScoreColor(mockSeoHealth.score)} mb-4`}>
                  {mockSeoHealth.score}
                </div>
                <div className="text-2xl text-muted-foreground mb-4">out of 100</div>
                {getHealthScoreBadge(mockSeoHealth.score)}
              </div>
            </CardContent>
          </Card>

          {/* Issues and Recommendations */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Issues Found</span>
                </CardTitle>
                <CardDescription>
                  {mockSeoHealth.issues.length} issues that need attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSeoHealth.issues.map((issue, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getPriorityColor(issue.priority)}`}>
                      <div className="flex items-start space-x-2">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{issue.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {issue.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Actionable steps to improve your SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSeoHealth.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>
                Monitor your competitors' SEO performance and strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCompetitors.map((competitor) => (
                  <div key={competitor.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{competitor.name}</h3>
                        <p className="text-sm text-muted-foreground">{competitor.domain}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{competitor.seoScore}</div>
                        <div className="text-sm text-muted-foreground">SEO Score</div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">{competitor.organicTraffic.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Organic Traffic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{competitor.keywords.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Keywords</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{competitor.backlinks.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Backlinks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{competitor.topKeywords.length}</div>
                        <div className="text-sm text-muted-foreground">Top Keywords</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Top Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {competitor.topKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
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

