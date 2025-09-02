import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateNotificationRequest } from "./create-notification.request";
import { NotificationVM } from "src/application/ViewModels/notification/notification.vm";

@Injectable()
export class CreateNotificationService extends HandlerBase<CreateNotificationRequest, NotificationVM> {
    protected async executeCore(request: CreateNotificationRequest, data?: any): Promise<NotificationVM> {
        return await this.transaction<NotificationVM>(async (tx) => {
            // Verificar se a atividade existe
            const activity = await tx.activity.findUnique({
                where: { id: request.activityId }
            });

            if (!activity) {
                throw new Error("Atividade não encontrada");
            }

            // Verificar se o usuário existe
            const employee = await tx.employee.findUnique({
                where: { id: request.employeeId }
            });

            if (!employee) {
                throw new Error("Usuário não encontrado");
            }

            // Criar a notificação
            const notification = await tx.notification.create({
                data: {
                    type: request.type,
                    message: request.message,
                    activityId: request.activityId,
                    employeeId: request.employeeId,
                    sentAt: request.sentAt ? new Date(request.sentAt) : new Date(),
                    isRead: false,
                    isActive: true
                },
                include: {
                    activity: true,
                    employee: true
                }
            });

            return new NotificationVM(notification);
        });
    }
}
