import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateOpportunityRequest } from "./create-opportunity.request";
import { OpportunityVM } from "src/application/ViewModels/pipeline/opportunity.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { RecordInteractionService } from "src/application/internal-services/client-interaction/record-interaction/record-interaction.service";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";

@Injectable()
export class CreateOpportunityService extends HandlerBase<CreateOpportunityRequest, OpportunityVM> {
    constructor(private readonly recordInteractionService: RecordInteractionService) {
        super();
    }

    protected async executeCore(request: CreateOpportunityRequest, data?: any): Promise<OpportunityVM> {

        return await this.transaction<OpportunityVM>(async (tx) => {

            // Verificar se o cliente existe
            const client = await tx.client.findUnique({
                where: { id: request.clientId }
            });

            if (!client) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            // Verificar se o funil existe
            const pipeline = await tx.pipeline.findUnique({
                where: { id: request.pipelineId }
            });

            if (!pipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            // Verificar se o estágio existe e pertence ao funil
            const stage = await tx.pipelineStage.findFirst({
                where: {
                    id: request.stageId,
                    pipelineId: request.pipelineId,
                    isActive: true
                }
            });

            if (!stage) {
                throw new BaseException("Estágio não encontrado ou não pertence ao funil", 404);
            }

            const assignedTo = this.user?.id ?? null;

            // Usar probabilidade padrão do estágio se não fornecida
            const probability = request.probability ?? stage.defaultProbability;

            const opportunity = await tx.opportunity.create({
                data: {
                    name: request.name,
                    description: request.description,
                    value: request.value ? parseFloat(request.value) : null,
                    probability: probability,
                    expectedCloseDate: request.expectedCloseDate ? new Date(request.expectedCloseDate) : null,
                    clientId: request.clientId,
                    pipelineId: request.pipelineId,
                    stageId: request.stageId,
                    assignedTo: assignedTo,
                    status: request.status || OpportunityStatus.OPEN,
                    isActive: true
                },
                include: {
                    client: { include: { address: true } },
                    pipeline: { include: { group: true } },
                    stage: true,
                    assignedEmployee: { include: { address: true } }
                }
            });

            // Registrar a criação como uma interação
            try {
                await this.recordInteractionService.recordInteraction({
                    clientId: request.clientId,
                    interactionType: InteractionType.OTHER,
                    description: `Oportunidade "${request.name}" criada no funil "${pipeline.name}"`,
                    status: InteractionStatus.SUCCESS,
                    result: `Oportunidade criada no estágio "${stage.name}"`,
                    tags: [InteractionTag.SALES]
                }, data);
            } catch (error) {
                this.logger.error("Erro ao registrar interação:", error);
            }

            return new OpportunityVM(opportunity);
        });
    }
}
