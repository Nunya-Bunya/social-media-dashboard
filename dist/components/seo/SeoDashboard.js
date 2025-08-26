"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoDashboard = SeoDashboard;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const mockKeywords = [
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
const mockSeoHealth = {
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
const mockCompetitors = [
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
function SeoDashboard() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [activeTab, setActiveTab] = (0, react_1.useState)('overview');
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <lucide_react_1.ArrowUp className="h-4 w-4 text-green-600"/>;
            case 'down': return <lucide_react_1.ArrowDown className="h-4 w-4 text-red-600"/>;
            default: return <lucide_react_1.Minus className="h-4 w-4 text-gray-600"/>;
        }
    };
    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return 'text-green-600';
            case 'down': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    const getHealthScoreColor = (score) => {
        if (score >= 80)
            return 'text-green-600';
        if (score >= 60)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    const getHealthScoreBadge = (score) => {
        if (score >= 80)
            return <badge_1.Badge className="bg-green-100 text-green-800">Excellent</badge_1.Badge>;
        if (score >= 60)
            return <badge_1.Badge className="bg-yellow-100 text-yellow-800">Good</badge_1.Badge>;
        return <badge_1.Badge className="bg-red-100 text-red-800">Needs Work</badge_1.Badge>;
    };
    const getIssueIcon = (type) => {
        switch (type) {
            case 'error': return <lucide_react_1.XCircle className="h-4 w-4 text-red-600"/>;
            case 'warning': return <lucide_react_1.AlertTriangle className="h-4 w-4 text-yellow-600"/>;
            case 'info': return <lucide_react_1.CheckCircle2 className="h-4 w-4 text-blue-600"/>;
            default: return <lucide_react_1.AlertCircle className="h-4 w-4 text-gray-600"/>;
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-200 bg-red-50';
            case 'medium': return 'border-yellow-200 bg-yellow-50';
            case 'low': return 'border-blue-200 bg-blue-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Dashboard</h2>
          <p className="text-muted-foreground">
            Track keywords, monitor website health, and analyze competitor performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="mr-2 h-4 w-4"/>
            Export Report
          </button_1.Button>
          <button_1.Button size="sm">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Add Keyword
          </button_1.Button>
        </div>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="overview">Overview</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="keywords">Keywords</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="health">Health Check</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="competitors">Competitors</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-4">
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">SEO Score</card_1.CardTitle>
                <lucide_react_1.Shield className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className={`text-2xl font-bold ${getHealthScoreColor(mockSeoHealth.score)}`}>
                  {mockSeoHealth.score}/100
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {getHealthScoreBadge(mockSeoHealth.score)}
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Tracked Keywords</card_1.CardTitle>
                <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{mockKeywords.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active keyword monitoring
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Organic Traffic</card_1.CardTitle>
                <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">24.5K</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <lucide_react_1.ArrowUp className="h-3 w-3"/>
                  <span>+12.3% from last month</span>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Backlinks</card_1.CardTitle>
                <lucide_react_1.Globe className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">342</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <lucide_react_1.ArrowUp className="h-3 w-3"/>
                  <span>+8.7% from last month</span>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Quick Actions</card_1.CardTitle>
              <card_1.CardDescription>
                Common SEO tasks and optimizations
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.Search className="h-6 w-6 mb-2"/>
                  <span>Keyword Research</span>
                </button_1.Button>
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.Monitor className="h-6 w-6 mb-2"/>
                  <span>Site Audit</span>
                </button_1.Button>
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.BarChart3 className="h-6 w-6 mb-2"/>
                  <span>Performance Report</span>
                </button_1.Button>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="keywords" className="space-y-4">
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <input_1.Input placeholder="Search keywords..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <button_1.Button variant="outline">
              <lucide_react_1.Search className="mr-2 h-4 w-4"/>
              Search
            </button_1.Button>
          </div>

          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Keyword Rankings</card_1.CardTitle>
              <card_1.CardDescription>
                Track your keyword performance and competitor positions
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {mockKeywords.map((keyword) => (<div key={keyword.keyword} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{keyword.keyword}</h3>
                        <badge_1.Badge variant="outline">
                          Vol: {keyword.searchVolume.toLocaleString()}
                        </badge_1.Badge>
                        <badge_1.Badge variant="outline">
                          CPC: ${keyword.cpc}
                        </badge_1.Badge>
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
                          {keyword.competitorRanks.slice(0, 3).map((comp) => (<div key={comp.competitor} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{comp.competitor}:</span>
                              <span className="font-medium">#{comp.rank}</span>
                            </div>))}
                        </div>
                      </div>
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="health" className="space-y-4">
          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center space-x-2">
                <lucide_react_1.Shield className="h-5 w-5"/>
                <span>Website Health Score</span>
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-center py-6">
                <div className={`text-6xl font-bold ${getHealthScoreColor(mockSeoHealth.score)} mb-4`}>
                  {mockSeoHealth.score}
                </div>
                <div className="text-2xl text-muted-foreground mb-4">out of 100</div>
                {getHealthScoreBadge(mockSeoHealth.score)}
              </div>
            </card_1.CardContent>
          </card_1.Card>

          
          <div className="grid gap-4 md:grid-cols-2">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center space-x-2">
                  <lucide_react_1.AlertTriangle className="h-5 w-5 text-yellow-600"/>
                  <span>Issues Found</span>
                </card_1.CardTitle>
                <card_1.CardDescription>
                  {mockSeoHealth.issues.length} issues that need attention
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-3">
                  {mockSeoHealth.issues.map((issue, index) => (<div key={index} className={`p-3 rounded-lg border ${getPriorityColor(issue.priority)}`}>
                      <div className="flex items-start space-x-2">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{issue.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                        </div>
                        <badge_1.Badge variant="outline" className="capitalize">
                          {issue.priority}
                        </badge_1.Badge>
                      </div>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center space-x-2">
                  <lucide_react_1.CheckCircle className="h-5 w-5 text-green-600"/>
                  <span>Recommendations</span>
                </card_1.CardTitle>
                <card_1.CardDescription>
                  Actionable steps to improve your SEO
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-3">
                  {mockSeoHealth.recommendations.map((rec, index) => (<div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"/>
                      <p className="text-sm">{rec}</p>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="competitors" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Competitor Analysis</card_1.CardTitle>
              <card_1.CardDescription>
                Monitor your competitors' SEO performance and strategies
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {mockCompetitors.map((competitor) => (<div key={competitor.name} className="border rounded-lg p-4">
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
                        {competitor.topKeywords.map((keyword, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </badge_1.Badge>))}
                      </div>
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=SeoDashboard.js.map