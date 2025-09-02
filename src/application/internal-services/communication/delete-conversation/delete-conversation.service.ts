import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteConversationRequest } from "./delete-conversation.request";

@Injectable()
export class DeleteConversationService extends HandlerBase<DeleteConversationRequest, void> {
    protected async executeCore(request: DeleteConversationRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Verificar se há mensagens ativas na conversa
            const messageCount = await tx.message.count({
                where: {
                    conversationId: request.id,
                    isActive: true
                }
            });

            if (messageCount > 0) {
                // Soft delete - marcar conversa como inativa
                await tx.conversation.update({
                    where: { id: request.id },
                    data: { isActive: false }
                });
            } else {
                // Se não há mensagens, pode deletar completamente
                await tx.conversation.delete({
                    where: { id: request.id }
                });
            }
        });
    }
}
