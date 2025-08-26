"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRealData = useRealData;
exports.useSocialMediaData = useSocialMediaData;
exports.useSeoData = useSeoData;
exports.useBusinessData = useBusinessData;
exports.useContentData = useContentData;
exports.useClientData = useClientData;
exports.useCompetitiveData = useCompetitiveData;
exports.useSocialListeningData = useSocialListeningData;
exports.useDashboardOverview = useDashboardOverview;
const react_1 = require("react");
const realDataService_1 = require("@/lib/realDataService");
function useRealData(dataType, initialData) {
    const [data, setData] = (0, react_1.useState)(initialData || null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let unsubscribe = null;
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await realDataService_1.realDataService[`get${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Metrics`]();
                setData(result);
                unsubscribe = realDataService_1.realTimeDataManager.subscribe(dataType, (newData) => {
                    setData(newData);
                });
            }
            catch (err) {
                console.error(`Error fetching ${dataType} data:`, err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
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
            const result = await realDataService_1.realTimeDataManager.refreshData(dataType);
            setData(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh data');
        }
        finally {
            setLoading(false);
        }
    };
    return { data, loading, error, refresh };
}
function useSocialMediaData() {
    return useRealData('socialMedia');
}
function useSeoData() {
    return useRealData('seo');
}
function useBusinessData() {
    return useRealData('business');
}
function useContentData() {
    return useRealData('content');
}
function useClientData() {
    return useRealData('client');
}
function useCompetitiveData() {
    return useRealData('competitive');
}
function useSocialListeningData() {
    return useRealData('socialListening');
}
function useDashboardOverview() {
    const [overview, setOverview] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchOverview = async () => {
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
            }
            catch (err) {
                console.error('Error fetching dashboard overview:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch overview');
            }
            finally {
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
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh overview');
        }
        finally {
            setLoading(false);
        }
    };
    return { overview, loading, error, refresh };
}
//# sourceMappingURL=useRealData.js.map