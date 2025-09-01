import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";

@Injectable()
export class DeletePipelineService extends HandlerBase<GetByIdBase, void> {
    protected async executeCore(request: GetByIdBase, data?: any): Promise<void> {

        return await this.transaction<void>(async (tx) => {

            // Verificar se o funil existe
            const pipeline = await tx.pipeline.findUnique({
                where: { id: request.id },
                include: {
                    opportunities: { where: { isActive: true } }
                }
            });

            if (!pipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            // Verificar se há oportunidades não concluídas
            const hasOpenOpportunities = pipeline.opportunities.some(opportunity => 
                opportunity.status === OpportunityStatus.OPEN
            );

            if (hasOpenOpportunities) {
                throw new BaseException("Não é possível deletar o funil pois existem oportunidades não concluídas", 400);
            }

            // Soft delete - marcar como inativo
            await tx.pipeline.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
