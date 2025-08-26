"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Megaphone, 
  Users, 
  FileText, 
  Calendar,
  Send,
  Download,
  Copy,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Globe,
  Newspaper,
  Radio,
  Tv,
  Mail,
  Phone,
  MapPin,
  Star,
  Eye,
  Share2,
  Edit
} from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

export default function PRManagement({ selectedCompany }: { selectedCompany: Company }) {
  const [activeTab, setActiveTab] = useState("contacts")
  const [searchQuery, setSearchQuery] = useState("")

  const [mediaContacts] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      outlet: "TechCrunch",
      email: "sarah.johnson@techcrunch.com",
      phone: "+1 (555) 123-4567",
      category: "Technology",
      location: "San Francisco, CA",
      lastContact: "2024-01-10",
      status: "active",
      notes: "Interested in legal tech innovations"
    },
    {
      id: 2,
      name: "Michael Chen",
      outlet: "Forbes",
      email: "mchen@forbes.com",
      phone: "+1 (555) 234-5678",
      category: "Business",
      location: "New York, NY",
      lastContact: "2024-01-05",
      status: "active",
      notes: "Covers legal industry trends"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      outlet: "Legal Weekly",
      email: "emily.rodriguez@legalweekly.com",
      phone: "+1 (555) 345-6789",
      category: "Legal",
      location: "Los Angeles, CA",
      lastContact: "2023-12-20",
      status: "inactive",
      notes: "Specializes in personal injury law"
    }
  ])

  const [pressReleases] = useState([
    {
      id: 1,
      title: "Merkel & Conner Expands to New Markets",
      content: "Leading law firm announces expansion into three new states, bringing expert legal services to more clients...",
      status: "published",
      publishDate: "2024-01-15",
      distribution: ["TechCrunch", "Forbes", "Legal Weekly"],
      views: 1250,
      shares: 89
    },
    {
      id: 2,
      title: "New AI-Powered Legal Research Tool Launch",
      content: "Innovative legal technology platform designed to streamline case research and improve client outcomes...",
      status: "draft",
      publishDate: "2024-01-20",
      distribution: ["TechCrunch", "Legal Tech News"],
      views: 0,
      shares: 0
    },
    {
      id: 3,
      title: "Q4 2023 Financial Results",
      content: "Strong performance driven by increased demand for legal services and successful case outcomes...",
      status: "scheduled",
      publishDate: "2024-01-25",
      distribution: ["Forbes", "Business Insider"],
      views: 0,
      shares: 0
    }
  ])

  const [mediaCoverage] = useState([
    {
      id: 1,
      title: "How AI is Transforming Legal Services",
      outlet: "TechCrunch",
      author: "Sarah Johnson",
      date: "2024-01-12",
      url: "https://techcrunch.com/2024/01/12/ai-legal-services",
      sentiment: "positive",
      reach: 50000,
      mentions: 15
    },
    {
      id: 2,
      title: "Top Law Firms Embracing Technology",
      outlet: "Forbes",
      author: "Michael Chen",
      date: "2024-01-08",
      url: "https://forbes.com/2024/01/08/law-firms-technology",
      sentiment: "positive",
      reach: 75000,
      mentions: 8
    },
    {
      id: 3,
      title: "Legal Industry Trends 2024",
      outlet: "Legal Weekly",
      author: "Emily Rodriguez",
      date: "2024-01-05",
      url: "https://legalweekly.com/2024/01/05/trends-2024",
      sentiment: "neutral",
      reach: 25000,
      mentions: 3
    }
  ])

  const [events] = useState([
    {
      id: 1,
      title: "Legal Tech Conference 2024",
      type: "Conference",
      date: "2024-03-15",
      location: "San Francisco, CA",
      attendees: 500,
      status: "upcoming",
      description: "Annual conference showcasing latest legal technology innovations"
    },
    {
      id: 2,
      title: "Client Appreciation Event",
      type: "Networking",
      date: "2024-02-20",
      location: "Los Angeles, CA",
      attendees: 150,
      status: "upcoming",
      description: "Exclusive event for valued clients and partners"
    },
    {
      id: 3,
      title: "Industry Panel Discussion",
      type: "Panel",
      date: "2024-01-30",
      location: "Virtual",
      attendees: 200,
      status: "completed",
      description: "Discussion on the future of legal services"
    }
  ])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-green-400"
      case "negative": return "text-red-400"
      default: return "text-yellow-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400"
      case "inactive": return "bg-gray-500/20 text-gray-400"
      case "published": return "bg-blue-500/20 text-blue-400"
      case "draft": return "bg-yellow-500/20 text-yellow-400"
      case "scheduled": return "bg-purple-500/20 text-purple-400"
      case "upcoming": return "bg-green-500/20 text-green-400"
      case "completed": return "bg-gray-500/20 text-gray-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">PR Management</h2>
          <p className="text-gray-400 mt-2">
            Manage media relations, press releases, and public relations for {selectedCompany.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            New Press Release
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/30 border border-purple-500/20">
          <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Media Contacts
          </TabsTrigger>
          <TabsTrigger value="releases" className="data-[state=active]:bg-purple-600">
            <FileText className="w-4 h-4 mr-2" />
            Press Releases
          </TabsTrigger>
          <TabsTrigger value="coverage" className="data-[state=active]:bg-purple-600">
            <Newspaper className="w-4 h-4 mr-2" />
            Media Coverage
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-purple-600">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Media Contacts Tab */}
        <TabsContent value="contacts" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Media Contacts Database</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your media contacts and relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {mediaContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{contact.name}</h4>
                          <p className="text-sm text-gray-400">{contact.outlet}</p>
                        </div>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Category</p>
                          <p className="text-white">{contact.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Location</p>
                          <p className="text-white">{contact.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Email</p>
                          <p className="text-purple-400">{contact.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Phone</p>
                          <p className="text-white">{contact.phone}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-purple-500/20">
                        <p className="text-sm text-gray-400 mb-2">Notes:</p>
                        <p className="text-sm text-white">{contact.notes}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          Last contact: {contact.lastContact}
                        </span>
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

        {/* Press Releases Tab */}
        <TabsContent value="releases" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Press Releases</CardTitle>
              <CardDescription className="text-gray-400">
                Create and manage press releases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pressReleases.map((release) => (
                  <div
                    key={release.id}
                    className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{release.title}</h4>
                        <p className="text-sm text-gray-400">
                          Published: {release.publishDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(release.status)}>
                        {release.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {release.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">
                          Views: {release.views.toLocaleString()}
                        </span>
                        <span className="text-gray-400">
                          Shares: {release.shares}
                        </span>
                        <span className="text-purple-400">
                          {release.distribution.length} outlets
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Coverage Tab */}
        <TabsContent value="coverage" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Media Coverage</CardTitle>
              <CardDescription className="text-gray-400">
                Track mentions and coverage across media outlets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mediaCoverage.map((coverage) => (
                  <div
                    key={coverage.id}
                    className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{coverage.title}</h4>
                        <p className="text-sm text-gray-400">
                          {coverage.outlet} • {coverage.author} • {coverage.date}
                        </p>
                      </div>
                      <Badge className={getSentimentColor(coverage.sentiment)}>
                        {coverage.sentiment}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">
                          Reach: {coverage.reach.toLocaleString()}
                        </span>
                        <span className="text-gray-400">
                          Mentions: {coverage.mentions}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Globe className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Events & Speaking Engagements</CardTitle>
              <CardDescription className="text-gray-400">
                Manage upcoming and past events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{event.title}</h4>
                        <p className="text-sm text-gray-400">
                          {event.type} • {event.date} • {event.location}
                        </p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {event.attendees} attendees
                      </span>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Calendar className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Users className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Media Mentions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">156</div>
                <p className="text-sm text-green-400">+23% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Press Release Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">12,450</div>
                <p className="text-sm text-green-400">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Sentiment Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">8.7/10</div>
                <p className="text-sm text-green-400">+0.3 from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
