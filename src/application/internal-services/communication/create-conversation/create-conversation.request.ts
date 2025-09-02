import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
// import { CreateConversationVM } from "src/application/ViewModels/communication/create-conversation.viewmodel";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class CreateConversationRequest {
    @ApiProperty({example: "Conversa com cliente", description: "Título da conversa"})
    @IsString()
    title: string;

    @ApiPropertyOptional({example: "Venda de energia", description: "Conversa de venda de energia"})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do canal de comunicação"})
    @IsString()
    channelId: string;

    @ApiPropertyOptional({example: ConversationStatus.OPEN, description: "Status da conversa", enum: ConversationStatus})
    @IsOptional()
    @IsEnum(ConversationStatus)
    status?: ConversationStatus = ConversationStatus.OPEN;

    @ApiPropertyOptional({example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do cliente"})
    @IsOptional()
    @IsString()
    entityId?: string;

    @ApiPropertyOptional({example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType})
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: EntityType;

    @ApiPropertyOptional({example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário"})
    @IsOptional()
    @IsString()
    assignedEmployeeId?: string;

    @ApiPropertyOptional({example: Priority.MEDIUM, description: "Prioridade da conversa", enum: Priority})
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority = Priority.MEDIUM;

    @ApiPropertyOptional({example: ["tag1", "tag2"], description: "Tags da conversa"})
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}
