"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function SocialMediaManagement() {
  const [socialView, setSocialView] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Social Media Management</h2>
          <p className="text-gray-400">Manage all your social platforms in one place</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={socialView === "overview" ? "default" : "outline"}
            onClick={() => setSocialView("overview")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Overview
          </Button>
          <Button
            variant={socialView === "create" ? "default" : "outline"}
            onClick={() => setSocialView("create")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <Button
            variant={socialView === "analytics" ? "default" : "outline"}
            onClick={() => setSocialView("analytics")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Analytics
          </Button>
          <Button
            variant={socialView === "schedule" ? "default" : "outline"}
            onClick={() => setSocialView("schedule")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Schedule
          </Button>
        </div>
      </div>

      {socialView === "overview" && (
        <div className="space-y-6">
          {/* Platform Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">12.4K</div>
                  <Facebook className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm text-gray-400">Facebook Followers</div>
                <div className="text-xs text-blue-400">+234 this week</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/50 to-rose-800/50 border-pink-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">8.7K</div>
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div className="text-sm text-gray-400">Instagram Followers</div>
                <div className="text-xs text-pink-400">+189 this week</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sky-900/50 to-blue-800/50 border-sky-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">5.2K</div>
                  <Twitter className="w-6 h-6 text-sky-400" />
                </div>
                <div className="text-sm text-gray-400">Twitter Followers</div>
                <div className="text-xs text-sky-400">+67 this week</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-800/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">3.1K</div>
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm text-gray-400">LinkedIn Connections</div>
                <div className="text-xs text-blue-400">+45 this week</div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Metrics */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Engagement Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.8%</div>
                  <div className="text-gray-400">Avg Engagement Rate</div>
                  <div className="text-sm text-green-400">+0.7% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">2.1K</div>
                  <div className="text-gray-400">Total Interactions</div>
                  <div className="text-sm text-blue-400">+345 vs last week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">156</div>
                  <div className="text-gray-400">Posts This Month</div>
                  <div className="text-sm text-purple-400">+12 vs last month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts Performance */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    platform: "Instagram",
                    content: "Behind the scenes of our latest project...",
                    engagement: "2.4K",
                    reach: "18.7K",
                  },
                  {
                    platform: "Facebook",
                    content: "Client success story: How we increased...",
                    engagement: "1.8K",
                    reach: "12.3K",
                  },
                  {
                    platform: "LinkedIn",
                    content: "5 marketing trends to watch in 2024...",
                    engagement: "967",
                    reach: "8.9K",
                  },
                ].map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          {post.platform}
                        </span>
                      </div>
                      <div className="text-white">{post.content}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{post.engagement} engagements</div>
                      <div className="text-sm text-gray-400">{post.reach} reach</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {socialView === "create" && (
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Platforms</label>
                <div className="flex gap-4">
                  {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Content</label>
                <textarea
                  className="w-full h-32 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  placeholder="What's on your mind?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">AI Content Suggestions</label>
                <div className="space-y-2">
                  {[
                    "Share a client success story with before/after results",
                    "Post about the latest marketing trends in your industry",
                    "Create a behind-the-scenes look at your team",
                    "Share a helpful tip or tutorial for your audience",
                  ].map((suggestion, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800">
                      <div className="text-white text-sm">{suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Post Now
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Schedule Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add other views (analytics, schedule) here */}
    </div>
  )
}
