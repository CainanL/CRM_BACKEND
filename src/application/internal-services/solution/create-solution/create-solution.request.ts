import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSolutionRequest {
    @ApiProperty({ example: "Energia Solar" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "Sistemas solares fotovoltaicos"})
    @IsString()
    @IsOptional()
    description?: string;    
}