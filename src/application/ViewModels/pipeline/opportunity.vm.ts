import { Opportunity, Prisma } from ".prisma/tenant-client";
import { EmployeeVM } from "../employee/employee.vm";
import { ClientType } from "src/repos/enums/client-type.enum";

type OpportunityWithRelations = Prisma.OpportunityGetPayload<{
    include: { 
        client: { include: { address: true } },
        pipeline: { include: { group: true } },
        stage: true,
        assignedEmployee: { include: { address: true } }
    }
}>;

export class OpportunityToListVm {
    public id: string;
    public name: string;
    public value?: number;
    public probability?: number;
    public status: string;
    public clientName: string;
    public clientType: string;
    public pipelineName: string;
    public groupName: string;
    public stageName: string;
    public stageColor: string;
    public assignedEmployeeName?: string;
    public expectedCloseDate?: Date;
    public createdAt: Date;

    constructor(opportunity: OpportunityWithRelations) {
        this.id = opportunity.id;
        this.name = opportunity.name;
        this.value = opportunity.value ? Number(opportunity.value) : undefined;
        this.probability = opportunity.probability || undefined;
        this.status = opportunity.status;
        this.clientName = opportunity.client.clientType === ClientType.INDIVIDUAL
            ? opportunity.client.fullName || "" 
            : opportunity.client.tradeName || opportunity.client.companyName || "";
        this.clientType = opportunity.client.clientType;
        this.pipelineName = opportunity.pipeline.name;
        this.groupName = opportunity.pipeline.group.name;
        this.stageName = opportunity.stage.name;
        this.stageColor = opportunity.stage.color;
        this.assignedEmployeeName = opportunity.assignedEmployee?.fullName || undefined;
        this.expectedCloseDate = opportunity.expectedCloseDate || undefined;
        this.createdAt = opportunity.createdAt;
    }
}

export class OpportunityVM {
    public id: string;
    public name: string;
    public description?: string;
    public value?: number;
    public probability?: number;
    public expectedCloseDate?: Date;
    public status: string;
    public closedAt?: Date;
    public closedReason?: string;
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
    public pipeline: {
        id: string;
        name: string;
        description?: string;
        group: {
            id: string;
            name: string;
            description?: string;
        };
    };
    public stage: {
        id: string;
        name: string;
        position: number;
        defaultProbability: number;
        color: string;
    };
    public assignedEmployee?: EmployeeVM;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(opportunity: OpportunityWithRelations) {
        this.id = opportunity.id;
        this.name = opportunity.name;
        this.description = opportunity.description || undefined;
        this.value = opportunity.value ? Number(opportunity.value) : undefined;
        this.probability = opportunity.probability || undefined;
        this.expectedCloseDate = opportunity.expectedCloseDate || undefined;
        this.status = opportunity.status;
        this.closedAt = opportunity.closedAt || undefined;
        this.closedReason = opportunity.closedReason || undefined;
        
        this.client = {
            id: opportunity.client.id,
            clientType: opportunity.client.clientType,
            fullName: opportunity.client.fullName || undefined,
            companyName: opportunity.client.companyName || undefined,
            tradeName: opportunity.client.tradeName || undefined,
            email: opportunity.client.email,
            phone: opportunity.client.phone || undefined,
            status: opportunity.client.status,
            internalCode: opportunity.client.internalCode,
            address: opportunity.client.address ? {
                street: opportunity.client.address.street,
                number: opportunity.client.address.number,
                complement: opportunity.client.address.complement || undefined,
                district: opportunity.client.address.district,
                city: opportunity.client.address.city,
                state: opportunity.client.address.state,
                cep: opportunity.client.address.cep
            } : undefined
        };

        this.pipeline = {
            id: opportunity.pipeline.id,
            name: opportunity.pipeline.name,
            description: opportunity.pipeline.description || undefined,
            group: {
                id: opportunity.pipeline.group.id,
                name: opportunity.pipeline.group.name,
                description: opportunity.pipeline.group.description || undefined
            }
        };

        this.stage = {
            id: opportunity.stage.id,
            name: opportunity.stage.name,
            position: opportunity.stage.position,
            defaultProbability: opportunity.stage.defaultProbability,
            color: opportunity.stage.color
        };

        this.assignedEmployee = opportunity.assignedEmployee ? new EmployeeVM(opportunity.assignedEmployee) : undefined;
        this.isActive = opportunity.isActive;
        this.createdAt = opportunity.createdAt;
        this.updatedAt = opportunity.updatedAt;
    }
}
