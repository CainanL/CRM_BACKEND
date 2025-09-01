import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";
import { GetByIdBase } from "src/application/common/get-by-id-base";

export class GetClientByIdRequest extends GetByIdBase{}
