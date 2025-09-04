import { MarketingCampaign, CampaignExecution, Employee } from ".prisma/tenant-client";
import { Prisma } from ".prisma/tenant-client";

export type MarketingCampaignWithRelations = Prisma.MarketingCampaignGetPayload<{
  include: {
    createdByEmployee: {
      select: {
        id: true;
        fullName: true;
        email: true;
      };
    };
    campaignExecutions: {
      include: {
        campaignRecipients: true;
        campaignReport: true;
      };
    };
  };
}>;

export class MarketingCampaignToListVM {
  public id: string;
  public name: string;
  public description?: string;
  public campaignType: string;
  public category?: string;
  public status: string;
  public priority: string;
  public scheduledAt?: Date;
  public totalRecipients: number;
  public sentCount: number;
  public deliveryRate: number;
  public openRate: number;
  public clickRate: number;
  public createdByEmployeeName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(campaign: MarketingCampaignWithRelations) {
    this.id = campaign.id;
    this.name = campaign.name;
    this.description = campaign.description!;
    this.campaignType = campaign.campaignType;
    this.category = campaign.category!;
    this.status = campaign.status;
    this.priority = campaign.priority;
    this.scheduledAt = campaign.scheduledAt!;
    this.createdByEmployeeName = campaign.createdByEmployee.fullName;
    this.createdAt = campaign.createdAt;
    this.updatedAt = campaign.updatedAt;

    // Calcular estatísticas da última execução
    const lastExecution = campaign.campaignExecutions[0];
    if (lastExecution) {
      this.totalRecipients = lastExecution.totalRecipients;
      this.sentCount = lastExecution.sentCount;
      this.deliveryRate = lastExecution.totalRecipients > 0 
        ? Number((lastExecution.deliveredCount / lastExecution.totalRecipients * 100).toFixed(2))
        : 0;
      this.openRate = lastExecution.totalRecipients > 0 
        ? Number((lastExecution.openedCount / lastExecution.totalRecipients * 100).toFixed(2))
        : 0;
      this.clickRate = lastExecution.totalRecipients > 0 
        ? Number((lastExecution.clickedCount / lastExecution.totalRecipients * 100).toFixed(2))
        : 0;
    } else {
      this.totalRecipients = 0;
      this.sentCount = 0;
      this.deliveryRate = 0;
      this.openRate = 0;
      this.clickRate = 0;
    }
  }
}

export class MarketingCampaignVM {
  public id: string;
  public name: string;
  public description?: string;
  public campaignType: string;
  public category?: string;
  public subject?: string;
  public content: string;
  public templateId?: string;
  public targetAudience?: any;
  public targetLeads: string[];
  public targetClients: string[];
  public scheduledAt?: Date;
  public timezone: string;
  public status: string;
  public priority: string;
  public sendLimit?: number;
  public batchSize: number;
  public createdByEmployee: {
    id: string;
    fullName: string;
    email: string;
  };
  public campaignExecutions: CampaignExecutionVM[];
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(campaign: MarketingCampaignWithRelations) {
    this.id = campaign.id;
    this.name = campaign.name;
    this.description = campaign.description!;
    this.campaignType = campaign.campaignType;
    this.category = campaign.category!;
    this.subject = campaign.subject!;
    this.content = campaign.content;
    this.templateId = campaign.templateId!;
    this.targetAudience = campaign.targetAudience;
    this.targetLeads = campaign.targetLeads;
    this.targetClients = campaign.targetClients;
    this.scheduledAt = campaign.scheduledAt!;
    this.timezone = campaign.timezone;
    this.status = campaign.status;
    this.priority = campaign.priority;
    this.sendLimit = campaign.sendLimit!;
    this.batchSize = campaign.batchSize;
    this.isActive = campaign.isActive;
    this.createdAt = campaign.createdAt;
    this.updatedAt = campaign.updatedAt;

    this.createdByEmployee = {
      id: campaign.createdByEmployee.id,
      fullName: campaign.createdByEmployee.fullName,
      email: campaign.createdByEmployee.email
    };

    this.campaignExecutions = campaign.campaignExecutions.map(execution => 
      new CampaignExecutionVM(execution)
    );
  }
}

