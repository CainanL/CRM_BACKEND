import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdatePipelineRequest } from "./update-pipeline.request";
import { PipelineVM } from "src/application/ViewModels/pipeline/pipeline.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdatePipelineService extends HandlerBase<UpdatePipelineRequest, PipelineVM> {
    protected async executeCore(request: UpdatePipelineRequest, data?: any): Promise<PipelineVM> {

        return await this.transaction<PipelineVM>(async (tx) => {

            // Verificar se o funil existe
            const existingPipeline = await tx.pipeline.findUnique({
                where: { id: request.id },
                include: { group: true }
            });

            if (!existingPipeline) {
                throw new BaseException("Funil não encontrado", 404);
            }

            // Verificar se já existe outro funil com o mesmo nome no mesmo agrupamento
            const duplicatePipeline = await tx.pipeline.findFirst({
                where: {
                    groupId: existingPipeline.groupId,
                    name: request.name,
                    isActive: true,
                    id: { not: request.id }
                }
            });

            if (duplicatePipeline) {
                throw new BaseException("Já existe um funil com este nome neste agrupamento", 400);
            }

            const pipeline = await tx.pipeline.update({
                where: { id: request.id },
                data: {
                    name: request.name,
                    description: request.description
                },
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

            return new PipelineVM(pipeline);
        });
    }
}
