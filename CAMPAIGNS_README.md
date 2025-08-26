# 🚀 Marketing Campaigns Management System

A comprehensive, AI-powered marketing campaign management platform built for digital marketing agencies managing multiple clients. This system provides end-to-end campaign creation, management, analytics, and optimization capabilities.

## ✨ Features

### 🎯 **Core Campaign Management**
- **Multi-tenant Architecture**: Separate campaigns for different agencies and clients
- **Campaign Lifecycle**: Full workflow from draft to completion
- **Template Library**: Pre-built campaign templates for common goals
- **Asset Management**: Centralized storage and organization of campaign assets
- **Client & Brand Management**: Organize campaigns by client and brand

### 🤖 **AI-Powered Campaign Generation**
- **Intelligent Campaign Planning**: AI generates complete campaign strategies
- **Goal-Based Recommendations**: Campaigns tailored to specific business objectives
- **Platform Optimization**: AI suggests optimal platform mix and content strategies
- **Content Generation**: Auto-generate social posts, ad copy, email sequences
- **Performance Optimization**: AI-powered content and strategy optimization

### 📊 **Advanced Analytics & Reporting**
- **Real-time KPIs**: Track impressions, clicks, conversions, ROI
- **Performance Insights**: AI-generated recommendations for improvement
- **Multi-platform Tracking**: Unified analytics across all marketing channels
- **Client Reporting**: Automated performance reports and insights
- **Trend Analysis**: Identify patterns and opportunities

### 🎨 **Campaign Types Supported**
- **Social Media**: Instagram, TikTok, Facebook, LinkedIn, Twitter, YouTube
- **Email Marketing**: Automated sequences, newsletters, drip campaigns
- **Paid Advertising**: Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads
- **Content Marketing**: Blog posts, SEO optimization, content calendars
- **Video Content**: AI-generated videos, scripts, storyboards
- **Print Media**: Direct mail, brochures, flyers, posters
- **Influencer Marketing**: Collaboration campaigns, UGC challenges
- **PR & Media**: Press releases, media outreach, reputation management

## 🏗️ Architecture

### **Backend (NestJS + Prisma)**
```
src/
├── campaigns/                 # Campaign management module
│   ├── campaigns.module.ts   # Module configuration
│   ├── campaigns.controller.ts # REST API endpoints
│   ├── campaigns.service.ts  # Business logic
│   ├── campaign.ai.service.ts # AI integration
│   ├── campaign.analytics.service.ts # Analytics & reporting
│   ├── campaign.templates.service.ts # Template management
│   └── dto/                  # Data transfer objects
├── common/                   # Shared utilities
├── auth/                     # Authentication & authorization
├── brands/                   # Brand management
└── vendor/                   # Third-party integrations
```

### **Frontend (React + TypeScript + TailwindCSS)**
```
components/
├── campaigns/                # Campaign components
│   ├── CampaignDashboard.tsx # Main dashboard
│   ├── AiCampaignGenerator.tsx # AI campaign wizard
│   ├── CampaignCard.tsx      # Campaign display
│   ├── CampaignFilters.tsx   # Search & filtering
│   ├── CampaignStats.tsx     # Performance metrics
│   └── CreateCampaignModal.tsx # Campaign creation
├── analytics/                # Analytics components
├── auth/                     # Authentication components
└── shared/                   # Reusable components
```

### **Database Schema (PostgreSQL + Prisma)**
```sql
-- Core Campaign Tables
Campaign (id, name, goal, type, status, budget, content, analytics)
CampaignTemplate (id, name, type, goal, structure, content, settings)
CampaignKPI (id, campaignId, metric, value, target, date)
CampaignAnalytics (id, campaignId, platform, impressions, clicks, conversions, roi)

-- Supporting Tables
Client (id, name, company, industry, goals)
Brand (id, name, website, logo, palette, fonts)
Asset (id, name, type, url, metadata)
User (id, email, role, tenantId)
Tenant (id, name, settings)
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL 14+
- Redis (for job queues)
- OpenAI API key

### **1. Clone & Install**
```bash
git clone <repository-url>
cd social-media-dashboard
npm install
```

### **2. Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Configure your environment variables
DATABASE_URL="postgresql://user:password@localhost:5432/campaigns_db"
REDIS_URL="redis://localhost:6379"
OPENAI_API_KEY="your-openai-api-key"
JWT_SECRET="your-jwt-secret"
```

