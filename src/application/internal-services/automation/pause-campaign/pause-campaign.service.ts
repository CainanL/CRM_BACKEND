import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { PauseCampaignRequest } from "./pause-campaign.request";
import { MarketingCampaignVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class PauseCampaignService extends HandlerBase<PauseCampaignRequest, MarketingCampaignVM> {
    protected async executeCore(request: PauseCampaignRequest, data?: any): Promise<MarketingCampaignVM> {
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

            // Verificar se a campanha pode ser pausada
            if (campaign.status !== CampaignStatus.RUNNING && campaign.status !== CampaignStatus.SCHEDULED) {
                throw new BaseException("Apenas campanhas em execução ou agendadas podem ser pausadas", 400);
            }

            // Pausar a campanha
            const pausedCampaign = await tx.marketingCampaign.update({
                where: { id: request.campaignId },
                data: { status: CampaignStatus.PAUSED },
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

            this.logger.log(`Campanha pausada: ${campaign.id} - ${campaign.name}`);

            return new MarketingCampaignVM(pausedCampaign);
        });
    }
}
