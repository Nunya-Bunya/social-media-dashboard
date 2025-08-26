-- Advanced Automation System Database Schema
-- Extends the existing social media dashboard database

-- AI Insights Engine Table
CREATE TABLE IF NOT EXISTS ai_insights (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    insight_type VARCHAR(100) NOT NULL, -- content_optimization, audience_analysis, trend_prediction, competitive_insight
    category VARCHAR(100), -- performance, engagement, growth, optimization
    title VARCHAR(255) NOT NULL,
    description TEXT,
    insight_data JSONB, -- Structured data for the insight
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00 confidence level
    impact_score INTEGER, -- 1-100 impact potential
    priority VARCHAR(50), -- low, medium, high, critical
    status VARCHAR(50) DEFAULT 'active', -- active, dismissed, implemented, archived
    source_data JSONB, -- Data sources used to generate the insight
    ai_model_version VARCHAR(100), -- Version of AI model used
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP, -- When the insight becomes stale
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automated Workflows Table
CREATE TABLE IF NOT EXISTS automated_workflows (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_type VARCHAR(100), -- content_automation, reporting, engagement, optimization
    trigger_type VARCHAR(100), -- scheduled, event_based, threshold_based, manual
    trigger_conditions JSONB, -- Specific conditions that trigger the workflow
    workflow_steps JSONB, -- Array of workflow steps and actions
    is_active BOOLEAN DEFAULT TRUE,
    execution_frequency VARCHAR(100), -- daily, weekly, monthly, on_demand
    last_executed TIMESTAMP,
    next_execution TIMESTAMP,
    execution_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2), -- Percentage of successful executions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workflow Executions Table
CREATE TABLE IF NOT EXISTS workflow_executions (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER REFERENCES automated_workflows(id),
    execution_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'running', -- running, completed, failed, cancelled
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    execution_data JSONB, -- Data passed between workflow steps
    step_results JSONB, -- Results of each workflow step
    error_details TEXT,
    performance_metrics JSONB, -- Execution time, memory usage, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smart Recommendations Table
CREATE TABLE IF NOT EXISTS smart_recommendations (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    recommendation_type VARCHAR(100) NOT NULL, -- content_idea, posting_time, audience_targeting, hashtag_suggestion
    category VARCHAR(100), -- content, timing, audience, engagement, growth
    title VARCHAR(255) NOT NULL,
    description TEXT,
    recommendation_data JSONB, -- Structured data for the recommendation
    reasoning TEXT, -- AI explanation of why this recommendation was made
    expected_impact JSONB, -- Predicted outcomes and metrics
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00 confidence level
    priority VARCHAR(50), -- low, medium, high, critical
    status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, implemented
    source_insights INTEGER[], -- Array of ai_insights.id that led to this recommendation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predictive Analytics Table
CREATE TABLE IF NOT EXISTS predictive_analytics (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    prediction_type VARCHAR(100) NOT NULL, -- audience_growth, engagement_trends, content_performance, roi_forecast
    target_metric VARCHAR(100), -- followers, engagement_rate, reach, conversions
    prediction_period VARCHAR(100), -- 7_days, 30_days, 90_days, 1_year
    current_value DECIMAL(10,2),
    predicted_value DECIMAL(10,2),
    confidence_interval JSONB, -- Upper and lower bounds with confidence level
    prediction_factors JSONB, -- Factors that influenced the prediction
    accuracy_score DECIMAL(3,2), -- Historical accuracy of similar predictions
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automated Reports Table
CREATE TABLE IF NOT EXISTS automated_reports (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100), -- performance_summary, engagement_analysis, competitive_analysis, roi_report
    schedule_type VARCHAR(100), -- daily, weekly, monthly, quarterly, custom
    schedule_config JSONB, -- Cron expression or specific timing rules
    recipients JSONB, -- Array of email addresses or user IDs
    report_template JSONB, -- Report structure and visualization preferences
    data_sources JSONB, -- Sources of data for the report
    last_generated TIMESTAMP,
    next_generation TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report Generations Table
CREATE TABLE IF NOT EXISTS report_generations (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES automated_reports(id),
    generation_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'generating', -- generating, completed, failed, cancelled
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    report_data JSONB, -- Generated report data and visualizations
    file_urls JSONB, -- URLs to generated PDF/Excel files
    delivery_status JSONB, -- Status of email delivery to recipients
    error_details TEXT,
    performance_metrics JSONB, -- Generation time, file size, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Optimization Rules Table
CREATE TABLE IF NOT EXISTS content_optimization_rules (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    rule_name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(100), -- hashtag_optimization, posting_time, content_format, audience_targeting
    rule_conditions JSONB, -- Conditions when the rule applies
    optimization_actions JSONB, -- Actions to take for optimization
    performance_thresholds JSONB, -- Thresholds for rule activation
    is_active BOOLEAN DEFAULT TRUE,
    priority INTEGER DEFAULT 0, -- Higher numbers = higher priority
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Model Training Data Table
CREATE TABLE IF NOT EXISTS ai_model_training_data (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    data_type VARCHAR(100) NOT NULL, -- content_performance, audience_behavior, engagement_patterns
    data_source VARCHAR(100), -- social_media, analytics, user_feedback, external_api
    raw_data JSONB, -- Raw training data
    processed_data JSONB, -- Processed and cleaned data
    data_quality_score DECIMAL(3,2), -- 0.00 to 1.00 quality assessment
    training_status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    model_version VARCHAR(100), -- Version of model trained with this data
    training_metrics JSONB, -- Accuracy, precision, recall, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation Triggers Table
CREATE TABLE IF NOT EXISTS automation_triggers (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    trigger_name VARCHAR(255) NOT NULL,
    trigger_type VARCHAR(100), -- threshold, schedule, event, pattern
    trigger_conditions JSONB, -- Specific conditions that activate the trigger
    target_workflows INTEGER[], -- Array of workflow IDs to trigger
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered TIMESTAMP,
    trigger_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smart Alerts Table
CREATE TABLE IF NOT EXISTS smart_alerts (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    alert_type VARCHAR(100) NOT NULL, -- performance_drop, opportunity_detected, anomaly_detected, threshold_reached
    severity VARCHAR(50), -- info, warning, critical, emergency
    title VARCHAR(255) NOT NULL,
    message TEXT,
    alert_data JSONB, -- Structured data for the alert
    source_metrics JSONB, -- Metrics that triggered the alert
    recommended_actions JSONB, -- Suggested actions to address the alert
    status VARCHAR(50) DEFAULT 'active', -- active, acknowledged, resolved, dismissed
    acknowledged_by INTEGER REFERENCES users(id),
    acknowledged_at TIMESTAMP,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Benchmarks Table
CREATE TABLE IF NOT EXISTS performance_benchmarks (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    benchmark_type VARCHAR(100) NOT NULL, -- industry_average, competitor_analysis, historical_performance, goal_targets
    metric_name VARCHAR(100), -- engagement_rate, follower_growth, reach, conversions
    benchmark_value DECIMAL(10,2),
    comparison_data JSONB, -- Data used for comparison
    benchmark_period VARCHAR(100), -- daily, weekly, monthly, quarterly
    confidence_level DECIMAL(3,2), -- Statistical confidence in the benchmark
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_insights_business_id ON ai_insights(business_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_status ON ai_insights(status);
CREATE INDEX IF NOT EXISTS idx_ai_insights_generated_at ON ai_insights(generated_at);
CREATE INDEX IF NOT EXISTS idx_automated_workflows_business_id ON automated_workflows(business_id);
CREATE INDEX IF NOT EXISTS idx_automated_workflows_type ON automated_workflows(workflow_type);
CREATE INDEX IF NOT EXISTS idx_automated_workflows_status ON automated_workflows(is_active);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_smart_recommendations_business_id ON smart_recommendations(business_id);
CREATE INDEX IF NOT EXISTS idx_smart_recommendations_type ON smart_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_smart_recommendations_status ON smart_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_predictive_analytics_business_id ON predictive_analytics(business_id);
CREATE INDEX IF NOT EXISTS idx_predictive_analytics_type ON predictive_analytics(prediction_type);
CREATE INDEX IF NOT EXISTS idx_automated_reports_business_id ON automated_reports(business_id);
CREATE INDEX IF NOT EXISTS idx_automated_reports_type ON automated_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_automated_reports_schedule ON automated_reports(schedule_type);
CREATE INDEX IF NOT EXISTS idx_content_optimization_rules_business_id ON content_optimization_rules(business_id);
CREATE INDEX IF NOT EXISTS idx_automation_triggers_business_id ON automation_triggers(business_id);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_business_id ON smart_alerts(business_id);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_severity ON smart_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_status ON smart_alerts(status);
CREATE INDEX IF NOT EXISTS idx_performance_benchmarks_business_id ON performance_benchmarks(business_id);

-- Add comments for documentation
COMMENT ON TABLE ai_insights IS 'AI-generated insights and recommendations for business optimization';
COMMENT ON TABLE automated_workflows IS 'Automated workflow definitions and configurations';
COMMENT ON TABLE workflow_executions IS 'Execution history and results of automated workflows';
COMMENT ON TABLE smart_recommendations IS 'AI-powered recommendations for various business aspects';
COMMENT ON TABLE predictive_analytics IS 'Predictive models and forecasts for business metrics';
COMMENT ON TABLE automated_reports IS 'Automated report generation and scheduling';
COMMENT ON TABLE report_generations IS 'Individual report generation instances and results';
COMMENT ON TABLE content_optimization_rules IS 'Rules for automatic content optimization';
COMMENT ON TABLE ai_model_training_data IS 'Data used for training and improving AI models';
COMMENT ON TABLE automation_triggers IS 'Triggers that activate automated workflows';
COMMENT ON TABLE smart_alerts IS 'Intelligent alerts based on performance and anomalies';
COMMENT ON TABLE performance_benchmarks IS 'Performance benchmarks and comparison data';
