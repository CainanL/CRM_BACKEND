import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryActivitiesRequest } from "./query-activities.request";
import { ActivityToListVm } from "src/application/ViewModels/activity/activity.vm";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";

@Injectable()
export class QueryActivitiesService extends HandlerBase<QueryActivitiesRequest, ActivityToListVm[]> {
    protected async executeCore(request: QueryActivitiesRequest, data?: any): Promise<ActivityToListVm[]> {
        return await this.transaction<ActivityToListVm[]>(async (tx) => {
            // Construir filtros
            const where: any = {
                isActive: true
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

            if (request.responsibleEmployeeId) {
                where.responsibleEmployeeId = request.responsibleEmployeeId;
            }

            if (request.clientId) {
                where.clientId = request.clientId;
            }

            if (request.startDateFrom || request.startDateTo) {
                where.startDate = {};
                if (request.startDateFrom) {
                    where.startDate.gte = new Date(request.startDateFrom);
                }
                if (request.startDateTo) {
                    where.startDate.lte = new Date(request.startDateTo);
                }
            }

            if (request.dueDateFrom || request.dueDateTo) {
                where.dueDate = {};
                if (request.dueDateFrom) {
                    where.dueDate.gte = new Date(request.dueDateFrom);
                }
                if (request.dueDateTo) {
                    where.dueDate.lte = new Date(request.dueDateTo);
                }
            }

            if (request.isOverdue) {
                where.dueDate = {
                    lt: new Date()
                };
                where.status = {
                    not: ActivityStatus.COMPLETED
                };
            }

            // Aplicar filtro de texto se fornecido
            if (request.textSearch) {
                where.OR = [
                    { title: { contains: request.textSearch, mode: 'insensitive' } },
                    { description: { contains: request.textSearch, mode: 'insensitive' } }
                ];
            }

            // Buscar atividades
            const activities = await tx.activity.findMany({
                where,
                include: {
                    responsibleEmployee: true,
                    createdByEmployee: true,
                    client: true,
                    notifications: true
                },
                orderBy: { createdAt: 'desc' },
                skip: request.skip,
                take: request.take
            });

            return activities.map(activity => new ActivityToListVm(activity));
        });
    }
}
