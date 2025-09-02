import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";
import { ContactType } from "src/repos/enums/contact-type.enum";
import { ContentType } from "src/repos/enums/content-type.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";

export class SendMessageRequest {
    @ApiProperty({example: CommunicationChannel.EMAIL, description: "Canal de comunicação", enum: CommunicationChannel})
    @IsEnum(CommunicationChannel)
    channelType: CommunicationChannel;

    @ApiProperty({example: "Olá, como você está?", description: "Conteúdo do mensagem"})
    @IsString()
    content: string;

    @ApiPropertyOptional({example: "TEXT", description: "Tipo de conteúdo", enum: ContentType})
    @IsOptional()
    @IsEnum(ContentType)
    contentType?: ContentType = ContentType.TEXT;

    @ApiProperty({example: "joao.silva@empresa.com", description: "Contato do destinatário"})
    @IsString()
    recipientContact: string;

    @ApiProperty({example: ContactType.EMAIL, description: "Tipo de contato", enum: ContactType})
    @IsEnum(ContactType)
    recipientContactType: ContactType;

    @ApiPropertyOptional({example: "joao.silva@empresa.com", description: "Contato do remetente"})
    @IsOptional()
    @IsString()
    senderContact?: string;

    @ApiPropertyOptional({example: ContactType.EMAIL, description: "Tipo de contato", enum: ContactType})
    @IsOptional()
    @IsEnum(ContactType)
    senderContactType?: ContactType;

    @ApiPropertyOptional({example: "uuid", description: "Id da conversa"})
    @IsOptional()
    @IsString()
    conversationId?: string;

    @ApiPropertyOptional({ example: "UUID", description: "Id da entidade"})
    @IsOptional()
    @IsString()
    entityId?: string;

    @ApiPropertyOptional({ example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType})
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: EntityType;

    @ApiPropertyOptional({ example: "Assunto", description: "Assunto do email"})
    @IsOptional()
    @IsString()
    subject?: string; // Para emails

    @ApiPropertyOptional({ example: [{name: "attachment.pdf", url: "https://example.com/attachment.pdf", type: "application/pdf", size: 1000}], description: "Anexos do email"})
    @IsOptional()
    @IsArray()
    attachments?: Array<{
        name: string;
        url: string;
        type: string;
        size?: number;
    }>;

    @ApiPropertyOptional({ example: {key: "value"}, description: "Metadados do email"})
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data de agendamento"})
    @IsOptional()
    @IsString()
    scheduledAt?: string; // Para agendamento
}
