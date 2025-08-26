const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const AIInsightsService = require('../services/ai-insights-service');
const AutomatedWorkflowService = require('../services/automated-workflow-service');
const SmartRecommendationsService = require('../services/smart-recommendations-service');
const PredictiveAnalyticsService = require('../services/predictive-analytics-service');
const AutomatedReportsService = require('../services/automated-reports-service');
const ContentOptimizationService = require('../services/content-optimization-service');
const SmartAlertsService = require('../services/smart-alerts-service');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// ========================================
// AI INSIGHTS ENGINE
// ========================================

// Get all AI insights with filtering and pagination
router.get('/insights', async (req, res) => {
    try {
        const { insight_type, category, status, priority, page = 1, limit = 20 } = req.query;
        const insights = await AIInsightsService.getInsights({
            business_id: req.user.business_id,
            insight_type,
            category,
            status,
            priority,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: insights,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: insights.length
            }
        });
    } catch (error) {
        console.error('Error fetching AI insights:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch AI insights',
            message: error.message
        });
    }
});

// Get a specific AI insight
router.get('/insights/:id', async (req, res) => {
    try {
        const insight = await AIInsightsService.getInsightById(parseInt(req.params.id));
        if (!insight) {
            return res.status(404).json({
                success: false,
                error: 'AI insight not found'
            });
        }
        
        res.json({
            success: true,
            data: insight
        });
    } catch (error) {
        console.error('Error fetching AI insight:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch AI insight',
            message: error.message
        });
    }
});

// Generate new AI insights
router.post('/insights/generate', async (req, res) => {
    try {
        const { insight_types, data_sources, analysis_period } = req.body;
        const insights = await AIInsightsService.generateInsights({
            business_id: req.user.business_id,
            insight_types,
            data_sources,
            analysis_period
        });
        
        res.json({
            success: true,
            data: insights,
            message: 'AI insights generated successfully'
        });
    } catch (error) {
        console.error('Error generating AI insights:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate AI insights',
            message: error.message
        });
    }
});

// Update insight status
router.put('/insights/:id/status', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const updatedInsight = await AIInsightsService.updateInsightStatus(
            parseInt(req.params.id),
            status,
            notes
        );
        
        res.json({
            success: true,
            data: updatedInsight,
            message: 'Insight status updated successfully'
        });
    } catch (error) {
        console.error('Error updating insight status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update insight status',
            message: error.message
        });
    }
});

// ========================================
// AUTOMATED WORKFLOWS
// ========================================

// Get all automated workflows
router.get('/workflows', async (req, res) => {
    try {
        const { workflow_type, trigger_type, is_active, page = 1, limit = 20 } = req.query;
        const workflows = await AutomatedWorkflowService.getWorkflows({
            business_id: req.user.business_id,
            workflow_type,
            trigger_type,
            is_active,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: workflows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: workflows.length
            }
        });
    } catch (error) {
        console.error('Error fetching workflows:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch workflows',
            message: error.message
        });
    }
});

// Get a specific workflow
router.get('/workflows/:id', async (req, res) => {
    try {
        const workflow = await AutomatedWorkflowService.getWorkflowById(parseInt(req.params.id));
        if (!workflow) {
            return res.status(404).json({
                success: false,
                error: 'Workflow not found'
            });
        }
        
        res.json({
            success: true,
            data: workflow
        });
    } catch (error) {
        console.error('Error fetching workflow:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch workflow',
            message: error.message
        });
    }
});

// Create a new workflow
router.post('/workflows', async (req, res) => {
    try {
        const workflowData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newWorkflow = await AutomatedWorkflowService.createWorkflow(workflowData);
        
        res.status(201).json({
            success: true,
            data: newWorkflow,
            message: 'Workflow created successfully'
        });
    } catch (error) {
        console.error('Error creating workflow:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create workflow',
            message: error.message
        });
    }
});

// Update a workflow
router.put('/workflows/:id', async (req, res) => {
    try {
        const updatedWorkflow = await AutomatedWorkflowService.updateWorkflow(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedWorkflow,
            message: 'Workflow updated successfully'
        });
    } catch (error) {
        console.error('Error updating workflow:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update workflow',
            message: error.message
        });
    }
});

// Execute workflow manually
router.post('/workflows/:id/execute', async (req, res) => {
    try {
        const { execution_data } = req.body;
        const execution = await AutomatedWorkflowService.executeWorkflow(
            parseInt(req.params.id),
            execution_data
        );
        
        res.json({
            success: true,
            data: execution,
            message: 'Workflow execution started'
        });
    } catch (error) {
        console.error('Error executing workflow:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to execute workflow',
            message: error.message
        });
    }
});

