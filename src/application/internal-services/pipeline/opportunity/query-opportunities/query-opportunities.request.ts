import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsUUID, IsDateString } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";

export class QueryOpportunitiesRequest extends QueryBase {
    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do cliente" })
    @IsUUID()
    @IsOptional()
    clientId?: string;

    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do funil" })
    @IsUUID()
    @IsOptional()
    pipelineId?: string;

    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do estágio" })
    @IsUUID()
    @IsOptional()
    stageId?: string;

    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do funcionário responsável" })
    @IsUUID()
    @IsOptional()
    assignedTo?: string;

    @ApiPropertyOptional({ example: OpportunityStatus.OPEN, description: "Status da oportunidade", enum: OpportunityStatus })
    @IsEnum(OpportunityStatus)
    @IsOptional()
    status?: OpportunityStatus;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data inicial para filtrar" })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiPropertyOptional({ example: "2024-12-31T23:59:59Z", description: "Data final para filtrar" })
    @IsDateString()
    @IsOptional()
    endDate?: string;
}
