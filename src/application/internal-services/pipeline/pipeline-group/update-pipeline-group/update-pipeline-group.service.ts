import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdatePipelineGroupRequest } from "./update-pipeline-group.request";
import { PipelineGroupVM } from "src/application/ViewModels/pipeline/pipeline-group.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdatePipelineGroupService extends HandlerBase<UpdatePipelineGroupRequest, PipelineGroupVM> {
    protected async executeCore(request: UpdatePipelineGroupRequest, data?: any): Promise<PipelineGroupVM> {

        return await this.transaction<PipelineGroupVM>(async (tx) => {

            // Verificar se o agrupamento existe
            const existingGroup = await tx.pipelineGroup.findUnique({
                where: { id: request.id }
            });

            if (!existingGroup) {
                throw new BaseException("Agrupamento não encontrado", 404);
            }

            // Verificar se já existe outro agrupamento com o mesmo nome
            const duplicateGroup = await tx.pipelineGroup.findFirst({
                where: {
                    name: request.name,
                    isActive: true,
                    id: { not: request.id }
                }
            });

            if (duplicateGroup) {
                throw new BaseException("Já existe um agrupamento com este nome", 400);
            }

            const group = await tx.pipelineGroup.update({
                where: { id: request.id },
                data: {
                    name: request.name,
                    description: request.description
                },
                include: {
                    pipelines: {
                        include: {
                            stages: true,
                            opportunities: { where: { isActive: true } }
                        }
                    }
                }
            });

            return new PipelineGroupVM(group);
        });
    }
}
