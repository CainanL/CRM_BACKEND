import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryRecentLeadsRequest extends QueryBase {
    @ApiPropertyOptional({ 
        example: 3, 
        description: "Número de dias para buscar leads recentes (padrão: 3)" 
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    days: number = 3;
}
