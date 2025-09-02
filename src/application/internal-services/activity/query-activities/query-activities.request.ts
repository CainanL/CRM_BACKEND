import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsUUID, IsDateString } from "class-validator";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { Priority } from "src/repos/enums/priority.enum";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryActivitiesRequest extends QueryBase {
    @ApiPropertyOptional({ example: ActivityType.TASK, description: "Filtrar por tipo de atividade", enum: ActivityType })
    @IsEnum(ActivityType)
    @IsOptional()
    type?: ActivityType;

    @ApiPropertyOptional({ example: ActivityStatus.PENDING, description: "Filtrar por status", enum: ActivityStatus })
    @IsEnum(ActivityStatus)
    @IsOptional()
    status?: ActivityStatus;

    @ApiPropertyOptional({ example: Priority.HIGH, description: "Filtrar por prioridade", enum: Priority })
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @ApiPropertyOptional({ example: "user-uuid-123", description: "Filtrar por usuário responsável" })
    @IsUUID()
    @IsOptional()
    responsibleEmployeeId?: string;

    @ApiPropertyOptional({ example: "client-uuid-456", description: "Filtrar por cliente" })
    @IsUUID()
    @IsOptional()
    clientId?: string;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Filtrar atividades a partir desta data" })
    @IsDateString()
    @IsOptional()
    startDateFrom?: string;

    @ApiPropertyOptional({ example: "2024-01-31T23:59:59Z", description: "Filtrar atividades até esta data" })
    @IsDateString()
    @IsOptional()
    startDateTo?: string;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Filtrar por data de vencimento a partir desta data" })
    @IsDateString()
    @IsOptional()
    dueDateFrom?: string;

    @ApiPropertyOptional({ example: "2024-01-31T23:59:59Z", description: "Filtrar por data de vencimento até esta data" })
    @IsDateString()
    @IsOptional()
    dueDateTo?: string;

    @ApiPropertyOptional({ example: "true", description: "Filtrar apenas atividades atrasadas" })
    @IsOptional()
    isOverdue?: boolean;
}
