"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Users,
  TrendingUp,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Share,
  Star,
  Phone,
  Mail,
  Globe,
  BarChart3,
} from "lucide-react"

interface PRManagementProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function PRManagement({ selectedCompany }: PRManagementProps) {
  const [activeView, setActiveView] = useState("overview")

  const pressReleases = [
    {
      id: 1,
      title: "Company Announces Major Partnership with Tech Giant",
      date: "2024-01-15",
      status: "Published",
      reach: "45K",
      sentiment: "Positive",
      outlets: 12,
    },
    {
      id: 2,
      title: "Q4 Financial Results Show Record Growth",
      date: "2024-01-10",
      status: "Published",
      reach: "32K",
      sentiment: "Positive",
      outlets: 8,
    },
    {
      id: 3,
      title: "New Product Launch Revolutionizes Industry",
      date: "2024-01-08",
      status: "Draft",
      reach: "0",
      sentiment: "N/A",
      outlets: 0,
    },
    {
      id: 4,
      title: "CEO Featured in Industry Leadership Awards",
      date: "2024-01-05",
      status: "Published",
      reach: "28K",
      sentiment: "Positive",
      outlets: 15,
    },
  ]

  const mediaContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      outlet: "TechCrunch",
      beat: "Technology",
      tier: "Tier 1",
      email: "sarah.j@techcrunch.com",
      phone: "+1 (555) 123-4567",
      lastContact: "2024-01-10",
      relationship: "Strong",
    },
    {
      id: 2,
      name: "Michael Chen",
      outlet: "Forbes",
      beat: "Business",
      tier: "Tier 1",
      email: "m.chen@forbes.com",
      phone: "+1 (555) 234-5678",
      lastContact: "2024-01-08",
      relationship: "Good",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      outlet: "Industry Weekly",
      beat: "Legal Tech",
      tier: "Tier 2",
      email: "e.rodriguez@industryweekly.com",
      phone: "+1 (555) 345-6789",
      lastContact: "2024-01-05",
      relationship: "New",
    },
  ]

  const coverageData = [
    {
      id: 1,
      headline: "Legal Tech Firm Secures Major Partnership Deal",
      outlet: "TechCrunch",
      date: "2024-01-15",
      sentiment: "Positive",
      reach: "125K",
      engagement: "2.3K",
      shareOfVoice: "15%",
    },
    {
      id: 2,
      headline: "Record Growth Reported by Leading Law Firm",
      outlet: "Forbes",
      date: "2024-01-12",
      sentiment: "Positive",
      reach: "89K",
      engagement: "1.8K",
      shareOfVoice: "12%",
    },
    {
      id: 3,
      headline: "Industry Innovation Drives Market Changes",
      outlet: "Legal Times",
      date: "2024-01-10",
      sentiment: "Neutral",
      reach: "45K",
      engagement: "890",
      shareOfVoice: "8%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PR Management
          </h2>
          <p className="text-gray-400 mt-2">
            Press releases, media relations, and coverage tracking for {selectedCompany.name}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <FileText className="w-4 h-4 mr-2" />
          New Press Release
        </Button>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="releases" className="data-[state=active]:bg-purple-600">
            <FileText className="w-4 h-4 mr-2" />
            Press Releases
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Media Contacts
          </TabsTrigger>
          <TabsTrigger value="coverage" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Coverage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Press Releases</p>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-green-400 text-sm">+3 this month</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Media Contacts</p>
                    <p className="text-2xl font-bold text-white">156</p>
                    <p className="text-blue-400 text-sm">12 Tier 1</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Mentions</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-green-400 text-sm">+18% vs last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Reach</p>
                    <p className="text-2xl font-bold text-white">2.4M</p>
                    <p className="text-purple-400 text-sm">Impressions</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Press release published</p>
                    <p className="text-gray-400 text-xs">Major Partnership Announcement - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Media contact added</p>
                    <p className="text-gray-400 text-xs">Sarah Johnson from TechCrunch - 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Coverage tracked</p>
                    <p className="text-gray-400 text-xs">Forbes article mention - 6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">Positive</span>
                    <span className="text-white">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Neutral</span>
                    <span className="text-white">18%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-red-400">Negative</span>
                    <span className="text-white">4%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: "4%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="releases" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search press releases..."
                  className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-purple-500/20 text-purple-300 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Reach</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Outlets</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pressReleases.map((release) => (
                      <tr key={release.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{release.title}</p>
                            <Badge
                              variant="outline"
                              className={`mt-1 ${
                                release.sentiment === "Positive"
                                  ? "text-green-400 border-green-400"
                                  : release.sentiment === "Neutral"
                                    ? "text-gray-400 border-gray-400"
                                    : "text-gray-500 border-gray-500"
                              }`}
                            >
                              {release.sentiment}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{release.date}</td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              release.status === "Published"
                                ? "bg-green-900/50 text-green-400 border-green-400"
                                : "bg-yellow-900/50 text-yellow-400 border-yellow-400"
                            }`}
                          >
                            {release.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{release.reach}</td>
                        <td className="p-4 text-white">{release.outlets}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/20 text-purple-300 bg-transparent"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/20 text-purple-300 bg-transparent"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/20 text-purple-300 bg-transparent"
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
                />
              </div>
              <select className="bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white">
                <option>All Tiers</option>
                <option>Tier 1</option>
                <option>Tier 2</option>
                <option>Tier 3</option>
              </select>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Users className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaContacts.map((contact) => (
              <Card key={contact.id} className="bg-gray-900/50 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium">{contact.name}</h3>
                      <p className="text-gray-400 text-sm">{contact.outlet}</p>
                    </div>
                    <Badge
                      className={`${
                        contact.tier === "Tier 1"
                          ? "bg-purple-900/50 text-purple-400 border-purple-400"
                          : "bg-blue-900/50 text-blue-400 border-blue-400"
                      }`}
                    >
                      {contact.tier}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Beat:</span>
                      <span className="text-white text-sm">{contact.beat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Relationship:</span>
                      <Badge
                        variant="outline"
                        className={`${
                          contact.relationship === "Strong"
                            ? "text-green-400 border-green-400"
                            : contact.relationship === "Good"
                              ? "text-blue-400 border-blue-400"
                              : "text-gray-400 border-gray-400"
                        }`}
                      >
                        {contact.relationship}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Last Contact:</span>
                      <span className="text-white text-sm">{contact.lastContact}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-purple-500/20 text-purple-300 bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-500/20 text-purple-300 bg-transparent">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Coverage</p>
                    <p className="text-2xl font-bold text-white">89</p>
                    <p className="text-green-400 text-sm">+12 this week</p>
                  </div>
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Share of Voice</p>
                    <p className="text-2xl font-bold text-white">23.4%</p>
                    <p className="text-blue-400 text-sm">Industry average</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Sentiment</p>
                    <p className="text-2xl font-bold text-white">8.2</p>
                    <p className="text-green-400 text-sm">Very Positive</p>
                  </div>
                  <Star className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Reach</p>
                    <p className="text-2xl font-bold text-white">1.2M</p>
                    <p className="text-purple-400 text-sm">Potential impressions</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Coverage</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">Headline</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Outlet</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Sentiment</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Reach</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Share of Voice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverageData.map((coverage) => (
                      <tr key={coverage.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="p-4">
                          <p className="text-white font-medium">{coverage.headline}</p>
                          <p className="text-gray-400 text-sm">{coverage.engagement} engagements</p>
                        </td>
                        <td className="p-4 text-gray-400">{coverage.outlet}</td>
                        <td className="p-4 text-gray-400">{coverage.date}</td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              coverage.sentiment === "Positive"
                                ? "bg-green-900/50 text-green-400 border-green-400"
                                : "bg-gray-900/50 text-gray-400 border-gray-400"
                            }`}
                          >
                            {coverage.sentiment}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{coverage.reach}</td>
                        <td className="p-4 text-white">{coverage.shareOfVoice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
