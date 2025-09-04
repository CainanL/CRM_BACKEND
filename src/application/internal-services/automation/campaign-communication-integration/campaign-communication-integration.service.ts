import { Injectable } from "@nestjs/common";
import { SendMessageService } from "src/application/internal-services/communication/send-message/send-message.service";
import { EmailService } from "src/application/internal-services/email/email.service";
import { Logger } from "@nestjs/common";

@Injectable()
export class CampaignCommunicationIntegrationService {
    private readonly logger = new Logger(CampaignCommunicationIntegrationService.name);

    constructor(
        private readonly sendMessageService: SendMessageService,
        private readonly emailService: EmailService
    ) {}

    /**
     * Envia mensagem através do canal apropriado
     */
    async sendCampaignMessage(params: {
        campaignType: string;
        content: string;
        subject?: string;
        recipientEmail?: string;
        recipientPhone?: string;
        recipientName: string;
        entityId: string;
        entityType: string;
        senderEmail: string;
    }): Promise<{ success: boolean; messageId?: string; error?: string }> {
        try {
            switch (params.campaignType) {
                case 'EMAIL':
                    return await this.sendEmailCampaign(params);
                case 'SMS':
                    return await this.sendSmsCampaign(params);
                case 'WHATSAPP':
                    return await this.sendWhatsAppCampaign(params);
                default:
                    throw new Error(`Tipo de campanha não suportado: ${params.campaignType}`);
            }
        } catch (error) {
            this.logger.error(`Erro ao enviar mensagem da campanha: ${error.message}`);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Envia email através do EmailService
     */
    private async sendEmailCampaign(params: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
        if (!params.recipientEmail) {
            throw new Error('Email do destinatário é obrigatório para campanhas de email');
        }

        try {
            const emailSent = await this.emailService.sendEmail({
                to: params.recipientEmail,
                subject: params.subject || 'Mensagem da Campanha',
                html: params.content,
                text: this.stripHtml(params.content)
            });

            if (emailSent) {
                this.logger.log(`Email enviado com sucesso para: ${params.recipientEmail}`);
                return {
                    success: true,
                    messageId: `email_${Date.now()}_${params.recipientEmail}`
                };
            } else {
                throw new Error('Falha ao enviar email');
            }
        } catch (error) {
            this.logger.error(`Erro ao enviar email: ${error.message}`);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Envia SMS através do SendMessageService
     */
    private async sendSmsCampaign(params: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
        if (!params.recipientPhone) {
            throw new Error('Telefone do destinatário é obrigatório para campanhas de SMS');
        }

        try {
            // TODO: Implementar integração real com SendMessageService
            // Por enquanto, simular envio
            this.logger.log(`SMS simulado enviado para: ${params.recipientPhone}`);
            
            return {
                success: true,
                messageId: `sms_${Date.now()}_${params.recipientPhone}`
            };
        } catch (error) {
            this.logger.error(`Erro ao enviar SMS: ${error.message}`);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Envia WhatsApp através do SendMessageService
     */
    private async sendWhatsAppCampaign(params: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
        if (!params.recipientPhone) {
            throw new Error('Telefone do destinatário é obrigatório para campanhas de WhatsApp');
        }

        try {
            // TODO: Implementar integração real com SendMessageService
            // Por enquanto, simular envio
            this.logger.log(`WhatsApp simulado enviado para: ${params.recipientPhone}`);
            
            return {
                success: true,
                messageId: `whatsapp_${Date.now()}_${params.recipientPhone}`
            };
        } catch (error) {
            this.logger.error(`Erro ao enviar WhatsApp: ${error.message}`);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Remove tags HTML do conteúdo para criar versão texto
     */
    private stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }

    /**
     * Personaliza conteúdo com variáveis do destinatário
     */
    personalizeContent(content: string, recipient: any): string {
        let personalizedContent = content;
        
        // Substituir variáveis básicas
        personalizedContent = personalizedContent.replace(/\{\{name\}\}/g, recipient.name || 'Cliente');
        personalizedContent = personalizedContent.replace(/\{\{email\}\}/g, recipient.email || '');
        personalizedContent = personalizedContent.replace(/\{\{phone\}\}/g, recipient.phone || '');
        personalizedContent = personalizedContent.replace(/\{\{company\}\}/g, recipient.company || '');
        
        // Substituir variáveis de data
        const now = new Date();
        personalizedContent = personalizedContent.replace(/\{\{date\}\}/g, now.toLocaleDateString('pt-BR'));
        personalizedContent = personalizedContent.replace(/\{\{time\}\}/g, now.toLocaleTimeString('pt-BR'));
        personalizedContent = personalizedContent.replace(/\{\{year\}\}/g, now.getFullYear().toString());
        
        // TODO: Implementar mais variáveis personalizadas baseadas no contexto
        
        return personalizedContent;
    }

    /**
     * Valida se o destinatário pode receber mensagens
     */
    async validateRecipient(recipient: any, campaignType: string): Promise<{ valid: boolean; reason?: string }> {
        // Validar email
        if (campaignType === 'EMAIL' && (!recipient.email || !this.isValidEmail(recipient.email))) {
            return {
                valid: false,
                reason: 'Email inválido ou não fornecido'
            };
        }

        // Validar telefone
        if ((campaignType === 'SMS' || campaignType === 'WHATSAPP') && (!recipient.phone || !this.isValidPhone(recipient.phone))) {
            return {
                valid: false,
                reason: 'Telefone inválido ou não fornecido'
            };
        }

        // TODO: Verificar se o destinatário não está em lista de bloqueio
        // TODO: Verificar se o destinatário não descadastrou
        // TODO: Verificar limites de frequência

        return { valid: true };
    }

    /**
     * Valida formato de email
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida formato de telefone
     */
    private isValidPhone(phone: string): boolean {
        // Remove caracteres não numéricos
        const cleanPhone = phone.replace(/\D/g, '');
        // Verifica se tem pelo menos 10 dígitos (formato brasileiro)
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    }
}

