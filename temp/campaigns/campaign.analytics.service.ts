import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CampaignKpiDto, CampaignAnalyticsDto } from './dto/campaigns.dto';

@Injectable()
export class CampaignAnalyticsService {
  private readonly logger = new Logger(CampaignAnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async trackKpi(campaignId: string, kpiDto: CampaignKpiDto, tenantId: string) {
    // Verify campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const kpi = await this.prisma.campaignKPI.create({
      data: {
        campaignId,
        metric: kpiDto.metric,
        value: kpiDto.value,
        target: kpiDto.target,
        unit: kpiDto.unit,
        date: new Date(kpiDto.date),
        source: kpiDto.source,
      },
    });

    this.logger.log(`KPI tracked for campaign ${campaignId}: ${kpiDto.metric} = ${kpiDto.value}`);

    return kpi;
  }

  async trackAnalytics(campaignId: string, analyticsDto: CampaignAnalyticsDto, tenantId: string) {
    // Verify campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const analytics = await this.prisma.campaignAnalytics.create({
      data: {
        campaignId,
        date: new Date(analyticsDto.date),
        platform: analyticsDto.platform,
        impressions: analyticsDto.impressions,
        clicks: analyticsDto.clicks,
        conversions: analyticsDto.conversions,
        spend: analyticsDto.spend,
        revenue: analyticsDto.revenue,
        ctr: analyticsDto.ctr,
        cpc: analyticsDto.cpc,
        cpa: analyticsDto.cpa,
        roi: analyticsDto.roi,
        engagement: analyticsDto.engagement,
        demographics: analyticsDto.demographics,
        geographic: analyticsDto.geographic,
      },
    });

    this.logger.log(`Analytics tracked for campaign ${campaignId} on ${analyticsDto.date}`);

    return analytics;
  }

  async getCampaignPerformance(campaignId: string, tenantId: string, dateRange?: { start: Date; end: Date }) {
    // Verify campaign exists and belongs to tenant
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId },
      include: { brand: true, client: true },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Build date filter
    const dateFilter = dateRange ? {
      date: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    } : {};

    // Get analytics data
    const [analytics, kpis] = await Promise.all([
      this.prisma.campaignAnalytics.findMany({
        where: { campaignId, ...dateFilter },
        orderBy: { date: 'asc' },
      }),
      this.prisma.campaignKPI.findMany({
        where: { campaignId, ...dateFilter },
        orderBy: { date: 'asc' },
      }),
    ]);

    // Calculate performance metrics
    const performance = this.calculatePerformanceMetrics(analytics, kpis);

    return {
      campaign,
      analytics,
      kpis,
      performance,
      dateRange,
    };
  }

  async getTenantPerformance(tenantId: string, dateRange?: { start: Date; end: Date }) {
    // Build date filter
    const dateFilter = dateRange ? {
      date: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    } : {};

    // Get all campaigns for tenant
    const campaigns = await this.prisma.campaign.findMany({
      where: { tenantId },
      include: {
        brand: true,
        client: true,
        analytics: {
          where: dateFilter,
        },
        kpis: {
          where: dateFilter,
        },
      },
    });

    // Calculate aggregate performance
    const aggregatePerformance = this.calculateAggregatePerformance(campaigns);

    // Get top performing campaigns
    const topCampaigns = campaigns
      .filter(c => c.analytics.length > 0)
      .map(c => ({
        id: c.id,
        name: c.name,
        brand: c.brand.name,
        client: c.client?.name,
        performance: this.calculateCampaignPerformance(c.analytics, c.kpis),
      }))
      .sort((a, b) => (b.performance.roi || 0) - (a.performance.roi || 0))
      .slice(0, 10);

    return {
      aggregatePerformance,
      topCampaigns,
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
      dateRange,
    };
  }

  async getClientPerformance(clientId: string, tenantId: string, dateRange?: { start: Date; end: Date }) {
    // Verify client exists and belongs to tenant
    const client = await this.prisma.client.findFirst({
      where: { id: clientId, tenantId },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    // Build date filter
    const dateFilter = dateRange ? {
      date: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    } : {};

    // Get client campaigns
    const campaigns = await this.prisma.campaign.findMany({
      where: { clientId, tenantId },
      include: {
        brand: true,
        analytics: {
          where: dateFilter,
        },
        kpis: {
          where: dateFilter,
        },
      },
    });

    // Calculate client performance
    const clientPerformance = this.calculateClientPerformance(campaigns);

    return {
      client,
      campaigns,
      performance: clientPerformance,
      dateRange,
    };
  }

  async generatePerformanceReport(campaignId: string, tenantId: string, reportType: 'daily' | 'weekly' | 'monthly' = 'weekly') {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId },
      include: { brand: true, client: true },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Calculate date range based on report type
    const endDate = new Date();
    const startDate = new Date();
    
    switch (reportType) {
      case 'daily':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
    }

    // Get performance data
    const performance = await this.getCampaignPerformance(campaignId, tenantId, { start: startDate, end: endDate });

    // Generate report
    const report = this.generateReport(performance, reportType);

    return {
      campaign,
      report,
      dateRange: { start: startDate, end: endDate },
      reportType,
    };
  }

  async getPerformanceInsights(tenantId: string, dateRange?: { start: Date; end: Date }) {
    // Get performance data
    const performance = await this.getTenantPerformance(tenantId, dateRange);

    // Generate insights
    const insights = this.generateInsights(performance);

    return {
      performance,
      insights,
      dateRange,
    };
  }

  private calculatePerformanceMetrics(analytics: any[], kpis: any[]): any {
    if (analytics.length === 0) {
      return {
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        totalSpend: 0,
        totalRevenue: 0,
        averageCtr: 0,
        averageCpc: 0,
        averageCpa: 0,
        averageRoi: 0,
        trend: 'stable',
      };
    }

    // Calculate totals
    const totals = analytics.reduce((acc, item) => ({
      impressions: acc.impressions + (item.impressions || 0),
      clicks: acc.clicks + (item.clicks || 0),
      conversions: acc.conversions + (item.conversions || 0),
      spend: acc.spend + (item.spend || 0),
      revenue: acc.revenue + (item.revenue || 0),
    }), { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 });

    // Calculate averages
    const averageCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
    const averageCpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
    const averageCpa = totals.conversions > 0 ? totals.spend / totals.conversions : 0;
    const averageRoi = totals.spend > 0 ? totals.revenue / totals.spend : 0;

    // Calculate trend
    const trend = this.calculateTrend(analytics);

    return {
      totalImpressions: totals.impressions,
      totalClicks: totals.clicks,
      totalConversions: totals.conversions,
      totalSpend: totals.spend,
      totalRevenue: totals.revenue,
      averageCtr,
      averageCpc,
      averageCpa,
      averageRoi,
      trend,
    };
  }

  private calculateAggregatePerformance(campaigns: any[]): any {
    if (campaigns.length === 0) {
      return {
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        totalSpend: 0,
        totalRevenue: 0,
        averageCtr: 0,
        averageCpc: 0,
        averageCpa: 0,
        averageRoi: 0,
        totalCampaigns: 0,
      };
    }

    // Aggregate all analytics
    const allAnalytics = campaigns.flatMap(c => c.analytics);
    const allKpis = campaigns.flatMap(c => c.kpis);

    return this.calculatePerformanceMetrics(allAnalytics, allKpis);
  }

  private calculateClientPerformance(campaigns: any[]): any {
    if (campaigns.length === 0) {
      return {
        totalCampaigns: 0,
        activeCampaigns: 0,
        totalSpend: 0,
        totalRevenue: 0,
        averageRoi: 0,
        bestPerformingCampaign: null,
      };
    }

    const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE');
    const totalSpend = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
    
    // Calculate total revenue from analytics
    const totalRevenue = campaigns.reduce((sum, c) => {
      return sum + c.analytics.reduce((analyticsSum, a) => analyticsSum + (a.revenue || 0), 0);
    }, 0);

    const averageRoi = totalSpend > 0 ? totalRevenue / totalSpend : 0;

    // Find best performing campaign
    const bestPerformingCampaign = campaigns
      .filter(c => c.analytics.length > 0)
      .reduce((best, current) => {
        const currentRevenue = current.analytics.reduce((sum, a) => sum + (a.revenue || 0), 0);
        const bestRevenue = best ? best.analytics.reduce((sum, a) => sum + (a.revenue || 0), 0) : 0;
        return currentRevenue > bestRevenue ? current : best;
      }, null);

    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: activeCampaigns.length,
      totalSpend,
      totalRevenue,
      averageRoi,
      bestPerformingCampaign: bestPerformingCampaign ? {
        id: bestPerformingCampaign.id,
        name: bestPerformingCampaign.name,
        revenue: bestPerformingCampaign.analytics.reduce((sum, a) => sum + (a.revenue || 0), 0),
      } : null,
    };
  }

  private calculateCampaignPerformance(analytics: any[], kpis: any[]): any {
    return this.calculatePerformanceMetrics(analytics, kpis);
  }

  private calculateTrend(analytics: any[]): string {
    if (analytics.length < 2) return 'stable';

    // Sort by date
    const sortedAnalytics = analytics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Get first and last data points
    const first = sortedAnalytics[0];
    const last = sortedAnalytics[sortedAnalytics.length - 1];

    // Calculate change in key metrics
    const impressionsChange = ((last.impressions - first.impressions) / first.impressions) * 100;
    const clicksChange = ((last.clicks - first.clicks) / first.clicks) * 100;
    const conversionsChange = ((last.conversions - first.conversions) / first.conversions) * 100;

    // Determine trend based on overall performance
    const averageChange = (impressionsChange + clicksChange + conversionsChange) / 3;

    if (averageChange > 10) return 'increasing';
    if (averageChange < -10) return 'decreasing';
    return 'stable';
  }

  private generateReport(performance: any, reportType: string): any {
    const { campaign, performance: metrics } = performance;

    return {
      summary: {
        campaignName: campaign.name,
        reportType,
        generatedAt: new Date(),
        period: `${reportType} report`,
      },
      performance: {
        overview: {
          impressions: metrics.totalImpressions,
          clicks: metrics.totalClicks,
          conversions: metrics.totalConversions,
          spend: metrics.totalSpend,
          revenue: metrics.totalRevenue,
        },
        metrics: {
          ctr: metrics.averageCtr,
          cpc: metrics.averageCpc,
          cpa: metrics.averageCpa,
          roi: metrics.averageRoi,
        },
        trend: metrics.trend,
      },
      recommendations: this.generateRecommendations(metrics),
    };
  }

  private generateInsights(performance: any): any[] {
    const insights = [];
    const { aggregatePerformance } = performance;

    // Generate insights based on performance data
    if (aggregatePerformance.averageCtr < 2) {
      insights.push({
        type: 'warning',
        title: 'Low Click-Through Rate',
        message: 'Your average CTR is below industry standards. Consider improving ad creative and targeting.',
        priority: 'high',
      });
    }

    if (aggregatePerformance.averageRoi < 2) {
      insights.push({
        type: 'warning',
        title: 'Low Return on Investment',
        message: 'Your campaigns are not generating sufficient ROI. Review budget allocation and targeting.',
        priority: 'high',
      });
    }

    if (aggregatePerformance.totalConversions > 100) {
      insights.push({
        type: 'success',
        title: 'Strong Conversion Performance',
        message: 'Your campaigns are driving good conversion rates. Consider scaling successful strategies.',
        priority: 'medium',
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'info',
        title: 'Performance is Stable',
        message: 'Your campaigns are performing within expected ranges. Continue monitoring and optimizing.',
        priority: 'low',
      });
    }

    return insights;
  }

  private generateRecommendations(metrics: any): string[] {
    const recommendations = [];

    if (metrics.averageCtr < 2) {
      recommendations.push('Improve ad creative and targeting to increase click-through rates');
    }

    if (metrics.averageRoi < 2) {
      recommendations.push('Optimize ad spend allocation and targeting for better ROI');
    }

    if (metrics.totalConversions < 10) {
      recommendations.push('Focus on conversion rate optimization and landing page improvements');
    }

    if (metrics.averageCpc > 5) {
      recommendations.push('Review keyword strategy and bidding to reduce cost per click');
    }

    if (recommendations.length === 0) {
      recommendations.push('Campaign performance is strong, consider scaling successful strategies');
      recommendations.push('Explore new audience segments and platforms for growth opportunities');
    }

    return recommendations;
  }
}
