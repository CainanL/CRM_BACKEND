import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { DeletePipelineStageRequest } from "./delete-pipilene-stage.request";

@Injectable()
export class DeletePipelineStageService extends HandlerBase<DeletePipelineStageRequest, void> {
    protected async executeCore(request: DeletePipelineStageRequest, data?: any): Promise<void> {

        return await this.transaction<void>(async (tx) => {

            // Verificar se o estágio existe
            const stage = await tx.pipelineStage.findUnique({
                where: { id: request.id },
                include: {
                    opportunities: { where: { isActive: true } }
                }
            });

            if (!stage) {
                throw new BaseException("Estágio não encontrado", 404);
            }

            // Verificar se há oportunidades não concluídas neste estágio
            const hasOpenOpportunities = stage.opportunities.some(opportunity => 
                opportunity.status === "OPEN"
            );

            if (hasOpenOpportunities) {
                throw new BaseException("Não é possível deletar o estágio pois existem oportunidades não concluídas", 400);
            }

            // Buscar estágios que vêm depois para reordenar
            const laterStages = await tx.pipelineStage.findMany({
                where: {
                    pipelineId: stage.pipelineId,
                    position: { gt: stage.position },
                    isActive: true
                }
            });

            // Reordenar estágios posteriores
            for (const laterStage of laterStages) {
                await tx.pipelineStage.update({
                    where: { id: laterStage.id },
                    data: { position: laterStage.position - 1 }
                });
            }

            // Soft delete - marcar como inativo
            await tx.pipelineStage.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
