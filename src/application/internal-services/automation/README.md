# Módulo de Automação e Marketing

Este módulo implementa um sistema completo de automação e marketing, permitindo a criação, execução e monitoramento de campanhas de marketing através de múltiplos canais de comunicação.

## Funcionalidades Principais

### 🎯 Campanhas de Marketing
- **Criação de Campanhas**: Crie campanhas personalizadas com segmentação avançada
- **Múltiplos Canais**: Suporte para Email, SMS, WhatsApp e campanhas multi-canal
- **Agendamento**: Execute campanhas imediatamente ou agende para o futuro
- **Segmentação**: Segmentação por leads, clientes ou critérios personalizados
- **Templates**: Sistema de templates reutilizáveis com variáveis dinâmicas

### 📊 Relatórios e Analytics
- **Estatísticas em Tempo Real**: Acompanhe métricas de entrega, abertura, cliques e respostas
- **Relatórios Detalhados**: Análise completa de performance das campanhas
- **Insights de Engajamento**: Identifique horários e dias de maior engajamento
- **Comparativo de Performance**: Compare campanhas e identifique as melhores práticas

### 🤖 Automação de Marketing
- **Workflows Automatizados**: Crie sequências de marketing automatizadas
- **Triggers Inteligentes**: Dispare automações baseadas em ações dos usuários
- **Nurturing de Leads**: Automatize o processo de nutrição de leads
- **Follow-ups**: Sistema automático de follow-up

## Estrutura do Módulo

### Entidades Principais

#### MarketingCampaign
Campanha de marketing com todas as configurações necessárias:
- Tipo de campanha (EMAIL, SMS, WHATSAPP, MULTI_CHANNEL)
- Conteúdo e assunto
- Segmentação de audiência
- Agendamento
- Status e prioridade

#### CampaignExecution
Execução de uma campanha com histórico completo:
- Estatísticas de envio
- Métricas de engajamento
- Status de execução
- Relatórios detalhados

#### CampaignRecipient
Destinatário individual da campanha:
- Dados de contato
- Status de entrega
- Histórico de interações
- Métricas personalizadas

#### CampaignTemplate
Templates reutilizáveis para campanhas:
- Conteúdo padronizado
- Variáveis dinâmicas
- Categorização
- Versionamento

### Serviços Implementados

#### CreateMarketingCampaignService
Criação de novas campanhas de marketing com validações completas.

#### ExecuteCampaignService
Execução de campanhas com envio em lotes e integração com serviços de comunicação.

#### GetCampaignStatsService
Geração de estatísticas e relatórios detalhados das campanhas.

#### QueryCampaignsService
Consulta e listagem de campanhas com filtros avançados.

#### CreateCampaignTemplateService
Criação de templates reutilizáveis para campanhas.

## Integração com Módulos Existentes

### Comunicação
- **SendMessageService**: Integração para envio real de mensagens
- **CommunicationChannel**: Utilização dos canais configurados
- **Message**: Registro de mensagens enviadas

### Leads e Clientes
- **QueryLeadsService**: Segmentação por leads capturados
- **QueryClientsService**: Segmentação por clientes cadastrados
- **SolutionCapturedLead**: Integração com sistema de leads

### Email
- **EmailService**: Envio de emails através do sistema existente
- **Templates**: Utilização de templates de email

## Endpoints da API

### Campanhas de Marketing
```
POST   /automation/marketing-campaigns              # Criar campanha
GET    /automation/marketing-campaigns              # Listar campanhas
GET    /automation/marketing-campaigns/:id          # Obter campanha
PUT    /automation/marketing-campaigns/:id          # Atualizar campanha
DELETE /automation/marketing-campaigns/:id          # Deletar campanha
POST   /automation/marketing-campaigns/:id/execute  # Executar campanha
POST   /automation/marketing-campaigns/:id/pause    # Pausar campanha
POST   /automation/marketing-campaigns/:id/resume   # Retomar campanha
GET    /automation/marketing-campaigns/stats        # Estatísticas
```

### Templates de Campanha
```
POST   /automation/campaign-templates               # Criar template
GET    /automation/campaign-templates               # Listar templates
GET    /automation/campaign-templates/:id           # Obter template
PUT    /automation/campaign-templates/:id           # Atualizar template
DELETE /automation/campaign-templates/:id           # Deletar template
```

## Exemplos de Uso

### Criar uma Campanha de Email
```json
{
  "name": "Campanha de Energia Solar - Janeiro 2024",
  "description": "Campanha promocional para clientes interessados em energia solar",
  "campaignType": "EMAIL",
  "category": "PROMOTIONAL",
  "subject": "Economize até 90% na sua conta de luz!",
  "content": "Olá {{name}}, descubra como economizar na sua conta de luz com energia solar...",
  "targetLeads": ["lead-id-1", "lead-id-2"],
  "scheduledAt": "2024-01-15T10:00:00Z",
  "batchSize": 100
}
```

### Executar uma Campanha
```json
{
  "executeImmediately": true
}
```

### Obter Estatísticas
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "campaignType": "EMAIL"
}
```

## Métricas Disponíveis

### Métricas de Entrega
- **Taxa de Entrega**: Percentual de mensagens entregues
- **Taxa de Bounce**: Percentual de mensagens retornadas
- **Taxa de Spam**: Percentual de mensagens marcadas como spam

### Métricas de Engajamento
- **Taxa de Abertura**: Percentual de mensagens abertas
- **Taxa de Clique**: Percentual de cliques em links
- **Taxa de Resposta**: Percentual de respostas recebidas
- **Taxa de Descadastro**: Percentual de descadastros

### Métricas de Performance
- **ROI**: Retorno sobre investimento
- **Custo por Lead**: Custo médio por lead gerado
- **Taxa de Conversão**: Percentual de conversões

## Segurança e Compliance

### LGPD
- Registro de todas as interações para auditoria
- Sistema de descadastro automático
- Controle de consentimento

### Políticas de Uso
- Limites de envio configuráveis
- Controle de frequência de campanhas
- Validação de listas de destinatários

## Próximos Passos

### Funcionalidades Planejadas
- [ ] Automação de workflows avançados
- [ ] A/B Testing de campanhas
- [ ] Segmentação comportamental avançada
- [ ] Integração com redes sociais
- [ ] Dashboard em tempo real
- [ ] Machine Learning para otimização

### Melhorias Técnicas
- [ ] Sistema de filas para envio em massa
- [ ] Cache de estatísticas
- [ ] Webhooks para eventos
- [ ] API de webhooks para integrações externas
- [ ] Sistema de templates visuais

## Contribuição

Para contribuir com este módulo:
1. Siga os padrões de arquitetura estabelecidos
2. Mantenha a compatibilidade com os módulos existentes
3. Adicione testes para novas funcionalidades
4. Documente as mudanças no README
5. Siga as convenções de nomenclatura do projeto

