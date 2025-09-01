import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ChangeClientStatusRequest } from "./change-client-status.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class ChangeClientStatusService extends HandlerBase<ChangeClientStatusRequest, ClientVM> {
    protected async executeCore(request: ChangeClientStatusRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const existingClient = await tx.client.findUnique({
                where: { id: request.id }
            });

            if (!existingClient) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            const client = await tx.client.update({
                where: { id: request.id },
                data: { status: request.status },
                include: { address: true }
            });

            return new ClientVM(client);
        });
    }
}
