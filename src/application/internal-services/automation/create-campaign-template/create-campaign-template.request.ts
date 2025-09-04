import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from "class-validator";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";

export class CreateCampaignTemplateRequest {
  @ApiProperty({ example: "Template de Boas-vindas", description: "Nome do template" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: "Template para campanhas de boas-vindas", description: "Descrição do template" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: CampaignType.EMAIL, description: "Tipo do template", enum: CampaignType })
  @IsEnum(CampaignType)
  @IsNotEmpty()
  templateType: CampaignType;

  @ApiPropertyOptional({ example: CampaignCategory.WELCOME, description: "Categoria do template", enum: CampaignCategory })
  @IsEnum(CampaignCategory)
  @IsOptional()
  category?: CampaignCategory;

  @ApiPropertyOptional({ example: "Bem-vindo(a) {{name}}!", description: "Assunto do email" })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: "Olá {{name}}, seja bem-vindo(a) à nossa plataforma! Estamos felizes em tê-lo(a) conosco.", description: "Conteúdo do template" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: ["name", "email", "company"], description: "Variáveis disponíveis no template" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  variables?: string[];
}

