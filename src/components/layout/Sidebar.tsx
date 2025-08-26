import { NavLink } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  Share2, 
  Target, 
  Search, 
  TrendingUp, 
  Mail, 
  FileText, 
  Palette, 
  Eye, 
  Headphones, 
  Send, 
  UserCheck, 
  Image, 
  Bot, 
  Megaphone, 
  UserSearch, 
  Phone,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/utils/cn'

const navigationItems = [
  {
    title: 'Overview',
    href: '/overview',
    icon: BarChart3,
    description: 'Dashboard & Analytics'
  },
  {
    title: 'Onboarding',
    href: '/onboarding',
    icon: Users,
    description: 'Setup & Configuration'
  },
  {
    title: 'Social Media',
    href: '/social-media',
    icon: Share2,
    description: 'Content & Scheduling'
  },
  {
    title: 'Paid Ads',
    href: '/paid-ads',
    icon: Target,
    description: 'Campaign Management'
  },
  {
    title: 'SEO',
    href: '/seo',
    icon: Search,
    description: 'Search Optimization'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    description: 'Performance Tracking'
  },
  {
    title: 'Email Marketing',
    href: '/email-marketing',
    icon: Mail,
    description: 'Campaigns & Automation'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    description: 'White-label Reports'
  },
  {
    title: 'Brand',
    href: '/brand',
    icon: Palette,
    description: 'Asset Management'
  },
  {
    title: 'Competitive',
    href: '/competitive',
    icon: Eye,
    description: 'Market Intelligence'
  },
  {
    title: 'Social Listening',
    href: '/listening',
    icon: Headphones,
    description: 'Mention Monitoring'
  },
  {
    title: 'Outreach',
    href: '/outreach',
    icon: Send,
    description: 'Email Sequences'
  },
  {
    title: 'CRM',
    href: '/crm',
    icon: UserCheck,
    description: 'Lead Management'
  },
  {
    title: 'Media Library',
    href: '/media',
    icon: Image,
    description: 'Asset Storage'
  },
  {
    title: 'AI Assistant',
    href: '/ai-assistant',
    icon: Bot,
    description: 'Content Generation'
  },
  {
    title: 'PR',
    href: '/pr',
    icon: Megaphone,
    description: 'Public Relations'
  },
  {
    title: 'Lead Finder',
    href: '/lead-finder',
    icon: UserSearch,
    description: 'Prospect Discovery'
  },
  {
    title: 'Cold Call Scraper',
    href: '/cold-call-scraper',
    icon: Phone,
    description: 'Contact Discovery'
  }
]

export function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore()
  const { user, tenant } = useAuthStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-lg font-semibold">Marketing Platform</span>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 hover:bg-accent rounded-md transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{tenant?.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{item.title}</span>
                    <span className="block text-xs opacity-70 truncate">{item.description}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Settings</span>}
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  )
}
