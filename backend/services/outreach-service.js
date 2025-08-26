const { supabase } = require('../config');
const EmailService = require('./email-service');

class OutreachService {
    
    /**
     * Get outreach campaigns with filtering and pagination
     */
    static async getOutreachCampaigns({ status, campaign_type, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('outreach_campaigns')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id),
                    target_contacts:media_contacts(id, first_name, last_name, outlet_name)
                `)
                .order('created_at', { ascending: false });

            // Apply filters
            if (status) {
                query = query.eq('status', status);
            }
            
            if (campaign_type) {
                query = query.eq('campaign_type', campaign_type);
            }

            // Apply pagination
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);

            const { data, error } = await query;

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getOutreachCampaigns:', error);
            throw error;
        }
    }

    /**
     * Get a specific outreach campaign by ID
     */
    static async getOutreachCampaignById(id) {
        try {
            const { data, error } = await supabase
                .from('outreach_campaigns')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id, content),
                    target_contacts:media_contacts(id, first_name, last_name, outlet_name, email),
                    outreach_attempts(
                        id, contact_id, attempt_type, method, content, 
                        sent_at, response_received, response_content, outcome, notes
                    )
                `)
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return null; // Not found
                }
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in getOutreachCampaignById:', error);
            throw error;
        }
    }

    /**
     * Create a new outreach campaign
     */
    static async createOutreachCampaign(campaignData) {
        try {
            // Validate required fields
            if (!campaignData.name || !campaignData.campaign_type) {
                throw new Error('Campaign name and type are required');
            }

            // Set default values
            const campaign = {
                ...campaignData,
                status: campaignData.status || 'planned',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('outreach_campaigns')
                .insert([campaign])
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createOutreachCampaign:', error);
            throw error;
        }
    }

    /**
     * Update an existing outreach campaign
     */
    static async updateOutreachCampaign(id, updateData) {
        try {
            // Validate the campaign exists
            const existing = await this.getOutreachCampaignById(id);
            if (!existing) {
                throw new Error('Outreach campaign not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('outreach_campaigns')
                .update(updatePayload)
                .eq('id', id)
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateOutreachCampaign:', error);
            throw error;
        }
    }

    /**
     * Delete an outreach campaign
     */
    static async deleteOutreachCampaign(id) {
        try {
            // Check if campaign exists
            const existing = await this.getOutreachCampaignById(id);
            if (!existing) {
                throw new Error('Outreach campaign not found');
            }

            // Check if campaign has outreach attempts
            if (existing.outreach_attempts && existing.outreach_attempts.length > 0) {
                throw new Error('Cannot delete campaign with outreach history. Consider archiving instead.');
            }

            const { error } = await supabase
                .from('outreach_campaigns')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteOutreachCampaign:', error);
            throw error;
        }
    }

    /**
     * Start an outreach campaign
     */
    static async startOutreachCampaign(id) {
        try {
            const campaign = await this.getOutreachCampaignById(id);
            if (!campaign) {
                throw new Error('Outreach campaign not found');
            }

            if (campaign.status !== 'planned') {
                throw new Error('Campaign can only be started if it is in planned status');
            }

            if (!campaign.target_contacts || campaign.target_contacts.length === 0) {
                throw new Error('Campaign must have target contacts to start');
            }

            // Update campaign status
            const { data: updatedCampaign, error: updateError } = await supabase
                .from('outreach_campaigns')
                .update({ 
                    status: 'active',
                    start_date: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single();

            if (updateError) {
                throw new Error(`Database error: ${updateError.message}`);
            }

            // Send initial outreach to all target contacts
            await this.sendInitialOutreach(campaign);

            return updatedCampaign;
        } catch (error) {
            console.error('Error in startOutreachCampaign:', error);
            throw error;
        }
    }

    /**
     * Send initial outreach for a campaign
     */
    static async sendInitialOutreach(campaign) {
        try {
            const outreachPromises = [];

            for (const contact of campaign.target_contacts) {
                const outreachData = {
                    campaign_id: campaign.id,
                    contact_id: contact.id,
                    press_release_id: campaign.press_release_id,
                    attempt_type: 'initial_pitch',
                    method: 'email',
                    content: this.generateOutreachContent(campaign, contact),
                    sent_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                outreachPromises.push(
                    this.createOutreachAttempt(outreachData)
                );
            }

            await Promise.allSettled(outreachPromises);

            return { success: true, contacts_reached: campaign.target_contacts.length };
        } catch (error) {
            console.error('Error in sendInitialOutreach:', error);
            throw error;
        }
    }

    /**
     * Generate outreach content based on campaign and contact
     */
    static generateOutreachContent(campaign, contact) {
        let content = `Hi ${contact.first_name},\n\n`;
        
        switch (campaign.campaign_type) {
            case 'press_release':
                content += `I wanted to share a press release that might be of interest to your readers: "${campaign.press_release?.title}"\n\n`;
                content += `This announcement covers ${campaign.description || 'important developments in our industry'}.\n\n`;
                break;
            case 'story_pitch':
                content += `I have a story idea that I think would be perfect for ${contact.outlet_name}: ${campaign.description}\n\n`;
                break;
            case 'interview_request':
                content += `I'm reaching out to request an interview opportunity for ${contact.outlet_name}.\n\n`;
                content += `${campaign.description}\n\n`;
                break;
            default:
                content += `${campaign.description}\n\n`;
        }
        
        content += `Would you be interested in covering this story?\n\n`;
        content += `Best regards,\n[Your Name]`;
        
        return content;
    }

    /**
     * Create an outreach attempt record
     */
    static async createOutreachAttempt(attemptData) {
        try {
            const { data, error } = await supabase
                .from('outreach_attempts')
                .insert([attemptData])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createOutreachAttempt:', error);
            throw error;
        }
    }

    /**
     * Update outreach attempt with response
     */
    static async updateOutreachAttempt(id, updateData) {
        try {
            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            if (updateData.response_received) {
                updatePayload.response_date = new Date().toISOString();
            }

            const { data, error } = await supabase
                .from('outreach_attempts')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateOutreachAttempt:', error);
            throw error;
        }
    }

    /**
     * Send follow-up outreach
     */
    static async sendFollowUp(campaignId, contactId, followUpData) {
        try {
            const outreachData = {
                campaign_id: campaignId,
                contact_id: contactId,
                attempt_type: 'follow_up',
                method: followUpData.method || 'email',
                content: followUpData.content,
                sent_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const attempt = await this.createOutreachAttempt(outreachData);

            // Update campaign metrics
            await this.updateCampaignMetrics(campaignId);

            return attempt;
        } catch (error) {
            console.error('Error in sendFollowUp:', error);
            throw error;
        }
    }

    /**
     * Get outreach analytics for a campaign
     */
    static async getCampaignAnalytics(campaignId) {
        try {
            const campaign = await this.getOutreachCampaignById(campaignId);
            if (!campaign) {
                throw new Error('Outreach campaign not found');
            }

            const attempts = campaign.outreach_attempts || [];
            
            // Calculate analytics
            const analytics = {
                total_attempts: attempts.length,
                by_attempt_type: this.countByAttemptType(attempts),
                by_method: this.countByMethod(attempts),
                by_outcome: this.countByOutcome(attempts),
                response_rate: this.calculateResponseRate(attempts),
                average_response_time: this.calculateAverageResponseTime(attempts),
                success_rate: this.calculateSuccessRate(attempts),
                top_performing_contacts: this.getTopPerformingContacts(attempts),
                timeline: this.getOutreachTimeline(attempts)
            };

            return analytics;
        } catch (error) {
            console.error('Error in getCampaignAnalytics:', error);
            throw error;
        }
    }

    /**
     * Update campaign success metrics
     */
    static async updateCampaignMetrics(campaignId) {
        try {
            const analytics = await this.getCampaignAnalytics(campaignId);
            
            const metrics = {
                total_outreach: analytics.total_attempts,
                response_rate: analytics.response_rate,
                success_rate: analytics.success_rate,
                last_updated: new Date().toISOString()
            };

            const { error } = await supabase
                .from('outreach_campaigns')
                .update({ 
                    success_metrics: metrics,
                    updated_at: new Date().toISOString()
                })
                .eq('id', campaignId);

            if (error) {
                console.error('Error updating campaign metrics:', error);
            }
        } catch (error) {
            console.error('Error in updateCampaignMetrics:', error);
        }
    }

    /**
     * Get outreach insights across all campaigns
     */
    static async getOutreachInsights() {
        try {
            // Get all outreach attempts from the last 30 days
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            
            const { data: recentAttempts, error } = await supabase
                .from('outreach_attempts')
                .select(`
                    *,
                    campaign:outreach_campaigns(id, name, campaign_type),
                    contact:media_contacts(id, first_name, last_name, outlet_name)
                `)
                .gte('sent_at', thirtyDaysAgo.toISOString())
                .order('sent_at', { ascending: false });

            if (error) throw error;

            // Calculate insights
            const insights = {
                total_attempts: recentAttempts?.length || 0,
                by_campaign_type: this.countByCampaignType(recentAttempts),
                by_method: this.countByMethod(recentAttempts),
                by_outcome: this.countByOutcome(recentAttempts),
                response_rate: this.calculateResponseRate(recentAttempts),
                success_rate: this.calculateSuccessRate(recentAttempts),
                top_outlets: this.getTopOutlets(recentAttempts),
                average_response_time: this.calculateAverageResponseTime(recentAttempts)
            };

            return insights;
        } catch (error) {
            console.error('Error in getOutreachInsights:', error);
            throw error;
        }
    }

    /**
     * Helper method to count by attempt type
     */
    static countByAttemptType(attempts) {
        if (!attempts) return {};
        
        return attempts.reduce((acc, attempt) => {
            const type = attempt.attempt_type || 'unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by method
     */
    static countByMethod(attempts) {
        if (!attempts) return {};
        
        return attempts.reduce((acc, attempt) => {
            const method = attempt.method || 'unknown';
            acc[method] = (acc[method] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by outcome
     */
    static countByOutcome(attempts) {
        if (!attempts) return {};
        
        return attempts.reduce((acc, attempt) => {
            const outcome = attempt.outcome || 'no_response';
            acc[outcome] = (acc[outcome] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by campaign type
     */
    static countByCampaignType(attempts) {
        if (!attempts) return {};
        
        return attempts.reduce((acc, attempt) => {
            const type = attempt.campaign?.campaign_type || 'unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to calculate response rate
     */
    static calculateResponseRate(attempts) {
        if (!attempts || attempts.length === 0) return 0;
        
        const responses = attempts.filter(attempt => attempt.response_received).length;
        return Math.round((responses / attempts.length) * 100);
    }

    /**
     * Helper method to calculate success rate
     */
    static calculateSuccessRate(attempts) {
        if (!attempts || attempts.length === 0) return 0;
        
        const successes = attempts.filter(attempt => 
            ['interested', 'coverage_secured'].includes(attempt.outcome)
        ).length;
        return Math.round((successes / attempts.length) * 100);
    }

    /**
     * Helper method to calculate average response time
     */
    static calculateAverageResponseTime(attempts) {
        if (!attempts || attempts.length === 0) return 0;
        
        const responseAttempts = attempts.filter(attempt => 
            attempt.response_received && attempt.response_date && attempt.sent_at
        );
        
        if (responseAttempts.length === 0) return 0;
        
        const totalTime = responseAttempts.reduce((sum, attempt) => {
            const sentTime = new Date(attempt.sent_at);
            const responseTime = new Date(attempt.response_date);
            return sum + (responseTime - sentTime);
        }, 0);
        
        return Math.round(totalTime / responseAttempts.length / (1000 * 60 * 60)); // Hours
    }

    /**
     * Helper method to get top performing contacts
     */
    static getTopPerformingContacts(attempts, limit = 10) {
        if (!attempts) return [];
        
        const contactPerformance = {};
        
        attempts.forEach(attempt => {
            const contactId = attempt.contact_id;
            if (!contactPerformance[contactId]) {
                contactPerformance[contactId] = {
                    contact_id: contactId,
                    total_attempts: 0,
                    responses: 0,
                    successes: 0
                };
            }
            
            contactPerformance[contactId].total_attempts++;
            if (attempt.response_received) contactPerformance[contactId].responses++;
            if (['interested', 'coverage_secured'].includes(attempt.outcome)) {
                contactPerformance[contactId].successes++;
            }
        });
        
        return Object.values(contactPerformance)
            .map(contact => ({
                ...contact,
                response_rate: Math.round((contact.responses / contact.total_attempts) * 100),
                success_rate: Math.round((contact.successes / contact.total_attempts) * 100)
            }))
            .sort((a, b) => b.success_rate - a.success_rate)
            .slice(0, limit);
    }

    /**
     * Helper method to get top outlets
     */
    static getTopOutlets(attempts, limit = 10) {
        if (!attempts) return [];
        
        const outletCounts = {};
        
        attempts.forEach(attempt => {
            const outlet = attempt.contact?.outlet_name || 'unknown';
            outletCounts[outlet] = (outletCounts[outlet] || 0) + 1;
        });
        
        return Object.entries(outletCounts)
            .map(([outlet, count]) => ({ outlet, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }

    /**
     * Helper method to get outreach timeline
     */
    static getOutreachTimeline(attempts) {
        if (!attempts) return [];
        
        const timeline = {};
        
        attempts.forEach(attempt => {
            const date = attempt.sent_at.split('T')[0];
            if (!timeline[date]) {
                timeline[date] = { attempts: 0, responses: 0, successes: 0 };
            }
            
            timeline[date].attempts++;
            if (attempt.response_received) timeline[date].responses++;
            if (['interested', 'coverage_secured'].includes(attempt.outcome)) {
                timeline[date].successes++;
            }
        });
        
        return Object.entries(timeline)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }
}

module.exports = OutreachService;
