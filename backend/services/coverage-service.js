const { supabase } = require('../config');

class CoverageService {
    
    /**
     * Get media coverage with filtering and pagination
     */
    static async getMediaCoverage({ press_release_id, sentiment, coverage_type, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id, status)
                `)
                .order('publish_date', { ascending: false });

            // Apply filters
            if (press_release_id) {
                query = query.eq('press_release_id', press_release_id);
            }
            
            if (sentiment) {
                query = query.eq('sentiment', sentiment);
            }
            
            if (coverage_type) {
                query = query.eq('coverage_type', coverage_type);
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
            console.error('Error in getMediaCoverage:', error);
            throw error;
        }
    }

    /**
     * Get a specific media coverage entry by ID
     */
    static async getCoverageById(id) {
        try {
            const { data, error } = await supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id, status, content)
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
            console.error('Error in getCoverageById:', error);
            throw error;
        }
    }

    /**
     * Add new media coverage
     */
    static async addMediaCoverage(coverageData) {
        try {
            // Validate required fields
            if (!coverageData.outlet_name || !coverageData.coverage_type) {
                throw new Error('Outlet name and coverage type are required');
            }

            // Set default values
            const coverage = {
                ...coverageData,
                sentiment: coverageData.sentiment || 'neutral',
                impact_score: coverageData.impact_score || this.calculateImpactScore(coverageData),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('media_coverage')
                .insert([coverage])
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
            console.error('Error in addMediaCoverage:', error);
            throw error;
        }
    }

    /**
     * Update media coverage
     */
    static async updateCoverage(id, updateData) {
        try {
            // Validate the coverage exists
            const existing = await this.getCoverageById(id);
            if (!existing) {
                throw new Error('Media coverage not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            // Recalculate impact score if relevant fields changed
            if (updateData.sentiment || updateData.reach_estimate || updateData.coverage_type) {
                updatePayload.impact_score = this.calculateImpactScore({
                    ...existing,
                    ...updateData
                });
            }

            const { data, error } = await supabase
                .from('media_coverage')
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
            console.error('Error in updateCoverage:', error);
            throw error;
        }
    }

    /**
     * Delete media coverage
     */
    static async deleteCoverage(id) {
        try {
            // Check if coverage exists
            const existing = await this.getCoverageById(id);
            if (!existing) {
                throw new Error('Media coverage not found');
            }

            const { error } = await supabase
                .from('media_coverage')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteCoverage:', error);
            throw error;
        }
    }

    /**
     * Get coverage analytics for a business
     */
    static async getCoverageAnalytics(businessId, dateRange = '30d') {
        try {
            const endDate = new Date();
            const startDate = new Date();
            
            // Calculate start date based on range
            switch (dateRange) {
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

            // Get coverage data for the business
            const { data: coverageData, error } = await supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `)
                .eq('press_release.business_id', businessId)
                .gte('publish_date', startDate.toISOString())
                .lte('publish_date', endDate.toISOString());

            if (error) throw error;

            // Calculate analytics
            const analytics = {
                period: dateRange,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                total_coverage: coverageData?.length || 0,
                by_sentiment: this.countBySentiment(coverageData),
                by_type: this.countByCoverageType(coverageData),
                by_outlet: this.countByOutlet(coverageData),
                total_reach: coverageData?.reduce((sum, item) => sum + (item.reach_estimate || 0), 0) || 0,
                average_impact_score: this.calculateAverageImpactScore(coverageData),
                top_performing_coverage: this.getTopPerformingCoverage(coverageData),
                sentiment_trends: this.calculateSentimentTrends(coverageData),
                reach_distribution: this.calculateReachDistribution(coverageData)
            };

