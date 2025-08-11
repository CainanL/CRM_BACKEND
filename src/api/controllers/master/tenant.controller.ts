import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { TenantService } from 'src/infra/services/tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post(':tenantId')
  async createTenant(@Param('tenantId') tenantId: string) {
    await this.tenantService.createTenantDatabase(tenantId);
    return { message: `Tenant ${tenantId} created successfully` };
  }

  @Delete(':tenantId')
  async deleteTenant(@Param('tenantId') tenantId: string) {
    await this.tenantService.deleteTenantDatabase(tenantId);
    return { message: `Tenant ${tenantId} deleted successfully` };
  }

  @Get()
  async getActiveTenants() {
    return {
      tenants: this.tenantService.getActiveTenants(),
    };
  }
}