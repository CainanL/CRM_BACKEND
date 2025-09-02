import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
// import { CreateCommunicationChannelViewModel } from "src/application/ViewModels/communication/create-communication-channel.viewmodel";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";

export class CreateCommunicationChannelRequest {
    @ApiProperty({ example: CommunicationChannel.EMAIL, description: "Tipo canal de comunicação", enum: CommunicationChannel })
    @IsEnum(CommunicationChannel)
    @IsString()
    channelType: CommunicationChannel;

    @ApiProperty({example: "Email", description: "Nome do canal de comunicação"})
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: "Utiliza método SMTP", description: "Descrição do canal de comunicação" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: { smtp: { host: "smtp.example.com", port: 587, user: "user@example.com", password: "password" } }, description: "Configurações do canal de comunicação" })
    @IsObject()
    settings: Record<string, any>;

    @ApiPropertyOptional({ example: true, description: "Se o canal de comunicação está ativo" })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @ApiPropertyOptional({ example: false, description: "Se o canal de comunicação é automático" })
    @IsOptional()
    @IsBoolean()
    autoAssign?: boolean = false;

    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID do funcionário responsável pelo canal de comunicação" })
    @IsOptional()
    @IsString()
    assignToEmployeeId?: string;

    @ApiPropertyOptional({ example: false, description: "Se o canal de comunicação é inteligente" })
    @IsOptional()
    @IsBoolean()
    aiEnabled?: boolean = false;

    @ApiPropertyOptional({ example: { model: "gpt-4o", temperature: 0.5 }, description: "Configurações do canal de comunicação inteligente" })
    @IsOptional()
    @IsObject()
    aiSettings?: Record<string, any>;
}
