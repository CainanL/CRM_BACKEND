import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryEmployeesRequest extends QueryBase {    

    @ApiPropertyOptional({ example: EmployeeStatus.ACTIVE, description: "Filtrar por status", enum: EmployeeStatus })
    @IsEnum(EmployeeStatus)
    @IsOptional()
    status?: EmployeeStatus;

}
