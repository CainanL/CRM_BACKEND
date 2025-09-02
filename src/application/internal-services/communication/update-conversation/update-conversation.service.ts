import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateConversationRequest } from "./update-conversation.request";
import { ConversationVM } from "src/application/ViewModels/communication/conversation.viewmodel";

@Injectable()
export class UpdateConversationService extends HandlerBase<UpdateConversationRequest, ConversationVM> {
    protected async executeCore(request: UpdateConversationRequest, data?: any): Promise<ConversationVM> {
        return await this.transaction<ConversationVM>(async (tx) => {
            const conversation = await tx.conversation.update({
                where: { id: request.id },
                data: {
                    title: request.title,
                    description: request.description,
                    status: request.status,
                    entityId: request.entityId,
                    entityType: request.entityType,
                    assignedEmployeeId: request.assignedEmployeeId,
                    priority: request.priority,
                    tags: request.tags,
                    metadata: request.metadata
                },
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
                    }
                }
            });

            return new ConversationVM(conversation);
        });
    }
}
