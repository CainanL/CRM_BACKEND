import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateInteractionRequest } from "src/application/internal-services/client-interaction/create-interaction/create-interaction.request";
import { CreateInteractionService } from "src/application/internal-services/client-interaction/create-interaction/create-interaction.service";
import { GetInteractionByIdService } from "src/application/internal-services/client-interaction/get-interaction-by-id/get-interaction-by-id.service";
import { QueryInteractionsRequest } from "src/application/internal-services/client-interaction/query-interactions/query-interactions.request";
import { QueryInteractionsService } from "src/application/internal-services/client-interaction/query-interactions/query-interactions.service";
import { UpdateInteractionRequest } from "src/application/internal-services/client-interaction/update-interaction/update-interaction.request";
import { UpdateInteractionService } from "src/application/internal-services/client-interaction/update-interaction/update-interaction.service";
import { DeleteInteractionService } from "src/application/internal-services/client-interaction/delete-interaction/delete-interaction.service";
import { GetInteractionsByClientService } from "src/application/internal-services/client-interaction/get-interactions-by-client/get-interactions-by-client.service";
import { GetInteractionsByEmployeeService } from "src/application/internal-services/client-interaction/get-interactions-by-employee/get-interactions-by-employee.service";
import { GetInteractionStatsService } from "src/application/internal-services/client-interaction/get-interaction-stats/get-interaction-stats.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";
import { GetInteractionByIdRequest } from "src/application/internal-services/client-interaction/get-interaction-by-id/get-interaction-by-id.request";
import { DeleteInteractionRequest } from "src/application/internal-services/client-interaction/delete-interaction/delete-interaction.request";
import { GetInteractionsByClientRequest } from "src/application/internal-services/client-interaction/get-interactions-by-client/get-interaction-by-client.request";
import { GetInteractionsByEmployeeRequest } from "src/application/internal-services/client-interaction/get-interactions-by-employee/get-interaction-by-employee.request";

@Controller("client-interaction")
@ApiTenant()
export class ClientInteractionController {
    constructor(
        private readonly createInteractionService: CreateInteractionService,
        private readonly getInteractionByIdService: GetInteractionByIdService,
        private readonly queryInteractionsService: QueryInteractionsService,
        private readonly updateInteractionService: UpdateInteractionService,
        private readonly deleteInteractionService: DeleteInteractionService,
        private readonly getInteractionsByClientService: GetInteractionsByClientService,
        private readonly getInteractionsByEmployeeService: GetInteractionsByEmployeeService,
        private readonly getInteractionStatsService: GetInteractionStatsService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createInteraction(@Body() body: CreateInteractionRequest, @Request() req) {
        return await this.createInteractionService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getInteractionById(@Param() params: GetInteractionByIdRequest, @Request() req) {
        return await this.getInteractionByIdService.execute(params, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryInteractions(@Query() query: QueryInteractionsRequest, @Request() req) {
        return await this.queryInteractionsService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateInteraction(@Body() body: UpdateInteractionRequest, @Request() req) {
        return await this.updateInteractionService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteInteraction(@Param() param: DeleteInteractionRequest, @Request() req) {
        return await this.deleteInteractionService.execute(param, req);
    }

    @Get("/client/:clientId")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getInteractionsByClient(@Param() param: GetInteractionsByClientRequest, @Request() req) {
        return await this.getInteractionsByClientService.execute(param, req);
    }

    @Get("/employee/:employeeId")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getInteractionsByEmployee(@Param() param: GetInteractionsByEmployeeRequest, @Request() req) {
        return await this.getInteractionsByEmployeeService.execute(param, req);
    }

    @Get("/stats/overview")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getInteractionStats( @Request() req) {
        return await this.getInteractionStatsService.execute(null, req);
    }
}

