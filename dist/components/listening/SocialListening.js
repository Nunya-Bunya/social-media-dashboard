"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialListening = SocialListening;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const mockBrandMentions = [
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
const mockTrendingTopics = [
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
const mockSentimentAnalysis = {
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
function SocialListening() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [selectedPlatform, setSelectedPlatform] = (0, react_1.useState)('all');
    const [selectedSentiment, setSelectedSentiment] = (0, react_1.useState)('all');
    const [activeTab, setActiveTab] = (0, react_1.useState)('mentions');
    const [selectedMention, setSelectedMention] = (0, react_1.useState)(null);
    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive': return 'text-green-600';
            case 'negative': return 'text-red-600';
            case 'neutral': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };
    const getSentimentBadge = (sentiment) => {
        switch (sentiment) {
            case 'positive': return <badge_1.Badge className="bg-green-100 text-green-800">Positive</badge_1.Badge>;
            case 'negative': return <badge_1.Badge className="bg-red-100 text-red-800">Negative</badge_1.Badge>;
            case 'neutral': return <badge_1.Badge className="bg-gray-100 text-gray-800">Neutral</badge_1.Badge>;
            default: return <badge_1.Badge className="bg-gray-100 text-gray-800">Unknown</badge_1.Badge>;
        }
    };
    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive': return <lucide_react_1.ThumbsUp className="h-4 w-4 text-green-600"/>;
            case 'negative': return <lucide_react_1.ThumbsDown className="h-4 w-4 text-red-600"/>;
            case 'neutral': return <lucide_react_1.Minus className="h-4 w-4 text-gray-600"/>;
            default: return <lucide_react_1.Minus className="h-4 w-4 text-gray-600"/>;
        }
    };
    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'twitter': return <div className="w-4 h-4 bg-blue-400 rounded"/>;
            case 'facebook': return <div className="w-4 h-4 bg-blue-600 rounded"/>;
            case 'linkedin': return <div className="w-4 h-4 bg-blue-700 rounded"/>;
            case 'instagram': return <div className="w-4 h-4 bg-pink-600 rounded"/>;
            default: return <div className="w-4 h-4 bg-gray-400 rounded"/>;
        }
    };
    const getResponseStatusBadge = (status) => {
        switch (status) {
            case 'none': return <badge_1.Badge className="bg-red-100 text-red-800">No Response</badge_1.Badge>;
            case 'acknowledged': return <badge_1.Badge className="bg-yellow-100 text-yellow-800">Acknowledged</badge_1.Badge>;
            case 'responded': return <badge_1.Badge className="bg-blue-100 text-blue-800">Responded</badge_1.Badge>;
            case 'resolved': return <badge_1.Badge className="bg-green-100 text-green-800">Resolved</badge_1.Badge>;
            default: return <badge_1.Badge className="bg-gray-100 text-gray-800">Unknown</badge_1.Badge>;
        }
    };
    const getSentimentTrendIcon = (trend) => {
        switch (trend) {
            case 'improving': return <lucide_react_1.TrendingUp className="h-4 w-4 text-green-600"/>;
            case 'declining': return <lucide_react_1.TrendingDown className="h-4 w-4 text-red-600"/>;
            case 'stable': return <lucide_react_1.Minus className="h-4 w-4 text-gray-600"/>;
            default: return <lucide_react_1.Minus className="h-4 w-4 text-gray-600"/>;
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
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social Listening & Sentiment Analysis</h2>
          <p className="text-muted-foreground">
            Monitor brand mentions, analyze sentiment, and identify trending topics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="mr-2 h-4 w-4"/>
            Export Report
          </button_1.Button>
          <button_1.Button size="sm">
            <lucide_react_1.Settings className="mr-2 h-4 w-4"/>
            Configure Alerts
          </button_1.Button>
        </div>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="mentions">Brand Mentions</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="sentiment">Sentiment Analysis</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="trending">Trending Topics</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="alerts">Alerts</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="mentions" className="space-y-4">
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Total Mentions</card_1.CardTitle>
                <lucide_react_1.MessageSquare className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{mockSentimentAnalysis.totalMentions}</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <lucide_react_1.ArrowUp className="h-3 w-3"/>
                  <span>+12.5% from last week</span>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Positive</card_1.CardTitle>
                <lucide_react_1.ThumbsUp className="h-4 w-4 text-green-600"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-green-600">{mockSentimentAnalysis.positiveMentions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockSentimentAnalysis.positiveMentions / mockSentimentAnalysis.totalMentions) * 100)}% of total
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Negative</card_1.CardTitle>
                <lucide_react_1.ThumbsDown className="h-4 w-4 text-red-600"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-red-600">{mockSentimentAnalysis.negativeMentions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockSentimentAnalysis.negativeMentions / mockSentimentAnalysis.totalMentions) * 100)}% of total
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Response Rate</card_1.CardTitle>
                <lucide_react_1.CheckCircle className="h-4 w-4 text-blue-600"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold text-blue-600">{mockSentimentAnalysis.responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Avg: {mockSentimentAnalysis.averageResponseTime}
                </p>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input_1.Input placeholder="Search mentions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
              <option value="all">All Platforms</option>
              {platforms.map(platform => (<option key={platform} value={platform}>{platform}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedSentiment} onChange={(e) => setSelectedSentiment(e.target.value)}>
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          
          <div className="space-y-4">
            {filteredMentions.map((mention) => (<card_1.Card key={mention.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <card_1.CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(mention.platform)}
                          <span className="text-sm font-medium capitalize">{mention.platform}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">by {mention.author}</span>
                        {getSentimentBadge(mention.sentiment)}
                        {mention.actionRequired && (<badge_1.Badge className="bg-red-100 text-red-800">
                            Action Required
                          </badge_1.Badge>)}
                      </div>
                      
                      <p className="text-sm">{mention.content}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Clock className="h-3 w-3"/>
                          <span>{new Date(mention.timestamp).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Users className="h-3 w-3"/>
                          <span>{mention.engagement} engagement</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Eye className="h-3 w-3"/>
                          <span>{mention.reach} reach</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Tags:</span>
                        {mention.tags.map((tag, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </badge_1.Badge>))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Response Status:</span>
                        {getResponseStatusBadge(mention.responseStatus)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Eye className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.MessageSquare className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="sentiment" className="space-y-4">
          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center space-x-2">
                <lucide_react_1.Brain className="h-5 w-5"/>
                <span>Overall Sentiment Analysis</span>
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-center py-6">
                <div className={`text-6xl font-bold ${mockSentimentAnalysis.overallSentiment > 0 ? 'text-green-600' :
            mockSentimentAnalysis.overallSentiment < 0 ? 'text-red-600' : 'text-gray-600'} mb-4`}>
                  {mockSentimentAnalysis.overallSentiment > 0 ? '+' : ''}{mockSentimentAnalysis.overallSentiment.toFixed(2)}
                </div>
                <div className="text-2xl text-muted-foreground mb-4">Sentiment Score</div>
                <div className="flex items-center justify-center space-x-2">
                  {getSentimentTrendIcon(mockSentimentAnalysis.sentimentTrend)}
                  <span className="capitalize">{mockSentimentAnalysis.sentimentTrend}</span>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          
          <div className="grid gap-4 md:grid-cols-2">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center space-x-2">
                  <lucide_react_1.ThumbsUp className="h-5 w-5 text-green-600"/>
                  <span>Top Positive Topics</span>
                </card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-2">
                  {mockSentimentAnalysis.topPositiveTopics.map((topic, index) => (<div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"/>
                      <span className="text-sm">{topic}</span>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center space-x-2">
                  <lucide_react_1.ThumbsDown className="h-5 w-5 text-red-600"/>
                  <span>Top Negative Topics</span>
                </card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-2">
                  {mockSentimentAnalysis.topNegativeTopics.map((topic, index) => (<div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"/>
                      <span className="text-sm">{topic}</span>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Response Performance</card_1.CardTitle>
              <card_1.CardDescription>
                How quickly and effectively you're responding to mentions
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
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
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="trending" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Trending Topics in Legal Industry</card_1.CardTitle>
              <card_1.CardDescription>
                Topics gaining momentum that you can leverage for content creation
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {mockTrendingTopics.map((topic) => (<div key={topic.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{topic.topic}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <badge_1.Badge variant="outline">
                            Volume: {topic.volume.toLocaleString()}
                          </badge_1.Badge>
                          <badge_1.Badge className="bg-green-100 text-green-800">
                            +{topic.growth}% growth
                          </badge_1.Badge>
                          {getSentimentBadge(topic.sentiment)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Relevance</div>
                        <badge_1.Badge className={`${topic.relevance === 'high' ? 'bg-green-100 text-green-800' :
                topic.relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                          {topic.relevance}
                        </badge_1.Badge>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Related Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.relatedKeywords.map((keyword, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </badge_1.Badge>))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Platforms</h4>
                        <div className="flex space-x-2">
                          {topic.platforms.map((platform, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                              {platform}
                            </badge_1.Badge>))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button_1.Button variant="outline" size="sm">
                        <lucide_react_1.Eye className="mr-2 h-4 w-4"/>
                        View Details
                      </button_1.Button>
                      <button_1.Button size="sm">
                        <lucide_react_1.FileText className="mr-2 h-4 w-4"/>
                        Create Content
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
              <card_1.CardTitle>Social Listening Alerts</card_1.CardTitle>
              <card_1.CardDescription>
                Configure alerts for specific keywords, mentions, or sentiment changes
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-center py-12">
                <lucide_react_1.Bell className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
                <h3 className="text-lg font-medium mb-2">Configure Your Alerts</h3>
                <p className="text-muted-foreground mb-6">
                  Set up notifications for brand mentions, sentiment changes, and trending topics
                </p>
                <button_1.Button>
                  <lucide_react_1.Settings className="mr-2 h-4 w-4"/>
                  Configure Alerts
                </button_1.Button>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=SocialListening.js.map