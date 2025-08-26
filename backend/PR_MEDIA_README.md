# PR & Media Management System

## 🎯 **Overview**

The PR & Media Management system is a comprehensive solution for managing press releases, media contacts, journalists, and media outreach campaigns. This system provides enterprise-grade PR management capabilities for law firms and businesses.

## 🚀 **Features**

### **1. Press Release Management**
- **Create & Edit**: Draft, review, and edit press releases
- **Status Management**: Track release status (draft, review, approved, published, archived)
- **Distribution**: Multi-channel distribution (email, wire services, social media, website)
- **Analytics**: Track performance metrics and coverage

### **2. Media Contact Database**
- **Contact Management**: Store and organize media contacts
- **Relationship Tracking**: Monitor relationship status and history
- **Beat Coverage**: Track areas of expertise and coverage
- **Interaction History**: Record all outreach attempts and responses

### **3. Journalist Profiles**
- **Influence Scoring**: 1-100 scale based on multiple factors
- **Response Metrics**: Track response rates and timing
- **Expertise Areas**: Categorize by writing style and topics
- **Performance Analytics**: Monitor success rates and outcomes

### **4. Media Coverage Tracking**
- **Coverage Monitoring**: Track mentions, quotes, features, and interviews
- **Sentiment Analysis**: Analyze coverage sentiment (positive, negative, neutral)
- **Impact Scoring**: Calculate coverage impact based on multiple factors
- **Reach Estimation**: Track audience reach and engagement

### **5. Outreach Campaign Management**
- **Campaign Creation**: Plan and execute targeted outreach campaigns
- **Automated Outreach**: Send initial pitches and follow-ups
- **Response Tracking**: Monitor responses and outcomes
- **Performance Analytics**: Track campaign success metrics

## 🗄️ **Database Schema**

### **Core Tables**

#### **press_releases**
- Press release content and metadata
- Status tracking and workflow management
- Distribution channel configuration
- Performance metrics and analytics

#### **media_contacts**
- Contact information and demographics
- Outlet details and relationship status
- Beat coverage and expertise areas
- Interaction history and preferences

#### **journalists**
- Extended journalist profiles
- Influence scoring and metrics
- Response rate and timing data
- Expertise and writing style

#### **media_coverage**
- Coverage tracking and analysis
- Sentiment and impact scoring
- Reach estimation and metrics
- Source attribution and links

#### **outreach_campaigns**
- Campaign planning and execution
- Target contact management
- Status tracking and metrics
- Success measurement

#### **outreach_attempts**
- Individual outreach records
- Response tracking and outcomes
- Method and content logging
- Performance analytics

## 🔌 **API Endpoints**

### **Press Releases**
```
GET    /api/pr/press-releases          # List all press releases
GET    /api/pr/press-releases/:id      # Get specific press release
POST   /api/pr/press-releases          # Create new press release
PUT    /api/pr/press-releases/:id      # Update press release
DELETE /api/pr/press-releases/:id      # Delete press release
POST   /api/pr/press-releases/:id/publish  # Publish press release
```

### **Media Contacts**
```
GET    /api/pr/media-contacts          # List all media contacts
GET    /api/pr/media-contacts/:id      # Get specific contact
POST   /api/pr/media-contacts          # Create new contact
PUT    /api/pr/media-contacts/:id      # Update contact
DELETE /api/pr/media-contacts/:id      # Delete contact
```

### **Journalists**
```
GET    /api/pr/journalists             # List all journalists
GET    /api/pr/journalists/:id         # Get specific journalist
POST   /api/pr/journalists             # Create journalist profile
```

### **Media Coverage**
```
GET    /api/pr/coverage                # List media coverage
POST   /api/pr/coverage                # Add new coverage
```

### **Outreach Campaigns**
```
GET    /api/pr/outreach-campaigns      # List campaigns
POST   /api/pr/outreach-campaigns      # Create campaign
```

### **Analytics**
```
GET    /api/pr/analytics/dashboard     # PR analytics dashboard
GET    /api/pr/analytics/media-contacts # Media contact insights
```

## 🛠️ **Services**

### **PressReleaseService**
- CRUD operations for press releases
- Publishing and distribution logic
- Analytics and performance tracking
- Multi-channel distribution management

### **MediaContactService**
- Contact management and organization
- Relationship tracking and updates
- Search and filtering capabilities
- Contact insights and analytics

### **JournalistService**
- Journalist profile management
- Influence score calculations
- Response metrics tracking
- Expertise and performance analysis

