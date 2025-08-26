'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdCampaignDashboard;
const react_1 = require("react");
const ad_campaigns_1 = require("../../types/ad-campaigns");
const adCampaignApi_1 = require("../../lib/adCampaignApi");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const recharts_1 = require("recharts");
const lucide_react_1 = require("lucide-react");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const skeleton_1 = require("@/components/ui/skeleton");
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
function AdCampaignDashboard({ className }) {
    const [stats, setStats] = (0, react_1.useState)(null);
    const [campaigns, setCampaigns] = (0, react_1.useState)([]);
    const [analytics, setAnalytics] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [filters, setFilters] = (0, react_1.useState)({
        platform: '',
        status: '',
        search: ''
    });
    (0, react_1.useEffect)(() => {
        loadDashboardData();
    }, []);
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, campaignsData, analyticsData] = await Promise.all([
                adCampaignApi_1.adCampaignApi.getAdCampaignStats(),
                adCampaignApi_1.adCampaignApi.getAdCampaigns({ limit: 10 }),
                adCampaignApi_1.adCampaignApi.getAnalyticsOverview({
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    endDate: new Date().toISOString()
                })
            ]);
            setStats(statsData);
            setCampaigns(campaignsData.campaigns || []);
            setAnalytics(analyticsData);
        }
        catch (error) {
            console.error('Error loading dashboard data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCampaignAction = async (campaignId, action) => {
        try {
            switch (action) {
                case 'launch':
                    await adCampaignApi_1.adCampaignApi.launchAdCampaign(campaignId);
                    break;
                case 'pause':
                    await adCampaignApi_1.adCampaignApi.pauseAdCampaign(campaignId);
                    break;
                case 'duplicate':
                    await adCampaignApi_1.adCampaignApi.duplicateAdCampaign(campaignId);
                    break;
            }
            loadDashboardData();
        }
        catch (error) {
            console.error(`Error ${action}ing campaign:`, error);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case ad_campaigns_1.AdStatus.ACTIVE:
                return 'bg-green-100 text-green-800';
            case ad_campaigns_1.AdStatus.PAUSED:
                return 'bg-yellow-100 text-yellow-800';
            case ad_campaigns_1.AdStatus.DRAFT:
                return 'bg-gray-100 text-gray-800';
            case ad_campaigns_1.AdStatus.COMPLETED:
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-red-100 text-red-800';
        }
    };
    const getPlatformIcon = (platform) => {
        const icons = {
            [ad_campaigns_1.AdPlatform.FACEBOOK]: '📘',
            [ad_campaigns_1.AdPlatform.INSTAGRAM]: '📷',
            [ad_campaigns_1.AdPlatform.GOOGLE_ADS]: '🔍',
            [ad_campaigns_1.AdPlatform.TIKTOK]: '🎵',
            [ad_campaigns_1.AdPlatform.LINKEDIN]: '💼',
            [ad_campaigns_1.AdPlatform.TWITTER]: '🐦',
            [ad_campaigns_1.AdPlatform.YOUTUBE]: '📺',
            [ad_campaigns_1.AdPlatform.SNAPCHAT]: '👻',
            [ad_campaigns_1.AdPlatform.PINTEREST]: '📌'
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
        return (<div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (<card_1.Card key={i}>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <skeleton_1.Skeleton className="h-4 w-24"/>
                <skeleton_1.Skeleton className="h-4 w-4"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <skeleton_1.Skeleton className="h-8 w-16 mb-2"/>
                <skeleton_1.Skeleton className="h-3 w-32"/>
              </card_1.CardContent>
            </card_1.Card>))}
        </div>
        <skeleton_1.Skeleton className="h-64 w-full"/>
      </div>);
    }
    return (<div className={`space-y-6 ${className}`}>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ad Campaign Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your paid advertising campaigns and track performance
          </p>
        </div>
        <button_1.Button className="flex items-center gap-2">
          <lucide_react_1.Plus className="h-4 w-4"/>
          Create Campaign
        </button_1.Button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Total Spend</card_1.CardTitle>
            <lucide_react_1.DollarSign className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              ${stats?.totalSpend.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Overall ROI</card_1.CardTitle>
            <lucide_react_1.TrendingUp className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {analytics?.overallROI.toFixed(2) || '0'}%
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Active Campaigns</card_1.CardTitle>
            <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeCampaigns || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalCampaigns || 0} total campaigns
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Conversions</card_1.CardTitle>
            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalConversions.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics?.averageCTR.toFixed(2) || '0'}% CTR
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Performance Overview</card_1.CardTitle>
            <card_1.CardDescription>Key metrics over time</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.BarChart data={chartData}>
                <recharts_1.CartesianGrid strokeDasharray="3 3"/>
                <recharts_1.XAxis dataKey="name"/>
                <recharts_1.YAxis />
                <recharts_1.Tooltip />
                <recharts_1.Bar dataKey="value" fill="#8884d8"/>
              </recharts_1.BarChart>
            </recharts_1.ResponsiveContainer>
          </card_1.CardContent>
        </card_1.Card>

        
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Performance Metrics</card_1.CardTitle>
            <card_1.CardDescription>Average performance indicators</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.PieChart>
                <recharts_1.Pie data={performanceData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value.toFixed(2)}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {performanceData.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </recharts_1.Pie>
                <recharts_1.Tooltip />
              </recharts_1.PieChart>
            </recharts_1.ResponsiveContainer>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <card_1.CardTitle>Recent Campaigns</card_1.CardTitle>
              <card_1.CardDescription>Manage your advertising campaigns</card_1.CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                <input_1.Input placeholder="Search campaigns..." className="pl-8 w-64" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}/>
              </div>
              <select_1.Select value={filters.platform} onValueChange={(value) => setFilters({ ...filters, platform: value })}>
                <select_1.SelectTrigger className="w-32">
                  <select_1.SelectValue placeholder="Platform"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="">All Platforms</select_1.SelectItem>
                  {Object.values(ad_campaigns_1.AdPlatform).map((platform) => (<select_1.SelectItem key={platform} value={platform}>
                      {platform}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
              <select_1.Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <select_1.SelectTrigger className="w-32">
                  <select_1.SelectValue placeholder="Status"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="">All Status</select_1.SelectItem>
                  {Object.values(ad_campaigns_1.AdStatus).map((status) => (<select_1.SelectItem key={status} value={status}>
                      {status}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (<div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
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
                  
                  <badge_1.Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </badge_1.Badge>
                  
                  <div className="flex gap-1">
                    {campaign.status === ad_campaigns_1.AdStatus.DRAFT && (<button_1.Button size="sm" variant="outline" onClick={() => handleCampaignAction(campaign.id, 'launch')}>
                        <lucide_react_1.Play className="h-3 w-3"/>
                      </button_1.Button>)}
                    {campaign.status === ad_campaigns_1.AdStatus.ACTIVE && (<button_1.Button size="sm" variant="outline" onClick={() => handleCampaignAction(campaign.id, 'pause')}>
                        <lucide_react_1.Pause className="h-3 w-3"/>
                      </button_1.Button>)}
                    <button_1.Button size="sm" variant="outline" onClick={() => handleCampaignAction(campaign.id, 'duplicate')}>
                      <lucide_react_1.Copy className="h-3 w-3"/>
                    </button_1.Button>
                    <button_1.Button size="sm" variant="outline">
                      <lucide_react_1.MoreHorizontal className="h-3 w-3"/>
                    </button_1.Button>
                  </div>
                </div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=AdCampaignDashboard.js.map