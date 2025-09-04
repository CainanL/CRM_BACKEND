import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetCampaignByIdRequest } from "./get-campaign-by-id.request";
import { MarketingCampaignVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetCampaignByIdService extends HandlerBase<GetCampaignByIdRequest, MarketingCampaignVM> {
    protected async executeCore(request: GetCampaignByIdRequest, data?: any): Promise<MarketingCampaignVM> {
        const campaign = await this.context.marketingCampaign.findUnique({
            where: { 
                id: request.id,
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
                    },
                    orderBy: {
                        executionDate: 'desc'
                    }
                }
            }
        });

        if (!campaign) {
            throw new BaseException("Campanha não encontrada", 404);
        }

        return new MarketingCampaignVM(campaign);
    }
}
