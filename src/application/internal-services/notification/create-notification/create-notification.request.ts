import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsDateString } from "class-validator";
import { NotificationType } from "src/repos/enums/notification-type.enum";

export class CreateNotificationRequest {
    @ApiProperty({ example: NotificationType.EMAIL, description: "Tipo da notificação", enum: NotificationType })
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @ApiProperty({ example: "Lembrete: Reunião com cliente em 30 minutos", description: "Mensagem da notificação" })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ example: "activity-uuid-123", description: "ID da atividade relacionada" })
    @IsUUID()
    @IsNotEmpty()
    activityId: string;

    @ApiProperty({ example: "user-uuid-456", description: "ID do usuário a ser notificado" })
    @IsUUID()
    @IsNotEmpty()
    employeeId: string;

    @ApiPropertyOptional({ example: "2024-01-15T10:00:00Z", description: "Data de envio (se não fornecida, será enviada imediatamente)" })
    @IsDateString()
    @IsOptional()
    sentAt?: string;
}
