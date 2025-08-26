"use client"
import React, { useState } from "react"
import { BusinessSelector } from "@/components/business/BusinessSelector"
import { ContentCreator } from "@/components/social/ContentCreator"
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard"
import { ClientOnboarding } from "@/components/onboarding/ClientOnboarding"
import { ContentBasket } from "@/components/content/ContentBasket"
import { SeoDashboard } from "@/components/seo/SeoDashboard"
import { ContentCalendar } from "@/components/calendar/ContentCalendar"
import { CompetitiveIntelligence } from "@/components/intelligence/CompetitiveIntelligence"
import { SocialListening } from "@/components/listening/SocialListening"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2,
  FileText,
  BarChart3,
  Users,
  Plus,
  Rocket,
  Target,
  TrendingUp,
  Sparkles,
  Search,
  Calendar,
  Palette,
  Eye,
  Ear,
  Brain,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-10">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="basket" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Basket</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Competition</span>
          </TabsTrigger>
          <TabsTrigger value="listening" className="flex items-center space-x-2">
            <Ear className="h-4 w-4" />
            <span className="hidden sm:inline">Listening</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Clients</span>
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Onboard</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Business Management */}
        <TabsContent value="overview" className="space-y-6">
          <BusinessSelector />
        </TabsContent>

        {/* Content Tab - Social Media Management */}
        <TabsContent value="content" className="space-y-6">
          <ContentCreator />
        </TabsContent>

        {/* AI Content Basket Tab - Phase 2 Feature */}
        <TabsContent value="basket" className="space-y-6">
          <ContentBasket />
        </TabsContent>

        {/* Content Calendar Tab - Phase 2 Feature */}
        <TabsContent value="calendar" className="space-y-6">
          <ContentCalendar />
        </TabsContent>

        {/* SEO Dashboard Tab - Phase 2 Feature */}
        <TabsContent value="seo" className="space-y-6">
          <SeoDashboard />
        </TabsContent>

        {/* Competitive Intelligence Tab - Phase 3 Feature */}
        <TabsContent value="intelligence" className="space-y-6">
          <CompetitiveIntelligence />
        </TabsContent>

        {/* Social Listening Tab - Phase 3 Feature */}
        <TabsContent value="listening" className="space-y-6">
          <SocialListening />
        </TabsContent>

        {/* Analytics Tab - Performance Tracking */}
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard />
        </TabsContent>

        {/* Clients Tab - Client Management */}
        <TabsContent value="clients" className="space-y-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Client Management Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Manage all your law firm clients, their social media accounts, and performance metrics
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
              <div className="p-4 border rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium">Client Overview</h4>
                <p className="text-sm text-gray-600">Track client success metrics</p>
              </div>
              <div className="p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium">Performance</h4>
                <p className="text-sm text-gray-600">Track client success metrics</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Rocket className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium">Growth</h4>
                <p className="text-sm text-gray-600">Scale your client base</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Onboarding Tab - New Client Setup */}
        <TabsContent value="onboarding" className="space-y-6">
          <ClientOnboarding />
        </TabsContent>
      </Tabs>

      {/* Phase 3 Status Banner */}
      <div className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-600 to-purple-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6" />
          <div>
            <h4 className="font-semibold">Phase 3 Complete! 🧠</h4>
            <p className="text-sm opacity-90">
              AI Intelligence, Competitive Analysis & Social Listening ready!
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid gap-4 md:grid-cols-4 mt-8">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-green-600" />
              <span>Phase 1: MVP Core</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Complete social media management platform
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Business Management System</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Social Media Core</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Basic Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>User Authentication</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Client Onboarding</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span>Phase 2: Content & SEO</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Advanced content creation and SEO tools
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>AI Content Basket (20 Templates)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>SEO Dashboard & Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Content Calendar & Scheduling</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Brand Management & Assets</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Phase 3: Intelligence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              AI-powered insights and automation
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Competitive Intelligence</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Social Listening & Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Sentiment Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Trending Topic Detection</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span>Phase 4: Enterprise</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Enterprise-level features and automation
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>PR & Media Management</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Email Marketing Center</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Client Portal System</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Advanced Automation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
