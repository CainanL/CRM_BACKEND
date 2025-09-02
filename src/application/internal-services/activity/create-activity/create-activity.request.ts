import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsUUID } from "class-validator";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class CreateActivityRequest {
    @ApiProperty({ example: ActivityType.TASK, description: "Tipo da atividade", enum: ActivityType })
    @IsEnum(ActivityType)
    @IsNotEmpty()
    type: ActivityType;

    @ApiProperty({ example: "Reunião com cliente", description: "Título da atividade" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: "Discussão sobre projeto de energia solar", description: "Descrição da atividade" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: "2024-01-15T10:00:00Z", description: "Data de início" })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiPropertyOptional({ example: "2024-01-15T11:00:00Z", description: "Data de término" })
    @IsDateString()
    @IsOptional()
    endDate?: string;

    @ApiPropertyOptional({ example: "2024-01-15T12:00:00Z", description: "Data limite para conclusão" })
    @IsDateString()
    @IsOptional()
    dueDate?: string;

    @ApiProperty({ example: Priority.MEDIUM, description: "Prioridade da atividade", enum: Priority })
    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;

    @ApiProperty({ example: ActivityStatus.PENDING, description: "Status da atividade", enum: ActivityStatus })
    @IsEnum(ActivityStatus)
    @IsNotEmpty()
    status: ActivityStatus;

    @ApiProperty({ example: "user-uuid-123", description: "ID do funcionário responsável pela atividade" })
    @IsUUID()
    @IsNotEmpty()
    responsibleEmployeeId: string;

    @ApiPropertyOptional({ example: "client-uuid-456", description: "ID do cliente relacionado" })
    @IsUUID()
    @IsOptional()
    clientId?: string;

    @ApiPropertyOptional({ example: "2024-01-15T09:30:00Z", description: "Data para lembrete" })
    @IsDateString()
    @IsOptional()
    reminderDate?: string;

    @ApiPropertyOptional({ example: "google-event-123", description: "ID do evento no calendário externo" })
    @IsString()
    @IsOptional()
    externalEventId?: string;
}
