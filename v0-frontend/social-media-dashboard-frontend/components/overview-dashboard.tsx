"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target, BarChart3, Activity, AlertTriangle, Clock } from "lucide-react"

export default function OverviewDashboard() {
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
    </div>
  )
}
