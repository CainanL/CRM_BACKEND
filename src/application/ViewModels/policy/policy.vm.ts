import { Policy, Rule, User } from ".prisma/master-client";
import { UserPolicyRuleVm } from "../user-policy-rule/user-policy-rule.vm";

export class PolicyVm {
    id: string;
    name: string;
    description: string | null;
    userPolicyRule: UserPolicyRuleVm

    constructor({ id, name, description, userPolicyRule }: {
        id: string;
        name: string;
        description: string | null;
        userPolicyRule: {
            id: string;
            user: User;
            policy: Policy;
            rule: Rule;
        }
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        if(userPolicyRule)
        this.userPolicyRule = new UserPolicyRuleVm(userPolicyRule);
    }
}