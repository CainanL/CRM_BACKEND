import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class MoveOpportunityRequest {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID da oportunidade" })
    @IsUUID()
    @IsNotEmpty()
    opportunityId: string;

    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do novo estágio" })
    @IsUUID()
    @IsNotEmpty()
    newStageId: string;

    @ApiPropertyOptional({ example: "Cliente aprovou a proposta e quer avançar", description: "Motivo da movimentação" })
    @IsString()
    @IsOptional()
    reason?: string;
}
