import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import CampaignCard from './CampaignCard';
import CampaignFilters from './CampaignFilters';
import CampaignStats from './CampaignStats';
import CreateCampaignModal from './CreateCampaignModal';
import { Campaign, CampaignStatus, CampaignType, CampaignGoal } from '../../types/campaigns';

interface CampaignDashboardProps {
  tenantId: string;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ tenantId }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    goal: '',
    clientId: '',
    brandId: '',
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCampaigns();
  }, [tenantId, currentPage, sortBy, sortOrder]);

  useEffect(() => {
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
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...campaigns];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(campaign => campaign.status === filters.status);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(campaign => campaign.type === filters.type);
    }

    // Apply goal filter
    if (filters.goal) {
      filtered = filtered.filter(campaign => campaign.goal === filters.goal);
    }

    // Apply client filter
    if (filters.clientId) {
      filtered = filtered.filter(campaign => campaign.clientId === filters.clientId);
    }

    // Apply brand filter
    if (filters.brandId) {
      filtered = filtered.filter(campaign => campaign.brandId === filters.brandId);
    }

    setFilteredCampaigns(filtered);
  };

  const handleCreateCampaign = async (campaignData: Partial<Campaign>) => {
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
        fetchCampaigns(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: CampaignStatus) => {
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
        fetchCampaigns(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

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
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const getStatusColor = (status: CampaignStatus) => {
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

  const getStatusIcon = (status: CampaignStatus) => {
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your marketing campaigns
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <CampaignStats tenantId={tenantId} />

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <CampaignFilters
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={applyFilters}
          />
        )}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteCampaign}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <ChartBarIcon className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || Object.values(filters).some(f => f) 
              ? 'Try adjusting your search or filters.'
              : 'Get started by creating your first campaign.'
            }
          </p>
          {!searchTerm && !Object.values(filters).some(f => f) && (
            <div className="mt-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Campaign
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
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
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCampaign}
          tenantId={tenantId}
        />
      )}
    </div>
  );
};

export default CampaignDashboard;
