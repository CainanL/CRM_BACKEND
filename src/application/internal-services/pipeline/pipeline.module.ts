import { Module } from "@nestjs/common";
import { PipelineGroupModule } from "./pipeline-group/pipeline-group.module";
import { PipelineModule as PipelineServiceModule } from "./pipeline/pipeline.module";
import { PipelineStageModule } from "./pipeline-stage/pipeline-stage.module";
import { OpportunityModule } from "./opportunity/opportunity.module";

@Module({
    imports: [
        PipelineGroupModule,
        PipelineServiceModule,
        PipelineStageModule,
        OpportunityModule
    ],
    exports: [
        PipelineGroupModule,
        PipelineServiceModule,
        PipelineStageModule,
        OpportunityModule
    ]
})
export class PipelineModule { }
