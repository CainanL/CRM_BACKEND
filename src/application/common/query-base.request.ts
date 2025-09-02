import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryBase {
    @ApiPropertyOptional({ example: 1, description: "Número da página (começa em 1)" })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({ example: 10, description: "Quantidade de itens por página" })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    size: number = 10;

    @ApiPropertyOptional({ example: "", description: "Texto de busca" })
    @IsOptional()
    @Type(() => String)
    @IsString()
    textSearch?: string = "";

    @IsOptional()
    @IsString()
    sortBy?: string = 'updatedAt';
  
    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc' = 'desc';

    get skip() {
        if (!this.page || !this.size) return 0;
        return (this.page - 1) * this.size;
    }

    get take() {
        if (!this.size) return 0;
        return this.size;
    }
}
