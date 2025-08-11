import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RequestEmailValidatorCodeRequest {
    @ApiProperty({ example: 'admin@komput.com.br' })
    @IsEmail()
    @IsNotEmpty()
    public email: string;
}