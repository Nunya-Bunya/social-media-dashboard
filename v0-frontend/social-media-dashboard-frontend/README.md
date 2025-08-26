# 🚀 Multi-Business Marketing Dashboard

A comprehensive marketing management platform built with Next.js 15, React 19, and TypeScript. This dashboard provides complete marketing tools for managing multiple businesses with AI-powered assistance, lead generation, and comprehensive analytics.

## ✨ Features

### 🏢 Multi-Business Management
- **10 Pre-configured Businesses**: Merkel & Conner, Conner Injury Law, MBCS, Nunya Bunya, Power Portraits, B.C. Media, ORCA Awards, Stumpy Tail Catalogue, The Conner Store, Naming Names
- **Business-Specific Branding**: Each business has custom colors and industry-specific configurations
- **Unified Dashboard**: Manage all businesses from a single interface

### 🤖 AI Assistant Module
- **Chat Interface**: Interactive AI conversations for marketing strategy
- **Content Generator**: Create social posts, emails, blog content, and ad copy
- **Task Management**: AI-powered task recommendations and automation
- **Performance Insights**: AI-driven marketing insights and optimization suggestions

### 🔍 Lead Finder Module
- **Lead Search**: Advanced search across multiple criteria
- **Lead Agents**: Automated lead discovery with configurable keywords and locations
- **Lead Management**: Complete lead lifecycle from discovery to conversion
- **Analytics**: Lead performance metrics and industry distribution

### 🕷️ Cold Call Scraper Module
- **Web Scraping**: Automated lead generation from multiple sources
- **Job Management**: Create, monitor, and manage scraping jobs
- **Source Integration**: Google Maps, Yelp, Yellow Pages, LinkedIn
- **Lead Export**: Export leads in CSV/JSON formats

### 📰 PR Management Module
- **Media Contacts**: Comprehensive contact database management
- **Press Releases**: Create, schedule, and track press releases
- **Media Coverage**: Monitor mentions and coverage across outlets
- **Event Management**: Speaking engagements and PR events

### 📊 Core Marketing Modules
- **Social Media Management**: Multi-platform posting and scheduling
- **Paid Ads Management**: Campaign creation and optimization
- **SEO Management**: Keyword tracking and optimization
- **Email Marketing**: Campaign creation and automation
- **Analytics Dashboard**: Cross-platform performance metrics
- **Reports & Analytics**: White-label reporting system
- **Brand Management**: Asset library and brand guidelines
- **Competitive Analysis**: Competitor monitoring and intelligence
- **Social Listening**: Real-time mention monitoring
- **Outreach Management**: Email sequences and contact management
- **CRM Integration**: Lead and deal management
- **Media Library**: Centralized asset management

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui with Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks (local state)
- **Animations**: Tailwind CSS animations

### Backend Integration
- **API Service**: Custom API service with fetch
- **Endpoints**: RESTful API integration
- **Error Handling**: Comprehensive error handling and retry logic
- **Type Safety**: Full TypeScript integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Backend server running on `http://localhost:3001`

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd v0-frontend/social-media-dashboard-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ai-assistant.tsx  # AI Assistant module
│   ├── pr-management.tsx # PR Management module
│   ├── lead-finder.tsx   # Lead Finder module
│   ├── cold-call-scraper.tsx # Cold Call Scraper module
│   ├── backend-test.tsx  # Backend connectivity test
│   └── [other modules]   # All marketing modules
├── lib/                  # Utilities and services
│   └── api.ts           # API service and hooks
└── styles/              # Additional styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Backend Integration

The frontend connects to a Node.js/Express backend with the following endpoints:

### AI Assistant Endpoints
- `GET /api/ai-assistants` - List AI assistants
- `POST /api/ai-assistants` - Create new assistant
- `POST /api/ai-assistants/chat/messages` - Send chat messages
- `POST /api/ai-assistants/content/generate` - Generate content

### Lead Finder Endpoints
- `GET /api/lead-agents` - List lead agents
- `POST /api/lead-agents` - Create lead agent
- `GET /api/leads` - List leads with filters
- `PATCH /api/leads/:id` - Update lead status

### Cold Call Scraper Endpoints
- `POST /api/run` - Start scrape job
- `GET /api/jobs` - List scrape jobs
- `GET /api/leads` - List scraped leads
- `GET /api/sources` - Get available sources
- `GET /api/leads/export` - Export leads

### Test Endpoints
- `GET /api/test` - Basic connectivity test

## 🎨 Design System

### Color Scheme
- **Primary**: Purple gradient theme
- **Background**: Dark theme with black/gray gradients
- **Accent**: Purple, blue, green, and orange accents
- **Status Colors**: Green (success), Yellow (warning), Red (error)

### Components
- **Cards**: Glassmorphism effect with purple borders
- **Buttons**: Purple gradient with hover effects
- **Badges**: Status indicators with color coding
- **Tabs**: Horizontal tab navigation
- **Forms**: Dark theme with purple accents

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Optimized layouts with collapsible sections
- **Mobile**: Touch-friendly interface with simplified navigation

## 🔒 Security Features

- **CORS Configuration**: Proper CORS setup for API communication
- **Error Handling**: Comprehensive error handling and user feedback
- **Input Validation**: Form validation with Zod schemas
- **Type Safety**: Full TypeScript coverage

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Railway**: Automatic deployment from GitHub
- **Docker**: Use the provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the backend connectivity test tab
- Review the API documentation
- Check the browser console for errors

## 🎯 Next Steps

### Immediate Enhancements
1. **Authentication**: Add user authentication and authorization
2. **Real-time Updates**: Implement WebSocket connections
3. **Data Persistence**: Connect to real database
4. **File Upload**: Add media upload functionality

### Future Features
1. **Advanced Analytics**: More detailed reporting
2. **Automation**: Workflow automation
3. **Integrations**: Third-party platform integrations
4. **Mobile App**: React Native mobile application

---

**Built with ❤️ using Next.js, React, and TypeScript**
