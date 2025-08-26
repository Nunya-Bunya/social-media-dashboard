const { supabase } = require('../config');
const EmailService = require('./email-service');
const DistributionService = require('./distribution-service');

class PressReleaseService {
    
    /**
     * Get press releases with filtering and pagination
     */
    static async getPressReleases({ business_id, status, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('press_releases')
                .select(`
                    *,
                    author:users(id, first_name, last_name, email),
                    business:businesses(id, name, industry)
                `)
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            if (status) {
                query = query.eq('status', status);
            }

            // Apply pagination
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);

            const { data, error, count } = await query;

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getPressReleases:', error);
            throw error;
        }
    }

    /**
     * Get a specific press release by ID
     */
    static async getPressReleaseById(id) {
        try {
            const { data, error } = await supabase
                .from('press_releases')
                .select(`
                    *,
                    author:users(id, first_name, last_name, email),
                    business:businesses(id, name, industry),
                    media_coverage(id, outlet_name, coverage_type, headline, url, sentiment)
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
            console.error('Error in getPressReleaseById:', error);
            throw error;
        }
    }

    /**
     * Create a new press release
     */
    static async createPressRelease(pressReleaseData) {
        try {
            // Validate required fields
            if (!pressReleaseData.title || !pressReleaseData.content) {
                throw new Error('Title and content are required');
            }

            // Set default values
            const pressRelease = {
                ...pressReleaseData,
                status: pressReleaseData.status || 'draft',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('press_releases')
                .insert([pressRelease])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createPressRelease:', error);
            throw error;
        }
    }

    /**
     * Update an existing press release
     */
    static async updatePressRelease(id, updateData) {
        try {
            // Validate the press release exists
            const existing = await this.getPressReleaseById(id);
            if (!existing) {
                throw new Error('Press release not found');
            }

            // Prevent status changes for published releases
            if (existing.status === 'published' && updateData.status && updateData.status !== 'published') {
                throw new Error('Cannot change status of published press release');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('press_releases')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updatePressRelease:', error);
            throw error;
        }
    }

    /**
     * Delete a press release
     */
    static async deletePressRelease(id) {
        try {
            // Check if press release exists and can be deleted
            const existing = await this.getPressReleaseById(id);
            if (!existing) {
                throw new Error('Press release not found');
            }

            if (existing.status === 'published') {
                throw new Error('Cannot delete published press release');
            }

            const { error } = await supabase
                .from('press_releases')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deletePressRelease:', error);
            throw error;
        }
    }

    /**
     * Publish a press release
     */
    static async publishPressRelease(id, distributionChannels = []) {
        try {
            // Get the press release
            const pressRelease = await this.getPressReleaseById(id);
            if (!pressRelease) {
                throw new Error('Press release not found');
            }

            if (pressRelease.status === 'published') {
                throw new Error('Press release is already published');
            }

            if (pressRelease.status !== 'approved') {
                throw new Error('Press release must be approved before publishing');
            }

            // Update status to published
            const updatePayload = {
                status: 'published',
                publish_date: new Date().toISOString(),
                distribution_channels: distributionChannels,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('press_releases')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Distribute the press release
            if (distributionChannels.length > 0) {
                await this.distributePressRelease(data, distributionChannels);
            }

            return data;
        } catch (error) {
            console.error('Error in publishPressRelease:', error);
            throw error;
        }
    }

    /**
     * Distribute press release through various channels
     */
    static async distributePressRelease(pressRelease, channels) {
        try {
            const distributionPromises = [];

            for (const channel of channels) {
                switch (channel) {
                    case 'email':
                        distributionPromises.push(
                            this.distributeViaEmail(pressRelease)
                        );
                        break;
                    case 'wire_service':
                        distributionPromises.push(
                            this.distributeViaWireService(pressRelease)
                        );
                        break;
                    case 'social_media':
                        distributionPromises.push(
                            this.distributeViaSocialMedia(pressRelease)
                        );
                        break;
                    case 'website':
                        distributionPromises.push(
                            this.distributeViaWebsite(pressRelease)
                        );
                        break;
                }
            }

            await Promise.allSettled(distributionPromises);

            // Update distribution metrics
            await this.updateDistributionMetrics(pressRelease.id, channels);

        } catch (error) {
            console.error('Error in distributePressRelease:', error);
            // Don't throw error here as distribution failure shouldn't fail the publish
        }
    }

    /**
     * Distribute via email to media contacts
     */
    static async distributeViaEmail(pressRelease) {
        try {
            // Get relevant media contacts
            const { data: contacts } = await supabase
                .from('media_contacts')
                .select('*')
                .eq('relationship_status', 'relationship')
                .or(`beat_coverage.cs.{${pressRelease.tags.join(',')}}`);

            if (contacts && contacts.length > 0) {
                // Send emails to contacts
                for (const contact of contacts) {
                    await EmailService.sendPressReleaseEmail(contact, pressRelease);
                }
            }

            return { channel: 'email', success: true, contacts_reached: contacts?.length || 0 };
        } catch (error) {
            console.error('Error distributing via email:', error);
            return { channel: 'email', success: false, error: error.message };
        }
    }

    /**
     * Distribute via wire service (placeholder for future integration)
     */
    static async distributeViaWireService(pressRelease) {
        try {
            // This would integrate with services like PR Newswire, Business Wire, etc.
            console.log(`Distributing press release ${pressRelease.id} via wire service`);
            
            return { channel: 'wire_service', success: true, message: 'Wire service distribution initiated' };
        } catch (error) {
            console.error('Error distributing via wire service:', error);
            return { channel: 'wire_service', success: false, error: error.message };
        }
    }

    /**
     * Distribute via social media (placeholder for future integration)
     */
    static async distributeViaSocialMedia(pressRelease) {
        try {
            // This would integrate with your existing social media posting system
            console.log(`Distributing press release ${pressRelease.id} via social media`);
            
            return { channel: 'social_media', success: true, message: 'Social media distribution initiated' };
        } catch (error) {
            console.error('Error distributing via social media:', error);
            return { channel: 'social_media', success: false, error: error.message };
        }
    }

    /**
     * Distribute via website (placeholder for future integration)
     */
    static async distributeViaWebsite(pressRelease) {
        try {
            // This would update your website's news/press section
            console.log(`Distributing press release ${pressRelease.id} via website`);
            
            return { channel: 'website', success: true, message: 'Website distribution initiated' };
        } catch (error) {
            console.error('Error distributing via website:', error);
            return { channel: 'website', success: false, error: error.message };
        }
    }

    /**
     * Update distribution metrics
     */
    static async updateDistributionMetrics(pressReleaseId, channels) {
        try {
            const metrics = {
                distribution_channels: channels,
                distribution_date: new Date().toISOString(),
                last_updated: new Date().toISOString()
            };

            const { error } = await supabase
                .from('press_releases')
                .update({ metrics: metrics })
                .eq('id', pressReleaseId);

            if (error) {
                console.error('Error updating distribution metrics:', error);
            }
        } catch (error) {
            console.error('Error updating distribution metrics:', error);
        }
    }

    /**
     * Get PR analytics dashboard data
     */
    static async getAnalytics({ business_id, date_range = '30d' }) {
        try {
            const endDate = new Date();
            const startDate = new Date();
            
            // Calculate start date based on range
            switch (date_range) {
                case '7d':
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case '30d':
                    startDate.setDate(endDate.getDate() - 30);
                    break;
                case '90d':
                    startDate.setDate(endDate.getDate() - 90);
                    break;
                case '1y':
                    startDate.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    startDate.setDate(endDate.getDate() - 30);
            }

            // Get press release counts by status
            const { data: statusCounts, error: statusError } = await supabase
                .from('press_releases')
                .select('status')
                .eq('business_id', business_id)
                .gte('created_at', startDate.toISOString())
                .lte('created_at', endDate.toISOString());

            if (statusError) throw statusError;

            // Get media coverage data
            const { data: coverageData, error: coverageError } = await supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `)
                .eq('press_release.business_id', business_id)
                .gte('publish_date', startDate.toISOString())
                .lte('publish_date', endDate.toISOString());

            if (coverageError) throw coverageError;

            // Calculate analytics
            const analytics = {
                period: date_range,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                press_releases: {
                    total: statusCounts?.length || 0,
                    by_status: this.countByStatus(statusCounts),
                    published: statusCounts?.filter(pr => pr.status === 'published').length || 0
                },
                media_coverage: {
                    total: coverageData?.length || 0,
                    by_sentiment: this.countBySentiment(coverageData),
                    by_type: this.countByCoverageType(coverageData),
                    total_reach: coverageData?.reduce((sum, item) => sum + (item.reach_estimate || 0), 0) || 0
                },
                performance_metrics: {
                    coverage_rate: this.calculateCoverageRate(statusCounts, coverageData),
                    average_reach: this.calculateAverageReach(coverageData),
                    positive_sentiment_rate: this.calculatePositiveSentimentRate(coverageData)
                }
            };

            return analytics;
        } catch (error) {
            console.error('Error in getAnalytics:', error);
            throw error;
        }
    }

    /**
     * Helper method to count press releases by status
     */
    static countByStatus(pressReleases) {
        if (!pressReleases) return {};
        
        return pressReleases.reduce((acc, pr) => {
            acc[pr.status] = (acc[pr.status] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count coverage by sentiment
     */
    static countBySentiment(coverage) {
        if (!coverage) return {};
        
        return coverage.reduce((acc, item) => {
            acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count coverage by type
     */
    static countByCoverageType(coverage) {
        if (!coverage) return {};
        
        return coverage.reduce((acc, item) => {
            acc[item.coverage_type] = (acc[item.coverage_type] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Calculate coverage rate (percentage of published releases that got coverage)
     */
    static calculateCoverageRate(pressReleases, coverage) {
        if (!pressReleases || !coverage) return 0;
        
        const publishedCount = pressReleases.filter(pr => pr.status === 'published').length;
        if (publishedCount === 0) return 0;
        
        const uniqueReleasesWithCoverage = new Set(coverage.map(item => item.press_release_id)).size;
        return Math.round((uniqueReleasesWithCoverage / publishedCount) * 100);
    }

    /**
     * Calculate average reach of coverage
     */
    static calculateAverageReach(coverage) {
        if (!coverage || coverage.length === 0) return 0;
        
        const totalReach = coverage.reduce((sum, item) => sum + (item.reach_estimate || 0), 0);
        return Math.round(totalReach / coverage.length);
    }

    /**
     * Calculate positive sentiment rate
     */
    static calculatePositiveSentimentRate(coverage) {
        if (!coverage || coverage.length === 0) return 0;
        
        const positiveCount = coverage.filter(item => item.sentiment === 'positive').length;
        return Math.round((positiveCount / coverage.length) * 100);
    }
}

module.exports = PressReleaseService;
