import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/utils/cn'

export function NotificationPanel() {
  const { notifications, removeNotification } = useUIStore()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "flex items-start space-x-3 p-4 rounded-lg border shadow-lg max-w-sm animate-fade-in",
            {
              "bg-success/10 border-success/20": notification.type === 'success',
              "bg-destructive/10 border-destructive/20": notification.type === 'error',
              "bg-warning/10 border-warning/20": notification.type === 'warning',
              "bg-info/10 border-info/20": notification.type === 'info',
            }
          )}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 text-destructive" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-warning" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-info" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="text-sm text-primary hover:text-primary/80 mt-2 font-medium"
              >
                {notification.action.label}
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
