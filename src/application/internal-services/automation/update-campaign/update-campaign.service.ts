import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateCampaignRequest } from "./update-campaign.request";
import { MarketingCampaignVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class UpdateCampaignService extends HandlerBase<UpdateCampaignRequest, MarketingCampaignVM> {
    protected async executeCore(request: UpdateCampaignRequest, data?: any): Promise<MarketingCampaignVM> {
        return await this.transaction<MarketingCampaignVM>(async (tx) => {
            // Verificar se a campanha existe
            const existingCampaign = await tx.marketingCampaign.findUnique({
                where: { 
                    id: request.campaignId,
                    isActive: true
                }
            });

            if (!existingCampaign) {
                throw new BaseException("Campanha não encontrada", 404);
            }

            // Verificar se a campanha pode ser editada
            if (existingCampaign.status === CampaignStatus.RUNNING) {
                throw new BaseException("Não é possível editar uma campanha em execução", 400);
            }

            if (existingCampaign.status === CampaignStatus.COMPLETED) {
                throw new BaseException("Não é possível editar uma campanha já executada", 400);
            }

            // Validar template se fornecido
            if (request.templateId) {
                const template = await tx.campaignTemplate.findUnique({
                    where: { id: request.templateId }
                });

                if (!template) {
                    throw new BaseException("Template não encontrado", 404);
                }

                if (!template.isActive) {
                    throw new BaseException("Template não está ativo", 400);
                }
            }

            // Validar leads se fornecidos
            if (request.targetLeads && request.targetLeads.length > 0) {
                const leadsCount = await tx.solutionCapturedLead.count({
                    where: {
                        id: { in: request.targetLeads },
                        isActive: true
                    }
                });

                if (leadsCount !== request.targetLeads.length) {
                    throw new BaseException("Um ou mais leads não foram encontrados ou estão inativos", 400);
                }
            }

            // Validar clientes se fornecidos
            if (request.targetClients && request.targetClients.length > 0) {
                const clientsCount = await tx.client.count({
                    where: {
                        id: { in: request.targetClients },
                        isActive: true
                    }
                });

                if (clientsCount !== request.targetClients.length) {
                    throw new BaseException("Um ou mais clientes não foram encontrados ou estão inativos", 400);
                }
            }

            // Preparar dados para atualização
            const updateData: any = {};

            if (request.name !== undefined) updateData.name = request.name;
            if (request.description !== undefined) updateData.description = request.description;
            if (request.campaignType !== undefined) updateData.campaignType = request.campaignType;
            if (request.category !== undefined) updateData.category = request.category;
            if (request.subject !== undefined) updateData.subject = request.subject;
            if (request.content !== undefined) updateData.content = request.content;
            if (request.templateId !== undefined) updateData.templateId = request.templateId;
            if (request.targetAudience !== undefined) updateData.targetAudience = request.targetAudience as any;
            if (request.targetLeads !== undefined) updateData.targetLeads = request.targetLeads;
            if (request.targetClients !== undefined) updateData.targetClients = request.targetClients;
            if (request.scheduledAt !== undefined) updateData.scheduledAt = request.scheduledAt ? new Date(request.scheduledAt) : null;
            if (request.timezone !== undefined) updateData.timezone = request.timezone;
            if (request.status !== undefined) updateData.status = request.status;
            if (request.priority !== undefined) updateData.priority = request.priority;
            if (request.sendLimit !== undefined) updateData.sendLimit = request.sendLimit;
            if (request.batchSize !== undefined) updateData.batchSize = request.batchSize;

            // Atualizar a campanha
            const updatedCampaign = await tx.marketingCampaign.update({
                where: { id: request.campaignId },
                data: updateData,
                include: {
                    createdByEmployee: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true
                        }
                    },
                    campaignExecutions: {
                        include: {
                            campaignRecipients: true,
                            campaignReport: true
                        }
                    }
                }
            });

            this.logger.log(`Campanha atualizada: ${updatedCampaign.id} - ${updatedCampaign.name}`);

            return new MarketingCampaignVM(updatedCampaign);
        });
    }
}
