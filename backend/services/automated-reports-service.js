const { supabase } = require('../config');
const { v4: uuidv4 } = require('uuid');

class AutomatedReportsService {
    
    /**
     * Get reports with filtering and pagination
     */
    static async getReports({ business_id, report_type, schedule_type, is_active, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('automated_reports')
                .select(`
                    *,
                    report_generations(
                        id, generation_id, status, started_at, completed_at
                    )
                `)
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            // Apply filters
            if (report_type) {
                query = query.eq('report_type', report_type);
            }
            
            if (schedule_type) {
                query = query.eq('schedule_type', schedule_type);
            }
            
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
            console.error('Error in getReports:', error);
            throw error;
        }
    }

    /**
     * Get a specific report by ID
     */
    static async getReportById(id) {
        try {
            const { data, error } = await supabase
                .from('automated_reports')
                .select(`
                    *,
                    report_generations(
                        id, generation_id, status, started_at, completed_at, 
                        report_data, file_urls, delivery_status, error_details
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
            console.error('Error in getReportById:', error);
            throw error;
        }
    }

    /**
     * Create a new automated report
     */
    static async createReport(reportData) {
        try {
            // Validate required fields
            if (!reportData.report_name) {
                throw new Error('Report name is required');
            }

            if (!reportData.report_type) {
                throw new Error('Report type is required');
            }

            if (!reportData.schedule_type) {
                throw new Error('Schedule type is required');
            }

            // Set default values
            const report = {
                ...reportData,
                is_active: reportData.is_active !== undefined ? reportData.is_active : true,
                last_generated: null,
                next_generation: this.calculateNextGeneration(reportData.schedule_type, reportData.schedule_config),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('automated_reports')
                .insert([report])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createReport:', error);
            throw error;
        }
    }

    /**
     * Update an existing report
     */
    static async updateReport(id, updateData) {
        try {
            // Validate the report exists
            const existing = await this.getReportById(id);
            if (!existing) {
                throw new Error('Report not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            // Recalculate next generation if schedule changed
            if (updateData.schedule_type || updateData.schedule_config) {
                updatePayload.next_generation = this.calculateNextGeneration(
                    updateData.schedule_type || existing.schedule_type,
                    updateData.schedule_config || existing.schedule_config
                );
            }

            const { data, error } = await supabase
                .from('automated_reports')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateReport:', error);
            throw error;
        }
    }

    /**
     * Delete a report
     */
    static async deleteReport(id) {
        try {
            // Check if report exists
            const existing = await this.getReportById(id);
            if (!existing) {
                throw new Error('Report not found');
            }

            // Check if report has generations
            if (existing.report_generations && existing.report_generations.length > 0) {
                throw new Error('Cannot delete report with generation history. Consider deactivating instead.');
            }

            const { error } = await supabase
                .from('automated_reports')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteReport:', error);
            throw error;
        }
    }

    /**
     * Generate report manually
     */
    static async generateReport(reportId, { recipients, custom_data } = {}) {
        try {
            // Get report details
            const report = await this.getReportById(reportId);
            if (!report) {
                throw new Error('Report not found');
            }

            if (!report.is_active) {
                throw new Error('Report is not active');
            }

            // Create generation record
            const generationId = uuidv4();
            const generation = {
                report_id: reportId,
                generation_id: generationId,
                status: 'generating',
                started_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data: savedGeneration, error: saveError } = await supabase
                .from('report_generations')
                .insert([generation])
                .select()
                .single();

            if (saveError) {
                throw new Error(`Database error: ${saveError.message}`);
            }

            // Generate report asynchronously
            this.generateReportContent(report, savedGeneration, { recipients, custom_data });

            return savedGeneration;
        } catch (error) {
            console.error('Error in generateReport:', error);
            throw error;
        }
    }

    /**
     * Generate report content
     */
    static async generateReportContent(report, generation, options = {}) {
        try {
            const startTime = Date.now();
            let reportData = null;
            let fileUrls = null;
            let deliveryStatus = null;

            try {
                // Generate report data based on type
                reportData = await this.generateReportDataByType(report, options);
                
                // Generate report files
                fileUrls = await this.generateReportFiles(report, reportData);
                
                // Send report to recipients
                deliveryStatus = await this.deliverReport(report, reportData, fileUrls, options.recipients);
                
                // Update generation status to completed
                await this.updateGenerationStatus(generation.id, 'completed', null, {
                    report_data: reportData,
                    file_urls: fileUrls,
                    delivery_status: deliveryStatus,
                    performance_metrics: {
                        generation_time: Date.now() - startTime,
                        file_size: this.calculateFileSize(fileUrls),
                        recipient_count: options.recipients?.length || 0
                    }
                });

                // Update report last generated timestamp
                await this.updateReportLastGenerated(report.id);

            } catch (error) {
                console.error('Error generating report content:', error);
                await this.updateGenerationStatus(generation.id, 'failed', error.message, {
                    report_data: reportData,
                    file_urls: fileUrls,
                    delivery_status: deliveryStatus
                });
            }

        } catch (error) {
            console.error('Error in generateReportContent:', error);
            await this.updateGenerationStatus(generation.id, 'failed', error.message);
        }
    }

    /**
     * Generate report data by type
     */
    static async generateReportDataByType(report, options = {}) {
        try {
            let reportData = null;

            switch (report.report_type) {
                case 'performance_summary':
                    reportData = await this.generatePerformanceSummaryData(report.business_id, options);
                    break;
                case 'engagement_analysis':
                    reportData = await this.generateEngagementAnalysisData(report.business_id, options);
                    break;
                case 'competitive_analysis':
                    reportData = await this.generateCompetitiveAnalysisData(report.business_id, options);
                    break;
                case 'roi_report':
                    reportData = await this.generateROIReportData(report.business_id, options);
                    break;
                case 'content_performance':
                    reportData = await this.generateContentPerformanceData(report.business_id, options);
                    break;
                case 'audience_insights':
                    reportData = await this.generateAudienceInsightsData(report.business_id, options);
                    break;
                default:
                    throw new Error(`Unknown report type: ${report.report_type}`);
            }

            return {
                report_type: report.report_type,
                business_id: report.business_id,
                generated_at: new Date().toISOString(),
                data: reportData,
                custom_data: options.custom_data || {}
            };

        } catch (error) {
            console.error('Error generating report data:', error);
            throw error;
        }
    }

    /**
     * Generate performance summary data
     */
    static async generatePerformanceSummaryData(business_id, options = {}) {
        try {
            // This would integrate with your actual performance data
            // For now, return mock data structure
            return {
                overview: {
                    total_followers: 12500,
                    total_engagement: 0.045,
                    total_reach: 45000,
                    growth_rate: 0.08
                },
                metrics: {
                    followers: {
                        current: 12500,
                        previous: 11500,
                        change: 0.087,
                        trend: 'increasing'
                    },
                    engagement: {
                        current: 0.045,
                        previous: 0.042,
                        change: 0.071,
                        trend: 'increasing'
                    },
                    reach: {
                        current: 45000,
                        previous: 42000,
                        change: 0.071,
                        trend: 'increasing'
                    }
                },
                top_performing_content: [
                    {
                        content_id: 1,
                        title: 'Product Launch Video',
                        engagement_rate: 0.062,
                        reach: 8500
                    },
                    {
                        content_id: 2,
                        title: 'Customer Success Story',
                        engagement_rate: 0.058,
                        reach: 7200
                    }
                ],
                insights: [
                    'Video content shows 25% higher engagement than images',
                    'Posts published at 9 AM have 30% higher reach',
                    'User-generated content generates 40% more interactions'
                ]
            };
        } catch (error) {
            console.error('Error generating performance summary data:', error);
            return {};
        }
    }

    /**
     * Generate engagement analysis data
     */
    static async generateEngagementAnalysisData(business_id, options = {}) {
        try {
            // This would integrate with your actual engagement data
            return {
                engagement_overview: {
                    total_engagement: 0.045,
                    engagement_by_platform: {
                        instagram: 0.052,
                        facebook: 0.038,
                        linkedin: 0.041
                    },
                    engagement_by_content_type: {
                        video: 0.062,
                        image: 0.045,
                        text: 0.032
                    }
                },
                engagement_trends: [
                    {
                        date: '2024-01-01',
                        engagement_rate: 0.042,
                        reach: 15000
                    },
                    {
                        date: '2024-01-15',
                        engagement_rate: 0.045,
                        reach: 16000
                    },
                    {
                        date: '2024-01-30',
                        engagement_rate: 0.048,
                        reach: 17000
                    }
                ],
                audience_behavior: {
                    peak_engagement_hours: [9, 12, 18],
                    preferred_content_formats: ['video', 'image'],
                    engagement_frequency: 'daily'
                },
                recommendations: [
                    'Increase video content production by 30%',
                    'Schedule posts during peak engagement hours',
                    'Focus on Instagram platform for highest engagement'
                ]
            };
        } catch (error) {
            console.error('Error generating engagement analysis data:', error);
            return {};
        }
    }

    /**
     * Generate competitive analysis data
     */
    static async generateCompetitiveAnalysisData(business_id, options = {}) {
        try {
            // This would integrate with your actual competitive data
            return {
                competitive_overview: {
                    market_position: 'challenger',
                    market_share: 0.15,
                    competitive_advantage: 'content_quality'
                },
                competitor_analysis: [
                    {
                        competitor: 'Competitor A',
                        followers: 25000,
                        engagement_rate: 0.038,
                        content_frequency: 'daily',
                        strengths: ['brand_recognition', 'influencer_partnerships'],
                        weaknesses: ['content_consistency', 'community_engagement']
                    },
                    {
                        competitor: 'Competitor B',
                        followers: 18000,
                        engagement_rate: 0.042,
                        content_frequency: 'weekly',
                        strengths: ['content_creativity', 'audience_targeting'],
                        weaknesses: ['posting_frequency', 'platform_diversity']
                    }
                ],
                market_opportunities: [
                    'Increase content frequency to match top competitors',
                    'Develop influencer partnership strategy',
                    'Focus on underserved audience segments'
                ],
                competitive_threats: [
                    'New market entrants with aggressive pricing',
                    'Established competitors expanding content offerings',
                    'Changing algorithm preferences'
                ]
            };
        } catch (error) {
            console.error('Error generating competitive analysis data:', error);
            return {};
        }
    }

    /**
     * Generate ROI report data
     */
    static async generateROIReportData(business_id, options = {}) {
        try {
            // This would integrate with your actual ROI data
            return {
                roi_overview: {
                    total_investment: 15000,
                    total_returns: 42000,
                    overall_roi: 2.8,
                    payback_period: '8 months'
                },
                roi_by_campaign: [
                    {
                        campaign: 'Product Launch Q1',
                        investment: 5000,
                        returns: 15000,
                        roi: 3.0,
                        performance: 'excellent'
                    },
                    {
                        campaign: 'Brand Awareness Q2',
                        investment: 3000,
                        returns: 8000,
                        roi: 2.67,
                        performance: 'good'
                    }
                ],
                roi_by_channel: {
                    social_media: 2.9,
                    email_marketing: 3.2,
                    content_marketing: 2.6,
                    influencer_marketing: 2.4
                },
                roi_trends: [
                    {
                        period: 'Q1 2024',
                        roi: 2.5,
                        investment: 8000,
                        returns: 20000
                    },
                    {
                        period: 'Q2 2024',
                        roi: 2.8,
                        investment: 7000,
                        returns: 19600
                    }
                ],
                recommendations: [
                    'Increase investment in email marketing (highest ROI)',
                    'Optimize influencer marketing campaigns for better returns',
                    'Scale successful Q1 product launch strategy'
                ]
            };
        } catch (error) {
            console.error('Error generating ROI report data:', error);
            return {};
        }
    }

    /**
     * Generate content performance data
     */
    static async generateContentPerformanceData(business_id, options = {}) {
        try {
            // This would integrate with your actual content data
            return {
                content_overview: {
                    total_posts: 120,
                    avg_engagement_rate: 0.045,
                    avg_reach_per_post: 3800,
                    content_frequency: 'daily'
                },
                content_by_type: {
                    video: {
                        count: 45,
                        engagement_rate: 0.062,
                        reach: 4200,
                        performance: 'excellent'
                    },
                    image: {
                        count: 60,
                        engagement_rate: 0.045,
                        reach: 3600,
                        performance: 'good'
                    },
                    text: {
                        count: 15,
                        engagement_rate: 0.032,
                        reach: 2800,
                        performance: 'fair'
                    }
                },
                top_performing_content: [
                    {
                        content_id: 1,
                        type: 'video',
                        title: 'Product Demo',
                        engagement_rate: 0.085,
                        reach: 8500,
                        insights: 'High engagement due to product demonstration'
                    },
                    {
                        content_id: 2,
                        type: 'image',
                        title: 'Customer Testimonial',
                        engagement_rate: 0.072,
                        reach: 7200,
                        insights: 'Authentic customer stories drive engagement'
                    }
                ],
                content_insights: [
                    'Video content generates 38% higher engagement than images',
                    'Posts with customer testimonials perform 25% better',
                    'Content published on Tuesdays has 15% higher reach'
                ]
            };
        } catch (error) {
            console.error('Error generating content performance data:', error);
            return {};
        }
    }

    /**
     * Generate audience insights data
     */
    static async generateAudienceInsightsData(business_id, options = {}) {
        try {
            // This would integrate with your actual audience data
            return {
                audience_overview: {
                    total_followers: 12500,
                    active_followers: 8900,
                    engagement_rate: 0.045,
                    growth_rate: 0.08
                },
                demographics: {
                    age_groups: {
                        '18-24': 0.25,
                        '25-34': 0.35,
                        '35-44': 0.28,
                        '45+': 0.12
                    },
                    gender_distribution: {
                        male: 0.42,
                        female: 0.58
                    },
                    locations: {
                        'United States': 0.65,
                        'Canada': 0.15,
                        'United Kingdom': 0.12,
                        'Other': 0.08
                    }
                },
                behavior_patterns: {
                    peak_activity_hours: [9, 12, 18],
                    preferred_content_types: ['video', 'image', 'text'],
                    engagement_frequency: 'daily',
                    platform_preferences: {
                        instagram: 0.45,
                        facebook: 0.35,
                        linkedin: 0.20
                    }
                },
                audience_segments: [
                    {
                        segment: 'high_engagers',
                        size: 2500,
                        engagement_rate: 0.08,
                        characteristics: 'Active daily, prefers video content, high interaction rate'
                    },
                    {
                        segment: 'casual_followers',
                        size: 7500,
                        engagement_rate: 0.03,
                        characteristics: 'Weekly engagement, prefers image content, moderate interaction'
                    },
                    {
                        segment: 'lapsed_followers',
                        size: 2500,
                        engagement_rate: 0.01,
                        characteristics: 'Monthly engagement, low interaction, re-engagement opportunity'
                    }
                ],
                growth_opportunities: [
                    'Target 25-34 age group for highest engagement potential',
                    'Increase video content for high-engager segment',
                    'Develop re-engagement campaigns for lapsed followers'
                ]
            };
        } catch (error) {
            console.error('Error generating audience insights data:', error);
            return {};
        }
    }

    /**
     * Generate report files
     */
    static async generateReportFiles(report, reportData) {
        try {
            // This would integrate with your actual file generation service
            // For now, return mock file URLs
            const timestamp = new Date().toISOString().split('T')[0];
            const reportName = report.report_name.replace(/\s+/g, '_').toLowerCase();
            
            return {
                pdf: `https://reports.example.com/${reportName}_${timestamp}.pdf`,
                excel: `https://reports.example.com/${reportName}_${timestamp}.xlsx`,
                json: `https://reports.example.com/${reportName}_${timestamp}.json`
            };
        } catch (error) {
            console.error('Error generating report files:', error);
            return {};
        }
    }

