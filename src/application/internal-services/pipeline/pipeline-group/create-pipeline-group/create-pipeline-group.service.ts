import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreatePipelineGroupRequest } from "./create-pipeline-group.request";
import { PipelineGroupVM } from "src/application/ViewModels/pipeline/pipeline-group.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreatePipelineGroupService extends HandlerBase<CreatePipelineGroupRequest, PipelineGroupVM> {
    protected async executeCore(request: CreatePipelineGroupRequest, data?: any): Promise<PipelineGroupVM> {

        return await this.transaction<PipelineGroupVM>(async (tx) => {

            // Verificar se já existe um agrupamento com o mesmo nome
            const existingGroup = await tx.pipelineGroup.findFirst({
                where: {
                    name: request.name,
                    isActive: true
                }
            });

            if (existingGroup) {
                throw new BaseException("Já existe um agrupamento com este nome", 400);
            }

            const group = await tx.pipelineGroup.create({
                data: {
                    name: request.name,
                    description: request.description,
                    isActive: true
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
