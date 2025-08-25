import { Controller, Post, Delete, Param, Get, Body, UseGuards } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PolicyRole } from 'src/api/decorators/policies-roles.decorator';
import { ApiTenant } from 'src/api/decorators/tenant.decorator';
import { AuthGuard } from 'src/api/guards/auth.guard';
import { PoliciesRolesGuard } from 'src/api/guards/policies-roles.guard';
import { QueryBase } from 'src/application/common/query-base.request';
import { GetUserTenantsService } from 'src/application/internal-services/master/user/services/get-users/get-user-tenants.service';
import { TenantService } from 'src/infra/services/tenant.service';
import { Policies } from 'src/repos/enums/polices.enum';
import { Rules } from 'src/repos/enums/rules.enum';

class MigrateRequest {
  @ApiPropertyOptional({ example: ["9d164c7a-b312-420e-9fdb-d7a1456ed279"], description: "Lista de tenant ids" })
  @IsArray()
  tenantIds: string[];
}

@Controller('tenants')
@ApiTenant()
export class TenantController {
  constructor(private readonly tenantService: TenantService,
    private readonly getUserTenantService: GetUserTenantsService
  ) { }

  @Get()
  @PolicyRole([Policies.DEVELOPER], [Rules.CAN_LIST])
  @UseGuards(AuthGuard, PoliciesRolesGuard)
  public async getTenant(@Param() query: QueryBase) {
    return await this.getUserTenantService.execute(query);
  }

  @Post("/migrate")
  @PolicyRole([Policies.DEVELOPER], [Rules.CAN_LIST])
  @UseGuards(AuthGuard, PoliciesRolesGuard)
  async migrateUp(@Body() request: MigrateRequest) {
    const results = await Promise.allSettled(
      request.tenantIds.map(async (item) => {
        try {
          await this.tenantService.runMigrationForTenant(item);
          return `${item} - Success`;
        } catch (err) {
          return `${item} - Error`;
        }
      })
    );
    return results.map(r => r.status === "fulfilled" ? r.value : "Erro inesperado");
  }
}

