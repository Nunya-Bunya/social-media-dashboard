import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { useUIStore } from '@/stores/ui-store'

// Layout Components
import { RootLayout } from '@/components/layout/RootLayout'

// Main Module Pages
import { OverviewPage } from '@/modules/overview/OverviewPage'
import { OnboardingPage } from '@/modules/onboarding/OnboardingPage'
import { SocialMediaPage } from '@/modules/social-media/SocialMediaPage'
import { PaidAdsPage } from '@/modules/paid-ads/PaidAdsPage'
import { SEOPage } from '@/modules/seo/SEOPage'
import { AnalyticsPage } from '@/modules/analytics/AnalyticsPage'
import { EmailMarketingPage } from '@/modules/email-marketing/EmailMarketingPage'
import { ReportsPage } from '@/modules/reports/ReportsPage'
import { BrandPage } from '@/modules/brand/BrandPage'
import { CompetitivePage } from '@/modules/competitive/CompetitivePage'
import { SocialListeningPage as ListeningPage } from '@/modules/listening/SocialListeningPage'
import { OutreachPage } from '@/modules/outreach/OutreachPage'
import { CRMPage } from '@/modules/crm/CRMPage'
import { MediaLibraryPage as MediaPage } from '@/modules/media/MediaLibraryPage'
import { AIAssistantPage } from '@/modules/ai-assistant/AIAssistantPage'
import { PRPage } from '@/modules/pr/PRPage'
import { LeadFinderPage } from '@/modules/lead-finder/LeadFinderPage'
import { ColdCallScraperPage } from '@/modules/cold-call-scraper/ColdCallScraperPage'

// Settings Pages
import { SettingsPage } from '@/modules/settings/SettingsPage'

// Error Pages
import { NotFoundPage } from '@/components/error/NotFoundPage'

// Simple Route Component (no auth required)
const SimpleRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

function App() {
  const { theme } = useUIStore()

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        if (mediaQuery.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <>
      <Helmet>
        <title>Marketing Platform - Complete Digital Marketing Solution</title>
        <meta name="description" content="Comprehensive marketing platform for managing all aspects of digital marketing, sales, and customer acquisition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Routes>
        {/* Main Routes (No Auth Required) */}
        <Route
          path="/"
          element={
            <SimpleRoute>
              <RootLayout />
            </SimpleRoute>
          }
        >
          {/* Overview Dashboard */}
          <Route path="overview" element={<OverviewPage />} />
          
          {/* Onboarding */}
          <Route path="onboarding" element={<OnboardingPage />} />
          
          {/* Core Marketing Modules */}
          <Route path="social-media" element={<SocialMediaPage />} />
          <Route path="paid-ads" element={<PaidAdsPage />} />
          <Route path="seo" element={<SEOPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="email-marketing" element={<EmailMarketingPage />} />
          <Route path="reports" element={<ReportsPage />} />
          
          {/* Brand & Intelligence */}
          <Route path="brand" element={<BrandPage />} />
          <Route path="competitive" element={<CompetitivePage />} />
          <Route path="listening" element={<ListeningPage />} />
          
          {/* Sales & Outreach */}
          <Route path="outreach" element={<OutreachPage />} />
          <Route path="crm" element={<CRMPage />} />
          <Route path="lead-finder" element={<LeadFinderPage />} />
          <Route path="cold-call-scraper" element={<ColdCallScraperPage />} />
          
          {/* Content & AI */}
          <Route path="media" element={<MediaPage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          
          {/* PR */}
          <Route path="pr" element={<PRPage />} />
          
          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Default redirect */}
          <Route index element={<Navigate to="overview" replace />} />
        </Route>

        {/* Error Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
