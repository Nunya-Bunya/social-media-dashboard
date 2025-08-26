'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SalesFunnelBuilder;
const react_1 = require("react");
const ad_campaigns_1 = require("../../types/ad-campaigns");
const adCampaignApi_1 = require("../../lib/adCampaignApi");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const dialog_1 = require("@/components/ui/dialog");
const label_1 = require("@/components/ui/label");
const STEP_TYPES = [
    { value: 'landing_page', label: 'Landing Page', icon: '🌐' },
    { value: 'form', label: 'Lead Form', icon: '📝' },
    { value: 'checkout', label: 'Checkout', icon: '🛒' },
    { value: 'thank_you', label: 'Thank You', icon: '✅' },
    { value: 'custom', label: 'Custom', icon: '⚙️' }
];
function SalesFunnelBuilder({ funnelId, onSave, className }) {
    const [funnel, setFunnel] = (0, react_1.useState)(null);
    const [steps, setSteps] = (0, react_1.useState)([]);
    const [editingStep, setEditingStep] = (0, react_1.useState)(null);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (funnelId) {
            loadFunnel();
        }
        else {
            setFunnel({
                id: '',
                name: 'New Sales Funnel',
                description: '',
                status: ad_campaigns_1.FunnelStatus.DRAFT,
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
        if (!funnelId)
            return;
        try {
            setLoading(true);
            const funnelData = await adCampaignApi_1.adCampaignApi.getSalesFunnel(funnelId);
            setFunnel(funnelData);
            if (funnelData.steps) {
                const parsedSteps = Object.entries(funnelData.steps).map(([id, step]) => ({
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
        }
        catch (error) {
            console.error('Error loading funnel:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const addStep = () => {
        const newStep = {
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
    const updateStep = (stepId, updates) => {
        setSteps(steps.map(step => step.id === stepId ? { ...step, ...updates } : step));
    };
    const deleteStep = (stepId) => {
        if (steps.length <= 1)
            return;
        setSteps(steps.filter(step => step.id !== stepId));
    };
    const moveStep = (stepId, direction) => {
        const currentIndex = steps.findIndex(step => step.id === stepId);
        if (currentIndex === -1)
            return;
        const newSteps = [...steps];
        if (direction === 'up' && currentIndex > 0) {
            [newSteps[currentIndex], newSteps[currentIndex - 1]] = [newSteps[currentIndex - 1], newSteps[currentIndex]];
        }
        else if (direction === 'down' && currentIndex < steps.length - 1) {
            [newSteps[currentIndex], newSteps[currentIndex + 1]] = [newSteps[currentIndex + 1], newSteps[currentIndex]];
        }
        newSteps.forEach((step, index) => {
            step.position = index + 1;
        });
        setSteps(newSteps);
    };
    const saveFunnel = async () => {
        if (!funnel)
            return;
        try {
            setLoading(true);
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
            }, {});
            const funnelData = {
                ...funnel,
                steps: stepsData
            };
            let savedFunnel;
            if (funnelId) {
                savedFunnel = await adCampaignApi_1.adCampaignApi.updateSalesFunnel(funnelId, funnelData);
            }
            else {
                savedFunnel = await adCampaignApi_1.adCampaignApi.createSalesFunnel(funnelData);
            }
            setFunnel(savedFunnel);
            setIsEditing(false);
            onSave?.(savedFunnel);
        }
        catch (error) {
            console.error('Error saving funnel:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const calculateFunnelMetrics = () => {
        if (steps.length === 0)
            return { totalVisitors: 0, totalConversions: 0, totalRevenue: 0, avgConversionRate: 0 };
        const totalVisitors = steps[0]?.visitors || 0;
        const totalConversions = steps[steps.length - 1]?.conversions || 0;
        const totalRevenue = steps.reduce((sum, step) => sum + step.revenue, 0);
        const avgConversionRate = steps.length > 0 ?
            steps.reduce((sum, step) => sum + step.conversionRate, 0) / steps.length : 0;
        return { totalVisitors, totalConversions, totalRevenue, avgConversionRate };
    };
    const metrics = calculateFunnelMetrics();
    if (loading) {
        return (<div className={`space-y-6 ${className}`}>
        <card_1.Card>
          <card_1.CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (<div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>))}
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>);
    }
    return (<div className={`space-y-6 ${className}`}>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Funnel Builder</h1>
          <p className="text-muted-foreground">
            Design and optimize your conversion funnel
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (<>
              <button_1.Button variant="outline" onClick={() => setIsEditing(false)}>
                <lucide_react_1.X className="h-4 w-4 mr-2"/>
                Cancel
              </button_1.Button>
              <button_1.Button onClick={saveFunnel} disabled={loading}>
                <lucide_react_1.Save className="h-4 w-4 mr-2"/>
                {loading ? 'Saving...' : 'Save Funnel'}
              </button_1.Button>
            </>) : (<button_1.Button onClick={() => setIsEditing(true)}>
              <lucide_react_1.Edit className="h-4 w-4 mr-2"/>
              Edit Funnel
            </button_1.Button>)}
        </div>
      </div>

      
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <card_1.CardTitle className="text-xl">
                {isEditing ? (<input_1.Input value={funnel?.name || ''} onChange={(e) => setFunnel(funnel ? { ...funnel, name: e.target.value } : null)} className="text-xl font-bold border-none p-0 h-auto"/>) : (funnel?.name)}
              </card_1.CardTitle>
              <card_1.CardDescription>
                {isEditing ? (<textarea_1.Textarea value={funnel?.description || ''} onChange={(e) => setFunnel(funnel ? { ...funnel, description: e.target.value } : null)} placeholder="Describe your funnel..." className="border-none p-0 resize-none" rows={2}/>) : (funnel?.description || 'No description provided')}
              </card_1.CardDescription>
            </div>
            <badge_1.Badge variant={funnel?.status === ad_campaigns_1.FunnelStatus.ACTIVE ? 'default' : 'secondary'}>
              {funnel?.status}
            </badge_1.Badge>
          </div>
        </card_1.CardHeader>
      </card_1.Card>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Total Visitors</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.totalVisitors.toLocaleString()}</div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Conversions</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.totalConversions.toLocaleString()}</div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.TrendingUp className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Conversion Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metrics.avgConversionRate.toFixed(2)}%</div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.DollarSign className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold mt-2">${metrics.totalRevenue.toLocaleString()}</div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <card_1.CardTitle>Funnel Steps</card_1.CardTitle>
              <card_1.CardDescription>Design your conversion flow</card_1.CardDescription>
            </div>
            {isEditing && (<button_1.Button onClick={addStep} size="sm">
                <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                Add Step
              </button_1.Button>)}
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (<div key={step.id} className="relative">
                <card_1.Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  <card_1.CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {step.position}
                          </div>
                          {index < steps.length - 1 && (<div className="w-0.5 h-8 bg-gray-300 mt-2"></div>)}
                        </div>
                        
                        <div className="flex-1">
                          {isEditing ? (<div className="space-y-2">
                              <input_1.Input value={step.name} onChange={(e) => updateStep(step.id, { name: e.target.value })} placeholder="Step name" className="font-medium"/>
                              <div className="flex gap-2">
                                <select_1.Select value={step.type} onValueChange={(value) => updateStep(step.id, { type: value })}>
                                  <select_1.SelectTrigger className="w-40">
                                    <select_1.SelectValue />
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    {STEP_TYPES.map((type) => (<select_1.SelectItem key={type.value} value={type.value}>
                                        <span className="mr-2">{type.icon}</span>
                                        {type.label}
                                      </select_1.SelectItem>))}
                                  </select_1.SelectContent>
                                </select_1.Select>
                                <input_1.Input value={step.url} onChange={(e) => updateStep(step.id, { url: e.target.value })} placeholder="URL (optional)" className="flex-1"/>
                              </div>
                            </div>) : (<div>
                              <h3 className="font-medium">{step.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {STEP_TYPES.find(t => t.value === step.type)?.label}
                                {step.url && ` • ${step.url}`}
                              </p>
                            </div>)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing && (<>
                            <button_1.Button size="sm" variant="outline" onClick={() => setEditingStep(step)}>
                              <lucide_react_1.Settings className="h-4 w-4"/>
                            </button_1.Button>
                            <button_1.Button size="sm" variant="outline" onClick={() => deleteStep(step.id)} disabled={steps.length <= 1}>
                              <lucide_react_1.Trash2 className="h-4 w-4"/>
                            </button_1.Button>
                          </>)}
                        <button_1.Button size="sm" variant="outline">
                          <lucide_react_1.Eye className="h-4 w-4"/>
                        </button_1.Button>
                      </div>
                    </div>

                    
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
                  </card_1.CardContent>
                </card_1.Card>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      
      <dialog_1.Dialog open={!!editingStep} onOpenChange={() => setEditingStep(null)}>
        <dialog_1.DialogContent className="max-w-md">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Step Settings</dialog_1.DialogTitle>
          </dialog_1.DialogHeader>
          {editingStep && (<div className="space-y-4">
              <div>
                <label_1.Label>Conversion Rate (%)</label_1.Label>
                <input_1.Input type="number" value={editingStep.conversionRate} onChange={(e) => setEditingStep({
                ...editingStep,
                conversionRate: parseFloat(e.target.value) || 0
            })} min="0" max="100" step="0.01"/>
              </div>
              <div>
                <label_1.Label>Visitors</label_1.Label>
                <input_1.Input type="number" value={editingStep.visitors} onChange={(e) => setEditingStep({
                ...editingStep,
                visitors: parseInt(e.target.value) || 0
            })} min="0"/>
              </div>
              <div>
                <label_1.Label>Conversions</label_1.Label>
                <input_1.Input type="number" value={editingStep.conversions} onChange={(e) => setEditingStep({
                ...editingStep,
                conversions: parseInt(e.target.value) || 0
            })} min="0"/>
              </div>
              <div>
                <label_1.Label>Revenue</label_1.Label>
                <input_1.Input type="number" value={editingStep.revenue} onChange={(e) => setEditingStep({
                ...editingStep,
                revenue: parseFloat(e.target.value) || 0
            })} min="0" step="0.01"/>
              </div>
              <div className="flex justify-end gap-2">
                <button_1.Button variant="outline" onClick={() => setEditingStep(null)}>
                  Cancel
                </button_1.Button>
                <button_1.Button onClick={() => {
                if (editingStep) {
                    updateStep(editingStep.id, editingStep);
                    setEditingStep(null);
                }
            }}>
                  Save
                </button_1.Button>
              </div>
            </div>)}
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=SalesFunnelBuilder.js.map