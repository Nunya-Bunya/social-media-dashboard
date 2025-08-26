const { supabase } = require('../config');

class AIInsightsService {
    
    /**
     * Get AI insights with filtering and pagination
     */
    static async getInsights({ business_id, insight_type, category, status, priority, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('ai_insights')
                .select('*')
                .eq('business_id', business_id)
                .order('generated_at', { ascending: false });

            // Apply filters
            if (insight_type) {
                query = query.eq('insight_type', insight_type);
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
            console.error('Error in getInsights:', error);
            throw error;
        }
    }

    /**
     * Get a specific AI insight by ID
     */
    static async getInsightById(id) {
        try {
            const { data, error } = await supabase
                .from('ai_insights')
                .select('*')
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
            console.error('Error in getInsightById:', error);
            throw error;
        }
    }

    /**
     * Generate new AI insights
     */
    static async generateInsights({ business_id, insight_types, data_sources, analysis_period }) {
        try {
            const insights = [];

            // Generate insights for each requested type
            for (const insightType of insight_types || ['content_optimization', 'audience_analysis']) {
                const insight = await this.generateInsightByType(
                    business_id,
                    insightType,
                    data_sources,
                    analysis_period
                );
                
                if (insight) {
                    insights.push(insight);
                }
            }

            return insights;
        } catch (error) {
            console.error('Error in generateInsights:', error);
            throw error;
        }
    }

    /**
     * Generate insight by specific type
     */
    static async generateInsightByType(business_id, insight_type, data_sources, analysis_period) {
        try {
            let insight = null;

            switch (insight_type) {
                case 'content_optimization':
                    insight = await this.generateContentOptimizationInsight(business_id, data_sources, analysis_period);
                    break;
                case 'audience_analysis':
                    insight = await this.generateAudienceAnalysisInsight(business_id, data_sources, analysis_period);
                    break;
                case 'trend_prediction':
                    insight = await this.generateTrendPredictionInsight(business_id, data_sources, analysis_period);
                    break;
                case 'competitive_insight':
                    insight = await this.generateCompetitiveInsight(business_id, data_sources, analysis_period);
                    break;
                case 'performance_analysis':
                    insight = await this.generatePerformanceAnalysisInsight(business_id, data_sources, analysis_period);
                    break;
                default:
                    console.warn(`Unknown insight type: ${insight_type}`);
                    return null;
            }

            if (insight) {
                // Save insight to database
                const savedInsight = await this.saveInsight(business_id, insight);
                return savedInsight;
            }

            return null;
        } catch (error) {
            console.error(`Error generating ${insight_type} insight:`, error);
            return null;
        }
    }

    /**
     * Generate content optimization insight
     */
    static async generateContentOptimizationInsight(business_id, data_sources, analysis_period) {
        try {
            // Analyze content performance data
            const contentData = await this.analyzeContentPerformance(business_id, analysis_period);
            
            if (!contentData || contentData.length === 0) {
                return null;
            }

            // Find optimization opportunities
            const optimizationOpportunities = this.findContentOptimizationOpportunities(contentData);
            
            if (optimizationOpportunities.length === 0) {
                return null;
            }

            // Calculate confidence and impact scores
            const confidenceScore = this.calculateConfidenceScore(contentData, 'content');
            const impactScore = this.calculateImpactScore(optimizationOpportunities);

            return {
                insight_type: 'content_optimization',
                category: 'optimization',
                title: 'Content Optimization Opportunities Detected',
                description: `Analysis of ${analysis_period} content performance reveals ${optimizationOpportunities.length} optimization opportunities.`,
                insight_data: {
                    opportunities: optimizationOpportunities,
                    content_metrics: contentData,
                    analysis_period: analysis_period
                },
                confidence_score: confidenceScore,
                impact_score: impactScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_data: {
                    data_sources: data_sources || ['social_media', 'analytics'],
                    analysis_period: analysis_period,
                    data_points: contentData.length
                },
                ai_model_version: '1.0.0',
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
            };
        } catch (error) {
            console.error('Error generating content optimization insight:', error);
            return null;
        }
    }

    /**
     * Generate audience analysis insight
     */
    static async generateAudienceAnalysisInsight(business_id, data_sources, analysis_period) {
        try {
            // Analyze audience behavior data
            const audienceData = await this.analyzeAudienceBehavior(business_id, analysis_period);
            
            if (!audienceData || audienceData.length === 0) {
                return null;
            }

            // Find audience insights
            const audienceInsights = this.findAudienceInsights(audienceData);
            
            if (audienceInsights.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore(audienceData, 'audience');
            const impactScore = this.calculateImpactScore(audienceInsights);

            return {
                insight_type: 'audience_analysis',
                category: 'engagement',
                title: 'Audience Behavior Patterns Identified',
                description: `Analysis of ${analysis_period} audience data reveals ${audienceInsights.length} key behavioral patterns.`,
                insight_data: {
                    patterns: audienceInsights,
                    audience_metrics: audienceData,
                    analysis_period: analysis_period
                },
                confidence_score: confidenceScore,
                impact_score: impactScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_data: {
                    data_sources: data_sources || ['social_media', 'analytics'],
                    analysis_period: analysis_period,
                    data_points: audienceData.length
                },
                ai_model_version: '1.0.0',
                expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
            };
        } catch (error) {
            console.error('Error generating audience analysis insight:', error);
            return null;
        }
    }

    /**
     * Generate trend prediction insight
     */
    static async generateTrendPredictionInsight(business_id, data_sources, analysis_period) {
        try {
            // Analyze trend data
            const trendData = await this.analyzeTrendData(business_id, analysis_period);
            
            if (!trendData || trendData.length === 0) {
                return null;
            }

            // Predict future trends
            const trendPredictions = this.predictTrends(trendData);
            
            if (trendPredictions.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore(trendData, 'trend');
            const impactScore = this.calculateImpactScore(trendPredictions);

            return {
                insight_type: 'trend_prediction',
                category: 'growth',
                title: 'Emerging Trends Identified',
                description: `Analysis of ${analysis_period} data predicts ${trendPredictions.length} emerging trends.`,
                insight_data: {
                    predictions: trendPredictions,
                    trend_metrics: trendData,
                    analysis_period: analysis_period
                },
                confidence_score: confidenceScore,
                impact_score: impactScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_data: {
                    data_sources: data_sources || ['social_media', 'analytics', 'external_api'],
                    analysis_period: analysis_period,
                    data_points: trendData.length
                },
                ai_model_version: '1.0.0',
                expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
            };
        } catch (error) {
            console.error('Error generating trend prediction insight:', error);
            return null;
        }
    }

    /**
     * Generate competitive insight
     */
    static async generateCompetitiveInsight(business_id, data_sources, analysis_period) {
        try {
            // Analyze competitive data
            const competitiveData = await this.analyzeCompetitiveData(business_id, analysis_period);
            
            if (!competitiveData || competitiveData.length === 0) {
                return null;
            }

            // Find competitive opportunities
            const competitiveOpportunities = this.findCompetitiveOpportunities(competitiveData);
            
            if (competitiveOpportunities.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore(competitiveData, 'competitive');
            const impactScore = this.calculateImpactScore(competitiveOpportunities);

            return {
                insight_type: 'competitive_insight',
                category: 'growth',
                title: 'Competitive Opportunities Identified',
                description: `Analysis of ${analysis_period} competitive data reveals ${competitiveOpportunities.length} opportunities.`,
                insight_data: {
                    opportunities: competitiveOpportunities,
                    competitive_metrics: competitiveData,
                    analysis_period: analysis_period
                },
                confidence_score: confidenceScore,
                impact_score: impactScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_data: {
                    data_sources: data_sources || ['social_media', 'analytics', 'competitive_intelligence'],
                    analysis_period: analysis_period,
                    data_points: competitiveData.length
                },
                ai_model_version: '1.0.0',
                expires_at: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() // 21 days
            };
        } catch (error) {
            console.error('Error generating competitive insight:', error);
            return null;
        }
    }

    /**
     * Generate performance analysis insight
     */
    static async generatePerformanceAnalysisInsight(business_id, data_sources, analysis_period) {
        try {
            // Analyze performance data
            const performanceData = await this.analyzePerformanceData(business_id, analysis_period);
            
            if (!performanceData || performanceData.length === 0) {
                return null;
            }

            // Find performance insights
            const performanceInsights = this.findPerformanceInsights(performanceData);
            
            if (performanceInsights.length === 0) {
                return null;
            }

            const confidenceScore = this.calculateConfidenceScore(performanceData, 'performance');
            const impactScore = this.calculateImpactScore(performanceInsights);

            return {
                insight_type: 'performance_analysis',
                category: 'performance',
                title: 'Performance Optimization Opportunities',
                description: `Analysis of ${analysis_period} performance data reveals ${performanceInsights.length} optimization opportunities.`,
                insight_data: {
                    opportunities: performanceInsights,
                    performance_metrics: performanceData,
                    analysis_period: analysis_period
                },
                confidence_score: confidenceScore,
                impact_score: impactScore,
                priority: this.determinePriority(impactScore, confidenceScore),
                source_data: {
                    data_sources: data_sources || ['analytics', 'social_media', 'email_marketing'],
                    analysis_period: analysis_period,
                    data_points: performanceData.length
                },
                ai_model_version: '1.0.0',
                expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days
            };
        } catch (error) {
            console.error('Error generating performance analysis insight:', error);
            return null;
        }
    }

    /**
     * Save insight to database
     */
    static async saveInsight(business_id, insightData) {
        try {
            const insight = {
                ...insightData,
                business_id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('ai_insights')
                .insert([insight])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error saving insight:', error);
            throw error;
        }
    }

    /**
     * Update insight status
     */
    static async updateInsightStatus(id, status, notes = null) {
        try {
            const updateData = {
                status,
                updated_at: new Date().toISOString()
            };

            if (notes) {
                updateData.notes = notes;
            }

            const { data, error } = await supabase
                .from('ai_insights')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error updating insight status:', error);
            throw error;
        }
    }

    /**
     * Get automation dashboard data
     */
    static async getAutomationDashboard({ business_id, date_range }) {
        try {
            // Get insights summary
            const insightsSummary = await this.getInsightsSummary(business_id, date_range);
            
            // Get workflow performance
            const workflowPerformance = await this.getWorkflowPerformance(business_id, date_range);
            
            // Get recommendation summary
            const recommendationSummary = await this.getRecommendationSummary(business_id, date_range);
            
            // Get prediction accuracy
            const predictionAccuracy = await this.getPredictionAccuracy(business_id, date_range);

            return {
                insights: insightsSummary,
                workflows: workflowPerformance,
                recommendations: recommendationSummary,
                predictions: predictionAccuracy,
                generated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error getting automation dashboard:', error);
            throw error;
        }
    }

    /**
     * Get automation performance metrics
     */
    static async getAutomationPerformance({ business_id, metric_type, time_period }) {
        try {
            const metrics = {};

            if (!metric_type || metric_type === 'insights') {
                metrics.insights = await this.getInsightsPerformance(business_id, time_period);
            }

            if (!metric_type || metric_type === 'workflows') {
                metrics.workflows = await this.getWorkflowsPerformance(business_id, time_period);
            }

            if (!metric_type || metric_type === 'recommendations') {
                metrics.recommendations = await this.getRecommendationsPerformance(business_id, time_period);
            }

            return metrics;
        } catch (error) {
            console.error('Error getting automation performance:', error);
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
                    engagement_rate: 0.045,
                    reach: 1500,
                    clicks: 67,
                    shares: 23,
                    content_type: 'post',
                    platform: 'instagram'
                }
                // More content data would be analyzed here
            ];
        } catch (error) {
            console.error('Error analyzing content performance:', error);
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
                    active_hours: [9, 12, 18]
                }
                // More audience data would be analyzed here
            ];
        } catch (error) {
            console.error('Error analyzing audience behavior:', error);
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
                }
                // More trend data would be analyzed here
            ];
        } catch (error) {
            console.error('Error analyzing trend data:', error);
            return [];
        }
    }

