import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
// import { UpdateMessageVM } from "src/application/ViewModels/communication/update-message.viewmodel";
import { AiResponseType } from 'src/repos/enums/ai-response-type.enum';
import { ContentType } from 'src/repos/enums/content-type.enum';
import { EntityType } from 'src/repos/enums/entity-type.enum';
import { MessageStatus } from 'src/repos/enums/message-status.enum';

export class UpdateMessageRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da mensagem" })
    @IsString()
    id: string;

    @ApiPropertyOptional({ example: "Olá, como você está?", description: "Conteúdo da mensagem" })
    @IsOptional()
    @IsString()
    content?: string;
  
    @ApiPropertyOptional({ example: ContentType.TEXT, description: "Tipo de conteúdo", enum: ContentType })
    @IsOptional()
    @IsEnum(ContentType)
    contentType?: string;
  
    @ApiPropertyOptional({ example: MessageStatus.SENT, description: "Status da mensagem", enum: MessageStatus })
    @IsOptional()
    @IsEnum(MessageStatus)
    status?: MessageStatus;
  
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsOptional()
    @IsString()
    employeeId?: string;
  
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da entidade" })
    @IsOptional()
    @IsString()
    entityId?: string;
  
    @ApiPropertyOptional({ example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType })
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: string;
  
    @ApiPropertyOptional({ example: [{ name: "anexo.pdf", url: "https://example.com/anexo.pdf", type: "application/pdf", size: 1000 }], description: "Anexos da mensagem" })
    @IsOptional()
    @IsArray()
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
      size?: number;
    }>;
  
    @ApiPropertyOptional({ example: { key: "value" }, description: "Metadados da mensagem" })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
  
    @ApiPropertyOptional({ example: "2024-01-15T14:30:00Z", description: "Data de envio da mensagem" })
    @IsOptional()
    @IsString()
    sentAt?: string;
  
    @ApiPropertyOptional({ example: "2024-01-15T14:30:00Z", description: "Data de entrega da mensagem" })
    @IsOptional()
    @IsString()
    deliveredAt?: string;
  
    @ApiPropertyOptional({ example: "2024-01-15T14:30:00Z", description: "Data de leitura da mensagem" })
    @IsOptional()
    @IsString()
    readAt?: string;
  
    @ApiPropertyOptional({ example: true, description: "Processado pela IA" })
    @IsOptional()
    @IsBoolean()
    aiProcessed?: boolean;
  
    @ApiPropertyOptional({ example: AiResponseType.AUTO_REPLY, description: "Tipo de resposta da IA", enum: AiResponseType })
    @IsOptional()
    @IsEnum(AiResponseType)
    aiResponseType?: AiResponseType;
  
    @ApiPropertyOptional({ example: 0.9, description: "Confiança da IA" })
    @IsOptional()
    @IsNumber()
    aiConfidence?: number;
  

    @ApiPropertyOptional({ example: { key: "value" }, description: "Análise da IA" })
    @IsOptional()
    @IsObject()
    aiAnalysis?: Record<string, any>;
}
