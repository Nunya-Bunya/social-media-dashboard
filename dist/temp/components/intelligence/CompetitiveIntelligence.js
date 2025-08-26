"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitiveIntelligence = CompetitiveIntelligence;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const mockCompetitors = [
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
const mockMarketGaps = [
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
const mockAlerts = [
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
function CompetitiveIntelligence() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [selectedCompetitor, setSelectedCompetitor] = (0, react_1.useState)(null);
    const [activeTab, setActiveTab] = (0, react_1.useState)('overview');
    const [selectedIndustry, setSelectedIndustry] = (0, react_1.useState)('all');
    const [selectedThreatLevel, setSelectedThreatLevel] = (0, react_1.useState)('all');
    const getThreatLevelColor = (level) => {
        switch (level) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };
    const getThreatLevelBadge = (level) => {
        switch (level) {
            case 'high': return <badge_1.Badge className="bg-red-100 text-red-800">High Threat</badge_1.Badge>;
            case 'medium': return <badge_1.Badge className="bg-yellow-100 text-yellow-800">Medium Threat</badge_1.Badge>;
            case 'low': return <badge_1.Badge className="bg-green-100 text-green-800">Low Threat</badge_1.Badge>;
            default: return <badge_1.Badge className="bg-gray-100 text-gray-800">Unknown</badge_1.Badge>;
        }
    };
    const getOpportunityColor = (opportunity) => {
        switch (opportunity) {
            case 'high': return 'text-green-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    const getAlertIcon = (type) => {
        switch (type) {
            case 'new_content': return <lucide_react_1.FileText className="h-4 w-4"/>;
            case 'ranking_change': return <lucide_react_1.TrendingUp className="h-4 w-4"/>;
            case 'social_activity': return <lucide_react_1.Users className="h-4 w-4"/>;
            case 'backlink_change': return <lucide_react_1.Link className="h-4 w-4"/>;
            case 'content_launch': return <lucide_react_1.Rocket className="h-4 w-4"/>;
            default: return <lucide_react_1.AlertCircle className="h-4 w-4"/>;
        }
    };
    const getImpactColor = (impact) => {
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
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Competitive Intelligence</h2>
          <p className="text-muted-foreground">
            Monitor competitors, identify market gaps, and stay ahead of the competition
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="mr-2 h-4 w-4"/>
            Export Report
          </button_1.Button>
          <button_1.Button size="sm">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Add Competitor
          </button_1.Button>
        </div>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="overview">Overview</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="competitors">Competitors</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="gaps">Market Gaps</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="alerts">Alerts</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-4">
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Total Competitors</card_1.CardTitle>
                <lucide_react_1.Eye className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{mockCompetitors.length}</div>
                <p className="text-xs text-muted-foreground">
                  Actively monitored
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">High Threat</card_1.CardTitle>
                <lucide_react_1.AlertTriangle className="h-4 w-4 text-red-600"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockCompetitors.filter(c => c.threatLevel === 'high').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Competitors to watch closely
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Market Gaps</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockMarketGaps.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Opportunities identified
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Active Alerts</card_1.CardTitle>
                <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-600"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockAlerts.filter(a => a.actionRequired).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Competitive Positioning Matrix</card_1.CardTitle>
              <card_1.CardDescription>
                Your position relative to competitors across key metrics
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockCompetitors.map((competitor) => (<div key={competitor.id} className="border rounded-lg p-4">
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
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${competitor.seoScore}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Social Score:</span>
                        <span className="font-medium">{competitor.socialScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${competitor.socialScore}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Content Score:</span>
                        <span className="font-medium">{competitor.contentScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${competitor.contentScore}%` }}></div>
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
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="competitors" className="space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input_1.Input placeholder="Search competitors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
              <option value="all">All Industries</option>
              {industries.map(industry => (<option key={industry} value={industry}>{industry}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedThreatLevel} onChange={(e) => setSelectedThreatLevel(e.target.value)}>
              <option value="all">All Threat Levels</option>
              <option value="high">High Threat</option>
              <option value="medium">Medium Threat</option>
              <option value="low">Low Threat</option>
            </select>
          </div>

          
          <div className="space-y-4">
            {filteredCompetitors.map((competitor) => (<card_1.Card key={competitor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <card_1.CardContent className="p-4">
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
                          <badge_1.Badge variant="outline" className="capitalize">
                            {competitor.size}
                          </badge_1.Badge>
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
                            {competitor.strengths.map((strength, index) => (<div key={index} className="flex items-center space-x-2 text-sm">
                                <lucide_react_1.CheckCircle className="h-3 w-3 text-green-500"/>
                                <span>{strength}</span>
                              </div>))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Weaknesses</h4>
                          <div className="space-y-1">
                            {competitor.weaknesses.map((weakness, index) => (<div key={index} className="flex items-center space-x-2 text-sm">
                                <lucide_react_1.XCircle className="h-3 w-3 text-red-500"/>
                                <span>{weakness}</span>
                              </div>))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Top Keywords:</span>
                        {competitor.topKeywords.map((keyword, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </badge_1.Badge>))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Eye className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.BarChart3 className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.AlertTriangle className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="gaps" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Market Gap Analysis</card_1.CardTitle>
              <card_1.CardDescription>
                Identified opportunities where you can outperform competitors
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {mockMarketGaps.map((gap) => (<div key={gap.id} className="border rounded-lg p-4">
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
                          {gap.competitors.map((competitor, index) => (<badge_1.Badge key={index} variant="outline">
                              {competitor}
                            </badge_1.Badge>))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommended Action:</h4>
                        <p className="text-sm text-muted-foreground">{gap.recommendedAction}</p>
                        <div className="mt-2">
                          <badge_1.Badge variant="outline">
                            Timeline: {gap.timeline}
                          </badge_1.Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button_1.Button variant="outline" size="sm">
                        <lucide_react_1.Lightbulb className="mr-2 h-4 w-4"/>
                        View Details
                      </button_1.Button>
                      <button_1.Button size="sm">
                        <lucide_react_1.Target className="mr-2 h-4 w-4"/>
                        Create Strategy
                      </button_1.Button>
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="alerts" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Competitive Alerts</card_1.CardTitle>
              <card_1.CardDescription>
                Real-time notifications about competitor activities
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (<div key={alert.id} className={`border rounded-lg p-4 ${alert.actionRequired ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${alert.actionRequired ? 'bg-red-100' : 'bg-blue-100'}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{alert.title}</h3>
                          <div className="flex items-center space-x-2">
                            <badge_1.Badge variant="outline" className="capitalize">
                              {alert.type.replace('_', ' ')}
                            </badge_1.Badge>
                            <badge_1.Badge className={`${alert.impact === 'high' ? 'bg-red-100 text-red-800' :
                alert.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                              {alert.impact} Impact
                            </badge_1.Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Competitor: {alert.competitor}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {alert.actionRequired && (<badge_1.Badge className="bg-red-100 text-red-800">
                            Action Required
                          </badge_1.Badge>)}
                        <button_1.Button variant="ghost" size="sm">
                          <lucide_react_1.Eye className="h-4 w-4"/>
                        </button_1.Button>
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
//# sourceMappingURL=CompetitiveIntelligence.js.map