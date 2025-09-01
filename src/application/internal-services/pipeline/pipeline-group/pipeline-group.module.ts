import { Module } from "@nestjs/common";
import { CreatePipelineGroupService } from "./create-pipeline-group/create-pipeline-group.service";
import { UpdatePipelineGroupService } from "./update-pipeline-group/update-pipeline-group.service";
import { GetPipelineGroupByIdService } from "./get-pipeline-group-by-id/get-pipeline-group-by-id.service";
import { QueryPipelineGroupsService } from "./query-pipeline-groups/query-pipeline-groups.service";
import { DeletePipelineGroupService } from "./delete-pipeline-group/delete-pipeline-group.service";

@Module({
    providers: [
        CreatePipelineGroupService,
        UpdatePipelineGroupService,
        GetPipelineGroupByIdService,
        QueryPipelineGroupsService,
        DeletePipelineGroupService
    ],
    exports: [
        CreatePipelineGroupService,
        UpdatePipelineGroupService,
        GetPipelineGroupByIdService,
        QueryPipelineGroupsService,
        DeletePipelineGroupService
    ]
})
export class PipelineGroupModule { }
