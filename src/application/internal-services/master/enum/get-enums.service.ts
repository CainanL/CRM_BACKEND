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
            activityStatus: this.getEnumItems(ActivityStatus, this.getActivityStatusTranslation),
            activityType: this.getEnumItems(ActivityType, this.getActivityTypeTranslation),
            aiResponseType: this.getEnumItems(AiResponseType, this.getAiResponseTypeTranslation),
            automationType: this.getEnumItems(AutomationType, this.getAutomationTypeTranslation),
            calendarProvider: this.getEnumItems(CalendarProvider, this.getCalendarProviderTranslation),
            campaignCategory: this.getEnumItems(CampaignCategory, this.getCampaignCategoryTranslation),
            campaignStatus: this.getEnumItems(CampaignStatus, this.getCampaignStatusTranslation),
            campaignType: this.getEnumItems(CampaignType, this.getCampaignTypeTranslation),
            clientStatus: this.getEnumItems(ClientStatus, this.getClientStatusTranslation),
            clientType: this.getEnumItems(ClientType, this.getClientTypeTranslation),
            communicationChannel: this.getEnumItems(CommunicationChannel, this.getCommunicationChannelTranslation),
            contactType: this.getEnumItems(ContactType, this.getContactTypeTranslation),
            contentType: this.getEnumItems(ContentType, this.getContentTypeTranslation),
            contractType: this.getEnumItems(ContractType, this.getContractTypeTranslation),
            conversationStatus: this.getEnumItems(ConversationStatus, this.getConversationStatusTranslation),
            employeeStatus: this.getEnumItems(EmployeeStatus, this.getEmployeeStatusTranslation),
            entityType: this.getEnumItems(EntityType, this.getEntityTypeTranslation),
            gender: this.getEnumItems(Gender, this.getGenderTranslation),
            interactionStatus: this.getEnumItems(InteractionStatus, this.getInteractionStatusTranslation),
            interactionTag: this.getEnumItems(InteractionTag, this.getInteractionTagTranslation),
            interactionType: this.getEnumItems(InteractionType, this.getInteractionTypeTranslation),
            leadStatus: this.getEnumItems(LeadStatus, this.getLeadStatusTranslation),
            messageDirection: this.getEnumItems(MessageDirection, this.getMessageDirectionTranslation),
            messagePriority: this.getEnumItems(MessagePriority, this.getMessagePriorityTranslation),
            messageStatus: this.getEnumItems(MessageStatus, this.getMessageStatusTranslation),
            notificationType: this.getEnumItems(NotificationType, this.getNotificationTypeTranslation),
            opportunityCloseReason: this.getEnumItems(OpportunityCloseReason, this.getOpportunityCloseReasonTranslation),
            opportunityStatus: this.getEnumItems(OpportunityStatus, this.getOpportunityStatusTranslation),
            policies: this.getEnumItems(Policies, this.getPolicesTranslation),
            priority: this.getEnumItems(Priority, this.getPriorityTranslation),
            recipientStatus: this.getEnumItems(RecipientStatus, this.getRecipientStatusTranslation),
            recipientType: this.getEnumItems(RecipientType, this.getRecipientTypeTranslation),
            rules: this.getEnumItems(Rules, this.getRulesTranslation)
        };
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value)));
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
