import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class PauseCampaignRequest {
  @ApiProperty({ example: "uuid-da-campanha", description: "ID da campanha" })
  @IsString()
  @IsNotEmpty()
  campaignId: string;
}
