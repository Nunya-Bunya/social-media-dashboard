"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AnalyticsDashboard() {
  const [analyticsView, setAnalyticsView] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Track your marketing performance with key metrics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={analyticsView === "overview" ? "default" : "outline"}
            onClick={() => setAnalyticsView("overview")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Overview
          </Button>
          <Button
            variant={analyticsView === "traffic" ? "default" : "outline"}
            onClick={() => setAnalyticsView("traffic")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Traffic
          </Button>
          <Button
            variant={analyticsView === "campaigns" ? "default" : "outline"}
            onClick={() => setAnalyticsView("campaigns")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Campaigns
          </Button>
          <Button
            variant={analyticsView === "metrics" ? "default" : "outline"}
            onClick={() => setAnalyticsView("metrics")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Key Metrics
          </Button>
        </div>
      </div>

      {analyticsView === "overview" && (
        <div className="space-y-6">
          {/* Revenue and Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-white">$47,892</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-xs text-green-400">+15.3% vs last month</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-white">24,567</div>
                <div className="text-sm text-gray-400">Website Visitors</div>
                <div className="text-xs text-blue-400">+8.7% vs last month</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-white">3.2%</div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
                <div className="text-xs text-purple-400">+0.4% vs last month</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-500/20">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-white">4.2x</div>
                <div className="text-sm text-gray-400">ROAS</div>
                <div className="text-xs text-amber-400">Return on Ad Spend</div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Organic Search", visitors: "12,345", percentage: 50 },
                  { source: "Paid Ads", visitors: "7,890", percentage: 32 },
                  { source: "Social Media", visitors: "2,456", percentage: 10 },
                  { source: "Direct", visitors: "1,876", percentage: 8 },
                ].map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-white font-medium">{source.source}</div>
                      <div className="text-sm text-gray-400">{source.visitors} visitors</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-white text-sm w-8">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {analyticsView === "metrics" && (
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top 10 Marketing Metrics</CardTitle>
              <p className="text-gray-400">Essential metrics every digital marketing company should track</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { metric: "Customer Acquisition Cost (CAC)", value: "$47", target: "$45", status: "warning" },
                  { metric: "Customer Lifetime Value (CLV)", value: "$1,250", target: "$1,200", status: "good" },
                  { metric: "Return on Ad Spend (ROAS)", value: "4.2x", target: "4.0x", status: "good" },
                  { metric: "Conversion Rate", value: "3.2%", target: "3.0%", status: "good" },
                  { metric: "Cost Per Lead (CPL)", value: "$12", target: "$15", status: "good" },
                  { metric: "Email Open Rate", value: "24.5%", target: "22%", status: "good" },
                  { metric: "Social Media Engagement", value: "4.8%", target: "4.5%", status: "good" },
                  { metric: "Website Traffic Growth", value: "+15.3%", target: "+12%", status: "good" },
                  { metric: "Lead-to-Customer Rate", value: "18.7%", target: "20%", status: "warning" },
                  { metric: "Brand Awareness Lift", value: "+23%", target: "+20%", status: "good" },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium">{item.metric}</div>
                      <div
                        className={`w-3 h-3 rounded-full ${item.status === "good" ? "bg-green-500" : "bg-yellow-500"}`}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                      <div className="text-sm text-gray-400">Target: {item.target}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add other views (traffic, campaigns) here */}
    </div>
  )
}
