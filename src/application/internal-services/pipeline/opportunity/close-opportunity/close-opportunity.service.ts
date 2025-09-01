import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CloseOpportunityRequest } from "./close-opportunity.request";
import { OpportunityVM } from "src/application/ViewModels/pipeline/opportunity.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { RecordInteractionService } from "src/application/internal-services/client-interaction/record-interaction/record-interaction.service";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";

@Injectable()
export class CloseOpportunityService extends HandlerBase<CloseOpportunityRequest, OpportunityVM> {
    constructor(private readonly recordInteractionService: RecordInteractionService) {
        super();
    }

    protected async executeCore(request: CloseOpportunityRequest, data?: any): Promise<OpportunityVM> {

        return await this.transaction<OpportunityVM>(async (tx) => {

            // Buscar a oportunidade
            const opportunity = await tx.opportunity.findUnique({
                where: { id: request.opportunityId, isActive: true },
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

            // Verificar se a oportunidade não está já fechada
            // if (opportunity.status === OpportunityStatus.WON
            //     || opportunity.status === OpportunityStatus.LOST
            //     || opportunity.status === OpportunityStatus.CANCELLED
            // ) {
            //     throw new BaseException("Oportunidade já está fechada", 400);
            // }

            // Atualizar a oportunidade
            const updatedOpportunity = await tx.opportunity.update({
                where: { id: request.opportunityId },
                data: {
                    status: request.status,
                    closedAt: new Date(),
                    closedReason: request.closeReason,
                    probability: request.status === OpportunityStatus.WON ? 100 : 0
                },
                include: {
                    client: { include: { address: true } },
                    pipeline: { include: { group: true } },
                    stage: true,
                    assignedEmployee: { include: { address: true } }
                }
            });

            // Registrar o fechamento como uma interação
            try {
                const statusText = request.status === OpportunityStatus.WON ? "GANHA" :
                    request.status === OpportunityStatus.LOST ? "PERDIDA" :
                        request.status === OpportunityStatus.CANCELLED ? "CANCELADA" : "FECHADA";

                await this.recordInteractionService.recordInteraction({
                    clientId: opportunity.clientId,
                    interactionType: InteractionType.OTHER,
                    description: `Oportunidade "${opportunity.name}" foi ${statusText.toLowerCase()}`,
                    status: InteractionStatus.SUCCESS,
                    result: request.description || `Oportunidade ${statusText.toLowerCase()}${request.closeReason ? ` - Motivo: ${request.closeReason}` : ''}`,
                    tags: [InteractionTag.SALES]
                }, { ...data, user: this.user });
            } catch (error) {
                // Log do erro mas não falha o fechamento
                this.logger.error("Erro ao registrar interação:", error);
            }

            return new OpportunityVM(updatedOpportunity);
        });
    }
}
