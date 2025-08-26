'use client';

import React, { useState, useEffect } from 'react';
import { 
  AdCampaign, 
  AdCampaignStats, 
  AnalyticsOverview,
  AdPlatform,
  AdStatus,
  AdType 
} from '../../types/ad-campaigns';
import { adCampaignApi } from '../../lib/adCampaignApi';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Play,
  Pause,
  Copy,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface AdCampaignDashboardProps {
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdCampaignDashboard({ className }: AdCampaignDashboardProps) {
  const [stats, setStats] = useState<AdCampaignStats | null>(null);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    platform: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, campaignsData, analyticsData] = await Promise.all([
        adCampaignApi.getAdCampaignStats(),
        adCampaignApi.getAdCampaigns({ limit: 10 }),
        adCampaignApi.getAnalyticsOverview({
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString()
        })
      ]);

      setStats(statsData);
      setCampaigns(campaignsData.campaigns || []);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignAction = async (campaignId: string, action: 'launch' | 'pause' | 'duplicate') => {
    try {
      switch (action) {
        case 'launch':
          await adCampaignApi.launchAdCampaign(campaignId);
          break;
        case 'pause':
          await adCampaignApi.pauseAdCampaign(campaignId);
          break;
        case 'duplicate':
          await adCampaignApi.duplicateAdCampaign(campaignId);
          break;
      }
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error(`Error ${action}ing campaign:`, error);
    }
  };

  const getStatusColor = (status: AdStatus) => {
    switch (status) {
      case AdStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case AdStatus.PAUSED:
        return 'bg-yellow-100 text-yellow-800';
      case AdStatus.DRAFT:
        return 'bg-gray-100 text-gray-800';
      case AdStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPlatformIcon = (platform: AdPlatform) => {
    const icons: Record<AdPlatform, string> = {
      [AdPlatform.FACEBOOK]: '📘',
      [AdPlatform.INSTAGRAM]: '📷',
      [AdPlatform.GOOGLE_ADS]: '🔍',
      [AdPlatform.TIKTOK]: '🎵',
      [AdPlatform.LINKEDIN]: '💼',
      [AdPlatform.TWITTER]: '🐦',
      [AdPlatform.YOUTUBE]: '📺',
      [AdPlatform.SNAPCHAT]: '👻',
      [AdPlatform.PINTEREST]: '📌'
    };
    return icons[platform] || '📱';
  };

  const chartData = [
    { name: 'Impressions', value: analytics?.totalImpressions || 0 },
    { name: 'Clicks', value: analytics?.totalClicks || 0 },
    { name: 'Conversions', value: analytics?.totalConversions || 0 },
    { name: 'Spend', value: analytics?.totalSpend || 0 }
  ];

  const performanceData = [
    { name: 'CTR', value: analytics?.averageCTR || 0 },
    { name: 'CPC', value: analytics?.averageCPC || 0 },
    { name: 'CPA', value: analytics?.averageCPA || 0 },
    { name: 'ROI', value: analytics?.overallROI || 0 }
  ];

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ad Campaign Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your paid advertising campaigns and track performance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.totalSpend.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.overallROI.toFixed(2) || '0'}%
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeCampaigns || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalCampaigns || 0} total campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalConversions.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics?.averageCTR.toFixed(2) || '0'}% CTR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Average performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Manage your advertising campaigns</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-8 w-64"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <Select value={filters.platform} onValueChange={(value) => setFilters({ ...filters, platform: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Platforms</SelectItem>
                  {Object.values(AdPlatform).map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  {Object.values(AdStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getPlatformIcon(campaign.platform)}</div>
                  <div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {campaign.platform} • {campaign.adType}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.adAnalytics?.[0]?.impressions.toLocaleString() || 0} impressions
                    </p>
                  </div>
                  
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  
                  <div className="flex gap-1">
                    {campaign.status === AdStatus.DRAFT && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCampaignAction(campaign.id, 'launch')}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    {campaign.status === AdStatus.ACTIVE && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCampaignAction(campaign.id, 'pause')}
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCampaignAction(campaign.id, 'duplicate')}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
