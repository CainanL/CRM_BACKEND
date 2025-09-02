import { Controller, Get, Request, UseGuards, Query } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { ActivityReportRequest } from "src/application/internal-services/agenda/activity-report/activity-report.request";
import { ActivityReportService } from "src/application/internal-services/agenda/activity-report/activity-report.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("schedule/reports")
@ApiTenant()
export class ActivityReportController {
    constructor(
        private readonly activityReportService: ActivityReportService
    ) { }

    @Get("/activity-summary")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getActivityReport(@Query() query: ActivityReportRequest, @Request() req) {
        return await this.activityReportService.execute(query, req);
    }
}
