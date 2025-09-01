import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { ClientInteractionToListVm, ClientInteractionVM } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { GetInteractionsByClientRequest } from "./get-interaction-by-client.request";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";


@Injectable()
export class GetInteractionsByClientService extends HandlerBase<GetInteractionsByClientRequest, PaginatedResponse<ClientInteractionToListVm>> {
    protected async executeCore(request: GetInteractionsByClientRequest, data?: any): Promise<PaginatedResponse<ClientInteractionToListVm>> {

        return await this.transaction<PaginatedResponse<ClientInteractionToListVm>>(async (tx) => {

            // Verificar se o cliente existe
            const client = await tx.client.findUnique({
                where: { id: request.clientId },
                include: { address: true }
            });

            if (!client) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            const [interactions, total] = await Promise.all([
                tx.clientInteraction.findMany({
                    where: {
                        clientId: request.clientId,
                        isActive: true
                    },
                    include: {
                        client: { include: { address: true } },
                        employee: {include: {address: true}}
                    },
                    orderBy: { interactionDate: 'desc' }
                }),
                tx.clientInteraction.count({
                    where: {
                        clientId: request.clientId,
                        isActive: true
                    },
                })
            ]);

            return new PaginatedResponse<ClientInteractionToListVm>(interactions
                .map(interaction => new ClientInteractionToListVm(interaction)),
                request.page, request.size, total);
        });
    }
}
