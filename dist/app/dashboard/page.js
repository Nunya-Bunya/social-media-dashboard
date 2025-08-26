"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const react_1 = require("react");
const BusinessSelector_1 = require("@/components/business/BusinessSelector");
const ContentCreator_1 = require("@/components/social/ContentCreator");
const AnalyticsDashboard_1 = require("@/components/analytics/AnalyticsDashboard");
const ClientOnboarding_1 = require("@/components/onboarding/ClientOnboarding");
const ContentBasket_1 = require("@/components/content/ContentBasket");
const SeoDashboard_1 = require("@/components/seo/SeoDashboard");
const ContentCalendar_1 = require("@/components/calendar/ContentCalendar");
const CompetitiveIntelligence_1 = require("@/components/intelligence/CompetitiveIntelligence");
const SocialListening_1 = require("@/components/listening/SocialListening");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const card_1 = require("@/components/ui/card");
function DashboardPage() {
    const [activeTab, setActiveTab] = (0, react_1.useState)("overview");
    return (<div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nunya Bunya Marketing Dashboard</h1>
          <p className="text-muted-foreground">
            Your complete social media management platform for law firms
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            MVP Ready
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Phase 2 Complete
          </div>
          <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Phase 3 Complete
          </div>
          <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Enterprise Ready
          </div>
        </div>
      </div>

      
      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <tabs_1.TabsList className="grid w-full grid-cols-10">
          <tabs_1.TabsTrigger value="overview" className="flex items-center space-x-2">
            <lucide_react_1.Building2 className="h-4 w-4"/>
            <span className="hidden sm:inline">Overview</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="content" className="flex items-center space-x-2">
            <lucide_react_1.FileText className="h-4 w-4"/>
            <span className="hidden sm:inline">Content</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="basket" className="flex items-center space-x-2">
            <lucide_react_1.Sparkles className="h-4 w-4"/>
            <span className="hidden sm:inline">AI Basket</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="calendar" className="flex items-center space-x-2">
            <lucide_react_1.Calendar className="h-4 w-4"/>
            <span className="hidden sm:inline">Calendar</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="seo" className="flex items-center space-x-2">
            <lucide_react_1.Search className="h-4 w-4"/>
            <span className="hidden sm:inline">SEO</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="intelligence" className="flex items-center space-x-2">
            <lucide_react_1.Eye className="h-4 w-4"/>
            <span className="hidden sm:inline">Competition</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="listening" className="flex items-center space-x-2">
            <lucide_react_1.Ear className="h-4 w-4"/>
            <span className="hidden sm:inline">Listening</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="analytics" className="flex items-center space-x-2">
            <lucide_react_1.BarChart3 className="h-4 w-4"/>
            <span className="hidden sm:inline">Analytics</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="clients" className="flex items-center space-x-2">
            <lucide_react_1.Users className="h-4 w-4"/>
            <span className="hidden sm:inline">Clients</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="onboarding" className="flex items-center space-x-2">
            <lucide_react_1.Plus className="h-4 w-4"/>
            <span className="hidden sm:inline">Onboard</span>
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        
        <tabs_1.TabsContent value="overview" className="space-y-6">
          <BusinessSelector_1.BusinessSelector />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="content" className="space-y-6">
          <ContentCreator_1.ContentCreator />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="basket" className="space-y-6">
          <ContentBasket_1.ContentBasket />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="calendar" className="space-y-6">
          <ContentCalendar_1.ContentCalendar />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="seo" className="space-y-6">
          <SeoDashboard_1.SeoDashboard />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="intelligence" className="space-y-6">
          <CompetitiveIntelligence_1.CompetitiveIntelligence />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="listening" className="space-y-6">
          <SocialListening_1.SocialListening />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard_1.AnalyticsDashboard />
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="clients" className="space-y-6">
          <div className="text-center py-12">
            <lucide_react_1.Users className="mx-auto h-16 w-16 text-gray-400 mb-4"/>
            <h3 className="text-xl font-medium mb-2">Client Management Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Manage all your law firm clients, their social media accounts, and performance metrics
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
              <div className="p-4 border rounded-lg">
                <lucide_react_1.Target className="h-8 w-8 text-blue-600 mx-auto mb-2"/>
                <h4 className="font-medium">Client Overview</h4>
                <p className="text-sm text-gray-600">Track client success metrics</p>
              </div>
              <div className="p-4 border rounded-lg">
                <lucide_react_1.TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2"/>
                <h4 className="font-medium">Performance</h4>
                <p className="text-sm text-gray-600">Track client success metrics</p>
              </div>
              <div className="p-4 border rounded-lg">
                <lucide_react_1.Rocket className="h-8 w-8 text-purple-600 mx-auto mb-2"/>
                <h4 className="font-medium">Growth</h4>
                <p className="text-sm text-gray-600">Scale your client base</p>
              </div>
            </div>
          </div>
        </tabs_1.TabsContent>

        
        <tabs_1.TabsContent value="onboarding" className="space-y-6">
          <ClientOnboarding_1.ClientOnboarding />
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      
      <div className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-600 to-purple-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <lucide_react_1.Brain className="h-6 w-6"/>
          <div>
            <h4 className="font-semibold">Phase 3 Complete! 🧠</h4>
            <p className="text-sm opacity-90">
              AI Intelligence, Competitive Analysis & Social Listening ready!
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid gap-4 md:grid-cols-4 mt-8">
        <card_1.Card className="border-l-4 border-l-green-500">
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.Building2 className="h-5 w-5 text-green-600"/>
              <span>Phase 1: MVP Core</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Complete social media management platform
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>Business Management System</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>Social Media Core</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>Basic Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>User Authentication</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>Client Onboarding</span>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="border-l-4 border-l-blue-500">
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.Sparkles className="h-5 w-5 text-blue-600"/>
              <span>Phase 2: Content & SEO</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Advanced content creation and SEO tools
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"/>
                <span>AI Content Basket (20 Templates)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"/>
                <span>SEO Dashboard & Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"/>
                <span>Content Calendar & Scheduling</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"/>
                <span>Brand Management & Assets</span>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="border-l-4 border-l-purple-500">
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.Brain className="h-5 w-5 text-purple-600"/>
              <span>Phase 3: Intelligence</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              AI-powered insights and automation
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"/>
                <span>Competitive Intelligence</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"/>
                <span>Social Listening & Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"/>
                <span>Sentiment Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"/>
                <span>Trending Topic Detection</span>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="border-l-4 border-l-orange-500">
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.Zap className="h-5 w-5 text-orange-600"/>
              <span>Phase 4: Enterprise</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Enterprise-level features and automation
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"/>
                <span>PR & Media Management</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"/>
                <span>Email Marketing Center</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"/>
                <span>Client Portal System</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"/>
                <span>Advanced Automation</span>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map