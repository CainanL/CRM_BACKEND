import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteBase } from "src/application/common/delete-base.request";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { DeleteInteractionRequest } from "./delete-interaction.request";

@Injectable()
export class DeleteInteractionService extends HandlerBase<DeleteInteractionRequest, void> {
    protected async executeCore(request: DeleteInteractionRequest, data?: any): Promise<void> {

        return await this.transaction<void>(async (tx) => {

            const existingInteraction = await tx.clientInteraction.findUnique({
                where: { id: request.id }
            });

            if (!existingInteraction) {
                throw new BaseException("Interação não encontrada", 404);
            }

            // Soft delete - apenas marca como inativo
            await tx.clientInteraction.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}

