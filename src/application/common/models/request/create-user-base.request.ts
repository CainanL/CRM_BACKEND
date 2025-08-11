import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserBaseRequest {
    @ApiProperty({ example: "cainan@komput.com.br" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '*admin123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "Cainan Luyles" })
     @IsString()
    @IsNotEmpty()
    name: string
}