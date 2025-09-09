import { Module } from "@nestjs/common";
import { GetEnumsService } from "./get-enums.service";

@Module({
    providers: [GetEnumsService],
    exports: [GetEnumsService]
})
export class EnumModule { }
