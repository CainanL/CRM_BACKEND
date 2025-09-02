import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";
// import { MessageListFiltersVM } from "src/application/ViewModels/communication/message-list.viewmodel";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";
import { EntityType } from "src/repos/enums/entity-type.enum";
import { MessageDirection } from "src/repos/enums/message-direction.enum";
import { MessageStatus } from "src/repos/enums/message-status.enum";

export class GetMessagesRequest extends QueryBase{

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da conversa" })
    @IsOptional()
    @IsString()
    conversationId?: string;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do canal" })
    @IsOptional()
    @IsString()
    channelId?: string;

    @ApiPropertyOptional({ example: CommunicationChannel.EMAIL, description: "Tipo de canal", enum: CommunicationChannel })
    @IsOptional()
    @IsEnum(CommunicationChannel)
    channelType?: CommunicationChannel;

    @ApiPropertyOptional({ example: MessageDirection.OUTBOUND, description: "Direção da mensagem", enum: MessageDirection })
    @IsOptional()
    @IsEnum(MessageDirection)
    direction?: MessageDirection;

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
    @IsString()
    entityType?: string;

    @ApiPropertyOptional({ example: "2024-01-01T00:00:00Z", description: "Data inicial para filtrar" })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({ example: "2024-12-31T23:59:59Z", description: "Data final para filtrar" })
    @IsOptional()
    @IsDateString()
    endDate?: string;
}