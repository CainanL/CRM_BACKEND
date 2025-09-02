import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { MarkAsReadRequest } from "./mark-as-read.request";
import { NotificationVM } from "src/application/ViewModels/notification/notification.vm";

@Injectable()
export class MarkAsReadService extends HandlerBase<MarkAsReadRequest, NotificationVM> {
    protected async executeCore(request: MarkAsReadRequest, data?: any): Promise<NotificationVM> {
        return await this.transaction<NotificationVM>(async (tx) => {
            // Verificar se a notificação existe
            const existingNotification = await tx.notification.findUnique({
                where: { id: request.id }
            });

            if (!existingNotification) {
                throw new Error("Notificação não encontrada");
            }

            // Marcar como lida
            const notification = await tx.notification.update({
                where: { id: request.id },
                data: {
                    isRead: true,
                    readAt: new Date()
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
