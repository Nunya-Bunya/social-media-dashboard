const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const SubscriberService = require('../services/subscriber-service');
const EmailListService = require('../services/email-list-service');
const EmailTemplateService = require('../services/email-template-service');
const EmailCampaignService = require('../services/email-campaign-service');
const EmailAutomationService = require('../services/email-automation-service');
const EmailAnalyticsService = require('../services/email-analytics-service');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// ========================================
// EMAIL SUBSCRIBERS
// ========================================

// Get all subscribers with filtering and pagination
router.get('/subscribers', async (req, res) => {
    try {
        const { status, tags, industry, location, page = 1, limit = 20 } = req.query;
        const subscribers = await SubscriberService.getSubscribers({
            business_id: req.user.business_id,
            status,
            tags: tags ? tags.split(',') : null,
            industry,
            location,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: subscribers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: subscribers.length
            }
        });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch subscribers',
            message: error.message
        });
    }
});

// Get a specific subscriber
router.get('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await SubscriberService.getSubscriberById(parseInt(req.params.id));
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                error: 'Subscriber not found'
            });
        }
        
        res.json({
            success: true,
            data: subscriber
        });
    } catch (error) {
        console.error('Error fetching subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch subscriber',
            message: error.message
        });
    }
});

// Create a new subscriber
router.post('/subscribers', async (req, res) => {
    try {
        const subscriberData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newSubscriber = await SubscriberService.createSubscriber(subscriberData);
        
        res.status(201).json({
            success: true,
            data: newSubscriber,
            message: 'Subscriber created successfully'
        });
    } catch (error) {
        console.error('Error creating subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create subscriber',
            message: error.message
        });
    }
});

// Update a subscriber
router.put('/subscribers/:id', async (req, res) => {
    try {
        const updatedSubscriber = await SubscriberService.updateSubscriber(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedSubscriber,
            message: 'Subscriber updated successfully'
        });
    } catch (error) {
        console.error('Error updating subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update subscriber',
            message: error.message
        });
    }
});

// Delete a subscriber
router.delete('/subscribers/:id', async (req, res) => {
    try {
        await SubscriberService.deleteSubscriber(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Subscriber deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete subscriber',
            message: error.message
        });
    }
});

// Bulk import subscribers
router.post('/subscribers/bulk-import', async (req, res) => {
    try {
        const { subscribers, list_id } = req.body;
        const result = await SubscriberService.bulkImportSubscribers(subscribers, list_id);
        
        res.json({
            success: true,
            data: result,
            message: 'Subscribers imported successfully'
        });
    } catch (error) {
        console.error('Error importing subscribers:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to import subscribers',
            message: error.message
        });
    }
});

// Unsubscribe a subscriber
router.post('/subscribers/:id/unsubscribe', async (req, res) => {
    try {
        const { reason } = req.body;
        const result = await SubscriberService.unsubscribeSubscriber(
            parseInt(req.params.id),
            reason
        );
        
        res.json({
            success: true,
            data: result,
            message: 'Subscriber unsubscribed successfully'
        });
    } catch (error) {
        console.error('Error unsubscribing subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to unsubscribe subscriber',
            message: error.message
        });
    }
});

// ========================================
// EMAIL LISTS
// ========================================

// Get all email lists
router.get('/lists', async (req, res) => {
    try {
        const { is_active, page = 1, limit = 20 } = req.query;
        const lists = await EmailListService.getEmailLists({
            business_id: req.user.business_id,
            is_active,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: lists,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: lists.length
            }
        });
    } catch (error) {
        console.error('Error fetching email lists:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email lists',
            message: error.message
        });
    }
});

// Get a specific email list
router.get('/lists/:id', async (req, res) => {
    try {
        const list = await EmailListService.getEmailListById(parseInt(req.params.id));
        if (!list) {
            return res.status(404).json({
                success: false,
                error: 'Email list not found'
            });
        }
        
        res.json({
            success: true,
            data: list
        });
    } catch (error) {
        console.error('Error fetching email list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email list',
            message: error.message
        });
    }
});

// Create a new email list
router.post('/lists', async (req, res) => {
    try {
        const listData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newList = await EmailListService.createEmailList(listData);
        
        res.status(201).json({
            success: true,
            data: newList,
            message: 'Email list created successfully'
        });
    } catch (error) {
        console.error('Error creating email list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create email list',
            message: error.message
        });
    }
});

// Update an email list
router.put('/lists/:id', async (req, res) => {
    try {
        const updatedList = await EmailListService.updateEmailList(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedList,
            message: 'Email list updated successfully'
        });
    } catch (error) {
        console.error('Error updating email list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update email list',
            message: error.message
        });
    }
});

