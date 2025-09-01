import { PipelineGroup, Prisma } from ".prisma/tenant-client";

type PipelineGroupWithRelations = Prisma.PipelineGroupGetPayload<{
    include: { 
        pipelines: { 
            include: { 
                stages: true,
                opportunities: { where: { isActive: true } }
            } 
        } 
    }
}>;

export class PipelineGroupToListVm {
    public id: string;
    public name: string;
    public description?: string;
    public pipelinesCount: number;
    public totalOpportunities: number;
    public createdAt: Date;

    constructor(group: PipelineGroupWithRelations) {
        this.id = group.id;
        this.name = group.name;
        this.description = group.description || undefined;
        this.pipelinesCount = group.pipelines.length;
        this.totalOpportunities = group.pipelines.reduce((total, pipeline) => 
            total + pipeline.opportunities.length, 0);
        this.createdAt = group.createdAt;
    }
}

export class PipelineGroupVM {
    public id: string;
    public name: string;
    public description?: string;
    public pipelines: {
        id: string;
        name: string;
        description?: string;
        stagesCount: number;
        opportunitiesCount: number;
        createdBy: string;
        createdAt: Date;
    }[];
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(group: PipelineGroupWithRelations) {
        this.id = group.id;
        this.name = group.name;
        this.description = group.description || undefined;
        this.pipelines = group.pipelines.map(pipeline => ({
            id: pipeline.id,
            name: pipeline.name,
            description: pipeline.description || undefined,
            stagesCount: pipeline.stages.length,
            opportunitiesCount: pipeline.opportunities.length,
            createdBy: pipeline.createdBy,
            createdAt: pipeline.createdAt
        }));
        this.isActive = group.isActive;
        this.createdAt = group.createdAt;
        this.updatedAt = group.updatedAt;
    }
}
