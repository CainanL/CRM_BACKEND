import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryOpportunitiesRequest } from "./query-opportunities.request";
import { OpportunityToListVm } from "src/application/ViewModels/pipeline/opportunity.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";

@Injectable()
export class QueryOpportunitiesService extends HandlerBase<QueryOpportunitiesRequest, PaginatedResponse<OpportunityToListVm>> {
    protected async executeCore(request: QueryOpportunitiesRequest, data?: any): Promise<PaginatedResponse<OpportunityToListVm>> {

        return await this.transaction<PaginatedResponse<OpportunityToListVm>>(async (tx) => {

            const where: any = {
                isActive: true
            };

            // Filtros específicos
            if (request.clientId) {
                where.clientId = request.clientId;
            }

            if (request.pipelineId) {
                where.pipelineId = request.pipelineId;
            }

            if (request.stageId) {
                where.stageId = request.stageId;
            }

            if (request.assignedTo) {
                where.assignedTo = request.assignedTo;
            }

            if (request.status) {
                where.status = request.status;
            }

            // Filtros de data
            if (request.startDate || request.endDate) {
                where.createdAt = {};
                if (request.startDate) {
                    where.createdAt.gte = new Date(request.startDate);
                }
                if (request.endDate) {
                    where.createdAt.lte = new Date(request.endDate);
                }
            }

            // Busca por texto
            if (request.textSearch) {
                where.OR = [
                    { name: { contains: request.textSearch, mode: 'insensitive' } },
                    { description: { contains: request.textSearch, mode: 'insensitive' } }
                ];
            }

            const [opportunities, total] = await Promise.all([
                tx.opportunity.findMany({
                    where,
                    include: {
                        client: { include: { address: true } },
                        pipeline: { include: { group: true } },
                        stage: true,
                        assignedEmployee: { include: { address: true } }
                    },
                    skip: request.skip,
                    take: request.take,
                    orderBy: { createdAt: 'desc' }
                }),
                tx.opportunity.count({ where })
            ]);

            return new PaginatedResponse<OpportunityToListVm>(
                opportunities.map(opportunity => new OpportunityToListVm(opportunity)),
                request.page,
                request.size,
                total
            );
        });
    }
}
