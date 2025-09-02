import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateActivityRequest } from "./create-activity.request";
import { ActivityVM } from "src/application/ViewModels/activity/activity.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreateActivityService extends HandlerBase<CreateActivityRequest, ActivityVM> {
    protected async executeCore(request: CreateActivityRequest, data?: any): Promise<ActivityVM> {
        return await this.transaction<ActivityVM>(async (tx) => {
            // Verificar se o usuário responsável existe
            const responsibleEmployee = await tx.employee.findUnique({
                where: { id: request.responsibleEmployeeId }
            });

            if (!responsibleEmployee) {
                throw new BaseException("Funcionário responsável não encontrado", 404);
            }

            // Verificar se o cliente existe (se fornecido)
            if (request.clientId) {
                const client = await tx.client.findUnique({
                    where: { id: request.clientId }
                });

                if (!client) {
                    throw new BaseException("Cliente não encontrado", 404);
                }
            }

            const createdByEmployee = await tx.employee.findFirst({ where: { userId: this.user.id } });

            if (!createdByEmployee) {
                throw new BaseException("Funcionário que está criando não encontrado", 404);
            }


            // Criar a atividade
            const activity = await tx.activity.create({
                data: {
                    type: request.type,
                    title: request.title,
                    description: request.description,
                    startDate: request.startDate ? new Date(request.startDate) : null,
                    endDate: request.endDate ? new Date(request.endDate) : null,
                    dueDate: request.dueDate ? new Date(request.dueDate) : null,
                    priority: request.priority,
                    status: request.status,
                    responsibleEmployeeId: request.responsibleEmployeeId,
                    createdByEmployeeId: createdByEmployee.id, // ID do usuário que está criando (vem do contexto)
                    clientId: request.clientId,
                    reminderDate: request.reminderDate ? new Date(request.reminderDate) : null,
                    reminderSent: false,
                    externalEventId: request.externalEventId,
                    isActive: true
                },
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
