"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiService } from "@/lib/api"
import { CheckCircle, XCircle, RefreshCw, Database, Bot, Search } from "lucide-react"

export default function BackendTest() {
  const [testResults, setTestResults] = useState<{
    [key: string]: { success: boolean; data?: any; error?: string }
  }>({})
  const [isTesting, setIsTesting] = useState(false)

  const runTests = async () => {
    setIsTesting(true)
    const results: { [key: string]: { success: boolean; data?: any; error?: string } } = {}

    // Test 1: Basic connection
    try {
      const response = await apiService.testConnection()
      results.test = response
    } catch (error) {
      results.test = { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }

    // Test 2: AI Assistants
    try {
      const response = await apiService.getAIAssistants()
      results.aiAssistants = response
    } catch (error) {
      results.aiAssistants = { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }

    // Test 3: Scraper Sources
    try {
      const response = await apiService.getScraperSources()
      results.scraperSources = response
    } catch (error) {
      results.scraperSources = { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }

    // Test 4: Scrape Jobs
    try {
      const response = await apiService.getScrapeJobs()
      results.scrapeJobs = response
    } catch (error) {
      results.scrapeJobs = { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }

    setTestResults(results)
    setIsTesting(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )
  }

  const getStatusBadge = (success: boolean) => {
    return success ? (
      <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-400">Failed</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Backend Connection Test</h2>
          <p className="text-gray-400 mt-2">
            Testing connectivity to your backend API
          </p>
        </div>
        <Button
          onClick={runTests}
          disabled={isTesting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isTesting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Tests
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Connection */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-400" />
              Basic Connection
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test basic API connectivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Status:</span>
              {testResults.test && getStatusBadge(testResults.test.success)}
            </div>
            {testResults.test && (
              <div className="text-sm">
                {testResults.test.success ? (
                  <div className="text-green-400">
                    <p>✅ Backend is responding</p>
                    <p className="text-gray-400 mt-1">
                      {testResults.test.data?.message || 'Connection successful'}
                    </p>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <p>❌ Connection failed</p>
                    <p className="text-gray-400 mt-1">{testResults.test.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Assistants */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-400" />
              AI Assistants
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test AI Assistant endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Status:</span>
              {testResults.aiAssistants && getStatusBadge(testResults.aiAssistants.success)}
            </div>
            {testResults.aiAssistants && (
              <div className="text-sm">
                {testResults.aiAssistants.success ? (
                  <div className="text-green-400">
                    <p>✅ AI Assistants endpoint working</p>
                    <p className="text-gray-400 mt-1">
                      Found {testResults.aiAssistants.data?.data?.length || 0} assistants
                    </p>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <p>❌ AI Assistants endpoint failed</p>
                    <p className="text-gray-400 mt-1">{testResults.aiAssistants.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scraper Sources */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Search className="w-5 h-5 mr-2 text-green-400" />
              Scraper Sources
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test scraper configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Status:</span>
              {testResults.scraperSources && getStatusBadge(testResults.scraperSources.success)}
            </div>
            {testResults.scraperSources && (
              <div className="text-sm">
                {testResults.scraperSources.success ? (
                  <div className="text-green-400">
                    <p>✅ Scraper sources available</p>
                    <p className="text-gray-400 mt-1">
                      {testResults.scraperSources.data?.sources?.length || 0} sources configured
                    </p>
                    <div className="mt-2 space-y-1">
                      {testResults.scraperSources.data?.sources?.map((source: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{source.name}</span>
                          <Badge
                            variant={source.enabled ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {source.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <p>❌ Scraper sources failed</p>
                    <p className="text-gray-400 mt-1">{testResults.scraperSources.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scrape Jobs */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2 text-orange-400" />
              Scrape Jobs
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test scrape job management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Status:</span>
              {testResults.scrapeJobs && getStatusBadge(testResults.scrapeJobs.success)}
            </div>
            {testResults.scrapeJobs && (
              <div className="text-sm">
                {testResults.scrapeJobs.success ? (
                  <div className="text-green-400">
                    <p>✅ Scrape jobs endpoint working</p>
                    <p className="text-gray-400 mt-1">
                      {testResults.scrapeJobs.data?.data?.length || 0} jobs found
                    </p>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <p>❌ Scrape jobs endpoint failed</p>
                    <p className="text-gray-400 mt-1">{testResults.scrapeJobs.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="bg-black/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Connection Summary</CardTitle>
          <CardDescription className="text-gray-400">
            Overall backend connectivity status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(testResults).map(([key, result]) => (
              <div key={key} className="flex items-center space-x-2">
                {getStatusIcon(result.success)}
                <span className="text-sm text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-800/50 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              <strong>Status:</strong> {
                Object.values(testResults).every(result => result.success) 
                  ? '✅ All endpoints connected' 
                  : '⚠️ Some endpoints failed'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
