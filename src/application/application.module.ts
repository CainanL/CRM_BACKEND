import { Logger, Module } from "@nestjs/common";
import { UsersModule } from "./internal-services/master/user/user.module";
import { EmailService } from "./internal-services/email/email.service";
import { ConfigService } from "@nestjs/config";
import { GetPoliciesService } from "./internal-services/master/policy/services/get-policies/get-policies.service";
import { PolicyModule } from "./internal-services/master/policy/policy.module";
import { ReposModule } from "src/repos/repos.module";
import { PoliciesInitializer } from "./initializers/policies.initializer";
import { RolesInitializer } from "./initializers/rules.initializer";
import { RuleModule } from "./internal-services/master/rule/rule.module";
import { CreateSolutionService } from "./internal-services/client/solution/create-solution/create-solution.service";
import { QuerySolutionService } from "./internal-services/client/solution/query-solution/query-solution.service";

@Module({
  imports: [
    ReposModule,
    UsersModule,
    PolicyModule,
    RuleModule,
  ],
  providers: [
    EmailService,
    ConfigService,
    GetPoliciesService,
    PoliciesInitializer,
    RolesInitializer,
    CreateSolutionService,
    Logger,
    QuerySolutionService
  ],
  exports: [
    UsersModule,
    PolicyModule,
    RuleModule,
    CreateSolutionService,
    QuerySolutionService
  ],
})
export class ApplicationModule { }