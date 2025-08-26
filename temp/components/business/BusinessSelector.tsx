"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Business {
  id: string;
  name: string;
  industry: string;
  package: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'pending' | 'paused';
  revenue: number;
  clients: number;
  growth: number;
  lastActivity: string;
}

interface BusinessMetrics {
  totalRevenue: number;
  activeClients: number;
  monthlyGrowth: number;
  clientRetention: number;
  revenueBreakdown: {
    personalInjury: number;
    businessLaw: number;
    familyLaw: number;
    employmentLaw: number;
  };
  clientMetrics: {
    newClientsThisMonth: number;
    averageCaseValue: number;
    clientSatisfaction: number;
    referralRate: number;
  };
  performanceTrends: {
    revenueGrowth: string;
    clientGrowth: string;
    caseSuccessRate: string;
    averageResponseTime: string;
  };
}

// Mock data for demonstration (will be replaced by real API calls)
const mockBusinesses: Business[] = [
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

export function BusinessSelector() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(mockBusinesses[0]);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real business metrics from API
  useEffect(() => {
    const fetchBusinessMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from your real API endpoint
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
        
      } catch (err) {
        console.error('Error fetching business metrics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
        
        // Fallback to mock data if API fails
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
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessMetrics();
  }, []);

  const getPackageColor = (pkg: string) => {
    switch (pkg) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading business data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <AlertCircle className="h-8 w-8 text-red-600" />
        <span className="ml-2 text-red-600">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Business Management</h2>
          <p className="text-muted-foreground">
            Manage multiple businesses and track performance metrics
          </p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </div>

      {/* Business Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Business</CardTitle>
          <CardDescription>
            Choose which business to view and manage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedBusiness?.id} 
            onValueChange={(value) => {
              const business = mockBusinesses.find(b => b.id === value);
              setSelectedBusiness(business || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a business" />
            </SelectTrigger>
            <SelectContent>
              {mockBusinesses.map((business) => (
                <SelectItem key={business.id} value={business.id}>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{business.name}</span>
                    <Badge variant="outline" className={getPackageColor(business.package)}>
                      {business.package}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Business Overview */}
      {selectedBusiness && businessMetrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${businessMetrics.totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>{businessMetrics.performanceTrends.revenueGrowth}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businessMetrics.activeClients}</div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>{businessMetrics.performanceTrends.clientGrowth}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businessMetrics.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">
                vs last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businessMetrics.clientRetention}%</div>
              <p className="text-xs text-muted-foreground">
                retention rate
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue Breakdown */}
      {businessMetrics && (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>
              Revenue distribution across practice areas
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {businessMetrics && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key performance indicators and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
