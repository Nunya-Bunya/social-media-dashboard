# 🚀 Social Media Integration Setup Guide

## 🎯 **What's Been Added**

Your backend now includes **complete social media platform integration** with:

- ✅ **Facebook/Instagram Graph API** integration
- ✅ **LinkedIn API** integration  
- ✅ **Content scheduling system** for multiple platforms
- ✅ **OAuth flows** for connecting social media accounts
- ✅ **Multi-platform posting** (Facebook, Instagram, LinkedIn)
- ✅ **Post analytics** and insights
- ✅ **Automated scheduling** with timezone support

## 🔧 **Setup Steps**

### **Step 1: Add Social Media Environment Variables**

Add these to your `.env` file:

```env
# Social Media Platform APIs
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here

# Default timezone for scheduling
DEFAULT_TIMEZONE=UTC
```

### **Step 2: Run Additional Database Schema**

Run this SQL in your Supabase SQL Editor:

```sql
-- Social Media Integration Database Schema

-- Social Media Connections Table
CREATE TABLE IF NOT EXISTS social_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    platform_user_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform)
);

-- Social Media Posts Table
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    platforms TEXT[] NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    results JSONB,
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
    status VARCHAR(50) DEFAULT 'scheduled',
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
    analytics_data JSONB,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social_connections_platform ON social_connections(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_user_id ON scheduled_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_time ON scheduled_posts(scheduled_time);
```

## 📱 **New API Endpoints**

### **Social Media Authentication (`/api/social-auth`)**
- `GET /facebook/auth-url` - Get Facebook OAuth URL
- `GET /facebook/callback` - Facebook OAuth callback
- `GET /linkedin/auth-url` - Get LinkedIn OAuth URL  
- `GET /linkedin/callback` - LinkedIn OAuth callback
- `GET /connections` - Get user's connected accounts
- `DELETE /connections/:id` - Disconnect an account

### **Social Media Posting (`/api/social-posting`)**
- `POST /publish` - Post immediately to platforms
- `POST /schedule` - Schedule a post for later
- `GET /scheduled` - Get user's scheduled posts
- `DELETE /scheduled/:id` - Cancel scheduled post
- `PUT /scheduled/:id/reschedule` - Reschedule a post
- `GET /analytics` - Get posting analytics

## 🔑 **Getting API Credentials**

### **Facebook/Instagram:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Get App ID and App Secret
5. Configure OAuth redirect URIs

### **LinkedIn:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Get Client ID and Client Secret
4. Configure OAuth redirect URIs

## 🧪 **Testing the Integration**

### **1. Connect Facebook Account:**
```bash
# Get OAuth URL
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3001/api/social-auth/facebook/auth-url
```

### **2. Post to Facebook:**
```bash
curl -X POST http://localhost:3001/api/social-posting/publish \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello from my social media dashboard!",
    "platforms": ["facebook"]
  }'
```

### **3. Schedule a Post:**
```bash
curl -X POST http://localhost:3001/api/social-posting/schedule \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Scheduled post for tomorrow!",
    "platforms": ["facebook", "linkedin"],
    "scheduled_time": "2024-01-24T10:00:00Z"
  }'
```

## 🚀 **Features Overview**

### **Multi-Platform Support:**
- **Facebook Pages** - Post to business pages
- **Instagram Business** - Post images and captions
- **LinkedIn Personal** - Share professional content
- **LinkedIn Company** - Post to company pages

### **Content Scheduling:**
- **Time-based scheduling** with timezone support
- **Multi-platform posting** from single interface
- **Post management** (edit, cancel, reschedule)
- **Automated publishing** at scheduled times

### **Analytics & Insights:**
- **Post performance** tracking
- **Platform-specific metrics** (impressions, reach, engagement)
- **Success/failure reporting**
- **Historical data** analysis

### **Security Features:**
- **OAuth 2.0** authentication
- **Token management** with expiration handling
- **User isolation** (users can only access their own data)
- **Secure credential storage**

## 📊 **Database Structure**

The new tables support:
- **Social connections** management
- **Multi-platform posting** tracking
- **Scheduled content** management
- **Analytics data** storage
- **Platform-specific metadata**

## 🎯 **Next Steps**

1. **Add your API credentials** to `.env`
2. **Run the database schema** in Supabase
3. **Test OAuth flows** for each platform
4. **Try posting content** to connected accounts
5. **Set up scheduled posts** for automation

## 🆘 **Troubleshooting**

### **Common Issues:**
- **OAuth redirect URI mismatch** - Ensure callback URLs match exactly
- **Token expiration** - Re-authenticate when tokens expire
- **Platform permissions** - Verify required permissions are granted
- **Rate limiting** - Respect platform API limits

### **Support:**
- Check platform developer documentation
- Verify API credentials are correct
- Ensure database schema is properly created
- Check server logs for detailed error messages

Your social media integration is now **100% complete and ready to use!** 🎉


