import { Controller, Get, Request, UseGuards, Query } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { GetCommunicationStatsRequest } from "src/application/internal-services/communication/get-communication-stats/get-communication-stats.request";
import { GetCommunicationStatsService } from "src/application/internal-services/communication/get-communication-stats/get-communication-stats.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("communication/stats")
@ApiTenant()
export class CommunicationStatsController {
    constructor(
        private readonly getCommunicationStatsService: GetCommunicationStatsService
    ) { }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getCommunicationStats(@Query() query: GetCommunicationStatsRequest, @Request() req) {
        return await this.getCommunicationStatsService.execute(query, req);
    }
}
