const { supabase } = require('../config');

class PredictiveAnalyticsService {
    
    /**
     * Get predictions with filtering and pagination
     */
    static async getPredictions({ business_id, prediction_type, target_metric, prediction_period, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('predictive_analytics')
                .select('*')
                .eq('business_id', business_id)
                .order('last_updated', { ascending: false });

            // Apply filters
            if (prediction_type) {
                query = query.eq('prediction_type', prediction_type);
            }
            
            if (target_metric) {
                query = query.eq('target_metric', target_metric);
            }
            
            if (prediction_period) {
                query = query.eq('prediction_period', prediction_period);
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
            console.error('Error in getPredictions:', error);
            throw error;
        }
    }

    /**
     * Generate new predictions
     */
    static async generatePredictions({ business_id, prediction_types, target_metrics, prediction_periods }) {
        try {
            const predictions = [];

            // Generate predictions for each requested type
            for (const predictionType of prediction_types || ['audience_growth', 'engagement_trends']) {
                for (const targetMetric of target_metrics || ['followers', 'engagement_rate']) {
                    for (const predictionPeriod of prediction_periods || ['30_days', '90_days']) {
                        const prediction = await this.generatePredictionByType(
                            business_id,
                            predictionType,
                            targetMetric,
                            predictionPeriod
                        );
                        
                        if (prediction) {
                            predictions.push(prediction);
                        }
                    }
                }
            }

            return predictions;
        } catch (error) {
            console.error('Error in generatePredictions:', error);
            throw error;
        }
    }

    /**
     * Generate prediction by specific type
     */
    static async generatePredictionByType(business_id, prediction_type, target_metric, prediction_period) {
        try {
            let prediction = null;

            switch (prediction_type) {
                case 'audience_growth':
                    prediction = await this.generateAudienceGrowthPrediction(business_id, target_metric, prediction_period);
                    break;
                case 'engagement_trends':
                    prediction = await this.generateEngagementTrendsPrediction(business_id, target_metric, prediction_period);
                    break;
                case 'content_performance':
                    prediction = await this.generateContentPerformancePrediction(business_id, target_metric, prediction_period);
                    break;
                case 'roi_forecast':
                    prediction = await this.generateROIForecastPrediction(business_id, target_metric, prediction_period);
                    break;
                default:
                    console.warn(`Unknown prediction type: ${prediction_type}`);
                    return null;
            }

            if (prediction) {
                // Save prediction to database
                const savedPrediction = await this.savePrediction(business_id, prediction);
                return savedPrediction;
            }

            return null;
        } catch (error) {
            console.error(`Error generating ${prediction_type} prediction:`, error);
            return null;
        }
    }

    /**
     * Generate audience growth prediction
     */
    static async generateAudienceGrowthPrediction(business_id, target_metric, prediction_period) {
        try {
            // Analyze historical audience data
            const historicalData = await this.analyzeHistoricalAudienceData(business_id, prediction_period);
            
            if (!historicalData || historicalData.length === 0) {
                return null;
            }

            // Calculate growth prediction
            const prediction = this.calculateAudienceGrowthPrediction(historicalData, prediction_period);
            
            if (!prediction) {
                return null;
            }

            // Calculate confidence interval
            const confidenceInterval = this.calculateConfidenceInterval(prediction, historicalData);
            
            // Calculate accuracy score
            const accuracyScore = await this.calculatePredictionAccuracy(business_id, 'audience_growth', target_metric);

            return {
                prediction_type: 'audience_growth',
                target_metric: target_metric,
                prediction_period: prediction_period,
                current_value: prediction.current_value,
                predicted_value: prediction.predicted_value,
                confidence_interval: confidenceInterval,
                prediction_factors: prediction.factors,
                accuracy_score: accuracyScore,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating audience growth prediction:', error);
            return null;
        }
    }

    /**
     * Generate engagement trends prediction
     */
    static async generateEngagementTrendsPrediction(business_id, target_metric, prediction_period) {
        try {
            // Analyze historical engagement data
            const historicalData = await this.analyzeHistoricalEngagementData(business_id, prediction_period);
            
            if (!historicalData || historicalData.length === 0) {
                return null;
            }

            // Calculate engagement prediction
            const prediction = this.calculateEngagementTrendsPrediction(historicalData, prediction_period);
            
            if (!prediction) {
                return null;
            }

            // Calculate confidence interval
            const confidenceInterval = this.calculateConfidenceInterval(prediction, historicalData);
            
            // Calculate accuracy score
            const accuracyScore = await this.calculatePredictionAccuracy(business_id, 'engagement_trends', target_metric);

            return {
                prediction_type: 'engagement_trends',
                target_metric: target_metric,
                prediction_period: prediction_period,
                current_value: prediction.current_value,
                predicted_value: prediction.predicted_value,
                confidence_interval: confidenceInterval,
                prediction_factors: prediction.factors,
                accuracy_score: accuracyScore,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating engagement trends prediction:', error);
            return null;
        }
    }

    /**
     * Generate content performance prediction
     */
    static async generateContentPerformancePrediction(business_id, target_metric, prediction_period) {
        try {
            // Analyze historical content data
            const historicalData = await this.analyzeHistoricalContentData(business_id, prediction_period);
            
            if (!historicalData || historicalData.length === 0) {
                return null;
            }

            // Calculate content performance prediction
            const prediction = this.calculateContentPerformancePrediction(historicalData, prediction_period);
            
            if (!prediction) {
                return null;
            }

            // Calculate confidence interval
            const confidenceInterval = this.calculateConfidenceInterval(prediction, historicalData);
            
            // Calculate accuracy score
            const accuracyScore = await this.calculatePredictionAccuracy(business_id, 'content_performance', target_metric);

            return {
                prediction_type: 'content_performance',
                target_metric: target_metric,
                prediction_period: prediction_period,
                current_value: prediction.current_value,
                predicted_value: prediction.predicted_value,
                confidence_interval: confidenceInterval,
                prediction_factors: prediction.factors,
                accuracy_score: accuracyScore,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating content performance prediction:', error);
            return null;
        }
    }

    /**
     * Generate ROI forecast prediction
     */
    static async generateROIForecastPrediction(business_id, target_metric, prediction_period) {
        try {
            // Analyze historical ROI data
            const historicalData = await this.analyzeHistoricalROIData(business_id, prediction_period);
            
            if (!historicalData || historicalData.length === 0) {
                return null;
            }

            // Calculate ROI prediction
            const prediction = this.calculateROIForecastPrediction(historicalData, prediction_period);
            
            if (!prediction) {
                return null;
            }

            // Calculate confidence interval
            const confidenceInterval = this.calculateConfidenceInterval(prediction, historicalData);
            
            // Calculate accuracy score
            const accuracyScore = await this.calculatePredictionAccuracy(business_id, 'roi_forecast', target_metric);

            return {
                prediction_type: 'roi_forecast',
                target_metric: target_metric,
                prediction_period: prediction_period,
                current_value: prediction.current_value,
                predicted_value: prediction.predicted_value,
                confidence_interval: confidenceInterval,
                prediction_factors: prediction.factors,
                accuracy_score: accuracyScore,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error generating ROI forecast prediction:', error);
            return null;
        }
    }

    /**
     * Save prediction to database
     */
    static async savePrediction(business_id, predictionData) {
        try {
            const prediction = {
                ...predictionData,
                business_id,
                created_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('predictive_analytics')
                .insert([prediction])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error saving prediction:', error);
            throw error;
        }
    }

    /**
     * Get prediction accuracy metrics
     */
    static async getPredictionAccuracy({ business_id, prediction_type, time_period }) {
        try {
            // Get historical predictions
            const { data: predictions, error } = await supabase
                .from('predictive_analytics')
                .select('*')
                .eq('business_id', business_id)
                .eq('prediction_type', prediction_type)
                .gte('created_at', new Date(Date.now() - this.getTimePeriodInMs(time_period)).toISOString());

            if (error) throw error;

            if (!predictions || predictions.length === 0) {
                return {
                    total_predictions: 0,
                    average_accuracy: 0,
                    accuracy_trend: [],
                    confidence_level: 'insufficient_data'
                };
            }

            // Calculate accuracy metrics
            const accuracyMetrics = this.calculateAccuracyMetrics(predictions);

            return {
                total_predictions: predictions.length,
                average_accuracy: accuracyMetrics.averageAccuracy,
                accuracy_trend: accuracyMetrics.accuracyTrend,
                confidence_level: accuracyMetrics.confidenceLevel,
                by_metric: accuracyMetrics.byMetric,
                by_period: accuracyMetrics.byPeriod
            };
        } catch (error) {
            console.error('Error getting prediction accuracy:', error);
            throw error;
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    /**
     * Analyze historical audience data
     */
    static async analyzeHistoricalAudienceData(business_id, prediction_period) {
        try {
            // This would integrate with your actual audience data
            // For now, return mock data structure
            return [
                {
                    date: '2024-01-01',
                    followers: 1000,
                    growth_rate: 0.05,
                    engagement_rate: 0.04
                },
                {
                    date: '2024-01-15',
                    followers: 1050,
                    growth_rate: 0.06,
                    engagement_rate: 0.045
                },
                {
                    date: '2024-01-30',
                    followers: 1113,
                    growth_rate: 0.07,
                    engagement_rate: 0.05
                }
            ];
        } catch (error) {
            console.error('Error analyzing historical audience data:', error);
            return [];
        }
    }

    /**
     * Analyze historical engagement data
     */
    static async analyzeHistoricalEngagementData(business_id, prediction_period) {
        try {
            // This would integrate with your actual engagement data
            return [
                {
                    date: '2024-01-01',
                    engagement_rate: 0.04,
                    reach: 1500,
                    interactions: 60
                },
                {
                    date: '2024-01-15',
                    engagement_rate: 0.045,
                    reach: 1600,
                    interactions: 72
                },
                {
                    date: '2024-01-30',
                    engagement_rate: 0.05,
                    reach: 1700,
                    interactions: 85
                }
            ];
        } catch (error) {
            console.error('Error analyzing historical engagement data:', error);
            return [];
        }
    }

    /**
     * Analyze historical content data
     */
    static async analyzeHistoricalContentData(business_id, prediction_period) {
        try {
            // This would integrate with your actual content data
            return [
                {
                    date: '2024-01-01',
                    content_count: 15,
                    avg_engagement: 0.04,
                    reach_per_post: 1200
                },
                {
                    date: '2024-01-15',
                    content_count: 18,
                    avg_engagement: 0.045,
                    reach_per_post: 1300
                },
                {
                    date: '2024-01-30',
                    content_count: 20,
                    avg_engagement: 0.05,
                    reach_per_post: 1400
                }
            ];
        } catch (error) {
            console.error('Error analyzing historical content data:', error);
            return [];
        }
    }

    /**
     * Analyze historical ROI data
     */
    static async analyzeHistoricalROIData(business_id, prediction_period) {
        try {
            // This would integrate with your actual ROI data
            return [
                {
                    date: '2024-01-01',
                    roi: 2.5,
                    investment: 1000,
                    returns: 2500
                },
                {
                    date: '2024-01-15',
                    roi: 2.8,
                    investment: 1200,
                    returns: 3360
                },
                {
                    date: '2024-01-30',
                    roi: 3.1,
                    investment: 1400,
                    returns: 4340
                }
            ];
        } catch (error) {
            console.error('Error analyzing historical ROI data:', error);
            return [];
        }
    }

    /**
     * Calculate audience growth prediction
     */
    static calculateAudienceGrowthPrediction(historicalData, prediction_period) {
        try {
            if (historicalData.length < 2) return null;

            // Calculate growth rate trend
            const growthRates = historicalData.map(data => data.growth_rate);
            const avgGrowthRate = growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
            
            // Calculate trend (simple linear regression)
            const trend = this.calculateLinearTrend(growthRates);
            
            // Predict future growth rate
            const periodsAhead = this.getPeriodsAhead(prediction_period);
            const predictedGrowthRate = avgGrowthRate + (trend * periodsAhead);
            
            // Calculate predicted value
            const currentValue = historicalData[historicalData.length - 1].followers;
            const predictedValue = currentValue * Math.pow(1 + predictedGrowthRate, periodsAhead);

            return {
                current_value: currentValue,
                predicted_value: Math.round(predictedValue),
                factors: {
                    historical_growth_rate: avgGrowthRate,
                    growth_trend: trend,
                    periods_ahead: periodsAhead,
                    prediction_method: 'linear_trend_analysis'
                }
            };
        } catch (error) {
            console.error('Error calculating audience growth prediction:', error);
            return null;
        }
    }

    /**
     * Calculate engagement trends prediction
     */
    static calculateEngagementTrendsPrediction(historicalData, prediction_period) {
        try {
            if (historicalData.length < 2) return null;

            // Calculate engagement rate trend
            const engagementRates = historicalData.map(data => data.engagement_rate);
            const avgEngagementRate = engagementRates.reduce((sum, rate) => sum + rate, 0) / engagementRates.length;
            
            // Calculate trend
            const trend = this.calculateLinearTrend(engagementRates);
            
            // Predict future engagement rate
            const periodsAhead = this.getPeriodsAhead(prediction_period);
            const predictedEngagementRate = avgEngagementRate + (trend * periodsAhead);

            return {
                current_value: avgEngagementRate,
                predicted_value: Math.max(0, predictedEngagementRate), // Ensure non-negative
                factors: {
                    historical_engagement_rate: avgEngagementRate,
                    engagement_trend: trend,
                    periods_ahead: periodsAhead,
                    prediction_method: 'linear_trend_analysis'
                }
            };
        } catch (error) {
            console.error('Error calculating engagement trends prediction:', error);
            return null;
        }
    }

    /**
     * Calculate content performance prediction
     */
    static calculateContentPerformancePrediction(historicalData, prediction_period) {
        try {
            if (historicalData.length < 2) return null;

            // Calculate engagement trend
            const engagementRates = historicalData.map(data => data.avg_engagement);
            const avgEngagementRate = engagementRates.reduce((sum, rate) => sum + rate, 0) / engagementRates.length;
            
            // Calculate trend
            const trend = this.calculateLinearTrend(engagementRates);
            
            // Predict future engagement rate
            const periodsAhead = this.getPeriodsAhead(prediction_period);
            const predictedEngagementRate = avgEngagementRate + (trend * periodsAhead);

            return {
                current_value: avgEngagementRate,
                predicted_value: Math.max(0, predictedEngagementRate),
                factors: {
                    historical_engagement_rate: avgEngagementRate,
                    engagement_trend: trend,
                    periods_ahead: periodsAhead,
                    prediction_method: 'linear_trend_analysis'
                }
            };
        } catch (error) {
            console.error('Error calculating content performance prediction:', error);
            return null;
        }
    }

    /**
     * Calculate ROI forecast prediction
     */
    static calculateROIForecastPrediction(historicalData, prediction_period) {
        try {
            if (historicalData.length < 2) return null;

            // Calculate ROI trend
            const roiValues = historicalData.map(data => data.roi);
            const avgROI = roiValues.reduce((sum, roi) => sum + roi, 0) / roiValues.length;
            
            // Calculate trend
            const trend = this.calculateLinearTrend(roiValues);
            
            // Predict future ROI
            const periodsAhead = this.getPeriodsAhead(prediction_period);
            const predictedROI = avgROI + (trend * periodsAhead);

            return {
                current_value: avgROI,
                predicted_value: Math.max(0, predictedROI),
                factors: {
                    historical_roi: avgROI,
                    roi_trend: trend,
                    periods_ahead: periodsAhead,
                    prediction_method: 'linear_trend_analysis'
                }
            };
        } catch (error) {
            console.error('Error calculating ROI forecast prediction:', error);
            return null;
        }
    }

    /**
     * Calculate linear trend
     */
    static calculateLinearTrend(values) {
        if (values.length < 2) return 0;

        const n = values.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = values.reduce((sum, val, index) => sum + (val * index), 0);
        const sumX2 = values.reduce((sum, val, index) => sum + (index * index), 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return slope;
    }

    /**
     * Calculate confidence interval
     */
    static calculateConfidenceInterval(prediction, historicalData) {
        try {
            // Calculate standard deviation of historical data
            const values = historicalData.map(data => {
                if (data.followers) return data.followers;
                if (data.engagement_rate) return data.engagement_rate;
                if (data.roi) return data.roi;
                return 0;
            });

            const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
            const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
            const stdDev = Math.sqrt(variance);

            // Calculate confidence interval (95% confidence)
            const confidenceLevel = 1.96; // 95% confidence
            const marginOfError = confidenceLevel * (stdDev / Math.sqrt(values.length));

            return {
                lower_bound: Math.max(0, prediction.predicted_value - marginOfError),
                upper_bound: prediction.predicted_value + marginOfError,
                confidence_level: 0.95,
                margin_of_error: marginOfError
            };
        } catch (error) {
            console.error('Error calculating confidence interval:', error);
            return {
                lower_bound: prediction.predicted_value * 0.8,
                upper_bound: prediction.predicted_value * 1.2,
                confidence_level: 0.8,
                margin_of_error: prediction.predicted_value * 0.2
            };
        }
    }

    /**
     * Calculate prediction accuracy
     */
    static async calculatePredictionAccuracy(business_id, prediction_type, target_metric) {
        try {
            // This would compare historical predictions with actual outcomes
            // For now, return a mock accuracy score
            const baseAccuracy = 0.75;
            const randomVariation = (Math.random() - 0.5) * 0.2; // ±10% variation
            
            return Math.max(0, Math.min(1, baseAccuracy + randomVariation));
        } catch (error) {
            console.error('Error calculating prediction accuracy:', error);
            return 0.75; // Default accuracy
        }
    }

    /**
     * Calculate accuracy metrics
     */
    static calculateAccuracyMetrics(predictions) {
        try {
            const accuracyScores = predictions.map(p => p.accuracy_score || 0).filter(score => score > 0);
            
            if (accuracyScores.length === 0) {
                return {
                    averageAccuracy: 0,
                    accuracyTrend: [],
                    confidenceLevel: 'insufficient_data',
                    byMetric: {},
                    byPeriod: {}
                };
            }

            const averageAccuracy = accuracyScores.reduce((sum, score) => sum + score, 0) / accuracyScores.length;
            
            // Calculate accuracy trend
            const accuracyTrend = predictions
                .filter(p => p.accuracy_score)
                .map(p => ({
                    date: p.created_at,
                    accuracy: p.accuracy_score
                }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            // Determine confidence level
            let confidenceLevel = 'low';
            if (averageAccuracy >= 0.8) confidenceLevel = 'high';
            else if (averageAccuracy >= 0.6) confidenceLevel = 'medium';

            // Group by metric
            const byMetric = predictions.reduce((acc, p) => {
                if (!acc[p.target_metric]) acc[p.target_metric] = [];
                acc[p.target_metric].push(p.accuracy_score || 0);
                return acc;
            }, {});

            // Group by period
            const byPeriod = predictions.reduce((acc, p) => {
                if (!acc[p.prediction_period]) acc[p.prediction_period] = [];
                acc[p.prediction_period].push(p.accuracy_score || 0);
                return acc;
            }, {});

            return {
                averageAccuracy: Math.round(averageAccuracy * 100) / 100,
                accuracyTrend: accuracyTrend,
                confidenceLevel: confidenceLevel,
                byMetric: Object.fromEntries(
                    Object.entries(byMetric).map(([metric, scores]) => [
                        metric,
                        Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100) / 100
                    ])
                ),
                byPeriod: Object.fromEntries(
                    Object.entries(byPeriod).map(([period, scores]) => [
                        period,
                        Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100) / 100
                    ])
                )
            };
        } catch (error) {
            console.error('Error calculating accuracy metrics:', error);
            return {
                averageAccuracy: 0,
                accuracyTrend: [],
                confidenceLevel: 'error',
                byMetric: {},
                byPeriod: {}
            };
        }
    }

    /**
     * Get periods ahead for prediction
     */
    static getPeriodsAhead(prediction_period) {
        const periods = {
            '7_days': 1,
            '30_days': 2,
            '90_days': 6,
            '1_year': 24
        };
        
        return periods[prediction_period] || 2;
    }

    /**
     * Get time period in milliseconds
     */
    static getTimePeriodInMs(timePeriod) {
        const periods = {
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000,
            '90d': 90 * 24 * 60 * 60 * 1000,
            '1y': 365 * 24 * 60 * 60 * 1000
        };
        
        return periods[timePeriod] || periods['30d'];
    }

    /**
     * Get prediction types
     */
    static getPredictionTypes() {
        return [
            'audience_growth',
            'engagement_trends',
            'content_performance',
            'roi_forecast',
            'conversion_prediction',
            'trend_forecast'
        ];
    }

    /**
     * Get target metrics
     */
    static getTargetMetrics() {
        return [
            'followers',
            'engagement_rate',
            'reach',
            'conversions',
            'revenue',
            'roi'
        ];
    }

    /**
     * Get prediction periods
     */
    static getPredictionPeriods() {
        return [
            '7_days',
            '30_days',
            '90_days',
            '1_year'
        ];
    }

    /**
     * Validate prediction configuration
     */
    static validatePredictionConfiguration(predictionData) {
        const errors = [];

        if (!predictionData.prediction_type) {
            errors.push('Prediction type is required');
        }

        if (!predictionData.target_metric) {
            errors.push('Target metric is required');
        }

        if (!predictionData.prediction_period) {
            errors.push('Prediction period is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

module.exports = PredictiveAnalyticsService;
