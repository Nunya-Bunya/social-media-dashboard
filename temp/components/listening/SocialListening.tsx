"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Ear,
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
  MessageSquare,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ArrowLeft,
  FileText,
  Link,
  Rocket,
  Filter,
  Eye,
  Edit,
  Trash2,
  Bell,
  Settings
} from 'lucide-react';

interface BrandMention {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  engagement: number;
  reach: number;
  timestamp: string;
  url: string;
  tags: string[];
  actionRequired: boolean;
  responseStatus: 'none' | 'acknowledged' | 'responded' | 'resolved';
}

interface TrendingTopic {
  id: string;
  topic: string;
  volume: number;
  growth: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedKeywords: string[];
  platforms: string[];
  relevance: 'high' | 'medium' | 'low';
  opportunity: 'high' | 'medium' | 'low';
}

interface SentimentAnalysis {
  totalMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  neutralMentions: number;
  overallSentiment: number;
  sentimentTrend: 'improving' | 'declining' | 'stable';
  topPositiveTopics: string[];
  topNegativeTopics: string[];
  responseRate: number;
  averageResponseTime: string;
}

const mockBrandMentions: BrandMention[] = [
  {
    id: '1',
    platform: 'twitter',
    author: '@legalexpert',
    content: 'Just had an amazing consultation with @NunyaBunyaLaw - they really know their stuff! Highly recommend for anyone needing legal help.',
    sentiment: 'positive',
    sentimentScore: 0.9,
    engagement: 45,
    reach: 1200,
    timestamp: '2024-12-23T10:00:00',
    url: 'https://twitter.com/legalexpert/status/123456',
    tags: ['consultation', 'recommendation', 'legal-help'],
    actionRequired: false,
    responseStatus: 'acknowledged'
  },
  {
    id: '2',
    platform: 'facebook',
    author: 'Sarah Johnson',
    content: 'Frustrated with the slow response time from Nunya Bunya Law. Been waiting 3 days for a call back.',
    sentiment: 'negative',
    sentimentScore: -0.7,
    engagement: 23,
    reach: 450,
    timestamp: '2024-12-23T09:30:00',
    url: 'https://facebook.com/groups/legaladvice/123456',
    tags: ['response-time', 'customer-service', 'frustration'],
    actionRequired: true,
    responseStatus: 'none'
  },
  {
    id: '3',
    platform: 'linkedin',
    author: 'Michael Chen',
    content: 'Great article by Nunya Bunya Law on recent changes to employment law. Very informative and well-researched.',
    sentiment: 'positive',
    sentimentScore: 0.8,
    engagement: 67,
    reach: 2100,
    timestamp: '2024-12-23T09:00:00',
    url: 'https://linkedin.com/posts/michaelchen_employment-law-123456',
    tags: ['article', 'employment-law', 'informative'],
    actionRequired: false,
    responseStatus: 'responded'
  },
  {
    id: '4',
    platform: 'instagram',
    author: 'legal_insights',
    content: 'Check out this amazing client success story from @NunyaBunyaLaw! They helped a small business owner win a major case.',
    sentiment: 'positive',
    sentimentScore: 0.9,
    engagement: 89,
    reach: 3400,
    timestamp: '2024-12-23T08:45:00',
    url: 'https://instagram.com/p/legal_insights_123456',
    tags: ['success-story', 'small-business', 'case-win'],
    actionRequired: false,
    responseStatus: 'acknowledged'
  },
  {
    id: '5',
    platform: 'twitter',
    author: '@disappointed_client',
    content: 'Not happy with the outcome of my case handled by Nunya Bunya Law. Expected better results for the fees charged.',
    sentiment: 'negative',
    sentimentScore: -0.6,
    engagement: 34,
    reach: 890,
    timestamp: '2024-12-23T08:15:00',
    url: 'https://twitter.com/disappointed_client/status/123456',
    tags: ['case-outcome', 'fees', 'dissatisfaction'],
    actionRequired: true,
    responseStatus: 'none'
  }
];

const mockTrendingTopics: TrendingTopic[] = [
  {
    id: '1',
    topic: 'Employment Law Changes 2024',
    volume: 12500,
    growth: 45,
    sentiment: 'positive',
    relatedKeywords: ['employment law', '2024 changes', 'workplace rights', 'employee benefits'],
    platforms: ['linkedin', 'twitter', 'facebook'],
    relevance: 'high',
    opportunity: 'high'
  },
  {
    id: '2',
    topic: 'Small Business Legal Protection',
    volume: 8900,
    growth: 32,
    sentiment: 'positive',
    relatedKeywords: ['small business', 'legal protection', 'contracts', 'compliance'],
    platforms: ['linkedin', 'facebook', 'instagram'],
    relevance: 'high',
    opportunity: 'high'
  },
  {
    id: '3',
    topic: 'Personal Injury Law Updates',
    volume: 6700,
    growth: 18,
    sentiment: 'neutral',
    relatedKeywords: ['personal injury', 'law updates', 'compensation', 'accident claims'],
    platforms: ['facebook', 'twitter'],
    relevance: 'medium',
    opportunity: 'medium'
  },
  {
    id: '4',
    topic: 'Legal Technology Adoption',
    volume: 5400,
    growth: 67,
    sentiment: 'positive',
    relatedKeywords: ['legal tech', 'automation', 'AI in law', 'digital transformation'],
    platforms: ['linkedin', 'twitter'],
    relevance: 'medium',
    opportunity: 'high'
  }
];

