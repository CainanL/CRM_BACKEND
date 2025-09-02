import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { CommunicationChannel } from 'src/repos/enums/communication-channel.enum';

export class UpdateCommunicationChannelRequest {
    @ApiProperty({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do canal de comunicação" })
    @IsString()    
    id: string;

    @ApiProperty({example: CommunicationChannel.CHAT_WIDGET, description: "Canal de comunicação"})
    @IsOptional()
    @IsEnum(CommunicationChannel)
    channelType?: CommunicationChannel;

    @ApiProperty({example: "Chat Widget", description: "Nome do canal de comunicação"})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({example: "Chat Widget", description: "Descrição do canal de comunicação"})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({example: {chatWidget: {widgetId: "1234567890"}}, description: "Configurações do canal de comunicação"})
    @IsOptional()
    @IsObject()
    settings?: Record<string, any>;

    @ApiProperty({example: true, description: "Se o canal de comunicação está ativo"})
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({example: true, description: "Se o canal de comunicação é automático"})
    @IsOptional()
    @IsBoolean()
    autoAssign?: boolean;

    @ApiProperty({example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário responsável pelo canal de comunicação"})
    @IsOptional()
    @IsString()
    assignToEmployeeId?: string;

    @ApiProperty({example: true, description: "Se o canal de comunicação é inteligente"})
    @IsOptional()
    @IsBoolean()
    aiEnabled?: boolean;

    @ApiProperty({example: {model: "gpt-4o", temperature: 0.5}, description: "Configurações do canal de comunicação inteligente"})
    @IsOptional()
    @IsObject()
    aiSettings?: Record<string, any>;
}
