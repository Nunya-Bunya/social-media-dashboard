const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const PressReleaseService = require('../services/press-release-service');
const MediaContactService = require('../services/media-contact-service');
const JournalistService = require('../services/journalist-service');
const CoverageService = require('../services/coverage-service');
const OutreachService = require('../services/outreach-service');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// ========================================
// PRESS RELEASES
// ========================================

// Get all press releases for a business
router.get('/press-releases', async (req, res) => {
    try {
        const { business_id, status, page = 1, limit = 20 } = req.query;
        const pressReleases = await PressReleaseService.getPressReleases({
            business_id: parseInt(business_id) || req.user.business_id,
            status,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: pressReleases,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: pressReleases.length
            }
        });
    } catch (error) {
        console.error('Error fetching press releases:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch press releases',
            message: error.message
        });
    }
});

// Get a specific press release
router.get('/press-releases/:id', async (req, res) => {
    try {
        const pressRelease = await PressReleaseService.getPressReleaseById(parseInt(req.params.id));
        if (!pressRelease) {
            return res.status(404).json({
                success: false,
                error: 'Press release not found'
            });
        }
        
        res.json({
            success: true,
            data: pressRelease
        });
    } catch (error) {
        console.error('Error fetching press release:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch press release',
            message: error.message
        });
    }
});

// Create a new press release
router.post('/press-releases', async (req, res) => {
    try {
        const pressReleaseData = {
            ...req.body,
            author_id: req.user.id,
            business_id: req.body.business_id || req.user.business_id
        };
        
        const newPressRelease = await PressReleaseService.createPressRelease(pressReleaseData);
        
        res.status(201).json({
            success: true,
            data: newPressRelease,
            message: 'Press release created successfully'
        });
    } catch (error) {
        console.error('Error creating press release:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create press release',
            message: error.message
        });
    }
});

// Update a press release
router.put('/press-releases/:id', async (req, res) => {
    try {
        const updatedPressRelease = await PressReleaseService.updatePressRelease(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedPressRelease,
            message: 'Press release updated successfully'
        });
    } catch (error) {
        console.error('Error updating press release:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update press release',
            message: error.message
        });
    }
});

// Delete a press release
router.delete('/press-releases/:id', async (req, res) => {
    try {
        await PressReleaseService.deletePressRelease(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Press release deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting press release:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete press release',
            message: error.message
        });
    }
});

// Publish a press release
router.post('/press-releases/:id/publish', async (req, res) => {
    try {
        const publishedPressRelease = await PressReleaseService.publishPressRelease(
            parseInt(req.params.id),
            req.body.distribution_channels || []
        );
        
        res.json({
            success: true,
            data: publishedPressRelease,
            message: 'Press release published successfully'
        });
    } catch (error) {
        console.error('Error publishing press release:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to publish press release',
            message: error.message
        });
    }
});

// ========================================
// MEDIA CONTACTS
// ========================================

// Get all media contacts
router.get('/media-contacts', async (req, res) => {
    try {
        const { outlet_type, relationship_status, beat_coverage, page = 1, limit = 20 } = req.query;
        const contacts = await MediaContactService.getMediaContacts({
            outlet_type,
            relationship_status,
            beat_coverage,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: contacts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: contacts.length
            }
        });
    } catch (error) {
        console.error('Error fetching media contacts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch media contacts',
            message: error.message
        });
    }
});

// Get a specific media contact
router.get('/media-contacts/:id', async (req, res) => {
    try {
        const contact = await MediaContactService.getMediaContactById(parseInt(req.params.id));
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Media contact not found'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching media contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch media contact',
            message: error.message
        });
    }
});

// Create a new media contact
router.post('/media-contacts', async (req, res) => {
    try {
        const newContact = await MediaContactService.createMediaContact(req.body);
        
        res.status(201).json({
            success: true,
            data: newContact,
            message: 'Media contact created successfully'
        });
    } catch (error) {
        console.error('Error creating media contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create media contact',
            message: error.message
        });
    }
});

// Update a media contact
router.put('/media-contacts/:id', async (req, res) => {
    try {
        const updatedContact = await MediaContactService.updateMediaContact(
            parseInt(req.params.id),
            req.body
        );
        
        res.json({
            success: true,
            data: updatedContact,
            message: 'Media contact updated successfully'
        });
    } catch (error) {
        console.error('Error updating media contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update media contact',
            message: error.message
        });
    }
});

