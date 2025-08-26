"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSelector = BusinessSelector;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const mockBusinesses = [
    {
        id: '1',
        name: 'Nunya Bunya Law',
        industry: 'Legal Services',
        package: 'enterprise',
        status: 'active',
        revenue: 125000,
        clients: 23,
        growth: 15.3,
        lastActivity: '2024-12-23T10:00:00'
    },
    {
        id: '2',
        name: 'Smith & Associates',
        industry: 'Legal Services',
        package: 'professional',
        status: 'active',
        revenue: 85000,
        clients: 15,
        growth: 8.7,
        lastActivity: '2024-12-22T15:30:00'
    },
    {
        id: '3',
        name: 'Johnson Legal Group',
        industry: 'Legal Services',
        package: 'starter',
        status: 'pending',
        revenue: 25000,
        clients: 5,
        growth: 0,
        lastActivity: '2024-12-21T09:15:00'
    }
];
function BusinessSelector() {
    const [selectedBusiness, setSelectedBusiness] = (0, react_1.useState)(mockBusinesses[0]);
    const [businessMetrics, setBusinessMetrics] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchBusinessMetrics = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('http://localhost:3001/api/business/metrics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch business metrics');
                }
                const data = await response.json();
                setBusinessMetrics(data);
            }
            catch (err) {
                console.error('Error fetching business metrics:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
                setBusinessMetrics({
                    totalRevenue: 125000,
                    activeClients: 23,
                    monthlyGrowth: 12.5,
                    clientRetention: 94.2,
                    revenueBreakdown: {
                        personalInjury: 45000,
                        businessLaw: 38000,
                        familyLaw: 28000,
                        employmentLaw: 14000
                    },
                    clientMetrics: {
                        newClientsThisMonth: 4,
                        averageCaseValue: 5435,
                        clientSatisfaction: 4.8,
                        referralRate: 67
                    },
                    performanceTrends: {
                        revenueGrowth: '+15.3%',
                        clientGrowth: '+21.1%',
                        caseSuccessRate: '89.2%',
                        averageResponseTime: '2.4 hours'
                    }
                });
            }
            finally {
                setLoading(false);
            }
        };
        fetchBusinessMetrics();
    }, []);
    const getPackageColor = (pkg) => {
        switch (pkg) {
            case 'enterprise': return 'bg-purple-100 text-purple-800';
            case 'professional': return 'bg-blue-100 text-blue-800';
            case 'starter': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paused': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center py-12">
        <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-blue-600"/>
        <span className="ml-2 text-gray-600">Loading business data...</span>
      </div>);
    }
    if (error) {
        return (<div className="flex items-center justify-center py-12">
        <lucide_react_1.AlertCircle className="h-8 w-8 text-red-600"/>
        <span className="ml-2 text-red-600">Error: {error}</span>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Business Management</h2>
          <p className="text-muted-foreground">
            Manage multiple businesses and track performance metrics
          </p>
        </div>
        <button_1.Button>
          <lucide_react_1.Building2 className="mr-2 h-4 w-4"/>
          Add Business
        </button_1.Button>
      </div>

      
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Select Business</card_1.CardTitle>
          <card_1.CardDescription>
            Choose which business to view and manage
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <select_1.Select value={selectedBusiness?.id} onValueChange={(value) => {
            const business = mockBusinesses.find(b => b.id === value);
            setSelectedBusiness(business || null);
        }}>
            <select_1.SelectTrigger>
              <select_1.SelectValue placeholder="Select a business"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {mockBusinesses.map((business) => (<select_1.SelectItem key={business.id} value={business.id}>
                  <div className="flex items-center space-x-2">
                    <lucide_react_1.Building2 className="h-4 w-4"/>
                    <span>{business.name}</span>
                    <badge_1.Badge variant="outline" className={getPackageColor(business.package)}>
                      {business.package}
                    </badge_1.Badge>
                  </div>
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>
        </card_1.CardContent>
      </card_1.Card>

      
      {selectedBusiness && businessMetrics && (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Total Revenue</card_1.CardTitle>
              <lucide_react_1.DollarSign className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">
                ${businessMetrics.totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <lucide_react_1.TrendingUp className="h-3 w-3"/>
                <span>{businessMetrics.performanceTrends.revenueGrowth}</span>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Active Clients</card_1.CardTitle>
              <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{businessMetrics.activeClients}</div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <lucide_react_1.TrendingUp className="h-3 w-3"/>
                <span>{businessMetrics.performanceTrends.clientGrowth}</span>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Monthly Growth</card_1.CardTitle>
              <lucide_react_1.TrendingUp className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{businessMetrics.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">
                vs last month
              </p>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Client Retention</card_1.CardTitle>
              <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{businessMetrics.clientRetention}%</div>
              <p className="text-xs text-muted-foreground">
                retention rate
              </p>
            </card_1.CardContent>
          </card_1.Card>
        </div>)}

      
      {businessMetrics && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Revenue Breakdown</card_1.CardTitle>
            <card_1.CardDescription>
              Revenue distribution across practice areas
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${businessMetrics.revenueBreakdown.personalInjury.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Personal Injury</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${businessMetrics.revenueBreakdown.businessLaw.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Business Law</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${businessMetrics.revenueBreakdown.familyLaw.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Family Law</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ${businessMetrics.revenueBreakdown.employmentLaw.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Employment Law</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}

      
      {businessMetrics && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Performance Metrics</card_1.CardTitle>
            <card_1.CardDescription>
              Key performance indicators and trends
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  {businessMetrics.clientMetrics.newClientsThisMonth}
                </div>
                <div className="text-sm text-muted-foreground">New Clients This Month</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  ${businessMetrics.clientMetrics.averageCaseValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Average Case Value</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {businessMetrics.clientMetrics.clientSatisfaction}/5.0
                </div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {businessMetrics.clientMetrics.referralRate}%
                </div>
                <div className="text-sm text-muted-foreground">Referral Rate</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
//# sourceMappingURL=BusinessSelector.js.map