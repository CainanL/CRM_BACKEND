# Migration Check Service

## Descrição

Este serviço verifica automaticamente se todos os bancos de dados de tenants estão com as migrations atualizadas e aplica as migrations necessárias automaticamente na inicialização do sistema.

## Funcionamento

### 1. Verificação Automática na Inicialização

O `MigrationInitializer` é executado automaticamente quando o sistema é iniciado (com delay de 5 segundos para garantir que todos os serviços estejam prontos).

### 2. Processo de Verificação

1. **Busca todos os tenants ativos** no banco master
2. **Para cada tenant**:
   - Conecta ao banco do tenant
   - Verifica se a tabela `_prisma_migrations` existe
   - Compara a última migration aplicada com a última migration disponível
3. **Aplica migrations automaticamente** para tenants desatualizados
4. **Registra logs detalhados** do processo

### 3. Reutilização do TenantService

O serviço reutiliza o `TenantService` existente para:
- Obter conexões com bancos de tenants
- Executar migrations usando o método `runMigrationForTenant()`
- Manter consistência com a arquitetura existente

## Estrutura de Arquivos

```
src/application/internal-services/master/migration/
├── migration-check.service.ts    # Serviço principal de verificação
├── migration.module.ts          # Módulo do serviço
└── README.md                    # Esta documentação

src/application/initializers/
└── migration.initializer.ts     # Initializer executado na inicialização

src/api/controllers/master/
└── migration.controller.ts      # Controller para verificação manual
```

## Endpoints Disponíveis

### GET /migrations/check

Verifica manualmente o status das migrations de todos os tenants.

**Permissões**: Apenas usuários com role `DEVELOPER`

**Resposta**:
```json
[
  {
    "tenantId": "uuid",
    "tenantName": "nome-do-tenant",
    "isUpToDate": true,
    "lastMigration": "20250904174118_update"
  }
]
```

## Logs

O serviço gera logs detalhados durante a execução:

- `🚀 Iniciando verificação automática de migrations...`
- `📊 Encontrados X tenants ativos`
- `🔄 Aplicando migrations para X tenants desatualizados...`
- `✅ Migration aplicada com sucesso para tenant: nome`
- `❌ Falha ao aplicar migration para tenant nome: erro`
- `📈 Resumo: X tenants atualizados, X com erro`

## Tratamento de Erros

- **Erros não impedem a inicialização** do sistema
- **Logs detalhados** de todos os erros
- **Continuação do processo** mesmo com falhas em tenants específicos
- **Relatório final** com resumo de sucessos e falhas

## Configuração

O serviço utiliza as mesmas configurações do `TenantService`:
- `TENANT_DB_HOST`
- `TENANT_DB_PORT` 
- `TENANT_DB_USER`
- `TENANT_DB_PASSWORD`

## Arquitetura

O serviço segue os padrões arquiteturais do projeto:
- **Herda de `HandlerBase`** para consistência
- **Usa injeção de dependência** do NestJS
- **Implementa `OnApplicationBootstrap`** para execução automática
- **Reutiliza serviços existentes** (TenantService, MasterPrismaService)
- **Mantém separação de responsabilidades** com módulos específicos
