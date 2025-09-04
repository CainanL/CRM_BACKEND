import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ResumeCampaignRequest } from "./resume-campaign.request";
import { MarketingCampaignVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class ResumeCampaignService extends HandlerBase<ResumeCampaignRequest, MarketingCampaignVM> {
    protected async executeCore(request: ResumeCampaignRequest, data?: any): Promise<MarketingCampaignVM> {
        return await this.transaction<MarketingCampaignVM>(async (tx) => {
            // Verificar se a campanha existe
            const campaign = await tx.marketingCampaign.findUnique({
                where: { 
                    id: request.campaignId,
                    isActive: true
                }
            });

            if (!campaign) {
                throw new BaseException("Campanha não encontrada", 404);
            }

            // Verificar se a campanha pode ser retomada
            if (campaign.status !== CampaignStatus.PAUSED) {
                throw new BaseException("Apenas campanhas pausadas podem ser retomadas", 400);
            }

            // Determinar o novo status baseado na data agendada
            let newStatus = CampaignStatus.SCHEDULED;
            if (campaign.scheduledAt && campaign.scheduledAt <= new Date()) {
                newStatus = CampaignStatus.RUNNING;
            }

            // Retomar a campanha
            const resumedCampaign = await tx.marketingCampaign.update({
                where: { id: request.campaignId },
                data: { status: newStatus },
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

            this.logger.log(`Campanha retomada: ${campaign.id} - ${campaign.name}`);

            return new MarketingCampaignVM(resumedCampaign);
        });
    }
}
