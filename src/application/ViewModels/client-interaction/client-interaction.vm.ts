import { ClientInteraction, Prisma } from ".prisma/tenant-client";
import { EmployeeVM } from "../employee/employee.vm";

type ClientInteractionWithRelations = Prisma.ClientInteractionGetPayload<{
    include: { 
        client: { include: { address: true } },
        employee: {include: {address: true}} 
    }
}>;

export class ClientInteractionToListVm {
    public id: string;
    public clientId: string;
    public clientName: string;
    public clientType: string;
    public clientEmail: string;
    public interactionType: string;
    public interactionDate: Date;
    public status: string;
    public result: string;
    public tags: string[];
    public employeeName?: string;
    public employeeId?: string;
    public priority?: string;
    public followUpDate?: Date;
    public duration?: number;
    public cost?: number;
    public createdAt: Date;

    constructor(interaction: ClientInteractionWithRelations) {
        this.id = interaction.id;
        this.clientId = interaction.clientId;
        this.clientName = interaction.client.clientType === "INDIVIDUAL" 
            ? interaction.client.fullName || "" 
            : interaction.client.tradeName || interaction.client.companyName || "";
        this.clientType = interaction.client.clientType;
        this.clientEmail = interaction.client.email;
        this.interactionType = interaction.interactionType;
        this.interactionDate = interaction.interactionDate;
        this.status = interaction.status;
        this.result = interaction.result;
        this.tags = interaction.tags;
        this.employeeName = interaction.employee?.fullName || undefined;
        this.employeeId = interaction.employeeId || undefined;
        this.priority = interaction.priority || undefined;
        this.followUpDate = interaction.followUpDate || undefined;
        this.duration = interaction.duration || undefined;
        this.cost = interaction.cost ? Number(interaction.cost) : undefined;
        this.createdAt = interaction.createdAt;
    }
}

export class ClientInteractionVM {
    public id: string;
    public clientId: string;
    public client: {
        id: string;
        clientType: string;
        fullName?: string;
        companyName?: string;
        tradeName?: string;
        email: string;
        phone?: string;
        status: string;
        internalCode: string;
        address?: {
            street: string;
            number: string;
            complement?: string;
            district: string;
            city: string;
            state: string;
            cep: string;
        };
    };
    public employee?: EmployeeVM;
    public interactionType: string;
    public interactionDate: Date;
    public description: string;
    public status: string;
    public result: string;
    public tags: string[];
    public duration?: number;
    public followUpDate?: Date;
    public priority?: string;
    public cost?: number;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(interaction: ClientInteractionWithRelations) {
        this.id = interaction.id;
        this.clientId = interaction.clientId;
        
        this.client = {
            id: interaction.client.id,
            clientType: interaction.client.clientType,
            fullName: interaction.client.fullName || undefined,
            companyName: interaction.client.companyName || undefined,
            tradeName: interaction.client.tradeName || undefined,
            email: interaction.client.email,
            phone: interaction.client.phone || undefined,
            status: interaction.client.status,
            internalCode: interaction.client.internalCode,
            address: interaction.client.address ? {
                street: interaction.client.address.street,
                number: interaction.client.address.number,
                complement: interaction.client.address.complement || undefined,
                district: interaction.client.address.district,
                city: interaction.client.address.city,
                state: interaction.client.address.state,
                cep: interaction.client.address.cep
            } : undefined
        };

        this.employee = interaction?.employee! ? new EmployeeVM(interaction.employee): null!;
        this.interactionType = interaction.interactionType;
        this.interactionDate = interaction.interactionDate;
        this.description = interaction.description;
        this.status = interaction.status;
        this.result = interaction.result;
        this.tags = interaction.tags;
        this.duration = interaction.duration || undefined;
        this.followUpDate = interaction.followUpDate || undefined;
        this.priority = interaction.priority || undefined;
        this.cost = interaction.cost ? Number(interaction.cost) : undefined;
        this.isActive = interaction.isActive;
        this.createdAt = interaction.createdAt;
        this.updatedAt = interaction.updatedAt;
    }
}

