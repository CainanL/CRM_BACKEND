import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateCampaignTemplateRequest } from "src/application/internal-services/automation/create-campaign-template/create-campaign-template.request";
import { CreateCampaignTemplateService } from "src/application/internal-services/automation/create-campaign-template/create-campaign-template.service";
import { QueryTemplatesRequest } from "src/application/internal-services/automation/query-templates/query-templates.request";
import { QueryTemplatesService } from "src/application/internal-services/automation/query-templates/query-templates.service";
import { GetTemplateByIdRequest } from "src/application/internal-services/automation/get-template-by-id/get-template-by-id.request";
import { GetTemplateByIdService } from "src/application/internal-services/automation/get-template-by-id/get-template-by-id.service";
import { UpdateTemplateRequest } from "src/application/internal-services/automation/update-template/update-template.request";
import { UpdateTemplateService } from "src/application/internal-services/automation/update-template/update-template.service";
import { DeleteTemplateRequest } from "src/application/internal-services/automation/delete-template/delete-template.request";
import { DeleteTemplateService } from "src/application/internal-services/automation/delete-template/delete-template.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("automation/campaign-templates")
@ApiTenant()
export class CampaignTemplateController {
    constructor(
        private readonly createCampaignTemplateService: CreateCampaignTemplateService,
        private readonly queryTemplatesService: QueryTemplatesService,
        private readonly getTemplateByIdService: GetTemplateByIdService,
        private readonly updateTemplateService: UpdateTemplateService,
        private readonly deleteTemplateService: DeleteTemplateService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createTemplate(@Body() body: CreateCampaignTemplateRequest, @Request() req) {
        return await this.createCampaignTemplateService.execute(body, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryTemplates(@Query() query: QueryTemplatesRequest, @Request() req) {
        return await this.queryTemplatesService.execute(query, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getTemplateById(@Param() param: GetTemplateByIdRequest, @Request() req) {
        return await this.getTemplateByIdService.execute(param, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateTemplate(@Body() request: UpdateTemplateRequest, @Body() body: Partial<UpdateTemplateRequest>, @Request() req) {
        return await this.updateTemplateService.execute(request, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteTemplate(@Param() param: DeleteTemplateRequest, @Request() req) {
        return await this.deleteTemplateService.execute(param, req);
    }
}

