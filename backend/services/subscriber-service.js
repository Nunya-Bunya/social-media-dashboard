const { supabase } = require('../config');

class SubscriberService {
    
    /**
     * Get subscribers with filtering and pagination
     */
    static async getSubscribers({ business_id, status, tags, industry, location, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('email_subscribers')
                .select(`
                    *,
                    list_subscribers(
                        list_id,
                        status,
                        added_date,
                        email_list:email_lists(id, name, description)
                    )
                `)
                .order('created_at', { ascending: false });

            // Apply filters
            if (status) {
                query = query.eq('status', status);
            }
            
            if (tags && tags.length > 0) {
                query = query.overlaps('tags', tags);
            }
            
            if (industry) {
                query = query.eq('industry', industry);
            }
            
            if (location) {
                query = query.ilike('location', `%${location}%`);
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
            console.error('Error in getSubscribers:', error);
            throw error;
        }
    }

    /**
     * Get a specific subscriber by ID
     */
    static async getSubscriberById(id) {
        try {
            const { data, error } = await supabase
                .from('email_subscribers')
                .select(`
                    *,
                    list_subscribers(
                        list_id,
                        status,
                        added_date,
                        email_list:email_lists(id, name, description)
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
            console.error('Error in getSubscriberById:', error);
            throw error;
        }
    }

    /**
     * Get subscriber by email
     */
    static async getSubscriberByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('email_subscribers')
                .select('*')
                .eq('email', email)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return null; // Not found
                }
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in getSubscriberByEmail:', error);
            throw error;
        }
    }

    /**
     * Create a new subscriber
     */
    static async createSubscriber(subscriberData) {
        try {
            // Validate required fields
            if (!subscriberData.email) {
                throw new Error('Email is required');
            }

            // Check if email already exists
            const existingSubscriber = await this.getSubscriberByEmail(subscriberData.email);
            if (existingSubscriber) {
                throw new Error('A subscriber with this email already exists');
            }

            // Set default values
            const subscriber = {
                ...subscriberData,
                status: subscriberData.status || 'active',
                subscription_date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_subscribers')
                .insert([subscriber])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createSubscriber:', error);
            throw error;
        }
    }

    /**
     * Update an existing subscriber
     */
    static async updateSubscriber(id, updateData) {
        try {
            // Validate the subscriber exists
            const existing = await this.getSubscriberById(id);
            if (!existing) {
                throw new Error('Subscriber not found');
            }

            // Check email uniqueness if email is being updated
            if (updateData.email && updateData.email !== existing.email) {
                const emailExists = await this.getSubscriberByEmail(updateData.email);
                if (emailExists) {
                    throw new Error('A subscriber with this email already exists');
                }
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_subscribers')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateSubscriber:', error);
            throw error;
        }
    }

    /**
     * Delete a subscriber
     */
    static async deleteSubscriber(id) {
        try {
            // Check if subscriber exists
            const existing = await this.getSubscriberById(id);
            if (!existing) {
                throw new Error('Subscriber not found');
            }

            const { error } = await supabase
                .from('email_subscribers')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteSubscriber:', error);
            throw error;
        }
    }

    /**
     * Bulk import subscribers
     */
    static async bulkImportSubscribers(subscribers, listId = null) {
        try {
            const results = {
                total: subscribers.length,
                created: 0,
                updated: 0,
                errors: []
            };

            for (const subscriberData of subscribers) {
                try {
                    // Check if subscriber already exists
                    const existing = await this.getSubscriberByEmail(subscriberData.email);
                    
                    if (existing) {
                        // Update existing subscriber
                        await this.updateSubscriber(existing.id, subscriberData);
                        results.updated++;
                    } else {
                        // Create new subscriber
                        const newSubscriber = await this.createSubscriber(subscriberData);
                        results.created++;

                        // Add to list if specified
                        if (listId) {
                            await this.addSubscriberToList(newSubscriber.id, listId);
                        }
                    }
                } catch (error) {
                    results.errors.push({
                        email: subscriberData.email,
                        error: error.message
                    });
                }
            }

            return results;
        } catch (error) {
            console.error('Error in bulkImportSubscribers:', error);
            throw error;
        }
    }

    /**
     * Unsubscribe a subscriber
     */
    static async unsubscribeSubscriber(id, reason = null) {
        try {
            const subscriber = await this.getSubscriberById(id);
            if (!subscriber) {
                throw new Error('Subscriber not found');
            }

            // Update subscriber status
            const updatePayload = {
                status: 'unsubscribed',
                updated_at: new Date().toISOString()
            };

            if (reason) {
                updatePayload.unsubscribe_reason = reason;
            }

            const { data, error } = await supabase
                .from('email_subscribers')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Remove from all lists
            await this.removeSubscriberFromAllLists(id);

            return data;
        } catch (error) {
            console.error('Error in unsubscribeSubscriber:', error);
            throw error;
        }
    }

    /**
     * Resubscribe a subscriber
     */
    static async resubscribeSubscriber(id) {
        try {
            const subscriber = await this.getSubscriberById(id);
            if (!subscriber) {
                throw new Error('Subscriber not found');
            }

            const updatePayload = {
                status: 'active',
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_subscribers')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in resubscribeSubscriber:', error);
            throw error;
        }
    }

    /**
     * Add subscriber to list
     */
    static async addSubscriberToList(subscriberId, listId) {
        try {
            // Check if already in list
            const { data: existing } = await supabase
                .from('list_subscribers')
                .select('*')
                .eq('list_id', listId)
                .eq('subscriber_id', subscriberId)
                .single();

            if (existing) {
                // Update status to active if already exists
                const { error } = await supabase
                    .from('list_subscribers')
                    .update({ 
                        status: 'active',
                        updated_at: new Date().toISOString()
                    })
                    .eq('list_id', listId)
                    .eq('subscriber_id', subscriberId);

                if (error) throw error;
                return existing;
            }

            // Add to list
            const { data, error } = await supabase
                .from('list_subscribers')
                .insert([{
                    list_id: listId,
                    subscriber_id: subscriberId,
                    status: 'active',
                    added_date: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Update list subscriber count
            await this.updateListSubscriberCount(listId);

            return data;
        } catch (error) {
            console.error('Error in addSubscriberToList:', error);
            throw error;
        }
    }

    /**
     * Remove subscriber from list
     */
    static async removeSubscriberFromList(subscriberId, listId) {
        try {
            const { error } = await supabase
                .from('list_subscribers')
                .update({ 
                    status: 'removed',
                    updated_at: new Date().toISOString()
                })
                .eq('list_id', listId)
                .eq('subscriber_id', subscriberId);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Update list subscriber count
            await this.updateListSubscriberCount(listId);

            return true;
        } catch (error) {
            console.error('Error in removeSubscriberFromList:', error);
            throw error;
        }
    }

    /**
     * Remove subscriber from all lists
     */
    static async removeSubscriberFromAllLists(subscriberId) {
        try {
            const { error } = await supabase
                .from('list_subscribers')
                .update({ 
                    status: 'unsubscribed',
                    updated_at: new Date().toISOString()
                })
                .eq('subscriber_id', subscriberId);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in removeSubscriberFromAllLists:', error);
            throw error;
        }
    }

    /**
     * Update list subscriber count
     */
    static async updateListSubscriberCount(listId) {
        try {
            const { count, error } = await supabase
                .from('list_subscribers')
                .select('*', { count: 'exact', head: true })
                .eq('list_id', listId)
                .eq('status', 'active');

            if (error) throw error;

            const { error: updateError } = await supabase
                .from('email_lists')
                .update({ 
                    subscriber_count: count,
                    updated_at: new Date().toISOString()
                })
                .eq('id', listId);

            if (updateError) throw updateError;

            return count;
        } catch (error) {
            console.error('Error updating list subscriber count:', error);
            // Don't throw error as this is not critical
        }
    }

    /**
     * Search subscribers
     */
    static async searchSubscribers(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('email_subscribers')
                .select(`
                    *,
                    list_subscribers(
                        list_id,
                        status,
                        email_list:email_lists(id, name)
                    )
                `);

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    first_name.ilike.%${searchTerm}%,
                    last_name.ilike.%${searchTerm}%,
                    email.ilike.%${searchTerm}%,
                    company.ilike.%${searchTerm}%,
                    industry.ilike.%${searchTerm}%,
                    location.ilike.%${searchTerm}%
                `);
            }

            // Apply filters
            if (filters.status) {
                query = query.eq('status', filters.status);
            }
            
            if (filters.industry) {
                query = query.eq('industry', filters.industry);
            }
            
            if (filters.location) {
                query = query.ilike('location', `%${filters.location}%`);
            }

            if (filters.tags && filters.tags.length > 0) {
                query = query.overlaps('tags', filters.tags);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchSubscribers:', error);
            throw error;
        }
    }

    /**
     * Get subscriber analytics
     */
    static async getSubscriberAnalytics(businessId) {
        try {
            // Get subscriber counts by status
            const { data: statusCounts, error: statusError } = await supabase
                .from('email_subscribers')
                .select('status');

            if (statusError) throw statusError;

            // Get subscriber counts by industry
            const { data: industryCounts, error: industryError } = await supabase
                .from('email_subscribers')
                .select('industry');

            if (industryError) throw industryError;

            // Get subscription trends
            const { data: subscriptionTrends, error: trendsError } = await supabase
                .from('email_subscribers')
                .select('subscription_date, status')
                .gte('subscription_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
                .order('subscription_date', { ascending: true });

            if (trendsError) throw trendsError;

            // Calculate analytics
            const analytics = {
                total_subscribers: statusCounts?.length || 0,
                by_status: this.countByField(statusCounts, 'status'),
                by_industry: this.countByField(industryCounts, 'industry'),
                subscription_trends: this.calculateSubscriptionTrends(subscriptionTrends),
                growth_rate: this.calculateGrowthRate(subscriptionTrends),
                engagement_distribution: this.getEngagementDistribution(statusCounts)
            };

            return analytics;
        } catch (error) {
            console.error('Error in getSubscriberAnalytics:', error);
            throw error;
        }
    }

    /**
     * Helper method to count by field
     */
    static countByField(data, field) {
        if (!data) return {};
        
        return data.reduce((acc, item) => {
            const value = item[field] || 'unknown';
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to calculate subscription trends
     */
    static calculateSubscriptionTrends(subscriptions) {
        if (!subscriptions) return [];
        
        const trends = {};
        
        subscriptions.forEach(sub => {
            const date = sub.subscription_date.split('T')[0];
            if (!trends[date]) {
                trends[date] = { total: 0, active: 0, unsubscribed: 0 };
            }
            
            trends[date].total++;
            if (sub.status === 'active') trends[date].active++;
            else if (sub.status === 'unsubscribed') trends[date].unsubscribed++;
        });
        
        return Object.entries(trends)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }

    /**
     * Helper method to calculate growth rate
     */
    static calculateGrowthRate(subscriptions) {
        if (!subscriptions || subscriptions.length < 2) return 0;
        
        const recent = subscriptions.slice(-30).length;
        const previous = subscriptions.slice(-60, -30).length;
        
        if (previous === 0) return recent > 0 ? 100 : 0;
        
        return Math.round(((recent - previous) / previous) * 100);
    }

    /**
     * Helper method to get engagement distribution
     */
    static getEngagementDistribution(subscribers) {
        if (!subscribers) return {};
        
        const distribution = {
            '0-20': 0,
            '21-40': 0,
            '41-60': 0,
            '61-80': 0,
            '81-100': 0
        };
        
        subscribers.forEach(sub => {
            const score = sub.engagement_score || 0;
            if (score <= 20) distribution['0-20']++;
            else if (score <= 40) distribution['21-40']++;
            else if (score <= 60) distribution['41-60']++;
            else if (score <= 80) distribution['61-80']++;
            else distribution['81-100']++;
        });
        
        return distribution;
    }
}

module.exports = SubscriberService;
