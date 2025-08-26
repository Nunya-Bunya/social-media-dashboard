"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  Plus,
  Play,
  Pause,
  Settings,
  Eye,
  Phone,
  Mail,
  MapPin,
  Building,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

interface LeadGenProps {
  selectedCompany: Company
}

export default function LeadGen({ selectedCompany }: LeadGenProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [leadStatus, setLeadStatus] = useState("all")

  // Lead Finder Data
  const leadAgents = [
    {
      id: "1",
      name: "Legal Services Hunter",
      business: "Merkel & Conner",
      status: "active",
      sources: ["Facebook", "Reddit", "LinkedIn"],
      leadsFound: 47,
      lastRun: "2 hours ago",
      nextRun: "in 4 hours",
    },
    {
      id: "2",
      name: "Photography Lead Scout",
      business: "Power Portraits",
      status: "paused",
      sources: ["Instagram", "Facebook", "Wedding Wire"],
      leadsFound: 23,
      lastRun: "1 day ago",
      nextRun: "paused",
    },
  ]

  const socialLeads = [
    {
      id: "1",
      source: "Facebook",
      content: "Looking for a personal injury lawyer in Brisbane",
      author: "Sarah M.",
      platform: "Facebook Groups",
      sentiment: "urgent",
      score: 92,
      status: "new",
      date: "2 hours ago",
    },
    {
      id: "2",
      source: "Reddit",
      content: "Need wedding photographer recommendations Gold Coast",
      author: "u/weddingplanner2024",
      platform: "r/GoldCoast",
      sentiment: "positive",
      score: 87,
      status: "contacted",
      date: "5 hours ago",
    },
  ]

  // Cold Call Scraper Data
  const scrapers = [
    {
      id: "1",
      name: "Brisbane Photographers",
      industry: "Photography",
      location: "Brisbane, QLD",
      status: "running",
      sources: ["Google Maps", "Yellow Pages", "Yelp"],
      businessesFound: 156,
      withEmail: 89,
      withPhone: 142,
      lastRun: "30 minutes ago",
    },
    {
      id: "2",
      name: "Gold Coast Lawyers",
      industry: "Legal Services",
      location: "Gold Coast, QLD",
      status: "completed",
      sources: ["Google Maps", "LinkedIn", "Law Institute"],
      businessesFound: 78,
      withEmail: 45,
      withPhone: 71,
      lastRun: "2 hours ago",
    },
  ]

  const scrapedLeads = [
    {
      id: "1",
      businessName: "Coastal Photography Studio",
      website: "coastalphoto.com.au",
      email: "info@coastalphoto.com.au",
      phone: "(07) 5555-0123",
      address: "123 Main St, Surfers Paradise QLD",
      industry: "Photography",
      status: "new",
      source: "Google Maps",
    },
    {
      id: "2",
      businessName: "Smith & Associates Law",
      website: "smithlaw.com.au",
      email: "contact@smithlaw.com.au",
      phone: "(07) 3333-0456",
      address: "456 Queen St, Brisbane QLD",
      industry: "Legal Services",
      status: "outreach_started",
      source: "LinkedIn",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Lead Generation Hub
          </h2>
          <p className="text-gray-400 mt-1">
            Automated lead discovery and business directory scraping for {selectedCompany.name}
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="social-leads" className="data-[state=active]:bg-purple-600">
            Social Leads
          </TabsTrigger>
          <TabsTrigger value="scraped-leads" className="data-[state=active]:bg-purple-600">
            Business Directory
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-purple-600">
            Agents & Scrapers
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Active Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">8</div>
                <p className="text-xs text-gray-400">2 social, 6 scrapers</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,247</div>
                <p className="text-xs text-gray-400">+23 today</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12.4%</div>
                <p className="text-xs text-gray-400">+2.1% this week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Qualified Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">89</div>
                <p className="text-xs text-gray-400">Ready for outreach</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Social Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLeads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="flex items-start justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {lead.source}
                        </Badge>
                        <Badge variant={lead.sentiment === "urgent" ? "destructive" : "secondary"} className="text-xs">
                          Score: {lead.score}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">{lead.content}</p>
                      <p className="text-xs text-gray-500">
                        by {lead.author} • {lead.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Recent Business Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scrapedLeads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="flex items-start justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white text-sm">{lead.businessName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {lead.industry}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        {lead.email && (
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </span>
                        )}
                        {lead.phone && (
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            Phone
                          </span>
                        )}
                        <span className="flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social-leads" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input placeholder="Search leads..." className="w-64 bg-black/20 border-purple-500/20" />
            </div>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-48 bg-black/20 border-purple-500/20">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="1">Legal Services Hunter</SelectItem>
                <SelectItem value="2">Photography Lead Scout</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-purple-500/20 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Social Leads Table */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Social Media Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{lead.source}</Badge>
                        <Badge variant={lead.sentiment === "urgent" ? "destructive" : "secondary"}>
                          Score: {lead.score}
                        </Badge>
                        <Badge variant={lead.status === "new" ? "default" : "secondary"}>{lead.status}</Badge>
                      </div>
                      <p className="text-white mb-1">{lead.content}</p>
                      <p className="text-sm text-gray-400">
                        {lead.author} on {lead.platform} • {lead.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scraped-leads" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input placeholder="Search businesses..." className="w-64 bg-black/20 border-purple-500/20" />
            </div>
            <Select value={leadStatus} onValueChange={setLeadStatus}>
              <SelectTrigger className="w-48 bg-black/20 border-purple-500/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="outreach_started">Outreach Started</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-purple-500/20 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Business Leads Table */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Business Directory Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scrapedLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-white">{lead.businessName}</h4>
                        <Badge variant="outline">{lead.industry}</Badge>
                        <Badge variant={lead.status === "new" ? "default" : "secondary"}>
                          {lead.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-400">
                        {lead.website && (
                          <span className="flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {lead.website}
                          </span>
                        )}
                        {lead.email && (
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {lead.email}
                          </span>
                        )}
                        {lead.phone && (
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {lead.phone}
                          </span>
                        )}
                      </div>
                      {lead.address && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {lead.address}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Outreach
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Finder Agents */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Social Lead Agents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leadAgents.map((agent) => (
                  <div key={agent.id} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{agent.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                        <Button size="sm" variant="outline">
                          {agent.status === "active" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Business: {agent.business}</p>
                      <p>Sources: {agent.sources.join(", ")}</p>
                      <p>Leads Found: {agent.leadsFound}</p>
                      <p>Last Run: {agent.lastRun}</p>
                      <p>Next Run: {agent.nextRun}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cold Call Scrapers */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Directory Scrapers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scrapers.map((scraper) => (
                  <div key={scraper.id} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{scraper.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={scraper.status === "running" ? "default" : "secondary"}>{scraper.status}</Badge>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Industry: {scraper.industry}</p>
                      <p>Location: {scraper.location}</p>
                      <p>Sources: {scraper.sources.join(", ")}</p>
                      <p>Businesses Found: {scraper.businessesFound}</p>
                      <p>
                        With Email: {scraper.withEmail} | With Phone: {scraper.withPhone}
                      </p>
                      <p>Last Run: {scraper.lastRun}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Social Lead Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Monitoring Keywords</label>
                  <Input
                    placeholder="personal injury, lawyer, legal help..."
                    className="bg-black/20 border-purple-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Minimum Lead Score</label>
                  <Input type="number" placeholder="75" className="bg-black/20 border-purple-500/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Alert Notifications</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-gray-300">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Email alerts for high-score leads
                    </label>
                    <label className="flex items-center text-sm text-gray-300">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Slack notifications
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Scraper Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Default Industries</label>
                  <Input
                    placeholder="photography, legal services, restaurants..."
                    className="bg-black/20 border-purple-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Default Locations</label>
                  <Input placeholder="Brisbane, Gold Coast, Sydney..." className="bg-black/20 border-purple-500/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Scraping Frequency</label>
                  <Select>
                    <SelectTrigger className="bg-black/20 border-purple-500/20">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
