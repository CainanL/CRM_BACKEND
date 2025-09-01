import { Module } from "@nestjs/common";
import { CreatePipelineService } from "./create-pipeline/create-pipeline.service";
import { UpdatePipelineService } from "./update-pipeline/update-pipeline.service";
import { GetPipelineByIdService } from "./get-pipeline-by-id/get-pipeline-by-id.service";
import { GetPipelinesByGroupService } from "./get-pipelines-by-group/get-pipelines-by-group.service";
import { DeletePipelineService } from "./delete-pipeline/delete-pipeline.service";

@Module({
    providers: [
        CreatePipelineService,
        UpdatePipelineService,
        GetPipelineByIdService,
        GetPipelinesByGroupService,
        DeletePipelineService
    ],
    exports: [
        CreatePipelineService,
        UpdatePipelineService,
        GetPipelineByIdService,
        GetPipelinesByGroupService,
        DeletePipelineService
    ]
})
export class PipelineModule { }
