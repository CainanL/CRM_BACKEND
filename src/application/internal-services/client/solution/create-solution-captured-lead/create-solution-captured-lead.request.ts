import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { LeadStatus } from "src/repos/enums/lead-status.enum";

export class SolutionFieldValueRequest {
    @ApiProperty({ example: "Nome", description: "Título do campo" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: "João Silva", description: "Valor do campo" })
    @IsString()
    @IsOptional()
    value?: string;

    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID das configurações do campo" })
    @IsString()
    @IsNotEmpty()
    settingsId: string;
}

export class CreateSolutionCapturedLeadRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da Solução" })
    @IsString()
    @IsNotEmpty()
    solutionId: string;

    @ApiPropertyOptional({ 
        example: LeadStatus.HOT, 
        description: "Status do lead",
        enum: LeadStatus
    })
    @IsEnum(LeadStatus)
    @IsOptional()
    status?: LeadStatus = LeadStatus.NEW;

    @ApiProperty({ 
        type: [SolutionFieldValueRequest], 
        description: "Array com os valores dos campos do lead" 
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SolutionFieldValueRequest)
    fieldValues: SolutionFieldValueRequest[];
}
