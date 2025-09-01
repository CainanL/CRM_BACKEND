import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { GetByIdBase } from "src/application/common/get-by-id-base";

export class GetEmployeeByIdRequest extends GetByIdBase{}
