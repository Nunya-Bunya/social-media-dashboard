"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Plus } from "lucide-react"

interface SEOManagementProps {
  selectedCompany: any
}

function SEOManagement({ selectedCompany }: SEOManagementProps) {
  const [seoView, setSeoView] = useState("overview")

  return (
    <div className="space-y-6">
      <Tabs value={seoView} onValueChange={setSeoView}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Organic Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">24,847</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-200">Keyword Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% improvement
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Domain Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">67</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2 points
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-200">Page Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">89</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5 points
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { keyword: "digital marketing agency", position: 3, traffic: 1247, trend: "up" },
                    { keyword: "SEO services", position: 7, traffic: 892, trend: "up" },
                    { keyword: "social media marketing", position: 12, traffic: 634, trend: "down" },
                    { keyword: "content marketing", position: 5, traffic: 1156, trend: "up" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{item.keyword}</div>
                        <div className="text-gray-400 text-sm">Position #{item.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{item.traffic}</div>
                        <div
                          className={`text-sm flex items-center ${item.trend === "up" ? "text-green-400" : "text-red-400"}`}
                        >
                          {item.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {item.trend === "up" ? "+" : "-"}
                          {Math.floor(Math.random() * 20)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "10 SEO Trends for 2024", views: 2847, status: "published" },
                    { title: "Social Media Marketing Guide", views: 1923, status: "published" },
                    { title: "Content Strategy Best Practices", views: 0, status: "draft" },
                    { title: "Email Marketing Automation", views: 3421, status: "published" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{post.title}</div>
                        <div className="text-gray-400 text-sm">{post.views} views</div>
                      </div>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Keyword Research & Tracking</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Keywords
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Keyword Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { keyword: "local SEO services", difficulty: 45, volume: 2400, opportunity: "high" },
                    { keyword: "PPC management", difficulty: 62, volume: 1800, opportunity: "medium" },
                    { keyword: "brand strategy", difficulty: 38, volume: 3200, opportunity: "high" },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-white font-medium mb-2">{item.keyword}</div>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Difficulty: {item.difficulty}</span>
                        <span>Volume: {item.volume}</span>
                      </div>
                      <Badge variant={item.opportunity === "high" ? "default" : "secondary"}>
                        {item.opportunity} opportunity
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Ranking Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      keyword: "digital marketing",
                      current: 3,
                      previous: 5,
                      change: 2,
                      url: "/services/digital-marketing",
                    },
                    { keyword: "SEO optimization", current: 7, previous: 9, change: 2, url: "/services/seo" },
                    { keyword: "social media ads", current: 12, previous: 8, change: -4, url: "/services/social-ads" },
                    { keyword: "content creation", current: 5, previous: 6, change: 1, url: "/services/content" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{item.keyword}</div>
                        <div className="text-gray-400 text-sm">{item.url}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-white font-bold">#{item.current}</div>
                          <div className="text-gray-400 text-xs">Current</div>
                        </div>
                        <div
                          className={`flex items-center ${item.change > 0 ? "text-green-400" : item.change < 0 ? "text-red-400" : "text-gray-400"}`}
                        >
                          {item.change > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : item.change < 0 ? (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          ) : null}
                          {item.change > 0 ? "+" : ""}
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Blog Content Management</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Content Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter topic or keyword..." className="bg-gray-800 border-gray-600 text-white" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Content Type</label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                      <option>Blog Post</option>
                      <option>Product Description</option>
                      <option>Social Media Post</option>
                      <option>Email Newsletter</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Tone</label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Technical</option>
                      <option>Creative</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Generate Content</Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Content Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "SEO Best Practices 2024", date: "2024-01-15", status: "scheduled" },
                    { title: "Social Media Trends", date: "2024-01-18", status: "draft" },
                    { title: "Email Marketing Guide", date: "2024-01-22", status: "published" },
                    { title: "Content Strategy Tips", date: "2024-01-25", status: "draft" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-gray-400 text-sm">{item.date}</div>
                      </div>
                      <Badge
                        variant={
                          item.status === "published"
                            ? "default"
                            : item.status === "scheduled"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Technical SEO</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Largest Contentful Paint</span>
                      <span className="text-green-400">1.2s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">First Input Delay</span>
                      <span className="text-green-400">45ms</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Cumulative Layout Shift</span>
                      <span className="text-yellow-400">0.15</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Page Speed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/", mobile: 89, desktop: 95, issues: 2 },
                    { page: "/services", mobile: 76, desktop: 88, issues: 5 },
                    { page: "/about", mobile: 92, desktop: 97, issues: 1 },
                    { page: "/contact", mobile: 85, desktop: 91, issues: 3 },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{item.page}</span>
                        <span className="text-red-400 text-sm">{item.issues} issues</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mobile: {item.mobile}</span>
                        <span className="text-gray-400">Desktop: {item.desktop}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">SEO Audit</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Run New Audit
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-200">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">87/100</div>
                <div className="text-green-400 text-sm">Good performance</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Issues Found</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">23</div>
                <div className="text-blue-400 text-sm">Needs attention</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Last Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">2d</div>
                <div className="text-purple-400 text-sm">ago</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Audit Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Technical SEO", score: 92, issues: 3, status: "good" },
                  { category: "On-Page SEO", score: 85, issues: 7, status: "good" },
                  { category: "Content Quality", score: 78, issues: 8, status: "warning" },
                  { category: "User Experience", score: 89, issues: 5, status: "good" },
                  { category: "Mobile Optimization", score: 94, issues: 2, status: "excellent" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{item.category}</div>
                      <div className="text-gray-400 text-sm">{item.issues} issues found</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-white font-bold">{item.score}/100</div>
                      <Badge
                        variant={
                          item.status === "excellent" ? "default" : item.status === "good" ? "secondary" : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
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

export default SEOManagement
