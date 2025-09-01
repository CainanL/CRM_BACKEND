import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryBase } from "src/application/common/query-base.request";

export class QueryPipelineGroupsRequest extends QueryBase {}
