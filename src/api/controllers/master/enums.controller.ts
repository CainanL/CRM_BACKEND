import { Controller, Get } from '@nestjs/common';
import { ApiTenant } from 'src/api/decorators/tenant.decorator';
import { ActivityStatus } from 'src/repos/enums/activity-status.enum';
import { ActivityType } from 'src/repos/enums/activity-type.enum';
import { AiResponseType } from 'src/repos/enums/ai-response-type.enum';
import { AutomationType } from 'src/repos/enums/automation-type.enum';
import { CalendarProvider } from 'src/repos/enums/calendar-provider.enum';
import { CampaignCategory } from 'src/repos/enums/campaign-category.enum';
import { CampaignStatus } from 'src/repos/enums/campaign-status.enum';
import { CampaignType } from 'src/repos/enums/campaign-type.enum';
import { ClientStatus } from 'src/repos/enums/client-status.enum';
import { ClientType } from 'src/repos/enums/client-type.enum';
import { CommunicationChannel } from 'src/repos/enums/communication-channel.enum';
import { ContactType } from 'src/repos/enums/contact-type.enum';
import { ContentType } from 'src/repos/enums/content-type.enum';
import { ContractType } from 'src/repos/enums/contract-type.enum';
import { ConversationStatus } from 'src/repos/enums/conversation-status.enum';
import { EmployeeStatus } from 'src/repos/enums/employee-status.enum';
import { EntityType } from 'src/repos/enums/entity-type.enum';
import { Gender } from 'src/repos/enums/gender.enum';
import { InteractionStatus } from 'src/repos/enums/interaction-status.enum';
import { InteractionTag } from 'src/repos/enums/interaction-tag.enum';
import { InteractionType } from 'src/repos/enums/interaction-type.enum';
import { LeadStatus } from 'src/repos/enums/lead-status.enum';
import { MessageDirection } from 'src/repos/enums/message-direction.enum';
import { MessagePriority } from 'src/repos/enums/message-priority.enum';
import { MessageStatus } from 'src/repos/enums/message-status.enum';
import { NotificationType } from 'src/repos/enums/notification-type.enum';
import { OpportunityCloseReason } from 'src/repos/enums/opportunity-close-reason.enum';
import { OpportunityStatus } from 'src/repos/enums/opportunity-status.enum';
import { Policies } from 'src/repos/enums/polices.enum';
import { Priority } from 'src/repos/enums/priority.enum';
import { RecipientStatus } from 'src/repos/enums/recipient-status.enum';
import { RecipientType } from 'src/repos/enums/recipient-type.enum';
import { Rules } from 'src/repos/enums/rules.enum';

@Controller('enums')
@ApiTenant()
export class EnumsController {
  
  @Get('/activity-status')
  getActivityStatus() {
    return Object.values(ActivityStatus).map(value => ({
      key: value,
      value: this.getActivityStatusTranslation(value)
    }));
  }

  @Get('/activity-type')
  getActivityType() {
    return Object.values(ActivityType).map(value => ({
      key: value,
      value: this.getActivityTypeTranslation(value)
    }));
  }

  @Get('/ai-response-type')
  getAiResponseType() {
    return Object.values(AiResponseType).map(value => ({
      key: value,
      value: this.getAiResponseTypeTranslation(value)
    }));
  }

  @Get('/automation-type')
  getAutomationType() {
    return Object.values(AutomationType).map(value => ({
      key: value,
      value: this.getAutomationTypeTranslation(value)
    }));
  }

  @Get('/calendar-provider')
  getCalendarProvider() {
    return Object.values(CalendarProvider).map(value => ({
      key: value,
      value: this.getCalendarProviderTranslation(value)
    }));
  }

  @Get('/campaign-category')
  getCampaignCategory() {
    return Object.values(CampaignCategory).map(value => ({
      key: value,
      value: this.getCampaignCategoryTranslation(value)
    }));
  }

  @Get('/campaign-status')
  getCampaignStatus() {
    return Object.values(CampaignStatus).map(value => ({
      key: value,
      value: this.getCampaignStatusTranslation(value)
    }));
  }

