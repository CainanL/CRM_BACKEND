import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsInt, Min, Max, IsDateString, IsDecimal } from "class-validator";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";

export class CreateOpportunityRequest {
    @ApiProperty({ example: "Projeto Energia Solar - Empresa ABC", description: "Nome da oportunidade" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "Projeto de instalação de painéis solares para empresa ABC", description: "Descrição da oportunidade" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 50000.00, description: "Valor da oportunidade" })
    @IsDecimal()
    @IsOptional()
    value?: string;

    @ApiPropertyOptional({ example: 25, description: "Probabilidade atual (0-100)" })
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    probability?: number;

    @ApiPropertyOptional({ example: "2024-03-15T00:00:00Z", description: "Data esperada de fechamento" })
    @IsDateString()
    @IsOptional()
    expectedCloseDate?: string;

    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do cliente" })
    @IsUUID()
    @IsNotEmpty()
    clientId: string;

    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do funil" })
    @IsUUID()
    @IsNotEmpty()
    pipelineId: string;

    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do estágio inicial" })
    @IsUUID()
    @IsNotEmpty()
    stageId: string;


    @ApiPropertyOptional({ example: OpportunityStatus.OPEN, description: "Status da oportunidade", enum: OpportunityStatus })
    @IsString()
    @IsOptional()
    status?: OpportunityStatus;
}
