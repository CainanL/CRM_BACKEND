import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { AddSolutionPriceRequest } from "src/application/internal-services/client/solution/add-solution-price/add-solution-price.request";
import { AddSolutionPriceService } from "src/application/internal-services/client/solution/add-solution-price/add-solution-price.service";
import { CreateSolutionFieldSettingsRequest } from "src/application/internal-services/client/solution/create-solution-field-settings/create-solution-field-settings.request";
import { CreateSolutionFieldSettingsService } from "src/application/internal-services/client/solution/create-solution-field-settings/create-solution-field-settings.service";
import { CreateSolutionRequest } from "src/application/internal-services/client/solution/create-solution/create-solution.request";
import { CreateSolutionService } from "src/application/internal-services/client/solution/create-solution/create-solution.service";
import { DeleteSolutionRequest } from "src/application/internal-services/client/solution/delete-solution/delete-solution.request";
import { DeleteSolutionService } from "src/application/internal-services/client/solution/delete-solution/delete-solution.service";
import { GetSolutionByIdRequest } from "src/application/internal-services/client/solution/get-solution-by-id/get-solution-by-id.request";
import { GetSolutionByIdService } from "src/application/internal-services/client/solution/get-solution-by-id/get-solution-by-id.service";
import { QuerySolutionRequest } from "src/application/internal-services/client/solution/query-solution/query-solution.request";
import { QuerySolutionService } from "src/application/internal-services/client/solution/query-solution/query-solution.service";
import { RemoveSolutionPriceRequest } from "src/application/internal-services/client/solution/remove-solution-price/remove-solution-price.request";
import { RemoveSolutionPriceService } from "src/application/internal-services/client/solution/remove-solution-price/remove-solution-price.service";
import { UpdateSolutionRequest } from "src/application/internal-services/client/solution/update-solution/update-solution.request";
import { UpdateSolutionService } from "src/application/internal-services/client/solution/update-solution/update-solution.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("solution")
@ApiTenant()
export class SolutionController {
    constructor(private readonly createSolutionService: CreateSolutionService,
        private readonly querySolutionService: QuerySolutionService,
        private readonly addSolutionPriceService: AddSolutionPriceService,
        private readonly updateSolutionService: UpdateSolutionService,
        private readonly deleteSolutionService: DeleteSolutionService,
        private readonly removeSolutionPriceService: RemoveSolutionPriceService,
        private readonly createSolutionFieldSettingsService: CreateSolutionFieldSettingsService,
        private readonly getSolutionByIdService: GetSolutionByIdService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createSolution(@Body() Body: CreateSolutionRequest, @Request() req) {
        return await this.createSolutionService.execute(Body, req);
    }

    @Get()
    async querySolution(@Query() body: QuerySolutionRequest, @Request() req) {
        return await this.querySolutionService.execute(body, req);
    }

    @Post("/add-price")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async addSolutionPrice(@Body() body: AddSolutionPriceRequest, @Request() req) {
        return await this.addSolutionPriceService.execute(body, req);
    }

    @Delete("/reove-price/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async removeSolutionPrice(@Param() body: RemoveSolutionPriceRequest, @Request() req) {
        return await this.removeSolutionPriceService.execute(body, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateSolution(@Body() body: UpdateSolutionRequest, @Request() req) {
        return await this.updateSolutionService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteSolution(@Param() body: DeleteSolutionRequest, @Request() req) {
        return await this.deleteSolutionService.execute(body, req);
    }

    @Post("/solution-field-settings")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createSolutionFieldSettings(@Body() body: CreateSolutionFieldSettingsRequest, @Request() req) {
        return await this.createSolutionFieldSettingsService.execute(body, req);
    }

    @Get("/solution/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getSolutionById(@Param() param: GetSolutionByIdRequest, @Request() req) {
        return await this.getSolutionByIdService.execute(param, req);
    }
}