            return analytics;
        } catch (error) {
            console.error('Error in getCoverageAnalytics:', error);
            throw error;
        }
    }

    /**
     * Search media coverage
     */
    static async searchCoverage(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `);

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    headline.ilike.%${searchTerm}%,
                    outlet_name.ilike.%${searchTerm}%,
                    author.ilike.%${searchTerm}%
                `);
            }

            // Apply filters
            if (filters.sentiment) {
                query = query.eq('sentiment', filters.sentiment);
            }
            
            if (filters.coverage_type) {
                query = query.eq('coverage_type', filters.coverage_type);
            }
            
            if (filters.min_reach) {
                query = query.gte('reach_estimate', filters.min_reach);
            }
            
            if (filters.max_reach) {
                query = query.lte('reach_estimate', filters.max_reach);
            }

            if (filters.start_date) {
                query = query.gte('publish_date', filters.start_date);
            }
            
            if (filters.end_date) {
                query = query.lte('publish_date', filters.end_date);
            }

            const { data, error } = await query
                .order('publish_date', { ascending: false })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchCoverage:', error);
            throw error;
        }
    }

    /**
     * Get coverage insights and trends
     */
    static async getCoverageInsights(businessId) {
        try {
            // Get recent coverage data
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            
            const { data: recentCoverage, error } = await supabase
                .from('media_coverage')
                .select(`
                    *,
                    press_release:press_releases(id, title, business_id)
                `)
                .eq('press_release.business_id', businessId)
                .gte('publish_date', thirtyDaysAgo.toISOString())
                .order('publish_date', { ascending: false });

            if (error) throw error;

            // Calculate insights
            const insights = {
                recent_coverage_count: recentCoverage?.length || 0,
                sentiment_distribution: this.countBySentiment(recentCoverage),
                coverage_type_distribution: this.countByCoverageType(recentCoverage),
                top_outlets: this.getTopOutlets(recentCoverage),
                average_reach: this.calculateAverageReach(recentCoverage),
                impact_score_distribution: this.getImpactScoreDistribution(recentCoverage),
                coverage_timeline: this.getCoverageTimeline(recentCoverage)
            };

            return insights;
        } catch (error) {
            console.error('Error in getCoverageInsights:', error);
            throw error;
        }
    }

    /**
     * Calculate impact score for coverage
     */
    static calculateImpactScore(coverageData) {
        let score = 50; // Base score

        // Factor 1: Sentiment (0-20 points)
        const sentimentScores = {
            'positive': 20,
            'negative': 0,
            'neutral': 10,
            'mixed': 15
        };
        score += sentimentScores[coverageData.sentiment] || 10;

        // Factor 2: Coverage type (0-15 points)
        const typeScores = {
            'mention': 5,
            'quote': 10,
            'feature': 15,
            'interview': 12,
            'op_ed': 8
        };
        score += typeScores[coverageData.coverage_type] || 5;

        // Factor 3: Reach (0-15 points)
        if (coverageData.reach_estimate) {
            const reach = coverageData.reach_estimate;
            if (reach >= 1000000) score += 15; // 1M+
            else if (reach >= 100000) score += 12; // 100K+
            else if (reach >= 10000) score += 8; // 10K+
            else if (reach >= 1000) score += 4; // 1K+
        }

        return Math.max(1, Math.min(100, score));
    }

    /**
     * Helper method to count by sentiment
     */
    static countBySentiment(coverage) {
        if (!coverage) return {};
        
        return coverage.reduce((acc, item) => {
            const sentiment = item.sentiment || 'unknown';
            acc[sentiment] = (acc[sentiment] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by coverage type
     */
    static countByCoverageType(coverage) {
        if (!coverage) return {};
        
        return coverage.reduce((acc, item) => {
            const type = item.coverage_type || 'unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to count by outlet
     */
    static countByOutlet(coverage) {
        if (!coverage) return {};
        
        return coverage.reduce((acc, item) => {
            const outlet = item.outlet_name || 'unknown';
            acc[outlet] = (acc[outlet] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Helper method to calculate average impact score
     */
    static calculateAverageImpactScore(coverage) {
        if (!coverage || coverage.length === 0) return 0;
        
        const totalScore = coverage.reduce((sum, item) => sum + (item.impact_score || 0), 0);
        return Math.round(totalScore / coverage.length);
    }

    /**
     * Helper method to get top performing coverage
     */
    static getTopPerformingCoverage(coverage, limit = 10) {
        if (!coverage) return [];
        
        return coverage
            .filter(item => item.impact_score)
            .sort((a, b) => (b.impact_score || 0) - (a.impact_score || 0))
            .slice(0, limit)
            .map(item => ({
                id: item.id,
                headline: item.headline,
                outlet: item.outlet_name,
                impact_score: item.impact_score,
                reach: item.reach_estimate,
                sentiment: item.sentiment,
                publish_date: item.publish_date
            }));
    }

    /**
     * Helper method to calculate sentiment trends
     */
    static calculateSentimentTrends(coverage) {
        if (!coverage) return [];
        
        // Group by week and calculate sentiment distribution
        const weeklyData = {};
        
        coverage.forEach(item => {
            const date = new Date(item.publish_date);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekKey = weekStart.toISOString().split('T')[0];
            
            if (!weeklyData[weekKey]) {
                weeklyData[weekKey] = { positive: 0, negative: 0, neutral: 0, mixed: 0 };
            }
            
            const sentiment = item.sentiment || 'neutral';
            weeklyData[weekKey][sentiment]++;
        });
        
        return Object.entries(weeklyData)
            .map(([week, sentiments]) => ({
                week,
                sentiments,
                total: Object.values(sentiments).reduce((sum, count) => sum + count, 0)
            }))
            .sort((a, b) => a.week.localeCompare(b.week));
    }

    /**
     * Helper method to calculate reach distribution
     */
    static calculateReachDistribution(coverage) {
        if (!coverage) return {};
        
        const distribution = {
            '0-1K': 0,
            '1K-10K': 0,
            '10K-100K': 0,
            '100K-1M': 0,
            '1M+': 0
        };
        
        coverage.forEach(item => {
            const reach = item.reach_estimate || 0;
            if (reach < 1000) distribution['0-1K']++;
            else if (reach < 10000) distribution['1K-10K']++;
            else if (reach < 100000) distribution['10K-100K']++;
            else if (reach < 1000000) distribution['100K-1M']++;
            else distribution['1M+']++;
        });
        
        return distribution;
    }

    /**
     * Helper method to get top outlets
     */
    static getTopOutlets(coverage, limit = 10) {
        if (!coverage) return [];
        
        const outletCounts = this.countByOutlet(coverage);
        
        return Object.entries(outletCounts)
            .map(([outlet, count]) => ({ outlet, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }

    /**
     * Helper method to get impact score distribution
     */
    static getImpactScoreDistribution(coverage) {
        if (!coverage) return {};
        
        const distribution = {
            '1-20': 0,
            '21-40': 0,
            '41-60': 0,
            '61-80': 0,
            '81-100': 0
        };
        
        coverage.forEach(item => {
            const score = item.impact_score || 0;
            if (score <= 20) distribution['1-20']++;
            else if (score <= 40) distribution['21-40']++;
            else if (score <= 60) distribution['41-60']++;
            else if (score <= 80) distribution['61-80']++;
            else distribution['81-100']++;
        });
        
        return distribution;
    }

    /**
     * Helper method to get coverage timeline
     */
    static getCoverageTimeline(coverage) {
        if (!coverage) return [];
        
        const timeline = {};
        
        coverage.forEach(item => {
            const date = item.publish_date.split('T')[0];
            if (!timeline[date]) {
                timeline[date] = { count: 0, total_reach: 0, avg_impact: 0 };
            }
            
            timeline[date].count++;
            timeline[date].total_reach += item.reach_estimate || 0;
        });
        
        // Calculate average impact for each date
        Object.keys(timeline).forEach(date => {
            const dateCoverage = coverage.filter(item => 
                item.publish_date.startsWith(date)
            );
            const totalImpact = dateCoverage.reduce((sum, item) => 
                sum + (item.impact_score || 0), 0
            );
            timeline[date].avg_impact = Math.round(totalImpact / dateCoverage.length);
        });
        
        return Object.entries(timeline)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }

    /**
     * Helper method to calculate average reach
     */
    static calculateAverageReach(coverage) {
        if (!coverage || coverage.length === 0) return 0;
        
        const totalReach = coverage.reduce((sum, item) => sum + (item.reach_estimate || 0), 0);
        return Math.round(totalReach / coverage.length);
    }
}

module.exports = CoverageService;
