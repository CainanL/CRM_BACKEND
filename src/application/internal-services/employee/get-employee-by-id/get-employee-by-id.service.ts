import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetEmployeeByIdRequest } from "./get-employee-by-id.request";
import { EmployeeVM } from "src/application/ViewModels/employee/employee.vm";

@Injectable()
export class GetEmployeeByIdService extends HandlerBase<GetEmployeeByIdRequest, EmployeeVM> {
    protected async executeCore(request: GetEmployeeByIdRequest, data?: any): Promise<EmployeeVM> {
        const employee = await this.context.employee.findFirst({
            where: { 
                id: request.id,
                isActive: true
            },
            include: { address: true }
        });

        if (!employee) {
            throw new Error('Funcionário não encontrado');
        }

        return new EmployeeVM(employee);
    }
}
