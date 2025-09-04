import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ExecuteCampaignRequest } from "./execute-campaign.request";
import { CampaignExecutionVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";
import { RecipientStatus } from "src/repos/enums/recipient-status.enum";
import { RecipientType } from "src/repos/enums/recipient-type.enum";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { SendMessageService } from "src/application/internal-services/communication/send-message/send-message.service";
import { QueryLeadsService } from "src/application/internal-services/solution/query-leads/query-leads.service";
import { QueryClientsService } from "src/application/internal-services/client/query-clients/query-clients.service";
import { ContactType } from "src/repos/enums/contact-type.enum";

@Injectable()
export class ExecuteCampaignService extends HandlerBase<ExecuteCampaignRequest, CampaignExecutionVM> {
    constructor(
        private readonly sendMessageService: SendMessageService,
        private readonly queryLeadsService: QueryLeadsService,
        private readonly queryClientsService: QueryClientsService
    ) {
        super();
    }

    protected async executeCore(request: ExecuteCampaignRequest, data?: any): Promise<CampaignExecutionVM> {
        return await this.transaction<CampaignExecutionVM>(async (tx) => {
            // Buscar a campanha
            const campaign = await tx.marketingCampaign.findUnique({
                where: { id: request.campaignId },
                include: {
                    createdByEmployee: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true
                        }
                    }
                }
            });

            if (!campaign) {
                throw new BaseException("Campanha não encontrada", 404);
            }

            if (!campaign.isActive) {
                throw new BaseException("Campanha não está ativa", 400);
            }

            if (campaign.status === CampaignStatus.RUNNING) {
                throw new BaseException("Campanha já está em execução", 400);
            }

            if (campaign.status === CampaignStatus.COMPLETED) {
                throw new BaseException("Campanha já foi executada", 400);
            }

            // Criar execução da campanha
            const execution = await tx.campaignExecution.create({
                data: {
                    campaignId: campaign.id,
                    executionDate: request.executeImmediately ? new Date() : new Date(request.scheduledAt || new Date()),
                    status: "PENDING",
                    totalRecipients: 0,
                    sentCount: 0,
                    deliveredCount: 0,
                    openedCount: 0,
                    clickedCount: 0,
                    repliedCount: 0,
                    bouncedCount: 0,
                    unsubscribedCount: 0,
                    isActive: true
                }
            });

            // Atualizar status da campanha
            await tx.marketingCampaign.update({
                where: { id: campaign.id },
                data: {
                    status: CampaignStatus.RUNNING
                }
            });

            try {
                // Obter destinatários
                const recipients = await this.getRecipients(campaign, tx);
                
                // Atualizar total de destinatários
                await tx.campaignExecution.update({
                    where: { id: execution.id },
                    data: {
                        totalRecipients: recipients.length,
                        status: CampaignStatus.RUNNING,
                        startedAt: new Date()
                    }
                });

                // Criar registros de destinatários
                const recipientData = recipients.map(recipient => ({
                    executionId: execution.id,
                    recipientType: recipient.type,
                    recipientId: recipient.id,
                    recipientName: recipient.name,
                    recipientEmail: recipient.email,
                    recipientPhone: recipient.phone,
                    status: RecipientStatus.PENDING,
                    isActive: true
                }));

                await tx.campaignRecipient.createMany({
                    data: recipientData
                });

                // Executar envio em lotes
                if (request.executeImmediately) {
                    await this.executeBatchSending(campaign, execution.id, recipients, tx);
                }

                // Buscar execução atualizada
                const updatedExecution = await tx.campaignExecution.findUnique({
                    where: { id: execution.id },
                    include: {
                        campaignRecipients: true,
                        campaignReport: true
                    }
                });

                this.logger.log(`Campanha executada: ${campaign.id} - ${campaign.name} - ${recipients.length} destinatários`);

                return new CampaignExecutionVM(updatedExecution!);

            } catch (error) {
                // Atualizar execução com erro
                await tx.campaignExecution.update({
                    where: { id: execution.id },
                    data: {
                        status: CampaignStatus.FAILED,
                        errorMessage: error.message,
                        completedAt: new Date()
                    }
                });

                // Reverter status da campanha
                await tx.marketingCampaign.update({
                    where: { id: campaign.id },
                    data: {
                        status: CampaignStatus.DRAFT
                    }
                });

                throw error;
            }
        });
    }

    private async getRecipients(campaign: any, tx: any): Promise<any[]> {
        const recipients: any[] = [];

        // Adicionar leads específicos
        if (campaign.targetLeads && campaign.targetLeads.length > 0) {
            const leads = await tx.solutionCapturedLead.findMany({
                where: {
                    id: { in: campaign.targetLeads },
                    isActive: true
                },
                include: {
                    fielValues: {
                        include: {
                            settings: true
                        }
                    }
                }
            });

            for (const lead of leads) {
                const emailField = lead.fielValues.find((fv: any) => 
                    fv.settings.dataType === 'email' || fv.settings.formatType === 'email'
                );
                const nameField = lead.fielValues.find((fv: any) => 
                    fv.settings.dataType === 'text' && fv.settings.title.toLowerCase().includes('nome')
                );
                const phoneField = lead.fielValues.find((fv: any) => 
                    fv.settings.dataType === 'phone' || fv.settings.formatType === 'phone'
                );

                if (emailField || phoneField) {
                    recipients.push({
                        type: RecipientType.LEAD,
                        id: lead.id,
                        name: nameField?.value || 'Lead',
                        email: emailField?.value,
                        phone: phoneField?.value
                    });
                }
            }
        }

        // Adicionar clientes específicos
        if (campaign.targetClients && campaign.targetClients.length > 0) {
            const clients = await tx.client.findMany({
                where: {
                    id: { in: campaign.targetClients },
                    isActive: true
                }
            });

            for (const client of clients) {
                recipients.push({
                    type: RecipientType.CLIENT,
                    id: client.id,
                    name: client.fullName || client.companyName || client.tradeName || 'Cliente',
                    email: client.email,
                    phone: client.phone
                });
            }
        }

        // TODO: Implementar segmentação por targetAudience
        // Por enquanto, apenas leads e clientes específicos

        return recipients;
    }

    private async executeBatchSending(campaign: any, executionId: string, recipients: any[], tx: any): Promise<void> {
        const batchSize = campaign.batchSize || 100;
        let sentCount = 0;

        for (let i = 0; i < recipients.length; i += batchSize) {
            const batch = recipients.slice(i, i + batchSize);
            
            for (const recipient of batch) {
                try {
                    // Determinar canal baseado no tipo de campanha
                    let channelType = 'EMAIL';
                    let recipientContact = recipient.email;
                    let recipientContactType = 'EMAIL';

                    if (campaign.campaignType === 'SMS' || campaign.campaignType === 'WHATSAPP') {
                        channelType = campaign.campaignType;
                        recipientContact = recipient.phone;
                        recipientContactType = 'PHONE';
                    }

                    if (!recipientContact) {
                        continue; // Pular se não tiver contato
                    }

                    // Personalizar conteúdo
                    const personalizedContent = this.personalizeContent(campaign.content, recipient);

                    // Enviar mensagem
                    const messageRequest = {
                        content: personalizedContent,
                        channelType: channelType,
                        recipientContact: recipientContact,
                        recipientContactType: recipientContactType,
                        entityId: recipient.id,
                        entityType: recipient.type,
                        senderContact: campaign.createdByEmployee.email,
                        senderContactType: ContactType.EMAIL
                    };

                    // TODO: Integrar com SendMessageService
                    // Por enquanto, simular envio
                    await this.simulateMessageSending(messageRequest, executionId, recipient.id, tx);

                    sentCount++;

                    // Atualizar contadores
                    await tx.campaignExecution.update({
                        where: { id: executionId },
                        data: {
                            sentCount: sentCount
                        }
                    });

                    // Atualizar status do destinatário
                    await tx.campaignRecipient.updateMany({
                        where: {
                            executionId: executionId,
                            recipientId: recipient.id
                        },
                        data: {
                            status: RecipientStatus.SENT,
                            sentAt: new Date()
                        }
                    });

                } catch (error) {
                    this.logger.error(`Erro ao enviar para ${recipient.name}: ${error.message}`);
                    
                    // Atualizar status do destinatário com erro
                    await tx.campaignRecipient.updateMany({
                        where: {
                            executionId: executionId,
                            recipientId: recipient.id
                        },
                        data: {
                            status: RecipientStatus.FAILED,
                            errorMessage: error.message
                        }
                    });
                }
            }

            // Pequena pausa entre lotes para não sobrecarregar
            if (i + batchSize < recipients.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Finalizar execução
        await tx.campaignExecution.update({
            where: { id: executionId },
            data: {
                status: CampaignStatus.COMPLETED,
                completedAt: new Date()
            }
        });

        // Atualizar status da campanha
        await tx.marketingCampaign.update({
            where: { id: campaign.id },
            data: {
                status: CampaignStatus.COMPLETED
            }
        });
    }

    private personalizeContent(content: string, recipient: any): string {
        let personalizedContent = content;
        
        // Substituir variáveis básicas
        personalizedContent = personalizedContent.replace(/\{\{name\}\}/g, recipient.name || 'Cliente');
        personalizedContent = personalizedContent.replace(/\{\{email\}\}/g, recipient.email || '');
        personalizedContent = personalizedContent.replace(/\{\{phone\}\}/g, recipient.phone || '');
        
        // TODO: Implementar mais variáveis personalizadas
        
        return personalizedContent;
    }

    private async simulateMessageSending(messageRequest: any, executionId: string, recipientId: string, tx: any): Promise<void> {
        // Simular envio de mensagem
        // TODO: Integrar com SendMessageService real
        
        // Simular delay de envio
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simular sucesso (90% das vezes)
        if (Math.random() > 0.1) {
            // Simular entrega
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Simular abertura (60% das vezes)
            if (Math.random() < 0.6) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}

