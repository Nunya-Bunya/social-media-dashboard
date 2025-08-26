"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Eye, Edit, AlertTriangle, CheckCircle, Palette, Type, ImageIcon } from "lucide-react"

interface BrandManagementProps {
  selectedCompany: {
    id: string
    name: string
    industry: string
    primaryColor: string
    secondaryColor: string
  }
}

export default function BrandManagement({ selectedCompany }: BrandManagementProps) {
  const [brandView, setBrandView] = useState("overview")

  const brandAssets = [
    {
      id: 1,
      name: "Primary Logo",
      type: "Logo",
      format: "SVG",
      size: "2.4 MB",
      downloads: 156,
      lastUsed: "2024-01-15",
    },
    {
      id: 2,
      name: "Business Card Template",
      type: "Template",
      format: "PSD",
      size: "8.1 MB",
      downloads: 89,
      lastUsed: "2024-01-12",
    },
    {
      id: 3,
      name: "Brand Guidelines",
      type: "Document",
      format: "PDF",
      size: "12.3 MB",
      downloads: 234,
      lastUsed: "2024-01-14",
    },
    {
      id: 4,
      name: "Social Media Kit",
      type: "Template",
      format: "AI",
      size: "15.7 MB",
      downloads: 178,
      lastUsed: "2024-01-13",
    },
  ]

  const brandColors = [
    { name: "Primary Blue", hex: "#2563EB", usage: "Headers, CTAs" },
    { name: "Secondary Gray", hex: "#6B7280", usage: "Body text, borders" },
    { name: "Accent Orange", hex: "#F59E0B", usage: "Highlights, alerts" },
    { name: "Success Green", hex: "#10B981", usage: "Success states" },
  ]

  const brandTemplates = [
    { id: 1, name: "Email Signature", category: "Email", usage: 45, lastModified: "2024-01-10" },
    { id: 2, name: "Presentation Template", category: "Presentation", usage: 23, lastModified: "2024-01-08" },
    { id: 3, name: "Invoice Template", category: "Document", usage: 67, lastModified: "2024-01-12" },
    { id: 4, name: "Social Post Template", category: "Social", usage: 89, lastModified: "2024-01-14" },
  ]

  const consistencyIssues = [
    {
      id: 1,
      type: "Color",
      issue: "Incorrect blue shade used in email campaign",
      severity: "Medium",
      date: "2024-01-14",
    },
    { id: 2, type: "Logo", issue: "Low resolution logo on website footer", severity: "High", date: "2024-01-13" },
    {
      id: 3,
      type: "Typography",
      issue: "Wrong font family in social media posts",
      severity: "Low",
      date: "2024-01-12",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Brand Management</h2>
          <p className="text-gray-400">Manage brand assets, guidelines, and consistency for {selectedCompany.name}</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Asset
        </Button>
      </div>

      <Tabs value={brandView} onValueChange={setBrandView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-purple-600">
            Assets
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="data-[state=active]:bg-purple-600">
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">
            Templates
          </TabsTrigger>
          <TabsTrigger value="consistency" className="data-[state=active]:bg-purple-600">
            Consistency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Brand Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">247</div>
                <p className="text-gray-400 text-sm">Total assets</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-green-900/50 text-green-400">
                    +12 this month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">1,234</div>
                <p className="text-gray-400 text-sm">This month</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-400">
                    +23% vs last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Brand Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">94%</div>
                <p className="text-gray-400 text-sm">Consistency score</p>
                <Progress value={94} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <p className="text-gray-400 text-sm">Active issues</p>
                <div className="mt-2">
                  <Badge variant="destructive" className="bg-red-900/50 text-red-400">
                    1 High priority
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">New logo uploaded</span>
                  </div>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Brand guidelines updated</span>
                  </div>
                  <span className="text-gray-400 text-sm">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white">Template downloaded 15 times</span>
                  </div>
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="flex items-center justify-between">
            <Input placeholder="Search assets..." className="max-w-sm bg-gray-800/50 border-purple-500/20 text-white" />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-purple-500/20 text-white bg-transparent">
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <Card key={asset.id} className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{asset.name}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-900/50 text-purple-400">
                      {asset.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Format:</span>
                      <span className="text-white">{asset.format}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white">{asset.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Downloads:</span>
                      <span className="text-white">{asset.downloads}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Used:</span>
                      <span className="text-white">{asset.lastUsed}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/20 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/20 bg-transparent">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Brand Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brandColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                      <div
                        className="w-12 h-12 rounded-lg border border-gray-600"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{color.name}</div>
                        <div className="text-gray-400 text-sm">{color.hex}</div>
                        <div className="text-gray-500 text-xs">{color.usage}</div>
                      </div>
                      <Button size="sm" variant="outline" className="border-purple-500/20 bg-transparent">
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-white font-bold text-2xl mb-2">Heading Font</div>
                    <div className="text-gray-400">Inter Bold - 24px/32px</div>
                    <div className="text-gray-500 text-sm">Used for main headings and titles</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-white text-lg mb-2">Body Font</div>
                    <div className="text-gray-400">Inter Regular - 16px/24px</div>
                    <div className="text-gray-500 text-sm">Used for body text and descriptions</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-white text-sm font-mono mb-2">Code Font</div>
                    <div className="text-gray-400">JetBrains Mono - 14px/20px</div>
                    <div className="text-gray-500 text-sm">Used for code and technical content</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Logo Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-full h-32 bg-gray-800/30 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-white font-bold">LOGO</div>
                  </div>
                  <div className="text-white font-medium mb-1">Primary Logo</div>
                  <div className="text-gray-400 text-sm">Use on light backgrounds</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-black font-bold">LOGO</div>
                  </div>
                  <div className="text-white font-medium mb-1">Dark Logo</div>
                  <div className="text-gray-400 text-sm">Use on dark backgrounds</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-white font-bold">LOGO</div>
                  </div>
                  <div className="text-white font-medium mb-1">White Logo</div>
                  <div className="text-gray-400 text-sm">Use on colored backgrounds</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandTemplates.map((template) => (
              <Card key={template.id} className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{template.name}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-900/50 text-blue-400">
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Usage Count:</span>
                      <span className="text-white">{template.usage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Modified:</span>
                      <span className="text-white">{template.lastModified}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/20 bg-transparent">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/20 bg-transparent">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="consistency" className="space-y-6">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Brand Consistency Issues</CardTitle>
              <CardDescription className="text-gray-400">Issues detected across your brand touchpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consistencyIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          issue.severity === "High"
                            ? "bg-red-400"
                            : issue.severity === "Medium"
                              ? "bg-yellow-400"
                              : "bg-green-400"
                        }`}
                      ></div>
                      <div>
                        <div className="text-white font-medium">{issue.issue}</div>
                        <div className="text-gray-400 text-sm">
                          {issue.type} • {issue.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          issue.severity === "High"
                            ? "destructive"
                            : issue.severity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {issue.severity}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-purple-500/20 bg-transparent">
                        Resolve
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
