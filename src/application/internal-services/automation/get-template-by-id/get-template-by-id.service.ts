import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetTemplateByIdRequest } from "./get-template-by-id.request";
import { CampaignTemplateVM } from "src/application/ViewModels/automation/campaign-template.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetTemplateByIdService extends HandlerBase<GetTemplateByIdRequest, CampaignTemplateVM> {
    protected async executeCore(request: GetTemplateByIdRequest, data?: any): Promise<CampaignTemplateVM> {
        const template = await this.context.campaignTemplate.findUnique({
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
                }
            }
        });

        if (!template) {
            throw new BaseException("Template não encontrado", 404);
        }

        return new CampaignTemplateVM(template);
    }
}
