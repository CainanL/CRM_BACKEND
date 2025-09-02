import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
// import { CreateMessageVM } from "src/application/ViewModels/communication/create-message.viewmodel";
import { ContactType } from "src/repos/enums/contact-type.enum";
import { ContentType } from "src/repos/enums/content-type.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";
import { MessageDirection } from "src/repos/enums/message-direction.enum";

export class CreateMessageRequest {
    @ApiProperty({ example: "Olá, como você está?", description: "Conteúdo do mensagem"})
    @IsString()
    content: string;

    @ApiProperty({ example: "TEXT", description: "Tipo de conteúdo", enum: ContentType})
    @IsOptional()
    @IsEnum(ContentType)
    contentType?: ContentType = ContentType.TEXT;

    @ApiProperty({example: "UUID", description: "Id do canal"})
    @IsString()
    channelId: string;

    @ApiProperty({example: "UUID", description: "Id da conversa"})
    @IsString()
    conversationId: string;

    @ApiProperty({example: MessageDirection.OUTBOUND, description: "Direção da mensagem", enum: MessageDirection})
    @IsEnum(MessageDirection)
    direction: MessageDirection;

    @ApiProperty({example: "joao.silva@empresa.com", description: "Contato do remetente"})
    @IsString()
    senderContact: string;

    @ApiProperty({example: ContactType.EMAIL, description: "Tipo de contato", enum: ContactType})
    @IsEnum(ContactType)
    senderContactType: ContactType;

    @ApiProperty({example: "joao.silva@empresa.com", description: "Contato do destinatário"})
    @IsString()
    recipientContact: string;

    @ApiProperty({example: ContactType.EMAIL, description: "Tipo de contato", enum: ContactType})
    @IsEnum(ContactType)
    recipientContactType: ContactType;

    @ApiPropertyOptional({example: "UUID", description: "Id do funcionário"})
    @IsOptional()
    @IsString()
    employeeId?: string;

    @ApiPropertyOptional({example: "UUID", description: "Id da entidade"})
    @IsOptional()
    @IsString()
    entityId?: string;

    @ApiPropertyOptional({example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType})
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: EntityType;

    @ApiPropertyOptional({example: "UUID", description: "Id externo"})
    @IsOptional()
    @IsString()
    externalId?: string;

    @ApiPropertyOptional({example: [{name: "attachment.pdf", url: "https://example.com/attachment.pdf", type: "application/pdf", size: 1000}], description: "Anexos do email"})
    @IsOptional()
    @IsArray()
    attachments?: Array<{
        name: string;
        url: string;
        type: string;
        size?: number;
    }>;

    @ApiPropertyOptional({example: {key: "value"}, description: "Metadados do email"})
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;

    @ApiPropertyOptional({example: "Assunto", description: "Assunto do email"})
    @IsOptional()
    @IsString()
    subject?: string; // Para emails
}
