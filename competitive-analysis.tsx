"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Eye, Users, Target, AlertTriangle, CheckCircle, Plus } from "lucide-react"

interface CompetitiveAnalysisProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function CompetitiveAnalysis({ selectedCompany }: CompetitiveAnalysisProps) {
  const [competitiveView, setCompetitiveView] = useState("overview")

  const competitors = [
    {
      id: 1,
      name: "CompetitorA Legal",
      industry: "Legal Services",
      marketShare: 23,
      threat: "High",
      growth: 12,
      revenue: "$2.4M",
      employees: 45,
      founded: 2018,
    },
    {
      id: 2,
      name: "LawFirm Pro",
      industry: "Legal Services",
      marketShare: 18,
      threat: "Medium",
      growth: 8,
      revenue: "$1.8M",
      employees: 32,
      founded: 2020,
    },
    {
      id: 3,
      name: "Justice Partners",
      industry: "Legal Services",
      marketShare: 15,
      threat: "Low",
      growth: 5,
      revenue: "$1.2M",
      employees: 28,
      founded: 2019,
    },
  ]

  const swotData = {
    strengths: [
      "Strong brand recognition in local market",
      "Experienced legal team with 15+ years",
      "High client satisfaction scores (4.8/5)",
      "Comprehensive service offerings",
    ],
    weaknesses: [
      "Limited digital marketing presence",
      "Higher pricing than competitors",
      "Slower response times to inquiries",
      "Outdated website design",
    ],
    opportunities: [
      "Growing demand for personal injury cases",
      "Expansion into corporate law",
      "Digital transformation initiatives",
      "Partnership opportunities with insurance companies",
    ],
    threats: [
      "New competitors entering market",
      "Economic downturn affecting legal spending",
      "Regulatory changes in legal industry",
      "Client preference shifting to online services",
    ],
  }

  const marketPositioning = [
    { company: selectedCompany.name, x: 85, y: 75, size: 20, color: "purple" },
    { company: "CompetitorA Legal", x: 70, y: 85, size: 25, color: "red" },
    { company: "LawFirm Pro", x: 60, y: 65, size: 18, color: "blue" },
    { company: "Justice Partners", x: 45, y: 55, size: 15, color: "green" },
  ]

  const competitiveReports = [
    { id: 1, title: "Q4 2023 Market Analysis", date: "2024-01-15", status: "Complete", insights: 12 },
    { id: 2, title: "Competitor Pricing Study", date: "2024-01-10", status: "In Progress", insights: 8 },
    { id: 3, title: "Digital Presence Audit", date: "2024-01-05", status: "Complete", insights: 15 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Competitive Analysis</h2>
          <p className="text-gray-400">Monitor competitors and analyze market positioning for {selectedCompany.name}</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      <Tabs value={competitiveView} onValueChange={setCompetitiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="competitors" className="data-[state=active]:bg-purple-600">
            Competitors
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
            Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Market Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">#2</div>
                <p className="text-gray-400 text-sm">In local market</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-green-900/50 text-green-400">
                    +1 position
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Competitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">12</div>
                <p className="text-gray-400 text-sm">Active competitors</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                    +2 new entries
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Market Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">28%</div>
                <p className="text-gray-400 text-sm">Local market share</p>
                <Progress value={28} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Threat Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">Medium</div>
                <p className="text-gray-400 text-sm">Overall threat</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-400">
                    2 high threats
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Market Positioning</CardTitle>
                <CardDescription className="text-gray-400">Quality vs Price positioning map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 bg-gray-800/30 rounded-lg p-4">
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                    Price →
                  </div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-400 text-sm">
                    Quality →
                  </div>
                  {marketPositioning.map((company, index) => (
                    <div
                      key={index}
                      className={`absolute w-${company.size} h-${company.size} rounded-full bg-${company.color}-500 flex items-center justify-center text-white text-xs font-bold`}
                      style={{
                        left: `${company.x}%`,
                        top: `${100 - company.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      title={company.company}
                    >
                      {company.company.charAt(0)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-green-400 font-medium">Strengths</div>
                    <div className="text-sm text-gray-300">
                      {swotData.strengths.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-red-400 font-medium">Weaknesses</div>
                    <div className="text-sm text-gray-300">
                      {swotData.weaknesses.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-blue-400 font-medium">Opportunities</div>
                    <div className="text-sm text-gray-300">
                      {swotData.opportunities.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-yellow-400 font-medium">Threats</div>
                    <div className="text-sm text-gray-300">
                      {swotData.threats.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Search competitors..."
              className="max-w-sm bg-gray-800/50 border-purple-500/20 text-white"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Competitor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor) => (
              <Card key={competitor.id} className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{competitor.name}</CardTitle>
                    <Badge
                      variant={
                        competitor.threat === "High"
                          ? "destructive"
                          : competitor.threat === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {competitor.threat} Threat
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{competitor.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Market Share:</span>
                      <span className="text-white">{competitor.marketShare}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Growth Rate:</span>
                      <span className="text-white flex items-center">
                        {competitor.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1 text-red-400" />
                        )}
                        {competitor.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-white">{competitor.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Employees:</span>
                      <span className="text-white">{competitor.employees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Founded:</span>
                      <span className="text-white">{competitor.founded}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-purple-500/20 mt-3 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Feature Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-gray-400">Feature</div>
                    <div className="text-white text-center">You</div>
                    <div className="text-white text-center">Comp A</div>
                    <div className="text-white text-center">Comp B</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm items-center">
                    <div className="text-gray-300">Online Booking</div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                    <div className="text-center">-</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm items-center">
                    <div className="text-gray-300">24/7 Support</div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                    <div className="text-center">-</div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm items-center">
                    <div className="text-gray-300">Mobile App</div>
                    <div className="text-center">-</div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm items-center">
                    <div className="text-gray-300">Free Consultation</div>
                    <div className="text-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    </div>
                    <div className="text-center">-</div>
                    <div className="text-center">-</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Pricing Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <div className="text-white font-medium">{selectedCompany.name}</div>
                    <div className="text-2xl font-bold text-white mt-1">$350/hr</div>
                    <div className="text-gray-400 text-sm">Premium positioning</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-white font-medium">CompetitorA Legal</div>
                    <div className="text-2xl font-bold text-white mt-1">$275/hr</div>
                    <div className="text-gray-400 text-sm">Mid-market positioning</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-white font-medium">LawFirm Pro</div>
                    <div className="text-2xl font-bold text-white mt-1">$225/hr</div>
                    <div className="text-gray-400 text-sm">Budget positioning</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveReports.map((report) => (
              <Card key={report.id} className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">{report.title}</CardTitle>
                  <CardDescription className="text-gray-400">{report.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status:</span>
                      <Badge variant={report.status === "Complete" ? "secondary" : "default"}>{report.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Insights:</span>
                      <span className="text-white">{report.insights}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-purple-500/20 mt-3 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
