"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  Download,
  Filter,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  totalPosts: number;
  totalEngagement: number;
  totalReach: number;
  totalClicks: number;
  conversionRate: number;
  estimatedROI: number;
  costPerClick: number;
  platformBreakdown: {
    facebook: { posts: number; engagement: number; reach: number };
    instagram: { posts: number; engagement: number; reach: number };
    linkedin: { posts: number; engagement: number; reach: number };
    twitter: { posts: number; engagement: number; reach: number };
  };
  topPosts: Array<{
    id: string;
    content: string;
    platform: string;
    engagement: number;
    reach: number;
    clicks: number;
  }>;
}

const mockAnalytics: AnalyticsData = {
  period: 'Last 30 Days',
  totalPosts: 47,
  totalEngagement: 12450,
  totalReach: 89000,
  totalClicks: 2340,
  conversionRate: 2.6,
  estimatedROI: 340,
  costPerClick: 0.85,
  platformBreakdown: {
    facebook: { posts: 18, engagement: 5200, reach: 35000 },
    instagram: { posts: 15, engagement: 3800, reach: 28000 },
    linkedin: { posts: 10, engagement: 2800, reach: 20000 },
    twitter: { posts: 4, engagement: 650, reach: 6000 }
  },
  topPosts: [
    {
      id: '1',
      content: 'Legal Tips for Small Business Owners: Understanding contract basics...',
      platform: 'facebook',
      engagement: 1240,
      reach: 8900,
      clicks: 156
    },
    {
      id: '2',
      content: 'Tax Law Changes for 2024: New regulations that could impact...',
      platform: 'linkedin',
      engagement: 980,
      reach: 7200,
      clicks: 134
    },
    {
      id: '3',
      content: 'Client Success Story: Business Dispute Resolution...',
      platform: 'instagram',
      engagement: 890,
      reach: 6500,
      clicks: 98
    }
  ]
};

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' }
];

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const getGrowthIndicator = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth >= 0,
      icon: growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
    };
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? <platform.icon className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track performance, engagement, and ROI across all platforms
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalPosts}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>+12.5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockAnalytics.totalEngagement)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>+8.2% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockAnalytics.totalReach)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>+15.7% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.conversionRate}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>+0.8% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI and Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Estimated ROI</span>
            </CardTitle>
            <CardDescription>Return on social media investment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {mockAnalytics.estimatedROI}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              For every $1 spent, you're generating ${(mockAnalytics.estimatedROI / 100).toFixed(2)} in value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Cost Per Click</span>
            </CardTitle>
            <CardDescription>Average cost per click across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              ${mockAnalytics.costPerClick}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Industry average: $1.50 • You're saving 43%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Total Clicks</span>
            </CardTitle>
            <CardDescription>Website clicks from social media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatNumber(mockAnalytics.totalClicks)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {mockAnalytics.totalClicks / mockAnalytics.totalPosts} clicks per post average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Breakdown</CardTitle>
          <CardDescription>
            How each platform is performing for your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(mockAnalytics.platformBreakdown).map(([platform, data]) => (
              <div key={platform} className="space-y-3">
                <div className="flex items-center space-x-2">
                  {getPlatformIcon(platform)}
                  <span className="font-medium capitalize">{platform}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Posts:</span>
                    <span className="font-medium">{data.posts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Engagement:</span>
                    <span className="font-medium">{formatNumber(data.engagement)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reach:</span>
                    <span className="font-medium">{formatNumber(data.reach)}</span>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.engagement / mockAnalytics.totalEngagement) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>
            Your best content based on engagement and reach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.topPosts.map((post, index) => (
              <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      {getPlatformIcon(post.platform)}
                      <span className="capitalize">{post.platform}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{formatNumber(post.engagement)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(post.reach)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{post.clicks} clicks</span>
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