export class CampaignExecutionVM {
  public id: string;
  public campaignId: string;
  public executionDate: Date;
  public status: string;
  public totalRecipients: number;
  public sentCount: number;
  public deliveredCount: number;
  public openedCount: number;
  public clickedCount: number;
  public repliedCount: number;
  public bouncedCount: number;
  public unsubscribedCount: number;
  public startedAt?: Date;
  public completedAt?: Date;
  public errorMessage?: string;
  public campaignRecipients: CampaignRecipientVM[];
  public campaignReport?: CampaignReportVM;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(execution: any) {
    this.id = execution.id;
    this.campaignId = execution.campaignId;
    this.executionDate = execution.executionDate;
    this.status = execution.status;
    this.totalRecipients = execution.totalRecipients;
    this.sentCount = execution.sentCount;
    this.deliveredCount = execution.deliveredCount;
    this.openedCount = execution.openedCount;
    this.clickedCount = execution.clickedCount;
    this.repliedCount = execution.repliedCount;
    this.bouncedCount = execution.bouncedCount;
    this.unsubscribedCount = execution.unsubscribedCount;
    this.startedAt = execution.startedAt;
    this.completedAt = execution.completedAt;
    this.errorMessage = execution.errorMessage;
    this.isActive = execution.isActive;
    this.createdAt = execution.createdAt;
    this.updatedAt = execution.updatedAt;

    this.campaignRecipients = execution.campaignRecipients?.map((recipient: any) => 
      new CampaignRecipientVM(recipient)
    ) || [];

    this.campaignReport = execution.campaignReport 
      ? new CampaignReportVM(execution.campaignReport)
      : undefined;
  }
}

export class CampaignRecipientVM {
  public id: string;
  public executionId: string;
  public recipientType: string;
  public recipientId?: string;
  public recipientName: string;
  public recipientEmail?: string;
  public recipientPhone?: string;
  public status: string;
  public sentAt?: Date;
  public deliveredAt?: Date;
  public openedAt?: Date;
  public clickedAt?: Date;
  public repliedAt?: Date;
  public bouncedAt?: Date;
  public unsubscribedAt?: Date;
  public errorMessage?: string;
  public metadata?: any;
  public messageId?: string;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(recipient: any) {
    this.id = recipient.id;
    this.executionId = recipient.executionId;
    this.recipientType = recipient.recipientType;
    this.recipientId = recipient.recipientId;
    this.recipientName = recipient.recipientName;
    this.recipientEmail = recipient.recipientEmail;
    this.recipientPhone = recipient.recipientPhone;
    this.status = recipient.status;
    this.sentAt = recipient.sentAt;
    this.deliveredAt = recipient.deliveredAt;
    this.openedAt = recipient.openedAt;
    this.clickedAt = recipient.clickedAt;
    this.repliedAt = recipient.repliedAt;
    this.bouncedAt = recipient.bouncedAt;
    this.unsubscribedAt = recipient.unsubscribedAt;
    this.errorMessage = recipient.errorMessage;
    this.metadata = recipient.metadata;
    this.messageId = recipient.messageId;
    this.isActive = recipient.isActive;
    this.createdAt = recipient.createdAt;
    this.updatedAt = recipient.updatedAt;
  }
}

export class CampaignReportVM {
  public id: string;
  public executionId: string;
  public deliveryRate: number;
  public openRate: number;
  public clickRate: number;
  public replyRate: number;
  public bounceRate: number;
  public unsubscribeRate: number;
  public totalEngagement: number;
  public avgEngagementTime?: number;
  public peakEngagementHour?: number;
  public peakEngagementDay?: string;
  public demographics?: any;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(report: any) {
    this.id = report.id;
    this.executionId = report.executionId;
    this.deliveryRate = Number(report.deliveryRate);
    this.openRate = Number(report.openRate);
    this.clickRate = Number(report.clickRate);
    this.replyRate = Number(report.replyRate);
    this.bounceRate = Number(report.bounceRate);
    this.unsubscribeRate = Number(report.unsubscribeRate);
    this.totalEngagement = report.totalEngagement;
    this.avgEngagementTime = report.avgEngagementTime ? Number(report.avgEngagementTime) : undefined;
    this.peakEngagementHour = report.peakEngagementHour;
    this.peakEngagementDay = report.peakEngagementDay;
    this.demographics = report.demographics;
    this.isActive = report.isActive;
    this.createdAt = report.createdAt;
    this.updatedAt = report.updatedAt;
  }
}
