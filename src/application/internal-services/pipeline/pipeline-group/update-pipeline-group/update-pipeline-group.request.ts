import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdatePipelineGroupRequest {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do agrupamento" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: "Energia Solar", description: "Nome do agrupamento de funis" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "Funis relacionados a projetos de energia solar", description: "Descrição do agrupamento" })
    @IsString()
    @IsOptional()
    description?: string;
}
