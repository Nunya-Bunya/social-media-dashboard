import { Link } from 'react-router-dom'

export function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-foreground mb-4">Reset Password</h1>
      <p className="text-muted-foreground mb-6">
        Password reset functionality coming soon...
      </p>
      <Link
        to="/auth/login"
        className="text-primary hover:text-primary/80 transition-colors"
      >
        Back to Login
      </Link>
    </div>
  )
}
