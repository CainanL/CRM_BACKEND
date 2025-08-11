import { HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as MasterClient } from '.prisma/master-client';
import { PrismaClient as TenantClient } from '.prisma/tenant-client';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

    async runMigrationForTenant(tenantId: string) {
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






















// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient as MasterClient } from '.prisma/master-client';
// import { PrismaClient as TenantClient } from '.prisma/tenant-client';
// import { exec } from 'child_process';
// import { promisify } from 'util';
// const execAsync = promisify(exec);

// @Injectable()
// export class TenantService implements OnModuleDestroy {
//     private tenantClients = new Map<string, TenantClient>();

//     /**
//      * Obtém ou cria um cliente Prisma para o tenant específico
//      */
//     getTenantClient(tenantId: string): TenantClient {
//         if (!this.tenantClients.has(tenantId)) {
//             const client = new TenantClient({
//                 datasources: {
//                     tenantDb: {
//                         url: this.buildTenantDatabaseUrl(tenantId),
//                     },
//                 },
//             });

//             this.tenantClients.set(tenantId, client);
//         }

//         return this.tenantClients.get(tenantId)!;
//     }

//     /**
//      * Constrói a URL do banco de dados para o tenant
//      */
//     private buildTenantDatabaseUrl(tenantId: string): string {
//         const host = process.env.TENANT_DB_HOST;
//         const port = process.env.TENANT_DB_PORT;
//         const user = process.env.TENANT_DB_USER;
//         const password = process.env.TENANT_DB_PASSWORD;

//         return `postgresql://${user}:${password}@${host}:${port}/tenant_${tenantId}`;
//     }

//     /**
//      * Cria um novo banco de dados para um tenant
//      */
//     async createTenantDatabase(tenantId: string): Promise<void> {
//         // Cliente para conectar ao banco master
//         const masterClient = new TenantClient({
//             datasources: {
//                 tenantDb: {
//                     url: process.env.MASTER_DATABASE_URL,
//                 },
//             },
//         });

//         try {
//             // Criar database para o tenant
//             await masterClient.$executeRawUnsafe(
//                 `CREATE DATABASE "tenant_${tenantId}"`
//             );

//             // Aplicar migrations no novo banco
//             const tenantClient = this.getTenantClient(tenantId);
//             await this.runMigrationForTenant(tenantId);
//             // await tenantClient.$executeRaw`
//             //     -- O Prisma aplicará o schema automaticamente na primeira conexão
//             //     SELECT 1;
//             // `;

//             console.log(`Database created for tenant: ${tenantId}`);
//         } catch (error) {
//             console.error(`Error creating database for tenant ${tenantId}:`, error);
//             throw error;
//         } finally {
//             await masterClient.$disconnect();
//         }
//     }

//     /**
//      * Remove um tenant e seu banco de dados
//      */
//     async deleteTenantDatabase(tenantId: string): Promise<void> {
//         // Desconectar cliente do tenant se existir
//         if (this.tenantClients.has(tenantId)) {
//             await this.tenantClients.get(tenantId)!.$disconnect();
//             this.tenantClients.delete(tenantId);
//         }

//         const masterClient = new MasterClient({
//             datasources: {
//                 masterDb: {
//                     url: process.env.MASTER_DATABASE_URL,
//                 },
//             },
//         });

//         try {
//             await masterClient.$executeRawUnsafe(
//                 `DROP DATABASE IF EXISTS "tenant_${tenantId}"`
//             );
//             console.log(`Database deleted for tenant: ${tenantId}`);
//         } catch (error) {
//             console.error(`Error deleting database for tenant ${tenantId}:`, error);
//             throw error;
//         } finally {
//             await masterClient.$disconnect();
//         }
//     }

//     /**
//      * Lista todos os tenants ativos
//      */
//     getActiveTenants(): string[] {
//         return Array.from(this.tenantClients.keys());
//     }

//     /**
//      * Cleanup ao destruir o módulo
//      */
//     async onModuleDestroy() {
//         const disconnectPromises = Array.from(this.tenantClients.values()).map(
//             client => client.$disconnect()
//         );

//         await Promise.all(disconnectPromises);
//         this.tenantClients.clear();
//     }

//     async runMigrationForTenant(tenantId: string) {
//         const databaseUrl = `postgresql://${process.env.TENANT_DB_USER}:${process.env.TENANT_DB_PASSWORD}@${process.env.TENANT_DB_HOST}:${process.env.TENANT_DB_PORT}/tenant_${tenantId}`;

//         const envVars = {
//             ...process.env,
//             TENANT_DATABASE_URL: databaseUrl,
//         };

//         try {
//             const { stdout, stderr } = await execAsync(
//                 `npx prisma migrate deploy --schema=prisma/tenant/tenant.prisma`,
//                 { env: envVars }
//             );

//             if (stdout) console.log(stdout);
//             if (stderr) console.error(stderr);
//         } catch (error) {
//             console.error(`❌ Falha ao aplicar migration no tenant ${tenantId}:`, error);
//             throw error;
//         }
//     }
// }