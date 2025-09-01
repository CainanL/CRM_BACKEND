import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { PipelineVM } from "src/application/ViewModels/pipeline/pipeline.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetPipelineByIdService extends HandlerBase<GetByIdBase, PipelineVM> {
    protected async executeCore(request: GetByIdBase, data?: any): Promise<PipelineVM> {

        return await this.transaction<PipelineVM>(async (tx) => {

            const pipeline = await tx.pipeline.findUnique({
                where: { id: request.id, isActive: true },
                include: {
                    group: true,
                    stages: { orderBy: { position: 'asc' } },
                    opportunities: {
                        where: { isActive: true },
                        include: {
                            client: true,
                            stage: true,
                            assignedEmployee: true
                        }
                    }
                }
            });

            if (!pipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            return new PipelineVM(pipeline);
        });
    }
}
