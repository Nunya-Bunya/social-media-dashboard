export const config = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
  // Authentication
  authEnabled: process.env.NEXT_PUBLIC_AUTH_ENABLED !== 'false',
  
  // Demo Credentials
  demoEmail: process.env.NEXT_PUBLIC_DEMO_EMAIL || 'test@example.com',
  demoPassword: process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'password',
  
  // Feature Flags
  features: {
    aiAssistant: process.env.NEXT_PUBLIC_ENABLE_AI_ASSISTANT !== 'false',
    leadFinder: process.env.NEXT_PUBLIC_ENABLE_LEAD_FINDER !== 'false',
    coldCallScraper: process.env.NEXT_PUBLIC_ENABLE_COLD_CALL_SCRAPER !== 'false',
    prManagement: process.env.NEXT_PUBLIC_ENABLE_PR_MANAGEMENT !== 'false',
  },
  
  // Business Configuration
  businesses: [
    {
      id: "1",
      name: "Merkel & Conner",
      industry: "Legal Services",
      primaryColor: "from-blue-600 to-indigo-600",
      secondaryColor: "from-blue-900 to-indigo-900",
    },
    {
      id: "2", 
      name: "Conner Injury Law",
      industry: "Personal Injury Law",
      primaryColor: "from-red-600 to-rose-600",
      secondaryColor: "from-red-900 to-rose-900",
    },
    {
      id: "3",
      name: "MBCS",
      industry: "Business Consulting",
      primaryColor: "from-green-600 to-emerald-600",
      secondaryColor: "from-green-900 to-emerald-900",
    },
    {
      id: "4",
      name: "Nunya Bunya",
      industry: "Food & Beverage",
      primaryColor: "from-orange-600 to-amber-600",
      secondaryColor: "from-orange-900 to-amber-900",
    },
    {
      id: "5",
      name: "Power Portraits",
      industry: "Photography",
      primaryColor: "from-purple-600 to-violet-600",
      secondaryColor: "from-purple-900 to-violet-900",
    },
    {
      id: "6",
      name: "B.C. Media",
      industry: "Media Production",
      primaryColor: "from-pink-600 to-rose-600",
      secondaryColor: "from-pink-900 to-rose-900",
    },
    {
      id: "7",
      name: "ORCA Awards",
      industry: "Awards & Recognition",
      primaryColor: "from-cyan-600 to-blue-600",
      secondaryColor: "from-cyan-900 to-blue-900",
    },
    {
      id: "8",
      name: "Stumpy Tail Catalogue",
      industry: "E-commerce",
      primaryColor: "from-teal-600 to-cyan-600",
      secondaryColor: "from-teal-900 to-cyan-900",
    },
    {
      id: "9",
      name: "The Conner Store",
      industry: "Retail",
      primaryColor: "from-indigo-600 to-purple-600",
      secondaryColor: "from-indigo-900 to-purple-900",
    },
    {
      id: "10",
      name: "Naming Names",
      industry: "Podcast & YouTube",
      primaryColor: "from-rose-600 to-pink-600",
      secondaryColor: "from-rose-900 to-pink-900",
    },
  ]
}
