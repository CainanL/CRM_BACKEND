import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddSolutionPriceRequest {
    @ApiProperty({ example: "Sistemas até 5KW" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Sistema com até 5KWP de potência instalada, o valor da ART já está incluso no projeto"})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({example: 600})
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({example: 5})
    @IsNumber()
    @IsOptional()
    ranger?: number;

    @ApiProperty({example: "KWP"})
    @IsString()
    @IsOptional()
    unitOfMeasurement?: string;

    @ApiProperty({example: "cme6jxl9b0000fpmkhy3j28og"})
    @IsString()
    @IsNotEmpty()
    solutionId: string;
}