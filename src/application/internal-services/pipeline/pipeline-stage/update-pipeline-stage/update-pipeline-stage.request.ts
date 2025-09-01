import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, Max, Matches } from "class-validator";

export class UpdatePipelineStageRequest {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do estágio" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: "Proposta Enviada", description: "Nome do estágio" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 2, description: "Posição no funil (1, 2, 3, etc.)" })
    @IsInt()
    @Min(1)
    position: number;

    @ApiProperty({ example: 25, description: "Probabilidade padrão (0-100)" })
    @IsInt()
    @Min(0)
    @Max(100)
    defaultProbability: number;

    @ApiProperty({ example: "#FF5733", description: "Cor em hexadecimal" })
    @IsString()
    @Matches(/^#[0-9A-Fa-f]{6}$/, { message: "Cor deve estar no formato hexadecimal (#RRGGBB)" })
    color: string;
}
