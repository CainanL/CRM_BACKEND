import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryLeadsRequest extends QueryBase {
    @ApiPropertyOptional({ example: "UUID", description: "ID da solution" })
    @IsString()
    @IsOptional()
    public solutionId?: string;
 }