import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty, IsEnum } from "class-validator";
import { ClientStatus } from "src/repos/enums/client-status.enum";

export class ChangeClientStatusRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do cliente" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: ClientStatus.ACTIVE, description: "Novo status do cliente", enum: ClientStatus })
    @IsEnum(ClientStatus)
    @IsNotEmpty()
    status: ClientStatus;
}
