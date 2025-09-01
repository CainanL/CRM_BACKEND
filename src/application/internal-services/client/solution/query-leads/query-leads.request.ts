import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryLeadsRequest extends QueryBase {
    @ApiPropertyOptional({ example: "UUID", description: "ID da solution" })
    @IsString()
    @IsNotEmpty()
    public solutionId: string;
 }