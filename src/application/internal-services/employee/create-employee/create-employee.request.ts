import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDateString, IsEnum, IsNumber, IsUUID, ValidateNested, IsDefined } from "class-validator";
import { Type } from "class-transformer";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";
import { ContractType } from "src/repos/enums/contract-type.enum";
import { Gender } from "src/repos/enums/gender.enum";
import { IsCPF } from "src/application/common/decorators/dto/is-cpf.decorator";
import { IsValidAge } from "src/application/common/decorators/dto/is-valid-age.decorator";

export class AddressRequest {
    @ApiProperty({ example: "Rua das Flores", description: "Nome da rua" })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ example: "123", description: "Número da residência" })
    @IsString()
    @IsNotEmpty()
    number: string;

    @ApiPropertyOptional({ example: "Apto 45", description: "Complemento" })
    @IsString()
    @IsOptional()
    complement?: string;

    @ApiProperty({ example: "Centro", description: "Bairro" })
    @IsString()
    @IsNotEmpty()
    district: string;

    @ApiProperty({ example: "São Paulo", description: "Cidade" })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: "SP", description: "Estado" })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: "01234-567", description: "CEP" })
    @IsString()
    @IsNotEmpty()
    cep: string;
}

export class CreateEmployeeRequest {
    @ApiProperty({ example: "João Silva Santos", description: "Nome completo do funcionário" })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiPropertyOptional({ example: "https://example.com/photo.jpg", description: "URL da foto" })
    @IsString()
    @IsOptional()
    photo?: string;

    @ApiProperty({ example: "123.456.789-00", description: "CPF do funcionário" })
    @IsString()
    @IsNotEmpty()
    @IsCPF({ message: "CPF inválido" })
    cpf: string;

    @ApiProperty({ example: "1990-05-15", description: "Data de nascimento" })
    @IsDateString()
    @IsNotEmpty()
    @IsValidAge(14, 120, { message: "Funcionário deve ter entre 14 e 120 anos" })
    birthDate: string;

    @ApiProperty({ example: Gender.MALE, description: "Sexo", enum: Gender })
    @IsEnum(Gender)
    @IsNotEmpty()
    sex: Gender;

    @ApiProperty({ example: "joao.silva@empresa.com", description: "Email do funcionário" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({ example: "(11) 99999-9999", description: "Telefone" })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ type: AddressRequest, description: "Endereço completo" })
    @IsDefined({ message: "O endereço é obrigatório" })
    @ValidateNested()
    @Type(() => AddressRequest)
    address: AddressRequest;

    @ApiProperty({ example: "Desenvolvedor Full Stack", description: "Cargo/função" })
    @IsString()
    @IsNotEmpty()
    function: string;

    @ApiProperty({ example: "TI", description: "Departamento" })
    @IsString()
    @IsNotEmpty()
    department: string;

    @ApiProperty({ example: "EMP001", description: "Registro interno" })
    @IsString()
    @IsOptional()
    internalRegistration?: string;

    @ApiProperty({ example: "2023-01-15", description: "Data de admissão" })
    @IsDateString()
    @IsNotEmpty()
    admissionDate: string;

    @ApiProperty({ example: ContractType.CLT, description: "Tipo de contrato", enum: ContractType })
    @IsEnum(ContractType)
    @IsNotEmpty()
    typeOfContract: ContractType;

    @ApiProperty({ example: 5000.00, description: "Salário base" })
    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @ApiPropertyOptional({ example: 500.00, description: "Comissão" })
    @IsNumber()
    @IsOptional()
    comission?: number;

    @ApiProperty({ example: EmployeeStatus.ACTIVE, description: "Status do funcionário", enum: EmployeeStatus })
    @IsEnum(EmployeeStatus)
    @IsNotEmpty()
    status: EmployeeStatus;

    // @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do usuário para autenticação" })
    // @IsUUID()
    // @IsOptional()
    // userId?: string;
}
