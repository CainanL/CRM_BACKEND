import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryInteractionsRequest } from "./query-interactions.request";
import { ClientInteractionToListVm } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";


@Injectable()
export class QueryInteractionsService extends HandlerBase<QueryInteractionsRequest, PaginatedResponse<ClientInteractionToListVm>> {
    protected async executeCore(request: QueryInteractionsRequest, data?: any): Promise<PaginatedResponse<ClientInteractionToListVm>> {

        return await this.transaction<PaginatedResponse<ClientInteractionToListVm>>(async (tx) => {


            const [interactions, total] = await Promise.all([
                tx.clientInteraction.findMany({
                    where: {
                        OR: [
                            { description: { contains: request?.textSearch, mode: 'insensitive' } },
                            { result: { contains: request?.textSearch, mode: 'insensitive' } },
                            {
                                client: {
                                    OR: [
                                        { fullName: { contains: request?.textSearch, mode: 'insensitive' } },
                                        { companyName: { contains: request?.textSearch, mode: 'insensitive' } },
                                        { tradeName: { contains: request?.textSearch, mode: 'insensitive' } }
                                    ]
                                }
                            }
                        ],
                        clientId: request?.clientId,
                        employeeId: request?.employeeId,
                        interactionType: request?.interactionType,
                        status: request?.status,
                        priority: request?.priority,
                        tags: { hasSome: request?.tags },
                        interactionDate: { gte: request?.startDate, lte: request?.endDate },
                        isActive: true,
                    },
                    include: {
                        client: { include: { address: true } },
                        employee: {include: {address: true}}
                    },
                    skip: request.skip,
                    take: request.take,
                    orderBy: { interactionDate: 'desc' }
                }),
                tx.clientInteraction.count({
                    where: {
                        OR: [
                            { description: { contains: request.textSearch, mode: 'insensitive' } },
                            { result: { contains: request.textSearch, mode: 'insensitive' } },
                            {
                                client: {
                                    OR: [
                                        { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                                        { companyName: { contains: request.textSearch, mode: 'insensitive' } },
                                        { tradeName: { contains: request.textSearch, mode: 'insensitive' } }
                                    ]
                                }
                            }
                        ],
                        clientId: request.clientId,
                        employeeId: request.employeeId,
                        interactionType: request.interactionType,
                        status: request.status,
                        priority: request.priority,
                        tags: { hasSome: request.tags },
                        interactionDate: { gte: request.startDate, lte: request.endDate },
                        isActive: true,
                    }
                })
            ]);

            return new PaginatedResponse<ClientInteractionToListVm>(interactions.map(interaction => new ClientInteractionToListVm(interaction)), request.page, request.size, total);
        });
    }
}

