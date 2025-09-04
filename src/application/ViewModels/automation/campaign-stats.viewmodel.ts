export class CampaignStatsVM {
  totalCampaigns: number;
  activeCampaigns: number;
  scheduledCampaigns: number;
  completedCampaigns: number;
  cancelledCampaigns: number;

  campaignsByType: Array<{
    campaignType: string;
    count: number;
    percentage: number;
  }>;

  campaignsByCategory: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;

  campaignsByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;

  totalRecipients: number;
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalReplied: number;
  totalBounced: number;
  totalUnsubscribed: number;

  averageDeliveryRate: number;
  averageOpenRate: number;
  averageClickRate: number;
  averageReplyRate: number;
  averageBounceRate: number;
  averageUnsubscribeRate: number;

  topPerformingCampaigns: Array<{
    campaignId: string;
    campaignName: string;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    replyRate: number;
  }>;

  dailyStats: Array<{
    date: string;
    campaignsSent: number;
    totalRecipients: number;
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
  }>;

  hourlyEngagement: Array<{
    hour: number;
    openCount: number;
    clickCount: number;
    replyCount: number;
  }>;

  constructor(init: Partial<CampaignStatsVM>) {
    this.totalCampaigns = init?.totalCampaigns ?? 0;
    this.activeCampaigns = init?.activeCampaigns ?? 0;
    this.scheduledCampaigns = init?.scheduledCampaigns ?? 0;
    this.completedCampaigns = init?.completedCampaigns ?? 0;
    this.cancelledCampaigns = init?.cancelledCampaigns ?? 0;

    this.campaignsByType = init?.campaignsByType ?? [];
    this.campaignsByCategory = init?.campaignsByCategory ?? [];
    this.campaignsByStatus = init?.campaignsByStatus ?? [];

    this.totalRecipients = init?.totalRecipients ?? 0;
    this.totalSent = init?.totalSent ?? 0;
    this.totalDelivered = init?.totalDelivered ?? 0;
    this.totalOpened = init?.totalOpened ?? 0;
    this.totalClicked = init?.totalClicked ?? 0;
    this.totalReplied = init?.totalReplied ?? 0;
    this.totalBounced = init?.totalBounced ?? 0;
    this.totalUnsubscribed = init?.totalUnsubscribed ?? 0;

    this.averageDeliveryRate = init?.averageDeliveryRate ?? 0;
    this.averageOpenRate = init?.averageOpenRate ?? 0;
    this.averageClickRate = init?.averageClickRate ?? 0;
    this.averageReplyRate = init?.averageReplyRate ?? 0;
    this.averageBounceRate = init?.averageBounceRate ?? 0;
    this.averageUnsubscribeRate = init?.averageUnsubscribeRate ?? 0;

    this.topPerformingCampaigns = init?.topPerformingCampaigns ?? [];
    this.dailyStats = init?.dailyStats ?? [];
    this.hourlyEngagement = init?.hourlyEngagement ?? [];
  }
}