  @Get('/campaign-type')
  getCampaignType() {
    return Object.values(CampaignType).map(value => ({
      key: value,
      value: this.getCampaignTypeTranslation(value)
    }));
  }

  @Get('/client-status')
  getClientStatus() {
    return Object.values(ClientStatus).map(value => ({
      key: value,
      value: this.getClientStatusTranslation(value)
    }));
  }

  @Get('/client-type')
  getClientType() {
    return Object.values(ClientType).map(value => ({
      key: value,
      value: this.getClientTypeTranslation(value)
    }));
  }

  @Get('/communication-channel')
  getCommunicationChannel() {
    return Object.values(CommunicationChannel).map(value => ({
      key: value,
      value: this.getCommunicationChannelTranslation(value)
    }));
  }

  @Get('/contact-type')
  getContactType() {
    return Object.values(ContactType).map(value => ({
      key: value,
      value: this.getContactTypeTranslation(value)
    }));
  }

  @Get('/content-type')
  getContentType() {
    return Object.values(ContentType).map(value => ({
      key: value,
      value: this.getContentTypeTranslation(value)
    }));
  }

  @Get('/contract-type')
  getContractType() {
    return Object.values(ContractType).map(value => ({
      key: value,
      value: this.getContractTypeTranslation(value)
    }));
  }

  @Get('/conversation-status')
  getConversationStatus() {
    return Object.values(ConversationStatus).map(value => ({
      key: value,
      value: this.getConversationStatusTranslation(value)
    }));
  }

  @Get('/employee-status')
  getEmployeeStatus() {
    return Object.values(EmployeeStatus).map(value => ({
      key: value,
      value: this.getEmployeeStatusTranslation(value)
    }));
  }

  @Get('/entity-type')
  getEntityType() {
    return Object.values(EntityType).map(value => ({
      key: value,
      value: this.getEntityTypeTranslation(value)
    }));
  }

  @Get('/gender')
  getGender() {
    return Object.values(Gender).map(value => ({
      key: value,
      value: this.getGenderTranslation(value)
    }));
  }

  @Get('/interaction-status')
  getInteractionStatus() {
    return Object.values(InteractionStatus).map(value => ({
      key: value,
      value: this.getInteractionStatusTranslation(value)
    }));
  }

  @Get('/interaction-tag')
  getInteractionTag() {
    return Object.values(InteractionTag).map(value => ({
      key: value,
      value: this.getInteractionTagTranslation(value)
    }));
  }

  @Get('/interaction-type')
  getInteractionType() {
    return Object.values(InteractionType).map(value => ({
      key: value,
      value: this.getInteractionTypeTranslation(value)
    }));
  }

  @Get('/lead-status')
  getLeadStatus() {
    return Object.values(LeadStatus).map(value => ({
      key: value,
      value: this.getLeadStatusTranslation(value)
    }));
  }

  @Get('/message-direction')
  getMessageDirection() {
    return Object.values(MessageDirection).map(value => ({
      key: value,
      value: this.getMessageDirectionTranslation(value)
    }));
  }

  @Get('/message-priority')
  getMessagePriority() {
    return Object.values(MessagePriority).map(value => ({
      key: value,
      value: this.getMessagePriorityTranslation(value)
    }));
  }

  @Get('/message-status')
  getMessageStatus() {
    return Object.values(MessageStatus).map(value => ({
      key: value,
      value: this.getMessageStatusTranslation(value)
    }));
  }

  @Get('/notification-type')
  getNotificationType() {
    return Object.values(NotificationType).map(value => ({
      key: value,
      value: this.getNotificationTypeTranslation(value)
    }));
  }

  @Get('/opportunity-close-reason')
  getOpportunityCloseReason() {
    return Object.values(OpportunityCloseReason).map(value => ({
      key: value,
      value: this.getOpportunityCloseReasonTranslation(value)
    }));
  }

  @Get('/opportunity-status')
  getOpportunityStatus() {
    return Object.values(OpportunityStatus).map(value => ({
      key: value,
      value: this.getOpportunityStatusTranslation(value)
    }));
  }

  @Get('/polices')
  getPolices() {
    return Object.values(Policies).map(value => ({
      key: value,
      value: this.getPolicesTranslation(value)
    }));
  }

