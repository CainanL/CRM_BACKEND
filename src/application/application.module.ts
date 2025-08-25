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
import { SolutionModule } from "./internal-services/client/solution/solution.module";
import { GlobalModule } from "./common/global.module";
import { DeleteSolutionService } from "./internal-services/client/solution/delete-solution/delete-solution.service";
import { DeveloperInitializer } from "./initializers/developer.initializer";

@Module({
  imports: [
    GlobalModule,
    ReposModule,
    UsersModule,
    PolicyModule,
    RuleModule,
    SolutionModule,
    
  ],
  providers: [
    EmailService,
    ConfigService,
    GetPoliciesService,
    PoliciesInitializer,
    RolesInitializer,
    CreateSolutionService,
    Logger,
    DeleteSolutionService,
    DeveloperInitializer
  ],
  exports: [
    GlobalModule,
    UsersModule,
    PolicyModule,
    RuleModule,
    CreateSolutionService,
    SolutionModule,
    DeleteSolutionService,
    DeveloperInitializer
  ],
})
export class ApplicationModule { }