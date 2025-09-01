import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreatePipelineStageRequest } from "./create-pipeline-stage.request";
import { PipelineStageVM } from "src/application/ViewModels/pipeline/pipeline-stage.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreatePipelineStageService extends HandlerBase<CreatePipelineStageRequest, PipelineStageVM> {
    protected async executeCore(request: CreatePipelineStageRequest, data?: any): Promise<PipelineStageVM> {

        return await this.transaction<PipelineStageVM>(async (tx) => {

            // Verificar se o funil existe
            const pipeline = await tx.pipeline.findUnique({
                where: { id: request.pipelineId }
            });

            if (!pipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            // Buscar estágios existentes para reordenar
            const existingStages = await tx.pipelineStage.findMany({
                where: {
                    pipelineId: request.pipelineId,
                    isActive: true
                },
                orderBy: { position: 'asc' }
            });

            // Reordenar estágios se necessário
            if (request.position <= existingStages.length) {
                // Mover estágios existentes para baixo
                const stagesToUpdate = existingStages.filter(stage => stage.position >= request.position);
                
                for (const stage of stagesToUpdate) {
                    await tx.pipelineStage.update({
                        where: { id: stage.id },
                        data: { position: stage.position + 1 }
                    });
                }
            }

            const stage = await tx.pipelineStage.create({
                data: {
                    name: request.name,
                    position: request.position,
                    defaultProbability: request.defaultProbability,
                    color: request.color,
                    pipelineId: request.pipelineId,
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

            return new PipelineStageVM(stage);
        });
    }
}
