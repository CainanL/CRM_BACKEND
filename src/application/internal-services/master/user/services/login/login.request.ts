import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
    @ApiProperty({ example: 'cainan@komput.com.br' })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({ example: '*admin123' })
    @IsString()
    @IsNotEmpty()
    public password: string;
}