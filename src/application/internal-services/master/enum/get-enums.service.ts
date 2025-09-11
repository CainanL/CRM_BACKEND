import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { AiResponseType } from "src/repos/enums/ai-response-type.enum";
import { AutomationType } from "src/repos/enums/automation-type.enum";
import { CalendarProvider } from "src/repos/enums/calendar-provider.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { ClientStatus } from "src/repos/enums/client-status.enum";
import { ClientType } from "src/repos/enums/client-type.enum";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";
import { ContactType } from "src/repos/enums/contact-type.enum";
import { ContentType } from "src/repos/enums/content-type.enum";
import { ContractType } from "src/repos/enums/contract-type.enum";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";
import { Gender } from "src/repos/enums/gender.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { LeadStatus } from "src/repos/enums/lead-status.enum";
import { MessageDirection } from "src/repos/enums/message-direction.enum";
import { MessagePriority } from "src/repos/enums/message-priority.enum";
import { MessageStatus } from "src/repos/enums/message-status.enum";
import { NotificationType } from "src/repos/enums/notification-type.enum";
import { OpportunityCloseReason } from "src/repos/enums/opportunity-close-reason.enum";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";
import { Policies } from "src/repos/enums/polices.enum";
import { Priority } from "src/repos/enums/priority.enum";
import { RecipientStatus } from "src/repos/enums/recipient-status.enum";
import { RecipientType } from "src/repos/enums/recipient-type.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Injectable()
export class GetEnumsService extends HandlerBase<null, { [key: string]: EnumItemVm[] }> {
    
