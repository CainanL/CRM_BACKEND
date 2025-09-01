import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { ClientInteractionVM } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { GetInteractionByIdRequest } from "./get-interaction-by-id.request";

@Injectable()
export class GetInteractionByIdService extends HandlerBase<GetInteractionByIdRequest, ClientInteractionVM> {
    protected async executeCore(request: GetInteractionByIdRequest, data?: any): Promise<ClientInteractionVM> {

        return await this.transaction<ClientInteractionVM>(async (tx) => {

            const interaction = await tx.clientInteraction.findUnique({
                where: { id: request.id },
                include: {
                    client: { include: { address: true } },
                    employee: {include: {address: true}}
                }
            });

            if (!interaction) {
                throw new BaseException("Interação não encontrada", 404);
            }

            return new ClientInteractionVM(interaction);
        });
    }
}

