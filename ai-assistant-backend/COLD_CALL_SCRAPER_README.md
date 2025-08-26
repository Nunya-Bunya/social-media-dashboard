# 🎯 Cold Call Scraper System

A comprehensive business lead generation system that automatically scrapes business information from multiple sources and provides a complete dashboard for managing cold outreach campaigns.

## 🚀 Features

### Core Functionality
- **Multi-Source Scraping**: Google Maps, Yelp, Yellow Pages AU, LinkedIn
- **Data Cleaning & Deduplication**: Automatic phone number normalization, email validation
- **Job Management**: Track scraping progress, cancel jobs, view statistics
- **Lead Management**: Status tracking, assignment, notes, bulk operations
- **Export Capabilities**: CSV export with filtering options
- **Rate Limiting**: Built-in protection against API abuse

### Technical Features
- **Puppeteer Integration**: Headless browser automation for web scraping
- **Database Storage**: PostgreSQL/SQLite with Prisma ORM
- **RESTful API**: Complete CRUD operations for all entities
- **Real-time Progress**: Job status and progress tracking
- **Error Handling**: Comprehensive error logging and recovery

## 📊 Database Schema

### ScrapeJob
```sql
- id: String (Primary Key)
- name: String
- industry: String
- location: String
- status: ScrapeJobStatus (PENDING, RUNNING, COMPLETED, FAILED, CANCELLED)
- progress: Int (0-100)
- totalResults: Int?
- errorMessage: String?
- startedAt: DateTime?
- completedAt: DateTime?
- createdBy: String (User ID)
- tenantId: String
- createdAt: DateTime
- updatedAt: DateTime
```

### BusinessLead
```sql
- id: String (Primary Key)
- businessName: String
- industry: String
- location: String
- email: String?
- phone: String?
- website: String?
- address: String?
- category: String?
- tags: String? (JSON array)
- source: ScrapeSource (GOOGLE_MAPS, YELP, YELLOW_PAGES, LINKEDIN, CUSTOM)
- status: LeadStatus (NEW, CONTACTED, FOLLOWED_UP, QUALIFIED, CLOSED, LOST)
- notes: String?
- metadata: String? (JSON)
- scrapeJobId: String? (Foreign Key)
- tenantId: String
- assignedTo: String? (User ID)
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔌 API Endpoints

### Scraper Management

#### Start a Scrape Job
```http
POST /api/scraper/run
Content-Type: application/json

