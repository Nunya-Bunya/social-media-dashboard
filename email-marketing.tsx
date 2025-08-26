"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Plus, Edit, Trash2, Send } from "lucide-react"

interface EmailMarketingProps {
  selectedCompany: any
}

function EmailMarketing({ selectedCompany }: EmailMarketingProps) {
  const [emailView, setEmailView] = useState("overview")

  return (
    <div className="space-y-6">
      <Tabs value={emailView} onValueChange={setEmailView}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Total Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12,847</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2% this month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-200">Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">24.8%</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.1% vs industry avg
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3.7%</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +0.8% improvement
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-200">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$18,420</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15.3% this month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Holiday Sale 2024", sent: "2024-01-10", opens: 2847, clicks: 342, status: "sent" },
                    { name: "New Year Newsletter", sent: "2024-01-01", opens: 1923, clicks: 198, status: "sent" },
                    { name: "Product Launch", sent: "2023-12-28", opens: 3421, clicks: 456, status: "sent" },
                    { name: "Weekly Digest", sent: "Draft", opens: 0, clicks: 0, status: "draft" },
                  ].map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{campaign.name}</div>
                        <div className="text-gray-400 text-sm">Sent: {campaign.sent}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{campaign.opens} opens</div>
                        <div className="text-gray-400 text-sm">{campaign.clicks} clicks</div>
                      </div>
                      <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>{campaign.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Subscriber Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">This Week</span>
                    <span className="text-green-400">+247 subscribers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-green-400">+1,023 subscribers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Unsubscribed</span>
                    <span className="text-red-400">-89 this month</span>
                  </div>
                  <div className="pt-4">
                    <div className="text-sm text-gray-400 mb-2">Growth Rate</div>
                    <Progress value={78} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">78% above target</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Contact Management</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "All Subscribers", count: 12847, active: true },
                    { name: "VIP Customers", count: 1247, active: false },
                    { name: "New Signups", count: 892, active: false },
                    { name: "Inactive", count: 634, active: false },
                  ].map((segment, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${segment.active ? "bg-purple-900/50 border border-purple-500/50" : "bg-gray-800/50 hover:bg-gray-700/50"}`}
                    >
                      <div className="text-white font-medium">{segment.name}</div>
                      <div className="text-gray-400 text-sm">{segment.count.toLocaleString()} contacts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-white">Contact List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Search contacts..." className="bg-gray-800 border-gray-600 text-white" />
                    <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                      Filter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      {
                        email: "john.doe@example.com",
                        name: "John Doe",
                        status: "subscribed",
                        engagement: "high",
                        joined: "2024-01-15",
                      },
                      {
                        email: "jane.smith@company.com",
                        name: "Jane Smith",
                        status: "subscribed",
                        engagement: "medium",
                        joined: "2024-01-12",
                      },
                      {
                        email: "mike.wilson@business.com",
                        name: "Mike Wilson",
                        status: "unsubscribed",
                        engagement: "low",
                        joined: "2024-01-08",
                      },
                      {
                        email: "sarah.jones@startup.com",
                        name: "Sarah Jones",
                        status: "subscribed",
                        engagement: "high",
                        joined: "2024-01-05",
                      },
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{contact.name}</div>
                          <div className="text-gray-400 text-sm">{contact.email}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge
                            variant={
                              contact.engagement === "high"
                                ? "default"
                                : contact.engagement === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {contact.engagement} engagement
                          </Badge>
                          <Badge variant={contact.status === "subscribed" ? "default" : "destructive"}>
                            {contact.status}
                          </Badge>
                          <div className="text-gray-400 text-sm">{contact.joined}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Email Campaigns</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Holiday Sale 2024",
                type: "promotional",
                status: "sent",
                sent: "2024-01-10",
                recipients: 12847,
                opens: 2847,
                clicks: 342,
                revenue: "$8,420",
              },
              {
                name: "New Year Newsletter",
                type: "newsletter",
                status: "sent",
                sent: "2024-01-01",
                recipients: 11923,
                opens: 1923,
                clicks: 198,
                revenue: "$2,340",
              },
              {
                name: "Product Launch",
                type: "announcement",
                status: "sent",
                sent: "2023-12-28",
                recipients: 13421,
                opens: 3421,
                clicks: 456,
                revenue: "$12,680",
              },
              {
                name: "Weekly Digest",
                type: "newsletter",
                status: "scheduled",
                sent: "2024-01-20",
                recipients: 12847,
                opens: 0,
                clicks: 0,
                revenue: "$0",
              },
              {
                name: "Customer Survey",
                type: "survey",
                status: "draft",
                sent: "-",
                recipients: 0,
                opens: 0,
                clicks: 0,
                revenue: "$0",
              },
            ].map((campaign, index) => (
              <Card key={index} className="bg-black/40 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-white">{campaign.name}</h4>
                        <Badge
                          variant={
                            campaign.type === "promotional"
                              ? "default"
                              : campaign.type === "newsletter"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.type}
                        </Badge>
                        <Badge
                          variant={
                            campaign.status === "sent"
                              ? "default"
                              : campaign.status === "scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        {campaign.status === "sent"
                          ? `Sent on ${campaign.sent}`
                          : campaign.status === "scheduled"
                            ? `Scheduled for ${campaign.sent}`
                            : "Draft"}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <div className="text-gray-400 text-sm">Recipients</div>
                      <div className="text-white font-semibold">{campaign.recipients.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Opens</div>
                      <div className="text-white font-semibold">{campaign.opens.toLocaleString()}</div>
                      {campaign.recipients > 0 && (
                        <div className="text-xs text-gray-500">
                          {((campaign.opens / campaign.recipients) * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Clicks</div>
                      <div className="text-white font-semibold">{campaign.clicks.toLocaleString()}</div>
                      {campaign.opens > 0 && (
                        <div className="text-xs text-gray-500">
                          {((campaign.clicks / campaign.opens) * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Revenue</div>
                      <div className="text-white font-semibold">{campaign.revenue}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">ROI</div>
                      <div className="text-green-400 font-semibold">
                        {campaign.status === "sent" ? `${Math.floor(Math.random() * 400 + 100)}%` : "-"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Draft Campaigns</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              New Draft
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Email Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email subject or topic..." className="bg-gray-800 border-gray-600 text-white" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Email Type</label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                      <option>Newsletter</option>
                      <option>Promotional</option>
                      <option>Welcome Series</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Tone</label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Urgent</option>
                      <option>Casual</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Generate Email</Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Draft List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Customer Survey", created: "2024-01-15", progress: 75 },
                    { title: "Product Update", created: "2024-01-12", progress: 45 },
                    { title: "Event Invitation", created: "2024-01-10", progress: 90 },
                    { title: "Monthly Newsletter", created: "2024-01-08", progress: 20 },
                  ].map((draft, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-medium">{draft.title}</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                            <Send className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">Created: {draft.created}</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={draft.progress} className="flex-1 h-2" />
                        <span className="text-xs text-gray-400">{draft.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Email Automation</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Active Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Welcome Series", trigger: "New subscriber", emails: 5, active: 247, status: "active" },
                    { name: "Abandoned Cart", trigger: "Cart abandonment", emails: 3, active: 89, status: "active" },
                    { name: "Re-engagement", trigger: "Inactive 30 days", emails: 2, active: 156, status: "paused" },
                    { name: "Birthday Campaign", trigger: "Birthday date", emails: 1, active: 23, status: "active" },
                  ].map((workflow, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-medium">{workflow.name}</div>
                        <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                          {workflow.status}
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">Trigger: {workflow.trigger}</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{workflow.emails} emails</span>
                        <span className="text-white">{workflow.active} active subscribers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-white font-medium mb-2">Welcome Series</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Email 1: Welcome</span>
                        <span className="text-white">89% open rate</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Email 2: Getting Started</span>
                        <span className="text-white">67% open rate</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Email 3: Tips & Tricks</span>
                        <span className="text-white">54% open rate</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-white font-medium mb-2">Abandoned Cart</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Recovery Rate</span>
                        <span className="text-green-400">23.4%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Revenue Generated</span>
                        <span className="text-white">$12,840</span>
                      </div>
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

export default EmailMarketing
