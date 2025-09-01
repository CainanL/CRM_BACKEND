import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSolutionRequest {
    @ApiProperty({ example: "71bfd830-5cf7-4bd0-80ee-b0769b069809" })
    @IsUUID()
    id: string;

    @ApiProperty({ example: "Energia Solar" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "Sistemas solares fotovoltaicos." })
    @IsString()
    @IsOptional()
    description?: string;
}