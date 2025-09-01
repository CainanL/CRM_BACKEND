import { PipelineStage, Prisma } from ".prisma/tenant-client";
import { ClientType } from "src/repos/enums/client-type.enum";

type PipelineStageWithRelations = Prisma.PipelineStageGetPayload<{
    include: { 
        pipeline: { include: { group: true } },
        opportunities: { 
            where: { isActive: true },
            include: { client: true }
        }
    }
}>;

export class PipelineStageToListVm {
    public id: string;
    public name: string;
    public position: number;
    public defaultProbability: number;
    public color: string;
    public pipelineName: string;
    public groupName: string;
    public opportunitiesCount: number;
    public isActive: boolean;
    public createdAt: Date;

    constructor(stage: PipelineStageWithRelations) {
        this.id = stage.id;
        this.name = stage.name;
        this.position = stage.position;
        this.defaultProbability = stage.defaultProbability;
        this.color = stage.color;
        this.pipelineName = stage.pipeline.name;
        this.groupName = stage.pipeline.group.name;
        this.opportunitiesCount = stage.opportunities.length;
        this.isActive = stage.isActive;
        this.createdAt = stage.createdAt;
    }
}

export class PipelineStageVM {
    public id: string;
    public name: string;
    public position: number;
    public defaultProbability: number;
    public color: string;
    public pipeline: {
        id: string;
        name: string;
        description?: string;
        group: {
            id: string;
            name: string;
        };
    };
    public opportunities: {
        id: string;
        name: string;
        value?: number;
        probability?: number;
        status: string;
        clientName: string;
        expectedCloseDate?: Date;
        createdAt: Date;
    }[];
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(stage: PipelineStageWithRelations) {
        this.id = stage.id;
        this.name = stage.name;
        this.position = stage.position;
        this.defaultProbability = stage.defaultProbability;
        this.color = stage.color;
        
        this.pipeline = {
            id: stage.pipeline.id,
            name: stage.pipeline.name,
            description: stage.pipeline.description || undefined,
            group: {
                id: stage.pipeline.group.id,
                name: stage.pipeline.group.name
            }
        };

        this.opportunities = stage.opportunities.map(opportunity => ({
            id: opportunity.id,
            name: opportunity.name,
            value: opportunity.value ? Number(opportunity.value) : undefined,
            probability: opportunity.probability || undefined,
            status: opportunity.status,
            clientName: opportunity.client.clientType === ClientType.INDIVIDUAL
                ? opportunity.client.fullName || "" 
                : opportunity.client.tradeName || opportunity.client.companyName || "",
            expectedCloseDate: opportunity.expectedCloseDate || undefined,
            createdAt: opportunity.createdAt
        }));

        this.isActive = stage.isActive;
        this.createdAt = stage.createdAt;
        this.updatedAt = stage.updatedAt;
    }
}
