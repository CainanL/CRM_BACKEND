import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDateString, IsEnum, IsUUID, ValidateNested, IsDefined } from "class-validator";
import { Type } from "class-transformer";
import { ClientStatus } from "src/repos/enums/client-status.enum";
import { Gender } from "src/repos/enums/gender.enum";
import { IsCPF } from "src/application/common/decorators/dto/is-cpf.decorator";
import { IsValidAge } from "src/application/common/decorators/dto/is-valid-age.decorator";

export class IndividualClientAddressRequest {
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

export class CreateIndividualClientRequest {
    @ApiProperty({ example: "João Silva Santos", description: "Nome completo do cliente" })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ example: "123.456.789-00", description: "CPF do cliente" })
    @IsString()
    @IsNotEmpty()
    @IsCPF({ message: "CPF inválido" })
    cpf: string;

    @ApiProperty({ example: "1990-05-15", description: "Data de nascimento" })
    @IsDateString()
    @IsNotEmpty()
    @IsValidAge(14, 120, { message: "Cliente deve ter entre 14 e 120 anos" })
    birthDate: string;

    @ApiProperty({ example: Gender.MALE, description: "Sexo", enum: Gender })
    @IsEnum(Gender)
    @IsNotEmpty()
    sex: Gender;

    @ApiPropertyOptional({ example: "https://example.com/photo.jpg", description: "URL da foto" })
    @IsString()
    @IsOptional()
    photo?: string;

    @ApiProperty({ example: "joao.silva@empresa.com", description: "Email do cliente" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({ example: "(11) 99999-9999", description: "Telefone principal" })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ example: "(11) 88888-8888", description: "Telefone alternativo" })
    @IsString()
    @IsOptional()
    alternativePhone?: string;

    @ApiProperty({ type: IndividualClientAddressRequest, description: "Endereço completo" })
    @IsDefined({ message: "O endereço é obrigatório" })
    @ValidateNested()
    @Type(() => IndividualClientAddressRequest)
    address: IndividualClientAddressRequest;

    @ApiPropertyOptional({ example: "CLI001", description: "Código interno" })
    @IsString()
    @IsOptional()
    internalCode?: string;

    @ApiProperty({ example: ClientStatus.ACTIVE, description: "Status do cliente", enum: ClientStatus })
    @IsEnum(ClientStatus)
    @IsNotEmpty()
    status: ClientStatus;

    @ApiPropertyOptional({ example: "Cliente VIP com histórico de compras", description: "Observações sobre o cliente" })
    @IsString()
    @IsOptional()
    notes?: string;
}
