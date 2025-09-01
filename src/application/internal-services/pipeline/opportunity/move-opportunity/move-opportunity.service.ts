import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { MoveOpportunityRequest } from "./move-opportunity.request";
import { OpportunityVM } from "src/application/ViewModels/pipeline/opportunity.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { RecordInteractionService } from "src/application/internal-services/client-interaction/record-interaction/record-interaction.service";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";

@Injectable()
export class MoveOpportunityService extends HandlerBase<MoveOpportunityRequest, OpportunityVM> {
    constructor(private readonly recordInteractionService: RecordInteractionService) {
        super();
    }

    protected async executeCore(request: MoveOpportunityRequest, data?: any): Promise<OpportunityVM> {

        return await this.transaction<OpportunityVM>(async (tx) => {

            // Buscar a oportunidade com informações do estágio atual
            const opportunity = await tx.opportunity.findUnique({
                where: { id: request.opportunityId },
                include: {
                    client: { include: { address: true } },
                    pipeline: { include: { group: true } },
                    stage: true,
                    assignedEmployee: { include: { address: true } }
                }
            });

            if (!opportunity) {
                throw new BaseException("Oportunidade não encontrada", 404);
            }

            // Verificar se o novo estágio existe e pertence ao mesmo funil
            const newStage = await tx.pipelineStage.findFirst({
                where: {
                    id: request.newStageId,
                    pipelineId: opportunity.pipelineId,
                    isActive: true
                }
            });

            if (!newStage) {
                throw new BaseException("Novo estágio não encontrado ou não pertence ao mesmo funil", 404);
            }

            // Verificar se a oportunidade não está fechada
            if (opportunity.status !== "OPEN") {
                throw new BaseException("Não é possível mover uma oportunidade fechada", 400);
            }

            const oldStageName = opportunity.stage.name;
            const newStageName = newStage.name;

            // Atualizar a oportunidade
            const updatedOpportunity = await tx.opportunity.update({
                where: { id: request.opportunityId },
                data: {
                    stageId: request.newStageId,
                    probability: newStage.defaultProbability // Usar probabilidade padrão do novo estágio
                },
                include: {
                    client: { include: { address: true } },
                    pipeline: { include: { group: true } },
                    stage: true,
                    assignedEmployee: { include: { address: true } }
                }
            });

            // Registrar a movimentação como uma interação
            try {
                await this.recordInteractionService.recordInteraction({
                    clientId: opportunity.clientId,
                    interactionType: InteractionType.OTHER,
                    description: `Oportunidade "${opportunity.name}" movida de "${oldStageName}" para "${newStageName}"`,
                    status: InteractionStatus.SUCCESS,
                    result: request.reason || `Movimentação de estágio: ${oldStageName} → ${newStageName}`,
                    tags: [InteractionTag.SALES]
                }, { ...data, user: this.user });
            } catch (error) {
                // Log do erro mas não falha a movimentação
                this.logger.error("Erro ao registrar interação:", error);
            }

            return new OpportunityVM(updatedOpportunity);
        });
    }
}
