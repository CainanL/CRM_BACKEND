import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DeleteBase {
    @ApiPropertyOptional({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do elemento a ser deletado" })
    @IsUUID()
    id: string;
}