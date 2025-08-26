"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, Users, Mail, Phone, Search, BarChart3, Target, Clock, CheckCircle } from "lucide-react"

interface OutreachManagementProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function OutreachManagement({ selectedCompany }: OutreachManagementProps) {
  const [activeView, setActiveView] = useState("overview")

  const campaignData = [
    { name: "Personal Injury Leads", sent: 1247, opened: 623, replied: 89, converted: 12, status: "active" },
    { name: "Business Law Prospects", sent: 892, opened: 445, replied: 67, converted: 8, status: "active" },
    { name: "Estate Planning Outreach", sent: 634, opened: 380, replied: 45, converted: 6, status: "paused" },
    { name: "Corporate Clients", sent: 423, opened: 254, replied: 38, converted: 5, status: "completed" },
  ]

  const prospects = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Johnson Enterprises",
      email: "sarah@johnsonent.com",
      phone: "+1 (555) 123-4567",
      score: 85,
      status: "qualified",
      lastContact: "2 days ago",
      source: "LinkedIn",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Tech Solutions Inc",
      email: "m.chen@techsol.com",
      phone: "+1 (555) 234-5678",
      score: 72,
      status: "contacted",
      lastContact: "1 week ago",
      source: "Cold Email",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Rodriguez & Associates",
      email: "emily@rodriguezlaw.com",
      phone: "+1 (555) 345-6789",
      score: 91,
      status: "interested",
      lastContact: "3 days ago",
      source: "Referral",
    },
  ]

  const emailSequences = [
    {
      id: 1,
      name: "Personal Injury Follow-up",
      steps: 5,
      activeProspects: 234,
      openRate: 68,
      replyRate: 12,
      status: "active",
    },
    {
      id: 2,
      name: "Business Law Introduction",
      steps: 3,
      activeProspects: 156,
      openRate: 72,
      replyRate: 15,
      status: "active",
    },
    {
      id: 3,
      name: "Estate Planning Nurture",
      steps: 7,
      activeProspects: 89,
      openRate: 65,
      replyRate: 8,
      status: "paused",
    },
  ]

  const performanceMetrics = [
    { metric: "Total Prospects", value: "2,847", change: "+12%", color: "purple" },
    { metric: "Active Campaigns", value: "8", change: "+2", color: "blue" },
    { metric: "Response Rate", value: "14.2%", change: "+2.1%", color: "green" },
    { metric: "Conversion Rate", value: "3.8%", change: "+0.5%", color: "orange" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Outreach Management</h2>
          <p className="text-gray-400">Manage cold outreach campaigns and prospect relationships</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Send className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600">
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="prospects" className="data-[state=active]:bg-purple-600">
            Prospects
          </TabsTrigger>
          <TabsTrigger value="sequences" className="data-[state=active]:bg-purple-600">
            Sequences
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-${metric.color}-900/50 to-${metric.color}-900/30 border-${metric.color}-500/20`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{metric.metric}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-green-400 text-sm">{metric.change} vs last month</p>
                    </div>
                    <Target className={`w-8 h-8 text-${metric.color}-400`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaign Funnel */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Outreach Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Emails Sent</h4>
                      <p className="text-gray-400 text-sm">Total outreach volume</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">3,196</p>
                    <p className="text-blue-400 text-sm">+8% this month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Emails Opened</h4>
                      <p className="text-gray-400 text-sm">Open rate: 58.2%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">1,860</p>
                    <p className="text-green-400 text-sm">+12% this month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Replies Received</h4>
                      <p className="text-gray-400 text-sm">Reply rate: 14.2%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">454</p>
                    <p className="text-purple-400 text-sm">+18% this month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Conversions</h4>
                      <p className="text-gray-400 text-sm">Conversion rate: 3.8%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">121</p>
                    <p className="text-orange-400 text-sm">+25% this month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-white">Sarah Johnson replied to Personal Injury campaign</span>
                  <span className="text-gray-400 text-sm ml-auto">2 minutes ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-white">New prospect added: Michael Chen</span>
                  <span className="text-gray-400 text-sm ml-auto">15 minutes ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-white">Business Law campaign sent to 45 prospects</span>
                  <span className="text-gray-400 text-sm ml-auto">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Active Campaigns</CardTitle>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Create Campaign</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignData.map((campaign, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-medium">{campaign.name}</h4>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "paused"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Sent</p>
                        <p className="text-white font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Opened</p>
                        <p className="text-white font-medium">{campaign.opened.toLocaleString()}</p>
                        <p className="text-green-400 text-xs">
                          {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Replied</p>
                        <p className="text-white font-medium">{campaign.replied}</p>
                        <p className="text-blue-400 text-xs">
                          {((campaign.replied / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Converted</p>
                        <p className="text-white font-medium">{campaign.converted}</p>
                        <p className="text-purple-400 text-xs">
                          {((campaign.converted / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Prospect Database</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search prospects..."
                    className="w-64 bg-gray-800/50 border-purple-500/20 text-white"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prospects.map((prospect) => (
                  <div key={prospect.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                          {prospect.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{prospect.name}</h4>
                          <p className="text-gray-400 text-sm">{prospect.company}</p>
                        </div>
                        <Badge
                          variant={
                            prospect.status === "qualified"
                              ? "default"
                              : prospect.status === "interested"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {prospect.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-sm">Score: {prospect.score}</span>
                          <Progress value={prospect.score} className="w-16 h-2" />
                        </div>
                        <p className="text-gray-400 text-xs">Last contact: {prospect.lastContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {prospect.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {prospect.phone}
                        </span>
                        <Badge variant="outline" className="border-purple-500/20 text-purple-400 text-xs">
                          {prospect.source}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Add to Campaign
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequences" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Email Sequences</CardTitle>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Create Sequence</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailSequences.map((sequence) => (
                  <div key={sequence.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-medium">{sequence.name}</h4>
                        <Badge variant={sequence.status === "active" ? "default" : "secondary"} className="text-xs">
                          {sequence.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Analytics
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Steps</p>
                        <p className="text-white font-medium">{sequence.steps}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Active Prospects</p>
                        <p className="text-white font-medium">{sequence.activeProspects}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Open Rate</p>
                        <p className="text-white font-medium">{sequence.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Reply Rate</p>
                        <p className="text-white font-medium">{sequence.replyRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Performance by Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Personal Injury</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-white text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Business Law</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-20 h-2" />
                      <span className="text-white text-sm">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Estate Planning</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20 h-2" />
                      <span className="text-white text-sm">68%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Template Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Introduction Template A</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-white text-sm">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Follow-up Template B</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-white text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Case Study Template</span>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="w-20 h-2" />
                      <span className="text-white text-sm">82%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
