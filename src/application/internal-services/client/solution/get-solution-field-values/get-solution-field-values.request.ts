import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class GetSolutionFieldValuesRequest {
    @ApiPropertyOptional({ example: "cme6jxl9b0000fpmkhy3j28og", description: "ID da Solução" })
    @IsString()
    @IsNotEmpty()
    solutionId: string;
}
