import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateEmployeeRequest } from "./create-employee.request";
import { EmployeeVM } from "src/application/ViewModels/employee/employee.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { ValidatorsHelpers } from "src/application/common/helpers/validators.helpers";

@Injectable()
export class CreateEmployeeService extends HandlerBase<CreateEmployeeRequest, EmployeeVM> {
    protected async executeCore(request: CreateEmployeeRequest, data?: any): Promise<EmployeeVM> {

        return await this.transaction<EmployeeVM>(async (tx) => {

            const coutn = await tx.employee.count();

            const internalRegistration = request?.internalRegistration || String(coutn + 1);

            let employee = await tx.employee.create({
                data: {
                    fullName: request.fullName,
                    photo: request.photo,
                    cpf: request.cpf,
                    birthDate: new Date(request.birthDate),
                    sex: request.sex,
                    email: request.email,
                    phone: request.phone,
                    function: request.function,
                    department: request.department,
                    internalRegistration: internalRegistration,
                    admissionDate: new Date(request.admissionDate),
                    typeOfContract: request.typeOfContract,
                    salary: request.salary,
                    comission: request.comission,
                    status: request.status,
                    userId: request.userId,
                    isActive: true
                },
                include: { address: true }
            });

            const address = await tx.employeeAddress.create({
                data: {
                    street: request.address.street,
                    number: request.address.number,
                    complement: request.address.complement,
                    district: request.address.district,
                    city: request.address.city,
                    state: request.address.state,
                    cep: request.address.cep,
                    employee: {
                        connect: {
                            id: employee.id
                        }
                    }
                },
            });

            employee.address = address;

            return new EmployeeVM(employee);
        });
    }
}
