import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateInteractionRequest } from "./update-interaction.request";
import { ClientInteractionVM } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdateInteractionService extends HandlerBase<UpdateInteractionRequest, ClientInteractionVM> {
    protected async executeCore(request: UpdateInteractionRequest, data?: any): Promise<ClientInteractionVM> {

        return await this.transaction<ClientInteractionVM>(async (tx) => {

            const existingInteraction = await tx.clientInteraction.findUnique({
                where: { id: request.id }
            });

            if (!existingInteraction) {
                throw new BaseException("Interação não encontrada", 404);
            }

            const employee = await tx.employee.findFirst({
                where: { userId: this.user.id}
            });

            if (!employee) {
                throw new BaseException("Funcionário não encontrado", 404);
            }

            const interaction = await tx.clientInteraction.update({
                where: { id: request.id },
                data: {
                    employeeId: employee.id,
                    interactionType: request.interactionType,
                    interactionDate: new Date(request.interactionDate),
                    description: request.description,
                    status: request.status,
                    result: request.result,
                    tags: request.tags,
                    duration: request.duration,
                    followUpDate: request.followUpDate ? new Date(request.followUpDate) : null,
                    priority: request.priority,
                    cost: request.cost ? parseFloat(request.cost) : null
                },
                include: {
                    client: { include: { address: true } },
                    employee: {include: {address: true}}
                }
            });

            return new ClientInteractionVM(interaction);
        });
    }
}

