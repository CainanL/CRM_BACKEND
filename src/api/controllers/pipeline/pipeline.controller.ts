import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreatePipelineRequest } from "src/application/internal-services/pipeline/pipeline/create-pipeline/create-pipeline.request";
import { CreatePipelineService } from "src/application/internal-services/pipeline/pipeline/create-pipeline/create-pipeline.service";
import { UpdatePipelineRequest } from "src/application/internal-services/pipeline/pipeline/update-pipeline/update-pipeline.request";
import { UpdatePipelineService } from "src/application/internal-services/pipeline/pipeline/update-pipeline/update-pipeline.service";
import { GetPipelineByIdService } from "src/application/internal-services/pipeline/pipeline/get-pipeline-by-id/get-pipeline-by-id.service";
import { GetPipelinesByGroupRequest } from "src/application/internal-services/pipeline/pipeline/get-pipelines-by-group/get-pipelines-by-group.request";
import { GetPipelinesByGroupService } from "src/application/internal-services/pipeline/pipeline/get-pipelines-by-group/get-pipelines-by-group.service";
import { DeletePipelineService } from "src/application/internal-services/pipeline/pipeline/delete-pipeline/delete-pipeline.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";
import { GetByIdBase } from "src/application/common/get-by-id-base";

@Controller("pipeline")
@ApiTenant()
export class PipelineController {
    constructor(
        private readonly createPipelineService: CreatePipelineService,
        private readonly updatePipelineService: UpdatePipelineService,
        private readonly getPipelineByIdService: GetPipelineByIdService,
        private readonly getPipelinesByGroupService: GetPipelinesByGroupService,
        private readonly deletePipelineService: DeletePipelineService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createPipeline(@Body() body: CreatePipelineRequest, @Request() req) {
        return await this.createPipelineService.execute(body, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updatePipeline(@Body() body: UpdatePipelineRequest, @Request() req) {
        return await this.updatePipelineService.execute(body, req);
    }

    @Get("/group")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getPipelinesByGroup(@Query() query: GetPipelinesByGroupRequest, @Request() req) {

        return await this.getPipelinesByGroupService.execute(query, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getPipelineById(@Param() params: GetByIdBase, @Request() req) {
        return await this.getPipelineByIdService.execute(params, req);
    }


    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deletePipeline(@Param() params: GetByIdBase, @Request() req) {
        return await this.deletePipelineService.execute(params, req);
    }
}
