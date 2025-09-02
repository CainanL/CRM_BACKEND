import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetCommunicationChannelsRequest } from "./get-communication-channels.request";
import { CommunicationChannelVM } from "src/application/ViewModels/communication/communication-channel.viewmodel";

@Injectable()
export class GetCommunicationChannelsService extends HandlerBase<GetCommunicationChannelsRequest, CommunicationChannelVM[]> {
    protected async executeCore(request: GetCommunicationChannelsRequest, data?: any): Promise<CommunicationChannelVM[]> {
        return await this.transaction<CommunicationChannelVM[]>(async (tx) => {
            const channels = await tx.communicationChannel.findMany({
                where: {
                    isActive: request.isActive,
                    channelType: request.channelType
                },
                include: {
                    assignToEmployee: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return channels.map(channel => new CommunicationChannelVM(channel));
        });
    }
}
