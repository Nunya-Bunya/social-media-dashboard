-- Social Media Integration Database Schema

-- Social Media Connections Table
CREATE TABLE IF NOT EXISTS social_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'facebook', 'instagram', 'linkedin', 'twitter'
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    platform_user_id VARCHAR(255),
    metadata JSONB, -- Store platform-specific data (pages, profiles, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform)
);

-- Social Media Posts Table
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    platforms TEXT[] NOT NULL, -- Array of platforms where post was published
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'published', 'failed', 'partial_failure'
    results JSONB, -- Store results from each platform
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled Posts Table
CREATE TABLE IF NOT EXISTS scheduled_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    platforms TEXT[] NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'published', 'cancelled', 'failed'
    results JSONB,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post Analytics Table
CREATE TABLE IF NOT EXISTS post_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL,
    platform VARCHAR(50) NOT NULL,
    platform_post_id VARCHAR(255),
    impressions INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    engagement INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    analytics_data JSONB, -- Store platform-specific analytics
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social_connections_platform ON social_connections(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_user_id ON scheduled_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_time ON scheduled_posts(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX IF NOT EXISTS idx_post_analytics_post_id ON post_analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_post_analytics_platform ON post_analytics(platform);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_social_connections_updated_at BEFORE UPDATE ON social_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_posts_updated_at BEFORE UPDATE ON scheduled_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_analytics ENABLE ROW LEVEL SECURITY;

-- Social connections policies
CREATE POLICY "Users can view own connections" ON social_connections
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own connections" ON social_connections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own connections" ON social_connections
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own connections" ON social_connections
    FOR DELETE USING (auth.uid() = user_id);

-- Social posts policies
CREATE POLICY "Users can view own posts" ON social_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own posts" ON social_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Scheduled posts policies
CREATE POLICY "Users can view own scheduled posts" ON scheduled_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scheduled posts" ON scheduled_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled posts" ON scheduled_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled posts" ON scheduled_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Post analytics policies
CREATE POLICY "Users can view own post analytics" ON post_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own post analytics" ON post_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);


