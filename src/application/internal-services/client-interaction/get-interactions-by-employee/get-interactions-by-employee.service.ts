import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { ClientInteractionToListVm } from "src/application/ViewModels/client-interaction/client-interaction.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { GetInteractionsByEmployeeRequest } from "./get-interaction-by-employee.request";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";


@Injectable()
export class GetInteractionsByEmployeeService extends HandlerBase<GetInteractionsByEmployeeRequest, PaginatedResponse<ClientInteractionToListVm>> {
    protected async executeCore(request: GetInteractionsByEmployeeRequest, data?: any): Promise<PaginatedResponse<ClientInteractionToListVm>> {

        return await this.transaction<PaginatedResponse<ClientInteractionToListVm>>(async (tx) => {

            // Verificar se o funcionário existe
            const employee = await tx.employee.findUnique({
                where: { id: request.employeeId }
            });

            if (!employee) {
                throw new BaseException("Funcionário não encontrado", 404);
            }

            const [interactions, total] = await Promise.all([
                tx.clientInteraction.findMany({
                    where: {
                        employeeId: request.employeeId,
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
                        employeeId: request.employeeId,
                        isActive: true
                    }
                })
            ]);

            return new PaginatedResponse<ClientInteractionToListVm>(interactions
                .map(interaction => new ClientInteractionToListVm(interaction)),
                request.page, request.size, total);
        });
    }
}
