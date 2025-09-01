import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreatePipelineRequest } from "./create-pipeline.request";
import { PipelineVM } from "src/application/ViewModels/pipeline/pipeline.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreatePipelineService extends HandlerBase<CreatePipelineRequest, PipelineVM> {
    protected async executeCore(request: CreatePipelineRequest, data?: any): Promise<PipelineVM> {

        return await this.transaction<PipelineVM>(async (tx) => {

            // Verificar se o agrupamento existe
            const group = await tx.pipelineGroup.findUnique({
                where: { id: request.groupId }
            });

            if (!group) {
                throw new BaseException("Agrupamento não encontrado", 404);
            }

            // Verificar se já existe um funil com o mesmo nome no agrupamento
            const existingPipeline = await tx.pipeline.findFirst({
                where: {
                    groupId: request.groupId,
                    name: request.name,
                    isActive: true
                }
            });

            if (existingPipeline) {
                throw new BaseException("Já existe um funil com este nome neste agrupamento", 400);
            }

            const pipeline = await tx.pipeline.create({
                data: {
                    name: request.name,
                    description: request.description,
                    groupId: request.groupId,
                    createdBy: this.user.id,
                    isActive: true
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
