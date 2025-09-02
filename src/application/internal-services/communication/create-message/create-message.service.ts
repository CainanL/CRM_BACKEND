import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateMessageRequest } from "./create-message.request";
import { MessageVM } from "src/application/ViewModels/communication/message.viewmodel";
import { ContentType } from "src/repos/enums/content-type.enum";
import { MessageStatus } from "src/repos/enums/message-status.enum";

@Injectable()
export class CreateMessageService extends HandlerBase<CreateMessageRequest, MessageVM> {
    protected async executeCore(request: CreateMessageRequest, data?: any): Promise<MessageVM> {
        return await this.transaction<MessageVM>(async (tx) => {
            const message = await tx.message.create({
                data: {
                    content: request.content,
                    contentType: request.contentType ?? ContentType.TEXT,
                    channelId: request.channelId,
                    conversationId: request.conversationId,
                    direction: request.direction,
                    status: MessageStatus.PENDING,
                    senderContact: request.senderContact,
                    senderContactType: request.senderContactType,
                    recipientContact: request.recipientContact,
                    recipientContactType: request.recipientContactType,
                    employeeId: request.employeeId,
                    entityId: request.entityId,
                    entityType: request.entityType,
                    externalId: request.externalId,
                    attachments: request.attachments,
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
                    conversation: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    employee: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true
                        }
                    }
                }
            });

            return new MessageVM(message);
        });
    }
}
