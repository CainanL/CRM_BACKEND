import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetConversationByIdRequest } from "./get-conversation-by-id.request";
import { ConversationVM } from "src/application/ViewModels/communication/conversation.viewmodel";

@Injectable()
export class GetConversationByIdService extends HandlerBase<GetConversationByIdRequest, ConversationVM> {
    protected async executeCore(request: GetConversationByIdRequest, data?: any): Promise<ConversationVM> {
        return await this.transaction<ConversationVM>(async (tx) => {
            const conversation = await tx.conversation.findUnique({
                where: { id: request.id },
                include: {
                    channel: {
                        select: {
                            id: true,
                            name: true,
                            channelType: true
                        }
                    },
                    assignedEmployee: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true
                        }
                    },
                    _count: {
                        select: {
                            messages: true
                        }
                    }
                }
            });

            if (!conversation) {
                throw new Error('Conversation not found');
            }

            const conversationVM = new ConversationVM(conversation);
            conversationVM.messageCount = conversation._count.messages;

            return conversationVM;
        });
    }
}
