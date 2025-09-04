import { Controller, Get, UseGuards } from "@nestjs/common";
import { MigrationCheckService } from "src/application/internal-services/master/migration/migration-check.service";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("migrations")
@ApiTenant()
export class MigrationController {
    constructor(
        private readonly migrationCheckService: MigrationCheckService
    ) { }

    @Get("/check")
    @PolicyRole([Policies.DEVELOPER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    public async checkMigrations() {
        return await this.migrationCheckService.execute();
    }
}
