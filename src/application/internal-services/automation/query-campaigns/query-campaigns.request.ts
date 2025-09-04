import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from "class-validator";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryCampaignsRequest extends QueryBase{

  @ApiPropertyOptional({ example: CampaignType.EMAIL, description: "Filtrar por tipo", enum: CampaignType })
  @IsEnum(CampaignType)
  @IsOptional()
  campaignType?: CampaignType;

  @ApiPropertyOptional({ example: CampaignStatus.ACTIVE, description: "Filtrar por status", enum: CampaignStatus })
  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;

  @ApiPropertyOptional({ example: CampaignCategory.PROMOTIONAL, description: "Filtrar por categoria", enum: CampaignCategory })
  @IsEnum(CampaignCategory)
  @IsOptional()
  category?: CampaignCategory;
}