    protected async executeCore(request: null, data?: any): Promise<{ [key: string]: EnumItemVm[] }> {
        return {
            activityStatus: this.getEnumItems(ActivityStatus, this.getActivityStatusTranslation, this.getActivityStatusColor),
            activityType: this.getEnumItems(ActivityType, this.getActivityTypeTranslation, this.getActivityTypeColor),
            aiResponseType: this.getEnumItems(AiResponseType, this.getAiResponseTypeTranslation, this.getAiResponseTypeColor),
            automationType: this.getEnumItems(AutomationType, this.getAutomationTypeTranslation, this.getAutomationTypeColor),
            calendarProvider: this.getEnumItems(CalendarProvider, this.getCalendarProviderTranslation, this.getCalendarProviderColor),
            campaignCategory: this.getEnumItems(CampaignCategory, this.getCampaignCategoryTranslation, this.getCampaignCategoryColor),
            campaignStatus: this.getEnumItems(CampaignStatus, this.getCampaignStatusTranslation, this.getCampaignStatusColor),
            campaignType: this.getEnumItems(CampaignType, this.getCampaignTypeTranslation, this.getCampaignTypeColor),
            clientStatus: this.getEnumItems(ClientStatus, this.getClientStatusTranslation, this.getClientStatusColor),
            clientType: this.getEnumItems(ClientType, this.getClientTypeTranslation, this.getClientTypeColor),
            communicationChannel: this.getEnumItems(CommunicationChannel, this.getCommunicationChannelTranslation, this.getCommunicationChannelColor),
            contactType: this.getEnumItems(ContactType, this.getContactTypeTranslation, this.getContactTypeColor),
            contentType: this.getEnumItems(ContentType, this.getContentTypeTranslation, this.getContentTypeColor),
            contractType: this.getEnumItems(ContractType, this.getContractTypeTranslation, this.getContractTypeColor),
            conversationStatus: this.getEnumItems(ConversationStatus, this.getConversationStatusTranslation, this.getConversationStatusColor),
            employeeStatus: this.getEnumItems(EmployeeStatus, this.getEmployeeStatusTranslation, this.getEmployeeStatusColor),
            entityType: this.getEnumItems(EntityType, this.getEntityTypeTranslation, this.getEntityTypeColor),
            gender: this.getEnumItems(Gender, this.getGenderTranslation, this.getGenderColor),
            interactionStatus: this.getEnumItems(InteractionStatus, this.getInteractionStatusTranslation, this.getInteractionStatusColor),
            interactionTag: this.getEnumItems(InteractionTag, this.getInteractionTagTranslation, this.getInteractionTagColor),
            interactionType: this.getEnumItems(InteractionType, this.getInteractionTypeTranslation, this.getInteractionTypeColor),
            leadStatus: this.getEnumItems(LeadStatus, this.getLeadStatusTranslation, this.getLeadStatusColor),
            messageDirection: this.getEnumItems(MessageDirection, this.getMessageDirectionTranslation, this.getMessageDirectionColor),
            messagePriority: this.getEnumItems(MessagePriority, this.getMessagePriorityTranslation, this.getMessagePriorityColor),
            messageStatus: this.getEnumItems(MessageStatus, this.getMessageStatusTranslation, this.getMessageStatusColor),
            notificationType: this.getEnumItems(NotificationType, this.getNotificationTypeTranslation, this.getNotificationTypeColor),
            opportunityCloseReason: this.getEnumItems(OpportunityCloseReason, this.getOpportunityCloseReasonTranslation, this.getOpportunityCloseReasonColor),
            opportunityStatus: this.getEnumItems(OpportunityStatus, this.getOpportunityStatusTranslation, this.getOpportunityStatusColor),
            policies: this.getEnumItems(Policies, this.getPolicesTranslation, this.getPolicesColor),
            priority: this.getEnumItems(Priority, this.getPriorityTranslation, this.getPriorityColor),
            recipientStatus: this.getEnumItems(RecipientStatus, this.getRecipientStatusTranslation, this.getRecipientStatusColor),
            recipientType: this.getEnumItems(RecipientType, this.getRecipientTypeTranslation, this.getRecipientTypeColor),
            rules: this.getEnumItems(Rules, this.getRulesTranslation, this.getRulesColor)
        };
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
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

    // Color methods - Cores semânticas para cada enum
    private getActivityStatusColor(value: string): string {
        const colors = {
            'PENDING': '#FFA500',      // Laranja - Aguardando
            'IN_PROGRESS': '#2196F3',  // Azul - Em andamento
            'COMPLETED': '#4CAF50',    // Verde - Concluído
            'OVERDUE': '#F44336',      // Vermelho - Atrasado
            'CANCELLED': '#9E9E9E'     // Cinza - Cancelado
        };
        return colors[value] || '#6B7280';
    }

    private getActivityTypeColor(value: string): string {
        const colors = {
            'CALL': '#3B82F6',        // Azul - Ligação
            'EMAIL': '#10B981',        // Verde - E-mail
            'MEETING': '#8B5CF6',      // Roxo - Reunião
            'TASK': '#F59E0B',         // Amarelo - Tarefa
            'NOTE': '#6B7280',         // Cinza - Nota
            'FOLLOW_UP': '#EF4444'     // Vermelho - Acompanhamento
        };
        return colors[value] || '#6B7280';
    }

    private getAiResponseTypeColor(value: string): string {
        const colors = {
            'TEXT': '#3B82F6',        // Azul - Texto
            'JSON': '#10B981',         // Verde - JSON
            'HTML': '#F59E0B',         // Amarelo - HTML
            'MARKDOWN': '#8B5CF6'      // Roxo - Markdown
        };
        return colors[value] || '#6B7280';
    }

    private getAutomationTypeColor(value: string): string {
        const colors = {
            'EMAIL_SEQUENCE': '#10B981',   // Verde - E-mail
            'SMS_SEQUENCE': '#3B82F6',     // Azul - SMS
            'CALL_REMINDER': '#F59E0B',    // Amarelo - Lembrete
            'FOLLOW_UP': '#EF4444',        // Vermelho - Acompanhamento
            'WELCOME': '#8B5CF6',          // Roxo - Boas-vindas
            'NURTURING': '#06B6D4'         // Ciano - Nutrição
        };
        return colors[value] || '#6B7280';
    }

    private getCalendarProviderColor(value: string): string {
        const colors = {
            'GOOGLE': '#4285F4',       // Azul Google
            'OUTLOOK': '#0078D4',      // Azul Microsoft
            'APPLE': '#000000',        // Preto Apple
            'EXCHANGE': '#0078D4'      // Azul Exchange
        };
        return colors[value] || '#6B7280';
    }

    private getCampaignCategoryColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',        // Verde - E-mail
            'SMS': '#3B82F6',          // Azul - SMS
            'SOCIAL_MEDIA': '#8B5CF6', // Roxo - Social
            'DIRECT_MAIL': '#F59E0B',  // Amarelo - Correio
            'DIGITAL_ADS': '#EF4444',  // Vermelho - Anúncios
            'CONTENT': '#06B6D4'       // Ciano - Conteúdo
        };
        return colors[value] || '#6B7280';
    }

    private getCampaignStatusColor(value: string): string {
        const colors = {
            'DRAFT': '#6B7280',        // Cinza - Rascunho
            'SCHEDULED': '#3B82F6',    // Azul - Agendada
            'RUNNING': '#10B981',      // Verde - Em execução
            'PAUSED': '#F59E0B',       // Amarelo - Pausada
            'COMPLETED': '#4CAF50',    // Verde - Concluída
            'CANCELLED': '#F44336'     // Vermelho - Cancelada
        };
        return colors[value] || '#6B7280';
    }

    private getCampaignTypeColor(value: string): string {
        const colors = {
            'MARKETING': '#8B5CF6',    // Roxo - Marketing
            'SALES': '#EF4444',        // Vermelho - Vendas
            'NURTURING': '#06B6D4',    // Ciano - Nutrição
            'RETENTION': '#10B981',    // Verde - Retenção
            'REACTIVATION': '#F59E0B', // Amarelo - Reativação
            'PROMOTIONAL': '#EC4899'   // Rosa - Promocional
        };
        return colors[value] || '#6B7280';
    }

    private getClientStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',       // Verde - Ativo
            'INACTIVE': '#6B7280',     // Cinza - Inativo
            'PENDING': '#F59E0B',      // Amarelo - Pendente
            'BLOCKED': '#F44336'       // Vermelho - Bloqueado
        };
        return colors[value] || '#6B7280';
    }

    private getClientTypeColor(value: string): string {
        const colors = {
            'INDIVIDUAL': '#3B82F6',   // Azul - Pessoa Física
            'COMPANY': '#10B981',      // Verde - Pessoa Jurídica
            'GOVERNMENT': '#8B5CF6',   // Roxo - Governo
            'NON_PROFIT': '#F59E0B'    // Amarelo - Sem fins lucrativos
        };
        return colors[value] || '#6B7280';
    }

    private getCommunicationChannelColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',        // Verde - E-mail
            'PHONE': '#3B82F6',        // Azul - Telefone
            'SMS': '#06B6D4',          // Ciano - SMS
            'WHATSAPP': '#25D366',     // Verde WhatsApp
            'FACEBOOK': '#1877F2',     // Azul Facebook
            'INSTAGRAM': '#E4405F',    // Rosa Instagram
            'LINKEDIN': '#0A66C2',     // Azul LinkedIn
            'TWITTER': '#1DA1F2',      // Azul Twitter
            'TELEGRAM': '#0088CC',     // Azul Telegram
            'IN_PERSON': '#8B5CF6'     // Roxo - Presencial
        };
        return colors[value] || '#6B7280';
    }

    private getContactTypeColor(value: string): string {
        const colors = {
            'PRIMARY': '#10B981',      // Verde - Principal
            'SECONDARY': '#3B82F6',    // Azul - Secundário
            'EMERGENCY': '#F44336',    // Vermelho - Emergência
            'BILLING': '#F59E0B',      // Amarelo - Cobrança
            'TECHNICAL': '#8B5CF6',    // Roxo - Técnico
            'SALES': '#EF4444'         // Vermelho - Vendas
        };
        return colors[value] || '#6B7280';
    }

    private getContentTypeColor(value: string): string {
        const colors = {
            'TEXT': '#6B7280',        // Cinza - Texto
            'HTML': '#F59E0B',        // Amarelo - HTML
            'IMAGE': '#8B5CF6',       // Roxo - Imagem
            'VIDEO': '#EF4444',       // Vermelho - Vídeo
            'AUDIO': '#10B981',       // Verde - Áudio
            'DOCUMENT': '#3B82F6',    // Azul - Documento
            'PDF': '#F44336',         // Vermelho - PDF
            'SPREADSHEET': '#4CAF50', // Verde - Planilha
            'PRESENTATION': '#FF9800' // Laranja - Apresentação
        };
        return colors[value] || '#6B7280';
    }

    private getContractTypeColor(value: string): string {
        const colors = {
            'SERVICE': '#10B981',     // Verde - Serviço
            'PRODUCT': '#3B82F6',     // Azul - Produto
            'SUBSCRIPTION': '#8B5CF6', // Roxo - Assinatura
            'MAINTENANCE': '#F59E0B', // Amarelo - Manutenção
            'SUPPORT': '#06B6D4',     // Ciano - Suporte
            'LICENSE': '#EF4444'      // Vermelho - Licença
        };
        return colors[value] || '#6B7280';
    }

    private getConversationStatusColor(value: string): string {
        const colors = {
            'OPEN': '#10B981',        // Verde - Aberta
            'CLOSED': '#6B7280',      // Cinza - Fechada
            'PENDING': '#F59E0B',     // Amarelo - Pendente
            'RESOLVED': '#4CAF50',    // Verde - Resolvida
            'ESCALATED': '#F44336'    // Vermelho - Escalada
        };
        return colors[value] || '#6B7280';
    }

    private getEmployeeStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',      // Verde - Ativo
            'INACTIVE': '#6B7280',    // Cinza - Inativo
            'ON_LEAVE': '#F59E0B',    // Amarelo - Afastado
            'TERMINATED': '#F44336',  // Vermelho - Demitido
            'SUSPENDED': '#EF4444'    // Vermelho - Suspenso
        };
        return colors[value] || '#6B7280';
    }

    private getEntityTypeColor(value: string): string {
        const colors = {
            'USER': '#3B82F6',        // Azul - Usuário
            'CLIENT': '#10B981',      // Verde - Cliente
            'LEAD': '#F59E0B',        // Amarelo - Lead
            'OPPORTUNITY': '#8B5CF6', // Roxo - Oportunidade
            'CONTACT': '#06B6D4',     // Ciano - Contato
            'COMPANY': '#EF4444'      // Vermelho - Empresa
        };
        return colors[value] || '#6B7280';
    }

    private getGenderColor(value: string): string {
        const colors = {
            'MALE': '#3B82F6',        // Azul - Masculino
            'FEMALE': '#EC4899',      // Rosa - Feminino
            'OTHER': '#8B5CF6'        // Roxo - Outro
        };
        return colors[value] || '#6B7280';
    }

    private getInteractionStatusColor(value: string): string {
        const colors = {
            'PENDING': '#F59E0B',     // Amarelo - Pendente
            'IN_PROGRESS': '#3B82F6', // Azul - Em andamento
            'COMPLETED': '#10B981',   // Verde - Concluída
            'CANCELLED': '#6B7280',   // Cinza - Cancelada
            'FAILED': '#F44336'       // Vermelho - Falhou
        };
        return colors[value] || '#6B7280';
    }

    private getInteractionTagColor(value: string): string {
        const colors = {
            'HOT': '#F44336',         // Vermelho - Quente
            'WARM': '#FF9800',        // Laranja - Morno
            'COLD': '#2196F3',        // Azul - Frio
            'FOLLOW_UP': '#F59E0B',   // Amarelo - Acompanhamento
            'URGENT': '#EF4444',      // Vermelho - Urgente
            'IMPORTANT': '#8B5CF6'    // Roxo - Importante
        };
        return colors[value] || '#6B7280';
    }

    private getInteractionTypeColor(value: string): string {
        const colors = {
            'CALL': '#3B82F6',        // Azul - Ligação
            'EMAIL': '#10B981',       // Verde - E-mail
            'SMS': '#06B6D4',         // Ciano - SMS
            'MEETING': '#8B5CF6',     // Roxo - Reunião
            'VISIT': '#F59E0B',       // Amarelo - Visita
            'DEMO': '#EF4444',        // Vermelho - Demonstração
            'PRESENTATION': '#FF9800' // Laranja - Apresentação
        };
        return colors[value] || '#6B7280';
    }

    private getLeadStatusColor(value: string): string {
        const colors = {
            'HOT': '#F44336',         // Vermelho - Quente
            'WARM': '#FF9800',        // Laranja - Morno
            'COLD': '#2196F3',        // Azul - Frio
            'NEW': '#10B981',         // Verde - Novo
            'CONTACTED': '#3B82F6',   // Azul - Contatado
            'QUALIFIED': '#8B5CF6',   // Roxo - Qualificado
            'PROPOSAL_SENT': '#F59E0B', // Amarelo - Proposta enviada
            'NEGOTIATION': '#06B6D4', // Ciano - Em negociação
            'WON': '#4CAF50',         // Verde - Ganho
            'LOST': '#F44336'         // Vermelho - Perdido
        };
        return colors[value] || '#6B7280';
    }

    private getMessageDirectionColor(value: string): string {
        const colors = {
            'INBOUND': '#10B981',     // Verde - Entrada
            'OUTBOUND': '#3B82F6'     // Azul - Saída
        };
        return colors[value] || '#6B7280';
    }

    private getMessagePriorityColor(value: string): string {
        const colors = {
            'LOW': '#10B981',         // Verde - Baixa
            'MEDIUM': '#F59E0B',      // Amarelo - Média
            'HIGH': '#FF9800',        // Laranja - Alta
            'URGENT': '#F44336'       // Vermelho - Urgente
        };
        return colors[value] || '#6B7280';
    }

    private getMessageStatusColor(value: string): string {
        const colors = {
            'DRAFT': '#6B7280',       // Cinza - Rascunho
            'SENT': '#3B82F6',        // Azul - Enviada
            'DELIVERED': '#10B981',   // Verde - Entregue
            'READ': '#4CAF50',        // Verde - Lida
            'FAILED': '#F44336',      // Vermelho - Falhou
            'BOUNCED': '#EF4444'      // Vermelho - Retornou
        };
        return colors[value] || '#6B7280';
    }

    private getNotificationTypeColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',       // Verde - E-mail
            'SMS': '#3B82F6',         // Azul - SMS
            'PUSH': '#8B5CF6',        // Roxo - Push
            'IN_APP': '#F59E0B',      // Amarelo - No aplicativo
            'WEBHOOK': '#06B6D4'      // Ciano - Webhook
        };
        return colors[value] || '#6B7280';
    }

    private getOpportunityCloseReasonColor(value: string): string {
        const colors = {
            'WON': '#4CAF50',         // Verde - Ganho
            'LOST_PRICE': '#F44336',  // Vermelho - Perdido preço
            'LOST_COMPETITION': '#EF4444', // Vermelho - Perdido concorrência
            'LOST_NO_DECISION': '#F59E0B', // Amarelo - Perdido sem decisão
            'LOST_OTHER': '#6B7280',  // Cinza - Perdido outro
            'CANCELLED': '#9E9E9E'    // Cinza - Cancelado
        };
        return colors[value] || '#6B7280';
    }

    private getOpportunityStatusColor(value: string): string {
        const colors = {
            'NEW': '#10B981',         // Verde - Novo
            'QUALIFIED': '#8B5CF6',   // Roxo - Qualificado
            'PROPOSAL': '#F59E0B',    // Amarelo - Proposta
            'NEGOTIATION': '#06B6D4', // Ciano - Negociação
            'CLOSED_WON': '#4CAF50',  // Verde - Fechado ganho
            'CLOSED_LOST': '#F44336'  // Vermelho - Fechado perdido
        };
        return colors[value] || '#6B7280';
    }

    private getPolicesColor(value: string): string {
        const colors = {
            'ADMIN': '#F44336',       // Vermelho - Administrador
            'USER': '#3B82F6',        // Azul - Usuário
            'MANAGER': '#8B5CF6',     // Roxo - Gerente
            'VIEWER': '#6B7280',      // Cinza - Visualizador
            'EDITOR': '#10B981'       // Verde - Editor
        };
        return colors[value] || '#6B7280';
    }

    private getPriorityColor(value: string): string {
        const colors = {
            'LOW': '#10B981',         // Verde - Baixa
            'MEDIUM': '#F59E0B',      // Amarelo - Média
            'HIGH': '#FF9800',        // Laranja - Alta
            'URGENT': '#F44336'       // Vermelho - Urgente
        };
        return colors[value] || '#6B7280';
    }

    private getRecipientStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',      // Verde - Ativo
            'INACTIVE': '#6B7280',    // Cinza - Inativo
            'UNSUBSCRIBED': '#F59E0B', // Amarelo - Descadastrado
            'BOUNCED': '#F44336',     // Vermelho - Retornou
            'COMPLAINED': '#EF4444'   // Vermelho - Reclamou
        };
        return colors[value] || '#6B7280';
    }

    private getRecipientTypeColor(value: string): string {
        const colors = {
            'LEAD': '#F59E0B',        // Amarelo - Lead
            'CLIENT': '#10B981',      // Verde - Cliente
            'PROSPECT': '#3B82F6',    // Azul - Prospect
            'SUBSCRIBER': '#8B5CF6',  // Roxo - Assinante
            'PARTNER': '#06B6D4'      // Ciano - Parceiro
        };
        return colors[value] || '#6B7280';
    }

    private getRulesColor(value: string): string {
        const colors = {
            'CREATE': '#10B981',      // Verde - Criar
            'READ': '#3B82F6',        // Azul - Ler
            'UPDATE': '#F59E0B',      // Amarelo - Atualizar
            'DELETE': '#F44336',      // Vermelho - Excluir
            'EXECUTE': '#8B5CF6'      // Roxo - Executar
        };
        return colors[value] || '#6B7280';
    }
}
