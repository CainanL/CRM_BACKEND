import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID, IsInt, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class StagePosition {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do estágio" })
    @IsUUID()
    id: string;

    @ApiProperty({ example: 1, description: "Nova posição do estágio" })
    @IsInt()
    @Min(1)
    position: number;
}

export class ReorderPipelineStagesRequest {
    @ApiProperty({ 
        type: [StagePosition], 
        description: "Lista de estágios com suas novas posições" 
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StagePosition)
    stages: StagePosition[];
}
