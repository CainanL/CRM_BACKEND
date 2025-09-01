import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ChangeEmployeeStatusRequest } from "./change-employee-status.request";
import { EmployeeVM } from "src/application/ViewModels/employee/employee.vm";

@Injectable()
export class ChangeEmployeeStatusService extends HandlerBase<ChangeEmployeeStatusRequest, EmployeeVM> {
    protected async executeCore(request: ChangeEmployeeStatusRequest, data?: any): Promise<EmployeeVM> {
        return await this.transaction<EmployeeVM>(async (tx) => {
            // Verificar se o funcionário existe
            const existingEmployee = await tx.employee.findFirst({
                where: { 
                    id: request.id,
                    isActive: true
                }
            });

            if (!existingEmployee) {
                throw new Error('Funcionário não encontrado');
            }

            // Atualizar status
            const updatedEmployee = await tx.employee.update({
                where: { id: request.id },
                data: { 
                    status: request.status,
                    // Se o status for TERMINATED, inativar também
                    isActive: request.status === 'TERMINATED' ? false : true
                },
                include: { address: true }
            });

            return new EmployeeVM(updatedEmployee);
        });
    }
}
