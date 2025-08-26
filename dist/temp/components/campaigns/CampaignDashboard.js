"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const outline_1 = require("@heroicons/react/24/outline");
const CampaignCard_1 = require("./CampaignCard");
const CampaignFilters_1 = require("./CampaignFilters");
const CampaignStats_1 = require("./CampaignStats");
const CreateCampaignModal_1 = require("./CreateCampaignModal");
const CampaignDashboard = ({ tenantId }) => {
    const [campaigns, setCampaigns] = (0, react_1.useState)([]);
    const [filteredCampaigns, setFilteredCampaigns] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showCreateModal, setShowCreateModal] = (0, react_1.useState)(false);
    const [showFilters, setShowFilters] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [filters, setFilters] = (0, react_1.useState)({
        status: '',
        type: '',
        goal: '',
        clientId: '',
        brandId: '',
    });
    const [sortBy, setSortBy] = (0, react_1.useState)('createdAt');
    const [sortOrder, setSortOrder] = (0, react_1.useState)('desc');
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalPages, setTotalPages] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        fetchCampaigns();
    }, [tenantId, currentPage, sortBy, sortOrder]);
    (0, react_1.useEffect)(() => {
        applyFilters();
    }, [campaigns, filters, searchTerm]);
    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/campaigns?page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCampaigns(data.data);
                setTotalPages(data.pagination.pages);
            }
        }
        catch (error) {
            console.error('Error fetching campaigns:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const applyFilters = () => {
        let filtered = [...campaigns];
        if (searchTerm) {
            filtered = filtered.filter(campaign => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (filters.status) {
            filtered = filtered.filter(campaign => campaign.status === filters.status);
        }
        if (filters.type) {
            filtered = filtered.filter(campaign => campaign.type === filters.type);
        }
        if (filters.goal) {
            filtered = filtered.filter(campaign => campaign.goal === filters.goal);
        }
        if (filters.clientId) {
            filtered = filtered.filter(campaign => campaign.clientId === filters.clientId);
        }
        if (filters.brandId) {
            filtered = filtered.filter(campaign => campaign.brandId === filters.brandId);
        }
        setFilteredCampaigns(filtered);
    };
    const handleCreateCampaign = async (campaignData) => {
        try {
            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(campaignData),
            });
            if (response.ok) {
                const newCampaign = await response.json();
                setCampaigns(prev => [newCampaign, ...prev]);
                setShowCreateModal(false);
                fetchCampaigns();
            }
        }
        catch (error) {
            console.error('Error creating campaign:', error);
        }
    };
    const handleStatusChange = async (campaignId, newStatus) => {
        try {
            let endpoint = '';
            switch (newStatus) {
                case 'ACTIVE':
                    endpoint = 'launch';
                    break;
                case 'PAUSED':
                    endpoint = 'pause';
                    break;
                case 'COMPLETED':
                    endpoint = 'complete';
                    break;
                default:
                    return;
            }
            const response = await fetch(`/api/campaigns/${campaignId}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                fetchCampaigns();
            }
        }
        catch (error) {
            console.error('Error updating campaign status:', error);
        }
    };
    const handleDeleteCampaign = async (campaignId) => {
        if (!confirm('Are you sure you want to delete this campaign?'))
            return;
        try {
            const response = await fetch(`/api/campaigns/${campaignId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                setCampaigns(prev => prev.filter(c => c.id !== campaignId));
            }
        }
        catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'DRAFT':
                return 'bg-gray-100 text-gray-800';
            case 'PLANNED':
                return 'bg-blue-100 text-blue-800';
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'PAUSED':
                return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED':
                return 'bg-purple-100 text-purple-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'DRAFT':
                return '📝';
            case 'PLANNED':
                return '📅';
            case 'ACTIVE':
                return '🚀';
            case 'PAUSED':
                return '⏸️';
            case 'COMPLETED':
                return '✅';
            case 'CANCELLED':
                return '❌';
            default:
                return '📝';
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your marketing campaigns
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <outline_1.FunnelIcon className="h-4 w-4 mr-2"/>
            Filters
          </button>
          <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <outline_1.PlusIcon className="h-4 w-4 mr-2"/>
            Create Campaign
          </button>
        </div>
      </div>

      
      <CampaignStats_1.default tenantId={tenantId}/>

      
      <div className="space-y-4">
        
        <div className="relative">
          <outline_1.MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
          <input type="text" placeholder="Search campaigns..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        
        {showFilters && (<CampaignFilters_1.default filters={filters} onFiltersChange={setFilters} onApplyFilters={applyFilters}/>)}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (<CampaignCard_1.default key={campaign.id} campaign={campaign} onStatusChange={handleStatusChange} onDelete={handleDeleteCampaign} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon}/>))}
      </div>

      
      {filteredCampaigns.length === 0 && !loading && (<div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <outline_1.ChartBarIcon className="h-12 w-12"/>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || Object.values(filters).some(f => f)
                ? 'Try adjusting your search or filters.'
                : 'Get started by creating your first campaign.'}
          </p>
          {!searchTerm && !Object.values(filters).some(f => f) && (<div className="mt-6">
              <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <outline_1.PlusIcon className="h-4 w-4 mr-2"/>
                Create Campaign
              </button>
            </div>)}
        </div>)}

      
      {totalPages > 1 && (<div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>)}

      
      {showCreateModal && (<CreateCampaignModal_1.default onClose={() => setShowCreateModal(false)} onSubmit={handleCreateCampaign} tenantId={tenantId}/>)}
    </div>);
};
exports.default = CampaignDashboard;
//# sourceMappingURL=CampaignDashboard.js.map