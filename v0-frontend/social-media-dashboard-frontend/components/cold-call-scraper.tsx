"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
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
  AlertCircle,
  Play,
  Pause,
  Stop,
  Settings,
  Database,
  FileText,
  BarChart3
} from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

export default function ColdCallScraper({ selectedCompany }: { selectedCompany: Company }) {
  const [activeTab, setActiveTab] = useState("scraper")
  const [searchQuery, setSearchQuery] = useState("")
  const [isScraping, setIsScraping] = useState(false)

  const [scrapeJobs] = useState([
    {
      id: 1,
      name: "Legal Services - San Francisco",
      industry: "Legal Services",
      location: "San Francisco, CA",
      status: "completed",
      startDate: "2024-01-15 09:00 AM",
      endDate: "2024-01-15 10:30 AM",
      leadsFound: 156,
      sources: ["Google Maps", "Yelp", "Yellow Pages"],
      progress: 100
    },
    {
      id: 2,
      name: "Tech Companies - Austin",
      industry: "Technology",
      location: "Austin, TX",
      status: "running",
      startDate: "2024-01-15 11:00 AM",
      endDate: null,
      leadsFound: 89,
      sources: ["Google Maps", "LinkedIn"],
      progress: 65
    },
    {
      id: 3,
      name: "Manufacturing - Detroit",
      industry: "Manufacturing",
      location: "Detroit, MI",
      status: "queued",
      startDate: null,
      endDate: null,
      leadsFound: 0,
      sources: ["Google Maps", "Industry Directories"],
      progress: 0
    }
  ])

  const [scrapedLeads] = useState([
    {
      id: 1,
      businessName: "Smith & Associates Law",
      industry: "Legal Services",
      location: "San Francisco, CA",
      email: "contact@smithlaw.com",
      phone: "+1 (555) 123-4567",
      website: "smithlaw.com",
      source: "Google Maps",
      status: "new",
      confidence: 95,
      lastContacted: null,
      notes: "Small law firm, potential for partnership"
    },
    {
      id: 2,
      businessName: "TechStart Solutions",
      industry: "Technology",
      location: "Austin, TX",
      email: "hello@techstart.com",
      phone: "+1 (555) 234-5678",
      website: "techstart.com",
      source: "LinkedIn",
      status: "contacted",
      confidence: 88,
      lastContacted: "2024-01-10",
      notes: "Growing startup, interested in legal services"
    },
    {
      id: 3,
      businessName: "Green Manufacturing Co",
      industry: "Manufacturing",
      location: "Detroit, MI",
      email: "info@greenmfg.com",
      phone: "+1 (555) 345-6789",
      website: "greenmfg.com",
      source: "Industry Directory",
      status: "qualified",
      confidence: 92,
      lastContacted: "2024-01-12",
      notes: "Large manufacturer, compliance needs"
    }
  ])

  const [scraperStats] = useState({
    totalLeads: 1247,
    newLeads: 89,
    contactedLeads: 234,
    qualifiedLeads: 156,
    conversionRate: 12.8,
    averageConfidence: 85.5,
    topSources: [
      { source: "Google Maps", count: 456, percentage: 36.5 },
      { source: "LinkedIn", count: 234, percentage: 18.8 },
      { source: "Yelp", count: 189, percentage: 15.2 },
      { source: "Yellow Pages", count: 156, percentage: 12.5 },
      { source: "Industry Directories", count: 98, percentage: 7.9 }
    ]
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-400"
      case "contacted": return "bg-yellow-500/20 text-yellow-400"
      case "qualified": return "bg-green-500/20 text-green-400"
      case "completed": return "bg-green-500/20 text-green-400"
      case "running": return "bg-blue-500/20 text-blue-400"
      case "queued": return "bg-gray-500/20 text-gray-400"
      case "failed": return "bg-red-500/20 text-red-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400"
    if (confidence >= 80) return "text-yellow-400"
    if (confidence >= 70) return "text-orange-400"
    return "text-red-400"
  }

  const startScraping = () => {
    setIsScraping(true)
    setTimeout(() => {
      setIsScraping(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Cold Call Scraper</h2>
          <p className="text-gray-400 mt-2">
            Automated lead generation through web scraping for {selectedCompany.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
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
          <TabsTrigger value="scraper" className="data-[state=active]:bg-purple-600">
            <Search className="w-4 h-4 mr-2" />
            Scraper
          </TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-purple-600">
            <Database className="w-4 h-4 mr-2" />
            Jobs
          </TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Scraper Tab */}
        <TabsContent value="scraper" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scraper Configuration */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">New Scrape Job</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure and start a new scraping job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Industry
                  </label>
                  <Input
                    placeholder="e.g., Legal Services, Technology, Manufacturing"
                    className="bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Location
                  </label>
                  <Input
                    placeholder="e.g., San Francisco, CA"
                    className="bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Sources
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-purple-500/20" defaultChecked />
                      <span className="text-sm text-gray-300">Google Maps</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-purple-500/20" defaultChecked />
                      <span className="text-sm text-gray-300">Yelp</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-purple-500/20" />
                      <span className="text-sm text-gray-300">LinkedIn</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-purple-500/20" />
                      <span className="text-sm text-gray-300">Yellow Pages</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Job Name
                  </label>
                  <Input
                    placeholder="e.g., Legal Services - San Francisco"
                    className="bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>

                <Button
                  onClick={startScraping}
                  disabled={isScraping}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isScraping ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Scraping...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scraping
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Active Jobs */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Active Jobs</CardTitle>
                <CardDescription className="text-gray-400">
                  Currently running scrape jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scrapeJobs.filter(job => job.status === "running").map((job) => (
                    <div
                      key={job.id}
                      className="p-3 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{job.name}</h4>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-2">
                        {job.industry} • {job.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">
                            Progress: {job.progress}%
                          </span>
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Pause className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Scrape Jobs</CardTitle>
              <CardDescription className="text-gray-400">
                History and status of all scraping jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scrapeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{job.name}</h4>
                        <p className="text-sm text-gray-400">
                          {job.industry} • {job.location}
                        </p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-400">Start Date</p>
                        <p className="text-white">{job.startDate || "Not started"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">End Date</p>
                        <p className="text-white">{job.endDate || "In progress"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Leads Found</p>
                        <p className="text-white">{job.leadsFound}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Progress</p>
                        <p className="text-white">{job.progress}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {job.sources.map((source, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {job.status === "running" && (
                          <Button size="sm" variant="ghost">
                            <Pause className="w-3 h-3" />
                          </Button>
                        )}
                        {job.status === "queued" && (
                          <Button size="sm" variant="ghost">
                            <Play className="w-3 h-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Scraped Leads</CardTitle>
              <CardDescription className="text-gray-400">
                All leads discovered through scraping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                  {scrapedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{lead.businessName}</h4>
                          <p className="text-sm text-gray-400">{lead.industry}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <div className={`flex items-center space-x-1 ${getConfidenceColor(lead.confidence)}`}>
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-sm font-medium">{lead.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-purple-400">{lead.website}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-purple-400">{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{lead.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">Source:</span>
                          <span className="text-white">{lead.source}</span>
                          {lead.lastContacted && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-400">
                                Contacted: {lead.lastContacted}
                              </span>
                            </>
                          )}
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
                  {scraperStats.totalLeads.toLocaleString()}
                </div>
                <p className="text-sm text-green-400">+{scraperStats.newLeads} new this week</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Qualified Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {scraperStats.qualifiedLeads}
                </div>
                <p className="text-sm text-green-400">
                  {scraperStats.conversionRate}% conversion rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Average Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {scraperStats.averageConfidence}%
                </div>
                <p className="text-sm text-green-400">+2.5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Top Sources</CardTitle>
              <CardDescription className="text-gray-400">
                Lead distribution by source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scraperStats.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <span className="text-white">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">{source.count} leads</span>
                      <span className="text-purple-400">{source.percentage}%</span>
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
