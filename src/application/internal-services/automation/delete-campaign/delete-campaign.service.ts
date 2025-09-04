import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteCampaignRequest } from "./delete-campaign.request";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class DeleteCampaignService extends HandlerBase<DeleteCampaignRequest, void> {
    protected async executeCore(request: DeleteCampaignRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Verificar se a campanha existe
            const campaign = await tx.marketingCampaign.findUnique({
                where: { 
                    id: request.id,
                    isActive: true
                }
            });

            if (!campaign) {
                throw new BaseException("Campanha não encontrada", 404);
            }

            // Verificar se a campanha pode ser deletada
            if (campaign.status === CampaignStatus.RUNNING) {
                throw new BaseException("Não é possível deletar uma campanha em execução", 400);
            }

            // Soft delete - marcar como inativa
            await tx.marketingCampaign.update({
                where: { id: request.id },
                data: { 
                    isActive: false,
                    status: CampaignStatus.CANCELLED
                }
            });

            this.logger.log(`Campanha deletada: ${campaign.id} - ${campaign.name}`);

            
        });
    }
}
