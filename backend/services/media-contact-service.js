const { supabase } = require('../config');

class MediaContactService {
    
    /**
     * Get media contacts with filtering and pagination
     */
    static async getMediaContacts({ outlet_type, relationship_status, beat_coverage, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('media_contacts')
                .select(`
                    *,
                    journalist:journalists(id, bio, expertise_areas, influence_score, response_rate)
                `)
                .order('last_name', { ascending: true });

            // Apply filters
            if (outlet_type) {
                query = query.eq('outlet_type', outlet_type);
            }
            
            if (relationship_status) {
                query = query.eq('relationship_status', relationship_status);
            }
            
            if (beat_coverage && beat_coverage.length > 0) {
                query = query.overlaps('beat_coverage', beat_coverage);
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
            console.error('Error in getMediaContacts:', error);
            throw error;
        }
    }

    /**
     * Get a specific media contact by ID
     */
    static async getMediaContactById(id) {
        try {
            const { data, error } = await supabase
                .from('media_contacts')
                .select(`
                    *,
                    journalist:journalists(id, bio, expertise_areas, writing_style, audience_size, influence_score, response_rate, average_response_time, preferred_topics),
                    outreach_attempts(id, attempt_type, method, content, sent_at, response_received, outcome)
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
            console.error('Error in getMediaContactById:', error);
            throw error;
        }
    }

    /**
     * Create a new media contact
     */
    static async createMediaContact(contactData) {
        try {
            // Validate required fields
            if (!contactData.first_name || !contactData.last_name || !contactData.email || !contactData.outlet_name) {
                throw new Error('First name, last name, email, and outlet name are required');
            }

            // Check if email already exists
            const { data: existingContact } = await supabase
                .from('media_contacts')
                .select('id')
                .eq('email', contactData.email)
                .single();

            if (existingContact) {
                throw new Error('A contact with this email already exists');
            }

            // Set default values
            const contact = {
                ...contactData,
                relationship_status: contactData.relationship_status || 'prospect',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('media_contacts')
                .insert([contact])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createMediaContact:', error);
            throw error;
        }
    }

    /**
     * Update an existing media contact
     */
    static async updateMediaContact(id, updateData) {
        try {
            // Validate the contact exists
            const existing = await this.getMediaContactById(id);
            if (!existing) {
                throw new Error('Media contact not found');
            }

            // Check email uniqueness if email is being updated
            if (updateData.email && updateData.email !== existing.email) {
                const { data: emailExists } = await supabase
                    .from('media_contacts')
                    .select('id')
                    .eq('email', updateData.email)
                    .neq('id', id)
                    .single();

                if (emailExists) {
                    throw new Error('A contact with this email already exists');
                }
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('media_contacts')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateMediaContact:', error);
            throw error;
        }
    }

    /**
     * Delete a media contact
     */
    static async deleteMediaContact(id) {
        try {
            // Check if contact exists
            const existing = await this.getMediaContactById(id);
            if (!existing) {
                throw new Error('Media contact not found');
            }

            // Check if contact has associated data
            const { data: outreachAttempts } = await supabase
                .from('outreach_attempts')
                .select('id')
                .eq('contact_id', id)
                .limit(1);

            if (outreachAttempts && outreachAttempts.length > 0) {
                throw new Error('Cannot delete contact with outreach history. Consider archiving instead.');
            }

            const { error } = await supabase
                .from('media_contacts')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteMediaContact:', error);
            throw error;
        }
    }

    /**
     * Update relationship status
     */
    static async updateRelationshipStatus(id, newStatus) {
        try {
            const validStatuses = ['prospect', 'contact', 'relationship', 'advocate'];
            if (!validStatuses.includes(newStatus)) {
                throw new Error('Invalid relationship status');
            }

            const updatePayload = {
                relationship_status: newStatus,
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('media_contacts')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateRelationshipStatus:', error);
            throw error;
        }
    }

    /**
     * Record contact interaction
     */
    static async recordContactInteraction(id, interactionData) {
        try {
            const { method, notes, outcome } = interactionData;
            
            // Update last contact date
            const updatePayload = {
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            if (notes) {
                updatePayload.notes = notes;
            }

            const { data, error } = await supabase
                .from('media_contacts')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Create outreach attempt record if method is provided
            if (method) {
                await this.createOutreachAttempt({
                    contact_id: id,
                    method,
                    notes,
                    outcome,
                    attempt_type: 'manual_contact'
                });
            }

            return data;
        } catch (error) {
            console.error('Error in recordContactInteraction:', error);
            throw error;
        }
    }

    /**
     * Create outreach attempt record
     */
    static async createOutreachAttempt(attemptData) {
        try {
            const attempt = {
                ...attemptData,
                sent_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('outreach_attempts')
                .insert([attempt])
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
     * Search media contacts
     */
    static async searchMediaContacts(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('media_contacts')
                .select(`
                    *,
                    journalist:journalists(id, influence_score, expertise_areas)
                `);

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    first_name.ilike.%${searchTerm}%,
                    last_name.ilike.%${searchTerm}%,
                    outlet_name.ilike.%${searchTerm}%,
                    beat_coverage.cs.{${searchTerm}}
                `);
            }

            // Apply filters
            if (filters.outlet_type) {
                query = query.eq('outlet_type', filters.outlet_type);
            }
            
            if (filters.relationship_status) {
                query = query.eq('relationship_status', filters.relationship_status);
            }
            
            if (filters.location) {
                query = query.ilike('location', `%${filters.location}%`);
            }

            // Apply influence score filter if journalist profile exists
            if (filters.min_influence) {
                query = query.gte('journalist.influence_score', filters.min_influence);
            }

            const { data, error } = await query
                .order('last_name', { ascending: true })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchMediaContacts:', error);
            throw error;
        }
    }

