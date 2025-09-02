import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsDateString, IsEnum } from "class-validator";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { Priority } from "src/repos/enums/priority.enum";

export enum ReportPeriod {
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR"
}

export class ActivityReportRequest {
    @ApiPropertyOptional({ example: ReportPeriod.MONTH, description: "Período do relatório", enum: ReportPeriod })
    @IsEnum(ReportPeriod)
    @IsOptional()
    period?: ReportPeriod;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data de início do período" })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiPropertyOptional({ example: "2024-01-31T23:59:59Z", description: "Data de fim do período" })
    @IsDateString()
    @IsOptional()
    endDate?: string;

    @ApiPropertyOptional({ example: ActivityType.TASK, description: "Filtrar por tipo de atividade", enum: ActivityType })
    @IsEnum(ActivityType)
    @IsOptional()
    type?: ActivityType;

    @ApiPropertyOptional({ example: ActivityStatus.COMPLETED, description: "Filtrar por status", enum: ActivityStatus })
    @IsEnum(ActivityStatus)
    @IsOptional()
    status?: ActivityStatus;

    @ApiPropertyOptional({ example: Priority.HIGH, description: "Filtrar por prioridade", enum: Priority })
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;
}