  @Get('/priority')
  getPriority() {
    return Object.values(Priority).map(value => ({
      key: value,
      value: this.getPriorityTranslation(value)
    }));
  }

  @Get('/recipient-status')
  getRecipientStatus() {
    return Object.values(RecipientStatus).map(value => ({
      key: value,
      value: this.getRecipientStatusTranslation(value)
    }));
  }

  @Get('/recipient-type')
  getRecipientType() {
    return Object.values(RecipientType).map(value => ({
      key: value,
      value: this.getRecipientTypeTranslation(value)
    }));
  }

  @Get('/rules')
  getRules() {
    return Object.values(Rules).map(value => ({
      key: value,
      value: this.getRulesTranslation(value)
    }));
  }

  // Translation methods
  private getActivityStatusTranslation(value: string): string {
    const translations = {
      'PENDING': 'Pendente',
      'IN_PROGRESS': 'Em Andamento',
      'COMPLETED': 'Concluído',
      'OVERDUE': 'Atrasado',
      'CANCELLED': 'Cancelado'
    };
    return translations[value] || value;
  }

  private getActivityTypeTranslation(value: string): string {
    const translations = {
      'CALL': 'Ligação',
      'EMAIL': 'E-mail',
      'MEETING': 'Reunião',
      'TASK': 'Tarefa',
      'NOTE': 'Nota',
      'FOLLOW_UP': 'Acompanhamento'
    };
    return translations[value] || value;
  }

  private getAiResponseTypeTranslation(value: string): string {
    const translations = {
      'TEXT': 'Texto',
      'JSON': 'JSON',
      'HTML': 'HTML',
      'MARKDOWN': 'Markdown'
    };
    return translations[value] || value;
  }

  private getAutomationTypeTranslation(value: string): string {
    const translations = {
      'EMAIL_SEQUENCE': 'Sequência de E-mail',
      'SMS_SEQUENCE': 'Sequência de SMS',
      'CALL_REMINDER': 'Lembrete de Ligação',
      'FOLLOW_UP': 'Acompanhamento',
      'WELCOME': 'Boas-vindas',
      'NURTURING': 'Nutrição de Lead'
    };
    return translations[value] || value;
  }

  private getCalendarProviderTranslation(value: string): string {
    const translations = {
      'GOOGLE': 'Google Calendar',
      'OUTLOOK': 'Microsoft Outlook',
      'APPLE': 'Apple Calendar',
      'EXCHANGE': 'Exchange Server'
    };
    return translations[value] || value;
  }

  private getCampaignCategoryTranslation(value: string): string {
    const translations = {
      'EMAIL': 'E-mail',
      'SMS': 'SMS',
      'SOCIAL_MEDIA': 'Rede Social',
      'DIRECT_MAIL': 'Correio Direto',
      'DIGITAL_ADS': 'Anúncios Digitais',
      'CONTENT': 'Conteúdo'
    };
    return translations[value] || value;
  }

  private getCampaignStatusTranslation(value: string): string {
    const translations = {
      'DRAFT': 'Rascunho',
      'SCHEDULED': 'Agendada',
      'RUNNING': 'Em Execução',
      'PAUSED': 'Pausada',
      'COMPLETED': 'Concluída',
      'CANCELLED': 'Cancelada'
    };
    return translations[value] || value;
  }

  private getCampaignTypeTranslation(value: string): string {
    const translations = {
      'MARKETING': 'Marketing',
      'SALES': 'Vendas',
      'NURTURING': 'Nutrição de Lead',
      'RETENTION': 'Retenção',
      'REACTIVATION': 'Reativação',
      'PROMOTIONAL': 'Promocional'
    };
    return translations[value] || value;
  }

  private getClientStatusTranslation(value: string): string {
    const translations = {
      'ACTIVE': 'Ativo',
      'INACTIVE': 'Inativo',
      'PENDING': 'Pendente',
      'BLOCKED': 'Bloqueado'
    };
    return translations[value] || value;
  }

