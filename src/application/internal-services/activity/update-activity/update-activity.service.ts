import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateActivityRequest } from "./update-activity.request";
import { ActivityVM } from "src/application/ViewModels/activity/activity.vm";

@Injectable()
export class UpdateActivityService extends HandlerBase<UpdateActivityRequest, ActivityVM> {
    protected async executeCore(request: UpdateActivityRequest, data?: any): Promise<ActivityVM> {
        return await this.transaction<ActivityVM>(async (tx) => {
            // Verificar se a atividade existe
            const existingActivity = await tx.activity.findUnique({
                where: { id: request.id }
            });

            if (!existingActivity) {
                throw new Error("Atividade não encontrada");
            }

            // Verificar se o usuário responsável existe (se fornecido)
            if (request.responsibleEmployeeId) {
                const responsibleUser = await tx.employee.findUnique({
                    where: { id: request.responsibleEmployeeId }
                });

                if (!responsibleUser) {
                    throw new Error("Usuário responsável não encontrado");
                }
            }

            // Verificar se o cliente existe (se fornecido)
            if (request.clientId) {
                const client = await tx.client.findUnique({
                    where: { id: request.clientId }
                });

                if (!client) {
                    throw new Error("Cliente não encontrado");
                }
            }

            // Preparar dados para atualização
            const updateData: any = {};

            if (request.type !== undefined) updateData.type = request.type;
            if (request.title !== undefined) updateData.title = request.title;
            if (request.description !== undefined) updateData.description = request.description;
            if (request.startDate !== undefined) updateData.startDate = request.startDate ? new Date(request.startDate) : null;
            if (request.endDate !== undefined) updateData.endDate = request.endDate ? new Date(request.endDate) : null;
            if (request.dueDate !== undefined) updateData.dueDate = request.dueDate ? new Date(request.dueDate) : null;
            if (request.priority !== undefined) updateData.priority = request.priority;
            if (request.status !== undefined) updateData.status = request.status;
            if (request.responsibleEmployeeId !== undefined) updateData.responsibleUserId = request.responsibleEmployeeId;
            if (request.clientId !== undefined) updateData.clientId = request.clientId;
            if (request.reminderDate !== undefined) updateData.reminderDate = request.reminderDate ? new Date(request.reminderDate) : null;
            if (request.externalEventId !== undefined) updateData.externalEventId = request.externalEventId;

            // Atualizar a atividade
            const activity = await tx.activity.update({
                where: { id: request.id },
                data: updateData,
                include: {
                    responsibleEmployee: true,
                    createdByEmployee: true,
                    client: true,
                    notifications: true
                }
            });

            return new ActivityVM(activity);
        });
    }
}
