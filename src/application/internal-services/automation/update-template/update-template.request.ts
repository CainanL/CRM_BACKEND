import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from "class-validator";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";

export class UpdateTemplateRequest {
  @ApiProperty({ example: "uuid-do-template", description: "ID do template" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional({ example: "Template de Boas-vindas", description: "Nome do template" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: "Template para campanhas de boas-vindas", description: "Descrição do template" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: CampaignType.EMAIL, description: "Tipo do template", enum: CampaignType })
  @IsEnum(CampaignType)
  @IsOptional()
  templateType?: CampaignType;

  @ApiPropertyOptional({ example: CampaignCategory.WELCOME, description: "Categoria do template", enum: CampaignCategory })
  @IsEnum(CampaignCategory)
  @IsOptional()
  category?: CampaignCategory;

  @ApiPropertyOptional({ example: "Bem-vindo(a) {{name}}!", description: "Assunto do email" })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional({ example: "Olá {{name}}, seja bem-vindo(a) à nossa plataforma! Estamos felizes em tê-lo(a) conosco.", description: "Conteúdo do template" })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: ["name", "email", "company"], description: "Variáveis disponíveis no template" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  variables?: string[];
}
