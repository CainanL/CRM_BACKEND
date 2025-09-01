import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetStagesByPipelineRequest } from "./get-stages-by-pipeline.request";
import { PipelineStageToListVm } from "src/application/ViewModels/pipeline/pipeline-stage.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetStagesByPipelineService extends HandlerBase<GetStagesByPipelineRequest, PaginatedResponse<PipelineStageToListVm>> {
    protected async executeCore(request: GetStagesByPipelineRequest, data?: any): Promise<PaginatedResponse<PipelineStageToListVm>> {

        return await this.transaction<PaginatedResponse<PipelineStageToListVm>>(async (tx) => {

            // Verificar se o funil existe
            const pipeline = await tx.pipeline.findUnique({
                where: { id: request.pipelineId }
            });

            if (!pipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            const where = {
                pipelineId: request.pipelineId,
                isActive: true
            };

            const [stages, total] = await Promise.all([
                tx.pipelineStage.findMany({
                    where,
                    include: {
                        pipeline: { include: { group: true } },
                        opportunities: {
                            where: { isActive: true },
                            include: { client: true }
                        }
                    },
                    orderBy: { position: 'asc' }
                }),
                tx.pipelineStage.count({ where })
            ]);

            return new PaginatedResponse<PipelineStageToListVm>(
                stages.map(stage => new PipelineStageToListVm(stage)),
                request.page,
                request.size,
                total
            );
        });
    }
}
