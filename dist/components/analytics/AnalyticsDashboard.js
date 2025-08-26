"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsDashboard = AnalyticsDashboard;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const mockAnalytics = {
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
    { id: 'facebook', name: 'Facebook', icon: lucide_react_1.Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: lucide_react_1.Instagram, color: 'bg-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: lucide_react_1.Linkedin, color: 'bg-blue-700' },
    { id: 'twitter', name: 'Twitter', icon: lucide_react_1.Twitter, color: 'bg-blue-400' }
];
function AnalyticsDashboard() {
    const [selectedPeriod, setSelectedPeriod] = (0, react_1.useState)('30');
    const [selectedPlatform, setSelectedPlatform] = (0, react_1.useState)('all');
    const getGrowthIndicator = (current, previous) => {
        const growth = ((current - previous) / previous) * 100;
        return {
            value: Math.abs(growth).toFixed(1),
            isPositive: growth >= 0,
            icon: growth >= 0 ? <lucide_react_1.TrendingUp className="h-4 w-4"/> : <lucide_react_1.TrendingDown className="h-4 w-4"/>
        };
    };
    const formatNumber = (num) => {
        if (num >= 1000000)
            return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000)
            return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };
    const getPlatformIcon = (platformId) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? <platform.icon className="h-4 w-4"/> : <lucide_react_1.Globe className="h-4 w-4"/>;
    };
    return (<div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track performance, engagement, and ROI across all platforms
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select_1.Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <select_1.SelectTrigger className="w-[140px]">
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="7">Last 7 days</select_1.SelectItem>
              <select_1.SelectItem value="30">Last 30 days</select_1.SelectItem>
              <select_1.SelectItem value="90">Last 90 days</select_1.SelectItem>
              <select_1.SelectItem value="365">Last year</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="mr-2 h-4 w-4"/>
            Export Report
          </button_1.Button>
        </div>
      </div>

      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Total Posts</card_1.CardTitle>
            <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalPosts}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <lucide_react_1.TrendingUp className="h-3 w-3 text-green-500"/>
              <span>+12.5% from last period</span>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Total Engagement</card_1.CardTitle>
            <lucide_react_1.Heart className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockAnalytics.totalEngagement)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <lucide_react_1.TrendingUp className="h-3 w-3 text-green-500"/>
              <span>+8.2% from last period</span>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Total Reach</card_1.CardTitle>
            <lucide_react_1.Eye className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockAnalytics.totalReach)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <lucide_react_1.TrendingUp className="h-3 w-3 text-green-500"/>
              <span>+15.7% from last period</span>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Conversion Rate</card_1.CardTitle>
            <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.conversionRate}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <lucide_react_1.TrendingUp className="h-3 w-3 text-green-500"/>
              <span>+0.8% from last period</span>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.DollarSign className="h-5 w-5 text-green-600"/>
              <span>Estimated ROI</span>
            </card_1.CardTitle>
            <card_1.CardDescription>Return on social media investment</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-3xl font-bold text-green-600">
              {mockAnalytics.estimatedROI}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              For every $1 spent, you're generating ${(mockAnalytics.estimatedROI / 100).toFixed(2)} in value
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.Users className="h-5 w-5 text-blue-600"/>
              <span>Cost Per Click</span>
            </card_1.CardTitle>
            <card_1.CardDescription>Average cost per click across platforms</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-3xl font-bold text-blue-600">
              ${mockAnalytics.costPerClick}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Industry average: $1.50 • You're saving 43%
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.BarChart3 className="h-5 w-5 text-purple-600"/>
              <span>Total Clicks</span>
            </card_1.CardTitle>
            <card_1.CardDescription>Website clicks from social media</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatNumber(mockAnalytics.totalClicks)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {mockAnalytics.totalClicks / mockAnalytics.totalPosts} clicks per post average
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Platform Performance Breakdown</card_1.CardTitle>
          <card_1.CardDescription>
            How each platform is performing for your content
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(mockAnalytics.platformBreakdown).map(([platform, data]) => (<div key={platform} className="space-y-3">
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
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(data.engagement / mockAnalytics.totalEngagement) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Top Performing Posts</card_1.CardTitle>
          <card_1.CardDescription>
            Your best content based on engagement and reach
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            {mockAnalytics.topPosts.map((post, index) => (<div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
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
                      <lucide_react_1.Heart className="h-3 w-3"/>
                      <span>{formatNumber(post.engagement)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <lucide_react_1.Eye className="h-3 w-3"/>
                      <span>{formatNumber(post.reach)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <lucide_react_1.Target className="h-3 w-3"/>
                      <span>{post.clicks} clicks</span>
                    </span>
                  </div>
                </div>
                <button_1.Button variant="outline" size="sm">
                  <lucide_react_1.Eye className="h-4 w-4"/>
                </button_1.Button>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=AnalyticsDashboard.js.map