### **3. Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed default templates
npm run db:seed
```

### **4. Start Development**
```bash
# Start backend
npm run start:dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

## 📖 Usage Guide

### **Creating Your First Campaign**

#### **Option 1: AI-Generated Campaign**
1. Click "Create Campaign" → "AI Generator"
2. Fill in client information:
   - Client name and business type
   - Target audience description
   - Primary goal (brand awareness, lead generation, etc.)
   - Budget range and timeline
   - Preferred platforms
3. Click "Generate Campaign"
4. Review AI-generated plan
5. Customize and launch

#### **Option 2: Template-Based Campaign**
1. Browse campaign templates by goal/type
2. Select a template that fits your needs
3. Customize content and settings
4. Set budget and timeline
5. Launch campaign

#### **Option 3: Custom Campaign**
1. Start with a blank campaign
2. Define goals, target audience, and strategy
3. Create content and assets
4. Set up tracking and KPIs
5. Launch and monitor

### **Managing Campaigns**

#### **Dashboard Overview**
- **Campaign Grid**: View all campaigns with status indicators
- **Quick Actions**: Launch, pause, resume, or complete campaigns
- **Performance Metrics**: Real-time KPI tracking
- **Search & Filters**: Find campaigns by status, type, goal, or client

#### **Campaign Details**
- **Overview**: Basic information and current status
- **Content**: Campaign assets and messaging
- **Analytics**: Performance data and insights
- **Settings**: Budget, timeline, and platform configurations

### **Analytics & Reporting**

#### **Real-time Metrics**
- **Impressions**: Campaign reach and visibility
- **Engagement**: Clicks, likes, shares, comments
- **Conversions**: Lead generation and sales
- **ROI**: Return on investment calculations

#### **Performance Insights**
- **Trend Analysis**: Performance over time
- **Platform Comparison**: Cross-channel performance
- **Audience Insights**: Demographics and behavior
- **Optimization Recommendations**: AI-powered suggestions

## 🔧 Configuration

### **AI Integration**
```typescript
// Configure OpenAI in campaign.ai.service.ts
const aiProvider = new AiProvider({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  maxTokens: 4000,
  temperature: 0.7
});
```

### **Campaign Templates**
```typescript
// Add custom templates in campaign.templates.service.ts
const customTemplate = {
  name: 'Custom Campaign Template',
  type: 'SOCIAL_MEDIA',
  goal: 'BRAND_AWARENESS',
  structure: { /* template structure */ },
  content: { /* default content */ },
  settings: { /* platform settings */ }
};
```

### **Analytics Configuration**
```typescript
// Configure tracking in campaign.analytics.service.ts
const trackingConfig = {
  platforms: ['facebook', 'instagram', 'google_ads'],
  metrics: ['impressions', 'clicks', 'conversions', 'roi'],
  frequency: 'daily'
};
```

## 📊 API Endpoints

### **Campaign Management**
```http
POST   /api/campaigns                    # Create campaign
GET    /api/campaigns                    # List campaigns
GET    /api/campaigns/:id                # Get campaign
PUT    /api/campaigns/:id                # Update campaign
DELETE /api/campaigns/:id                # Delete campaign
```

### **AI Generation**
```http
POST   /api/campaigns/generate           # Generate AI campaign
POST   /api/campaigns/:id/generate-assets # Generate AI assets
POST   /api/campaigns/:id/optimize-content # Optimize content
```

### **Analytics & KPIs**
```http
POST   /api/campaigns/:id/kpis           # Track KPI
POST   /api/campaigns/:id/analytics      # Track analytics
GET    /api/campaigns/:id/performance    # Get performance data
GET    /api/campaigns/:id/report         # Generate report
```

### **Templates**
```http
GET    /api/campaigns/templates          # List templates
GET    /api/campaigns/templates/suggestions # Get suggestions
POST   /api/campaigns/templates          # Create template
POST   /api/campaigns/templates/seed     # Seed default templates
```

