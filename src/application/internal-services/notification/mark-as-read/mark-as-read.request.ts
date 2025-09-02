import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class MarkAsReadRequest {
    @ApiProperty({ example: "notification-uuid-123", description: "ID da notificação" })
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
