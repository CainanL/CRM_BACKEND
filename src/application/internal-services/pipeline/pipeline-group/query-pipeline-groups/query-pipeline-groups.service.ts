import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryPipelineGroupsRequest } from "./query-pipeline-groups.request";
import { PipelineGroupToListVm } from "src/application/ViewModels/pipeline/pipeline-group.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";

@Injectable()
export class QueryPipelineGroupsService extends HandlerBase<QueryPipelineGroupsRequest, PaginatedResponse<PipelineGroupToListVm>> {
    protected async executeCore(request: QueryPipelineGroupsRequest, data?: any): Promise<PaginatedResponse<PipelineGroupToListVm>> {

        return await this.transaction<PaginatedResponse<PipelineGroupToListVm>>(async (tx) => {

            const [groups, total] = await Promise.all([
                tx.pipelineGroup.findMany({
                    where: {
                        isActive: true,
                        OR: [
                            { name: { contains: request.textSearch, mode: 'insensitive' } },
                            { description: { contains: request.textSearch, mode: 'insensitive' } }
                        ]
                    },
                    include: {
                        pipelines: {
                            include: {
                                stages: true,
                                opportunities: { where: { isActive: true } }
                            }
                        }
                    },
                    skip: request.skip,
                    take: request.take,
                    orderBy: { createdAt: 'desc' }
                }),
                tx.pipelineGroup.count({
                    where: {
                        isActive: true,
                        OR: [
                            { name: { contains: request.textSearch, mode: 'insensitive' } },
                            { description: { contains: request.textSearch, mode: 'insensitive' } }
                        ]
                    }
                })
            ]);

            return new PaginatedResponse<PipelineGroupToListVm>(
                groups.map(group => new PipelineGroupToListVm(group)),
                request.page,
                request.size,
                total
            );
        });
    }
}
