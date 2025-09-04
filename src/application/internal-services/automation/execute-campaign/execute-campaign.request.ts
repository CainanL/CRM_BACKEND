import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class ExecuteCampaignRequest {
  @ApiProperty({ example: "uuid-da-campanha", description: "ID da campanha a ser executada" })
  @IsString()
  @IsNotEmpty()
  campaignId: string;

  @ApiPropertyOptional({ example: true, description: "Se deve executar imediatamente ou agendar" })
  @IsBoolean()
  @IsOptional()
  executeImmediately?: boolean;

  @ApiPropertyOptional({ example: "2024-01-15T10:00:00Z", description: "Data/hora para execução agendada" })
  @IsString()
  @IsOptional()
  scheduledAt?: string;
}

