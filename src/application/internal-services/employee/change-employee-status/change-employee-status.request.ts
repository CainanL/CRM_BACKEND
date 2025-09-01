import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsUUID } from "class-validator";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";

export class ChangeEmployeeStatusRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: EmployeeStatus.INACTIVE, description: "Novo status do funcionário", enum: EmployeeStatus })
    @IsEnum(EmployeeStatus)
    @IsNotEmpty()
    status: EmployeeStatus;
}
