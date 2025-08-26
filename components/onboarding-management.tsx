"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Users, FileText, Star } from "lucide-react"

interface OnboardingManagementProps {
  selectedCompany: any
}

function OnboardingManagement({ selectedCompany }: OnboardingManagementProps) {
  const [onboardingStep, setOnboardingStep] = useState(1)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-blue-400 text-sm">In onboarding process</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-200">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">147</div>
            <div className="text-green-400 text-sm">This quarter</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Avg. Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12 days</div>
            <div className="text-purple-400 text-sm">To completion</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-200">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.8/5</div>
            <div className="text-orange-400 text-sm">Client rating</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Onboarding Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: "TechStart Inc.", step: "Package Selection", progress: 25, status: "active" },
                { client: "Local Bakery", step: "Brand Assets", progress: 60, status: "active" },
                { client: "Fitness Studio", step: "Questionnaire", progress: 85, status: "active" },
                { client: "Law Firm", step: "Review & Launch", progress: 95, status: "review" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white font-medium">{item.client}</div>
                    <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                  </div>
                  <div className="text-gray-400 text-sm mb-2">Current: {item.step}</div>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.progress} className="flex-1 h-2" />
                    <span className="text-xs text-gray-400">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Onboarding Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Package Selection",
                  description: "Choose service package",
                  icon: <FileText className="w-5 h-5" />,
                  completed: true,
                },
                {
                  step: 2,
                  title: "Brand Assets",
                  description: "Upload logos and materials",
                  icon: <Star className="w-5 h-5" />,
                  completed: true,
                },
                {
                  step: 3,
                  title: "Business Questionnaire",
                  description: "Complete business profile",
                  icon: <Users className="w-5 h-5" />,
                  completed: false,
                },
                {
                  step: 4,
                  title: "Review & Launch",
                  description: "Final review and go-live",
                  icon: <CheckCircle className="w-5 h-5" />,
                  completed: false,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${item.completed ? "bg-green-900/20 border-green-500/30" : onboardingStep === item.step ? "bg-purple-900/20 border-purple-500/30" : "bg-gray-800/50 border-gray-600/30"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${item.completed ? "bg-green-600" : onboardingStep === item.step ? "bg-purple-600" : "bg-gray-600"}`}
                    >
                      {item.completed ? <CheckCircle className="w-4 h-4 text-white" /> : item.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        Step {item.step}: {item.title}
                      </div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OnboardingManagement
