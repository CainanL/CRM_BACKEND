import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdatePipelineStageRequest } from "./update-pipeline-stage.request";
import { PipelineStageVM } from "src/application/ViewModels/pipeline/pipeline-stage.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdatePipelineStageService extends HandlerBase<UpdatePipelineStageRequest, PipelineStageVM> {
    protected async executeCore(request: UpdatePipelineStageRequest, data?: any): Promise<PipelineStageVM> {

        return await this.transaction<PipelineStageVM>(async (tx) => {

            // Verificar se o estágio existe
            const existingStage = await tx.pipelineStage.findUnique({
                where: { id: request.id },
                include: { pipeline: true }
            });

            if (!existingStage) {
                throw new BaseException("Estágio não encontrado", 404);
            }

            // Buscar todos os estágios do funil
            const allStages = await tx.pipelineStage.findMany({
                where: {
                    pipelineId: existingStage.pipelineId,
                    isActive: true
                },
                orderBy: { position: 'asc' }
            });

            const currentStage = allStages.find(s => s.id === request.id);
            if (!currentStage) {
                throw new BaseException("Estágio não encontrado", 404);
            }

            // Se a posição mudou, reordenar os estágios
            if (request.position !== currentStage.position) {
                // Remover o estágio atual da lista temporariamente
                const otherStages = allStages.filter(s => s.id !== request.id);
                
                // Reordenar os outros estágios
                let newStages: any[] = [];
                let newPosition = 1;
                
                for (let i = 0; i < otherStages.length; i++) {
                    if (newPosition === request.position) {
                        newPosition++; // Pular a posição que será ocupada pelo estágio atual
                    }
                    const stage = { ...otherStages[i], position: newPosition };
                    newStages.push(stage);
                    newPosition++;
                }

                // Atualizar as posições dos outros estágios
                for (const stage of newStages) {
                    await tx.pipelineStage.update({
                        where: { id: stage.id },
                        data: { position: stage.position }
                    });
                }
            }

            const stage = await tx.pipelineStage.update({
                where: { id: request.id },
                data: {
                    name: request.name,
                    position: request.position,
                    defaultProbability: request.defaultProbability,
                    color: request.color
                },
                include: {
                    pipeline: { include: { group: true } },
                    opportunities: {
                        where: { isActive: true },
                        include: { client: true }
                    }
                }
            });

            return new PipelineStageVM(stage);
        });
    }
}
