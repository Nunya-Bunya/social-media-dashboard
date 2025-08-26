"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Activity,
  AlertTriangle,
  Clock,
  Calendar,
  Plus,
  MessageSquare,
  Bell,
  Filter,
} from "lucide-react"
import { useState } from "react"

export default function OverviewDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [eventTitle, setEventTitle] = useState("")
  const [eventCategory, setEventCategory] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [slackConnected, setSlackConnected] = useState(false)

  const marketingEvents = [
    {
      id: 1,
      date: "2024-01-15",
      title: "Instagram Campaign Launch",
      category: "social",
      color: "bg-pink-500",
      description: "New product showcase campaign",
    },
    {
      id: 2,
      date: "2024-01-16",
      title: "Email Newsletter Send",
      category: "email",
      color: "bg-blue-500",
      description: "Monthly newsletter to 15K subscribers",
    },
    {
      id: 3,
      date: "2024-01-17",
      title: "Blog Post Publication",
      category: "seo",
      color: "bg-green-500",
      description: "SEO-optimized article on industry trends",
    },
    {
      id: 4,
      date: "2024-01-18",
      title: "Google Ads Optimization",
      category: "ads",
      color: "bg-yellow-500",
      description: "Keyword bid adjustments and A/B testing",
    },
    {
      id: 5,
      date: "2024-01-19",
      title: "Competitor Analysis Report",
      category: "competitive",
      color: "bg-purple-500",
      description: "Monthly competitive landscape review",
    },
    {
      id: 6,
      date: "2024-01-20",
      title: "Client Presentation",
      category: "reports",
      color: "bg-indigo-500",
      description: "Q4 performance review with stakeholders",
    },
    {
      id: 7,
      date: "2024-01-22",
      title: "Brand Asset Update",
      category: "brand",
      color: "bg-orange-500",
      description: "Logo refresh and style guide updates",
    },
    {
      id: 8,
      date: "2024-01-23",
      title: "Social Listening Alert",
      category: "listening",
      color: "bg-red-500",
      description: "Brand mention spike detected",
    },
    {
      id: 9,
      date: "2024-01-24",
      title: "Cold Outreach Campaign",
      category: "outreach",
      color: "bg-teal-500",
      description: "B2B prospect email sequence launch",
    },
    {
      id: 10,
      date: "2024-01-25",
      title: "CRM Data Cleanup",
      category: "crm",
      color: "bg-cyan-500",
      description: "Lead scoring model optimization",
    },
  ]

  const categoryColors = {
    social: "bg-pink-500",
    email: "bg-blue-500",
    seo: "bg-green-500",
    ads: "bg-yellow-500",
    competitive: "bg-purple-500",
    reports: "bg-indigo-500",
    brand: "bg-orange-500",
    listening: "bg-red-500",
    outreach: "bg-teal-500",
    crm: "bg-cyan-500",
    custom: "bg-gray-500",
  }

  const filteredEvents =
    filterCategory === "all" ? marketingEvents : marketingEvents.filter((event) => event.category === filterCategory)

  const handleAddEvent = () => {
    // Event handling logic would go here
    console.log("[v0] Adding event:", { eventTitle, eventCategory, eventDescription, selectedDate })
    setEventTitle("")
    setEventCategory("")
    setEventDescription("")
    setSelectedDate("")
  }

  const connectSlack = () => {
    setSlackConnected(true)
    console.log("[v0] Slack integration connected")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-white">$47,892</div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-sm text-gray-400">Monthly Revenue</div>
            <div className="text-xs text-green-400">+15.3% vs last month</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-white">2,847</div>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-sm text-gray-400">Active Leads</div>
            <div className="text-xs text-blue-400">+234 this week</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-white">89.2%</div>
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-sm text-gray-400">Conversion Rate</div>
            <div className="text-xs text-green-400">+5.7% improvement</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                style={{ width: "89%" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-white">4.2x</div>
              <BarChart3 className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-sm text-gray-400">ROAS</div>
            <div className="text-xs text-amber-400">Return on Ad Spend</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Health Score */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Marketing Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="82, 100"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">82</div>
                  <div className="text-xs text-gray-400">Excellent</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-green-400">95</div>
              <div className="text-xs text-gray-400">SEO Score</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-400">78</div>
              <div className="text-xs text-gray-400">Social Engagement</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-400">85</div>
              <div className="text-xs text-gray-400">Email Performance</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-amber-400">72</div>
              <div className="text-xs text-gray-400">Ad Performance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-white font-medium">High bounce rate detected</div>
                  <div className="text-sm text-gray-400">Landing page performance dropped 15%</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Fix
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-yellow-400" />
                <div>
                  <div className="text-white font-medium">Campaign budget running low</div>
                  <div className="text-sm text-gray-400">Google Ads campaign will pause in 2 days</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white font-medium">Opportunity identified</div>
                  <div className="text-sm text-gray-400">Competitor keyword gap found</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Explore
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Goal Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Monthly Revenue Target</span>
                <span className="text-gray-400">$47,892 / $50,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full"
                  style={{ width: "96%" }}
                ></div>
              </div>
              <div className="text-xs text-green-400 mt-1">96% complete - On track!</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Lead Generation</span>
                <span className="text-gray-400">2,847 / 3,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
              <div className="text-xs text-blue-400 mt-1">95% complete - Ahead of schedule</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Social Media Followers</span>
                <span className="text-gray-400">8,234 / 10,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
              <div className="text-xs text-purple-400 mt-1">82% complete - Needs attention</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Real-time ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Investment Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ad Spend</span>
                  <span className="text-white">$12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Content Creation</span>
                  <span className="text-white">$3,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tools & Software</span>
                  <span className="text-white">$890</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-white font-medium">Total Investment</span>
                  <span className="text-white font-medium">$16,540</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Returns</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue Generated</span>
                  <span className="text-white">$47,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost Savings</span>
                  <span className="text-white">$2,340</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-white font-medium">Total Returns</span>
                  <span className="text-white font-medium">$50,232</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-green-400 font-medium">Net ROI</span>
                  <span className="text-green-400 font-medium">203.6%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Marketing Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-white">
                    All Categories
                  </SelectItem>
                  <SelectItem value="social" className="text-white">
                    Social Media
                  </SelectItem>
                  <SelectItem value="email" className="text-white">
                    Email Marketing
                  </SelectItem>
                  <SelectItem value="seo" className="text-white">
                    SEO
                  </SelectItem>
                  <SelectItem value="ads" className="text-white">
                    Paid Ads
                  </SelectItem>
                  <SelectItem value="competitive" className="text-white">
                    Competitive
                  </SelectItem>
                  <SelectItem value="reports" className="text-white">
                    Reports
                  </SelectItem>
                  <SelectItem value="brand" className="text-white">
                    Brand
                  </SelectItem>
                  <SelectItem value="listening" className="text-white">
                    Social Listening
                  </SelectItem>
                  <SelectItem value="outreach" className="text-white">
                    Outreach
                  </SelectItem>
                  <SelectItem value="crm" className="text-white">
                    CRM
                  </SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Add Marketing Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-category">Category</Label>
                      <Select value={eventCategory} onValueChange={setEventCategory}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="social" className="text-white">
                            Social Media
                          </SelectItem>
                          <SelectItem value="email" className="text-white">
                            Email Marketing
                          </SelectItem>
                          <SelectItem value="seo" className="text-white">
                            SEO
                          </SelectItem>
                          <SelectItem value="ads" className="text-white">
                            Paid Ads
                          </SelectItem>
                          <SelectItem value="competitive" className="text-white">
                            Competitive
                          </SelectItem>
                          <SelectItem value="reports" className="text-white">
                            Reports
                          </SelectItem>
                          <SelectItem value="brand" className="text-white">
                            Brand
                          </SelectItem>
                          <SelectItem value="listening" className="text-white">
                            Social Listening
                          </SelectItem>
                          <SelectItem value="outreach" className="text-white">
                            Outreach
                          </SelectItem>
                          <SelectItem value="crm" className="text-white">
                            CRM
                          </SelectItem>
                          <SelectItem value="custom" className="text-white">
                            Custom Event
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleAddEvent}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Add Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-medium">{event.title}</div>
                    <div className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm text-gray-400 capitalize">
                    {event.category} • {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Category Legend:</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-gray-300">Social Media</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-300">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-300">Paid Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Competitive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-gray-300">Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-gray-300">Brand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-gray-300">Listening</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Outreach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-gray-300">CRM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Slack Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${slackConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <div>
                  <div className="text-white font-medium">
                    {slackConnected ? "Connected to Slack" : "Slack Not Connected"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {slackConnected
                      ? "Marketing updates are being sent to #marketing-updates channel"
                      : "Connect Slack to send marketing updates to your client"}
                  </div>
                </div>
              </div>
              {!slackConnected && (
                <Button
                  onClick={connectSlack}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Connect Slack
                </Button>
              )}
            </div>

            {slackConnected && (
              <div className="space-y-3">
                <div className="text-white font-medium flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Recent Slack Notifications
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-sm">
                    <div className="text-green-400 font-medium">✅ Instagram Campaign Launched</div>
                    <div className="text-gray-400">
                      New product showcase campaign is now live - targeting 25-45 demographics
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Sent to #marketing-updates • 2 hours ago</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                    <div className="text-blue-400 font-medium">📧 Email Newsletter Delivered</div>
                    <div className="text-gray-400">
                      Monthly newsletter sent to 15,234 subscribers with 24.3% open rate
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Sent to #marketing-updates • 4 hours ago</div>
                  </div>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-sm">
                    <div className="text-yellow-400 font-medium">🎯 Google Ads Optimized</div>
                    <div className="text-gray-400">
                      Keyword bids adjusted, CPC reduced by 15% while maintaining impression share
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Sent to #marketing-updates • 6 hours ago</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Notification Settings:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Campaign launches
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Performance alerts
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Weekly reports
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Goal achievements
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