### **CoverageService**
- Media coverage tracking
- Sentiment and impact analysis
- Coverage analytics and insights
- Performance measurement

### **OutreachService**
- Campaign management and execution
- Automated outreach automation
- Response tracking and analytics
- Campaign performance metrics

## 📊 **Analytics & Insights**

### **Press Release Analytics**
- Coverage rate and reach
- Sentiment distribution
- Performance by channel
- Timeline and trend analysis

### **Media Contact Insights**
- Relationship distribution
- Response rate analysis
- Top performing outlets
- Contact engagement metrics

### **Journalist Performance**
- Influence score distribution
- Response rate analysis
- Expertise area breakdown
- Performance trends

### **Outreach Campaign Analytics**
- Response and success rates
- Contact performance ranking
- Campaign effectiveness
- Timeline and outcome tracking

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Email Service (future implementation)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_api_key

# Wire Services (future implementation)
PR_NEWSWIRE_API_KEY=your_api_key
BUSINESS_WIRE_API_KEY=your_api_key

# Social Media APIs (future implementation)
FACEBOOK_APP_ID=your_app_id
LINKEDIN_CLIENT_ID=your_client_id
```

### **Database Setup**
Run the SQL schema file to create all required tables:
```bash
psql -d your_database -f database/pr-media-schema.sql
```

## 🚀 **Usage Examples**

### **Create a Press Release**
```javascript
const pressRelease = await PressReleaseService.createPressRelease({
  title: "Law Firm Expands Practice Areas",
  content: "Full press release content...",
  summary: "Brief summary of the announcement",
  target_audience: ["legal_industry", "business_media"],
  key_messages: ["growth", "expertise", "client_service"],
  tags: ["legal", "expansion", "practice_areas"]
});
```

### **Add Media Contact**
```javascript
const contact = await MediaContactService.createMediaContact({
  first_name: "John",
  last_name: "Smith",
  email: "john.smith@example.com",
  outlet_name: "Legal Times",
  outlet_type: "newspaper",
  beat_coverage: ["legal_industry", "law_firms"],
  location: "Washington, DC"
});
```

### **Track Media Coverage**
```javascript
const coverage = await CoverageService.addMediaCoverage({
  press_release_id: 1,
  outlet_name: "Legal Times",
  coverage_type: "feature",
  headline: "Law Firm Expands Practice Areas",
  url: "https://example.com/article",
  sentiment: "positive",
  reach_estimate: 50000
});
```

### **Create Outreach Campaign**
```javascript
const campaign = await OutreachService.createOutreachCampaign({
  name: "Q4 Practice Expansion Campaign",
  description: "Outreach campaign for new practice areas",
  press_release_id: 1,
  target_contacts: [1, 2, 3],
  campaign_type: "press_release"
});
```

## 🔮 **Future Enhancements**

### **Phase 1: Core Integration**
- Email service integration (SendGrid, Mailgun)
- Wire service APIs (PR Newswire, Business Wire)
- Social media posting integration

### **Phase 2: Advanced Features**
- AI-powered content optimization
- Automated follow-up scheduling
- Advanced sentiment analysis
- Media monitoring automation

### **Phase 3: Enterprise Features**
- Multi-tenant support
- Advanced reporting and dashboards
- Integration with CRM systems
- Compliance and audit trails

## 📚 **Dependencies**

- **Express.js**: Web framework
- **Supabase**: Database and real-time features
- **Node.js**: Runtime environment
- **JWT**: Authentication and authorization

## 🧪 **Testing**

### **API Testing**
Test all endpoints using the provided test data:
```bash
# Test press release creation
curl -X POST http://localhost:3001/api/pr/press-releases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Release","content":"Test content"}'
```

### **Database Testing**
Verify database schema and relationships:
```sql
-- Check press releases
SELECT * FROM press_releases;

-- Check media contacts
SELECT * FROM media_contacts;

-- Check relationships
SELECT pr.title, mc.first_name, mc.outlet_name 
FROM press_releases pr 
JOIN media_coverage mc ON pr.id = mc.press_release_id;
```

## 📞 **Support**

For questions or issues with the PR & Media Management system:
1. Check the API documentation
2. Review the service implementations
3. Verify database schema and relationships
4. Check server logs for error details

## 🎉 **Conclusion**

The PR & Media Management system provides a robust foundation for managing all aspects of public relations and media outreach. With comprehensive features for press release management, contact organization, and campaign execution, this system enables businesses to effectively manage their PR activities and measure their success.

The modular architecture allows for easy extension and customization, while the comprehensive API provides flexibility for frontend integration and third-party tools.
