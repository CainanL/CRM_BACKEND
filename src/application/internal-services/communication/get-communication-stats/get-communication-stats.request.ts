import { IsOptional, IsDateString } from 'class-validator';

export class GetCommunicationStatsRequest {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
