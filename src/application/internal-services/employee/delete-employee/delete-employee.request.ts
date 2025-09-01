import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { DeleteBase } from "src/application/common/delete-base.request";

export class DeleteEmployeeRequest extends DeleteBase {}
