import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {IsDefined, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateEmployeeRequest } from "src/application/internal-services/employee/create-employee/create-employee.request";

export class CreateUserBaseRequest {
    @ApiProperty({ type: CreateEmployeeRequest, description: "Usuário" })
    @IsDefined({ message: "O usuário é obrigatório" })
    @ValidateNested()
    @Type(() => CreateEmployeeRequest)
    public employee: CreateEmployeeRequest;

    @ApiProperty({ example: "cainan@komput.com.br" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '*admin123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "Cainan Luyles" })
    @IsString()
    @IsNotEmpty()
    name: string
}