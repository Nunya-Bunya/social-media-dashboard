import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Clock, Plus, BarChart3 } from "lucide-react"

interface ReportsSectionProps {
  selectedCompany: any
}

export default function ReportsSection({ selectedCompany }: ReportsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Reports & Analytics</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Monthly Performance", type: "automated", frequency: "monthly" },
                { name: "Campaign Analysis", type: "custom", frequency: "on-demand" },
                { name: "ROI Summary", type: "automated", frequency: "weekly" },
                { name: "Client Dashboard", type: "automated", frequency: "daily" },
              ].map((template, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">{template.name}</div>
                      <div className="text-gray-400 text-sm">{template.frequency}</div>
                    </div>
                    <Badge variant={template.type === "automated" ? "default" : "secondary"}>{template.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "January Performance Report", date: "2024-01-31", status: "completed", size: "2.4 MB" },
                { name: "Q4 Campaign Analysis", date: "2024-01-15", status: "completed", size: "5.1 MB" },
                { name: "Weekly ROI Summary", date: "2024-01-28", status: "processing", size: "-" },
                { name: "Client Dashboard Export", date: "2024-01-30", status: "completed", size: "1.8 MB" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">{report.name}</div>
                      <div className="text-gray-400 text-sm">Generated: {report.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-400 text-sm">{report.size}</div>
                    <Badge variant={report.status === "completed" ? "default" : "secondary"}>{report.status}</Badge>
                    {report.status === "completed" && (
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Revenue Growth</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">+23.4%</div>
              <div className="text-gray-400 text-sm">Compared to last quarter</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Avg. Response Time</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">2.3 hrs</div>
              <div className="text-gray-400 text-sm">15% improvement</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-medium">Campaign ROI</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">4.2x</div>
              <div className="text-gray-400 text-sm">Above industry average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
