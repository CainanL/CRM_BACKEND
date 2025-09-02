import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CompleteActivityRequest } from "./complete-activity.request";
import { ActivityVM } from "src/application/ViewModels/activity/activity.vm";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";

@Injectable()
export class CompleteActivityService extends HandlerBase<CompleteActivityRequest, ActivityVM> {
    protected async executeCore(request: CompleteActivityRequest, data?: any): Promise<ActivityVM> {
        return await this.transaction<ActivityVM>(async (tx) => {
            // Verificar se a atividade existe
            const existingActivity = await tx.activity.findUnique({
                where: { id: request.id }
            });

            if (!existingActivity) {
                throw new Error("Atividade não encontrada");
            }

            // Atualizar status para concluída
            const activity = await tx.activity.update({
                where: { id: request.id },
                data: {
                    status: ActivityStatus.COMPLETED,
                    endDate: new Date() // Definir data de término como agora
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
