import { TenantService } from "./tenant.service";

async function migrateAllTenants() {
    const tenantService = new TenantService();
    const tenants = ['tenant1', 'tenant2', 'tenant3']; // Lista seus tenants

    for (const tenantId of tenants) {
        try {
            console.log(`Migrating tenant: ${tenantId}`);
            const client = await tenantService.getTenantClient(tenantId);

            // Aplicar migrations específicas se necessário
            if (!client) throw new Error(`Não é possível montar um contexto para ${tenantId}`);
            await client.$executeRaw`-- Suas migrations aqui`;

            console.log(`✅ Tenant ${tenantId} migrated successfully`);
        } catch (error) {
            console.error(`❌ Error migrating tenant ${tenantId}:`, error);
        }
    }
}


migrateAllTenants();