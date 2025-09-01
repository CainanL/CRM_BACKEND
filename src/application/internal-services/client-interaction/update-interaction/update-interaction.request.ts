import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsArray, IsDateString, IsNumber, IsDecimal } from "class-validator";
import { Type } from "class-transformer";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class UpdateInteractionRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da interação" })
    @IsUUID()
    @IsNotEmpty()
    id: string;


    @ApiProperty({ example: InteractionType.PHONE_CALL, description: "Tipo de interação", enum: InteractionType })
    @IsEnum(InteractionType)
    @IsNotEmpty()
    interactionType: InteractionType;

    @ApiProperty({ example: "2024-01-15T14:30:00Z", description: "Data e hora da interação" })
    @IsDateString()
    @IsNotEmpty()
    interactionDate: string;

    @ApiProperty({ example: "Ligação para esclarecimento sobre proposta comercial", description: "Descrição detalhada da interação" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: InteractionStatus.SUCCESS, description: "Status da interação", enum: InteractionStatus })
    @IsEnum(InteractionStatus)
    @IsNotEmpty()
    status: InteractionStatus;

    @ApiProperty({ example: "Cliente interessado, agendou reunião para próxima semana", description: "Resultado da interação" })
    @IsString()
    @IsNotEmpty()
    result: string;

    @ApiProperty({ example: [InteractionTag.SALES, InteractionTag.FOLLOW_UP], description: "Tags para categorização", enum: InteractionTag, isArray: true })
    @IsArray()
    @IsEnum(InteractionTag, { each: true })
    @IsNotEmpty()
    tags: InteractionTag[];

    @ApiPropertyOptional({ example: 15, description: "Duração em minutos" })
    @IsNumber()
    @IsOptional()
    duration?: number;

    @ApiPropertyOptional({ example: "2024-01-22T14:30:00Z", description: "Data para follow-up" })
    @IsDateString()
    @IsOptional()
    followUpDate?: string;

    @ApiPropertyOptional({ example: Priority.HIGH, description: "Prioridade da interação", enum: Priority })
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @ApiPropertyOptional({ example: 25.50, description: "Custo da interação" })
    @IsDecimal()
    @IsOptional()
    cost?: string;
}
