import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { QueryBase } from "src/application/common/query-base.request";

export class GetInteractionsByEmployeeRequest extends QueryBase {
    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID da Solução" })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    employeeId: string;
}