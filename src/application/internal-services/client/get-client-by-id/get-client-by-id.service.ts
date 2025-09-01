import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetClientByIdRequest } from "./get-client-by-id.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetClientByIdService extends HandlerBase<GetClientByIdRequest, ClientVM> {
    protected async executeCore(request: GetClientByIdRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const client = await tx.client.findUnique({
                where: { id: request.id },
                include: { address: true }
            });

            if (!client) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            return new ClientVM(client);
        });
    }
}