    /**
     * Deliver report to recipients
     */
    static async deliverReport(report, reportData, fileUrls, recipients = []) {
        try {
            // This would integrate with your actual delivery service
            // For now, return mock delivery status
            const deliveryResults = [];

            if (recipients && recipients.length > 0) {
                for (const recipient of recipients) {
                    deliveryResults.push({
                        recipient: recipient,
                        status: 'delivered',
                        method: 'email',
                        delivered_at: new Date().toISOString(),
                        message_id: `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                    });
                }
            } else {
                // Use default recipients from report
                const defaultRecipients = report.recipients || [];
                for (const recipient of defaultRecipients) {
                    deliveryResults.push({
                        recipient: recipient,
                        status: 'delivered',
                        method: 'email',
                        delivered_at: new Date().toISOString(),
                        message_id: `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                    });
                }
            }

            return {
                total_recipients: deliveryResults.length,
                successful_deliveries: deliveryResults.filter(r => r.status === 'delivered').length,
                failed_deliveries: deliveryResults.filter(r => r.status === 'failed').length,
                delivery_details: deliveryResults
            };
        } catch (error) {
            console.error('Error delivering report:', error);
            return {
                total_recipients: 0,
                successful_deliveries: 0,
                failed_deliveries: 0,
                delivery_details: [],
                error: error.message
            };
        }
    }