    /**
     * Analyze competitive data
     */
    static async analyzeCompetitiveData(business_id, analysis_period) {
        try {
            // This would integrate with your actual competitive data
            return [
                {
                    competitor: 'competitor_a',
                    market_share: 0.25,
                    engagement_rate: 0.038,
                    content_frequency: 'daily',
                    strengths: ['visual_content', 'community_engagement']
                }
                // More competitive data would be analyzed here
            ];
        } catch (error) {
            console.error('Error analyzing competitive data:', error);
            return [];
        }
    }

    /**
     * Analyze performance data
     */
    static async analyzePerformanceData(business_id, analysis_period) {
        try {
            // This would integrate with your actual performance data
            return [
                {
                    metric: 'follower_growth',
                    current_value: 0.08,
                    target_value: 0.12,
                    trend: 'increasing',
                    optimization_potential: 0.15
                }
                // More performance data would be analyzed here
            ];
        } catch (error) {
            console.error('Error analyzing performance data:', error);
            return [];
        }
    }

    /**
     * Find content optimization opportunities
     */
    static findContentOptimizationOpportunities(contentData) {
        const opportunities = [];

        contentData.forEach(content => {
            if (content.engagement_rate < 0.03) {
                opportunities.push({
                    type: 'low_engagement',
                    content_id: content.content_id,
                    current_value: content.engagement_rate,
                    target_value: 0.05,
                    suggestion: 'Optimize content format and timing'
                });
            }

            if (content.reach < 1000) {
                opportunities.push({
                    type: 'low_reach',
                    content_id: content.content_id,
                    current_value: content.reach,
                    target_value: 2000,
                    suggestion: 'Improve hashtag strategy and posting time'
                });
            }
        });

        return opportunities;
    }

