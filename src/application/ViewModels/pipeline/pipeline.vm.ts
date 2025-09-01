import { Pipeline, Prisma } from ".prisma/tenant-client";
import { ClientType } from "src/repos/enums/client-type.enum";

type PipelineWithRelations = Prisma.PipelineGetPayload<{
    include: { 
        group: true,
        stages: { orderBy: { position: 'asc' } },
        opportunities: { 
            where: { isActive: true },
            include: {
                client: true,
                stage: true,
                assignedEmployee: true
            }
        }
    }
}>;

export class PipelineToListVm {
    public id: string;
    public name: string;
    public description?: string;
    public groupName: string;
    public stagesCount: number;
    public opportunitiesCount: number;
    public createdBy: string;
    public createdAt: Date;

    constructor(pipeline: PipelineWithRelations) {
        this.id = pipeline.id;
        this.name = pipeline.name;
        this.description = pipeline.description || undefined;
        this.groupName = pipeline.group.name;
        this.stagesCount = pipeline.stages.length;
        this.opportunitiesCount = pipeline.opportunities.length;
        this.createdBy = pipeline.createdBy;
        this.createdAt = pipeline.createdAt;
    }
}

export class PipelineVM {
    public id: string;
    public name: string;
    public description?: string;
    public group: {
        id: string;
        name: string;
        description?: string;
    };
    public stages: {
        id: string;
        name: string;
        position: number;
        defaultProbability: number;
        color: string;
        opportunitiesCount: number;
        isActive: boolean;
    }[];
    public opportunities: {
        id: string;
        name: string;
        value?: number;
        probability?: number;
        status: string;
        clientName: string;
        assignedEmployeeName?: string;
        expectedCloseDate?: Date;
        createdAt: Date;
    }[];
    public createdBy: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(pipeline: PipelineWithRelations) {
        this.id = pipeline.id;
        this.name = pipeline.name;
        this.description = pipeline.description || undefined;
        
        this.group = {
            id: pipeline.group.id,
            name: pipeline.group.name,
            description: pipeline.group.description || undefined
        };

        this.stages = pipeline.stages.map(stage => ({
            id: stage.id,
            name: stage.name,
            position: stage.position,
            defaultProbability: stage.defaultProbability,
            color: stage.color,
            opportunitiesCount: pipeline.opportunities.filter(opp => opp.stageId === stage.id).length,
            isActive: stage.isActive
        }));

        this.opportunities = pipeline.opportunities.map(opportunity => ({
            id: opportunity.id,
            name: opportunity.name,
            value: opportunity.value ? Number(opportunity.value) : undefined,
            probability: opportunity.probability || undefined,
            status: opportunity.status,
            clientName: opportunity.client.clientType === ClientType.INDIVIDUAL 
                ? opportunity.client.fullName || "" 
                : opportunity.client.tradeName || opportunity.client.companyName || "",
            assignedEmployeeName: opportunity.assignedEmployee?.fullName || undefined,
            expectedCloseDate: opportunity.expectedCloseDate || undefined,
            createdAt: opportunity.createdAt
        }));

        this.createdBy = pipeline.createdBy;
        this.isActive = pipeline.isActive;
        this.createdAt = pipeline.createdAt;
        this.updatedAt = pipeline.updatedAt;
    }
}
