import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from "class-validator";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryTemplatesRequest extends QueryBase {

  @ApiPropertyOptional({ example: CampaignType.EMAIL, description: "Filtrar por tipo", enum: CampaignType })
  @IsEnum(CampaignType)
  @IsOptional()
  templateType?: CampaignType;

  @ApiPropertyOptional({ example: CampaignCategory.PROMOTIONAL, description: "Filtrar por categoria", enum: CampaignCategory })
  @IsEnum(CampaignCategory)
  @IsOptional()
  category?: CampaignCategory;
}
