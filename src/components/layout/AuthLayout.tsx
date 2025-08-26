import { Outlet } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="flex items-center justify-center mb-8">
              <BarChart3 className="w-16 h-16 mr-4" />
              <h1 className="text-4xl font-bold">Marketing Platform</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Complete Digital Marketing Solution
            </h2>
            <p className="text-lg opacity-90 max-w-md">
              Manage all aspects of your digital marketing, from social media to paid ads, 
              SEO to email campaigns, all in one powerful platform.
            </p>
            
            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 Campaign Management</h3>
                <p className="text-sm opacity-80">Create and manage campaigns across all platforms</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📊 Analytics & Reporting</h3>
                <p className="text-sm opacity-80">Track performance with detailed analytics</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🤖 AI-Powered Tools</h3>
                <p className="text-sm opacity-80">Generate content and optimize campaigns</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">👥 Lead Management</h3>
                <p className="text-sm opacity-80">Find and nurture leads effectively</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="w-12 h-12 text-primary mr-3" />
                <h1 className="text-3xl font-bold">Marketing Platform</h1>
              </div>
              <p className="text-muted-foreground">
                Complete Digital Marketing Solution
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg shadow-lg p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
