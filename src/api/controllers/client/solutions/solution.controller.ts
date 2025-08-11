import { Body, Controller, Get, Post, Request, UseGuards, Query } from "@nestjs/common";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { CreateSolutionRequest } from "src/application/internal-services/client/solution/create-solution/create-solution.request";
import { CreateSolutionService } from "src/application/internal-services/client/solution/create-solution/create-solution.service";
import { QuerySolutionRequest } from "src/application/internal-services/client/solution/query-solution/query-solution.request";
import { QuerySolutionService } from "src/application/internal-services/client/solution/query-solution/query-solution.service";

@Controller("solution")
@ApiTenant()
export class SolutionController {
    constructor(private readonly createSolutionService: CreateSolutionService,
        private readonly querySolutionService: QuerySolutionService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    async createSolution(@Body() Body: CreateSolutionRequest, @Request() req) {
        return await this.createSolutionService.execute(Body, req);
    }

    @Get()
    async querySolution(@Query() body: QuerySolutionRequest, @Request() req) {
        return await this.querySolutionService.execute(body, req);
    }

}