    /**
     * Get media contact insights and analytics
     */
    static async getContactInsights() {
        try {
            // Get contact counts by relationship status
            const { data: statusCounts, error: statusError } = await supabase
                .from('media_contacts')
                .select('relationship_status');

            if (statusError) throw statusError;

            // Get contact counts by outlet type
            const { data: outletCounts, error: outletError } = await supabase
                .from('media_contacts')
                .select('outlet_type');

            if (outletError) throw outletError;

            // Get recent outreach activity
            const { data: recentOutreach, error: outreachError } = await supabase
                .from('outreach_attempts')
                .select(`
                    *,
                    contact:media_contacts(id, first_name, last_name, outlet_name)
                `)
                .gte('sent_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
                .order('sent_at', { ascending: false })
                .limit(20);

            if (outreachError) throw outreachError;

            // Calculate insights
            const insights = {
                total_contacts: statusCounts?.length || 0,
                by_relationship_status: this.countByField(statusCounts, 'relationship_status'),
                by_outlet_type: this.countByField(outletCounts, 'outlet_type'),
                recent_activity: {
                    total_outreach: recentOutreach?.length || 0,
                    by_outcome: this.countByField(recentOutreach, 'outcome'),
                    by_method: this.countByField(recentOutreach, 'method')
                },
                top_outlets: this.getTopOutlets(outletCounts),
                relationship_distribution: this.calculateRelationshipDistribution(statusCounts)
            };

            return insights;
        } catch (error) {
            console.error('Error in getContactInsights:', error);
            throw error;
        }
    }

    /**
     * Get contacts by beat coverage
     */
    static async getContactsByBeat(beat) {
        try {
            const { data, error } = await supabase
                .from('media_contacts')
                .select(`
                    *,
                    journalist:journalists(id, influence_score, expertise_areas)
                `)
                .overlaps('beat_coverage', [beat])
                .order('journalist.influence_score', { ascending: false });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getContactsByBeat:', error);
            throw error;
        }
    }

    /**
     * Get high-value contacts (high influence, good relationship)
     */
    static async getHighValueContacts() {
        try {
            const { data, error } = await supabase
                .from('media_contacts')
                .select(`
                    *,
                    journalist:journalists(id, influence_score, response_rate)
                `)
                .in('relationship_status', ['relationship', 'advocate'])
                .gte('journalist.influence_score', 70)
                .order('journalist.influence_score', { ascending: false })
                .limit(20);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getHighValueContacts:', error);
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
     * Helper method to get top outlets
     */
    static getTopOutlets(outletCounts) {
        if (!outletCounts) return [];
        
        const outletMap = outletCounts.reduce((acc, item) => {
            const outlet = item.outlet_type || 'unknown';
            acc[outlet] = (acc[outlet] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(outletMap)
            .map(([outlet, count]) => ({ outlet, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }

    /**
     * Helper method to calculate relationship distribution
     */
    static calculateRelationshipDistribution(statusCounts) {
        if (!statusCounts || statusCounts.length === 0) return {};
        
        const total = statusCounts.length;
        const distribution = {};
        
        statusCounts.forEach(item => {
            const status = item.relationship_status || 'unknown';
            distribution[status] = (distribution[status] || 0) + 1;
        });

        // Convert to percentages
        Object.keys(distribution).forEach(status => {
            distribution[status] = Math.round((distribution[status] / total) * 100);
        });

        return distribution;
    }
}

module.exports = MediaContactService;
