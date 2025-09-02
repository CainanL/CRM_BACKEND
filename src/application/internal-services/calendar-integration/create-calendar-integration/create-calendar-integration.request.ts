import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsBoolean } from "class-validator";
import { CalendarProvider } from "src/repos/enums/calendar-provider.enum";

export class CreateCalendarIntegrationRequest {
    @ApiProperty({ example: CalendarProvider.GOOGLE, description: "Provedor do calendário", enum: CalendarProvider })
    @IsEnum(CalendarProvider)
    @IsNotEmpty()
    provider: CalendarProvider;

    @ApiProperty({ example: "ya29.a0AfH6SMC...", description: "Token de acesso OAuth" })
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @ApiPropertyOptional({ example: "1//04...", description: "Token de refresh (se disponível)" })
    @IsString()
    @IsOptional()
    refreshToken?: string;

    @ApiProperty({ example: "primary", description: "ID do calendário no sistema externo" })
    @IsString()
    @IsNotEmpty()
    externalCalendarId: string;

    @ApiProperty({ example: "user-uuid-123", description: "ID do usuário" })
    @IsUUID()
    @IsNotEmpty()
    employeeId: string;

    @ApiPropertyOptional({ example: true, description: "Se a integração está ativa" })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
