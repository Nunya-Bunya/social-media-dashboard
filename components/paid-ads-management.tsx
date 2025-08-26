"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Eye, MousePointer, Users } from "lucide-react"

interface PaidAdsManagementProps {
  selectedCompany: any
}

function PaidAdsManagement({ selectedCompany }: PaidAdsManagementProps) {
  const [adsView, setAdsView] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-200">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$24,847</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.2x</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.3x improvement
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18.3% increase
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-200">CPC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$2.34</div>
            <div className="flex items-center text-sm text-red-400">
              <TrendingDown className="w-4 h-4 mr-1" />
              -8.2% decrease
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: "Google Ads", spend: "$12,400", roas: "4.8x", conversions: 687, status: "active" },
                { platform: "Facebook Ads", spend: "$8,200", roas: "3.9x", conversions: 423, status: "active" },
                { platform: "LinkedIn Ads", spend: "$2,800", roas: "2.1x", conversions: 89, status: "paused" },
                { platform: "TikTok Ads", spend: "$1,447", roas: "5.2x", conversions: 48, status: "active" },
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{platform.platform}</div>
                    <div className="text-gray-400 text-sm">Spend: {platform.spend}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{platform.roas} ROAS</div>
                    <div className="text-gray-400 text-sm">{platform.conversions} conversions</div>
                  </div>
                  <Badge variant={platform.status === "active" ? "default" : "secondary"}>{platform.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Campaign Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Campaign Performance</div>
                <div className="text-gray-400">Conversion funnel analysis</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Impressions</span>
                  </div>
                  <span className="text-white font-semibold">2,847,392</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-green-400" />
                    <span className="text-white">Clicks</span>
                  </div>
                  <span className="text-white font-semibold">84,231</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Leads</span>
                  </div>
                  <span className="text-white font-semibold">3,247</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-orange-400" />
                    <span className="text-white">Conversions</span>
                  </div>
                  <span className="text-white font-semibold">1,247</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="text-sm text-gray-400 mb-2">Conversion Rate</div>
                <Progress value={38} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">38.4% lead to conversion rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PaidAdsManagement
