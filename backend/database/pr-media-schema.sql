-- PR & Media Management Database Schema
-- Extends the existing social media dashboard database

-- Press Releases Table
CREATE TABLE IF NOT EXISTS press_releases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    content TEXT NOT NULL,
    summary TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft, review, approved, published, archived
    author_id INTEGER REFERENCES users(id),
    business_id INTEGER REFERENCES businesses(id),
    target_audience TEXT[],
    key_messages TEXT[],
    embargo_date TIMESTAMP,
    publish_date TIMESTAMP,
    distribution_channels TEXT[], -- email, wire_service, social_media, website
    tags TEXT[],
    attachments JSONB, -- Store file references, links, etc.
    metrics JSONB, -- Track opens, clicks, coverage, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Contacts Table
CREATE TABLE IF NOT EXISTS media_contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    title VARCHAR(200),
    outlet_name VARCHAR(200) NOT NULL,
    outlet_type VARCHAR(100), -- newspaper, magazine, tv, radio, online, blog
    beat_coverage TEXT[], -- Areas they cover
    location VARCHAR(200),
    social_media JSONB, -- LinkedIn, Twitter, etc.
    notes TEXT,
    relationship_status VARCHAR(50) DEFAULT 'prospect', -- prospect, contact, relationship, advocate
    last_contact_date TIMESTAMP,
    preferred_contact_method VARCHAR(50), -- email, phone, social_media
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Journalist Profiles Table
CREATE TABLE IF NOT EXISTS journalists (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES media_contacts(id),
    bio TEXT,
    expertise_areas TEXT[],
    writing_style VARCHAR(100), -- investigative, feature, news, opinion
    audience_size VARCHAR(50), -- small, medium, large, enterprise
    influence_score INTEGER, -- 1-100 scale
    response_rate DECIMAL(5,2), -- Percentage of emails they respond to
    average_response_time INTEGER, -- Hours to respond
    preferred_topics TEXT[],
    blacklisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Coverage Tracking Table
CREATE TABLE IF NOT EXISTS media_coverage (
    id SERIAL PRIMARY KEY,
    press_release_id INTEGER REFERENCES press_releases(id),
    outlet_name VARCHAR(200) NOT NULL,
    coverage_type VARCHAR(100), -- mention, quote, feature, interview, op_ed
    headline VARCHAR(500),
    url TEXT,
    author VARCHAR(200),
    publish_date TIMESTAMP,
    reach_estimate INTEGER,
    sentiment VARCHAR(50), -- positive, negative, neutral, mixed
    key_quotes TEXT[],
    impact_score INTEGER, -- 1-100 scale
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Outreach Campaigns Table
CREATE TABLE IF NOT EXISTS outreach_campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    press_release_id INTEGER REFERENCES press_releases(id),
    target_contacts INTEGER[], -- Array of media_contacts.id
    campaign_type VARCHAR(100), -- press_release, story_pitch, interview_request
    status VARCHAR(50) DEFAULT 'planned', -- planned, active, completed, paused
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    success_metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Outreach Attempts Table
CREATE TABLE IF NOT EXISTS outreach_attempts (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES outreach_campaigns(id),
    contact_id INTEGER REFERENCES media_contacts(id),
    press_release_id INTEGER REFERENCES press_releases(id),
    attempt_type VARCHAR(100), -- initial_pitch, follow_up, reminder
    method VARCHAR(50), -- email, phone, social_media, in_person
    content TEXT,
    sent_at TIMESTAMP,
    response_received BOOLEAN DEFAULT FALSE,
    response_content TEXT,
    response_date TIMESTAMP,
    outcome VARCHAR(100), -- no_response, interested, not_interested, coverage_secured
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_press_releases_business_id ON press_releases(business_id);
CREATE INDEX IF NOT EXISTS idx_press_releases_status ON press_releases(status);
CREATE INDEX IF NOT EXISTS idx_press_releases_publish_date ON press_releases(publish_date);
CREATE INDEX IF NOT EXISTS idx_media_contacts_outlet_type ON media_contacts(outlet_type);
CREATE INDEX IF NOT EXISTS idx_media_contacts_relationship_status ON media_contacts(relationship_status);
CREATE INDEX IF NOT EXISTS idx_journalists_influence_score ON journalists(influence_score);
CREATE INDEX IF NOT EXISTS idx_media_coverage_press_release_id ON media_coverage(press_release_id);
CREATE INDEX IF NOT EXISTS idx_media_coverage_sentiment ON media_coverage(sentiment);
CREATE INDEX IF NOT EXISTS idx_outreach_campaigns_status ON outreach_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_outreach_attempts_contact_id ON outreach_attempts(contact_id);

-- Add comments for documentation
COMMENT ON TABLE press_releases IS 'Stores press releases and their metadata';
COMMENT ON TABLE media_contacts IS 'Stores media contacts and journalists information';
COMMENT ON TABLE journalists IS 'Extended profiles for journalists with influence metrics';
COMMENT ON TABLE media_coverage IS 'Tracks media coverage and mentions';
COMMENT ON TABLE outreach_campaigns IS 'Manages media outreach campaigns';
COMMENT ON TABLE outreach_attempts IS 'Tracks individual outreach attempts and responses';
