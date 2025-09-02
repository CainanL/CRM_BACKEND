import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateConversationRequest } from "./create-conversation.request";
import { ConversationVM } from "src/application/ViewModels/communication/conversation.viewmodel";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";
import { Priority } from "src/repos/enums/priority.enum";

@Injectable()
export class CreateConversationService extends HandlerBase<CreateConversationRequest, ConversationVM> {
    protected async executeCore(request: CreateConversationRequest, data?: any): Promise<ConversationVM> {
        return await this.transaction<ConversationVM>(async (tx) => {
            const conversation = await tx.conversation.create({
                data: {
                    title: request.title,
                    description: request.description,
                    channelId: request.channelId,
                    status: request.status ?? ConversationStatus.OPEN,
                    entityId: request.entityId,
                    entityType: request.entityType,
                    assignedEmployeeId: request.assignedEmployeeId,
                    priority: request.priority ?? Priority.MEDIUM,
                    tags: request.tags ?? [],
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
