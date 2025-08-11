import { Module } from '@nestjs/common';
import { MasterPrismaService } from './services/master-prisma.service';
import { TenantPrismaService } from './services/tenant-prisma.service';
import { TenantService } from './services/tenant.service';


@Module({
  providers: [TenantService, MasterPrismaService, TenantPrismaService],
  exports: [TenantService, MasterPrismaService, TenantPrismaService],
})
export class InfraModule { } 