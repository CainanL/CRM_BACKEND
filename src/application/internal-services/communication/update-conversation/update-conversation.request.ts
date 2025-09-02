import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
// import { UpdateConversationVM } from "src/application/ViewModels/communication/update-conversation.viewmodel";
import { ConversationStatus } from 'src/repos/enums/conversation-status.enum';
import { EntityType } from 'src/repos/enums/entity-type.enum';
import { Priority } from 'src/repos/enums/priority.enum';

export class UpdateConversationRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da conversa" })
    @IsString()
    id: string;

    @ApiPropertyOptional({ example: "Conversa com cliente", description: "Título da conversa" })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: "Conversa com cliente", description: "Descrição da conversa" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: ConversationStatus.OPEN, description: "Status da conversa", enum: ConversationStatus })
    @IsOptional()
    @IsEnum(ConversationStatus)
    status?: ConversationStatus;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do cliente" })
    @IsOptional()
    @IsString()
    entityId?: string;

    @ApiPropertyOptional({ example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType })
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: EntityType;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsOptional()
    @IsString()
    assignedEmployeeId?: string;

    @ApiPropertyOptional({ example: Priority.MEDIUM, description: "Prioridade da conversa", enum: Priority })
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;

    @ApiPropertyOptional({ example: ["tag1", "tag2"], description: "Tags da conversa" })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiPropertyOptional({ example: { key: "value" }, description: "Metadados da conversa" })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}
