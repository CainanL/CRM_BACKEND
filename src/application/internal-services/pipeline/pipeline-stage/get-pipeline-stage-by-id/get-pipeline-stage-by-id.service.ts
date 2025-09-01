import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { PipelineStageVM } from "src/application/ViewModels/pipeline/pipeline-stage.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { GetPipelineStageByIdRequest } from "./get-pipeline-stage-by-id.request";

@Injectable()
export class GetPipelineStageByIdService extends HandlerBase<GetPipelineStageByIdRequest, PipelineStageVM> {
    protected async executeCore(request: GetPipelineStageByIdRequest, data?: any): Promise<PipelineStageVM> {

        return await this.transaction<PipelineStageVM>(async (tx) => {

            const stage = await tx.pipelineStage.findUnique({
                where: { id: request.id, isActive: true },
                include: {
                    pipeline: { include: { group: true } },
                    opportunities: {
                        where: { isActive: true },
                        include: { client: true }
                    }
                }
            });

            if (!stage) {
                throw new BaseException("Estágio não encontrado", 404);
            }

            return new PipelineStageVM(stage);
        });
    }
}
