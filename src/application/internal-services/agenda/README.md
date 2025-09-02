# Módulo de Agenda e Atividades

Este módulo implementa um sistema completo de gestão de agenda e atividades, incluindo notificações e integração com calendários externos.

## Funcionalidades Implementadas

### 1. Gestão de Atividades
- **Criar atividade**: Criação de atividades com tipo, título, descrição, datas, prioridade e status
- **Editar atividade**: Atualização de atividades existentes
- **Concluir atividade**: Marcação de atividades como concluídas
- **Listar atividades**: Listagem com filtros avançados (tipo, status, prioridade, usuário, cliente, datas)
- **Excluir atividade**: Exclusão lógica de atividades

### 2. Notificações e Lembretes
- **Criar notificação**: Criação de notificações para atividades
- **Marcar como lida**: Marcação de notificações como lidas
- **Tipos de notificação**: Email, Push, SMS, In-App, WhatsApp

### 3. Integração com Calendário Externo
- **Configurar integração**: Autenticação OAuth e armazenamento de tokens
- **Desativar integração**: Desativação de integrações existentes
- **Provedores suportados**: Google, Outlook, Apple, CalDAV

### 4. Relatórios e Análise
- **Resumo de agenda**: Métricas por dia/semana/mês/ano
- **Análise de follow-ups**: Relatórios específicos de follow-ups
- **Métricas de produtividade**: Taxa de conclusão, atividades atrasadas, tempo médio de conclusão

## Estrutura do Módulo

```
agenda/
├── activity/
│   ├── create-activity/
│   ├── update-activity/
│   ├── get-activity-by-id/
│   ├── query-activities/
│   ├── complete-activity/
│   ├── delete-activity/
│   └── activity.module.ts
├── notification/
│   ├── create-notification/
│   ├── mark-as-read/
│   └── notification.module.ts
├── calendar-integration/
│   ├── create-calendar-integration/
│   ├── deactivate-calendar-integration/
│   └── calendar-integration.module.ts
├── activity-report/
│   ├── activity-report.request.ts
│   └── activity-report.service.ts
└── agenda.module.ts
```

## Entidades do Banco de Dados

### Activity
- `id`: Identificador único
- `type`: Tipo da atividade (TASK, APPOINTMENT, FOLLOW_UP, etc.)
- `title`: Título da atividade
- `description`: Descrição opcional
- `startDate`: Data de início
- `endDate`: Data de término
- `dueDate`: Data limite para conclusão
- `priority`: Prioridade (LOW, MEDIUM, HIGH, URGENT)
- `status`: Status (PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED)
- `responsibleUserId`: Usuário responsável
- `createdByUserId`: Usuário que criou
- `clientId`: Cliente relacionado (opcional)
- `reminderDate`: Data para lembrete
- `externalEventId`: ID do evento no calendário externo

### Notification
- `id`: Identificador único
- `type`: Tipo da notificação (EMAIL, PUSH, SMS, etc.)
- `message`: Mensagem da notificação
- `sentAt`: Data de envio
- `isRead`: Se foi lida
- `activityId`: Atividade relacionada
- `userId`: Usuário notificado

### CalendarIntegration
- `id`: Identificador único
- `provider`: Provedor (GOOGLE, OUTLOOK, etc.)
- `accessToken`: Token de acesso OAuth
- `refreshToken`: Token de refresh
- `externalCalendarId`: ID do calendário externo
- `userId`: Usuário da integração
- `isActive`: Se está ativa

## Endpoints da API

### Atividades
- `POST /agenda/activity` - Criar atividade
- `GET /agenda/activity/:id` - Buscar atividade por ID
- `GET /agenda/activity` - Listar atividades com filtros
- `PUT /agenda/activity` - Atualizar atividade
- `PUT /agenda/activity/:id/complete` - Concluir atividade
- `DELETE /agenda/activity/:id` - Excluir atividade

### Notificações
- `POST /agenda/notification` - Criar notificação
- `PUT /agenda/notification/:id/mark-as-read` - Marcar como lida

### Integração com Calendário
- `POST /agenda/calendar-integration` - Configurar integração
- `PUT /agenda/calendar-integration/:id/deactivate` - Desativar integração

### Relatórios
- `GET /agenda/reports/activity-summary` - Resumo de atividades

## Enums Utilizados

### ActivityType
- TASK, APPOINTMENT, FOLLOW_UP, MEETING, CALL, EMAIL, REMINDER, DEADLINE, OTHER

### ActivityStatus
- PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED

### Priority
- LOW, MEDIUM, HIGH, URGENT

### NotificationType
- EMAIL, PUSH, SMS, IN_APP, WHATSAPP

### CalendarProvider
- GOOGLE, OUTLOOK, APPLE, CALDAV, OTHER

## Próximos Passos

Para completar a implementação, considere adicionar:

1. **Automação de Lembretes**: Cron job para enviar lembretes automaticamente
2. **Sincronização de Calendário**: Serviço para sincronizar atividades com calendários externos
3. **Notificações Push**: Integração com serviços de push notification
4. **Templates de Atividade**: Templates pré-definidos para tipos comuns de atividades
5. **Recorrência**: Atividades recorrentes (diárias, semanais, mensais)
6. **Colaboração**: Compartilhamento de atividades entre usuários
7. **Anexos**: Upload de arquivos relacionados às atividades
8. **Comentários**: Sistema de comentários nas atividades
9. **Tags**: Sistema de tags para categorização
10. **Integração com CRM**: Sincronização com oportunidades e clientes
