import { Module } from "@nestjs/common";
import { CreateEmployeeService } from "./create-employee/create-employee.service";
import { GetEmployeeByIdService } from "./get-employee-by-id/get-employee-by-id.service";
import { QueryEmployeesService } from "./query-employees/query-employees.service";
import { UpdateEmployeeService } from "./update-employee/update-employee.service";
import { DeleteEmployeeService } from "./delete-employee/delete-employee.service";
import { ChangeEmployeeStatusService } from "./change-employee-status/change-employee-status.service";

@Module({
    providers: [
        CreateEmployeeService,
        GetEmployeeByIdService,
        QueryEmployeesService,
        UpdateEmployeeService,
        DeleteEmployeeService,
        ChangeEmployeeStatusService
    ],
    exports: [
        CreateEmployeeService,
        GetEmployeeByIdService,
        QueryEmployeesService,
        UpdateEmployeeService,
        DeleteEmployeeService,
        ChangeEmployeeStatusService
    ]
})
export class EmployeeModule { }
