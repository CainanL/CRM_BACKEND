import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteCommunicationChannelRequest } from "./delete-communication-channel.request";

@Injectable()
export class DeleteCommunicationChannelService extends HandlerBase<DeleteCommunicationChannelRequest, void> {
    protected async executeCore(request: DeleteCommunicationChannelRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Verificar se há conversas ativas usando este canal
            const activeConversations = await tx.conversation.count({
                where: {
                    channelId: request.id,
                    status: { not: 'CLOSED' }
                }
            });

            if (activeConversations > 0) {
                throw new Error('Cannot delete channel with active conversations');
            }

            // Soft delete - marcar como inativo
            await tx.communicationChannel.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
