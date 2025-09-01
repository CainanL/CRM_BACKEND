import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateOpportunityRequest } from "src/application/internal-services/pipeline/opportunity/create-opportunity/create-opportunity.request";
import { CreateOpportunityService } from "src/application/internal-services/pipeline/opportunity/create-opportunity/create-opportunity.service";
import { MoveOpportunityRequest } from "src/application/internal-services/pipeline/opportunity/move-opportunity/move-opportunity.request";
import { MoveOpportunityService } from "src/application/internal-services/pipeline/opportunity/move-opportunity/move-opportunity.service";
import { CloseOpportunityRequest } from "src/application/internal-services/pipeline/opportunity/close-opportunity/close-opportunity.request";
import { CloseOpportunityService } from "src/application/internal-services/pipeline/opportunity/close-opportunity/close-opportunity.service";
import { GetOpportunityByIdService } from "src/application/internal-services/pipeline/opportunity/get-opportunity-by-id/get-opportunity-by-id.service";
import { QueryOpportunitiesRequest } from "src/application/internal-services/pipeline/opportunity/query-opportunities/query-opportunities.request";
import { QueryOpportunitiesService } from "src/application/internal-services/pipeline/opportunity/query-opportunities/query-opportunities.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";
import { GetByIdBase } from "src/application/common/get-by-id-base";

@Controller("opportunity")
@ApiTenant()
export class OpportunityController {
    constructor(
        private readonly createOpportunityService: CreateOpportunityService,
        private readonly moveOpportunityService: MoveOpportunityService,
        private readonly closeOpportunityService: CloseOpportunityService,
        private readonly getOpportunityByIdService: GetOpportunityByIdService,
        private readonly queryOpportunitiesService: QueryOpportunitiesService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createOpportunity(@Body() body: CreateOpportunityRequest, @Request() req) {
        return await this.createOpportunityService.execute(body, req);
    }

    @Put("/move")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async moveOpportunity(@Body() body: MoveOpportunityRequest, @Request() req) {
        return await this.moveOpportunityService.execute(body, req);
    }

    @Put("/close")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async closeOpportunity(@Body() body: CloseOpportunityRequest, @Request() req) {
        return await this.closeOpportunityService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getOpportunityById(@Param() params: GetByIdBase, @Request() req) {
        return await this.getOpportunityByIdService.execute(params, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryOpportunities(@Query() query: QueryOpportunitiesRequest, @Request() req) {
        return await this.queryOpportunitiesService.execute(query, req);
    }
}
