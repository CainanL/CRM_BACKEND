import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CheckEmailValidatorCodeRequest {
    @ApiProperty({ example: "A1B2C3" })
    @IsString()
    @IsNotEmpty()
    public code: string;

    @ApiProperty({ example: 'admin@komput.com.br' })
    @IsEmail()
    @IsNotEmpty()
    public email: string;
}