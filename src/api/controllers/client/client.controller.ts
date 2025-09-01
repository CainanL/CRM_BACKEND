import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateIndividualClientRequest } from "src/application/internal-services/client/create-individual-client/create-individual-client.request";
import { CreateIndividualClientService } from "src/application/internal-services/client/create-individual-client/create-individual-client.service";
import { CreateCorporateClientRequest } from "src/application/internal-services/client/create-corporate-client/create-corporate-client.request";
import { CreateCorporateClientService } from "src/application/internal-services/client/create-corporate-client/create-corporate-client.service";
import { GetClientByIdRequest } from "src/application/internal-services/client/get-client-by-id/get-client-by-id.request";
import { GetClientByIdService } from "src/application/internal-services/client/get-client-by-id/get-client-by-id.service";
import { QueryClientsRequest } from "src/application/internal-services/client/query-clients/query-clients.request";
import { QueryClientsService } from "src/application/internal-services/client/query-clients/query-clients.service";
import { UpdateIndividualClientRequest } from "src/application/internal-services/client/update-individual-client/update-individual-client.request";
import { UpdateIndividualClientService } from "src/application/internal-services/client/update-individual-client/update-individual-client.service";
import { UpdateCorporateClientRequest } from "src/application/internal-services/client/update-corporate-client/update-corporate-client.request";
import { UpdateCorporateClientService } from "src/application/internal-services/client/update-corporate-client/update-corporate-client.service";
import { DeleteClientRequest } from "src/application/internal-services/client/delete-client/delete-client.request";
import { DeleteClientService } from "src/application/internal-services/client/delete-client/delete-client.service";
import { ChangeClientStatusRequest } from "src/application/internal-services/client/change-client-status/change-client-status.request";
import { ChangeClientStatusService } from "src/application/internal-services/client/change-client-status/change-client-status.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("client")
@ApiTenant()
export class ClientController {
    constructor(
        private readonly createIndividualClientService: CreateIndividualClientService,
        private readonly createCorporateClientService: CreateCorporateClientService,
        private readonly getClientByIdService: GetClientByIdService,
        private readonly queryClientsService: QueryClientsService,
        private readonly updateIndividualClientService: UpdateIndividualClientService,
        private readonly updateCorporateClientService: UpdateCorporateClientService,
        private readonly deleteClientService: DeleteClientService,
        private readonly changeClientStatusService: ChangeClientStatusService
    ) { }

    @Post("/individual")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createIndividualClient(@Body() body: CreateIndividualClientRequest, @Request() req) {
        return await this.createIndividualClientService.execute(body, req);
    }

    @Post("/corporate")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createCorporateClient(@Body() body: CreateCorporateClientRequest, @Request() req) {
        return await this.createCorporateClientService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getClientById(@Param() param: GetClientByIdRequest, @Request() req) {
        return await this.getClientByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryClients(@Query() query: QueryClientsRequest, @Request() req) {
        return await this.queryClientsService.execute(query, req);
    }

    @Put("/individual")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateIndividualClient(@Body() body: UpdateIndividualClientRequest, @Request() req) {
        return await this.updateIndividualClientService.execute(body, req);
    }

    @Put("/corporate")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateCorporateClient(@Body() body: UpdateCorporateClientRequest, @Request() req) {
        return await this.updateCorporateClientService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteClient(@Param() param: DeleteClientRequest, @Request() req) {
        return await this.deleteClientService.execute(param, req);
    }

    @Put("/status")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async changeClientStatus(@Body() body: ChangeClientStatusRequest, @Request() req) {
        return await this.changeClientStatusService.execute(body, req);
    }
}
