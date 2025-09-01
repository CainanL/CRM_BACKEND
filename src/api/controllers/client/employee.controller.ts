import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateEmployeeRequest } from "src/application/internal-services/employee/create-employee/create-employee.request";
import { CreateEmployeeService } from "src/application/internal-services/employee/create-employee/create-employee.service";
import { GetEmployeeByIdRequest } from "src/application/internal-services/employee/get-employee-by-id/get-employee-by-id.request";
import { GetEmployeeByIdService } from "src/application/internal-services/employee/get-employee-by-id/get-employee-by-id.service";
import { QueryEmployeesRequest } from "src/application/internal-services/employee/query-employees/query-employees.request";
import { QueryEmployeesService } from "src/application/internal-services/employee/query-employees/query-employees.service";
import { UpdateEmployeeRequest } from "src/application/internal-services/employee/update-employee/update-employee.request";
import { UpdateEmployeeService } from "src/application/internal-services/employee/update-employee/update-employee.service";
import { DeleteEmployeeRequest } from "src/application/internal-services/employee/delete-employee/delete-employee.request";
import { DeleteEmployeeService } from "src/application/internal-services/employee/delete-employee/delete-employee.service";
import { ChangeEmployeeStatusRequest } from "src/application/internal-services/employee/change-employee-status/change-employee-status.request";
import { ChangeEmployeeStatusService } from "src/application/internal-services/employee/change-employee-status/change-employee-status.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("employee")
@ApiTenant()
export class EmployeeController {
    constructor(
        private readonly createEmployeeService: CreateEmployeeService,
        private readonly getEmployeeByIdService: GetEmployeeByIdService,
        private readonly queryEmployeesService: QueryEmployeesService,
        private readonly updateEmployeeService: UpdateEmployeeService,
        private readonly deleteEmployeeService: DeleteEmployeeService,
        private readonly changeEmployeeStatusService: ChangeEmployeeStatusService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createEmployee(@Body() body: CreateEmployeeRequest, @Request() req) {
        return await this.createEmployeeService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getEmployeeById(@Param() param: GetEmployeeByIdRequest, @Request() req) {
        return await this.getEmployeeByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryEmployees(@Query() query: QueryEmployeesRequest, @Request() req) {
        return await this.queryEmployeesService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateEmployee(@Body() body: UpdateEmployeeRequest, @Request() req) {
        return await this.updateEmployeeService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteEmployee(@Param() param: DeleteEmployeeRequest, @Request() req) {
        return await this.deleteEmployeeService.execute(param, req);
    }

    @Put("/status")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async changeEmployeeStatus(@Body() body: ChangeEmployeeStatusRequest, @Request() req) {
        return await this.changeEmployeeStatusService.execute(body, req);
    }
}
