const { supabase } = require('../config');

class JournalistService {
    
    /**
     * Get journalists with filtering and pagination
     */
    static async getJournalists({ expertise, influence_min, influence_max, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('journalists')
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type, 
                        beat_coverage, location, relationship_status
                    )
                `)
                .order('influence_score', { ascending: false });

            // Apply filters
            if (expertise) {
                query = query.overlaps('expertise_areas', [expertise]);
            }
            
            if (influence_min) {
                query = query.gte('influence_score', influence_min);
            }
            
            if (influence_max) {
                query = query.lte('influence_score', influence_max);
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
            console.error('Error in getJournalists:', error);
            throw error;
        }
    }

    /**
     * Get a specific journalist by ID
     */
    static async getJournalistById(id) {
        try {
            const { data, error } = await supabase
                .from('journalists')
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type, 
                        beat_coverage, location, relationship_status, notes, social_media
                    ),
                    outreach_attempts(
                        id, attempt_type, method, content, sent_at, 
                        response_received, response_content, outcome
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
            console.error('Error in getJournalistById:', error);
            throw error;
        }
    }

    /**
     * Create a new journalist profile
     */
    static async createJournalist(journalistData) {
        try {
            // Validate required fields
            if (!journalistData.contact_id) {
                throw new Error('Contact ID is required');
            }

            // Check if journalist profile already exists for this contact
            const { data: existingProfile } = await supabase
                .from('journalists')
                .select('id')
                .eq('contact_id', journalistData.contact_id)
                .single();

            if (existingProfile) {
                throw new Error('Journalist profile already exists for this contact');
            }

            // Set default values
            const journalist = {
                ...journalistData,
                influence_score: journalistData.influence_score || 50,
                response_rate: journalistData.response_rate || 0,
                average_response_time: journalistData.average_response_time || 0,
                blacklisted: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('journalists')
                .insert([journalist])
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type
                    )
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createJournalist:', error);
            throw error;
        }
    }

    /**
     * Update an existing journalist profile
     */
    static async updateJournalist(id, updateData) {
        try {
            // Validate the journalist exists
            const existing = await this.getJournalistById(id);
            if (!existing) {
                throw new Error('Journalist profile not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('journalists')
                .update(updatePayload)
                .eq('id', id)
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type
                    )
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateJournalist:', error);
            throw error;
        }
    }

    /**
     * Update influence score based on recent activity
     */
    static async updateInfluenceScore(id) {
        try {
            const journalist = await this.getJournalistById(id);
            if (!journalist) {
                throw new Error('Journalist profile not found');
            }

            // Calculate new influence score based on various factors
            let newScore = 50; // Base score

            // Factor 1: Response rate (0-25 points)
            const responseRate = journalist.response_rate || 0;
            newScore += Math.round((responseRate / 100) * 25);

            // Factor 2: Recent coverage (0-15 points)
            const recentCoverage = await this.getRecentCoverageCount(journalist.contact_id);
            newScore += Math.min(recentCoverage * 3, 15);

            // Factor 3: Outlet prestige (0-10 points)
            const outletPrestige = this.calculateOutletPrestige(journalist.contact?.outlet_type);
            newScore += outletPrestige;

            // Ensure score is within bounds
            newScore = Math.max(1, Math.min(100, newScore));

            // Update the score
            const { data, error } = await supabase
                .from('journalists')
                .update({ 
                    influence_score: newScore,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateInfluenceScore:', error);
            throw error;
        }
    }

    /**
     * Update response metrics after outreach attempt
     */
    static async updateResponseMetrics(id, responseData) {
        try {
            const { response_received, response_time } = responseData;
            const journalist = await this.getJournalistById(id);
            
            if (!journalist) {
                throw new Error('Journalist profile not found');
            }

            let newResponseRate = journalist.response_rate || 0;
            let newAverageResponseTime = journalist.average_response_time || 0;

            if (response_received) {
                // Calculate new response rate
                const totalAttempts = await this.getTotalOutreachAttempts(journalist.contact_id);
                const successfulAttempts = await this.getSuccessfulOutreachAttempts(journalist.contact_id);
                newResponseRate = Math.round((successfulAttempts / totalAttempts) * 100);

                // Update average response time
                if (response_time) {
                    const currentTotal = (journalist.average_response_time || 0) * (successfulAttempts - 1);
                    newAverageResponseTime = Math.round((currentTotal + response_time) / successfulAttempts);
                }
            }

            const updatePayload = {
                response_rate: newResponseRate,
                average_response_time: newAverageResponseTime,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('journalists')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateResponseMetrics:', error);
            throw error;
        }
    }

    /**
     * Get journalists by expertise area
     */
    static async getJournalistsByExpertise(expertise) {
        try {
            const { data, error } = await supabase
                .from('journalists')
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type, 
                        beat_coverage, location, relationship_status
                    )
                `)
                .overlaps('expertise_areas', [expertise])
                .order('influence_score', { ascending: false });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getJournalistsByExpertise:', error);
            throw error;
        }
    }

    /**
     * Get top journalists by influence score
     */
    static async getTopJournalists(limit = 20) {
        try {
            const { data, error } = await supabase
                .from('journalists')
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type
                    )
                `)
                .gte('influence_score', 70)
                .order('influence_score', { ascending: false })
                .limit(limit);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getTopJournalists:', error);
            throw error;
        }
    }

    /**
     * Search journalists by various criteria
     */
    static async searchJournalists(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('journalists')
                .select(`
                    *,
                    contact:media_contacts(
                        id, first_name, last_name, email, outlet_name, outlet_type, 
                        beat_coverage, location
                    )
                `);

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    expertise_areas.cs.{${searchTerm}},
                    preferred_topics.cs.{${searchTerm}},
                    contact.beat_coverage.cs.{${searchTerm}}
                `);
            }

            // Apply filters
            if (filters.min_influence) {
                query = query.gte('influence_score', filters.min_influence);
            }
            
            if (filters.max_influence) {
                query = query.lte('influence_score', filters.max_influence);
            }
            
            if (filters.writing_style) {
                query = query.eq('writing_style', filters.writing_style);
            }
            
            if (filters.audience_size) {
                query = query.eq('audience_size', filters.audience_size);
            }

            const { data, error } = await query
                .order('influence_score', { ascending: false })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchJournalists:', error);
            throw error;
        }
    }

    /**
     * Get journalist analytics and insights
     */
    static async getJournalistInsights() {
        try {
            // Get all journalists with basic stats
            const { data: journalists, error } = await supabase
                .from('journalists')
                .select('*');

            if (error) throw error;

            if (!journalists || journalists.length === 0) {
                return {
                    total_journalists: 0,
                    average_influence_score: 0,
                    expertise_distribution: {},
                    writing_style_distribution: {},
                    audience_size_distribution: {}
                };
            }

            // Calculate insights
            const insights = {
                total_journalists: journalists.length,
                average_influence_score: Math.round(
                    journalists.reduce((sum, j) => sum + (j.influence_score || 0), 0) / journalists.length
                ),
                expertise_distribution: this.getExpertiseDistribution(journalists),
                writing_style_distribution: this.getWritingStyleDistribution(journalists),
                audience_size_distribution: this.getAudienceSizeDistribution(journalists),
                influence_score_ranges: this.getInfluenceScoreRanges(journalists),
                top_expertise_areas: this.getTopExpertiseAreas(journalists)
            };

            return insights;
        } catch (error) {
            console.error('Error in getJournalistInsights:', error);
            throw error;
        }
    }

    /**
     * Helper method to get recent coverage count
     */
    static async getRecentCoverageCount(contactId) {
        try {
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            
            const { data, error } = await supabase
                .from('media_coverage')
                .select('id')
                .eq('author_id', contactId)
                .gte('publish_date', thirtyDaysAgo.toISOString());

            if (error) throw error;
            return data?.length || 0;
        } catch (error) {
            console.error('Error getting recent coverage count:', error);
            return 0;
        }
    }

    /**
     * Helper method to get total outreach attempts
     */
    static async getTotalOutreachAttempts(contactId) {
        try {
            const { data, error } = await supabase
                .from('outreach_attempts')
                .select('id')
                .eq('contact_id', contactId);

            if (error) throw error;
            return data?.length || 0;
        } catch (error) {
            console.error('Error getting total outreach attempts:', error);
            return 0;
        }
    }

    /**
     * Helper method to get successful outreach attempts
     */
    static async getSuccessfulOutreachAttempts(contactId) {
        try {
            const { data, error } = await supabase
                .from('outreach_attempts')
                .select('id')
                .eq('contact_id', contactId)
                .in('outcome', ['interested', 'coverage_secured']);

            if (error) throw error;
            return data?.length || 0;
        } catch (error) {
            console.error('Error getting successful outreach attempts:', error);
            return 0;
        }
    }

    /**
     * Helper method to calculate outlet prestige
     */
    static calculateOutletPrestige(outletType) {
        const prestigeMap = {
            'newspaper': 8,
            'magazine': 7,
            'tv': 9,
            'radio': 6,
            'online': 5,
            'blog': 3
        };
        
        return prestigeMap[outletType] || 5;
    }

    /**
     * Helper method to get expertise distribution
     */
    static getExpertiseDistribution(journalists) {
        const distribution = {};
        
        journalists.forEach(journalist => {
            if (journalist.expertise_areas) {
                journalist.expertise_areas.forEach(area => {
                    distribution[area] = (distribution[area] || 0) + 1;
                });
            }
        });
        
        return distribution;
    }

    /**
     * Helper method to get writing style distribution
     */
    static getWritingStyleDistribution(journalists) {
        return journalists.reduce((acc, j) => {
            const style = j.writing_style || 'unknown';
            acc[style] = (acc[style] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to get audience size distribution
     */
    static getAudienceSizeDistribution(journalists) {
        return journalists.reduce((acc, j) => {
            const size = j.audience_size || 'unknown';
            acc[size] = (acc[size] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to get influence score ranges
     */
    static getInfluenceScoreRanges(journalists) {
        const ranges = {
            '1-20': 0,
            '21-40': 0,
            '41-60': 0,
            '61-80': 0,
            '81-100': 0
        };
        
        journalists.forEach(journalist => {
            const score = journalist.influence_score || 0;
            if (score <= 20) ranges['1-20']++;
            else if (score <= 40) ranges['21-40']++;
            else if (score <= 60) ranges['41-60']++;
            else if (score <= 80) ranges['61-80']++;
            else ranges['81-100']++;
        });
        
        return ranges;
    }

    /**
     * Helper method to get top expertise areas
     */
    static getTopExpertiseAreas(journalists) {
        const expertiseCounts = {};
        
        journalists.forEach(journalist => {
            if (journalist.expertise_areas) {
                journalist.expertise_areas.forEach(area => {
                    expertiseCounts[area] = (expertiseCounts[area] || 0) + 1;
                });
            }
        });
        
        return Object.entries(expertiseCounts)
            .map(([area, count]) => ({ area, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }
}

module.exports = JournalistService;
