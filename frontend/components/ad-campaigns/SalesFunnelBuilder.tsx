'use client';

import React, { useState, useEffect } from 'react';
import { 
  SalesFunnel, 
  FunnelStep, 
  FunnelFlow,
  CreateSalesFunnelRequest,
  UpdateSalesFunnelRequest,
  FunnelStatus
} from '../../types/ad-campaigns';
import { adCampaignApi } from '../../lib/adCampaignApi';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Eye, 
  Edit, 
  Save,
  X,
  ArrowRight,
  Users,
  DollarSign,
  TrendingUp,
  Target
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SalesFunnelBuilderProps {
  funnelId?: string;
  onSave?: (funnel: SalesFunnel) => void;
  className?: string;
}

const STEP_TYPES = [
  { value: 'landing_page', label: 'Landing Page', icon: '🌐' },
  { value: 'form', label: 'Lead Form', icon: '📝' },
  { value: 'checkout', label: 'Checkout', icon: '🛒' },
  { value: 'thank_you', label: 'Thank You', icon: '✅' },
  { value: 'custom', label: 'Custom', icon: '⚙️' }
];

export default function SalesFunnelBuilder({ funnelId, onSave, className }: SalesFunnelBuilderProps) {
  const [funnel, setFunnel] = useState<SalesFunnel | null>(null);
  const [steps, setSteps] = useState<FunnelStep[]>([]);
  const [editingStep, setEditingStep] = useState<FunnelStep | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (funnelId) {
      loadFunnel();
    } else {
      // Initialize new funnel
      setFunnel({
        id: '',
        name: 'New Sales Funnel',
        description: '',
        status: FunnelStatus.DRAFT,
        clientId: '',
        createdBy: '',
        tenantId: '',
        steps: {},
        conversionRates: {},
        totalConversions: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setSteps([
        {
          id: '1',
          name: 'Landing Page',
          type: 'landing_page',
          url: '',
          conversionRate: 0,
          visitors: 0,
          conversions: 0,
          revenue: 0,
          position: 1,
          settings: {}
        }
      ]);
    }
  }, [funnelId]);

  const loadFunnel = async () => {
    if (!funnelId) return;
    
    try {
      setLoading(true);
      const funnelData = await adCampaignApi.getSalesFunnel(funnelId);
      setFunnel(funnelData);
      
      // Parse steps from funnel data
      if (funnelData.steps) {
        const parsedSteps = Object.entries(funnelData.steps).map(([id, step]: [string, any]) => ({
          id,
          name: step.name,
          type: step.type,
          url: step.url || '',
          conversionRate: step.conversionRate || 0,
          visitors: step.visitors || 0,
          conversions: step.conversions || 0,
          revenue: step.revenue || 0,
          position: step.position || 1,
          settings: step.settings || {}
        }));
        setSteps(parsedSteps.sort((a, b) => a.position - b.position));
      }
    } catch (error) {
      console.error('Error loading funnel:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStep = () => {
    const newStep: FunnelStep = {
      id: Date.now().toString(),
      name: `Step ${steps.length + 1}`,
      type: 'landing_page',
      url: '',
      conversionRate: 0,
      visitors: 0,
      conversions: 0,
      revenue: 0,
      position: steps.length + 1,
      settings: {}
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (stepId: string, updates: Partial<FunnelStep>) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const deleteStep = (stepId: string) => {
    if (steps.length <= 1) return; // Don't delete the last step
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (currentIndex === -1) return;

    const newSteps = [...steps];
    if (direction === 'up' && currentIndex > 0) {
      [newSteps[currentIndex], newSteps[currentIndex - 1]] = [newSteps[currentIndex - 1], newSteps[currentIndex]];
    } else if (direction === 'down' && currentIndex < steps.length - 1) {
      [newSteps[currentIndex], newSteps[currentIndex + 1]] = [newSteps[currentIndex + 1], newSteps[currentIndex]];
    }

    // Update positions
    newSteps.forEach((step, index) => {
      step.position = index + 1;
    });

    setSteps(newSteps);
  };

  const saveFunnel = async () => {
    if (!funnel) return;

    try {
      setLoading(true);
      
      // Convert steps to funnel format
      const stepsData = steps.reduce((acc, step) => {
        acc[step.id] = {
          name: step.name,
          type: step.type,
          url: step.url,
          conversionRate: step.conversionRate,
          visitors: step.visitors,
          conversions: step.conversions,
          revenue: step.revenue,
          position: step.position,
          settings: step.settings
        };
        return acc;
      }, {} as Record<string, any>);

      const funnelData = {
        ...funnel,
        steps: stepsData
      };

      let savedFunnel: SalesFunnel;
      if (funnelId) {
        savedFunnel = await adCampaignApi.updateSalesFunnel(funnelId, funnelData);
      } else {
        savedFunnel = await adCampaignApi.createSalesFunnel(funnelData);
      }

      setFunnel(savedFunnel);
      setIsEditing(false);
      onSave?.(savedFunnel);
    } catch (error) {
      console.error('Error saving funnel:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFunnelMetrics = () => {
    if (steps.length === 0) return { totalVisitors: 0, totalConversions: 0, totalRevenue: 0, avgConversionRate: 0 };

    const totalVisitors = steps[0]?.visitors || 0;
    const totalConversions = steps[steps.length - 1]?.conversions || 0;
    const totalRevenue = steps.reduce((sum, step) => sum + step.revenue, 0);
    const avgConversionRate = steps.length > 0 ? 
      steps.reduce((sum, step) => sum + step.conversionRate, 0) / steps.length : 0;

    return { totalVisitors, totalConversions, totalRevenue, avgConversionRate };
  };

  const metrics = calculateFunnelMetrics();

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Funnel Builder</h1>
          <p className="text-muted-foreground">
            Design and optimize your conversion funnel
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={saveFunnel} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Funnel'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Funnel
            </Button>
          )}
        </div>
      </div>

      {/* Funnel Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                {isEditing ? (
                  <Input
                    value={funnel?.name || ''}
                    onChange={(e) => setFunnel(funnel ? { ...funnel, name: e.target.value } : null)}
                    className="text-xl font-bold border-none p-0 h-auto"
                  />
                ) : (
                  funnel?.name
                )}
              </CardTitle>
              <CardDescription>
                {isEditing ? (
                  <Textarea
                    value={funnel?.description || ''}
                    onChange={(e) => setFunnel(funnel ? { ...funnel, description: e.target.value } : null)}
                    placeholder="Describe your funnel..."
                    className="border-none p-0 resize-none"
                    rows={2}
                  />
                ) : (
                  funnel?.description || 'No description provided'
                )}
              </CardDescription>
            </div>
            <Badge variant={funnel?.status === FunnelStatus.ACTIVE ? 'default' : 'secondary'}>
              {funnel?.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Funnel Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Visitors</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.totalVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Conversions</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.totalConversions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Conversion Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.avgConversionRate.toFixed(2)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold mt-2">${metrics.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Steps */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Funnel Steps</CardTitle>
              <CardDescription>Design your conversion flow</CardDescription>
            </div>
            {isEditing && (
              <Button onClick={addStep} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {step.position}
                          </div>
                          {index < steps.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={step.name}
                                onChange={(e) => updateStep(step.id, { name: e.target.value })}
                                placeholder="Step name"
                                className="font-medium"
                              />
                              <div className="flex gap-2">
                                <Select
                                  value={step.type}
                                  onValueChange={(value) => updateStep(step.id, { type: value as any })}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {STEP_TYPES.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        <span className="mr-2">{type.icon}</span>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input
                                  value={step.url}
                                  onChange={(e) => updateStep(step.id, { url: e.target.value })}
                                  placeholder="URL (optional)"
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-medium">{step.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {STEP_TYPES.find(t => t.value === step.type)?.label}
                                {step.url && ` • ${step.url}`}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingStep(step)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteStep(step.id)}
                              disabled={steps.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Step Metrics */}
                    <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Visitors:</span>
                        <span className="ml-1 font-medium">{step.visitors.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Conversions:</span>
                        <span className="ml-1 font-medium">{step.conversions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate:</span>
                        <span className="ml-1 font-medium">{step.conversionRate.toFixed(2)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="ml-1 font-medium">${step.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Settings Dialog */}
      <Dialog open={!!editingStep} onOpenChange={() => setEditingStep(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Step Settings</DialogTitle>
          </DialogHeader>
          {editingStep && (
            <div className="space-y-4">
              <div>
                <Label>Conversion Rate (%)</Label>
                <Input
                  type="number"
                  value={editingStep.conversionRate}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    conversionRate: parseFloat(e.target.value) || 0
                  })}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <Label>Visitors</Label>
                <Input
                  type="number"
                  value={editingStep.visitors}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    visitors: parseInt(e.target.value) || 0
                  })}
                  min="0"
                />
              </div>
              <div>
                <Label>Conversions</Label>
                <Input
                  type="number"
                  value={editingStep.conversions}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    conversions: parseInt(e.target.value) || 0
                  })}
                  min="0"
                />
              </div>
              <div>
                <Label>Revenue</Label>
                <Input
                  type="number"
                  value={editingStep.revenue}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    revenue: parseFloat(e.target.value) || 0
                  })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingStep(null)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  if (editingStep) {
                    updateStep(editingStep.id, editingStep);
                    setEditingStep(null);
                  }
                }}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
