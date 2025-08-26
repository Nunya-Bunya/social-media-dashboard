"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthPage;
const react_1 = require("react");
const LoginForm_1 = require("@/components/auth/LoginForm");
const RegisterForm_1 = require("@/components/auth/RegisterForm");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
function AuthPage() {
    const [isLogin, setIsLogin] = (0, react_1.useState)(true);
    const features = [
        {
            icon: <lucide_react_1.Globe className="w-6 h-6"/>,
            title: "Multi-Platform Posting",
            description: "Post to Facebook, Instagram, LinkedIn simultaneously"
        },
        {
            icon: <lucide_react_1.Calendar className="w-6 h-6"/>,
            title: "Smart Scheduling",
            description: "Schedule content weeks in advance with optimal timing"
        },
        {
            icon: <lucide_react_1.Users className="w-6 h-6"/>,
            title: "Client Management",
            description: "Manage multiple law firm clients from one dashboard"
        },
        {
            icon: <lucide_react_1.TrendingUp className="w-6 h-6"/>,
            title: "Analytics & ROI",
            description: "Track engagement and measure marketing success"
        }
    ];
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <lucide_react_1.Building2 className="w-6 h-6 text-white"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Nunya Bunya</h1>
              <p className="text-blue-100">Marketing Dashboard</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">
            Transform Your Law Firm's Social Media Presence
          </h2>
          
          <p className="text-blue-100 mb-8 text-lg">
            Automate your social media marketing, engage with clients, and grow your practice with our powerful dashboard.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (<div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </div>))}
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-xl border border-white/20">
            <div className="flex items-center mb-2">
              <lucide_react_1.Zap className="w-5 h-5 text-yellow-300 mr-2"/>
              <span className="font-semibold">Proven Results</span>
            </div>
            <p className="text-blue-100">
              Law firms using our platform see 3x more engagement and 40% increase in client inquiries.
            </p>
          </div>
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {isLogin ? (<LoginForm_1.LoginForm onSwitchToRegister={() => setIsLogin(false)}/>) : (<RegisterForm_1.RegisterForm onSwitchToLogin={() => setIsLogin(true)}/>)}
          
          
          <div className="lg:hidden mt-8">
            <card_1.Card>
              <card_1.CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-center">Why Choose Nunya Bunya?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.slice(0, 4).map((feature, index) => (<div key={index} className="text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        {feature.icon}
                      </div>
                      <p className="text-sm font-medium">{feature.title}</p>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map