import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";
import { DeleteBase } from "src/application/common/delete-base.request";

export class DeleteClientRequest extends DeleteBase { }
