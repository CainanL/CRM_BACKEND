import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryEmployeesRequest } from "./query-employees.request";
import { EmployeeToListVm, EmployeeVM } from "src/application/ViewModels/employee/employee.vm";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";



@Injectable()
export class QueryEmployeesService extends HandlerBase<QueryEmployeesRequest, PaginatedResponse<EmployeeToListVm>> {
    protected async executeCore(request: QueryEmployeesRequest, data?: any): Promise<PaginatedResponse<EmployeeToListVm>> {

        const where = {
            OR: [
                { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                { function: { contains: request.textSearch, mode: 'insensitive' } },
                { department: { contains: request.textSearch, mode: 'insensitive' } }
            ],
            status: request.status
        };
        // Contar total de registros
        const total = await this.context.employee.count({ where: {
            OR: [
                { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                { function: { contains: request.textSearch, mode: 'insensitive' } },
                { department: { contains: request.textSearch, mode: 'insensitive' } }
            ],
            status: request.status
        } });
        this.logger.debug(`Total de registros: ${total}`);
        // Buscar funcionários com paginação
        const employees = await this.context.employee.findMany({
            where: {
                OR: [
                    { fullName: { contains: request.textSearch, mode: 'insensitive' } },
                    { function: { contains: request.textSearch, mode: 'insensitive' } },
                    { department: { contains: request.textSearch, mode: 'insensitive' } }
                ],
                status: request.status
            },
            skip: request.skip,
            take: request.take,
            orderBy: {
                fullName: 'asc'
            }
        });

        return new PaginatedResponse<EmployeeToListVm>(employees.map(x => new EmployeeToListVm(x)), request.page, request.size, total);
    }
}
