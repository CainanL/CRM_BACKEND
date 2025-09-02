import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteActivityRequest } from "./delete-activity.request";

@Injectable()
export class DeleteActivityService extends HandlerBase<DeleteActivityRequest, void> {
    protected async executeCore(request: DeleteActivityRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Verificar se a atividade existe
            const existingActivity = await tx.activity.findUnique({
                where: { id: request.id }
            });

            if (!existingActivity) {
                throw new Error("Atividade não encontrada");
            }

            // Soft delete - marcar como inativo
            await tx.activity.update({
                where: { id: request.id },
                data: {
                    isActive: false
                }
            });
        });
    }
}
