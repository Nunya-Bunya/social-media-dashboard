"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Building2, Zap, Users, TrendingUp, Calendar, Globe } from 'lucide-react';

export default function HomePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
    }
  }, [loading, isAuthenticated, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Nunya Bunya</h2>
          <p className="text-gray-500">Preparing your marketing dashboard...</p>
        </div>
      </div>
    );
  }

  // This will redirect, but show a fallback just in case
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Redirecting...</h2>
        <p className="text-gray-500">Please wait while we redirect you...</p>
      </div>
    </div>
  );
}

