"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Video, Calendar, Clock, Users, DollarSign, Play, Download, Upload, Plus } from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  primaryColor: string
  secondaryColor: string
}

interface MediaProductionProps {
  selectedCompany: Company
}

export default function MediaProduction({ selectedCompany }: MediaProductionProps) {
  const [activeView, setActiveView] = useState("overview")

  const projects = [
    {
      id: 1,
      name: "Brand Photography Session",
      client: "Tech Innovations",
      type: "Photography",
      status: "In Progress",
      deadline: "2024-02-15",
      budget: "$5,000",
      completion: 75,
    },
    {
      id: 2,
      name: "Product Launch Video",
      client: "Digital Solutions",
      type: "Video",
      status: "Planning",
      deadline: "2024-02-28",
      budget: "$12,000",
      completion: 25,
    },
    {
      id: 3,
      name: "Corporate Headshots",
      client: "Growth Partners",
      type: "Photography",
      status: "Completed",
      deadline: "2024-01-30",
      budget: "$2,500",
      completion: 100,
    },
    {
      id: 4,
      name: "Social Media Content",
      client: "Scale Ventures",
      type: "Mixed",
      status: "In Progress",
      deadline: "2024-02-20",
      budget: "$8,000",
      completion: 60,
    },
  ]

  const equipment = [
    { id: 1, name: "Canon EOS R5", type: "Camera", status: "Available", location: "Studio A", lastUsed: "2024-01-28" },
    {
      id: 2,
      name: "Sony FX6",
      type: "Video Camera",
      status: "In Use",
      location: "On Location",
      lastUsed: "2024-01-30",
    },
    { id: 3, name: "Profoto B10", type: "Lighting", status: "Available", location: "Studio B", lastUsed: "2024-01-29" },
    {
      id: 4,
      name: "DJI Mavic 3",
      type: "Drone",
      status: "Maintenance",
      location: "Equipment Room",
      lastUsed: "2024-01-25",
    },
  ]

  const bookings = [
    {
      id: 1,
      client: "Tech Corp",
      service: "Product Photography",
      date: "2024-02-05",
      time: "10:00 AM",
      duration: "4 hours",
      status: "Confirmed",
    },
    {
      id: 2,
      client: "Growth Inc",
      service: "Video Production",
      date: "2024-02-08",
      time: "2:00 PM",
      duration: "6 hours",
      status: "Pending",
    },
    {
      id: 3,
      client: "Scale LLC",
      service: "Event Coverage",
      date: "2024-02-12",
      time: "6:00 PM",
      duration: "8 hours",
      status: "Confirmed",
    },
  ]

  const portfolio = [
    {
      id: 1,
      title: "Corporate Branding Suite",
      type: "Photography",
      client: "Tech Innovations",
      date: "2024-01-15",
      views: 1250,
      downloads: 45,
    },
    {
      id: 2,
      title: "Product Launch Campaign",
      type: "Video",
      client: "Digital Solutions",
      date: "2024-01-20",
      views: 3400,
      downloads: 120,
    },
    {
      id: 3,
      title: "Executive Portraits",
      type: "Photography",
      client: "Growth Partners",
      date: "2024-01-25",
      views: 890,
      downloads: 32,
    },
    {
      id: 4,
      title: "Social Media Assets",
      type: "Mixed",
      client: "Scale Ventures",
      date: "2024-01-28",
      views: 2100,
      downloads: 78,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Media Production
          </h2>
          <p className="text-gray-400 mt-2">Manage photography and videography projects for {selectedCompany.name}</p>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="bg-black/30 border border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-600">
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">
            Projects
          </TabsTrigger>
          <TabsTrigger value="equipment" className="data-[state=active]:bg-purple-600">
            Equipment
          </TabsTrigger>
          <TabsTrigger value="bookings" className="data-[state=active]:bg-purple-600">
            Bookings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-green-400 text-sm">+3 this month</p>
                  </div>
                  <Camera className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-white">$45K</p>
                    <p className="text-green-400 text-sm">+18% this month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white">28</p>
                    <p className="text-green-400 text-sm">+5 this month</p>
                  </div>
                  <Video className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Client Satisfaction</p>
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-green-400 text-sm">+0.2 this month</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Production Calendar */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Production Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-gray-400 font-medium p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="aspect-square p-2 border border-gray-800 rounded hover:bg-gray-800/30">
                    <div className="text-white text-sm">{(i % 31) + 1}</div>
                    {i === 5 && <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>}
                    {i === 12 && <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>}
                    {i === 18 && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                  <Camera className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <p className="text-white">Brand Photography Session completed</p>
                    <p className="text-gray-400 text-sm">Tech Innovations • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                  <Video className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white">Video editing started</p>
                    <p className="text-gray-400 text-sm">Product Launch Video • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                  <Upload className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-white">Assets delivered to client</p>
                    <p className="text-gray-400 text-sm">Corporate Headshots • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Media Portfolio</h3>
            <div className="flex space-x-2">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <Card key={item.id} className="bg-black/20 border-purple-500/20 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                  {item.type === "Video" ? (
                    <Video className="w-12 h-12 text-purple-400" />
                  ) : (
                    <Camera className="w-12 h-12 text-purple-400" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">{item.type}</Badge>
                    <span className="text-gray-400 text-sm">{item.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{item.client}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Play className="w-4 h-4 mr-1" />
                      {item.views} views
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Download className="w-4 h-4 mr-1" />
                      {item.downloads}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Project Management</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-black/20 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">{project.name}</h4>
                      <p className="text-gray-400">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          project.status === "Completed"
                            ? "bg-green-500/20 text-green-400 border-green-500/20"
                            : project.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/20"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{project.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{project.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{project.completion}% Complete</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Equipment Management</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <Card key={item.id} className="bg-black/20 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <Badge
                      className={
                        item.status === "Available"
                          ? "bg-green-500/20 text-green-400 border-green-500/20"
                          : item.status === "In Use"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/20"
                            : "bg-red-500/20 text-red-400 border-red-500/20"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Type:</span>
                      <span className="text-gray-300 text-sm">{item.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Location:</span>
                      <span className="text-gray-300 text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Last Used:</span>
                      <span className="text-gray-300 text-sm">{item.lastUsed}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-purple-500/20 text-white bg-transparent"
                    >
                      Reserve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-purple-500/20 text-white bg-transparent"
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Booking Management</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>

          <Card className="bg-black/20 border-purple-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-purple-500/20">
                    <tr>
                      <th className="text-left p-4 text-gray-400">Client</th>
                      <th className="text-left p-4 text-gray-400">Service</th>
                      <th className="text-left p-4 text-gray-400">Date & Time</th>
                      <th className="text-left p-4 text-gray-400">Duration</th>
                      <th className="text-left p-4 text-gray-400">Status</th>
                      <th className="text-left p-4 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                        <td className="p-4">
                          <p className="text-white font-medium">{booking.client}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-300">{booking.service}</p>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-gray-300">{booking.date}</p>
                            <p className="text-gray-400 text-sm">{booking.time}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-300">{booking.duration}</p>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              booking.status === "Confirmed"
                                ? "bg-green-500/20 text-green-400 border-green-500/20"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/20 text-white bg-transparent"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/20 text-white bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