  private getClientTypeTranslation(value: string): string {
    const translations = {
      'INDIVIDUAL': 'Pessoa Física',
      'COMPANY': 'Pessoa Jurídica',
      'GOVERNMENT': 'Governo',
      'NON_PROFIT': 'Sem Fins Lucrativos'
    };
    return translations[value] || value;
  }

  private getCommunicationChannelTranslation(value: string): string {
    const translations = {
      'EMAIL': 'E-mail',
      'PHONE': 'Telefone',
      'SMS': 'SMS',
      'WHATSAPP': 'WhatsApp',
      'FACEBOOK': 'Facebook',
      'INSTAGRAM': 'Instagram',
      'LINKEDIN': 'LinkedIn',
      'TWITTER': 'Twitter',
      'TELEGRAM': 'Telegram',
      'IN_PERSON': 'Presencial'
    };
    return translations[value] || value;
  }

  private getContactTypeTranslation(value: string): string {
    const translations = {
      'PRIMARY': 'Principal',
      'SECONDARY': 'Secundário',
      'EMERGENCY': 'Emergência',
      'BILLING': 'Cobrança',
      'TECHNICAL': 'Técnico',
      'SALES': 'Vendas'
    };
    return translations[value] || value;
  }

  private getContentTypeTranslation(value: string): string {
    const translations = {
      'TEXT': 'Texto',
      'HTML': 'HTML',
      'IMAGE': 'Imagem',
      'VIDEO': 'Vídeo',
      'AUDIO': 'Áudio',
      'DOCUMENT': 'Documento',
      'PDF': 'PDF',
      'SPREADSHEET': 'Planilha',
      'PRESENTATION': 'Apresentação'
    };
    return translations[value] || value;
  }

  private getContractTypeTranslation(value: string): string {
    const translations = {
      'SERVICE': 'Serviço',
      'PRODUCT': 'Produto',
      'SUBSCRIPTION': 'Assinatura',
      'MAINTENANCE': 'Manutenção',
      'SUPPORT': 'Suporte',
      'LICENSE': 'Licença'
    };
    return translations[value] || value;
  }

  private getConversationStatusTranslation(value: string): string {
    const translations = {
      'OPEN': 'Aberta',
      'CLOSED': 'Fechada',
      'PENDING': 'Pendente',
      'RESOLVED': 'Resolvida',
      'ESCALATED': 'Escalada'
    };
    return translations[value] || value;
  }

  private getEmployeeStatusTranslation(value: string): string {
    const translations = {
      'ACTIVE': 'Ativo',
      'INACTIVE': 'Inativo',
      'ON_LEAVE': 'Afastado',
      'TERMINATED': 'Demitido',
      'SUSPENDED': 'Suspenso'
    };
    return translations[value] || value;
  }

  private getEntityTypeTranslation(value: string): string {
    const translations = {
      'USER': 'Usuário',
      'CLIENT': 'Cliente',
      'LEAD': 'Lead',
      'OPPORTUNITY': 'Oportunidade',
      'CONTACT': 'Contato',
      'COMPANY': 'Empresa'
    };
    return translations[value] || value;
  }

  private getGenderTranslation(value: string): string {
    const translations = {
      'MALE': 'Masculino',
      'FEMALE': 'Feminino',
      'OTHER': 'Outro'
    };
    return translations[value] || value;
  }

  private getInteractionStatusTranslation(value: string): string {
    const translations = {
      'PENDING': 'Pendente',
      'IN_PROGRESS': 'Em Andamento',
      'COMPLETED': 'Concluída',
      'CANCELLED': 'Cancelada',
      'FAILED': 'Falhou'
    };
    return translations[value] || value;
  }

  private getInteractionTagTranslation(value: string): string {
    const translations = {
      'HOT': 'Quente',
      'WARM': 'Morno',
      'COLD': 'Frio',
      'FOLLOW_UP': 'Acompanhamento',
      'URGENT': 'Urgente',
      'IMPORTANT': 'Importante'
    };
    return translations[value] || value;
  }

  private getInteractionTypeTranslation(value: string): string {
    const translations = {
      'CALL': 'Ligação',
      'EMAIL': 'E-mail',
      'SMS': 'SMS',
      'MEETING': 'Reunião',
      'VISIT': 'Visita',
      'DEMO': 'Demonstração',
      'PRESENTATION': 'Apresentação'
    };
    return translations[value] || value;
  }

