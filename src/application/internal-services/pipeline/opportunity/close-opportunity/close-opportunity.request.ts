import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum } from "class-validator";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";
import { OpportunityCloseReason } from "src/repos/enums/opportunity-close-reason.enum";

export class CloseOpportunityRequest {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID da oportunidade" })
    @IsUUID()
    @IsNotEmpty()
    opportunityId: string;

    @ApiProperty({ example: OpportunityStatus.WON, description: "Status final da oportunidade", enum: OpportunityStatus })
    @IsEnum(OpportunityStatus)
    @IsNotEmpty()
    status: OpportunityStatus;

    @ApiPropertyOptional({ example: OpportunityCloseReason.OTHER, description: "Motivo do fechamento", enum: OpportunityCloseReason })
    @IsEnum(OpportunityCloseReason)
    @IsOptional()
    closeReason?: OpportunityCloseReason;

    @ApiPropertyOptional({ example: "Cliente aprovou a proposta e assinou o contrato", description: "Descrição do fechamento" })
    @IsString()
    @IsOptional()
    description?: string;
}
