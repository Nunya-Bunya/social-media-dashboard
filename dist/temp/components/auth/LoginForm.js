"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = LoginForm;
const react_1 = require("react");
const AuthContext_1 = require("@/contexts/AuthContext");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
function LoginForm({ onSwitchToRegister }) {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { login } = (0, AuthContext_1.useAuth)();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<card_1.Card className="w-full max-w-md mx-auto">
      <card_1.CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <lucide_react_1.Building2 className="w-6 h-6 text-white"/>
          </div>
        </div>
        <card_1.CardTitle className="text-2xl font-bold">Welcome Back</card_1.CardTitle>
        <card_1.CardDescription>
          Sign in to your Nunya Bunya Marketing Dashboard
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (<alert_1.Alert variant="destructive">
              <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
            </alert_1.Alert>)}
          
          <div className="space-y-2">
            <label_1.Label htmlFor="email">Email</label_1.Label>
            <div className="relative">
              <lucide_react_1.Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="password">Password</label_1.Label>
            <div className="relative">
              <lucide_react_1.Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required disabled={isLoading}/>
            </div>
          </div>
          
          <button_1.Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
            {isLoading ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Signing In...
              </>) : (<>
                Sign In
                <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
              </>)}
          </button_1.Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-blue-600 hover:text-blue-700 font-medium underline" disabled={isLoading}>
              Sign up here
            </button>
          </p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=LoginForm.js.map