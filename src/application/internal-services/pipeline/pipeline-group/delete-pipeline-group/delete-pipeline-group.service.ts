import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";

@Injectable()
export class DeletePipelineGroupService extends HandlerBase<GetByIdBase, void> {
    protected async executeCore(request: GetByIdBase, data?: any): Promise<void> {

        return await this.transaction<void>(async (tx) => {

            // Verificar se o agrupamento existe
            const group = await tx.pipelineGroup.findUnique({
                where: { id: request.id },
                include: {
                    pipelines: {
                        include: {
                            opportunities: { where: { isActive: true } }
                        }
                    }
                }
            });

            if (!group) {
                throw new BaseException("Agrupamento não encontrado", 404);
            }

            // Verificar se há oportunidades não concluídas em qualquer funil do agrupamento
            const hasOpenOpportunities = group.pipelines.some(pipeline => 
                pipeline.opportunities.some(opportunity => opportunity.status === OpportunityStatus.OPEN)
            );

            if (hasOpenOpportunities) {
                throw new BaseException("Não é possível deletar o agrupamento pois existem oportunidades não concluídas", 400);
            }

            // Soft delete - marcar como inativo
            await tx.pipelineGroup.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
