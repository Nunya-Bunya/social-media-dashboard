"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  UserSearch, 
  Search, 
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Star,
  Eye,
  Plus,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

export default function LeadFinder({ selectedCompany }: { selectedCompany: Company }) {
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const [searchResults] = useState([
    {
      id: 1,
      name: "TechStart Solutions",
      industry: "Technology",
      website: "techstart.com",
      email: "contact@techstart.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      size: "10-50 employees",
      revenue: "$1M-$10M",
      score: 85,
      status: "new",
      lastContact: null,
      notes: "Growing SaaS company, potential for legal services"
    },
    {
      id: 2,
      name: "InnovateCorp",
      industry: "Manufacturing",
      website: "innovatecorp.com",
      email: "info@innovatecorp.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      size: "50-200 employees",
      revenue: "$10M-$50M",
      score: 92,
      status: "contacted",
      lastContact: "2024-01-10",
      notes: "Interested in IP protection services"
    },
    {
      id: 3,
      name: "GreenEnergy Co",
      industry: "Energy",
      website: "greenenergy.com",
      email: "hello@greenenergy.com",
      phone: "+1 (555) 345-6789",
      location: "Denver, CO",
      size: "200-500 employees",
      revenue: "$50M-$100M",
      score: 78,
      status: "qualified",
      lastContact: "2024-01-15",
      notes: "Looking for environmental compliance legal support"
    }
  ])

  const [leadAgents] = useState([
    {
      id: 1,
      name: "Legal Services Agent",
      keywords: ["legal services", "law firm", "attorney", "compliance"],
      locations: ["San Francisco", "Los Angeles", "New York"],
      sources: ["LinkedIn", "Company websites", "Industry databases"],
      status: "active",
      lastRun: "2024-01-15 10:30 AM",
      leadsFound: 156,
      conversionRate: 12.5
    },
    {
      id: 2,
      name: "Tech Companies Agent",
      keywords: ["startup", "SaaS", "technology", "software"],
      locations: ["San Francisco", "Austin", "Seattle"],
      sources: ["Crunchbase", "LinkedIn", "AngelList"],
      status: "active",
      lastRun: "2024-01-14 02:15 PM",
      leadsFound: 89,
      conversionRate: 8.7
    },
    {
      id: 3,
      name: "Manufacturing Agent",
      keywords: ["manufacturing", "industrial", "production", "supply chain"],
      locations: ["Detroit", "Chicago", "Houston"],
      sources: ["Industry directories", "Trade publications", "LinkedIn"],
      status: "paused",
      lastRun: "2024-01-10 09:45 AM",
      leadsFound: 234,
      conversionRate: 15.2
    }
  ])

  const [leadAnalytics] = useState({
    totalLeads: 1247,
    newLeads: 89,
    qualifiedLeads: 234,
    conversionRate: 12.8,
    averageScore: 82.5,
    topIndustries: [
      { industry: "Technology", count: 456, percentage: 36.5 },
      { industry: "Manufacturing", count: 234, percentage: 18.8 },
      { industry: "Healthcare", count: 189, percentage: 15.2 },
      { industry: "Finance", count: 156, percentage: 12.5 },
      { industry: "Energy", count: 98, percentage: 7.9 }
    ]
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-yellow-400"
    if (score >= 70) return "text-orange-400"
    return "text-red-400"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-400"
      case "contacted": return "bg-yellow-500/20 text-yellow-400"
      case "qualified": return "bg-green-500/20 text-green-400"
      case "active": return "bg-green-500/20 text-green-400"
      case "paused": return "bg-gray-500/20 text-gray-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Lead Finder</h2>
          <p className="text-gray-400 mt-2">
            Discover and qualify potential leads for {selectedCompany.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-purple-500/20">
          <TabsTrigger value="search" className="data-[state=active]:bg-purple-600">
            <Search className="w-4 h-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-purple-600">
            <Target className="w-4 h-4 mr-2" />
            Lead Agents
          </TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            All Leads
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Lead Search</CardTitle>
              <CardDescription className="text-gray-400">
                Search for potential leads based on criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by company name, industry, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isSearching}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {searchResults.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{lead.name}</h4>
                          <p className="text-sm text-gray-400">{lead.industry}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <div className={`flex items-center space-x-1 ${getScoreColor(lead.score)}`}>
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-sm font-medium">{lead.score}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.size}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-purple-400">{lead.website}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.revenue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">Contact:</span>
                          <span className="text-purple-400">{lead.email}</span>
                          <span className="text-white">•</span>
                          <span className="text-white">{lead.phone}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Lead Agents</CardTitle>
              <CardDescription className="text-gray-400">
                Automated lead discovery agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{agent.name}</h4>
                        <p className="text-sm text-gray-400">
                          Last run: {agent.lastRun}
                        </p>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Keywords</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Locations</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.locations.map((location, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Sources</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">
                          Leads found: <span className="text-white">{agent.leadsFound}</span>
                        </span>
                        <span className="text-gray-400">
                          Conversion: <span className="text-green-400">{agent.conversionRate}%</span>
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Target className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Leads Tab */}
        <TabsContent value="leads" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">All Leads</CardTitle>
              <CardDescription className="text-gray-400">
                Complete lead database and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {searchResults.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{lead.name}</h4>
                          <p className="text-sm text-gray-400">{lead.industry}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <div className={`flex items-center space-x-1 ${getScoreColor(lead.score)}`}>
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-sm font-medium">{lead.score}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.size}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-purple-400">{lead.website}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.revenue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">Contact:</span>
                          <span className="text-purple-400">{lead.email}</span>
                          <span className="text-white">•</span>
                          <span className="text-white">{lead.phone}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Total Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {leadAnalytics.totalLeads.toLocaleString()}
                </div>
                <p className="text-sm text-green-400">+{leadAnalytics.newLeads} new this week</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Qualified Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {leadAnalytics.qualifiedLeads}
                </div>
                <p className="text-sm text-green-400">
                  {leadAnalytics.conversionRate}% conversion rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {leadAnalytics.averageScore}
                </div>
                <p className="text-sm text-green-400">+2.5 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Top Industries</CardTitle>
              <CardDescription className="text-gray-400">
                Lead distribution by industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leadAnalytics.topIndustries.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <span className="text-white">{industry.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">{industry.count} leads</span>
                      <span className="text-purple-400">{industry.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
