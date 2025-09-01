import { Module } from "@nestjs/common";
import { CreatePipelineStageService } from "./create-pipeline-stage/create-pipeline-stage.service";
import { UpdatePipelineStageService } from "./update-pipeline-stage/update-pipeline-stage.service";
import { GetPipelineStageByIdService } from "./get-pipeline-stage-by-id/get-pipeline-stage-by-id.service";
import { GetStagesByPipelineService } from "./get-stages-by-pipeline/get-stages-by-pipeline.service";
import { ReorderPipelineStagesService } from "./reorder-pipeline-stages/reorder-pipeline-stages.service";
import { DeletePipelineStageService } from "./delete-pipeline-stage/delete-pipeline-stage.service";

@Module({
    providers: [
        CreatePipelineStageService,
        UpdatePipelineStageService,
        GetPipelineStageByIdService,
        GetStagesByPipelineService,
        ReorderPipelineStagesService,
        DeletePipelineStageService
    ],
    exports: [
        CreatePipelineStageService,
        UpdatePipelineStageService,
        GetPipelineStageByIdService,
        GetStagesByPipelineService,
        ReorderPipelineStagesService,
        DeletePipelineStageService
    ]
})
export class PipelineStageModule { }
