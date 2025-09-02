import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsUUID } from "class-validator";
import { ActivityType } from "src/repos/enums/activity-type.enum";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class UpdateActivityRequest {
    @ApiProperty({ example: "activity-uuid-123", description: "ID da atividade" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiPropertyOptional({ example: ActivityType.TASK, description: "Tipo da atividade", enum: ActivityType })
    @IsEnum(ActivityType)
    @IsOptional()
    type?: ActivityType;

    @ApiPropertyOptional({ example: "Reunião com cliente atualizada", description: "Título da atividade" })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: "Discussão sobre projeto de energia solar - atualizada", description: "Descrição da atividade" })
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

    @ApiPropertyOptional({ example: Priority.HIGH, description: "Prioridade da atividade", enum: Priority })
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @ApiPropertyOptional({ example: ActivityStatus.IN_PROGRESS, description: "Status da atividade", enum: ActivityStatus })
    @IsEnum(ActivityStatus)
    @IsOptional()
    status?: ActivityStatus;

    @ApiPropertyOptional({ example: "user-uuid-456", description: "ID do usuário responsável pela atividade" })
    @IsUUID()
    @IsOptional()
    responsibleEmployeeId?: string;

    @ApiPropertyOptional({ example: "client-uuid-789", description: "ID do cliente relacionado" })
    @IsUUID()
    @IsOptional()
    clientId?: string;

    @ApiPropertyOptional({ example: "2024-01-15T09:30:00Z", description: "Data para lembrete" })
    @IsDateString()
    @IsOptional()
    reminderDate?: string;

    @ApiPropertyOptional({ example: "google-event-456", description: "ID do evento no calendário externo" })
    @IsString()
    @IsOptional()
    externalEventId?: string;
}
