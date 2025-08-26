"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
require("./globals.css");
const AuthContext_1 = require("@/contexts/AuthContext");
const spaceGrotesk = (0, google_1.Space_Grotesk)({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-space-grotesk",
});
const dmSans = (0, google_1.DM_Sans)({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-dm-sans",
});
function RootLayout({ children, }) {
    return (<html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body>
        <AuthContext_1.AuthProvider>
          {children}
        </AuthContext_1.AuthProvider>
      </body>
    </html>);
}
exports.metadata = {
    generator: 'v0.app'
};
//# sourceMappingURL=layout.js.map