const mockSentimentAnalysis: SentimentAnalysis = {
  totalMentions: 156,
  positiveMentions: 89,
  negativeMentions: 23,
  neutralMentions: 44,
  overallSentiment: 0.42,
  sentimentTrend: 'improving',
  topPositiveTopics: ['client success', 'legal expertise', 'professional service', 'helpful advice'],
  topNegativeTopics: ['response time', 'fees', 'case outcomes', 'communication'],
  responseRate: 78,
  averageResponseTime: '4.2 hours'
};

export function SocialListening() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('mentions');
  const [selectedMention, setSelectedMention] = useState<BrandMention | null>(null);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Badge className="bg-green-100 text-green-800">Positive</Badge>;
      case 'negative': return <Badge className="bg-red-100 text-red-800">Negative</Badge>;
      case 'neutral': return <Badge className="bg-gray-100 text-gray-800">Neutral</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-red-600" />;
      case 'neutral': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <div className="w-4 h-4 bg-blue-400 rounded" />;
      case 'facebook': return <div className="w-4 h-4 bg-blue-600 rounded" />;
      case 'linkedin': return <div className="w-4 h-4 bg-blue-700 rounded" />;
      case 'instagram': return <div className="w-4 h-4 bg-pink-600 rounded" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded" />;
    }
  };

  const getResponseStatusBadge = (status: string) => {
    switch (status) {
      case 'none': return <Badge className="bg-red-100 text-red-800">No Response</Badge>;
      case 'acknowledged': return <Badge className="bg-yellow-100 text-yellow-800">Acknowledged</Badge>;
      case 'responded': return <Badge className="bg-blue-100 text-blue-800">Responded</Badge>;
      case 'resolved': return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getSentimentTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredMentions = mockBrandMentions.filter(mention => {
    const matchesSearch = mention.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mention.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || mention.platform === selectedPlatform;
    const matchesSentiment = selectedSentiment === 'all' || mention.sentiment === selectedSentiment;
    return matchesSearch && matchesPlatform && matchesSentiment;
  });

  const platforms = Array.from(new Set(mockBrandMentions.map(m => m.platform)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social Listening & Sentiment Analysis</h2>
          <p className="text-muted-foreground">
            Monitor brand mentions, analyze sentiment, and identify trending topics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="mentions">Brand Mentions</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="mentions" className="space-y-4">
          {/* Sentiment Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSentimentAnalysis.totalMentions}</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>+12.5% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positive</CardTitle>
                <ThumbsUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockSentimentAnalysis.positiveMentions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockSentimentAnalysis.positiveMentions / mockSentimentAnalysis.totalMentions) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negative</CardTitle>
                <ThumbsDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{mockSentimentAnalysis.negativeMentions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockSentimentAnalysis.negativeMentions / mockSentimentAnalysis.totalMentions) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{mockSentimentAnalysis.responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Avg: {mockSentimentAnalysis.averageResponseTime}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search mentions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          {/* Mentions List */}
          <div className="space-y-4">
            {filteredMentions.map((mention) => (
              <Card key={mention.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(mention.platform)}
                          <span className="text-sm font-medium capitalize">{mention.platform}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">by {mention.author}</span>
                        {getSentimentBadge(mention.sentiment)}
                        {mention.actionRequired && (
                          <Badge className="bg-red-100 text-red-800">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm">{mention.content}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(mention.timestamp).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{mention.engagement} engagement</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{mention.reach} reach</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Tags:</span>
                        {mention.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Response Status:</span>
                        {getResponseStatusBadge(mention.responseStatus)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          {/* Overall Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Overall Sentiment Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className={`text-6xl font-bold ${
                  mockSentimentAnalysis.overallSentiment > 0 ? 'text-green-600' : 
                  mockSentimentAnalysis.overallSentiment < 0 ? 'text-red-600' : 'text-gray-600'
                } mb-4`}>
                  {mockSentimentAnalysis.overallSentiment > 0 ? '+' : ''}{mockSentimentAnalysis.overallSentiment.toFixed(2)}
                </div>
                <div className="text-2xl text-muted-foreground mb-4">Sentiment Score</div>
                <div className="flex items-center justify-center space-x-2">
                  {getSentimentTrendIcon(mockSentimentAnalysis.sentimentTrend)}
                  <span className="capitalize">{mockSentimentAnalysis.sentimentTrend}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Breakdown */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <span>Top Positive Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockSentimentAnalysis.topPositiveTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                  <span>Top Negative Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockSentimentAnalysis.topNegativeTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Response Performance</CardTitle>
              <CardDescription>
                How quickly and effectively you're responding to mentions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {mockSentimentAnalysis.responseRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {mockSentimentAnalysis.averageResponseTime}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics in Legal Industry</CardTitle>
              <CardDescription>
                Topics gaining momentum that you can leverage for content creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrendingTopics.map((topic) => (
                  <div key={topic.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{topic.topic}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            Volume: {topic.volume.toLocaleString()}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            +{topic.growth}% growth
                          </Badge>
                          {getSentimentBadge(topic.sentiment)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Relevance</div>
                        <Badge className={`${
                          topic.relevance === 'high' ? 'bg-green-100 text-green-800' :
                          topic.relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {topic.relevance}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Related Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.relatedKeywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Platforms</h4>
                        <div className="flex space-x-2">
                          {topic.platforms.map((platform, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Create Content
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
              <CardTitle>Social Listening Alerts</CardTitle>
              <CardDescription>
                Configure alerts for specific keywords, mentions, or sentiment changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Configure Your Alerts</h3>
                <p className="text-muted-foreground mb-6">
                  Set up notifications for brand mentions, sentiment changes, and trending topics
                </p>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

