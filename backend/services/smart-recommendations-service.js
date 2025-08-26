const { supabase } = require('../config');

class SmartRecommendationsService {
    
    /**
     * Get recommendations with filtering and pagination
     */
    static async getRecommendations({ business_id, recommendation_type, category, status, priority, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('smart_recommendations')
                .select(`
                    *,
                    source_insights:ai_insights(
                        id, title, insight_type, category, confidence_score
                    )
                `)
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            // Apply filters
            if (recommendation_type) {
                query = query.eq('recommendation_type', recommendation_type);
            }
            
            if (category) {
                query = query.eq('category', category);
            }
            
            if (status) {
                query = query.eq('status', status);
            }
            
            if (priority) {
                query = query.eq('priority', priority);
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
            console.error('Error in getRecommendations:', error);
            throw error;
        }
    }

    /**
     * Get a specific recommendation by ID
     */
    static async getRecommendationById(id) {
        try {
            const { data, error } = await supabase
                .from('smart_recommendations')
                .select(`
                    *,
                    source_insights:ai_insights(
                        id, title, insight_type, category, confidence_score, insight_data
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
            console.error('Error in getRecommendationById:', error);
            throw error;
        }
    }

    /**
     * Generate new recommendations
     */
    static async generateRecommendations({ business_id, recommendation_types, data_sources, analysis_period }) {
        try {
            const recommendations = [];

            // Generate recommendations for each requested type
            for (const recommendationType of recommendation_types || ['content_idea', 'posting_time', 'audience_targeting']) {
                const recommendation = await this.generateRecommendationByType(
                    business_id,
                    recommendationType,
                    data_sources,
                    analysis_period
                );
                
                if (recommendation) {
                    recommendations.push(recommendation);
                }
            }

            return recommendations;
        } catch (error) {
            console.error('Error in generateRecommendations:', error);
            throw error;
        }
    }

    /**
     * Generate recommendation by specific type
     */
    static async generateRecommendationByType(business_id, recommendation_type, data_sources, analysis_period) {
        try {
            let recommendation = null;

            switch (recommendation_type) {
                case 'content_idea':
                    recommendation = await this.generateContentIdeaRecommendation(business_id, data_sources, analysis_period);
                    break;
                case 'posting_time':
                    recommendation = await this.generatePostingTimeRecommendation(business_id, data_sources, analysis_period);
                    break;
                case 'audience_targeting':
                    recommendation = await this.generateAudienceTargetingRecommendation(business_id, data_sources, analysis_period);
                    break;
                case 'hashtag_suggestion':
                    recommendation = await this.generateHashtagSuggestionRecommendation(business_id, data_sources, analysis_period);
                    break;
                case 'content_format':
                    recommendation = await this.generateContentFormatRecommendation(business_id, data_sources, analysis_period);
                    break;
                case 'engagement_strategy':
                    recommendation = await this.generateEngagementStrategyRecommendation(business_id, data_sources, analysis_period);
                    break;
                default:
                    console.warn(`Unknown recommendation type: ${recommendation_type}`);
                    return null;
            }

            if (recommendation) {
                // Save recommendation to database
                const savedRecommendation = await this.saveRecommendation(business_id, recommendation);
                return savedRecommendation;
            }

            return null;
        } catch (error) {
            console.error(`Error generating ${recommendation_type} recommendation:`, error);
            return null;
        }
    }

    /**
     * Generate content idea recommendation
     */
    static async generateContentIdeaRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze content performance and trends
            const contentData = await this.analyzeContentPerformance(business_id, analysis_period);
            const trendData = await this.analyzeTrendData(business_id, analysis_period);
            
            if (!contentData || contentData.length === 0) {
                return null;
            }

            // Generate content ideas based on performance and trends
            const contentIdeas = this.generateContentIdeas(contentData, trendData);
            
            if (contentIdeas.length === 0) {
                return null;
            }

            // Calculate confidence and impact scores
            const confidenceScore = this.calculateConfidenceScore([contentData, trendData], 'content_idea');
            const impactScore = this.calculateImpactScore(contentIdeas);

            return {
                recommendation_type: 'content_idea',
                category: 'content',
                title: 'Content Ideas for Better Engagement',
                description: `Based on ${analysis_period} performance analysis, here are ${contentIdeas.length} content ideas to improve engagement.`,
                recommendation_data: {
                    ideas: contentIdeas,
                    performance_insights: contentData,
                    trend_analysis: trendData,
                    analysis_period: analysis_period
                },
                reasoning: this.generateContentIdeaReasoning(contentData, trendData),
                expected_impact: {
                    engagement_increase: '15-25%',
                    reach_improvement: '20-30%',
                    audience_growth: '10-15%',
                    timeframe: '2-4 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [], // Will be populated when insights are linked
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating content idea recommendation:', error);
            return null;
        }
    }

    /**
     * Generate posting time recommendation
     */
    static async generatePostingTimeRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze audience behavior and engagement patterns
            const audienceData = await this.analyzeAudienceBehavior(business_id, analysis_period);
            const engagementData = await this.analyzeEngagementPatterns(business_id, analysis_period);
            
            if (!audienceData || audienceData.length === 0) {
                return null;
            }

            // Find optimal posting times
            const optimalTimes = this.findOptimalPostingTimes(audienceData, engagementData);
            
            if (optimalTimes.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore([audienceData, engagementData], 'posting_time');
            const impactScore = this.calculateImpactScore(optimalTimes);

            return {
                recommendation_type: 'posting_time',
                category: 'timing',
                title: 'Optimal Posting Times Identified',
                description: `Analysis of ${analysis_period} audience behavior reveals ${optimalTimes.length} optimal posting times for maximum engagement.`,
                recommendation_data: {
                    optimal_times: optimalTimes,
                    audience_behavior: audienceData,
                    engagement_patterns: engagementData,
                    analysis_period: analysis_period
                },
                reasoning: this.generatePostingTimeReasoning(audienceData, engagementData),
                expected_impact: {
                    engagement_increase: '20-35%',
                    reach_improvement: '25-40%',
                    audience_retention: '15-25%',
                    timeframe: '1-2 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating posting time recommendation:', error);
            return null;
        }
    }

    /**
     * Generate audience targeting recommendation
     */
    static async generateAudienceTargetingRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze audience demographics and behavior
            const audienceData = await this.analyzeAudienceDemographics(business_id, analysis_period);
            const behaviorData = await this.analyzeAudienceBehavior(business_id, analysis_period);
            
            if (!audienceData || audienceData.length === 0) {
                return null;
            }

            // Find targeting opportunities
            const targetingOpportunities = this.findTargetingOpportunities(audienceData, behaviorData);
            
            if (targetingOpportunities.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore([audienceData, behaviorData], 'audience_targeting');
            const impactScore = this.calculateImpactScore(targetingOpportunities);

            return {
                recommendation_type: 'audience_targeting',
                category: 'audience',
                title: 'Audience Targeting Opportunities',
                description: `Analysis of ${analysis_period} audience data reveals ${targetingOpportunities.length} targeting opportunities for better engagement.`,
                recommendation_data: {
                    opportunities: targetingOpportunities,
                    audience_demographics: audienceData,
                    behavior_patterns: behaviorData,
                    analysis_period: analysis_period
                },
                reasoning: this.generateAudienceTargetingReasoning(audienceData, behaviorData),
                expected_impact: {
                    engagement_increase: '25-40%',
                    audience_quality: '30-50%',
                    conversion_improvement: '20-35%',
                    timeframe: '3-6 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating audience targeting recommendation:', error);
            return null;
        }
    }

    /**
     * Generate hashtag suggestion recommendation
     */
    static async generateHashtagSuggestionRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze hashtag performance and trending topics
            const hashtagData = await this.analyzeHashtagPerformance(business_id, analysis_period);
            const trendingData = await this.analyzeTrendingTopics(business_id, analysis_period);
            
            if (!hashtagData || hashtagData.length === 0) {
                return null;
            }

            // Generate hashtag suggestions
            const hashtagSuggestions = this.generateHashtagSuggestions(hashtagData, trendingData);
            
            if (hashtagSuggestions.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore([hashtagData, trendingData], 'hashtag_suggestion');
            const impactScore = this.calculateImpactScore(hashtagSuggestions);

            return {
                recommendation_type: 'hashtag_suggestion',
                category: 'content',
                title: 'High-Performing Hashtag Suggestions',
                description: `Analysis of ${analysis_period} hashtag performance reveals ${hashtagSuggestions.length} high-performing hashtags for better reach.`,
                recommendation_data: {
                    suggestions: hashtagSuggestions,
                    hashtag_performance: hashtagData,
                    trending_topics: trendingData,
                    analysis_period: analysis_period
                },
                reasoning: this.generateHashtagSuggestionReasoning(hashtagData, trendingData),
                expected_impact: {
                    reach_increase: '30-50%',
                    engagement_improvement: '20-30%',
                    audience_discovery: '25-40%',
                    timeframe: '1-3 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating hashtag suggestion recommendation:', error);
            return null;
        }
    }

    /**
     * Generate content format recommendation
     */
    static async generateContentFormatRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze content format performance
            const formatData = await this.analyzeContentFormatPerformance(business_id, analysis_period);
            
            if (!formatData || formatData.length === 0) {
                return null;
            }

            // Find optimal content formats
            const optimalFormats = this.findOptimalContentFormats(formatData);
            
            if (optimalFormats.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore([formatData], 'content_format');
            const impactScore = this.calculateImpactScore(optimalFormats);

            return {
                recommendation_type: 'content_format',
                category: 'content',
                title: 'Optimal Content Formats Identified',
                description: `Analysis of ${analysis_period} content performance reveals ${optimalFormats.length} optimal content formats for maximum engagement.`,
                recommendation_data: {
                    optimal_formats: optimalFormats,
                    format_performance: formatData,
                    analysis_period: analysis_period
                },
                reasoning: this.generateContentFormatReasoning(formatData),
                expected_impact: {
                    engagement_increase: '20-40%',
                    reach_improvement: '25-45%',
                    audience_retention: '15-30%',
                    timeframe: '2-4 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating content format recommendation:', error);
            return null;
        }
    }

    /**
     * Generate engagement strategy recommendation
     */
    static async generateEngagementStrategyRecommendation(business_id, data_sources, analysis_period) {
        try {
            // Analyze engagement patterns and audience behavior
            const engagementData = await this.analyzeEngagementPatterns(business_id, analysis_period);
            const audienceData = await this.analyzeAudienceBehavior(business_id, analysis_period);
            
            if (!engagementData || engagementData.length === 0) {
                return null;
            }

            // Find engagement opportunities
            const engagementOpportunities = this.findEngagementOpportunities(engagementData, audienceData);
            
            if (engagementOpportunities.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore([engagementData, audienceData], 'engagement_strategy');
            const impactScore = this.calculateImpactScore(engagementOpportunities);

            return {
                recommendation_type: 'engagement_strategy',
                category: 'engagement',
                title: 'Engagement Strategy Opportunities',
                description: `Analysis of ${analysis_period} engagement patterns reveals ${engagementOpportunities.length} opportunities to improve audience interaction.`,
                recommendation_data: {
                    opportunities: engagementOpportunities,
                    engagement_patterns: engagementData,
                    audience_behavior: audienceData,
                    analysis_period: analysis_period
                },
                reasoning: this.generateEngagementStrategyReasoning(engagementData, audienceData),
                expected_impact: {
                    engagement_increase: '30-50%',
                    audience_interaction: '25-40%',
                    community_growth: '20-35%',
                    timeframe: '4-8 weeks'
                },
                confidence_score: confidenceScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_insights: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating engagement strategy recommendation:', error);
            return null;
        }
    }

    /**
     * Save recommendation to database
     */
    static async saveRecommendation(business_id, recommendationData) {
        try {
            const recommendation = {
                ...recommendationData,
                business_id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('smart_recommendations')
                .insert([recommendation])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error saving recommendation:', error);
            throw error;
        }
    }

    /**
     * Update recommendation status
     */
    static async updateRecommendationStatus(id, status, notes = null, implementation_notes = null) {
        try {
            const updateData = {
                status,
                updated_at: new Date().toISOString()
            };

            if (notes) {
                updateData.notes = notes;
            }

            if (implementation_notes) {
                updateData.implementation_notes = implementation_notes;
            }

            const { data, error } = await supabase
                .from('smart_recommendations')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error updating recommendation status:', error);
            throw error;
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    /**
     * Analyze content performance data
     */
    static async analyzeContentPerformance(business_id, analysis_period) {
        try {
            // This would integrate with your actual content data
            // For now, return mock data structure
            return [
                {
                    content_id: 1,
                    content_type: 'image_post',
                    engagement_rate: 0.045,
                    reach: 1500,
                    likes: 67,
                    comments: 23,
                    shares: 12,
                    platform: 'instagram'
                },
                {
                    content_id: 2,
                    content_type: 'video_post',
                    engagement_rate: 0.062,
                    reach: 2200,
                    likes: 137,
                    comments: 45,
                    shares: 28,
                    platform: 'instagram'
                }
            ];
        } catch (error) {
            console.error('Error analyzing content performance:', error);
            return [];
        }
    }

    /**
     * Analyze trend data
     */
    static async analyzeTrendData(business_id, analysis_period) {
        try {
            // This would integrate with your actual trend data
            return [
                {
                    trend_name: 'video_content',
                    growth_rate: 0.25,
                    engagement_impact: 0.15,
                    audience_reach: 0.30
                },
                {
                    trend_name: 'user_generated_content',
                    growth_rate: 0.18,
                    engagement_impact: 0.22,
                    audience_reach: 0.25
                }
            ];
        } catch (error) {
            console.error('Error analyzing trend data:', error);
            return [];
        }
    }

    /**
     * Analyze audience behavior data
     */
    static async analyzeAudienceBehavior(business_id, analysis_period) {
        try {
            // This would integrate with your actual audience data
            return [
                {
                    audience_segment: 'engaged_followers',
                    behavior_pattern: 'high_engagement',
                    frequency: 'daily',
                    preferred_content: 'visual',
                    active_hours: [9, 12, 18],
                    engagement_rate: 0.08
                },
                {
                    audience_segment: 'casual_followers',
                    behavior_pattern: 'moderate_engagement',
                    frequency: 'weekly',
                    preferred_content: 'informational',
                    active_hours: [10, 14, 20],
                    engagement_rate: 0.03
                }
            ];
        } catch (error) {
            console.error('Error analyzing audience behavior:', error);
            return [];
        }
    }

    /**
     * Analyze engagement patterns
     */
    static async analyzeEngagementPatterns(business_id, analysis_period) {
        try {
            // This would integrate with your actual engagement data
            return [
                {
                    pattern_type: 'time_based',
                    peak_hours: [9, 12, 18],
                    engagement_rate: 0.06,
                    audience_size: 2500
                },
                {
                    pattern_type: 'content_based',
                    high_engagement_content: ['video', 'user_generated'],
                    engagement_rate: 0.08,
                    audience_size: 1800
                }
            ];
        } catch (error) {
            console.error('Error analyzing engagement patterns:', error);
            return [];
        }
    }

    /**
     * Analyze audience demographics
     */
    static async analyzeAudienceDemographics(business_id, analysis_period) {
        try {
            // This would integrate with your actual demographic data
            return [
                {
                    demographic: 'age_25_34',
                    percentage: 35,
                    engagement_rate: 0.05,
                    growth_rate: 0.12
                },
                {
                    demographic: 'age_35_44',
                    percentage: 28,
                    engagement_rate: 0.04,
                    growth_rate: 0.08
                }
            ];
        } catch (error) {
            console.error('Error analyzing audience demographics:', error);
            return [];
        }
    }

    /**
     * Analyze hashtag performance
     */
    static async analyzeHashtagPerformance(business_id, analysis_period) {
        try {
            // This would integrate with your actual hashtag data
            return [
                {
                    hashtag: '#marketing',
                    usage_count: 45,
                    engagement_rate: 0.052,
                    reach: 3200,
                    trending_score: 0.75
                },
                {
                    hashtag: '#business',
                    usage_count: 38,
                    engagement_rate: 0.048,
                    reach: 2800,
                    trending_score: 0.68
                }
            ];
        } catch (error) {
            console.error('Error analyzing hashtag performance:', error);
            return [];
        }
    }

    /**
     * Analyze trending topics
     */
    static async analyzeTrendingTopics(business_id, analysis_period) {
        try {
            // This would integrate with your actual trending data
            return [
                {
                    topic: 'digital_transformation',
                    trend_score: 0.85,
                    growth_rate: 0.32,
                    audience_interest: 0.78
                },
                {
                    topic: 'remote_work',
                    trend_score: 0.72,
                    growth_rate: 0.18,
                    audience_interest: 0.65
                }
            ];
        } catch (error) {
            console.error('Error analyzing trending topics:', error);
            return [];
        }
    }

    /**
     * Analyze content format performance
     */
    static async analyzeContentFormatPerformance(business_id, analysis_period) {
        try {
            // This would integrate with your actual format data
            return [
                {
                    format: 'video',
                    engagement_rate: 0.062,
                    reach: 2200,
                    audience_retention: 0.75,
                    growth_rate: 0.25
                },
                {
                    format: 'image',
                    engagement_rate: 0.045,
                    reach: 1500,
                    audience_retention: 0.60,
                    growth_rate: 0.15
                }
            ];
        } catch (error) {
            console.error('Error analyzing content format performance:', error);
            return [];
        }
    }

    /**
     * Generate content ideas
     */
    static generateContentIdeas(contentData, trendData) {
        const ideas = [];

        // Analyze high-performing content
        const highPerformingContent = contentData.filter(content => content.engagement_rate > 0.05);
        
        highPerformingContent.forEach(content => {
            ideas.push({
                idea: `Create more ${content.content_type} content similar to post ${content.content_id}`,
                type: content.content_type,
                expected_engagement: content.engagement_rate * 1.2,
                reasoning: `Based on high performance of similar content (${Math.round(content.engagement_rate * 100)}% engagement)`
            });
        });

        // Incorporate trends
        trendData.forEach(trend => {
            if (trend.growth_rate > 0.20) {
                ideas.push({
                    idea: `Focus on ${trend.trend_name} content to capitalize on trending topic`,
                    type: 'trend_based',
                    expected_engagement: 0.06,
                    reasoning: `Trending topic with ${Math.round(trend.growth_rate * 100)}% growth rate`
                });
            }
        });

        return ideas;
    }

    /**
     * Find optimal posting times
     */
    static findOptimalPostingTimes(audienceData, engagementData) {
        const optimalTimes = [];

        // Find peak activity hours
        const peakHours = engagementData.find(pattern => pattern.pattern_type === 'time_based')?.peak_hours || [];
        
        peakHours.forEach(hour => {
            optimalTimes.push({
                time: `${hour}:00`,
                day: 'all',
                reasoning: `Peak audience activity hour with ${Math.round(engagementData[0]?.engagement_rate * 100)}% engagement rate`,
                expected_improvement: '25-35%'
            });
        });

        // Add audience-specific times
        audienceData.forEach(audience => {
            audience.active_hours.forEach(hour => {
                if (!peakHours.includes(hour)) {
                    optimalTimes.push({
                        time: `${hour}:00`,
                        day: 'all',
                        reasoning: `High engagement from ${audience.audience_segment} segment`,
                        expected_improvement: '15-25%'
                    });
                }
            });
        });

        return optimalTimes;
    }

    /**
     * Find targeting opportunities
     */
    static findTargetingOpportunities(audienceData, behaviorData) {
        const opportunities = [];

        // Find high-engagement demographics
        audienceData.forEach(demographic => {
            if (demographic.engagement_rate > 0.04 && demographic.growth_rate > 0.10) {
                opportunities.push({
                    target: demographic.demographic,
                    strategy: `Increase content targeting for ${demographic.demographic} segment`,
                    reasoning: `High engagement (${Math.round(demographic.engagement_rate * 100)}%) and growth (${Math.round(demographic.growth_rate * 100)}%)`,
                    expected_impact: '25-40% engagement increase'
                });
            }
        });

        // Find behavior-based opportunities
        behaviorData.forEach(behavior => {
            if (behavior.engagement_rate > 0.06) {
                opportunities.push({
                    target: behavior.audience_segment,
                    strategy: `Create more ${behavior.preferred_content} content for ${behavior.audience_segment}`,
                    reasoning: `High engagement rate (${Math.round(behavior.engagement_rate * 100)}%) for this segment`,
                    expected_impact: '20-35% engagement increase'
                });
            }
        });

        return opportunities;
    }

    /**
     * Generate hashtag suggestions
     */
    static generateHashtagSuggestions(hashtagData, trendingData) {
        const suggestions = [];

        // High-performing hashtags
        hashtagData.forEach(hashtag => {
            if (hashtag.engagement_rate > 0.05) {
                suggestions.push({
                    hashtag: hashtag.hashtag,
                    reasoning: `High engagement rate (${Math.round(hashtag.engagement_rate * 100)}%)`,
                    expected_reach: hashtag.reach * 1.3,
                    category: 'performance_based'
                });
            }
        });

        // Trending topics
        trendingData.forEach(topic => {
            if (topic.trend_score > 0.70) {
                suggestions.push({
                    hashtag: `#${topic.topic.replace(/_/g, '')}`,
                    reasoning: `Trending topic with ${Math.round(topic.trend_score * 100)}% trend score`,
                    expected_reach: 3000,
                    category: 'trend_based'
                });
            }
        });

        return suggestions;
    }

    /**
     * Find optimal content formats
     */
    static findOptimalContentFormats(formatData) {
        const optimalFormats = [];

        formatData.forEach(format => {
            if (format.engagement_rate > 0.05 && format.growth_rate > 0.15) {
                optimalFormats.push({
                    format: format.format,
                    reasoning: `High engagement (${Math.round(format.engagement_rate * 100)}%) and growth (${Math.round(format.growth_rate * 100)}%)`,
                    expected_improvement: '20-40% engagement increase',
                    priority: 'high'
                });
            }
        });

        return optimalFormats;
    }

    /**
     * Find engagement opportunities
     */
    static findEngagementOpportunities(engagementData, audienceData) {
        const opportunities = [];

        // Time-based opportunities
        const timePattern = engagementData.find(pattern => pattern.pattern_type === 'time_based');
        if (timePattern) {
            opportunities.push({
                strategy: 'Optimize posting schedule for peak hours',
                reasoning: `Peak engagement during hours: ${timePattern.peak_hours.join(', ')}`,
                expected_impact: '25-40% engagement increase',
                implementation: 'Schedule posts during identified peak hours'
            });
        }

        // Content-based opportunities
        const contentPattern = engagementData.find(pattern => pattern.pattern_type === 'content_based');
        if (contentPattern) {
            opportunities.push({
                strategy: 'Focus on high-engagement content types',
                reasoning: `High engagement for: ${contentPattern.high_engagement_content.join(', ')}`,
                expected_impact: '20-35% engagement increase',
                implementation: 'Increase production of high-engagement content types'
            });
        }

        return opportunities;
    }

    /**
     * Generate reasoning for content ideas
     */
    static generateContentIdeaReasoning(contentData, trendData) {
        const highPerformingCount = contentData.filter(content => content.engagement_rate > 0.05).length;
        const trendingTopics = trendData.filter(trend => trend.growth_rate > 0.20).length;
        
        return `Analysis of ${contentData.length} content pieces revealed ${highPerformingCount} high-performing posts and ${trendingTopics} trending topics. Content ideas are generated based on performance patterns and emerging trends to maximize engagement potential.`;
    }

    /**
     * Generate reasoning for posting times
     */
    static generatePostingTimeReasoning(audienceData, engagementData) {
        const peakHours = engagementData.find(pattern => pattern.pattern_type === 'time_based')?.peak_hours || [];
        const activeSegments = audienceData.filter(audience => audience.engagement_rate > 0.05).length;
        
        return `Analysis of ${audienceData.length} audience segments and engagement patterns identified ${peakHours.length} peak activity hours. ${activeSegments} segments show high engagement, indicating optimal timing opportunities.`;
    }

    /**
     * Generate reasoning for audience targeting
     */
    static generateAudienceTargetingReasoning(audienceData, behaviorData) {
        const highEngagementDemographics = audienceData.filter(demo => demo.engagement_rate > 0.04).length;
        const highEngagementBehaviors = behaviorData.filter(behavior => behavior.engagement_rate > 0.06).length;
        
        return `Analysis of ${audienceData.length} demographic segments and ${behaviorData.length} behavior patterns revealed ${highEngagementDemographics} high-engagement demographics and ${highEngagementBehaviors} high-engagement behaviors, indicating targeting opportunities.`;
    }

    /**
     * Generate reasoning for hashtag suggestions
     */
    static generateHashtagSuggestionReasoning(hashtagData, trendingData) {
        const highPerformingHashtags = hashtagData.filter(hashtag => hashtag.engagement_rate > 0.05).length;
        const trendingTopics = trendingData.filter(topic => topic.trend_score > 0.70).length;
        
        return `Analysis of ${hashtagData.length} hashtags revealed ${highPerformingHashtags} high-performing options, while ${trendingTopics} trending topics were identified, providing opportunities for increased reach and discovery.`;
    }

    /**
     * Generate reasoning for content formats
     */
    static generateContentFormatReasoning(formatData) {
        const optimalFormats = formatData.filter(format => format.engagement_rate > 0.05 && format.growth_rate > 0.15).length;
        
        return `Analysis of ${formatData.length} content formats revealed ${optimalFormats} formats with high engagement and growth rates, indicating optimal content strategies for audience retention and growth.`;
    }

    /**
     * Generate reasoning for engagement strategies
     */
    static generateEngagementStrategyReasoning(engagementData, audienceData) {
        const timePatterns = engagementData.filter(pattern => pattern.pattern_type === 'time_based').length;
        const contentPatterns = engagementData.filter(pattern => pattern.pattern_type === 'content_based').length;
        
        return `Analysis of ${engagementData.length} engagement patterns and ${audienceData.length} audience segments revealed ${timePatterns} time-based patterns and ${contentPatterns} content-based patterns, providing strategic opportunities for improved audience interaction.`;
    }

    /**
     * Calculate confidence score
     */
    static calculateConfidenceScore(dataSources, recommendationType) {
        // This is a simplified confidence calculation
        // In a real implementation, this would use statistical methods
        const baseConfidence = 0.75;
        const dataQualityMultiplier = Math.min(dataSources.length / 10, 1.0);
        
        return Math.round((baseConfidence * dataQualityMultiplier) * 100) / 100;
    }

    /**
     * Calculate impact score
     */
    static calculateImpactScore(opportunities) {
        if (!opportunities || opportunities.length === 0) return 0;
        
        // Calculate average impact potential
        const totalImpact = opportunities.reduce((sum, opp) => {
            let impact = 0;
            if (opp.expected_improvement) {
                const improvement = parseFloat(opp.expected_improvement.match(/\d+/)[0]);
                impact = improvement;
            } else if (opp.expected_impact) {
                const impactMatch = opp.expected_impact.match(/\d+/);
                if (impactMatch) {
                    impact = parseFloat(impactMatch[0]);
                }
            } else {
                impact = 30; // Default impact
            }
            
            return sum + impact;
        }, 0);
        
        return Math.round(totalImpact / opportunities.length);
    }

    /**
     * Determine priority level
     */
    static determinePriority(impactScore, confidenceScore) {
        if (impactScore >= 80 && confidenceScore >= 0.8) return 'critical';
        if (impactScore >= 60 && confidenceScore >= 0.7) return 'high';
        if (impactScore >= 40 && confidenceScore >= 0.6) return 'medium';
        return 'low';
    }

    /**
     * Get recommendation types
     */
    static getRecommendationTypes() {
        return [
            'content_idea',
            'posting_time',
            'audience_targeting',
            'hashtag_suggestion',
            'content_format',
            'engagement_strategy',
            'growth_optimization',
            'competitive_analysis'
        ];
    }

    /**
     * Get recommendation categories
     */
    static getRecommendationCategories() {
        return [
            'content',
            'timing',
            'audience',
            'engagement',
            'growth',
            'optimization',
            'strategy'
        ];
    }

    /**
     * Get recommendation priorities
     */
    static getRecommendationPriorities() {
        return [
            'low',
            'medium',
            'high',
            'critical'
        ];
    }

    /**
     * Get recommendation statuses
     */
    static getRecommendationStatuses() {
        return [
            'pending',
            'accepted',
            'rejected',
            'implemented',
            'archived'
        ];
    }
}

module.exports = SmartRecommendationsService;