    /**
     * Get report generations
     */
    static async getReportGenerations(reportId, { status, page = 1, limit = 20 } = {}) {
        try {
            let query = supabase
                .from('report_generations')
                .select('*')
                .eq('report_id', reportId)
                .order('started_at', { ascending: false });

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
            console.error('Error in getReportGenerations:', error);
            throw error;
        }
    }

    /**
     * Update generation status
     */
    static async updateGenerationStatus(generationId, status, errorDetails = null, additionalData = {}) {
        try {
            const updateData = {
                status,
                updated_at: new Date().toISOString()
            };

            if (status === 'completed') {
                updateData.completed_at = new Date().toISOString();
            }

            if (errorDetails) {
                updateData.error_details = errorDetails;
            }

            // Add additional data
            Object.assign(updateData, additionalData);

            const { error } = await supabase
                .from('report_generations')
                .update(updateData)
                .eq('id', generationId);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error updating generation status:', error);
            throw error;
        }
    }

    /**
     * Update report last generated timestamp
     */
    static async updateReportLastGenerated(reportId) {
        try {
            const { error } = await supabase
                .from('automated_reports')
                .update({ 
                    last_generated: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', reportId);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating report last generated:', error);
            // Don't throw error as this is not critical
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    /**
     * Calculate next generation time
     */
    static calculateNextGeneration(scheduleType, scheduleConfig) {
        try {
            const now = new Date();
            let nextGeneration = new Date(now);

            switch (scheduleType) {
                case 'daily':
                    nextGeneration.setDate(now.getDate() + 1);
                    break;
                case 'weekly':
                    nextGeneration.setDate(now.getDate() + 7);
                    break;
                case 'monthly':
                    nextGeneration.setMonth(now.getMonth() + 1);
                    break;
                case 'quarterly':
                    nextGeneration.setMonth(now.getMonth() + 3);
                    break;
                case 'yearly':
                    nextGeneration.setFullYear(now.getFullYear() + 1);
                    break;
                case 'custom':
                    if (scheduleConfig && scheduleConfig.next_generation) {
                        nextGeneration = new Date(scheduleConfig.next_generation);
                    } else {
                        nextGeneration.setDate(now.getDate() + 1); // Default to daily
                    }
                    break;
                default:
                    nextGeneration.setDate(now.getDate() + 1); // Default to daily
            }

            // Set to 9 AM
            nextGeneration.setHours(9, 0, 0, 0);

            return nextGeneration.toISOString();
        } catch (error) {
            console.error('Error calculating next generation:', error);
            const fallback = new Date();
            fallback.setDate(fallback.getDate() + 1);
            fallback.setHours(9, 0, 0, 0);
            return fallback.toISOString();
        }
    }

    /**
     * Calculate file size
     */
    static calculateFileSize(fileUrls) {
        try {
            if (!fileUrls) return 0;
            
            // Mock file size calculation
            // In a real implementation, this would check actual file sizes
            let totalSize = 0;
            
            if (fileUrls.pdf) totalSize += 1024 * 1024; // 1MB
            if (fileUrls.excel) totalSize += 512 * 1024; // 512KB
            if (fileUrls.json) totalSize += 256 * 1024; // 256KB
            
            return totalSize;
        } catch (error) {
            console.error('Error calculating file size:', error);
            return 0;
        }
    }

    /**
     * Get report types
     */
    static getReportTypes() {
        return [
            'performance_summary',
            'engagement_analysis',
            'competitive_analysis',
            'roi_report',
            'content_performance',
            'audience_insights',
            'custom'
        ];
    }

    /**
     * Get schedule types
     */
    static getScheduleTypes() {
        return [
            'daily',
            'weekly',
            'monthly',
            'quarterly',
            'yearly',
            'custom'
        ];
    }

    /**
     * Validate report configuration
     */
    static validateReportConfiguration(reportData) {
        const errors = [];

        if (!reportData.report_name) {
            errors.push('Report name is required');
        }

        if (!reportData.report_type) {
            errors.push('Report type is required');
        }

        if (!reportData.schedule_type) {
            errors.push('Schedule type is required');
        }

        if (reportData.schedule_type === 'custom' && !reportData.schedule_config) {
            errors.push('Schedule configuration is required for custom schedules');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

module.exports = AutomatedReportsService;
