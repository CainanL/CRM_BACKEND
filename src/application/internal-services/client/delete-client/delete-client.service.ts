import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteClientRequest } from "./delete-client.request";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class DeleteClientService extends HandlerBase<DeleteClientRequest, void> {
    protected async executeCore(request: DeleteClientRequest, data?: any): Promise<void> {

        return await this.transaction<void>(async (tx) => {

            const existingClient = await tx.client.findUnique({
                where: { id: request.id }
            });

            if (!existingClient) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            // Soft delete - apenas marca como inativo
            await tx.client.update({
                where: { id: request.id },
                data: { isActive: false }
            });
        });
    }
}
