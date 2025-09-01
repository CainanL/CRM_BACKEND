import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePipelineGroupRequest {
    @ApiProperty({ example: "Energia Solar", description: "Nome do agrupamento de funis" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "Funis relacionados a projetos de energia solar", description: "Descrição do agrupamento" })
    @IsString()
    @IsOptional()
    description?: string;
}
