import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetPipelinesByGroupRequest } from "./get-pipelines-by-group.request";
import { PipelineToListVm } from "src/application/ViewModels/pipeline/pipeline.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetPipelinesByGroupService extends HandlerBase<GetPipelinesByGroupRequest, PaginatedResponse<PipelineToListVm>> {
    protected async executeCore(request: GetPipelinesByGroupRequest, data?: any): Promise<PaginatedResponse<PipelineToListVm>> {

        return await this.transaction<PaginatedResponse<PipelineToListVm>>(async (tx) => {

            // Verificar se o agrupamento existe
            const group = await tx.pipelineGroup.findUnique({
                where: { id: request.groupId }
            });

            if (!group) {
                throw new BaseException("Agrupamento não encontrado", 404);
            }

            const where = {
                groupId: request.groupId,
                isActive: true
            };

            const [pipelines, total] = await Promise.all([
                tx.pipeline.findMany({
                    where,
                    include: {
                        group: true,
                        stages: true,
                        opportunities: {
                            where: { isActive: true },
                            include: {
                                client: true,
                                stage: true,
                                assignedEmployee: true
                            }
                        }
                    },
                    skip: request.skip,
                    take: request.take,
                    orderBy: { createdAt: 'desc' }
                }),
                tx.pipeline.count({ where })
            ]);

            return new PaginatedResponse<PipelineToListVm>(
                pipelines.map(pipeline => new PipelineToListVm(pipeline)),
                request.page,
                request.size,
                total
            );
        });
    }
}
