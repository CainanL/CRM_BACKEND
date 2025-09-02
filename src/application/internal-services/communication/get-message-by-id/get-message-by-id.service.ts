import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetMessageByIdRequest } from "./get-message-by-id.request";
import { MessageVM } from "src/application/ViewModels/communication/message.viewmodel";

@Injectable()
export class GetMessageByIdService extends HandlerBase<GetMessageByIdRequest, MessageVM> {
    protected async executeCore(request: GetMessageByIdRequest, data?: any): Promise<MessageVM> {
        return await this.transaction<MessageVM>(async (tx) => {
            const message = await tx.message.findUnique({
                where: { id: request.id },
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

            if (!message) {
                throw new Error('Message not found');
            }

            return new MessageVM(message);
        });
    }
}
