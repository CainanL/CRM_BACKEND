import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenRequest {
    @ApiProperty({ example: "TOKEN" })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}