// Delete an email list
router.delete('/lists/:id', async (req, res) => {
    try {
        await EmailListService.deleteEmailList(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Email list deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting email list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete email list',
            message: error.message
        });
    }
});

// Add subscribers to list
router.post('/lists/:id/subscribers', async (req, res) => {
    try {
        const { subscriber_ids } = req.body;
        const result = await EmailListService.addSubscribersToList(
            parseInt(req.params.id),
            subscriber_ids
        );
        
        res.json({
            success: true,
            data: result,
            message: 'Subscribers added to list successfully'
        });
    } catch (error) {
        console.error('Error adding subscribers to list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add subscribers to list',
            message: error.message
        });
    }
});

// Remove subscribers from list
router.delete('/lists/:id/subscribers', async (req, res) => {
    try {
        const { subscriber_ids } = req.body;
        const result = await EmailListService.removeSubscribersFromList(
            parseInt(req.params.id),
            subscriber_ids
        );
        
        res.json({
            success: true,
            data: result,
            message: 'Subscribers removed from list successfully'
        });
    } catch (error) {
        console.error('Error removing subscribers from list:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove subscribers from list',
            message: error.message
        });
    }
});

// ========================================
// EMAIL TEMPLATES
// ========================================

// Get all email templates
router.get('/templates', async (req, res) => {
    try {
        const { template_type, category, is_active, page = 1, limit = 20 } = req.query;
        const templates = await EmailTemplateService.getEmailTemplates({
            business_id: req.user.business_id,
            template_type,
            category,
            is_active,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: templates,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: templates.length
            }
        });
    } catch (error) {
        console.error('Error fetching email templates:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email templates',
            message: error.message
        });
    }
});

// Get a specific email template
router.get('/templates/:id', async (req, res) => {
    try {
        const template = await EmailTemplateService.getEmailTemplateById(parseInt(req.params.id));
        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Email template not found'
            });
        }
        
        res.json({
            success: true,
            data: template
        });
    } catch (error) {
        console.error('Error fetching email template:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email template',
            message: error.message
        });
    }
});

// Create a new email template
router.post('/templates', async (req, res) => {
    try {
        const templateData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newTemplate = await EmailTemplateService.createEmailTemplate(templateData);
        
        res.status(201).json({
            success: true,
            data: newTemplate,
            message: 'Email template created successfully'
        });
    } catch (error) {
        console.error('Error creating email template:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create email template',
            message: error.message
        });
    }
});

// Update an email template
router.put('/templates/:id', async (req, res) => {
    try {
        const updatedTemplate = await EmailTemplateService.updateEmailTemplate(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedTemplate,
            message: 'Email template updated successfully'
        });
    } catch (error) {
        console.error('Error updating email template:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update email template',
            message: error.message
        });
    }
});

// Delete an email template
router.delete('/templates/:id', async (req, res) => {
    try {
        await EmailTemplateService.deleteEmailTemplate(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Email template deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting email template:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete email template',
            message: error.message
        });
    }
});

// ========================================
// EMAIL CAMPAIGNS
// ========================================

// Get all email campaigns
router.get('/campaigns', async (req, res) => {
    try {
        const { status, campaign_type, page = 1, limit = 20 } = req.query;
        const campaigns = await EmailCampaignService.getEmailCampaigns({
            business_id: req.user.business_id,
            status,
            campaign_type,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: campaigns,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: campaigns.length
            }
        });
    } catch (error) {
        console.error('Error fetching email campaigns:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email campaigns',
            message: error.message
        });
    }
});

// Get a specific email campaign
router.get('/campaigns/:id', async (req, res) => {
    try {
        const campaign = await EmailCampaignService.getEmailCampaignById(parseInt(req.params.id));
        if (!campaign) {
            return res.status(404).json({
                success: false,
                error: 'Email campaign not found'
            });
        }
        
        res.json({
            success: true,
            data: campaign
        });
    } catch (error) {
        console.error('Error fetching email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email campaign',
            message: error.message
        });
    }
});

// Create a new email campaign
router.post('/campaigns', async (req, res) => {
    try {
        const campaignData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newCampaign = await EmailCampaignService.createEmailCampaign(campaignData);
        
        res.status(201).json({
            success: true,
            data: newCampaign,
            message: 'Email campaign created successfully'
        });
    } catch (error) {
        console.error('Error creating email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create email campaign',
            message: error.message
        });
    }
});

// Update an email campaign
router.put('/campaigns/:id', async (req, res) => {
    try {
        const updatedCampaign = await EmailCampaignService.updateEmailCampaign(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedCampaign,
            message: 'Email campaign updated successfully'
        });
    } catch (error) {
        console.error('Error updating email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update email campaign',
            message: error.message
        });
    }
});

