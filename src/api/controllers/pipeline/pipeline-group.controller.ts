import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreatePipelineGroupRequest } from "src/application/internal-services/pipeline/pipeline-group/create-pipeline-group/create-pipeline-group.request";
import { CreatePipelineGroupService } from "src/application/internal-services/pipeline/pipeline-group/create-pipeline-group/create-pipeline-group.service";
import { UpdatePipelineGroupRequest } from "src/application/internal-services/pipeline/pipeline-group/update-pipeline-group/update-pipeline-group.request";
import { UpdatePipelineGroupService } from "src/application/internal-services/pipeline/pipeline-group/update-pipeline-group/update-pipeline-group.service";
import { GetPipelineGroupByIdService } from "src/application/internal-services/pipeline/pipeline-group/get-pipeline-group-by-id/get-pipeline-group-by-id.service";
import { QueryPipelineGroupsRequest } from "src/application/internal-services/pipeline/pipeline-group/query-pipeline-groups/query-pipeline-groups.request";
import { QueryPipelineGroupsService } from "src/application/internal-services/pipeline/pipeline-group/query-pipeline-groups/query-pipeline-groups.service";
import { DeletePipelineGroupService } from "src/application/internal-services/pipeline/pipeline-group/delete-pipeline-group/delete-pipeline-group.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";
import { GetByIdBase } from "src/application/common/get-by-id-base";

@Controller("pipeline-group")
@ApiTenant()
export class PipelineGroupController {
    constructor(
        private readonly createPipelineGroupService: CreatePipelineGroupService,
        private readonly updatePipelineGroupService: UpdatePipelineGroupService,
        private readonly getPipelineGroupByIdService: GetPipelineGroupByIdService,
        private readonly queryPipelineGroupsService: QueryPipelineGroupsService,
        private readonly deletePipelineGroupService: DeletePipelineGroupService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createPipelineGroup(@Body() body: CreatePipelineGroupRequest, @Request() req) {
        return await this.createPipelineGroupService.execute(body, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updatePipelineGroup(@Body() body: UpdatePipelineGroupRequest, @Request() req) {
        return await this.updatePipelineGroupService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getPipelineGroupById(@Param() params: GetByIdBase, @Request() req) {
        return await this.getPipelineGroupByIdService.execute(params, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryPipelineGroups(@Query() query: QueryPipelineGroupsRequest, @Request() req) {
        return await this.queryPipelineGroupsService.execute(query, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deletePipelineGroup(@Param() params: GetByIdBase, @Request() req) {
        return await this.deletePipelineGroupService.execute(params, req);
    }
}
