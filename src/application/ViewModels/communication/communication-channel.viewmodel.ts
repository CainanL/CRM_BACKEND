import { Prisma } from '.prisma/tenant-client';


export type CommunicationChannelWithValues = Prisma.CommunicationChannelGetPayload<{
    include: {
        assignToEmployee: true;
    }
}>

export class CommunicationChannelVM {
    id: string;
    channelType: string;
    name: string;
    description?: string;
    settings: any;
    isActive: boolean;
    autoAssign: boolean;
    assignToEmployeeId?: string;
    assignToEmployee?: {
        id: string;
        fullName: string;
        email: string;
    };
    aiEnabled: boolean;
    aiSettings?: any
    createdAt: Date;
    updatedAt: Date;

    constructor(channel: CommunicationChannelWithValues) {
        this.id = channel.id;
        this.channelType = channel.channelType;
        this.name = channel.name;
        this.description = channel.description!;
        this.settings = channel.settings;
        this.isActive = channel.isActive;
        this.autoAssign = channel.autoAssign;
        this.assignToEmployeeId = channel.assignToEmployeeId!;
        this.assignToEmployee = channel.assignToEmployee!;
        this.aiEnabled = channel.aiEnabled;
        this.aiSettings = channel.aiSettings!;
        this.createdAt = channel.createdAt;
        this.updatedAt = channel.updatedAt;
    }
}