## 🎯 Campaign Types & Examples

### **Brand Awareness Campaigns**
- **TikTok UGC Challenge**: User-generated content campaigns
- **Instagram Reels Blitz**: High-frequency video content
- **Influencer Partnerships**: Authentic brand collaborations
- **Podcast Guest Appearances**: Thought leadership exposure

### **Lead Generation Campaigns**
- **LinkedIn Lead Gen Funnel**: B2B lead generation
- **Email Welcome Series**: Automated lead nurturing
- **Webinar Campaigns**: Educational content marketing
- **Gated Content**: Premium resource downloads

### **Sales Conversion Campaigns**
- **Retargeting Ads**: Convert warm leads
- **Limited-Time Offers**: Urgency-driven promotions
- **Product Demo Videos**: Showcase features and benefits
- **Customer Testimonials**: Social proof campaigns

### **SEO & Content Campaigns**
- **30-Day Blog Sprint**: Intensive content creation
- **Keyword Optimization**: SEO-focused content
- **Backlink Building**: Authority and ranking campaigns
- **Local SEO**: Geographic targeting campaigns

## 🔒 Security & Permissions

### **Multi-tenant Isolation**
- Each tenant has isolated data access
- Campaigns are scoped to tenant and user permissions
- Client data is separated by tenant boundaries

### **Role-Based Access Control**
- **Admin**: Full system access and tenant management
- **Team Member**: Campaign creation and management
- **Client**: Limited access to own campaign data

### **API Security**
- JWT-based authentication
- Rate limiting and request validation
- CORS configuration for frontend access

## 🚀 Deployment

### **Production Setup**
```bash
# Build application
npm run build

# Set production environment
NODE_ENV=production

# Start production server
npm run start:prod
```

### **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### **Environment Variables**
```bash
# Required
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secure-jwt-secret
OPENAI_API_KEY=your-openai-api-key

# Optional
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
```

## 📈 Performance & Scaling

### **Database Optimization**
- Indexed queries for campaign lookups
- Connection pooling for high concurrency
- Read replicas for analytics queries

### **Caching Strategy**
- Redis caching for campaign templates
- CDN for static assets and media
- Browser caching for frontend resources

### **Queue Management**
- Bull queue for background jobs
- Async processing for AI generation
- Rate limiting for API endpoints

## 🔮 Future Enhancements

### **Planned Features**
- **AI Video Generation**: Automated video content creation
- **Predictive Analytics**: Machine learning performance predictions
- **Cross-platform Automation**: Unified campaign execution
- **Client Portal**: White-labeled client dashboards
- **Advanced Reporting**: PDF reports and white-labeling

### **Integration Roadmap**
- **CRM Systems**: HubSpot, Salesforce, Pipedrive
- **Social Platforms**: Direct API integrations
- **Email Providers**: Mailchimp, SendGrid, ConvertKit
- **Analytics Tools**: Google Analytics, Facebook Pixel
- **Ad Platforms**: Google Ads, Facebook Ads, TikTok Ads

## 🤝 Contributing

### **Development Setup**
```bash
# Fork and clone repository
git clone <your-fork-url>
cd social-media-dashboard

# Install dependencies
npm install

# Set up development environment
cp .env.example .env.local

# Run tests
npm test

# Start development
npm run dev
```

### **Code Standards**
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Jest for testing
- Conventional commits for version control

## 📞 Support & Documentation

### **Resources**
- **API Documentation**: Swagger UI at `/api/docs`
- **Component Library**: Storybook for frontend components
- **Database Schema**: Prisma Studio for data exploration
- **Testing**: Jest test suite and examples

### **Getting Help**
- **Issues**: GitHub issue tracker
- **Discussions**: GitHub discussions
- **Documentation**: Inline code documentation
- **Examples**: Sample campaigns and templates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI**: For AI-powered campaign generation
- **NestJS**: For robust backend framework
- **Prisma**: For modern database management
- **TailwindCSS**: For beautiful, responsive UI
- **React**: For component-based frontend architecture

---

**Built with ❤️ for digital marketing agencies who want to scale their operations with AI-powered intelligence.**
