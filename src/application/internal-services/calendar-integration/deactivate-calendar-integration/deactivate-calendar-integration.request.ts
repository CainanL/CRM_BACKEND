import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class DeactivateCalendarIntegrationRequest {
    @ApiProperty({ example: "integration-uuid-123", description: "ID da integração" })
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
