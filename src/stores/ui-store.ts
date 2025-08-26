import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  activeModule: string;
  breadcrumbs: Breadcrumb[];
  modals: ModalState[];
  notifications: Notification[];
  loadingStates: Record<string, boolean>;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setActiveModule: (module: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  removeBreadcrumb: (index: number) => void;
  openModal: (modal: Omit<ModalState, 'id'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (key: string, loading: boolean) => void;
  clearLoading: (key: string) => void;
}

interface Breadcrumb {
  label: string;
  href?: string;
  icon?: string;
}

interface ModalState {
  id: string;
  type: string;
  title: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // State
      sidebarOpen: true,
      theme: 'system',
      sidebarCollapsed: false,
      activeModule: 'overview',
      breadcrumbs: [],
      modals: [],
      notifications: [],
      loadingStates: {},

      // Actions
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setActiveModule: (module: string) => {
        set({ activeModule: module });
      },

      setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => {
        set({ breadcrumbs });
      },

      addBreadcrumb: (breadcrumb: Breadcrumb) => {
        set((state) => ({
          breadcrumbs: [...state.breadcrumbs, breadcrumb],
        }));
      },

      removeBreadcrumb: (index: number) => {
        set((state) => ({
          breadcrumbs: state.breadcrumbs.filter((_, i) => i !== index),
        }));
      },

      openModal: (modal: Omit<ModalState, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          modals: [...state.modals, { ...modal, id }],
        }));
      },

      closeModal: (id: string) => {
        set((state) => ({
          modals: state.modals.filter((modal) => modal.id !== id),
        }));
      },

      closeAllModals: () => {
        set({ modals: [] });
      },

      addNotification: (notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration || 5000);
        }
      },

      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      setLoading: (key: string, loading: boolean) => {
        set((state) => ({
          loadingStates: { ...state.loadingStates, [key]: loading },
        }));
      },

      clearLoading: (key: string) => {
        set((state) => {
          const newLoadingStates = { ...state.loadingStates };
          delete newLoadingStates[key];
          return { loadingStates: newLoadingStates };
        });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        activeModule: state.activeModule,
      }),
    }
  )
);
