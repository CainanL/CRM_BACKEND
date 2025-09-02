import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteMessageRequest } from "./delete-message.request";

@Injectable()
export class DeleteMessageService extends HandlerBase<DeleteMessageRequest, void> {
    protected async executeCore(request: DeleteMessageRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Soft delete - marcar mensagem como inativa
            await tx.message.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
