import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateMarketingCampaignRequest } from "./create-marketing-campaign.request";
import { MarketingCampaignVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { Priority } from "src/repos/enums/priority.enum";

@Injectable()
export class CreateMarketingCampaignService extends HandlerBase<CreateMarketingCampaignRequest, MarketingCampaignVM> {
    protected async executeCore(request: CreateMarketingCampaignRequest, data?: any): Promise<MarketingCampaignVM> {
        return await this.transaction<MarketingCampaignVM>(async (tx) => {
            // Validar se o funcionário existe
            const employee = await tx.employee.findUnique({
                where: { id: this.user.id }
            });

            if (!employee) {
                throw new BaseException("Funcionário não encontrado", 404);
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

            // Criar a campanha
            const campaign = await tx.marketingCampaign.create({
                data: {
                    name: request.name,
                    description: request.description,
                    campaignType: request.campaignType,
                    category: request.category,
                    subject: request.subject,
                    content: request.content,
                    templateId: request.templateId,
                    targetAudience: request.targetAudience as any,
                    targetLeads: request.targetLeads || [],
                    targetClients: request.targetClients || [],
                    scheduledAt: request.scheduledAt ? new Date(request.scheduledAt) : null,
                    timezone: request.timezone || "America/Sao_Paulo",
                    status: request.status || CampaignStatus.DRAFT,
                    priority: request.priority || Priority.MEDIUM,
                    sendLimit: request.sendLimit,
                    batchSize: request.batchSize || 100,
                    createdByEmployeeId: this.user.id,
                    isActive: true
                },
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

            this.logger.log(`Campanha de marketing criada: ${campaign.id} - ${campaign.name}`);

            return new MarketingCampaignVM(campaign);
        });
    }
}