  private getLeadStatusTranslation(value: string): string {
    const translations = {
      'HOT': 'Quente',
      'WARM': 'Morno',
      'COLD': 'Frio',
      'NEW': 'Novo',
      'CONTACTED': 'Contatado',
      'QUALIFIED': 'Qualificado',
      'PROPOSAL_SENT': 'Proposta Enviada',
      'NEGOTIATION': 'Em Negociação',
      'WON': 'Ganho',
      'LOST': 'Perdido'
    };
    return translations[value] || value;
  }

  private getMessageDirectionTranslation(value: string): string {
    const translations = {
      'INBOUND': 'Entrada',
      'OUTBOUND': 'Saída'
    };
    return translations[value] || value;
  }

  private getMessagePriorityTranslation(value: string): string {
    const translations = {
      'LOW': 'Baixa',
      'MEDIUM': 'Média',
      'HIGH': 'Alta',
      'URGENT': 'Urgente'
    };
    return translations[value] || value;
  }

  private getMessageStatusTranslation(value: string): string {
    const translations = {
      'DRAFT': 'Rascunho',
      'SENT': 'Enviada',
      'DELIVERED': 'Entregue',
      'READ': 'Lida',
      'FAILED': 'Falhou',
      'BOUNCED': 'Retornou'
    };
    return translations[value] || value;
  }

  private getNotificationTypeTranslation(value: string): string {
    const translations = {
      'EMAIL': 'E-mail',
      'SMS': 'SMS',
      'PUSH': 'Push',
      'IN_APP': 'No Aplicativo',
      'WEBHOOK': 'Webhook'
    };
    return translations[value] || value;
  }

  private getOpportunityCloseReasonTranslation(value: string): string {
    const translations = {
      'WON': 'Ganho',
      'LOST_PRICE': 'Perdido - Preço',
      'LOST_COMPETITION': 'Perdido - Concorrência',
      'LOST_NO_DECISION': 'Perdido - Sem Decisão',
      'LOST_OTHER': 'Perdido - Outro',
      'CANCELLED': 'Cancelado'
    };
    return translations[value] || value;
  }

  private getOpportunityStatusTranslation(value: string): string {
    const translations = {
      'NEW': 'Novo',
      'QUALIFIED': 'Qualificado',
      'PROPOSAL': 'Proposta',
      'NEGOTIATION': 'Negociação',
      'CLOSED_WON': 'Fechado - Ganho',
      'CLOSED_LOST': 'Fechado - Perdido'
    };
    return translations[value] || value;
  }

  private getPolicesTranslation(value: string): string {
    const translations = {
      'ADMIN': 'Administrador',
      'USER': 'Usuário',
      'MANAGER': 'Gerente',
      'VIEWER': 'Visualizador',
      'EDITOR': 'Editor'
    };
    return translations[value] || value;
  }

  private getPriorityTranslation(value: string): string {
    const translations = {
      'LOW': 'Baixa',
      'MEDIUM': 'Média',
      'HIGH': 'Alta',
      'URGENT': 'Urgente'
    };
    return translations[value] || value;
  }

  private getRecipientStatusTranslation(value: string): string {
    const translations = {
      'ACTIVE': 'Ativo',
      'INACTIVE': 'Inativo',
      'UNSUBSCRIBED': 'Descadastrado',
      'BOUNCED': 'Retornou',
      'COMPLAINED': 'Reclamou'
    };
    return translations[value] || value;
  }

  private getRecipientTypeTranslation(value: string): string {
    const translations = {
      'LEAD': 'Lead',
      'CLIENT': 'Cliente',
      'PROSPECT': 'Prospect',
      'SUBSCRIBER': 'Assinante',
      'PARTNER': 'Parceiro'
    };
    return translations[value] || value;
  }

  private getRulesTranslation(value: string): string {
    const translations = {
      'CREATE': 'Criar',
      'READ': 'Ler',
      'UPDATE': 'Atualizar',
      'DELETE': 'Excluir',
      'EXECUTE': 'Executar'
    };
    return translations[value] || value;
  }
}