    /**
     * Find audience insights
     */
    static findAudienceInsights(audienceData) {
        const insights = [];

        audienceData.forEach(audience => {
            insights.push({
                segment: audience.audience_segment,
                pattern: audience.behavior_pattern,
                recommendation: `Focus on ${audience.preferred_content} content during peak hours`,
                impact_potential: 'medium'
            });
        });

        return insights;
    }

    /**
     * Predict trends
     */
    static predictTrends(trendData) {
        const predictions = [];

        trendData.forEach(trend => {
            if (trend.growth_rate > 0.20) {
                predictions.push({
                    trend: trend.trend_name,
                    prediction: 'Continued growth expected',
                    confidence: 'high',
                    timeframe: '3-6 months',
                    recommendation: 'Increase investment in this content type'
                });
            }
        });

        return predictions;
    }

    /**
     * Find competitive opportunities
     */
    static findCompetitiveOpportunities(competitiveData) {
        const opportunities = [];

        competitiveData.forEach(competitor => {
            if (competitor.engagement_rate > 0.04) {
                opportunities.push({
                    type: 'engagement_gap',
                    competitor: competitor.competitor,
                    current_gap: competitor.engagement_rate - 0.038,
                    opportunity: 'Improve engagement strategies',
                    priority: 'high'
                });
            }
        });

        return opportunities;
    }

