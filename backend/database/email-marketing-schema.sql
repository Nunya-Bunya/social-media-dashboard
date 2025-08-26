-- Email Marketing Center Database Schema
-- Extends the existing social media dashboard database

-- Email Subscribers Table
CREATE TABLE IF NOT EXISTS email_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(200),
    industry VARCHAR(100),
    location VARCHAR(200),
    subscription_source VARCHAR(100), -- website, form, import, manual
    status VARCHAR(50) DEFAULT 'active', -- active, unsubscribed, bounced, pending
    tags TEXT[], -- Custom tags for segmentation
    preferences JSONB, -- Email preferences, frequency, topics
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_email_sent TIMESTAMP,
    engagement_score INTEGER DEFAULT 0, -- 0-100 based on opens, clicks, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Lists/Segments Table
CREATE TABLE IF NOT EXISTS email_lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    business_id INTEGER REFERENCES businesses(id),
    criteria JSONB, -- Segmentation criteria (tags, industry, location, etc.)
    subscriber_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- List Subscribers Junction Table
CREATE TABLE IF NOT EXISTS list_subscribers (
    list_id INTEGER REFERENCES email_lists(id) ON DELETE CASCADE,
    subscriber_id INTEGER REFERENCES email_subscribers(id) ON DELETE CASCADE,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active', -- active, removed, unsubscribed
    PRIMARY KEY (list_id, subscriber_id)
);

-- Email Templates Table
CREATE TABLE IF NOT EXISTS email_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    subject_line VARCHAR(500),
    html_content TEXT,
    text_content TEXT,
    template_type VARCHAR(100), -- newsletter, announcement, promotion, welcome
    category VARCHAR(100), -- marketing, transactional, informational
    business_id INTEGER REFERENCES businesses(id),
    is_active BOOLEAN DEFAULT TRUE,
    variables JSONB, -- Template variables for personalization
    preview_image TEXT, -- URL to preview image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Campaigns Table
CREATE TABLE IF NOT EXISTS email_campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    subject_line VARCHAR(500) NOT NULL,
    template_id INTEGER REFERENCES email_templates(id),
    business_id INTEGER REFERENCES businesses(id),
    campaign_type VARCHAR(100), -- newsletter, announcement, promotion, drip
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, sending, sent, paused, cancelled
    target_lists INTEGER[], -- Array of list IDs
    target_subscribers INTEGER[], -- Array of specific subscriber IDs
    send_time TIMESTAMP,
    timezone VARCHAR(100),
    content JSONB, -- Campaign content (HTML, text, images)
    settings JSONB, -- Campaign settings (tracking, personalization, etc.)
    metrics JSONB, -- Campaign performance metrics
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Sends Table
CREATE TABLE IF NOT EXISTS email_sends (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES email_campaigns(id),
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    email_address VARCHAR(255) NOT NULL,
    subject_line VARCHAR(500),
    send_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status VARCHAR(50) DEFAULT 'sent', -- sent, delivered, failed, bounced
    open_status VARCHAR(50) DEFAULT 'not_opened', -- not_opened, opened, opened_multiple
    click_status VARCHAR(50) DEFAULT 'not_clicked', -- not_clicked, clicked, clicked_multiple
    first_open_time TIMESTAMP,
    last_open_time TIMESTAMP,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    bounce_type VARCHAR(50), -- hard_bounce, soft_bounce, spam
    bounce_reason TEXT,
    unsubscribe_time TIMESTAMP,
    spam_report_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Links Table (for click tracking)
CREATE TABLE IF NOT EXISTS email_links (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES email_campaigns(id),
    original_url TEXT NOT NULL,
    tracked_url TEXT NOT NULL,
    link_text VARCHAR(500),
    click_count INTEGER DEFAULT 0,
    unique_clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Link Clicks Table
CREATE TABLE IF NOT EXISTS email_link_clicks (
    id SERIAL PRIMARY KEY,
    link_id INTEGER REFERENCES email_links(id),
    send_id INTEGER REFERENCES email_sends(id),
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    click_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Automation Rules Table
CREATE TABLE IF NOT EXISTS email_automation_rules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    business_id INTEGER REFERENCES businesses(id),
    trigger_type VARCHAR(100), -- subscriber_joined, date_based, behavior_based
    trigger_conditions JSONB, -- Specific conditions that trigger the automation
    action_type VARCHAR(100), -- send_email, add_to_list, remove_from_list, update_field
    action_data JSONB, -- Data for the action (template_id, list_id, etc.)
    delay_minutes INTEGER DEFAULT 0, -- Delay before executing action
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Automation Executions Table
CREATE TABLE IF NOT EXISTS email_automation_executions (
    id SERIAL PRIMARY KEY,
    rule_id INTEGER REFERENCES email_automation_rules(id),
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    trigger_data JSONB, -- Data that triggered the automation
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- pending, executing, completed, failed
    result JSONB, -- Result of the automation execution
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Bounces Table
CREATE TABLE IF NOT EXISTS email_bounces (
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    bounce_type VARCHAR(50) NOT NULL, -- hard_bounce, soft_bounce, spam
    bounce_reason TEXT,
    bounce_category VARCHAR(100),
    campaign_id INTEGER REFERENCES email_campaigns(id),
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    bounce_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Unsubscribes Table
CREATE TABLE IF NOT EXISTS email_unsubscribes (
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    campaign_id INTEGER REFERENCES email_campaigns(id),
    reason TEXT,
    unsubscribe_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Spam Reports Table
CREATE TABLE IF NOT EXISTS email_spam_reports (
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    subscriber_id INTEGER REFERENCES email_subscribers(id),
    campaign_id INTEGER REFERENCES email_campaigns(id),
    report_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_status ON email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscription_date ON email_subscribers(subscription_date);
CREATE INDEX IF NOT EXISTS idx_email_lists_business_id ON email_lists(business_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_business_id ON email_templates(business_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_business_id ON email_campaigns(business_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_send_time ON email_campaigns(send_time);
CREATE INDEX IF NOT EXISTS idx_email_sends_campaign_id ON email_sends(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_subscriber_id ON email_sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_send_time ON email_sends(send_time);
CREATE INDEX IF NOT EXISTS idx_email_sends_delivery_status ON email_sends(delivery_status);
CREATE INDEX IF NOT EXISTS idx_email_links_campaign_id ON email_links(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_automation_rules_business_id ON email_automation_rules(business_id);
CREATE INDEX IF NOT EXISTS idx_email_bounces_email ON email_bounces(email_address);
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes(email_address);

-- Add comments for documentation
COMMENT ON TABLE email_subscribers IS 'Stores email subscribers and their information';
COMMENT ON TABLE email_lists IS 'Email lists and segments for targeting campaigns';
COMMENT ON TABLE list_subscribers IS 'Junction table linking subscribers to lists';
COMMENT ON TABLE email_templates IS 'Reusable email templates for campaigns';
COMMENT ON TABLE email_campaigns IS 'Email campaigns and their configuration';
COMMENT ON TABLE email_sends IS 'Individual email sends and delivery tracking';
COMMENT ON TABLE email_links IS 'Tracked links for click analytics';
COMMENT ON TABLE email_link_clicks IS 'Individual link click tracking';
COMMENT ON TABLE email_automation_rules IS 'Automation rules for triggered emails';
COMMENT ON TABLE email_automation_executions IS 'Execution history of automation rules';
COMMENT ON TABLE email_bounces IS 'Email bounce tracking and management';
COMMENT ON TABLE email_unsubscribes IS 'Unsubscribe tracking and reasons';
COMMENT ON TABLE email_spam_reports IS 'Spam report tracking';
