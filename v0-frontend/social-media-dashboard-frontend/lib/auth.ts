import React from 'react'
import { apiService } from './api'

export interface User {
  id: string
  email: string
  role: string
  tenantId: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

class AuthService {
  private user: User | null = null
  private isAuthenticated = false
  private listeners: ((state: AuthState) => void)[] = []

  constructor() {
    // Check for existing session on load
    this.checkAuth()
  }

  private notifyListeners() {
    const state = this.getState()
    this.listeners.forEach(listener => listener(state))
  }

  private getState(): AuthState {
    return {
      user: this.user,
      isAuthenticated: this.isAuthenticated,
      isLoading: false,
      error: null
    }
  }

  async login(email: string, password: string): Promise<AuthState> {
    try {
      // For demo purposes, we'll simulate login with the test user
      if (email === 'test@example.com' && password === 'password') {
        this.user = {
          id: 'cmerrwet60002lu56r2kv69mp',
          email: 'test@example.com',
          role: 'ADMIN',
          tenantId: 'cmerrwet40000lu567mne69ly'
        }
        this.isAuthenticated = true
        
        // Store in localStorage
        localStorage.setItem('auth_user', JSON.stringify(this.user))
        
        this.notifyListeners()
        return this.getState()
      } else {
        throw new Error('Invalid credentials. Use test@example.com / password')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      const state = {
        ...this.getState(),
        error: errorMessage
      }
      this.notifyListeners()
      return state
    }
  }

  async logout(): Promise<void> {
    this.user = null
    this.isAuthenticated = false
    localStorage.removeItem('auth_user')
    this.notifyListeners()
  }

  async checkAuth(): Promise<AuthState> {
    try {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
    
    this.notifyListeners()
    return this.getState()
  }

  getCurrentUser(): User | null {
    return this.user
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }
}

export const authService = new AuthService()

// React hook for authentication
export const useAuth = () => {
  const [state, setState] = React.useState<AuthState>(authService.getState())

  React.useEffect(() => {
    const unsubscribe = authService.subscribe(setState)
    return unsubscribe
  }, [])

  return {
    ...state,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    checkAuth: authService.checkAuth.bind(authService)
  }
}
