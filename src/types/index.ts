// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  colors: BrandColors;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum CampaignType {
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  PAID_ADS = 'PAID_ADS',
  EMAIL = 'EMAIL',
  SEO = 'SEO',
  PR = 'PR',
  OUTREACH = 'OUTREACH'
}

export enum Platform {
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
  TIKTOK = 'TIKTOK',
  GOOGLE_ADS = 'GOOGLE_ADS',
  LINKEDIN_ADS = 'LINKEDIN_ADS',
  EMAIL = 'EMAIL'
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  PAID_ADS = 'PAID_ADS',
  EMAIL = 'EMAIL',
  REFERRAL = 'REFERRAL',
  COLD_OUTREACH = 'COLD_OUTREACH',
  SCRAPER = 'SCRAPER'
}

// Dashboard Types
export interface DashboardMetrics {
  totalRevenue: number;
  totalSpend: number;
  overallROI: number;
  activeLeads: number;
  campaignCount: number;
  conversionRate: number;
  monthlyGrowth: number;
  topPerformingCampaign?: Campaign;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: string;
  color?: string;
}

// Campaign Types
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  platforms: Platform[];
  budget: number;
  spent: number;
  startDate: Date;
  endDate?: Date;
  metrics: CampaignMetrics;
  brandId: string;
  tenantId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  revenue: number;
}

// Social Media Types
export interface SocialPost {
  id: string;
  content: string;
  mediaUrls: string[];
  platforms: Platform[];
  scheduledDate?: Date;
  publishedDate?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  metrics: PostMetrics;
  campaignId?: string;
  brandId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMetrics {
  impressions: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  ctr: number;
}

// Lead Management Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: LeadStatus;
  source: LeadSource;
  value: number;
  assignedTo?: string;
  notes?: string;
  tags: string[];
  campaignId?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface AnalyticsData {
  period: string;
  metrics: Record<string, number>;
  breakdown?: Record<string, any>;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

// Email Marketing Types
export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template?: string;
  status: CampaignStatus;
  sentCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  listId: string;
  campaignId?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailList {
  id: string;
  name: string;
  description?: string;
  subscriberCount: number;
  tags: string[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// SEO Types
export interface SEOKeyword {
  id: string;
  keyword: string;
  currentPosition: number;
  targetPosition: number;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  url?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// CRM Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  tags: string[];
  notes?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedCloseDate: Date;
  contactId: string;
  assignedTo?: string;
  notes?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum DealStage {
  PROSPECTING = 'PROSPECTING',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

// Settings Types
export interface TenantSettings {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  currency: string;
  dateFormat: string;
  integrations: IntegrationSettings;
  notifications: NotificationSettings;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface IntegrationSettings {
  googleAnalytics?: string;
  facebookPixel?: string;
  linkedinInsight?: string;
  mailchimp?: string;
  hubspot?: string;
  zapier?: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  slack?: string;
  webhook?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'file';
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: any;
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterConfig {
  field: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'dateRange' | 'search';
  options?: FilterOption[];
}

// Table Types
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Chart Types
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  data: ChartData[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  height?: number;
  width?: number;
}

// File Types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedBy: string;
  tenantId: string;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  userId: string;
  createdAt: Date;
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Date;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'campaign' | 'lead' | 'contact' | 'post' | 'email';
  title: string;
  description?: string;
  url: string;
  score: number;
}

// Export Types
export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf';
  filters?: Record<string, any>;
  columns?: string[];
  filename?: string;
}
