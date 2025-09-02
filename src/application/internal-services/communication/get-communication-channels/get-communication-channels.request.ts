import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { CommunicationChannel } from 'src/repos/enums/communication-channel.enum';

export class GetCommunicationChannelsRequest {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    channelType?: CommunicationChannel;
}
