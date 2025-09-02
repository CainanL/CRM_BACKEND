import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateCalendarIntegrationRequest } from "src/application/internal-services/calendar-integration/create-calendar-integration/create-calendar-integration.request";
import { CreateCalendarIntegrationService } from "src/application/internal-services/calendar-integration/create-calendar-integration/create-calendar-integration.service";
import { DeactivateCalendarIntegrationRequest } from "src/application/internal-services/calendar-integration/deactivate-calendar-integration/deactivate-calendar-integration.request";
import { DeactivateCalendarIntegrationService } from "src/application/internal-services/calendar-integration/deactivate-calendar-integration/deactivate-calendar-integration.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("agenda/calendar-integration")
@ApiTenant()
export class CalendarIntegrationController {
    constructor(
        private readonly createCalendarIntegrationService: CreateCalendarIntegrationService,
        private readonly deactivateCalendarIntegrationService: DeactivateCalendarIntegrationService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createCalendarIntegration(@Body() body: CreateCalendarIntegrationRequest, @Request() req) {
        return await this.createCalendarIntegrationService.execute(body, req);
    }

    @Put("/:id/deactivate")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deactivateCalendarIntegration(@Param() param: DeactivateCalendarIntegrationRequest, @Request() req) {
        return await this.deactivateCalendarIntegrationService.execute(param, req);
    }
}
