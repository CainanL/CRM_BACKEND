import { Module } from "@nestjs/common";
import { MigrationCheckService } from "./migration-check.service";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { TenantService } from "src/infra/services/tenant.service";

@Module({
    imports: [],
    providers: [
        MigrationCheckService,
        MasterPrismaService,
        TenantService
    ],
    exports: [
        MigrationCheckService
    ]
})
export class MigrationModule { }
