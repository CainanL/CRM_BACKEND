import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateMessageRequest } from "./update-message.request";
import { MessageVM } from "src/application/ViewModels/communication/message.viewmodel";

@Injectable()
export class UpdateMessageService extends HandlerBase<UpdateMessageRequest, MessageVM> {
    protected async executeCore(request: UpdateMessageRequest, data?: any): Promise<MessageVM> {
        return await this.transaction<MessageVM>(async (tx) => {
            const updateData: any = {};

            if (request.content !== undefined) updateData.content = request.content;
            if (request.contentType !== undefined) updateData.contentType = request.contentType;
            if (request.status !== undefined) updateData.status = request.status;
            if (request.employeeId !== undefined) updateData.employeeId = request.employeeId;
            if (request.entityId !== undefined) updateData.entityId = request.entityId;
            if (request.entityType !== undefined) updateData.entityType = request.entityType;
            if (request.attachments !== undefined) updateData.attachments = request.attachments;
            if (request.metadata !== undefined) updateData.metadata = request.metadata;
            if (request.sentAt !== undefined) updateData.sentAt = new Date(request.sentAt);
            if (request.deliveredAt !== undefined) updateData.deliveredAt = new Date(request.deliveredAt);
            if (request.readAt !== undefined) updateData.readAt = new Date(request.readAt);
            if (request.aiProcessed !== undefined) updateData.aiProcessed = request.aiProcessed;
            if (request.aiResponseType !== undefined) updateData.aiResponseType = request.aiResponseType;
            if (request.aiConfidence !== undefined) updateData.aiConfidence = request.aiConfidence;
            if (request.aiAnalysis !== undefined) updateData.aiAnalysis = request.aiAnalysis;

            const message = await tx.message.update({
                where: { id: request.id },
                data: updateData,
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
