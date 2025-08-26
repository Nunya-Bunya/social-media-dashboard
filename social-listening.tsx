"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Heart,
  Share2,
  Filter,
  Calendar,
  Users,
  Globe,
} from "lucide-react"

interface SocialListeningProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function SocialListening({ selectedCompany }: SocialListeningProps) {
  const [activeView, setActiveView] = useState("overview")

  const mentionData = [
    { platform: "Twitter", mentions: 1247, sentiment: 78, reach: "2.3M" },
    { platform: "Facebook", mentions: 892, sentiment: 82, reach: "1.8M" },
    { platform: "Instagram", mentions: 634, sentiment: 85, reach: "1.2M" },
    { platform: "LinkedIn", mentions: 423, sentiment: 91, reach: "890K" },
    { platform: "Reddit", mentions: 312, sentiment: 65, reach: "750K" },
    { platform: "TikTok", mentions: 189, sentiment: 88, reach: "3.1M" },
  ]

  const trendingTopics = [
    { topic: "#LegalAdvice", mentions: 2847, growth: "+23%", sentiment: 76 },
    { topic: "#PersonalInjury", mentions: 1923, growth: "+18%", sentiment: 82 },
    { topic: "#LawFirm", mentions: 1456, growth: "+12%", sentiment: 79 },
    { topic: "#Justice", mentions: 1234, growth: "+8%", sentiment: 85 },
    { topic: "#LegalHelp", mentions: 987, growth: "+15%", sentiment: 81 },
  ]

  const recentMentions = [
    {
      id: 1,
      platform: "Twitter",
      author: "@legal_seeker",
      content: "Just had an amazing experience with Merkel & Conner. Professional and caring team!",
      sentiment: "positive",
      reach: 1247,
      engagement: 89,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      platform: "Facebook",
      author: "Sarah Johnson",
      content: "Looking for recommendations for personal injury lawyers in the area...",
      sentiment: "neutral",
      reach: 892,
      engagement: 34,
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      platform: "Reddit",
      author: "u/helpneeded2024",
      content: "Has anyone worked with Merkel & Conner? Need some advice on my case.",
      sentiment: "neutral",
      reach: 2341,
      engagement: 156,
      timestamp: "6 hours ago",
    },
  ]

  const crisisAlerts = [
    {
      id: 1,
      type: "negative_spike",
      title: "Negative Sentiment Spike Detected",
      description: "15% increase in negative mentions in the last 2 hours",
      severity: "medium",
      platform: "Twitter",
      timestamp: "1 hour ago",
    },
    {
      id: 2,
      type: "competitor_mention",
      title: "Competitor Comparison Trending",
      description: "Your brand is being compared to Johnson & Associates",
      severity: "low",
      platform: "Reddit",
      timestamp: "3 hours ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Social Listening</h2>
          <p className="text-gray-400">Monitor brand mentions and sentiment across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-purple-500/20 text-purple-400 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-purple-500/20 text-purple-400 bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="mentions" className="data-[state=active]:bg-purple-600">
            Mentions
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">
            Trends
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-600">
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Mentions</p>
                    <p className="text-2xl font-bold text-white">3,697</p>
                    <p className="text-green-400 text-sm">+12% vs last week</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Sentiment</p>
                    <p className="text-2xl font-bold text-white">81%</p>
                    <p className="text-green-400 text-sm">+3% vs last week</p>
                  </div>
                  <Heart className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Reach</p>
                    <p className="text-2xl font-bold text-white">9.8M</p>
                    <p className="text-blue-400 text-sm">+18% vs last week</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Engagement Rate</p>
                    <p className="text-2xl font-bold text-white">4.2%</p>
                    <p className="text-orange-400 text-sm">+0.8% vs last week</p>
                  </div>
                  <Share2 className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Breakdown */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Platform Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentionData.map((platform) => (
                  <div
                    key={platform.platform}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{platform.platform}</h4>
                        <p className="text-gray-400 text-sm">{platform.mentions} mentions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm">Sentiment: {platform.sentiment}%</span>
                        <Progress value={platform.sentiment} className="w-20 h-2" />
                      </div>
                      <p className="text-gray-400 text-sm">Reach: {platform.reach}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Mentions</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search mentions..."
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
                {recentMentions.map((mention) => (
                  <div key={mention.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                          {mention.platform}
                        </Badge>
                        <span className="text-gray-400 text-sm">@{mention.author}</span>
                        <Badge
                          variant={
                            mention.sentiment === "positive"
                              ? "default"
                              : mention.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {mention.sentiment}
                        </Badge>
                      </div>
                      <span className="text-gray-500 text-xs">{mention.timestamp}</span>
                    </div>
                    <p className="text-white mb-3">{mention.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Reach: {mention.reach.toLocaleString()}</span>
                      <span>Engagement: {mention.engagement}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto border-purple-500/20 text-purple-400 bg-transparent"
                      >
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{topic.topic}</h4>
                        <p className="text-gray-400 text-sm">{topic.mentions.toLocaleString()} mentions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-green-500/20 text-green-400">
                          {topic.growth}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">{topic.sentiment}%</span>
                        <Progress value={topic.sentiment} className="w-16 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Crisis Management Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crisisAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                          {alert.platform}
                        </Badge>
                      </div>
                      <span className="text-gray-500 text-xs">{alert.timestamp}</span>
                    </div>
                    <h4 className="text-white font-medium mb-2">{alert.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{alert.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/20 text-purple-400 bg-transparent"
                      >
                        Mark as Resolved
                      </Button>
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
