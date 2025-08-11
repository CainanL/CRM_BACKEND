import { Module } from "@nestjs/common";
import { EmailValidatorCodeRepository } from "./email-validator-code/email-validator-code.repository";
import { InfraModule } from "src/infra/infra.module";
import { PolicyRepository } from "./policy/policy.repository";
import { RuleRepository } from "./rule/rule.repository";
import { UserRepository } from "./user/user.repository";
import { UserPolicyRuleRepository } from "./user-policy-rule/user-policy-rule.repository";

@Module({
    imports: [InfraModule],
    providers: [
        EmailValidatorCodeRepository,
        PolicyRepository,
        RuleRepository,
        UserRepository,
        UserPolicyRuleRepository,
    ],
    exports: [
        InfraModule,
        EmailValidatorCodeRepository,
        PolicyRepository,
        RuleRepository,
        UserRepository,
        UserPolicyRuleRepository,
    ]

})
export class ReposModule { }