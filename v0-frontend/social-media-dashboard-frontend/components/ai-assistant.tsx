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
  Bot, 
  MessageSquare, 
  FileText, 
  Sparkles, 
  Send, 
  Download,
  Copy,
  RefreshCw,
  Settings,
  Brain,
  Zap,
  Target
} from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

export default function AIAssistant({ selectedCompany }: { selectedCompany: Company }) {
  const [chatMessage, setChatMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  const [chatHistory] = useState([
    {
      id: 1,
      type: "user",
      message: "Can you help me create a social media strategy for our law firm?",
      timestamp: "2024-01-15 10:30 AM"
    },
    {
      id: 2,
      type: "assistant",
      message: "Absolutely! For a law firm like yours, I'd recommend focusing on educational content, client testimonials, and thought leadership. Let me create a comprehensive strategy for you.",
      timestamp: "2024-01-15 10:31 AM"
    },
    {
      id: 3,
      type: "user",
      message: "What type of content should we post on LinkedIn?",
      timestamp: "2024-01-15 10:32 AM"
    },
    {
      id: 4,
      type: "assistant",
      message: "For LinkedIn, focus on professional content like legal insights, case studies, industry trends, and thought leadership articles. I can help you create specific post ideas.",
      timestamp: "2024-01-15 10:33 AM"
    }
  ])

  const [generatedContent] = useState([
    {
      id: 1,
      type: "social-post",
      title: "LinkedIn Post: Legal Industry Trends",
      content: "The legal landscape is evolving rapidly with AI and automation. Here's what every business owner should know about protecting their intellectual property in 2024...",
      platform: "LinkedIn",
      status: "ready"
    },
    {
      id: 2,
      type: "email-campaign",
      title: "Client Newsletter: Q1 Legal Updates",
      content: "Dear valued clients, As we begin 2024, we wanted to share important legal updates that may affect your business...",
      platform: "Email",
      status: "draft"
    },
    {
      id: 3,
      type: "blog-post",
      title: "5 Ways to Protect Your Business in 2024",
      content: "In today's rapidly changing business environment, protecting your company has never been more important...",
      platform: "Blog",
      status: "ready"
    }
  ])

  const [aiTasks] = useState([
    {
      id: 1,
      title: "Create Q1 content calendar",
      description: "Generate a comprehensive content calendar for Q1 2024",
      status: "completed",
      priority: "high"
    },
    {
      id: 2,
      title: "Analyze competitor social media",
      description: "Research and analyze top 5 competitor social media strategies",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: 3,
      title: "Optimize website SEO",
      description: "Review and optimize website for better search rankings",
      status: "pending",
      priority: "high"
    }
  ])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return
    
    setIsGenerating(true)
    // Simulate AI response
    setTimeout(() => {
      setIsGenerating(false)
      setChatMessage("")
    }, 2000)
  }

  const generateContent = (type: string) => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">AI Assistant</h2>
          <p className="text-gray-400 mt-2">
            Your intelligent marketing companion for {selectedCompany.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            <Brain className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-purple-500/20">
          <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
            <FileText className="w-4 h-4 mr-2" />
            Content Generator
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-600">
            <Target className="w-4 h-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-400" />
                AI Chat Assistant
              </CardTitle>
              <CardDescription className="text-gray-400">
                Ask me anything about marketing, content creation, or strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat History */}
              <ScrollArea className="h-96 w-full rounded-md border border-purple-500/20 p-4">
                <div className="space-y-4">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 text-gray-200 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask your AI assistant anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim() || isGenerating}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Generator Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Types */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Generate Content</CardTitle>
                <CardDescription className="text-gray-400">
                  Create various types of marketing content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => generateContent("social-post")}
                    disabled={isGenerating}
                    variant="outline"
                    className="h-20 flex-col bg-gray-800/50 border-purple-500/20 hover:bg-purple-600/20"
                  >
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span className="text-sm">Social Post</span>
                  </Button>
                  <Button
                    onClick={() => generateContent("email")}
                    disabled={isGenerating}
                    variant="outline"
                    className="h-20 flex-col bg-gray-800/50 border-purple-500/20 hover:bg-purple-600/20"
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Email</span>
                  </Button>
                  <Button
                    onClick={() => generateContent("blog")}
                    disabled={isGenerating}
                    variant="outline"
                    className="h-20 flex-col bg-gray-800/50 border-purple-500/20 hover:bg-purple-600/20"
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Blog Post</span>
                  </Button>
                  <Button
                    onClick={() => generateContent("ad-copy")}
                    disabled={isGenerating}
                    variant="outline"
                    className="h-20 flex-col bg-gray-800/50 border-purple-500/20 hover:bg-purple-600/20"
                  >
                    <Target className="w-6 h-6 mb-2" />
                    <span className="text-sm">Ad Copy</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Generated Content</CardTitle>
                <CardDescription className="text-gray-400">
                  Your AI-generated content library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {generatedContent.map((content) => (
                      <div
                        key={content.id}
                        className="p-3 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{content.title}</h4>
                          <Badge
                            variant={content.status === "ready" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {content.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {content.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-400">{content.platform}</span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">AI Tasks</CardTitle>
              <CardDescription className="text-gray-400">
                Automated tasks and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-800/50 border border-purple-500/20 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          task.status === "completed"
                            ? "default"
                            : task.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {task.status}
                      </Badge>
                      <Badge
                        variant={task.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <p className="text-sm text-green-400">
                      Your LinkedIn posts perform 23% better on Tuesdays
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-sm text-blue-400">
                      Email open rates increased by 15% with new subject lines
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                    <p className="text-sm text-purple-400">
                      Video content generates 3x more engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-400" />
                  Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <p className="text-sm text-orange-400">
                      Consider posting more educational content
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded">
                    <p className="text-sm text-indigo-400">
                      Optimize website loading speed for better SEO
                    </p>
                  </div>
                  <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded">
                    <p className="text-sm text-pink-400">
                      Engage more with industry hashtags
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-400" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded">
                    <p className="text-sm text-teal-400">
                      Launch a thought leadership campaign
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded">
                    <p className="text-sm text-cyan-400">
                      Create case study content for Q1
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded">
                    <p className="text-sm text-emerald-400">
                      Optimize for local SEO keywords
                    </p>
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
