import { useState } from 'react'
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/utils/cn'

export function Header() {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar, theme, setTheme, notifications } = useUIStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns, leads, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <div className="relative">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' && <Sun className="w-5 h-5" />}
              {theme === 'dark' && <Moon className="w-5 h-5" />}
              {theme === 'system' && <Monitor className="w-5 h-5" />}
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {/* TODO: Open notifications panel */}}
              className="p-2 hover:bg-accent rounded-md transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {/* TODO: Navigate to profile */}}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {/* TODO: Navigate to settings */}}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
