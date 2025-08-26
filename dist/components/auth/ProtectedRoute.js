"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
const AuthContext_1 = require("@/contexts/AuthContext");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function ProtectedRoute({ children }) {
    const { user, loading, isAuthenticated } = (0, AuthContext_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth');
        }
    }, [loading, isAuthenticated, router]);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.Loader2 className="w-8 h-8 text-white animate-spin"/>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h2>
          <p className="text-gray-500">Please wait while we authenticate your account...</p>
        </div>
      </div>);
    }
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}
//# sourceMappingURL=ProtectedRoute.js.map