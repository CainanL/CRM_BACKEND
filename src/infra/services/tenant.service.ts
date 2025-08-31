import { HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as MasterClient } from '.prisma/master-client';
import { Prisma, PrismaClient as TenantClient } from '.prisma/tenant-client';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { BaseException } from 'src/application/common/exceptions/base-exception';

const execAsync = promisify(exec);

interface TenantConnection {
    client: TenantClient;
    lastUsed: Date;
}

@Injectable()
export class TenantService implements OnModuleInit, OnModuleDestroy {
    private tenantConnections = new Map<string, TenantConnection>();
    private masterClient: MasterClient;
    private cleanupInterval: NodeJS.Timeout;

    async onModuleInit() {
        // Inicializa o cliente master uma única vez
        this.masterClient = new MasterClient({
            datasources: {
                masterDb: {
                    url: process.env.MASTER_DATABASE_URL,
                },
            },
        });

        // Conecta o cliente master
        await this.masterClient.$connect();

        // Configurar limpeza automática de conexões inativas (opcional)
        this.setupConnectionCleanup();
    }

    /**
     * Obtém ou cria um cliente Prisma para o tenant específico (com pool de conexões)
     */
    async getTenantClient(tenantId: string): Promise<TenantClient | null> {
        try {
            let connection = this.tenantConnections.get(tenantId);

            if (!connection) {
                const client = new TenantClient({
                    datasources: {
                        tenantDb: {
                            url: this.buildTenantDatabaseUrl(tenantId),
                        },
                    },
                });

                // Adiciona middleware para filtrar apenas registros ativos
                client.$use(async (params, next) => {
                    // Só aplica para consultas de leitura
                    if (['findMany', 'findFirst', 'findUnique'].includes(params.action)) {
                        // Garante que args e where existem
                        if (!params.args) params.args = {};
                        if (!params.args.where) params.args.where = {};

                        // Só aplica se o modelo tiver campo isActive
                        const modelsWithIsActive = Prisma.dmmf.datamodel.models
                            .filter(m => m.fields.some(f => f.name == "isActive"))
                            .map(m => m.name);

                        if (modelsWithIsActive.includes(params.model!)) {
                            params.args.where.isActive = true;
                        }
                    }
                    return next(params);
                });

                // Conecta imediatamente para verificar se a conexão é válida
                await client.$connect();

                connection = {
                    client,
                    lastUsed: new Date(),
                };

                this.tenantConnections.set(tenantId, connection);
            } else {
                // Atualiza último uso
                connection.lastUsed = new Date();
            }

            return connection.client;
        } catch (error) {
            if (
                error instanceof PrismaClientInitializationError &&
                error.errorCode === 'P1003'
            ) {
                console.error(`Banco ${this.buildTenantDatabaseUrl(tenantId)} não existe.`);
                // Aqui você pode retornar null, lançar outro erro customizado, etc.
                return null;
            }

            // Outros erros
            console.error('Erro ao conectar ao tenant:', error);
            throw new BaseException(
                `Banco de dados do tenant "${tenantId}" não existe.`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    /**
     * Constrói a URL do banco de dados para o tenant
     */
    private buildTenantDatabaseUrl(tenantId: string): string {
        const host = process.env.TENANT_DB_HOST;
        const port = process.env.TENANT_DB_PORT;
        const user = process.env.TENANT_DB_USER;
        const password = process.env.TENANT_DB_PASSWORD;

        return `postgresql://${user}:${password}@${host}:${port}/tenant_${tenantId}`;
    }

    /**
     * Cria um novo banco de dados para um tenant
     */
    async createTenantDatabase(tenantId: string): Promise<void> {
        try {
            // Usar o cliente master já inicializado
            await this.masterClient.$executeRawUnsafe(
                `CREATE DATABASE "tenant_${tenantId}"`
            );

            // Aplicar migrations no novo banco
            await this.runMigrationForTenant(tenantId);

            console.log(`Database created for tenant: ${tenantId}`);
        } catch (error) {
            console.error(`Error creating database for tenant ${tenantId}:`, error);
            throw error;
        }
    }

    /**
     * Remove um tenant e seu banco de dados
     */
    async deleteTenantDatabase(tenantId: string): Promise<void> {
        // Desconectar cliente do tenant se existir
        const connection = this.tenantConnections.get(tenantId);
        if (connection) {
            await connection.client.$disconnect();
            this.tenantConnections.delete(tenantId);
        }

        try {
            await this.masterClient.$executeRawUnsafe(
                `DROP DATABASE IF EXISTS "tenant_${tenantId}"`
            );
            console.log(`Database deleted for tenant: ${tenantId}`);
        } catch (error) {
            console.error(`Error deleting database for tenant ${tenantId}:`, error);
            throw error;
        }
    }

    /**
     * Lista todos os tenants ativos
     */
    getActiveTenants(): string[] {
        return Array.from(this.tenantConnections.keys());
    }

    /**
     * Configurar limpeza automática de conexões inativas
     */
    private setupConnectionCleanup() {
        // Limpa conexões inativas a cada 30 minutos
        this.cleanupInterval = setInterval(async () => {
            const now = new Date();
            const inactiveThreshold = 30 * 60 * 1000; // 30 minutos

            for (const [tenantId, connection] of this.tenantConnections.entries()) {
                const timeSinceLastUse = now.getTime() - connection.lastUsed.getTime();

                if (timeSinceLastUse > inactiveThreshold) {
                    await connection.client.$disconnect();
                    this.tenantConnections.delete(tenantId);
                    console.log(`Cleaned up inactive connection for tenant: ${tenantId}`);
                }
            }
        }, 15 * 60 * 1000); // Executa a cada 15 minutos
    }

    /**
     * Cleanup ao destruir o módulo
     */
    async onModuleDestroy() {
        // Limpar intervalo de limpeza
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }

        // Desconectar todas as conexões de tenant
        const disconnectPromises = Array.from(this.tenantConnections.values()).map(
            connection => connection.client.$disconnect()
        );

        await Promise.all(disconnectPromises);
        this.tenantConnections.clear();

        // Desconectar cliente master
        if (this.masterClient) {
            await this.masterClient.$disconnect();
        }
    }

    public async runMigrationForTenant(tenantId: string) {
        const databaseUrl = this.buildTenantDatabaseUrl(tenantId);

        const envVars = {
            ...process.env,
            TENANT_DATABASE_URL: databaseUrl,
        };

        try {
            const { stdout, stderr } = await execAsync(
                `npx prisma migrate deploy --schema=prisma/tenant/tenant.prisma`,
                { env: envVars }
            );

            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
        } catch (error) {
            console.error(`❌ Falha ao aplicar migration no tenant ${tenantId}:`, error);
            throw error;
        }
    }
}