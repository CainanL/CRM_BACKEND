import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDateString, IsEnum, IsNumber, IsUUID, ValidateNested, IsDefined } from "class-validator";
import { Type } from "class-transformer";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";
import { ContractType } from "src/repos/enums/contract-type.enum";
import { Gender } from "src/repos/enums/gender.enum";
import { IsCPF } from "src/application/common/decorators/dto/is-cpf.decorator";
import { IsValidAge } from "src/application/common/decorators/dto/is-valid-age.decorator";

export class UpdateAddressRequest {
    @ApiPropertyOptional({ example: "Rua das Flores", description: "Nome da rua" })
    @IsString()
    @IsOptional()
    street?: string;

    @ApiPropertyOptional({ example: "123", description: "Número da residência" })
    @IsString()
    @IsOptional()
    number?: string;

    @ApiPropertyOptional({ example: "Apto 45", description: "Complemento" })
    @IsString()
    @IsOptional()
    complement?: string;

    @ApiPropertyOptional({ example: "Centro", description: "Bairro" })
    @IsString()
    @IsOptional()
    district?: string;

    @ApiPropertyOptional({ example: "São Paulo", description: "Cidade" })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiPropertyOptional({ example: "SP", description: "Estado" })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiPropertyOptional({ example: "01234-567", description: "CEP" })
    @IsString()
    @IsOptional()
    cep?: string;
}

export class UpdateEmployeeRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiPropertyOptional({ example: "João Silva Santos", description: "Nome completo do funcionário" })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiPropertyOptional({ example: "https://example.com/photo.jpg", description: "URL da foto" })
    @IsString()
    @IsOptional()
    photo?: string;

    @ApiPropertyOptional({ example: "123.456.789-00", description: "CPF do funcionário" })
    @IsString()
    @IsOptional()
    @IsCPF({ message: "CPF inválido" })
    cpf?: string;

    @ApiPropertyOptional({ example: "1990-05-15", description: "Data de nascimento" })
    @IsDateString()
    @IsOptional()
    @IsValidAge(14, 120, { message: "Funcionário deve ter entre 14 e 120 anos" })
    birthDate?: string;

    @ApiPropertyOptional({ example: Gender.MALE, description: "Sexo", enum: Gender })
    @IsEnum(Gender)
    @IsOptional()
    sex?: Gender;

    @ApiPropertyOptional({ example: "joao.silva@empresa.com", description: "Email do funcionário" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: "(11) 99999-9999", description: "Telefone" })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ type: UpdateAddressRequest, description: "Endereço completo" })
    @IsDefined({ message: "O endereço é obrigatório" })
    @ValidateNested()
    @Type(() => UpdateAddressRequest)
    address?: UpdateAddressRequest;

    @ApiPropertyOptional({ example: "Desenvolvedor Full Stack", description: "Cargo/função" })
    @IsString()
    @IsOptional()
    function?: string;

    @ApiPropertyOptional({ example: "TI", description: "Departamento" })
    @IsString()
    @IsOptional()
    department?: string;

    @ApiPropertyOptional({ example: "EMP001", description: "Registro interno" })
    @IsString()
    @IsOptional()
    internalRegistration?: string;

    @ApiPropertyOptional({ example: "2023-01-15", description: "Data de admissão" })
    @IsDateString()
    @IsOptional()
    admissionDate?: string;

    @ApiPropertyOptional({ example: ContractType.CLT, description: "Tipo de contrato", enum: ContractType })
    @IsEnum(ContractType)
    @IsOptional()
    typeOfContract?: ContractType;

    @ApiPropertyOptional({ example: 5000.00, description: "Salário base" })
    @IsNumber()
    @IsOptional()
    salary?: number;

    @ApiPropertyOptional({ example: 500.00, description: "Comissão" })
    @IsNumber()
    @IsOptional()
    comission?: number;

    @ApiPropertyOptional({ example: EmployeeStatus.ACTIVE, description: "Status do funcionário", enum: EmployeeStatus })
    @IsEnum(EmployeeStatus)
    @IsOptional()
    status?: EmployeeStatus;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do usuário para autenticação" })
    @IsUUID()
    @IsOptional()
    userId?: string;
}
