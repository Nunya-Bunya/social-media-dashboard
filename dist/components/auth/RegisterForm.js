"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterForm = RegisterForm;
const react_1 = require("react");
const AuthContext_1 = require("@/contexts/AuthContext");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
function RegisterForm({ onSwitchToLogin }) {
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: ''
    });
    const [error, setError] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { register } = (0, AuthContext_1.useAuth)();
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        setIsLoading(true);
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                company: formData.company || undefined
            });
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<card_1.Card className="w-full max-w-md mx-auto">
      <card_1.CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
            <lucide_react_1.Building2 className="w-6 h-6 text-white"/>
          </div>
        </div>
        <card_1.CardTitle className="text-2xl font-bold">Create Account</card_1.CardTitle>
        <card_1.CardDescription>
          Join Nunya Bunya Marketing Dashboard
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (<alert_1.Alert variant="destructive">
              <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
            </alert_1.Alert>)}
          
          <div className="space-y-2">
            <label_1.Label htmlFor="name">Full Name</label_1.Label>
            <div className="relative">
              <lucide_react_1.User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="company">Company Name (Optional)</label_1.Label>
            <div className="relative">
              <lucide_react_1.Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="company" name="company" type="text" placeholder="Enter your company name" value={formData.company} onChange={handleChange} className="pl-10" disabled={isLoading}/>
            </div>
          </div>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="email">Email</label_1.Label>
            <div className="relative">
              <lucide_react_1.Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="password">Password</label_1.Label>
            <div className="relative">
              <lucide_react_1.Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="confirmPassword">Confirm Password</label_1.Label>
            <div className="relative">
              <lucide_react_1.Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>
          
          <button_1.Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" disabled={isLoading}>
            {isLoading ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Creating Account...
              </>) : (<>
                Create Account
                <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
              </>)}
          </button_1.Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-green-600 hover:text-green-700 font-medium underline" disabled={isLoading}>
              Sign in here
            </button>
          </p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=RegisterForm.js.map