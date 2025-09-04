import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetCampaignStatsRequest } from "./get-campaign-stats.request";
import { CampaignStatsVM } from "src/application/ViewModels/automation/campaign-stats.viewmodel";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class GetCampaignStatsService extends HandlerBase<GetCampaignStatsRequest, CampaignStatsVM> {
    protected async executeCore(request: GetCampaignStatsRequest, data?: any): Promise<CampaignStatsVM> {
        const whereClause: any = {
            isActive: true
        };

        // Aplicar filtros de data
        if (request.startDate || request.endDate) {
            whereClause.createdAt = {};
            if (request.startDate) {
                whereClause.createdAt.gte = new Date(request.startDate);
            }
            if (request.endDate) {
                whereClause.createdAt.lte = new Date(request.endDate);
            }
        }

        // Aplicar filtros de tipo e categoria
        if (request.campaignType) {
            whereClause.campaignType = request.campaignType;
        }
        if (request.category) {
            whereClause.category = request.category;
        }

        // Buscar campanhas
        const campaigns = await this.context.marketingCampaign.findMany({
            where: whereClause,
            include: {
                campaignExecutions: {
                    include: {
                        campaignRecipients: true,
                        campaignReport: true
                    }
                }
            }
        });

        // Calcular estatísticas
        const stats = new CampaignStatsVM({});

        // Contadores básicos
        stats.totalCampaigns = campaigns.length;
        stats.activeCampaigns = campaigns.filter(c => c.status === CampaignStatus.RUNNING).length;
        stats.scheduledCampaigns = campaigns.filter(c => c.status === CampaignStatus.SCHEDULED).length;
        stats.completedCampaigns = campaigns.filter(c => c.status === CampaignStatus.COMPLETED).length;
        stats.cancelledCampaigns = campaigns.filter(c => c.status === CampaignStatus.CANCELLED).length;

        // Estatísticas por tipo
        const typeCounts = campaigns.reduce((acc, campaign) => {
            acc[campaign.campaignType] = (acc[campaign.campaignType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        stats.campaignsByType = Object.entries(typeCounts).map(([type, count]) => ({
            campaignType: type,
            count,
            percentage: Number(((count / stats.totalCampaigns) * 100).toFixed(2))
        }));

        // Estatísticas por categoria
        const categoryCounts = campaigns.reduce((acc, campaign) => {
            const category = campaign.category || 'SEM_CATEGORIA';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        stats.campaignsByCategory = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count,
            percentage: Number(((count / stats.totalCampaigns) * 100).toFixed(2))
        }));

        // Estatísticas por status
        const statusCounts = campaigns.reduce((acc, campaign) => {
            acc[campaign.status] = (acc[campaign.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        stats.campaignsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count,
            percentage: Number(((count / stats.totalCampaigns) * 100).toFixed(2))
        }));

        // Calcular métricas de execução
        let totalRecipients = 0;
        let totalSent = 0;
        let totalDelivered = 0;
        let totalOpened = 0;
        let totalClicked = 0;
        let totalReplied = 0;
        let totalBounced = 0;
        let totalUnsubscribed = 0;

        const campaignMetrics: any[] = [];

        for (const campaign of campaigns) {
            for (const execution of campaign.campaignExecutions) {
                totalRecipients += execution.totalRecipients;
                totalSent += execution.sentCount;
                totalDelivered += execution.deliveredCount;
                totalOpened += execution.openedCount;
                totalClicked += execution.clickedCount;
                totalReplied += execution.repliedCount;
                totalBounced += execution.bouncedCount;
                totalUnsubscribed += execution.unsubscribedCount;

                // Calcular métricas da campanha
                const deliveryRate = execution.totalRecipients > 0 
                    ? (execution.deliveredCount / execution.totalRecipients) * 100 
                    : 0;
                const openRate = execution.totalRecipients > 0 
                    ? (execution.openedCount / execution.totalRecipients) * 100 
                    : 0;
                const clickRate = execution.totalRecipients > 0 
                    ? (execution.clickedCount / execution.totalRecipients) * 100 
                    : 0;
                const replyRate = execution.totalRecipients > 0 
                    ? (execution.repliedCount / execution.totalRecipients) * 100 
                    : 0;

                campaignMetrics.push({
                    campaignId: campaign.id,
                    campaignName: campaign.name,
                    deliveryRate: Number(deliveryRate.toFixed(2)),
                    openRate: Number(openRate.toFixed(2)),
                    clickRate: Number(clickRate.toFixed(2)),
                    replyRate: Number(replyRate.toFixed(2))
                });
            }
        }

        stats.totalRecipients = totalRecipients;
        stats.totalSent = totalSent;
        stats.totalDelivered = totalDelivered;
        stats.totalOpened = totalOpened;
        stats.totalClicked = totalClicked;
        stats.totalReplied = totalReplied;
        stats.totalBounced = totalBounced;
        stats.totalUnsubscribed = totalUnsubscribed;

        // Calcular taxas médias
        stats.averageDeliveryRate = totalRecipients > 0 
            ? Number(((totalDelivered / totalRecipients) * 100).toFixed(2))
            : 0;
        stats.averageOpenRate = totalRecipients > 0 
            ? Number(((totalOpened / totalRecipients) * 100).toFixed(2))
            : 0;
        stats.averageClickRate = totalRecipients > 0 
            ? Number(((totalClicked / totalRecipients) * 100).toFixed(2))
            : 0;
        stats.averageReplyRate = totalRecipients > 0 
            ? Number(((totalReplied / totalRecipients) * 100).toFixed(2))
            : 0;
        stats.averageBounceRate = totalRecipients > 0 
            ? Number(((totalBounced / totalRecipients) * 100).toFixed(2))
            : 0;
        stats.averageUnsubscribeRate = totalRecipients > 0 
            ? Number(((totalUnsubscribed / totalRecipients) * 100).toFixed(2))
            : 0;

        // Top campanhas por performance
        stats.topPerformingCampaigns = campaignMetrics
            .sort((a, b) => (b.deliveryRate + b.openRate + b.clickRate + b.replyRate) - (a.deliveryRate + a.openRate + a.clickRate + a.replyRate))
            .slice(0, 10);

        // Estatísticas diárias (últimos 30 dias)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const dailyStats = await this.context.campaignExecution.findMany({
            where: {
                executionDate: {
                    gte: thirtyDaysAgo
                },
                isActive: true
            },
            select: {
                executionDate: true,
                totalRecipients: true,
                sentCount: true,
                openedCount: true,
                clickedCount: true
            }
        });

        // Agrupar por dia
        const dailyStatsMap = new Map<string, any>();
        for (const stat of dailyStats) {
            const dateKey = stat.executionDate.toISOString().split('T')[0];
            if (!dailyStatsMap.has(dateKey)) {
                dailyStatsMap.set(dateKey, {
                    date: dateKey,
                    campaignsSent: 0,
                    totalRecipients: 0,
                    totalSent: 0,
                    totalOpened: 0,
                    totalClicked: 0
                });
            }
            const dayStat = dailyStatsMap.get(dateKey);
            dayStat.campaignsSent += 1;
            dayStat.totalRecipients += stat.totalRecipients;
            dayStat.totalSent += stat.sentCount;
            dayStat.totalOpened += stat.openedCount;
            dayStat.totalClicked += stat.clickedCount;
        }

        stats.dailyStats = Array.from(dailyStatsMap.values()).sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Estatísticas por hora (engajamento)
        const hourlyEngagement = new Map<number, any>();
        for (let hour = 0; hour < 24; hour++) {
            hourlyEngagement.set(hour, {
                hour,
                openCount: 0,
                clickCount: 0,
                replyCount: 0
            });
        }

        // TODO: Implementar análise de engajamento por hora baseada nos dados reais
        // Por enquanto, dados simulados
        stats.hourlyEngagement = Array.from(hourlyEngagement.values());

        return stats;
    }
}

