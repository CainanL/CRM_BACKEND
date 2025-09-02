import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateCommunicationChannelRequest } from "./update-communication-channel.request";
import { CommunicationChannelVM } from "src/application/ViewModels/communication/communication-channel.viewmodel";

@Injectable()
export class UpdateCommunicationChannelService extends HandlerBase<UpdateCommunicationChannelRequest, CommunicationChannelVM> {
    protected async executeCore(request: UpdateCommunicationChannelRequest, data?: any): Promise<CommunicationChannelVM> {
        return await this.transaction<CommunicationChannelVM>(async (tx) => {
            const channel = await tx.communicationChannel.update({
                where: { id: request.id },
                data: {
                    channelType: request.channelType,
                    name: request.name,
                    description: request.description,
                    settings: request.settings,
                    isActive: request.isActive,
                    autoAssign: request.autoAssign,
                    assignToEmployeeId: request.assignToEmployeeId,
                    aiEnabled: request.aiEnabled,
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
