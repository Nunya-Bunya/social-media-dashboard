import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your comprehensive marketing platform dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$24,500</p>
              <p className="text-sm text-success">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
              <p className="text-2xl font-bold text-foreground">18</p>
              <p className="text-sm text-success">+3 new this week</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-sm text-success">+8.2% from last week</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">3.2%</p>
              <p className="text-sm text-success">+0.5% improvement</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          🎉 Welcome to Your Marketing Platform!
        </h2>
        <p className="text-muted-foreground mb-4">
          You now have access to 18 powerful marketing modules designed to help you manage every aspect of your digital marketing strategy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>Social Media Management</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>Paid Advertising</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>SEO Optimization</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>Email Marketing</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>Lead Management</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>AI-Powered Tools</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors">
              Create New Campaign
            </button>
            <button className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors">
              Schedule Social Post
            </button>
            <button className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Campaign "Summer Sale" launched</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <span>New lead added to CRM</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Social post scheduled for tomorrow</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">System Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>All Systems</span>
              <span className="text-success">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span>API Connections</span>
              <span className="text-success">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Sync</span>
              <span className="text-success">Up to date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
