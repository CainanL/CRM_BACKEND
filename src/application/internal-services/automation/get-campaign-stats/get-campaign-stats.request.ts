import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsDateString, IsString } from "class-validator";

export class GetCampaignStatsRequest {
  @ApiPropertyOptional({ example: "2024-01-01", description: "Data de início do período" })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: "2024-01-31", description: "Data de fim do período" })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: "EMAIL", description: "Filtrar por tipo de campanha" })
  @IsString()
  @IsOptional()
  campaignType?: string;

  @ApiPropertyOptional({ example: "PROMOTIONAL", description: "Filtrar por categoria" })
  @IsString()
  @IsOptional()
  category?: string;
}

