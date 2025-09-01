import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";

export class GetStagesByPipelineRequest extends QueryBase {
    @ApiProperty({ example: "f3534f3a-8465-4c9b-91ba-d51501cfc070", description: "ID do funil" })
    @IsUUID()
    @IsNotEmpty()
    pipelineId: string;
}
