import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useUIStore } from '@/stores/ui-store'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuthStore()
  const { addNotification } = useUIStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully logged in.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login failed',
        message: error instanceof Error ? error.message : 'Please check your credentials and try again.',
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner w-4 h-4 mr-2"></div>
              Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Links */}
      <div className="mt-6 text-center space-y-2">
        <Link
          to="/auth/forgot-password"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot your password?
        </Link>
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