// Get workflow execution history
router.get('/workflows/:id/executions', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const executions = await AutomatedWorkflowService.getWorkflowExecutions(
            parseInt(req.params.id),
            { status, page: parseInt(page), limit: parseInt(limit) }
        );
        
        res.json({
            success: true,
            data: executions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: executions.length
            }
        });
    } catch (error) {
        console.error('Error fetching workflow executions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch workflow executions',
            message: error.message
        });
    }
});

// ========================================
// SMART RECOMMENDATIONS
// ========================================

// Get all smart recommendations
router.get('/recommendations', async (req, res) => {
    try {
        const { recommendation_type, category, status, priority, page = 1, limit = 20 } = req.query;
        const recommendations = await SmartRecommendationsService.getRecommendations({
            business_id: req.user.business_id,
            recommendation_type,
            category,
            status,
            priority,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: recommendations,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: recommendations.length
            }
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recommendations',
            message: error.message
        });
    }
});

// Get a specific recommendation
router.get('/recommendations/:id', async (req, res) => {
    try {
        const recommendation = await SmartRecommendationsService.getRecommendationById(parseInt(req.params.id));
        if (!recommendation) {
            return res.status(404).json({
                success: false,
                error: 'Recommendation not found'
            });
        }
        
        res.json({
            success: true,
            data: recommendation
        });
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recommendation',
            message: error.message
        });
    }
});

// Generate new recommendations
router.post('/recommendations/generate', async (req, res) => {
    try {
        const { recommendation_types, data_sources, analysis_period } = req.body;
        const recommendations = await SmartRecommendationsService.generateRecommendations({
            business_id: req.user.business_id,
            recommendation_types,
            data_sources,
            analysis_period
        });
        
        res.json({
            success: true,
            data: recommendations,
            message: 'Recommendations generated successfully'
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate recommendations',
            message: error.message
        });
    }
});

// Update recommendation status
router.put('/recommendations/:id/status', async (req, res) => {
    try {
        const { status, notes, implementation_notes } = req.body;
        const updatedRecommendation = await SmartRecommendationsService.updateRecommendationStatus(
            parseInt(req.params.id),
            status,
            notes,
            implementation_notes
        );
        
        res.json({
            success: true,
            data: updatedRecommendation,
            message: 'Recommendation status updated successfully'
        });
    } catch (error) {
        console.error('Error updating recommendation status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update recommendation status',
            message: error.message
        });
    }
});

// ========================================
// PREDICTIVE ANALYTICS
// ========================================

// Get all predictive analytics
router.get('/predictions', async (req, res) => {
    try {
        const { prediction_type, target_metric, prediction_period, page = 1, limit = 20 } = req.query;
        const predictions = await PredictiveAnalyticsService.getPredictions({
            business_id: req.user.business_id,
            prediction_type,
            target_metric,
            prediction_period,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: predictions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: predictions.length
            }
        });
    } catch (error) {
        console.error('Error fetching predictions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch predictions',
            message: error.message
        });
    }
});

// Generate new predictions
router.post('/predictions/generate', async (req, res) => {
    try {
        const { prediction_types, target_metrics, prediction_periods } = req.body;
        const predictions = await PredictiveAnalyticsService.generatePredictions({
            business_id: req.user.business_id,
            prediction_types,
            target_metrics,
            prediction_periods
        });
        
        res.json({
            success: true,
            data: predictions,
            message: 'Predictions generated successfully'
        });
    } catch (error) {
        console.error('Error generating predictions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate predictions',
            message: error.message
        });
    }
});

// Get prediction accuracy metrics
router.get('/predictions/accuracy', async (req, res) => {
    try {
        const { prediction_type, time_period } = req.query;
        const accuracy = await PredictiveAnalyticsService.getPredictionAccuracy({
            business_id: req.user.business_id,
            prediction_type,
            time_period
        });
        
        res.json({
            success: true,
            data: accuracy
        });
    } catch (error) {
        console.error('Error fetching prediction accuracy:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch prediction accuracy',
            message: error.message
        });
    }
});

// ========================================
// AUTOMATED REPORTS
// ========================================

// Get all automated reports
router.get('/reports', async (req, res) => {
    try {
        const { report_type, schedule_type, is_active, page = 1, limit = 20 } = req.query;
        const reports = await AutomatedReportsService.getReports({
            business_id: req.user.business_id,
            report_type,
            schedule_type,
            is_active,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: reports,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: reports.length
            }
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch reports',
            message: error.message
        });
    }
});

// Create a new automated report
router.post('/reports', async (req, res) => {
    try {
        const reportData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newReport = await AutomatedReportsService.createReport(reportData);
        
        res.status(201).json({
            success: true,
            data: newReport,
            message: 'Automated report created successfully'
        });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create report',
            message: error.message
        });
    }
});

