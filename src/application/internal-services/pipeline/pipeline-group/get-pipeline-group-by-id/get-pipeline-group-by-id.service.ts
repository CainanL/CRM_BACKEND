import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { PipelineGroupVM } from "src/application/ViewModels/pipeline/pipeline-group.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetPipelineGroupByIdService extends HandlerBase<GetByIdBase, PipelineGroupVM> {
    protected async executeCore(request: GetByIdBase, data?: any): Promise<PipelineGroupVM> {

        return await this.transaction<PipelineGroupVM>(async (tx) => {

            const group = await tx.pipelineGroup.findUnique({
                where: { id: request.id },
                include: {
                    pipelines: {
                        include: {
                            stages: true,
                            opportunities: { where: { isActive: true } }
                        }
                    }
                }
            });

            if (!group) {
                throw new BaseException("Agrupamento não encontrado", 404);
            }

            return new PipelineGroupVM(group);
        });
    }
}
