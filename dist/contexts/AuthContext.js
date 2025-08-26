"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = require("react");
const api_1 = require("@/lib/api");
const AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const checkAuth = async () => {
            try {
                if ((0, api_1.isAuthenticated)()) {
                    const userData = await (0, api_1.getCurrentUser)();
                    setUser(userData);
                }
            }
            catch (error) {
                console.error('Failed to get current user:', error);
                await (0, api_1.logout)();
            }
            finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await (0, api_1.login)(email, password);
            setUser(response.user);
        }
        catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await (0, api_1.register)(userData);
            setUser(response.user);
        }
        catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        try {
            setLoading(true);
            await (0, api_1.logout)();
            setUser(null);
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const refreshUser = async () => {
        try {
            if ((0, api_1.isAuthenticated)()) {
                const userData = await (0, api_1.getCurrentUser)();
                setUser(userData);
            }
        }
        catch (error) {
            console.error('Failed to refresh user:', error);
            await logout();
        }
    };
    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
    };
    return (<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);
}
function useAuth() {
    const context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
//# sourceMappingURL=AuthContext.js.map