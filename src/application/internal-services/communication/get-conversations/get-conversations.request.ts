import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";
import { Priority } from "src/repos/enums/priority.enum";

export class GetConversationsRequest extends QueryBase {
  
    @ApiPropertyOptional({example: ConversationStatus.OPEN, description: "Status da conversa", enum: ConversationStatus})
    @IsOptional()
    @IsEnum(ConversationStatus)
    status?: ConversationStatus;
  
    @ApiPropertyOptional({ example: CommunicationChannel.EMAIL, description: "Canal de comunicação", enum: CommunicationChannel})
    @IsOptional()
    @IsEnum(CommunicationChannel)
    channelType?: CommunicationChannel;
  

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do canal" })
    @IsOptional()
    @IsUUID()
    channelId?: string;
  
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário" })
    @IsOptional()
    @IsString()
    assignedEmployeeId?: string;
  
    @ApiPropertyOptional({ example: EntityType.CLIENT, description: "Tipo de entidade", enum: EntityType})
    @IsOptional()
    @IsEnum(EntityType)
    entityType?: EntityType;
  
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da entidade" })
    @IsOptional()
    @IsString()
    entityId?: string;
  
    @ApiPropertyOptional({ example: ["tag1", "tag2"], description: "Tags da conversa", isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  
    @ApiPropertyOptional({ example: Priority.LOW, description: "Prioridade da conversa", enum: Priority})
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;
  

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data inicial para filtrar" })
    @IsOptional()
    @IsDateString()
    startDate?: string;
  
    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data final para filtrar" })
    @IsOptional()
    @IsDateString()
    endDate?: string;


}
