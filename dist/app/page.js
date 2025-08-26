"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const AuthContext_1 = require("@/contexts/AuthContext");
const lucide_react_1 = require("lucide-react");
function HomePage() {
    const { user, loading, isAuthenticated } = (0, AuthContext_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!loading) {
            if (isAuthenticated) {
                router.push('/dashboard');
            }
            else {
                router.push('/auth');
            }
        }
    }, [loading, isAuthenticated, router]);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.Loader2 className="w-8 h-8 text-white animate-spin"/>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Nunya Bunya</h2>
          <p className="text-gray-500">Preparing your marketing dashboard...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <lucide_react_1.Building2 className="w-8 h-8 text-white"/>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Redirecting...</h2>
        <p className="text-gray-500">Please wait while we redirect you...</p>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map