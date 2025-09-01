import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsUUID, IsArray, IsDateString } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class QueryInteractionsRequest extends QueryBase {
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do cliente" })
    @IsUUID()
    @IsOptional()
    clientId?: string;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsUUID()
    @IsOptional()
    employeeId?: string;

    @ApiPropertyOptional({ example: InteractionType.PHONE_CALL, description: "Tipo de interação", enum: InteractionType })
    @IsEnum(InteractionType)
    @IsOptional()
    interactionType?: InteractionType;

    @ApiPropertyOptional({ example: InteractionStatus.SUCCESS, description: "Status da interação", enum: InteractionStatus })
    @IsEnum(InteractionStatus)
    @IsOptional()
    status?: InteractionStatus;

    @ApiPropertyOptional({ example: [InteractionTag.SALES, InteractionTag.SUPPORT], description: "Tags para filtrar", enum: InteractionTag, isArray: true })
    @IsArray()
    @IsEnum(InteractionTag, { each: true })
    @IsOptional()
    tags?: InteractionTag[];

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data inicial para filtrar" })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiPropertyOptional({ example: "2024-12-31T23:59:59Z", description: "Data final para filtrar" })
    @IsDateString()
    @IsOptional()
    endDate?: string;

    @ApiPropertyOptional({ example: Priority.HIGH, description: "Prioridade da interação", enum: Priority })
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;
}
