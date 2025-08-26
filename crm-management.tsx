"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, Calendar, Phone, Mail, Plus, Search, Filter } from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

interface CRMManagementProps {
  selectedCompany: Company
}

export default function CRMManagement({ selectedCompany }: CRMManagementProps) {
  const [activeView, setActiveView] = useState("dashboard")

  const pipelineData = [
    { stage: "Prospecting", count: 45, value: "$450K", color: "bg-blue-500" },
    { stage: "Qualification", count: 28, value: "$680K", color: "bg-yellow-500" },
    { stage: "Proposal", count: 16, value: "$920K", color: "bg-orange-500" },
    { stage: "Negotiation", count: 8, value: "$340K", color: "bg-purple-500" },
    { stage: "Closed Won", count: 12, value: "$1.2M", color: "bg-green-500" },
  ]

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Tech Innovations",
      email: "sarah@techinnovations.com",
      phone: "+1 555-0123",
      score: 85,
      status: "Hot",
      source: "Website",
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "Digital Solutions",
      email: "mike@digitalsol.com",
      phone: "+1 555-0124",
      score: 72,
      status: "Warm",
      source: "Referral",
    },
    {
      id: 3,
      name: "Emily Davis",
      company: "Growth Partners",
      email: "emily@growthpartners.com",
      phone: "+1 555-0125",
      score: 91,
      status: "Hot",
      source: "LinkedIn",
    },
    {
      id: 4,
      name: "David Wilson",
      company: "Scale Ventures",
      email: "david@scaleventures.com",
      phone: "+1 555-0126",
      score: 68,
      status: "Cold",
      source: "Cold Email",
    },
  ]

  const deals = [
    {
      id: 1,
      name: "Enterprise Software License",
      company: "Tech Corp",
      value: "$125K",
      stage: "Negotiation",
      probability: 75,
      closeDate: "2024-02-15",
    },
    {
      id: 2,
      name: "Marketing Automation Setup",
      company: "Growth Inc",
      value: "$45K",
      stage: "Proposal",
      probability: 60,
      closeDate: "2024-02-28",
    },
    {
      id: 3,
      name: "Consulting Services",
      company: "Scale LLC",
      value: "$85K",
      stage: "Qualification",
      probability: 40,
      closeDate: "2024-03-10",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CRM Management
          </h2>
          <p className="text-gray-400 mt-2">
            Manage leads, pipeline, and customer relationships for {selectedCompany.name}
          </p>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-purple-600">
            Leads
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-purple-600">
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-600">
            Contacts
          </TabsTrigger>
          <TabsTrigger value="deals" className="data-[state=active]:bg-purple-600">
            Deals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Leads</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-green-400 text-sm">+12% this month</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pipeline Value</p>
                    <p className="text-2xl font-bold text-white">$2.39M</p>
                    <p className="text-green-400 text-sm">+8% this month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Conversion Rate</p>
                    <p className="text-2xl font-bold text-white">24.5%</p>
                    <p className="text-green-400 text-sm">+3.2% this month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Deal Size</p>
                    <p className="text-2xl font-bold text-white">$85K</p>
                    <p className="text-green-400 text-sm">+15% this month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Overview */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Sales Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineData.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                      <div>
                        <p className="text-white font-medium">{stage.stage}</p>
                        <p className="text-gray-400 text-sm">{stage.count} deals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{stage.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Lead Management</h3>
            <div className="flex space-x-2">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search leads..." className="pl-10 bg-gray-800/50 border-purple-500/20 text-white" />
            </div>
            <Button variant="outline" className="border-purple-500/20 text-white bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-purple-500/20">
                    <tr>
                      <th className="text-left p-4 text-gray-400">Name</th>
                      <th className="text-left p-4 text-gray-400">Company</th>
                      <th className="text-left p-4 text-gray-400">Contact</th>
                      <th className="text-left p-4 text-gray-400">Score</th>
                      <th className="text-left p-4 text-gray-400">Status</th>
                      <th className="text-left p-4 text-gray-400">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                        <td className="p-4">
                          <p className="text-white font-medium">{lead.name}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-300">{lead.company}</p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-gray-300 text-sm">
                              <Mail className="w-3 h-3 mr-1" />
                              {lead.email}
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                              <Phone className="w-3 h-3 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-12 bg-gray-700 rounded-full h-2 mr-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${lead.score}%` }}></div>
                            </div>
                            <span className="text-white text-sm">{lead.score}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              lead.status === "Hot"
                                ? "bg-red-500/20 text-red-400 border-red-500/20"
                                : lead.status === "Warm"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/20"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-300">{lead.source}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Deal Management</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>

          <div className="grid gap-4">
            {deals.map((deal) => (
              <Card key={deal.id} className="bg-black/20 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{deal.name}</h4>
                      <p className="text-gray-400">{deal.company}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-green-400 font-bold">{deal.value}</span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">{deal.stage}</Badge>
                        <span className="text-gray-400 text-sm">Close: {deal.closeDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{deal.probability}%</div>
                      <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${deal.probability}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Pipeline Visualization</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineData.map((stage) => (
              <Card key={stage.stage} className="bg-black/20 border-purple-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">{stage.stage}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{stage.count} deals</span>
                    <span className="text-white font-bold text-sm">{stage.value}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Sample deal cards for each stage */}
                  <div className="p-2 bg-gray-800/30 rounded text-xs">
                    <p className="text-white font-medium">Sample Deal 1</p>
                    <p className="text-gray-400">$25K</p>
                  </div>
                  <div className="p-2 bg-gray-800/30 rounded text-xs">
                    <p className="text-white font-medium">Sample Deal 2</p>
                    <p className="text-gray-400">$45K</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Contact Database</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((contact) => (
              <Card key={contact.id} className="bg-black/20 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{contact.name}</p>
                      <p className="text-gray-400 text-sm">{contact.company}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <Mail className="w-4 h-4 mr-2 text-purple-400" />
                      {contact.email}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Phone className="w-4 h-4 mr-2 text-purple-400" />
                      {contact.phone}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Badge
                      className={
                        contact.status === "Hot"
                          ? "bg-red-500/20 text-red-400 border-red-500/20"
                          : contact.status === "Warm"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/20"
                      }
                    >
                      {contact.status}
                    </Badge>
                    <span className="text-purple-400 text-sm">Score: {contact.score}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
