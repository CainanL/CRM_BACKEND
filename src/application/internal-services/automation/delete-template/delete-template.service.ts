import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteTemplateRequest } from "./delete-template.request";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class DeleteTemplateService extends HandlerBase<DeleteTemplateRequest, void> {
    protected async executeCore(request: DeleteTemplateRequest, data?: any): Promise<void> {
        return await this.transaction<void>(async (tx) => {
            // Verificar se o template existe
            const template = await tx.campaignTemplate.findUnique({
                where: { 
                    id: request.id,
                    isActive: true
                }
            });

            if (!template) {
                throw new BaseException("Template não encontrado", 404);
            }

            // Verificar se o template está sendo usado em alguma campanha
            const campaignsUsingTemplate = await tx.marketingCampaign.count({
                where: {
                    templateId: request.id,
                    isActive: true
                }
            });

            if (campaignsUsingTemplate > 0) {
                throw new BaseException("Não é possível deletar um template que está sendo usado em campanhas", 400);
            }

            // Soft delete - marcar como inativo
            await tx.campaignTemplate.update({
                where: { id: request.id },
                data: { isActive: false }
            });

            this.logger.log(`Template deletado: ${template.id} - ${template.name}`);

        });
    }
}
