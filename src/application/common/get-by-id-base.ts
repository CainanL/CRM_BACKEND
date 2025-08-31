import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class GetByIdBase {
    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID da Solução" })
    @IsString()
    @IsNotEmpty()
    id: string;
}