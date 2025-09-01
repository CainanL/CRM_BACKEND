# Módulo Pipeline de Vendas

Este módulo é responsável por gerenciar funis de vendas, estágios e oportunidades de negócio de forma dinâmica e organizada.

## Funcionalidades

### 1. Agrupamentos de Funis (Pipeline Groups)
- **Criar agrupamento** (`POST /pipeline-group`)
- **Atualizar agrupamento** (`PUT /pipeline-group`)
- **Buscar agrupamento por ID** (`GET /pipeline-group/:id`)
- **Listar agrupamentos** (`GET /pipeline-group`)
- **Deletar agrupamento** (`DELETE /pipeline-group/:id`)

### 2. Funis de Vendas (Pipelines)
- **Criar funil** (`POST /pipeline`)
- **Atualizar funil** (`PUT /pipeline`)
- **Buscar funil por ID** (`GET /pipeline/:id`)
- **Listar funis por agrupamento** (`GET /pipeline/group/:groupId`)
- **Deletar funil** (`DELETE /pipeline/:id`)

### 3. Estágios do Funil (Pipeline Stages)
- **Criar estágio** (`POST /pipeline-stage`)
- **Atualizar estágio** (`PUT /pipeline-stage`)
- **Buscar estágio por ID** (`GET /pipeline-stage/:id`)
- **Listar estágios por funil** (`GET /pipeline-stage/pipeline/:pipelineId`)
- **Reordenar estágios** (`PUT /pipeline-stage/reorder`)
- **Deletar estágio** (`DELETE /pipeline-stage/:id`)

### 4. Oportunidades (Opportunities)
- **Criar oportunidade** (`POST /opportunity`)
- **Mover oportunidade** (`PUT /opportunity/move`)
- **Fechar oportunidade** (`PUT /opportunity/close`)
- **Buscar oportunidade por ID** (`GET /opportunity/:id`)
- **Listar oportunidades** (`GET /opportunity`)

## Estrutura de Dados

