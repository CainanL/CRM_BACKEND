import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsDateString, IsInt, Min, Max, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

export class TargetAudienceRequest {
  @ApiPropertyOptional({ description: "Critérios de segmentação por idade" })
  @IsOptional()
  @IsObject()
  ageRange?: {
    min?: number;
    max?: number;
  };

  @ApiPropertyOptional({ description: "Critérios de segmentação por localização" })
  @IsOptional()
  @IsObject()
  location?: {
    states?: string[];
    cities?: string[];
  };

  @ApiPropertyOptional({ description: "Critérios de segmentação por comportamento" })
  @IsOptional()
  @IsObject()
  behavior?: {
    lastInteractionDays?: number;
    hasOpenedEmails?: boolean;
    hasClickedLinks?: boolean;
  };

  @ApiPropertyOptional({ description: "Critérios de segmentação por solução" })
  @IsOptional()
  @IsObject()
  solution?: {
    solutionIds?: string[];
    hasInterestedSolutions?: boolean;
  };
}

export class CreateMarketingCampaignRequest {
  @ApiProperty({ example: "Campanha de Energia Solar - Janeiro 2024", description: "Nome da campanha" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: "Campanha promocional para clientes interessados em energia solar", description: "Descrição da campanha" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: CampaignType.EMAIL, description: "Tipo da campanha", enum: CampaignType })
  @IsEnum(CampaignType)
  @IsNotEmpty()
  campaignType: CampaignType;

  @ApiPropertyOptional({ example: CampaignCategory.PROMOTIONAL, description: "Categoria da campanha", enum: CampaignCategory })
  @IsEnum(CampaignCategory)
  @IsOptional()
  category?: CampaignCategory;

  @ApiPropertyOptional({ example: "Economize até 90% na sua conta de luz!", description: "Assunto do email" })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: "Olá {{name}}, descubra como economizar na sua conta de luz com energia solar...", description: "Conteúdo da mensagem" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: "ID do template usado" })
  @IsString()
  @IsOptional()
  templateId?: string;

  @ApiPropertyOptional({ description: "Critérios de segmentação da audiência" })
  @IsOptional()
  @ValidateNested()
  @Type(() => TargetAudienceRequest)
  targetAudience?: TargetAudienceRequest;

  @ApiPropertyOptional({ description: "IDs dos leads específicos" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  targetLeads?: string[];

  @ApiPropertyOptional({ description: "IDs dos clientes específicos" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  targetClients?: string[];

  @ApiPropertyOptional({ example: "2024-01-15T10:00:00Z", description: "Data/hora agendada para envio" })
  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @ApiPropertyOptional({ example: "America/Sao_Paulo", description: "Fuso horário" })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({ example: CampaignStatus.DRAFT, description: "Status da campanha", enum: CampaignStatus })
  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;

  @ApiPropertyOptional({ example: "MEDIUM", description: "Prioridade da campanha" })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ example: 1000, description: "Limite de envios por hora/dia" })
  @IsInt()
  @Min(1)
  @IsOptional()
  sendLimit?: number;

  @ApiPropertyOptional({ example: 100, description: "Tamanho do lote de envio" })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  batchSize?: number;
}

