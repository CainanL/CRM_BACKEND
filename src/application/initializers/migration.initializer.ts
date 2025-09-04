import { Injectable, OnApplicationBootstrap, Logger } from "@nestjs/common";
import { MigrationCheckService } from "../internal-services/master/migration/migration-check.service";

@Injectable()
export class MigrationInitializer implements OnApplicationBootstrap {
    private readonly logger = new Logger(MigrationInitializer.name);

    async execute(): Promise<void> {
        this.logger.log("🚀 Iniciando verificação automática de migrations...");

        try {
            const migrationStatuses = await this.migrationCheckService.execute();
            
            // Log do resumo
            const upToDateCount = migrationStatuses.filter(s => s.isUpToDate && !s.error).length;
            const outdatedCount = migrationStatuses.filter(s => !s.isUpToDate && !s.error).length;
            const errorCount = migrationStatuses.filter(s => s.error).length;

            this.logger.log(`📊 Resumo da verificação de migrations:`);
            this.logger.log(`   ✅ Atualizados: ${upToDateCount}`);
            this.logger.log(`   🔄 Atualizados automaticamente: ${outdatedCount}`);
            this.logger.log(`   ❌ Com erro: ${errorCount}`);

            // Log detalhado de erros
            if (errorCount > 0) {
                this.logger.warn("⚠️ Tenants com erro na migration:");
                migrationStatuses
                    .filter(s => s.error)
                    .forEach(status => {
                        this.logger.warn(`   - ${status.tenantName} (${status.tenantId}): ${status.error}`);
                    });
            }

            this.logger.log("✅ Verificação de migrations concluída com sucesso!");

        } catch (error) {
            this.logger.error("❌ Erro durante verificação de migrations:", error);
            // Não relançar o erro para não impedir a inicialização do sistema
        }
    }

    constructor(
        private readonly migrationCheckService: MigrationCheckService
    ) { }

    async onApplicationBootstrap() {
        // Executar com delay para garantir que todos os serviços estejam inicializados
        setTimeout(async () => {
            await this.execute();
        }, 5000); // 5 segundos de delay
    }
}
