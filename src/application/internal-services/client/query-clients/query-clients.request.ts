import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum } from "class-validator";
import { ClientType } from "src/repos/enums/client-type.enum";
import { ClientStatus } from "src/repos/enums/client-status.enum";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryClientsRequest extends QueryBase {    

    @ApiPropertyOptional({ example: ClientType.INDIVIDUAL, description: "Tipo de cliente", enum: ClientType })
    @IsEnum(ClientType)
    @IsOptional()
    clientType?: ClientType;

    @ApiPropertyOptional({ example: ClientStatus.ACTIVE, description: "Status do cliente", enum: ClientStatus })
    @IsEnum(ClientStatus)
    @IsOptional()
    status?: ClientStatus;

    @ApiPropertyOptional({ example: "CLI001", description: "Código interno" })
    @IsString()
    @IsOptional()
    internalCode?: string;
}