{
  "name": "Restaurant Leads Sydney",
  "industry": "restaurant",
  "location": "Sydney, NSW"
}
```

**Response:**
```json
{
  "message": "Scrape job started successfully",
  "job": {
    "id": "clx123abc",
    "name": "Restaurant Leads Sydney",
    "industry": "restaurant",
    "location": "Sydney, NSW",
    "status": "PENDING",
    "progress": 0
  }
}
```

#### List Scrape Jobs
```http
GET /api/scraper/jobs?status=COMPLETED&page=1&limit=20
```

#### Get Job Details
```http
GET /api/scraper/jobs/{jobId}
```

#### Cancel Job
```http
DELETE /api/scraper/jobs/{jobId}
```

#### Get Statistics
```http
GET /api/scraper/stats
```

#### Get Available Sources
```http
GET /api/scraper/sources
```

### Lead Management

#### List Leads
```http
GET /api/leads?industry=restaurant&location=Sydney&status=NEW&page=1&limit=50
```

**Response:**
```json
{
  "data": [
    {
      "id": "lead123",
      "businessName": "Sydney Bistro",
      "industry": "restaurant",
      "location": "Sydney, NSW",
      "email": "contact@sydneybistro.com",
      "phone": "+61291234567",
      "website": "https://sydneybistro.com",
      "address": "123 George St, Sydney NSW 2000",
      "source": "GOOGLE_MAPS",
      "status": "NEW",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3
  }
}
```

#### Get Lead Details
```http
GET /api/leads/{leadId}
```

#### Update Lead Status
```http
PATCH /api/leads/{leadId}
Content-Type: application/json

{
  "status": "CONTACTED",
  "notes": "Called on 2024-01-15, interested in our services"
}
```

#### Assign Lead
```http
POST /api/leads/{leadId}/assign
Content-Type: application/json

{
  "userId": "user123"
}
```

#### Bulk Update Leads
```http
POST /api/leads/bulk-update
Content-Type: application/json

{
  "leadIds": ["lead1", "lead2", "lead3"],
  "status": "CONTACTED",
  "notes": "Bulk outreach campaign"
}
```

#### Export Leads (CSV)
```http
GET /api/leads/export/csv?industry=restaurant&status=NEW
```

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3. Environment Variables
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
PORT=3001
OPENAI_API_KEY=your_openai_key_here
```

### 4. Start the Server
```bash
npm run dev
```

## 🔧 Configuration

### Rate Limiting
The system includes built-in rate limiting:
- **Scraper Jobs**: 5 requests per 15 minutes per IP
- **Lead Operations**: 100 requests per 15 minutes per IP

### Scraping Sources
Currently supported sources:
- ✅ **Google Maps**: Business listings and contact info
- ✅ **Yelp**: Reviews and business information
- ✅ **Yellow Pages AU**: Australian business directory
- ⚠️ **LinkedIn**: Company profiles (requires authentication)

### Data Cleaning
The system automatically:
- Normalizes phone numbers (removes formatting)
- Validates email addresses
- Cleans business names (removes special characters)
- Deduplicates leads based on name and phone
- Standardizes website URLs

## 📈 Usage Examples

### 1. Start a Scraping Campaign
```javascript
// Start scraping for law firms in Melbourne
const response = await fetch('/api/scraper/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Melbourne Law Firms',
    industry: 'law firm',
    location: 'Melbourne, VIC'
  })
});

const { job } = await response.json();
console.log(`Job started: ${job.id}`);
```

### 2. Monitor Job Progress
```javascript
// Check job status
const jobResponse = await fetch(`/api/scraper/jobs/${job.id}`);
const jobData = await jobResponse.json();

console.log(`Progress: ${jobData.progress}%`);
console.log(`Status: ${jobData.status}`);
```

### 3. Manage Leads
```javascript
// Get leads from completed job
const leadsResponse = await fetch('/api/leads?status=NEW&page=1&limit=50');
const { data: leads } = await leadsResponse.json();

// Update lead status
await fetch(`/api/leads/${leads[0].id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'CONTACTED',
    notes: 'Initial outreach completed'
  })
});
```

### 4. Export Data
```javascript
// Export leads to CSV
const csvResponse = await fetch('/api/leads/export/csv?status=CONTACTED');
const csvBlob = await csvResponse.blob();

// Download file
const url = window.URL.createObjectURL(csvBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'business-leads.csv';
a.click();
```

## 🔒 Compliance & Best Practices

### Rate Limiting
- Respects robots.txt files
- Implements delays between requests
- Uses realistic user agents
- Rotates IP addresses (if available)

### Data Privacy
- Only scrapes publicly available information
- Respects website terms of service
- Implements proper error handling
- Logs scraping activities for audit

### Error Handling
- Graceful failure handling
- Retry mechanisms for transient errors
- Comprehensive error logging
- Job status tracking

## 🚀 Future Enhancements

### Planned Features
- [ ] **Email Extraction**: Automated email discovery from websites
- [ ] **LinkedIn Integration**: Full LinkedIn company scraping
- [ ] **Outreach Automation**: Integration with Mailchimp, HubSpot
- [ ] **SMS Integration**: Twilio integration for SMS outreach
- [ ] **Advanced Filtering**: AI-powered lead scoring
- [ ] **Dashboard UI**: React-based management interface

### API Integrations
- [ ] **Apify**: Alternative scraping platform
- [ ] **Phantombuster**: Social media scraping
- [ ] **Hunter.io**: Email finding service
- [ ] **Clearbit**: Company enrichment data

## 🐛 Troubleshooting

### Common Issues

#### 1. Puppeteer Installation
```bash
# If you encounter Puppeteer issues on Linux
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

#### 2. Database Connection
```bash
# Check database connection
npx prisma db push --preview-feature

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

#### 3. Scraping Failures
- Check internet connection
- Verify target websites are accessible
- Review rate limiting settings
- Check browser console for errors

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review server logs for error details
3. Verify API endpoint documentation
4. Test with smaller datasets first

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
