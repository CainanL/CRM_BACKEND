import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteEmployeeRequest } from "./delete-employee.request";

@Injectable()
export class DeleteEmployeeService extends HandlerBase<DeleteEmployeeRequest, { message: string }> {
    protected async executeCore(request: DeleteEmployeeRequest, data?: any): Promise<{ message: string }> {
        return await this.transaction<{ message: string }>(async (tx) => {
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

            // Soft delete - apenas inativar
            await tx.employee.update({
                where: { id: request.id },
                data: { 
                    isActive: false,
                    status: 'TERMINATED' // Mudar status para demitido
                }
            });

            return { message: 'Funcionário excluído com sucesso' };
        });
    }
}
