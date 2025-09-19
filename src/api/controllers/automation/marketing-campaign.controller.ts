import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateMarketingCampaignRequest } from "src/application/internal-services/automation/create-marketing-campaign/create-marketing-campaign.request";
import { CreateMarketingCampaignService } from "src/application/internal-services/automation/create-marketing-campaign/create-marketing-campaign.service";
import { ExecuteCampaignRequest } from "src/application/internal-services/automation/execute-campaign/execute-campaign.request";
import { ExecuteCampaignService } from "src/application/internal-services/automation/execute-campaign/execute-campaign.service";
import { GetCampaignStatsRequest } from "src/application/internal-services/automation/get-campaign-stats/get-campaign-stats.request";
import { GetCampaignStatsService } from "src/application/internal-services/automation/get-campaign-stats/get-campaign-stats.service";
import { QueryCampaignsRequest } from "src/application/internal-services/automation/query-campaigns/query-campaigns.request";
import { QueryCampaignsService } from "src/application/internal-services/automation/query-campaigns/query-campaigns.service";
import { GetCampaignByIdRequest } from "src/application/internal-services/automation/get-campaign-by-id/get-campaign-by-id.request";
import { GetCampaignByIdService } from "src/application/internal-services/automation/get-campaign-by-id/get-campaign-by-id.service";
import { UpdateCampaignRequest } from "src/application/internal-services/automation/update-campaign/update-campaign.request";
import { UpdateCampaignService } from "src/application/internal-services/automation/update-campaign/update-campaign.service";
import { DeleteCampaignRequest } from "src/application/internal-services/automation/delete-campaign/delete-campaign.request";
import { DeleteCampaignService } from "src/application/internal-services/automation/delete-campaign/delete-campaign.service";
import { PauseCampaignRequest } from "src/application/internal-services/automation/pause-campaign/pause-campaign.request";
import { PauseCampaignService } from "src/application/internal-services/automation/pause-campaign/pause-campaign.service";
import { ResumeCampaignRequest } from "src/application/internal-services/automation/resume-campaign/resume-campaign.request";
import { ResumeCampaignService } from "src/application/internal-services/automation/resume-campaign/resume-campaign.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("automation/marketing-campaigns")
@ApiTenant()
export class MarketingCampaignController {
    constructor(
        private readonly createMarketingCampaignService: CreateMarketingCampaignService,
        private readonly executeCampaignService: ExecuteCampaignService,
        private readonly getCampaignStatsService: GetCampaignStatsService,
        private readonly queryCampaignsService: QueryCampaignsService,
        private readonly getCampaignByIdService: GetCampaignByIdService,
        private readonly updateCampaignService: UpdateCampaignService,
        private readonly deleteCampaignService: DeleteCampaignService,
        private readonly pauseCampaignService: PauseCampaignService,
        private readonly resumeCampaignService: ResumeCampaignService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createCampaign(@Body() body: CreateMarketingCampaignRequest, @Request() req) {
        return await this.createMarketingCampaignService.execute(body, req);
    }

    @Post("/execute")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async executeCampaign(@Body()request: ExecuteCampaignRequest, @Request() req) {
        
        return await this.executeCampaignService.execute(request, req);
    }

    @Get("/stats")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getCampaignStats(@Query() query: GetCampaignStatsRequest, @Request() req) {
        return await this.getCampaignStatsService.execute(query, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryCampaigns(@Query() query: QueryCampaignsRequest, @Request() req) {
        return await this.queryCampaignsService.execute(query, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getCampaignById(@Param() params: GetCampaignByIdRequest, @Request() req) {        
        return await this.getCampaignByIdService.execute(params, req);
    }

    @Put("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateCampaign(@Param() param: UpdateCampaignRequest, @Body() body: Partial<UpdateCampaignRequest>, @Request() req) {
        return await this.updateCampaignService.execute(param, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteCampaign(@Param() param: DeleteCampaignRequest, @Request() req) {
        return await this.deleteCampaignService.execute(param, req);
    }

    @Post("/:id/pause")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async pauseCampaign(@Param() param: PauseCampaignRequest, @Request() req) {
        return await this.pauseCampaignService.execute(param, req);
    }

    @Post("/:id/resume")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async resumeCampaign(@Param() param: ResumeCampaignRequest, @Request() req) {
        return await this.resumeCampaignService.execute(param, req);
    }
}

