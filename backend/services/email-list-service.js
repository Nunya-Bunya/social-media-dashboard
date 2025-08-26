const { supabase } = require('../config');

class EmailListService {
    
    /**
     * Get email lists with filtering and pagination
     */
    static async getEmailLists({ business_id, is_active, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('email_lists')
                .select(`
                    *,
                    list_subscribers(
                        subscriber_id,
                        status,
                        added_date,
                        subscriber:email_subscribers(
                            id, first_name, last_name, email, company, industry, status
                        )
                    )
                `)
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            // Apply filters
            if (is_active !== undefined) {
                query = query.eq('is_active', is_active);
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
            console.error('Error in getEmailLists:', error);
            throw error;
        }
    }

    /**
     * Get a specific email list by ID
     */
    static async getEmailListById(id) {
        try {
            const { data, error } = await supabase
                .from('email_lists')
                .select(`
                    *,
                    list_subscribers(
                        subscriber_id,
                        status,
                        added_date,
                        subscriber:email_subscribers(
                            id, first_name, last_name, email, company, industry, 
                            location, tags, status, engagement_score
                        )
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
            console.error('Error in getEmailListById:', error);
            throw error;
        }
    }

    /**
     * Create a new email list
     */
    static async createEmailList(listData) {
        try {
            // Validate required fields
            if (!listData.name) {
                throw new Error('List name is required');
            }

            // Set default values
            const list = {
                ...listData,
                subscriber_count: 0,
                is_active: listData.is_active !== undefined ? listData.is_active : true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_lists')
                .insert([list])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createEmailList:', error);
            throw error;
        }
    }

    /**
     * Update an existing email list
     */
    static async updateEmailList(id, updateData) {
        try {
            // Validate the list exists
            const existing = await this.getEmailListById(id);
            if (!existing) {
                throw new Error('Email list not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_lists')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateEmailList:', error);
            throw error;
        }
    }

    /**
     * Delete an email list
     */
    static async deleteEmailList(id) {
        try {
            // Check if list exists
            const existing = await this.getEmailListById(id);
            if (!existing) {
                throw new Error('Email list not found');
            }

            // Check if list has subscribers
            if (existing.list_subscribers && existing.list_subscribers.length > 0) {
                throw new Error('Cannot delete list with subscribers. Remove all subscribers first.');
            }

            const { error } = await supabase
                .from('email_lists')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteEmailList:', error);
            throw error;
        }
    }

    /**
     * Add subscribers to list
     */
    static async addSubscribersToList(listId, subscriberIds) {
        try {
            const results = {
                added: 0,
                already_exists: 0,
                errors: []
            };

            for (const subscriberId of subscriberIds) {
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
                        results.already_exists++;
                    } else {
                        // Add to list
                        const { error } = await supabase
                            .from('list_subscribers')
                            .insert([{
                                list_id: listId,
                                subscriber_id: subscriberId,
                                status: 'active',
                                added_date: new Date().toISOString()
                            }]);

                        if (error) throw error;
                        results.added++;
                    }
                } catch (error) {
                    results.errors.push({
                        subscriber_id: subscriberId,
                        error: error.message
                    });
                }
            }

            // Update list subscriber count
            await this.updateListSubscriberCount(listId);

            return results;
        } catch (error) {
            console.error('Error in addSubscribersToList:', error);
            throw error;
        }
    }

    /**
     * Remove subscribers from list
     */
    static async removeSubscribersFromList(listId, subscriberIds) {
        try {
            const results = {
                removed: 0,
                errors: []
            };

            for (const subscriberId of subscriberIds) {
                try {
                    const { error } = await supabase
                        .from('list_subscribers')
                        .update({ 
                            status: 'removed',
                            updated_at: new Date().toISOString()
                        })
                        .eq('list_id', listId)
                        .eq('subscriber_id', subscriberId);

                    if (error) throw error;
                    results.removed++;
                } catch (error) {
                    results.errors.push({
                        subscriber_id: subscriberId,
                        error: error.message
                    });
                }
            }

            // Update list subscriber count
            await this.updateListSubscriberCount(listId);

            return results;
        } catch (error) {
            console.error('Error in removeSubscribersFromList:', error);
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
     * Get list subscribers with pagination
     */
    static async getListSubscribers(listId, { status, page = 1, limit = 20 } = {}) {
        try {
            let query = supabase
                .from('list_subscribers')
                .select(`
                    *,
                    subscriber:email_subscribers(
                        id, first_name, last_name, email, company, industry, 
                        location, tags, status, engagement_score, subscription_date
                    )
                `)
                .eq('list_id', listId)
                .order('added_date', { ascending: false });

            // Apply filters
            if (status) {
                query = query.eq('status', status);
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
            console.error('Error in getListSubscribers:', error);
            throw error;
        }
    }

    /**
     * Search lists by criteria
     */
    static async searchLists(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('email_lists')
                .select(`
                    *,
                    list_subscribers(
                        subscriber_id,
                        status,
                        subscriber:email_subscribers(id, first_name, last_name, email)
                    )
                `);

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    name.ilike.%${searchTerm}%,
                    description.ilike.%${searchTerm}%
                `);
            }

            // Apply filters
            if (filters.business_id) {
                query = query.eq('business_id', filters.business_id);
            }
            
            if (filters.is_active !== undefined) {
                query = query.eq('is_active', filters.is_active);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchLists:', error);
            throw error;
        }
    }

    /**
     * Get list analytics
     */
    static async getListAnalytics(listId) {
        try {
            const list = await this.getEmailListById(listId);
            if (!list) {
                throw new Error('Email list not found');
            }

            const subscribers = list.list_subscribers || [];
            
            // Calculate analytics
            const analytics = {
                total_subscribers: subscribers.length,
                active_subscribers: subscribers.filter(s => s.status === 'active').length,
                removed_subscribers: subscribers.filter(s => s.status === 'removed').length,
                by_industry: this.countByIndustry(subscribers),
                by_location: this.countByLocation(subscribers),
                engagement_distribution: this.getEngagementDistribution(subscribers),
                subscription_trends: this.getSubscriptionTrends(subscribers),
                average_engagement: this.calculateAverageEngagement(subscribers)
            };

            return analytics;
        } catch (error) {
            console.error('Error in getListAnalytics:', error);
            throw error;
        }
    }

    /**
     * Duplicate a list
     */
    static async duplicateList(listId, newName) {
        try {
            const originalList = await this.getEmailListById(listId);
            if (!originalList) {
                throw new Error('Original list not found');
            }

            // Create new list
            const newList = {
                name: newName,
                description: `${originalList.description} (Copy)`,
                business_id: originalList.business_id,
                criteria: originalList.criteria,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data: createdList, error: createError } = await supabase
                .from('email_lists')
                .insert([newList])
                .select()
                .single();

            if (createError) throw createError;

            // Copy subscribers if any
            if (originalList.list_subscribers && originalList.list_subscribers.length > 0) {
                const subscriberIds = originalList.list_subscribers
                    .filter(s => s.status === 'active')
                    .map(s => s.subscriber_id);

                if (subscriberIds.length > 0) {
                    await this.addSubscribersToList(createdList.id, subscriberIds);
                }
            }

            return createdList;
        } catch (error) {
            console.error('Error in duplicateList:', error);
            throw error;
        }
    }

    /**
     * Merge lists
     */
    static async mergeLists(sourceListId, targetListId) {
        try {
            const sourceList = await this.getEmailListById(sourceListId);
            const targetList = await this.getEmailListById(targetListId);

            if (!sourceList || !targetList) {
                throw new Error('One or both lists not found');
            }

            if (sourceList.business_id !== targetList.business_id) {
                throw new Error('Cannot merge lists from different businesses');
            }

            // Get active subscribers from source list
            const sourceSubscribers = sourceList.list_subscribers
                .filter(s => s.status === 'active')
                .map(s => s.subscriber_id);

            // Add to target list
            const addResults = await this.addSubscribersToList(targetListId, sourceSubscribers);

            // Deactivate source list
            await this.updateEmailList(sourceListId, { is_active: false });

            return {
                source_list_id: sourceListId,
                target_list_id: targetListId,
                subscribers_moved: addResults.added,
                source_list_deactivated: true
            };
        } catch (error) {
            console.error('Error in mergeLists:', error);
            throw error;
        }
    }

    /**
     * Helper method to count by industry
     */
    static countByIndustry(subscribers) {
        if (!subscribers) return {};
        
        return subscribers.reduce((acc, item) => {
            const industry = item.subscriber?.industry || 'unknown';
            acc[industry] = (acc[industry] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by location
     */
    static countByLocation(subscribers) {
        if (!subscribers) return {};
        
        return subscribers.reduce((acc, item) => {
            const location = item.subscriber?.location || 'unknown';
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});
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
        
        subscribers.forEach(item => {
            const score = item.subscriber?.engagement_score || 0;
            if (score <= 20) distribution['0-20']++;
            else if (score <= 40) distribution['21-40']++;
            else if (score <= 60) distribution['41-60']++;
            else if (score <= 80) distribution['61-80']++;
            else distribution['81-100']++;
        });
        
        return distribution;
    }

    /**
     * Helper method to get subscription trends
     */
    static getSubscriptionTrends(subscribers) {
        if (!subscribers) return [];
        
        const trends = {};
        
        subscribers.forEach(item => {
            const date = item.added_date.split('T')[0];
            if (!trends[date]) {
                trends[date] = { total: 0, active: 0, removed: 0 };
            }
            
            trends[date].total++;
            if (item.status === 'active') trends[date].active++;
            else if (item.status === 'removed') trends[date].removed++;
        });
        
        return Object.entries(trends)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }

    /**
     * Helper method to calculate average engagement
     */
    static calculateAverageEngagement(subscribers) {
        if (!subscribers || subscribers.length === 0) return 0;
        
        const totalEngagement = subscribers.reduce((sum, item) => 
            sum + (item.subscriber?.engagement_score || 0), 0
        );
        
        return Math.round(totalEngagement / subscribers.length);
    }
}

module.exports = EmailListService;
