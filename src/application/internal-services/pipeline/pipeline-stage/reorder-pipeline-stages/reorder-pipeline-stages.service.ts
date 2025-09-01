import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ReorderPipelineStagesRequest } from "./reorder-pipeline-stages.request";
import { PipelineStageToListVm } from "src/application/ViewModels/pipeline/pipeline-stage.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class ReorderPipelineStagesService extends HandlerBase<ReorderPipelineStagesRequest, PipelineStageToListVm[]> {
    protected async executeCore(request: ReorderPipelineStagesRequest, data?: any): Promise<PipelineStageToListVm[]> {

        return await this.transaction<PipelineStageToListVm[]>(async (tx) => {

            // Verificar se todos os estágios existem e pertencem ao mesmo funil
            const stages = await tx.pipelineStage.findMany({
                where: {
                    id: { in: request.stages.map(s => s.id) },
                    isActive: true
                },
                include: {
                    pipeline: { include: { group: true } },
                    opportunities: {
                        where: { isActive: true },
                        include: { client: true }
                    }
                }
            });

            if (stages.length !== request.stages.length) {
                throw new BaseException("Um ou mais estágios não foram encontrados", 404);
            }

            // Verificar se todos os estágios pertencem ao mesmo funil
            const pipelineIds = [...new Set(stages.map(s => s.pipelineId))];
            if (pipelineIds.length > 1) {
                throw new BaseException("Todos os estágios devem pertencer ao mesmo funil", 400);
            }

            // Verificar se as posições são únicas
            const positions = request.stages.map(s => s.position);
            const uniquePositions = [...new Set(positions)];
            if (positions.length !== uniquePositions.length) {
                throw new BaseException("As posições devem ser únicas", 400);
            }

            // Atualizar as posições
            for (const stagePosition of request.stages) {
                await tx.pipelineStage.update({
                    where: { id: stagePosition.id },
                    data: { position: stagePosition.position }
                });
            }

            // Buscar os estágios atualizados
            const updatedStages = await tx.pipelineStage.findMany({
                where: {
                    id: { in: request.stages.map(s => s.id) },
                    isActive: true
                },
                include: {
                    pipeline: { include: { group: true } },
                    opportunities: {
                        where: { isActive: true },
                        include: { client: true }
                    }
                },
                orderBy: { position: 'asc' }
            });

            return updatedStages.map(stage => new PipelineStageToListVm(stage));
        });
    }
}
