"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const ProtectedRoute_1 = require("@/components/auth/ProtectedRoute");
const AuthContext_1 = require("@/contexts/AuthContext");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function DashboardLayout({ children, }) {
    const { user, logout } = (0, AuthContext_1.useAuth)();
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    const handleLogout = async () => {
        await logout();
    };
    return (<ProtectedRoute_1.ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  {sidebarOpen ? <lucide_react_1.X className="h-6 w-6"/> : <lucide_react_1.Menu className="h-6 w-6"/>}
                </button>
                
                <div className="flex items-center ml-4 lg:ml-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <lucide_react_1.Building2 className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Nunya Bunya</h1>
                    <p className="text-sm text-gray-500">Marketing Dashboard</p>
                  </div>
                </div>
              </div>

              
              <div className="flex items-center space-x-4">
                
                <button_1.Button variant="ghost" size="sm" className="relative">
                  <lucide_react_1.Bell className="h-5 w-5 text-gray-400"/>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button_1.Button>

                
                <dropdown_menu_1.DropdownMenu>
                  <dropdown_menu_1.DropdownMenuTrigger asChild>
                    <button_1.Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <lucide_react_1.User className="w-4 h-4 text-white"/>
                      </div>
                      <span className="hidden md:block text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                    </button_1.Button>
                  </dropdown_menu_1.DropdownMenuTrigger>
                  <dropdown_menu_1.DropdownMenuContent align="end" className="w-56">
                    <dropdown_menu_1.DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        {user?.company && (<p className="text-xs leading-none text-muted-foreground">
                            {user.company}
                          </p>)}
                      </div>
                    </dropdown_menu_1.DropdownMenuLabel>
                    <dropdown_menu_1.DropdownMenuSeparator />
                    <dropdown_menu_1.DropdownMenuItem>
                      <lucide_react_1.User className="mr-2 h-4 w-4"/>
                      <span>Profile</span>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuItem>
                      <lucide_react_1.Settings className="mr-2 h-4 w-4"/>
                      <span>Settings</span>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuSeparator />
                    <dropdown_menu_1.DropdownMenuItem onClick={handleLogout}>
                      <lucide_react_1.LogOut className="mr-2 h-4 w-4"/>
                      <span>Log out</span>
                    </dropdown_menu_1.DropdownMenuItem>
                  </dropdown_menu_1.DropdownMenuContent>
                </dropdown_menu_1.DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute_1.ProtectedRoute>);
}
//# sourceMappingURL=layout.js.map