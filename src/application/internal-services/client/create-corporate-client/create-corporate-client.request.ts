import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, ValidateNested, IsDefined, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { ClientStatus } from "src/repos/enums/client-status.enum";
import { IsCNPJ } from "src/application/common/decorators/dto/is-cnpj.decorator";

export class CorporateClientAddressRequest {
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

export class CreateCorporateClientRequest {
    @ApiProperty({ example: "Empresa LTDA", description: "Razão social da empresa" })
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @ApiProperty({ example: "Empresa", description: "Nome fantasia da empresa" })
    @IsString()
    @IsNotEmpty()
    tradeName: string;

    @ApiProperty({ example: "12.345.678/0001-90", description: "CNPJ da empresa" })
    @IsString()
    @IsNotEmpty()
    @IsCNPJ({ message: "CNPJ inválido" })
    cnpj: string;

    @ApiPropertyOptional({ example: "123456789", description: "Inscrição estadual" })
    @IsString()
    @IsOptional()
    stateRegistration?: string;

    @ApiPropertyOptional({ example: "987654321", description: "Inscrição municipal" })
    @IsString()
    @IsOptional()
    municipalRegistration?: string;

    @ApiPropertyOptional({ example: "https://example.com/photo.jpg", description: "URL da foto" })
    @IsString()
    @IsOptional()
    photo?: string;

    @ApiProperty({ example: "contato@empresa.com", description: "Email da empresa" })
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

    @ApiProperty({ type: CorporateClientAddressRequest, description: "Endereço completo" })
    @IsDefined({ message: "O endereço é obrigatório" })
    @ValidateNested()
    @Type(() => CorporateClientAddressRequest)
    address: CorporateClientAddressRequest;

    @ApiPropertyOptional({ example: "CLI001", description: "Código interno" })
    @IsString()
    @IsOptional()
    internalCode?: string;

    @ApiProperty({ example: ClientStatus.ACTIVE, description: "Status do cliente", enum: ClientStatus })
    @IsEnum(ClientStatus)
    @IsNotEmpty()
    status: ClientStatus;

    @ApiPropertyOptional({ example: "Empresa parceira com histórico de compras", description: "Observações sobre o cliente" })
    @IsString()
    @IsOptional()
    notes?: string;
}
