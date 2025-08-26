import { useState, useEffect } from 'react';
import { realDataService, realTimeDataManager } from '@/lib/realDataService';

// Hook for using real-time data in components
export function useRealData<T>(dataType: string, initialData?: T) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch initial data
        const result = await realDataService[`get${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Metrics`]();
        setData(result);
        
        // Subscribe to real-time updates
        unsubscribe = realTimeDataManager.subscribe(dataType, (newData) => {
          setData(newData);
        });
        
      } catch (err) {
        console.error(`Error fetching ${dataType} data:`, err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dataType]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await realTimeDataManager.refreshData(dataType);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refresh };
}

// Specific hooks for different data types
export function useSocialMediaData() {
  return useRealData('socialMedia');
}

export function useSeoData() {
  return useRealData('seo');
}

export function useBusinessData() {
  return useRealData('business');
}

export function useContentData() {
  return useRealData('content');
}

export function useClientData() {
  return useRealData('client');
}

export function useCompetitiveData() {
  return useRealData('competitive');
}

export function useSocialListeningData() {
  return useRealData('socialListening');
}

// Hook for dashboard overview data
export function useDashboardOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // This would call your backend API
        const response = await fetch('/api/dashboard/overview', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard overview');
        }
        
        const data = await response.json();
        setOverview(data);
        
      } catch (err) {
        console.error('Error fetching dashboard overview:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch overview');
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard/overview', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard overview');
      }
      
      const data = await response.json();
      setOverview(data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh overview');
    } finally {
      setLoading(false);
    }
  };

  return { overview, loading, error, refresh };
}

