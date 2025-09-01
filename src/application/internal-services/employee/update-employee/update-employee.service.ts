import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateEmployeeRequest } from "./update-employee.request";
import { EmployeeVM } from "src/application/ViewModels/employee/employee.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdateEmployeeService extends HandlerBase<UpdateEmployeeRequest, EmployeeVM> {
    protected async executeCore(request: UpdateEmployeeRequest, data?: any): Promise<EmployeeVM> {
        return await this.transaction<EmployeeVM>(async (tx) => {
            // Verificar se o funcionário existe
            const existingEmployee = await tx.employee.findFirst({
                where: {
                    id: request.id,
                    isActive: true
                },
                include: { address: true }
            });

            if (!existingEmployee) {
                throw new BaseException('Funcionário não encontrado', 404);
            }

            // Preparar dados para atualização
            const updateData: any = {};

            if (request.fullName !== undefined) updateData.fullName = request.fullName;
            if (request.photo !== undefined) updateData.photo = request.photo;
            if (request.cpf !== undefined) updateData.cpf = request.cpf;
            if (request.birthDate !== undefined) updateData.birthDate = new Date(request.birthDate);
            if (request.sex !== undefined) updateData.sex = request.sex;
            if (request.email !== undefined) updateData.email = request.email;
            if (request.phone !== undefined) updateData.phone = request.phone;
            if (request.function !== undefined) updateData.function = request.function;
            if (request.department !== undefined) updateData.department = request.department;
            if (request.internalRegistration !== undefined) updateData.internalRegistration = request.internalRegistration;
            if (request.admissionDate !== undefined) updateData.admissionDate = new Date(request.admissionDate);
            if (request.typeOfContract !== undefined) updateData.typeOfContract = request.typeOfContract;
            if (request.salary !== undefined) updateData.salary = request.salary;
            if (request.comission !== undefined) updateData.comission = request.comission;
            if (request.status !== undefined) updateData.status = request.status;
            if (request.userId !== undefined) updateData.userId = request.userId;
            this.logger.debug("Resiquições informadas no if");
            
            // Atualizar endereço se fornecido
            if (request?.address) {
                const existentAddress = await tx.employeeAddress.findFirst({
                    where: {
                        employeeId: request.id
                    }
                });

                if (existentAddress) {
                    let currentAddress = existentAddress as any;
                    currentAddress = {
                        street: request.address?.street !== undefined ? request.address?.street : currentAddress.street,
                        number: request.address?.number !== undefined ? request.address?.number : currentAddress.number,
                        complement: request.address?.complement !== undefined ? request.address?.complement : currentAddress.complement,
                        district: request.address?.district !== undefined ? request.address?.district : currentAddress.district,
                        city: request.address?.city !== undefined ? request.address?.city : currentAddress.city,
                        state: request.address?.state !== undefined ? request.address?.state : currentAddress.state,
                        cep: request.address?.cep !== undefined ? request.address?.cep : currentAddress.cep
                    };

                    await tx.employeeAddress.update({
                        where: {
                            id: existentAddress.id
                        },
                        data: currentAddress
                    });
                } 
                
            }

            this.logger.debug("Atualizando funcionário");
            // Atualizar funcionário
            const updatedEmployee = await tx.employee.update({
                where: { id: request.id },
                data: updateData,
                include: { address: true }
            });

            return new EmployeeVM(updatedEmployee);
        });
    }
}
