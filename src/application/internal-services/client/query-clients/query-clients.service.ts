import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryClientsRequest } from "./query-clients.request";
import { ClientToListVm } from "src/application/ViewModels/client/client.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";


@Injectable()
export class QueryClientsService extends HandlerBase<QueryClientsRequest, PaginatedResponse<ClientToListVm>> {
    protected async executeCore(request: QueryClientsRequest, data?: any): Promise<PaginatedResponse<ClientToListVm>> {

        return await this.transaction<PaginatedResponse<ClientToListVm>>(async (tx) => {
            const [clients, total] = await Promise.all([
                tx.client.findMany({
                    where: {
                        OR: [
                            { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                            { companyName: { contains: request.textSearch, mode: 'insensitive' } },
                            { email: { contains: request.textSearch, mode: 'insensitive' } },
                            { internalCode: { contains: request.textSearch, mode: 'insensitive' } }
                        ],
                        clientType: request.clientType,
                        status: request.status,
                        isActive: true
                    },
                    skip: request.skip,
                    take: request.take,
                    orderBy: { createdAt: 'desc' }
                }),
                tx.client.count({
                    where: {
                        OR: [
                            { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                            { companyName: { contains: request.textSearch, mode: 'insensitive' } },
                            { email: { contains: request.textSearch, mode: 'insensitive' } },
                            { internalCode: { contains: request.textSearch, mode: 'insensitive' } }
                        ],
                        clientType: request.clientType,
                        status: request.status,
                        isActive: true
                    }
                })
            ]);

            return new PaginatedResponse<ClientToListVm>(clients.map(client => new ClientToListVm(client)), request.page, request.size, total);
        });
    }
}
