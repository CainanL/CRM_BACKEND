import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdatePipelineRequest {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do funil" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: "Funis de Energia Solar", description: "Nome do funil de vendas" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "Funis para gerenciar vendas de projetos de energia solar", description: "Descrição do funil" })
    @IsString()
    @IsOptional()
    description?: string;
}
