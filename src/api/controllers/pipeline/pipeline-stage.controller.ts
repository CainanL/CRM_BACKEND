import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreatePipelineStageRequest } from "src/application/internal-services/pipeline/pipeline-stage/create-pipeline-stage/create-pipeline-stage.request";
import { CreatePipelineStageService } from "src/application/internal-services/pipeline/pipeline-stage/create-pipeline-stage/create-pipeline-stage.service";
import { UpdatePipelineStageRequest } from "src/application/internal-services/pipeline/pipeline-stage/update-pipeline-stage/update-pipeline-stage.request";
import { UpdatePipelineStageService } from "src/application/internal-services/pipeline/pipeline-stage/update-pipeline-stage/update-pipeline-stage.service";
import { GetPipelineStageByIdService } from "src/application/internal-services/pipeline/pipeline-stage/get-pipeline-stage-by-id/get-pipeline-stage-by-id.service";
import { GetStagesByPipelineRequest } from "src/application/internal-services/pipeline/pipeline-stage/get-stages-by-pipeline/get-stages-by-pipeline.request";
import { GetStagesByPipelineService } from "src/application/internal-services/pipeline/pipeline-stage/get-stages-by-pipeline/get-stages-by-pipeline.service";
import { ReorderPipelineStagesRequest } from "src/application/internal-services/pipeline/pipeline-stage/reorder-pipeline-stages/reorder-pipeline-stages.request";
import { ReorderPipelineStagesService } from "src/application/internal-services/pipeline/pipeline-stage/reorder-pipeline-stages/reorder-pipeline-stages.service";
import { DeletePipelineStageService } from "src/application/internal-services/pipeline/pipeline-stage/delete-pipeline-stage/delete-pipeline-stage.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { DeletePipelineStageRequest } from "src/application/internal-services/pipeline/pipeline-stage/delete-pipeline-stage/delete-pipilene-stage.request";

@Controller("pipeline-stage")
@ApiTenant()
export class PipelineStageController {
    constructor(
        private readonly createPipelineStageService: CreatePipelineStageService,
        private readonly updatePipelineStageService: UpdatePipelineStageService,
        private readonly getPipelineStageByIdService: GetPipelineStageByIdService,
        private readonly getStagesByPipelineService: GetStagesByPipelineService,
        private readonly reorderPipelineStagesService: ReorderPipelineStagesService,
        private readonly deletePipelineStageService: DeletePipelineStageService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createPipelineStage(@Body() body: CreatePipelineStageRequest, @Request() req) {
        return await this.createPipelineStageService.execute(body, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updatePipelineStage(@Body() body: UpdatePipelineStageRequest, @Request() req) {
        return await this.updatePipelineStageService.execute(body, req);
    }

    
    @Get("/pipeline")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getStagesByPipeline( @Query() query: GetStagesByPipelineRequest, @Request() req) {
        return await this.getStagesByPipelineService.execute(query, req);
    }
    
    @Put("/reorder")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async reorderPipelineStages(@Body() body: ReorderPipelineStagesRequest, @Request() req) {
        return await this.reorderPipelineStagesService.execute(body, req);
    }
    
    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getPipelineStageById(@Param() params: GetByIdBase, @Request() req) {
        return await this.getPipelineStageByIdService.execute(params, req);
    }
    
    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deletePipelineStage(@Param() params: DeletePipelineStageRequest, @Request() req) {
        return await this.deletePipelineStageService.execute(params, req);
    }
}
