"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Zap,
} from "lucide-react"

interface AIAssistantProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function AIAssistant({ selectedCompany }: AIAssistantProps) {
  const [activeView, setActiveView] = useState("chat")
  const [message, setMessage] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState(selectedCompany.id)

  const businesses = [
    { id: "1", name: "Merkel & Conner", industry: "Legal Services" },
    { id: "2", name: "Conner Injury Law", industry: "Personal Injury Law" },
    { id: "3", name: "MBCS", industry: "Business Consulting" },
    { id: "4", name: "Nunya Bunya", industry: "Food & Beverage" },
    { id: "5", name: "Power Portraits", industry: "Photography" },
  ]

  const chatHistory = [
    {
      type: "ai",
      message: "Hello! I'm your AI marketing assistant. How can I help you optimize your marketing strategy today?",
      time: "10:30 AM",
    },
    { type: "user", message: "Can you analyze our social media performance for this month?", time: "10:32 AM" },
    {
      type: "ai",
      message:
        "I've analyzed your social media performance. Your engagement rate increased by 23% this month, with Instagram showing the strongest growth. Would you like me to create a detailed report?",
      time: "10:33 AM",
    },
  ]

  const aiInsights = [
    {
      title: "Content Optimization",
      description: "Your video content performs 40% better than static posts",
      impact: "High",
      color: "text-green-400",
    },
    {
      title: "Posting Schedule",
      description: "Tuesday 2-4 PM shows highest engagement rates",
      impact: "Medium",
      color: "text-yellow-400",
    },
    {
      title: "Audience Growth",
      description: "Target demographic 25-34 is underrepresented",
      impact: "High",
      color: "text-red-400",
    },
    {
      title: "Campaign Performance",
      description: "Email campaigns have 15% higher ROI than social ads",
      impact: "Medium",
      color: "text-blue-400",
    },
  ]

  const taskSuggestions = [
    { task: "Create Instagram Reels for next week", priority: "High", category: "Content", estimated: "2 hours" },
    { task: "Optimize Google Ads targeting", priority: "Medium", category: "Advertising", estimated: "1 hour" },
    { task: "Update email automation sequence", priority: "Low", category: "Email", estimated: "30 mins" },
    { task: "Analyze competitor content strategy", priority: "Medium", category: "Research", estimated: "1.5 hours" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Marketing Assistant
          </h2>
          <p className="text-gray-400 mt-2">Intelligent insights and automation for {selectedCompany.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white"
          >
            {businesses.map((business) => (
              <option key={business.id} value={business.id} className="bg-gray-800">
                {business.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/30">
          <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
            <Lightbulb className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
            <FileText className="w-4 h-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600">
            <Target className="w-4 h-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-purple-500/20 h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-400" />
                    AI Chat Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            chat.type === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-100"
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">{chat.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me anything about your marketing..."
                      className="flex-1 bg-gray-800/50 border-purple-500/20 text-white"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 text-blue-300 hover:from-blue-600/30 hover:to-cyan-600/30">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Content Ideas
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20 text-green-300 hover:from-green-600/30 hover:to-emerald-600/30">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyze Performance
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/20 text-orange-300 hover:from-orange-600/30 hover:to-amber-600/30">
                    <Target className="w-4 h-4 mr-2" />
                    Optimize Campaigns
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 text-purple-300 hover:from-purple-600/30 hover:to-pink-600/30">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Posts
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiInsights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white text-sm font-medium">{insight.title}</h4>
                        <Badge variant="outline" className={`${insight.color} border-current`}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs">{insight.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="bg-gray-900/50 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className={`w-5 h-5 ${insight.color}`} />
                    <Badge variant="outline" className={`${insight.color} border-current`}>
                      {insight.impact}
                    </Badge>
                  </div>
                  <h3 className="text-white font-medium mb-1">{insight.title}</h3>
                  <p className="text-gray-400 text-sm">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recommended Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {taskSuggestions.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{task.task}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            task.priority === "High"
                              ? "text-red-400 border-red-400"
                              : task.priority === "Medium"
                                ? "text-yellow-400 border-yellow-400"
                                : "text-green-400 border-green-400"
                          }
                        `}
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-gray-400 text-sm">{task.category}</span>
                        <span className="text-gray-400 text-sm">{task.estimated}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Content Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Content Type</label>
                  <select className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white">
                    <option>Social Media Post</option>
                    <option>Blog Article</option>
                    <option>Email Newsletter</option>
                    <option>Ad Copy</option>
                  </select>
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Topic/Keywords</label>
                  <Input
                    placeholder="Enter topic or keywords..."
                    className="bg-gray-800/50 border-purple-500/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Tone</label>
                  <select className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Friendly</option>
                    <option>Authoritative</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800/30 rounded-lg p-4 min-h-[200px]">
                  <p className="text-gray-400 italic">Generated content will appear here...</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="border-purple-500/20 text-purple-300 bg-transparent">
                    Copy
                  </Button>
                  <Button variant="outline" className="border-purple-500/20 text-purple-300 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="outline" className="border-purple-500/20 text-purple-300 bg-transparent">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">AI Campaign Optimizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/20">
                  <h3 className="text-blue-300 font-medium mb-2">Budget Optimization</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    AI suggests reallocating 15% of budget from Facebook to Google Ads for better ROI
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Apply
                  </Button>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/20">
                  <h3 className="text-green-300 font-medium mb-2">Audience Targeting</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Expand targeting to include "business owners" keyword for 23% more qualified leads
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Apply
                  </Button>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-900/20 to-amber-900/20 rounded-lg border border-orange-500/20">
                  <h3 className="text-orange-300 font-medium mb-2">Ad Creative</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Video ads perform 40% better than static images for your audience
                  </p>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">AI Predictions</p>
                    <p className="text-2xl font-bold text-white">94.2%</p>
                    <p className="text-green-400 text-sm">Accuracy Rate</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tasks Automated</p>
                    <p className="text-2xl font-bold text-white">127</p>
                    <p className="text-blue-400 text-sm">This Month</p>
                  </div>
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Time Saved</p>
                    <p className="text-2xl font-bold text-white">42.5h</p>
                    <p className="text-purple-400 text-sm">This Month</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ROI Improvement</p>
                    <p className="text-2xl font-bold text-white">+28%</p>
                    <p className="text-green-400 text-sm">vs Last Month</p>
                  </div>
                  <Target className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
