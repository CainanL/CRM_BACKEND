import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ActivityReportRequest, ReportPeriod } from "./activity-report.request";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { ActivityReportResultVM } from "src/application/ViewModels/activity/activity-report-result.vm";


@Injectable()
export class ActivityReportService extends HandlerBase<ActivityReportRequest, ActivityReportResultVM> {
    protected async executeCore(request: ActivityReportRequest, data?: any): Promise<ActivityReportResultVM> {
        return await this.transaction<ActivityReportResultVM>(async (tx) => {
            // Calcular datas baseado no período
            let startDate: Date;
            let endDate: Date;

            if (request.startDate && request.endDate) {
                startDate = new Date(request.startDate);
                endDate = new Date(request.endDate);
            } else {
                const now = new Date();
                switch (request.period || ReportPeriod.MONTH) {
                    case ReportPeriod.DAY:
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                        break;
                    case ReportPeriod.WEEK:
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
                        endDate = new Date(startDate);
                        endDate.setDate(startDate.getDate() + 6);
                        endDate.setHours(23, 59, 59);
                        break;
                    case ReportPeriod.MONTH:
                        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
                        break;
                    case ReportPeriod.YEAR:
                        startDate = new Date(now.getFullYear(), 0, 1);
                        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
                        break;
                }
            }

            // Construir filtros
            const where: any = {
                isActive: true,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };

            if (request.type) {
                where.type = request.type;
            }

            if (request.status) {
                where.status = request.status;
            }

            if (request.priority) {
                where.priority = request.priority;
            }

            // Buscar todas as atividades no período
            const activities = await tx.activity.findMany({
                where,
                include: {
                    responsibleEmployee: true,
                    createdByEmployee: true,
                    client: true
                }
            });

            // Calcular métricas
            const totalActivities = activities.length;
            const completedActivities = activities.filter(a => a.status === ActivityStatus.COMPLETED).length;
            const pendingActivities = activities.filter(a => a.status === ActivityStatus.PENDING).length;
            const overdueActivities = activities.filter(a =>
                a.dueDate && new Date() > a.dueDate && a.status !== ActivityStatus.COMPLETED
            ).length;
            const inProgressActivities = activities.filter(a => a.status === ActivityStatus.IN_PROGRESS).length;
            const cancelledActivities = activities.filter(a => a.status === ActivityStatus.CANCELLED).length;

            // Agrupar por tipo
            const activitiesByType: { [key: string]: number } = {};
            activities.forEach(activity => {
                activitiesByType[activity.type] = (activitiesByType[activity.type] || 0) + 1;
            });

            // Agrupar por prioridade
            const activitiesByPriority: { [key: string]: number } = {};
            activities.forEach(activity => {
                activitiesByPriority[activity.priority] = (activitiesByPriority[activity.priority] || 0) + 1;
            });

            // Agrupar por status
            const activitiesByStatus: { [key: string]: number } = {};
            activities.forEach(activity => {
                activitiesByStatus[activity.status] = (activitiesByStatus[activity.status] || 0) + 1;
            });

            // Calcular taxas
            const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
            const overdueRate = totalActivities > 0 ? (overdueActivities / totalActivities) * 100 : 0;

            // Calcular tempo médio de conclusão
            const completedWithTimes = activities.filter(a =>
                a.status === ActivityStatus.COMPLETED && a.startDate && a.endDate
            );
            const averageCompletionTime = completedWithTimes.length > 0
                ? completedWithTimes.reduce((sum, a) => {
                    const diff = a.endDate!.getTime() - a.startDate!.getTime();
                    return sum + (diff / (1000 * 60 * 60)); // converter para horas
                }, 0) / completedWithTimes.length
                : 0;

            // Follow-ups
            const followUps = activities.filter(a => a.type === ActivityType.FOLLOW_UP);
            const followUpsPending = followUps.filter(a => a.status === ActivityStatus.PENDING).length;
            const followUpsCompleted = followUps.filter(a => a.status === ActivityStatus.COMPLETED).length;

            return new ActivityReportResultVM(
                totalActivities,
                completedActivities,
                pendingActivities,
                overdueActivities,
                inProgressActivities,
                cancelledActivities,
                activitiesByType,
                activitiesByPriority,
                activitiesByStatus,
                Math.round(completionRate * 100) / 100,
                Math.round(overdueRate * 100) / 100,
                Math.round(averageCompletionTime * 100) / 100,
                followUpsPending,
                followUpsCompleted
            );
        });
    }
}
