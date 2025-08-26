"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"

import OverviewDashboard from "@/components/overview-dashboard"
import SocialMediaManagement from "@/components/social-media-management"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import SEOManagement from "@/components/seo-management"
import EmailMarketing from "@/components/email-marketing"
import OnboardingManagement from "@/components/onboarding-management"
import PaidAdsManagement from "@/components/paid-ads-management"
import ReportsSection from "@/components/reports-section"
import BrandManagement from "@/components/brand-management"
import CompetitiveAnalysis from "@/components/competitive-analysis"
import SocialListening from "@/components/social-listening"
import OutreachManagement from "@/components/outreach-management"
import CRMManagement from "@/components/crm-management"
import MediaProduction from "@/components/media-production"
import AIAssistant from "@/components/ai-assistant"
import PRManagement from "@/components/pr-management"
import LeadFinder from "@/components/lead-finder"
import ColdCallScraper from "@/components/cold-call-scraper"

export default function MarketingDashboard() {
  const [viewMode, setViewMode] = useState("overview")
  const [selectedCompany, setSelectedCompany] = useState("1")

  const companies = [
    {
      id: "1",
      name: "Merkel & Conner",
      industry: "Legal Services",
      primaryColor: "from-blue-600 to-indigo-600",
      secondaryColor: "from-blue-900 to-indigo-900",
    },
    {
      id: "2",
      name: "Conner Injury Law",
      industry: "Personal Injury Law",
      primaryColor: "from-red-600 to-rose-600",
      secondaryColor: "from-red-900 to-rose-900",
    },
    {
      id: "3",
      name: "MBCS",
      industry: "Business Consulting",
      primaryColor: "from-green-600 to-emerald-600",
      secondaryColor: "from-green-900 to-emerald-900",
    },
    {
      id: "4",
      name: "Nunya Bunya",
      industry: "Food & Beverage",
      primaryColor: "from-orange-600 to-amber-600",
      secondaryColor: "from-orange-900 to-amber-900",
    },
    {
      id: "5",
      name: "Power Portraits",
      industry: "Photography",
      primaryColor: "from-purple-600 to-violet-600",
      secondaryColor: "from-purple-900 to-violet-900",
    },
    {
      id: "6",
      name: "B.C. Media",
      industry: "Media Production",
      primaryColor: "from-pink-600 to-rose-600",
      secondaryColor: "from-pink-900 to-rose-900",
    },
    {
      id: "7",
      name: "ORCA Awards",
      industry: "Awards & Recognition",
      primaryColor: "from-cyan-600 to-blue-600",
      secondaryColor: "from-cyan-900 to-blue-900",
    },
    {
      id: "8",
      name: "Stumpy Tail Catalogue",
      industry: "E-commerce",
      primaryColor: "from-teal-600 to-cyan-600",
      secondaryColor: "from-teal-900 to-cyan-900",
    },
    {
      id: "9",
      name: "The Conner Store",
      industry: "Retail",
      primaryColor: "from-indigo-600 to-purple-600",
      secondaryColor: "from-indigo-900 to-purple-900",
    },
    {
      id: "10",
      name: "Naming Names",
      industry: "Podcast & YouTube",
      primaryColor: "from-rose-600 to-pink-600",
      secondaryColor: "from-rose-900 to-pink-900",
    },
  ]

  const currentCompany = companies.find((c) => c.id === selectedCompany) || companies[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Marketing Intelligence
              </h1>
              <p className="text-gray-400 mt-2">Comprehensive marketing dashboard for all your businesses</p>
            </div>

            {/* Company Selector */}
            <div className="relative">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-purple-500/20 rounded-lg px-4 py-2 pr-10 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id} className="bg-gray-800">
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="bg-black/20 rounded-xl border border-purple-500/20 backdrop-blur-sm">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <TabsList className="overflow-x-auto flex-nowrap bg-black/30 border-b border-purple-500/20 rounded-t-xl p-2">
              <TabsTrigger
                value="overview"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="onboarding"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Onboarding
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Social Media
              </TabsTrigger>
              <TabsTrigger
                value="ads"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Paid Ads
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                SEO
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Email Marketing
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="brand"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Brand
              </TabsTrigger>
              <TabsTrigger
                value="competitive"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Competitive
              </TabsTrigger>
              <TabsTrigger
                value="listening"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Listening
              </TabsTrigger>
              <TabsTrigger
                value="outreach"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Outreach
              </TabsTrigger>
              <TabsTrigger
                value="crm"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                CRM
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                AI Assistant
              </TabsTrigger>
              <TabsTrigger
                value="pr"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                PR
              </TabsTrigger>
              <TabsTrigger
                value="leadfinder"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Lead Finder
              </TabsTrigger>
              <TabsTrigger
                value="coldcallscraper"
                className="flex-shrink-0 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Cold Call Scraper
              </TabsTrigger>

            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-6">
                <OverviewDashboard selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="onboarding" className="space-y-6">
                <OnboardingManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <SocialMediaManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="ads" className="space-y-6">
                <PaidAdsManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <SEOManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsDashboard selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="email" className="space-y-6">
                <EmailMarketing selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <ReportsSection selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="brand" className="space-y-6">
                <BrandManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="competitive" className="space-y-6">
                <CompetitiveAnalysis selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="listening" className="space-y-6">
                <SocialListening selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="outreach" className="space-y-6">
                <OutreachManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="crm" className="space-y-6">
                <CRMManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <MediaProduction selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <AIAssistant selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="pr" className="space-y-6">
                <PRManagement selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="leadfinder" className="space-y-6">
                <LeadFinder selectedCompany={currentCompany} />
              </TabsContent>

              <TabsContent value="coldcallscraper" className="space-y-6">
                <ColdCallScraper selectedCompany={currentCompany} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