// Delete a media contact
router.delete('/media-contacts/:id', async (req, res) => {
    try {
        await MediaContactService.deleteMediaContact(parseInt(req.params.id));
        
        res.json({
            success: true,
            message: 'Media contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting media contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete media contact',
            message: error.message
        });
    }
});

// ========================================
// JOURNALISTS
// ========================================

// Get all journalists with profiles
router.get('/journalists', async (req, res) => {
    try {
        const { expertise, influence_min, influence_max, page = 1, limit = 20 } = req.query;
        const journalists = await JournalistService.getJournalists({
            expertise,
            influence_min: influence_min ? parseInt(influence_min) : null,
            influence_max: influence_max ? parseInt(influence_max) : null,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: journalists,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: journalists.length
            }
        });
    } catch (error) {
        console.error('Error fetching journalists:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch journalists',
            message: error.message
        });
    }
});

// Get journalist profile
router.get('/journalists/:id', async (req, res) => {
    try {
        const journalist = await JournalistService.getJournalistById(parseInt(req.params.id));
        if (!journalist) {
            return res.status(404).json({
                success: false,
                error: 'Journalist not found'
            });
        }
        
        res.json({
            success: true,
            data: journalist
        });
    } catch (error) {
        console.error('Error fetching journalist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch journalist',
            message: error.message
        });
    }
});

// Create/update journalist profile
router.post('/journalists', async (req, res) => {
    try {
        const newJournalist = await JournalistService.createJournalist(req.body);
        
        res.status(201).json({
            success: true,
            data: newJournalist,
            message: 'Journalist profile created successfully'
        });
    } catch (error) {
        console.error('Error creating journalist profile:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create journalist profile',
            message: error.message
        });
    }
});

// ========================================
// MEDIA COVERAGE
// ========================================

// Get media coverage for press releases
router.get('/coverage', async (req, res) => {
    try {
        const { press_release_id, sentiment, coverage_type, page = 1, limit = 20 } = req.query;
        const coverage = await CoverageService.getMediaCoverage({
            press_release_id: press_release_id ? parseInt(press_release_id) : null,
            sentiment,
            coverage_type,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: coverage,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: coverage.length
            }
        });
    } catch (error) {
        console.error('Error fetching media coverage:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch media coverage',
            message: error.message
        });
    }
});

// Add new media coverage
router.post('/coverage', async (req, res) => {
    try {
        const newCoverage = await CoverageService.addMediaCoverage(req.body);
        
        res.status(201).json({
            success: true,
            data: newCoverage,
            message: 'Media coverage added successfully'
        });
    } catch (error) {
        console.error('Error adding media coverage:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add media coverage',
            message: error.message
        });
    }
});

// ========================================
// OUTREACH CAMPAIGNS
// ========================================

// Get outreach campaigns
router.get('/outreach-campaigns', async (req, res) => {
    try {
        const { status, campaign_type, page = 1, limit = 20 } = req.query;
        const campaigns = await OutreachService.getOutreachCampaigns({
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
        console.error('Error fetching outreach campaigns:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch outreach campaigns',
            message: error.message
        });
    }
});

// Create outreach campaign
router.post('/outreach-campaigns', async (req, res) => {
    try {
        const newCampaign = await OutreachService.createOutreachCampaign(req.body);
        
        res.status(201).json({
            success: true,
            data: newCampaign,
            message: 'Outreach campaign created successfully'
        });
    } catch (error) {
        console.error('Error creating outreach campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create outreach campaign',
            message: error.message
        });
    }
});

// ========================================
// ANALYTICS & INSIGHTS
// ========================================

// Get PR analytics dashboard
router.get('/analytics/dashboard', async (req, res) => {
    try {
        const { business_id, date_range } = req.query;
        const analytics = await PressReleaseService.getAnalytics({
            business_id: parseInt(business_id) || req.user.business_id,
            date_range: date_range || '30d'
        });
        
        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching PR analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch PR analytics',
            message: error.message
        });
    }
});

// Get media contact insights
router.get('/analytics/media-contacts', async (req, res) => {
    try {
        const insights = await MediaContactService.getContactInsights();
        
        res.json({
            success: true,
            data: insights
        });
    } catch (error) {
        console.error('Error fetching media contact insights:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch media contact insights',
            message: error.message
        });
    }
});

module.exports = router;