// Delete an email campaign
router.delete('/campaigns/:id', async (req, res) => {
    try {
        await EmailCampaignService.deleteEmailCampaign(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Email campaign deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete email campaign',
            message: error.message
        });
    }
});

// Send email campaign
router.post('/campaigns/:id/send', async (req, res) => {
    try {
        const { send_time, timezone } = req.body;
        const result = await EmailCampaignService.sendEmailCampaign(
            parseInt(req.params.id),
            { send_time, timezone }
        );
        
        res.json({
            success: true,
            data: result,
            message: 'Email campaign scheduled for sending'
        });
    } catch (error) {
        console.error('Error sending email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email campaign',
            message: error.message
        });
    }
});

// Pause email campaign
router.post('/campaigns/:id/pause', async (req, res) => {
    try {
        const result = await EmailCampaignService.pauseEmailCampaign(parseInt(req.params.id));
        
        res.json({
            success: true,
            data: result,
            message: 'Email campaign paused successfully'
        });
    } catch (error) {
        console.error('Error pausing email campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to pause email campaign',
            message: error.message
        });
    }
});

// ========================================
// EMAIL AUTOMATION
// ========================================

// Get all automation rules
router.get('/automation/rules', async (req, res) => {
    try {
        const { trigger_type, is_active, page = 1, limit = 20 } = req.query;
        const rules = await EmailAutomationService.getAutomationRules({
            business_id: req.user.business_id,
            trigger_type,
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
        console.error('Error fetching automation rules:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch automation rules',
            message: error.message
        });
    }
});

// Create automation rule
router.post('/automation/rules', async (req, res) => {
    try {
        const ruleData = {
            ...req.body,
            business_id: req.user.business_id
        };
        
        const newRule = await EmailAutomationService.createAutomationRule(ruleData);
        
        res.status(201).json({
            success: true,
            data: newRule,
            message: 'Automation rule created successfully'
        });
    } catch (error) {
        console.error('Error creating automation rule:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create automation rule',
            message: error.message
        });
    }
});

// ========================================
// EMAIL ANALYTICS
// ========================================

// Get email marketing dashboard analytics
router.get('/analytics/dashboard', async (req, res) => {
    try {
        const { business_id, date_range } = req.query;
        const analytics = await EmailAnalyticsService.getDashboardAnalytics({
            business_id: parseInt(business_id) || req.user.business_id,
            date_range: date_range || '30d'
        });
        
        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching email analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email analytics',
            message: error.message
        });
    }
});

// Get campaign performance analytics
router.get('/analytics/campaigns/:id', async (req, res) => {
    try {
        const analytics = await EmailAnalyticsService.getCampaignAnalytics(parseInt(req.params.id));
        
        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching campaign analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch campaign analytics',
            message: error.message
        });
    }
});

// Get subscriber analytics
router.get('/analytics/subscribers', async (req, res) => {
    try {
        const analytics = await EmailAnalyticsService.getSubscriberAnalytics(req.user.business_id);
        
        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching subscriber analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch subscriber analytics',
            message: error.message
        });
    }
});

// ========================================
// WEBHOOKS & TRACKING
// ========================================

// Email open tracking pixel
router.get('/track/open/:send_id', async (req, res) => {
    try {
        const { send_id } = req.params;
        await EmailAnalyticsService.trackEmailOpen(send_id, req);
        
        // Return 1x1 transparent pixel
        res.set('Content-Type', 'image/gif');
        res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
    } catch (error) {
        console.error('Error tracking email open:', error);
        res.status(500).send('Error');
    }
});

// Email link click tracking
router.get('/track/click/:link_id', async (req, res) => {
    try {
        const { link_id } = req.params;
        const { send_id, subscriber_id } = req.query;
        
        const redirectUrl = await EmailAnalyticsService.trackEmailClick(
            link_id,
            send_id,
            subscriber_id,
            req
        );
        
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error tracking email click:', error);
        res.status(500).send('Error tracking click');
    }
});

// Unsubscribe webhook
router.get('/unsubscribe/:send_id', async (req, res) => {
    try {
        const { send_id } = req.params;
        const { reason } = req.query;
        
        await EmailAnalyticsService.processUnsubscribe(send_id, reason);
        
        res.send(`
            <html>
                <body>
                    <h2>Successfully Unsubscribed</h2>
                    <p>You have been unsubscribed from our email list.</p>
                    <p>If you change your mind, you can always resubscribe.</p>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error processing unsubscribe:', error);
        res.status(500).send('Error processing unsubscribe');
    }
});

module.exports = router;
