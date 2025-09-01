import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateInteractionRequest } from "./create-interaction.request";
import { ClientInteractionVM } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreateInteractionService extends HandlerBase<CreateInteractionRequest, ClientInteractionVM> {
    protected async executeCore(request: CreateInteractionRequest, data?: any): Promise<ClientInteractionVM> {

        return await this.transaction<ClientInteractionVM>(async (tx) => {

            const employee = await tx.employee.findFirst({
                where: { userId: this.user.id }
            });

            if (!employee) {
                throw new BaseException("Funcionário não encontrado", 404);
            }
            // Verificar se o cliente existe
            const client = await tx.client.findFirst({
                where: { id: request.clientId }
            });
            if (!client) {
                throw new BaseException("Cliente não encontrado", 404);
            }
            const interaction = await tx.clientInteraction.create({
                data: {
                    clientId: request.clientId,
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
                    cost: request.cost ? parseFloat(request.cost) : null,
                    isActive: true
                },
                include: {
                    client: { include: { address: true } },
                    employee: { include: { address: true } }
                }
            });

            return new ClientInteractionVM(interaction);
        });
    }
}

