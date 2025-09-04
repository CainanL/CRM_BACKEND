import { Injectable, Logger } from "@nestjs/common";
import { TenantService } from "src/infra/services/tenant.service";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface MigrationStatus {
    tenantId: string;
    tenantName: string;
    isUpToDate: boolean;
    lastMigration?: string;
    error?: string;
}

@Injectable()
export class MigrationCheckService {
    private readonly logger = new Logger(MigrationCheckService.name);

    async execute(): Promise<MigrationStatus[]> {
        this.logger.debug("🔍 Verificando status das migrations de todos os tenants...");

        // Buscar todos os tenants ativos
        const tenants = await this.masterClient.tenant.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        });

        this.logger.debug(`📊 Encontrados ${tenants.length} tenants ativos`);

        // Verificar status de migration de cada tenant
        const migrationStatuses = await Promise.allSettled(
            tenants.map(async (tenant) => {
                try {
                    const status = await this.checkTenantMigrationStatus(tenant.id, tenant.name);
                    return status;
                } catch (error) {
                    this.logger.error(`❌ Erro ao verificar migration do tenant ${tenant.id}:`, error);
                    return {
                        tenantId: tenant.id,
                        tenantName: tenant.name,
                        isUpToDate: false,
                        error: error.message
                    };
                }
            })
        );

        // Processar resultados
        const results = migrationStatuses.map((result, index) => {
            if (result.status === 'fulfilled') {
                return result.value;
            } else {
                return {
                    tenantId: tenants[index].id,
                    tenantName: tenants[index].name,
                    isUpToDate: false,
                    error: result.reason?.message || 'Erro desconhecido'
                };
            }
        });

        // Aplicar migrations para tenants desatualizados
        const outdatedTenants = results.filter(status => !status.isUpToDate && !status.error);
        
        if (outdatedTenants.length > 0) {
            this.logger.debug(`🔄 Aplicando migrations para ${outdatedTenants.length} tenants desatualizados...`);
            
            await Promise.allSettled(
                outdatedTenants.map(async (status) => {
                    try {
                        await this.tenantService.runMigrationForTenant(status.tenantId);
                        this.logger.debug(`✅ Migration aplicada com sucesso para tenant: ${status.tenantName}`);
                        
                        // Atualizar status após migration
                        const updatedStatus = await this.checkTenantMigrationStatus(status.tenantId, status.tenantName);
                        Object.assign(status, updatedStatus);
                    } catch (error) {
                        this.logger.error(`❌ Falha ao aplicar migration para tenant ${status.tenantName}:`, error);
                        status.error = error.message;
                    }
                })
            );
        }

        const successCount = results.filter(r => r.isUpToDate && !r.error).length;
        const errorCount = results.filter(r => r.error).length;
        
        this.logger.debug(`📈 Resumo: ${successCount} tenants atualizados, ${errorCount} com erro`);

        return results;
    }

    private async checkTenantMigrationStatus(tenantId: string, tenantName: string): Promise<MigrationStatus> {
        try {
            // Obter cliente do tenant
            const tenantClient = await this.tenantService.getTenantClient(tenantId);
            if (!tenantClient) {
                // Se o banco não existe, tentar criar
                this.logger.debug(`🔄 Banco do tenant ${tenantId} não existe. Criando...`);
                try {
                    await this.tenantService.createTenantDatabase(tenantId);
                    this.logger.debug(`✅ Banco criado com sucesso para tenant: ${tenantName}`);
                    
                    // Tentar obter o cliente novamente
                    const newTenantClient = await this.tenantService.getTenantClient(tenantId);
                    if (!newTenantClient) {
                        throw new Error(`Falha ao conectar ao banco recém-criado do tenant ${tenantId}`);
                    }
                    
                    return {
                        tenantId,
                        tenantName,
                        isUpToDate: true,
                        lastMigration: 'Banco criado e migrations aplicadas'
                    };
                } catch (createError) {
                    this.logger.error(`❌ Falha ao criar banco para tenant ${tenantId}:`, createError);
                    return {
                        tenantId,
                        tenantName,
                        isUpToDate: false,
                        error: `Falha ao criar banco: ${createError.message}`
                    };
                }
            }

            // Verificar se a tabela _prisma_migrations existe
            const migrationTableExists = await this.checkMigrationTableExists(tenantClient);
            if (!migrationTableExists) {
                return {
                    tenantId,
                    tenantName,
                    isUpToDate: false,
                    error: 'Tabela de migrations não existe'
                };
            }

            // Obter última migration aplicada no tenant
            const lastAppliedMigration = await this.getLastAppliedMigration(tenantClient);
            
            // Obter última migration disponível no sistema
            const latestAvailableMigration = await this.getLatestAvailableMigration();
            
            const isUpToDate = lastAppliedMigration === latestAvailableMigration;

            return {
                tenantId,
                tenantName,
                isUpToDate,
                lastMigration: lastAppliedMigration!
            };

        } catch (error) {
            this.logger.error(`Erro ao verificar migration do tenant ${tenantId}:`, error);
            return {
                tenantId,
                tenantName,
                isUpToDate: false,
                error: error.message
            };
        }
    }

    private async checkMigrationTableExists(tenantClient: any): Promise<boolean> {
        try {
            await tenantClient.$queryRaw`
                SELECT 1 FROM "_prisma_migrations" LIMIT 1
            `;
            return true;
        } catch (error) {
            return false;
        }
    }

    private async getLastAppliedMigration(tenantClient: any): Promise<string | null> {
        try {
            const result = await tenantClient.$queryRaw`
                SELECT migration_name 
                FROM "_prisma_migrations" 
                ORDER BY finished_at DESC 
                LIMIT 1
            `;
            
            return result[0]?.migration_name || null;
        } catch (error) {
            this.logger.error('Erro ao obter última migration aplicada:', error);
            return null;
        }
    }

    private async getLatestAvailableMigration(): Promise<string> {
        try {
            // Usar PowerShell para listar migrations
            const { stdout } = await execAsync('powershell -Command "Get-ChildItem -Path \\"prisma\\tenant\\migrations\\" -Directory | Where-Object { $_.Name -match \\"^[0-9]\\" } | Sort-Object Name -Descending | Select-Object -First 1 -ExpandProperty Name"');
            const latestMigration = stdout.trim();
            
            if (!latestMigration) {
                throw new Error('Nenhuma migration encontrada');
            }

            return latestMigration;
        } catch (error) {
            this.logger.error('Erro ao obter última migration disponível:', error);
            throw error;
        }
    }

    constructor(
        private readonly tenantService: TenantService,
        private readonly masterClient: MasterPrismaService
    ) { }
}
