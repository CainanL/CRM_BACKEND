import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSolutionFieldSettingsRequest {
    @ApiProperty({ example: "CPF" })
    @IsString()
    @IsNotEmpty()
    dataType: string;

    @ApiProperty({example: "Texto"})
    @IsString()
    @IsNotEmpty()
    formatType: string;

    @ApiProperty({example: "999.999.999-99"})
    @IsString()
    @IsOptional()
    mask: string;

    @ApiProperty({example: "CPF"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Ex: 999.999.999-9"})
    @IsString()
    @IsNotEmpty()
    placeholder: string;

    @ApiProperty({example: "cme6jxl9b0000fpmkhy3j28og"})
    @IsString()
    @IsNotEmpty()
    solutionId: string;
}