    /**
     * Find performance insights
     */
    static findPerformanceInsights(performanceData) {
        const insights = [];

        performanceData.forEach(metric => {
            if (metric.current_value < metric.target_value) {
                insights.push({
                    metric: metric.metric,
                    gap: metric.target_value - metric.current_value,
                    opportunity: `Optimize ${metric.metric} strategies`,
                    potential_improvement: metric.optimization_potential
                });
            }
        });

        return insights;
    }

    /**
     * Calculate confidence score
     */
    static calculateConfidenceScore(data, dataType) {
        // This is a simplified confidence calculation
        // In a real implementation, this would use statistical methods
        const baseConfidence = 0.7;
        const dataQualityMultiplier = Math.min(data.length / 100, 1.0);
        
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
            if (opp.type === 'low_engagement') impact = 40;
            else if (opp.type === 'low_reach') impact = 35;
            else if (opp.type === 'engagement_gap') impact = 50;
            else impact = 30;
            
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
     * Get insights summary
     */
    static async getInsightsSummary(business_id, date_range) {
        try {
            const { data, error } = await supabase
                .from('ai_insights')
                .select('insight_type, status, priority, impact_score')
                .eq('business_id', business_id)
                .gte('generated_at', new Date(Date.now() - this.getDateRangeInMs(date_range)).toISOString());

            if (error) throw error;

            return {
                total_insights: data?.length || 0,
                by_type: this.countByField(data, 'insight_type'),
                by_status: this.countByField(data, 'status'),
                by_priority: this.countByField(data, 'priority'),
                average_impact: this.calculateAverageImpact(data)
            };
        } catch (error) {
            console.error('Error getting insights summary:', error);
            return {};
        }
    }

    /**
     * Get workflow performance
     */
    static async getWorkflowPerformance(business_id, date_range) {
        try {
            const { data, error } = await supabase
                .from('automated_workflows')
                .select('workflow_type, execution_count, success_rate')
                .eq('business_id', business_id)
                .eq('is_active', true);

            if (error) throw error;

            return {
                total_workflows: data?.length || 0,
                by_type: this.countByField(data, 'workflow_type'),
                average_success_rate: this.calculateAverageSuccessRate(data),
                total_executions: this.calculateTotalExecutions(data)
            };
        } catch (error) {
            console.error('Error getting workflow performance:', error);
            return {};
        }
    }

    /**
     * Get recommendation summary
     */
    static async getRecommendationSummary(business_id, date_range) {
        try {
            const { data, error } = await supabase
                .from('smart_recommendations')
                .select('recommendation_type, status, priority')
                .eq('business_id', business_id)
                .gte('created_at', new Date(Date.now() - this.getDateRangeInMs(date_range)).toISOString());

            if (error) throw error;

            return {
                total_recommendations: data?.length || 0,
                by_type: this.countByField(data, 'recommendation_type'),
                by_status: this.countByField(data, 'status'),
                by_priority: this.countByField(data, 'priority')
            };
        } catch (error) {
            console.error('Error getting recommendation summary:', error);
            return {};
        }
    }

    /**
     * Get prediction accuracy
     */
    static async getPredictionAccuracy(business_id, date_range) {
        try {
            const { data, error } = await supabase
                .from('predictive_analytics')
                .select('prediction_type, accuracy_score')
                .eq('business_id', business_id);

            if (error) throw error;

            return {
                total_predictions: data?.length || 0,
                by_type: this.countByField(data, 'prediction_type'),
                average_accuracy: this.calculateAverageAccuracy(data)
            };
        } catch (error) {
            console.error('Error getting prediction accuracy:', error);
            return {};
        }
    }

    /**
     * Get insights performance
     */
    static async getInsightsPerformance(business_id, time_period) {
        try {
            const { data, error } = await supabase
                .from('ai_insights')
                .select('insight_type, status, impact_score')
                .eq('business_id', business_id)
                .gte('generated_at', new Date(Date.now() - this.getDateRangeInMs(time_period)).toISOString());

            if (error) throw error;

            return {
                total_generated: data?.length || 0,
                implemented_rate: this.calculateImplementedRate(data),
                average_impact: this.calculateAverageImpact(data),
                by_type: this.countByField(data, 'insight_type')
            };
        } catch (error) {
            console.error('Error getting insights performance:', error);
            return {};
        }
    }

    /**
     * Get workflows performance
     */
    static async getWorkflowsPerformance(business_id, time_period) {
        try {
            const { data, error } = await supabase
                .from('automated_workflows')
                .select('workflow_type, execution_count, success_rate')
                .eq('business_id', business_id)
                .eq('is_active', true);

            if (error) throw error;

            return {
                total_workflows: data?.length || 0,
                total_executions: this.calculateTotalExecutions(data),
                average_success_rate: this.calculateAverageSuccessRate(data),
                by_type: this.countByField(data, 'workflow_type')
            };
        } catch (error) {
            console.error('Error getting workflows performance:', error);
            return {};
        }
    }

    /**
     * Get recommendations performance
     */
    static async getRecommendationsPerformance(business_id, time_period) {
        try {
            const { data, error } = await supabase
                .from('smart_recommendations')
                .select('recommendation_type, status, priority')
                .eq('business_id', business_id)
                .gte('created_at', new Date(Date.now() - this.getDateRangeInMs(time_period)).toISOString());

            if (error) throw error;

            return {
                total_recommendations: data?.length || 0,
                acceptance_rate: this.calculateAcceptanceRate(data),
                by_type: this.countByField(data, 'recommendation_type'),
                by_status: this.countByField(data, 'status')
            };
        } catch (error) {
            console.error('Error getting recommendations performance:', error);
            return {};
        }
    }

    // ========================================
    // UTILITY METHODS
    // ========================================

    /**
     * Count by field
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
     * Calculate average impact
     */
    static calculateAverageImpact(data) {
        if (!data || data.length === 0) return 0;
        
        const totalImpact = data.reduce((sum, item) => sum + (item.impact_score || 0), 0);
        return Math.round(totalImpact / data.length);
    }

    /**
     * Calculate average success rate
     */
    static calculateAverageSuccessRate(data) {
        if (!data || data.length === 0) return 0;
        
        const totalSuccess = data.reduce((sum, item) => sum + (item.success_rate || 0), 0);
        return Math.round((totalSuccess / data.length) * 100) / 100;
    }

    /**
     * Calculate total executions
     */
    static calculateTotalExecutions(data) {
        if (!data) return 0;
        
        return data.reduce((sum, item) => sum + (item.execution_count || 0), 0);
    }

    /**
     * Calculate average accuracy
     */
    static calculateAverageAccuracy(data) {
        if (!data || data.length === 0) return 0;
        
        const totalAccuracy = data.reduce((sum, item) => sum + (item.accuracy_score || 0), 0);
        return Math.round((totalAccuracy / data.length) * 100) / 100;
    }

    /**
     * Calculate implemented rate
     */
    static calculateImplementedRate(data) {
        if (!data || data.length === 0) return 0;
        
        const implemented = data.filter(item => item.status === 'implemented').length;
        return Math.round((implemented / data.length) * 100) / 100;
    }

    /**
     * Calculate acceptance rate
     */
    static calculateAcceptanceRate(data) {
        if (!data || data.length === 0) return 0;
        
        const accepted = data.filter(item => item.status === 'accepted').length;
        return Math.round((accepted / data.length) * 100) / 100;
    }

    /**
     * Get date range in milliseconds
     */
    static getDateRangeInMs(dateRange) {
        const ranges = {
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000,
            '90d': 90 * 24 * 60 * 60 * 1000,
            '1y': 365 * 24 * 60 * 60 * 1000
        };
        
        return ranges[dateRange] || ranges['30d'];
    }
}

module.exports = AIInsightsService;