// Generate report manually
router.post('/reports/:id/generate', async (req, res) => {
    try {
        const { recipients, custom_data } = req.body;
        const generation = await AutomatedReportsService.generateReport(
            parseInt(req.params.id),
            { recipients, custom_data }
        );
        
        res.json({
            success: true,
            data: generation,
            message: 'Report generation started'
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate report',
            message: error.message
        });
    }
});

// Get report generation history
router.get('/reports/:id/generations', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const generations = await AutomatedReportsService.getReportGenerations(
            parseInt(req.params.id),
            { status, page: parseInt(page), limit: parseInt(limit) }
        );
        
        res.json({
            success: true,
            data: generations,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: generations.length
            }
        });
    } catch (error) {
        console.error('Error fetching report generations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch report generations',
            message: error.message
        });
    }
});

// ========================================
// CONTENT OPTIMIZATION
// ========================================

// Get content optimization rules
router.get('/content-optimization/rules', async (req, res) => {
    try {
        const { rule_type, is_active, page = 1, limit = 20 } = req.query;
        const rules = await ContentOptimizationService.getOptimizationRules({
            business_id: req.user.business_id,
            rule_type,
            is_active,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: rules,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: rules.length
            }
        });
    } catch (error) {
        console.error('Error fetching optimization rules:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch optimization rules',
            message: error.message
        });
    }
});

// Create optimization rule
router.post('/content-optimization/rules', async (req, res) => {
    try {
        const ruleData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newRule = await ContentOptimizationService.createOptimizationRule(ruleData);
        
        res.status(201).json({
            success: true,
            data: newRule,
            message: 'Optimization rule created successfully'
        });
    } catch (error) {
        console.error('Error creating optimization rule:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create optimization rule',
            message: error.message
        });
    }
});

// Apply optimization to content
router.post('/content-optimization/apply', async (req, res) => {
    try {
        const { content_id, optimization_rules, content_type } = req.body;
        const optimizedContent = await ContentOptimizationService.applyOptimization({
            business_id: req.user.business_id,
            content_id,
            optimization_rules,
            content_type
        });
        
        res.json({
            success: true,
            data: optimizedContent,
            message: 'Content optimization applied successfully'
        });
    } catch (error) {
        console.error('Error applying content optimization:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to apply content optimization',
            message: error.message
        });
    }
});

// ========================================
// SMART ALERTS
// ========================================

// Get all smart alerts
router.get('/alerts', async (req, res) => {
    try {
        const { alert_type, severity, status, page = 1, limit = 20 } = req.query;
        const alerts = await SmartAlertsService.getAlerts({
            business_id: req.user.business_id,
            alert_type,
            severity,
            status,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: alerts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: alerts.length
            }
        });
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch alerts',
            message: error.message
        });
    }
});

// Acknowledge alert
router.put('/alerts/:id/acknowledge', async (req, res) => {
    try {
        const { notes } = req.body;
        const updatedAlert = await SmartAlertsService.acknowledgeAlert(
            parseInt(req.params.id),
            req.user.id,
            notes
        );
        
        res.json({
            success: true,
            data: updatedAlert,
            message: 'Alert acknowledged successfully'
        });
    } catch (error) {
        console.error('Error acknowledging alert:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to acknowledge alert',
            message: error.message
        });
    }
});

// Resolve alert
router.put('/alerts/:id/resolve', async (req, res) => {
    try {
        const { resolution_notes, actions_taken } = req.body;
        const updatedAlert = await SmartAlertsService.resolveAlert(
            parseInt(req.params.id),
            req.user.id,
            resolution_notes,
            actions_taken
        );
        
        res.json({
            success: true,
            data: updatedAlert,
            message: 'Alert resolved successfully'
        });
    } catch (error) {
        console.error('Error resolving alert:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to resolve alert',
            message: error.message
        });
    }
});

// ========================================
// DASHBOARD & ANALYTICS
// ========================================

// Get automation dashboard data
router.get('/dashboard', async (req, res) => {
    try {
        const { business_id, date_range } = req.query;
        const dashboard = await AIInsightsService.getAutomationDashboard({
            business_id: parseInt(business_id) || req.user.business_id,
            date_range: date_range || '30d'
        });
        
        res.json({
            success: true,
            data: dashboard
        });
    } catch (error) {
        console.error('Error fetching automation dashboard:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch automation dashboard',
            message: error.message
        });
    }
});

// Get automation performance metrics
router.get('/performance', async (req, res) => {
    try {
        const { business_id, metric_type, time_period } = req.query;
        const performance = await AIInsightsService.getAutomationPerformance({
            business_id: parseInt(business_id) || req.user.business_id,
            metric_type,
            time_period
        });
        
        res.json({
            success: true,
            data: performance
        });
    } catch (error) {
        console.error('Error fetching automation performance:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch automation performance',
            message: error.message
        });
    }
});

module.exports = router;
