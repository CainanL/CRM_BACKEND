# Módulo ClientInteraction

Este módulo é responsável por gerenciar todas as interações entre funcionários e clientes da empresa.

## Funcionalidades

### 1. CRUD Básico
- **Criar interação** (`POST /client-interaction`)
- **Buscar interação por ID** (`GET /client-interaction/:id`)
- **Listar interações** (`GET /client-interaction`)
- **Atualizar interação** (`PUT /client-interaction`)
- **Deletar interação** (`DELETE /client-interaction/:id`)

### 2. Funcionalidades Específicas
- **Buscar interações por cliente** (`GET /client-interaction/client/:clientId`)
- **Buscar interações por funcionário** (`GET /client-interaction/employee/:employeeId`)
- **Estatísticas gerais** (`GET /client-interaction/stats/overview`)

## Estrutura de Dados

### ClientInteraction
```typescript
{
  id: string;
  clientId: string;
  employeeId?: string;
  interactionType: InteractionType;
  interactionDate: Date;
  description: string;
  status: InteractionStatus;
  result: string;
  tags: InteractionTag[];
  duration?: number;
  followUpDate?: Date;
  priority?: Priority;
  cost?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Enums Utilizados

### InteractionType
- `EMAIL` - Comunicação por email
- `PHONE_CALL` - Ligação telefônica
- `MEETING` - Reunião presencial
- `CHAT` - Chat online
- `VISIT` - Visita ao cliente
- `SMS` - Mensagem SMS
- `WHATSAPP` - Mensagem WhatsApp
- `VIDEO_CALL` - Videochamada
- `SOCIAL_MEDIA` - Redes sociais
- `LETTER` - Carta
- `OTHER` - Outros

### InteractionStatus
- `SUCCESS` - Interação bem-sucedida
- `PENDING` - Pendente
- `REJECTED` - Rejeitada
- `FOLLOW_UP` - Requer follow-up
- `CANCELLED` - Cancelada
- `RESCHEDULED` - Reagendada
- `IN_PROGRESS` - Em andamento
- `COMPLETED` - Concluída

### InteractionTag
- `SALES` - Vendas
- `SUPPORT` - Suporte
- `MARKETING` - Marketing
- `ONBOARDING` - Integração
- `COMPLAINT` - Reclamação
- `FEEDBACK` - Feedback
- `TECHNICAL` - Técnico
- `BILLING` - Cobrança
- `PARTNERSHIP` - Parceria
- `TRAINING` - Treinamento
- `MAINTENANCE` - Manutenção
- `UPSELL` - Venda adicional
- `RETENTION` - Retenção
- `SURVEY` - Pesquisa
- `EVENT` - Evento

### Priority
- `LOW` - Baixa
- `MEDIUM` - Média
- `HIGH` - Alta
- `URGENT` - Urgente

## Filtros Disponíveis

### Query Parameters
- `clientId` - Filtrar por cliente específico
- `employeeId` - Filtrar por funcionário específico
- `interactionType` - Filtrar por tipo de interação
- `status` - Filtrar por status
- `tags` - Filtrar por tags (array)
- `startDate` - Data inicial
- `endDate` - Data final
- `priority` - Filtrar por prioridade
- `textSearch` - Busca textual em descrição, resultado e nome do cliente

### Paginação
- `page` - Página atual
- `limit` - Limite de itens por página

## Estatísticas Disponíveis

### Overview Stats
- Total de interações
- Interações por tipo (com percentuais)
- Interações por status (com percentuais)
- Interações por tag (com percentuais)
- Interações por prioridade (com percentuais)
- Duração média das interações
- Custo total das interações
- Interações do mês atual vs mês anterior
- Crescimento mês a mês
- Top 5 funcionários com mais interações
- Top 5 clientes com mais interações

## Exemplos de Uso

### Criar uma nova interação
```json
POST /client-interaction
{
  "clientId": "uuid-do-cliente",
  "employeeId": "uuid-do-funcionario",
  "interactionType": "PHONE_CALL",
  "interactionDate": "2024-01-15T14:30:00Z",
  "description": "Ligação para esclarecimento sobre proposta comercial",
  "status": "SUCCESS",
  "result": "Cliente interessado, agendou reunião para próxima semana",
  "tags": ["SALES", "FOLLOW_UP"],
  "duration": 15,
  "priority": "HIGH",
  "cost": "25.50"
}
```

### Buscar interações com filtros
```
GET /client-interaction?clientId=uuid&interactionType=PHONE_CALL&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=10
```

### Obter estatísticas
```
GET /client-interaction/stats/overview
```

## Validações

- Todos os campos obrigatórios são validados
- Enums são validados contra valores permitidos
- UUIDs são validados
- Datas são validadas
- Arrays de tags são validados
- Valores numéricos (duração, custo) são validados

## Permissões

- **ADMIN**: Acesso total a todas as funcionalidades
- **USER**: Acesso de leitura e criação, edição limitada
- **DELETE**: Apenas ADMIN pode deletar interações
