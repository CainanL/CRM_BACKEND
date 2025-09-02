import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateCommunicationChannelRequest } from "./create-communication-channel.request";
import { CommunicationChannelVM } from "src/application/ViewModels/communication/communication-channel.viewmodel";

@Injectable()
export class CreateCommunicationChannelService extends HandlerBase<CreateCommunicationChannelRequest, CommunicationChannelVM> {
    protected async executeCore(request: CreateCommunicationChannelRequest, data?: any): Promise<CommunicationChannelVM> {
        return await this.transaction<CommunicationChannelVM>(async (tx) => {
            const channel = await tx.communicationChannel.create({
                data: {
                    channelType: request.channelType,
                    name: request.name,
                    description: request.description,
                    settings: request.settings,
                    isActive: request.isActive ?? true,
                    autoAssign: request.autoAssign ?? false,
                    assignToEmployeeId: request.assignToEmployeeId,
                    aiEnabled: request.aiEnabled ?? false,
                    aiSettings: request.aiSettings
                },
                include: {
                    assignToEmployee: true
                }
            });

            return new CommunicationChannelVM(channel);
        });
    }
}
