import { Module } from "@nestjs/common";
import { ReposModule } from "src/repos/repos.module";
import { GetRulesService } from "./get-rules.service";

@Module({
    imports: [ReposModule],
    providers: [GetRulesService],
    exports: [GetRulesService]
})
export class RuleModule { }