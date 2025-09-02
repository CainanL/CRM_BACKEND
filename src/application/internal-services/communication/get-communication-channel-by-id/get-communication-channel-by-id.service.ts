import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetCommunicationChannelByIdRequest } from "./get-communication-channel-by-id.request";
import { CommunicationChannelVM } from "src/application/ViewModels/communication/communication-channel.viewmodel";

@Injectable()
export class GetCommunicationChannelByIdService extends HandlerBase<GetCommunicationChannelByIdRequest, CommunicationChannelVM> {
    protected async executeCore(request: GetCommunicationChannelByIdRequest, data?: any): Promise<CommunicationChannelVM> {
        return await this.transaction<CommunicationChannelVM>(async (tx) => {
            const channel = await tx.communicationChannel.findUnique({
                where: { id: request.id },
                include: {
                    assignToEmployee: true
                }
            });

            if (!channel) {
                throw new Error('Communication channel not found');
            }

            return new CommunicationChannelVM(channel);
        });
    }
}
