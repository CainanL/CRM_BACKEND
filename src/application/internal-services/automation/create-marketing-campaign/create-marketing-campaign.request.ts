import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsDateString, IsInt, Min, Max, IsObject, ValidateNested, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { CampaignType } from "src/repos/enums/campaign-type.enum";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

class AgeRangeRequest {
  @ApiPropertyOptional({ example: 18, description: "Idade mínima" })
  @IsInt()
  @Min(0)
  @IsOptional()
  min?: number;

  @ApiPropertyOptional({ example: 65, description: "Idade máxima" })
  @IsInt()
  @Min(0)
  @IsOptional()
  max?: number;
}

class LocationRequest {
  @ApiPropertyOptional({ example: ["SP", "RJ", "MG"], description: "Lista de estados" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  states?: string[];

  @ApiPropertyOptional({ example: ["São Paulo", "Rio de Janeiro"], description: "Lista de cidades" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  cities?: string[];
}

class BehaviorRequest {
  @ApiPropertyOptional({ example: 30, description: "Dias desde a última interação" })
  @IsInt()
  @Min(0)
  @IsOptional()
  lastInteractionDays?: number;

  @ApiPropertyOptional({ example: true, description: "Se o cliente abriu emails anteriormente" })
  @IsBoolean()
  @IsOptional()
  hasOpenedEmails?: boolean;

  @ApiPropertyOptional({ example: false, description: "Se o cliente clicou em links anteriormente" })
  @IsBoolean()
  @IsOptional()
  hasClickedLinks?: boolean;
}

class SolutionRequest {

  @ApiPropertyOptional({ example: ["sol-123", "sol-456"], description: "Lista de IDs das soluções" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  solutionIds?: string[];

  @ApiPropertyOptional({ example: true, description: "Se o cliente tem interesse em soluções" })
  @IsBoolean()
  @IsOptional()
  hasInterestedSolutions?: boolean;
}

export class TargetAudienceRequest {
  @ApiPropertyOptional({ description: "Critérios de segmentação por idade" })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AgeRangeRequest)
  ageRange: AgeRangeRequest;

  @ApiPropertyOptional({ description: "Critérios de segmentação por localização" })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationRequest)
  location?: LocationRequest

  @ApiPropertyOptional({ description: "Critérios de segmentação por comportamento" })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BehaviorRequest)
  behavior?: BehaviorRequest;

  @ApiPropertyOptional({ description: "Critérios de segmentação por solução" })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SolutionRequest)
  solution?: SolutionRequest;
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

