import { Module } from "@nestjs/common";
import { GetPoliciesService } from "./services/get-policies/get-policies.service";
import { ReposModule } from "src/repos/repos.module";

@Module({
    imports: [ReposModule],
    providers: [GetPoliciesService],
    exports: [GetPoliciesService]
})
export class PolicyModule { }