### PipelineGroup (Agrupamento de Funis)
```typescript
{
  id: string;
  name: string;
  description?: string;
  pipelines: Pipeline[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Pipeline (Funil de Vendas)
```typescript
{
  id: string;
  name: string;
  description?: string;
  groupId: string;
  group: PipelineGroup;
  createdBy: string;
  stages: PipelineStage[];
  opportunities: Opportunity[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### PipelineStage (Estágio do Funil)
```typescript
{
  id: string;
  name: string;
  position: number;
  defaultProbability: number; // 0-100
  color: string; // Hexadecimal
  pipelineId: string;
  pipeline: Pipeline;
  opportunities: Opportunity[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Opportunity (Oportunidade)
```typescript
{
  id: string;
  name: string;
  description?: string;
  value?: number;
  probability?: number; // 0-100
  expectedCloseDate?: Date;
  clientId: string;
  client: Client;
  pipelineId: string;
  pipeline: Pipeline;
  stageId: string;
  stage: PipelineStage;
  assignedTo?: string;
  assignedEmployee?: Employee;
  status: OpportunityStatus;
  closedAt?: Date;
  closedReason?: OpportunityCloseReason;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Enums Utilizados

### OpportunityStatus
- `OPEN` - Aberta
- `WON` - Ganha
- `LOST` - Perdida
- `CANCELLED` - Cancelada
- `ON_HOLD` - Em espera
- `QUALIFIED` - Qualificada
- `PROPOSAL` - Proposta
- `NEGOTIATION` - Negociação

### OpportunityCloseReason
- `BUDGET_CUT` - Corte de orçamento
- `COMPETITOR_WON` - Concorrente ganhou
- `NO_DECISION` - Sem decisão
- `NOT_QUALIFIED` - Não qualificada
- `PRICE_TOO_HIGH` - Preço muito alto
- `TIMING_NOT_RIGHT` - Momento inadequado
- `TECHNICAL_ISSUES` - Problemas técnicos
- `CUSTOMER_CHANGED_MIND` - Cliente mudou de ideia
- `OTHER` - Outros

## Regras de Negócio

### Agrupamentos de Funis
- Nome deve ser único no sistema
- Não pode ser deletado se houver oportunidades não concluídas
- Soft delete (marca como inativo)

### Funis de Vendas
- Nome deve ser único dentro do agrupamento
- Associado ao usuário criador
- Não pode ser deletado se houver oportunidades não concluídas
- Soft delete (marca como inativo)

### Estágios do Funil
- Posição deve ser única dentro do funil
- Probabilidade deve estar entre 0 e 100
- Cor deve estar no formato hexadecimal (#RRGGBB)
- Reordenação automática quando há conflito de posição
- Não pode ser deletado se houver oportunidades não concluídas
- Soft delete (marca como inativo)

### Oportunidades
- Deve validar existência do funil e estágio
- Registra criação como interação
- Movimentação entre estágios registra interação
- Fechamento registra interação
- Usa probabilidade padrão do estágio se não especificada

## Filtros Disponíveis

### Query Parameters para Oportunidades
- `clientId` - Filtrar por cliente específico
- `pipelineId` - Filtrar por funil específico
- `stageId` - Filtrar por estágio específico
- `assignedTo` - Filtrar por funcionário responsável
- `status` - Filtrar por status
- `startDate` - Data inicial
- `endDate` - Data final
- `textSearch` - Busca textual em nome e descrição

### Paginação
- `page` - Página atual
- `limit` - Limite de itens por página

## Exemplos de Uso

### Criar um agrupamento de funis
```json
POST /pipeline-group
{
  "name": "Energia Solar",
  "description": "Funis relacionados a projetos de energia solar"
}
```

### Criar um funil de vendas
```json
POST /pipeline
{
  "name": "Vendas Residenciais",
  "description": "Funil para vendas de energia solar residencial",
  "groupId": "uuid-do-agrupamento"
}
```

### Criar um estágio
```json
POST /pipeline-stage
{
  "name": "Proposta Enviada",
  "position": 2,
  "defaultProbability": 25,
  "color": "#FF5733",
  "pipelineId": "uuid-do-funil"
}
```

### Criar uma oportunidade
```json
POST /opportunity
{
  "name": "Projeto Energia Solar - Empresa ABC",
  "description": "Instalação de painéis solares para empresa ABC",
  "value": "50000.00",
  "probability": 25,
  "expectedCloseDate": "2024-03-15T00:00:00Z",
  "clientId": "uuid-do-cliente",
  "pipelineId": "uuid-do-funil",
  "stageId": "uuid-do-estagio",
  "assignedTo": "uuid-do-funcionario"
}
```

### Mover oportunidade
```json
PUT /opportunity/move
{
  "opportunityId": "uuid-da-oportunidade",
  "newStageId": "uuid-do-novo-estagio",
  "reason": "Cliente aprovou a proposta e quer avançar"
}
```

### Fechar oportunidade
```json
PUT /opportunity/close
{
  "opportunityId": "uuid-da-oportunidade",
  "status": "WON",
  "closeReason": "OTHER",
  "description": "Cliente aprovou a proposta e assinou o contrato"
}
```

### Reordenar estágios
```json
PUT /pipeline-stage/reorder
{
  "stages": [
    { "id": "uuid-estagio-1", "position": 1 },
    { "id": "uuid-estagio-2", "position": 2 },
    { "id": "uuid-estagio-3", "position": 3 }
  ]
}
```

## Integração com ClientInteraction

O módulo está integrado com o sistema de interações de clientes:

- **Criação de oportunidade** → Registra interação do tipo "OPPORTUNITY_CREATED"
- **Movimentação de oportunidade** → Registra interação do tipo "OPPORTUNITY_MOVED"
- **Fechamento de oportunidade** → Registra interação do tipo "OPPORTUNITY_CLOSED"

Todas as interações são automaticamente registradas com tags apropriadas e descrições detalhadas.

## Validações

- Todos os campos obrigatórios são validados
- Enums são validados contra valores permitidos
- UUIDs são validados
- Datas são validadas
- Cores hexadecimais são validadas
- Probabilidades são validadas (0-100)
- Posições são validadas (>= 1)
- Unicidade de nomes e posições é garantida
- Relacionamentos entre entidades são validados

## Permissões

- **ADMIN**: Acesso total a todas as funcionalidades
- **USER**: Acesso de leitura e criação, edição limitada
- **DELETE**: Apenas ADMIN pode deletar entidades
- **MOVE/CLOSE**: Usuários podem mover e fechar oportunidades

## Arquitetura

O módulo segue a arquitetura hexagonal do projeto:

- **Controllers**: Endpoints REST com validação e autenticação
- **Services**: Lógica de negócio e validações
- **ViewModels**: Transformação de dados para apresentação
- **Requests**: DTOs com validação de entrada
- **Enums**: Constantes tipadas para status e motivos
- **Prisma Models**: Modelos de dados no banco

## Considerações de Performance

- Uso de transações para operações complexas
- Índices únicos para garantir integridade
- Soft delete para preservar histórico
- Paginação em todas as listagens
- Filtros otimizados para consultas
- Relacionamentos carregados sob demanda
