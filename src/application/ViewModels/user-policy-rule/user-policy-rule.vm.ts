import { UserPolicyRule as ups } from ".prisma/master-client";
import { UserVm } from "../user/user.vm";
import { PolicyVm } from "../policy/policy.vm";
import { RuleVm } from "../role/role.vm";
export class UserPolicyRuleVm {
    id: string;
    user: UserVm;
    policy: PolicyVm;
    role: RuleVm;

    constructor({
        id,
        user,
        role,
        policy
    }: ups | any) {
        this.id = id!;
        this.policy = new PolicyVm(policy!);
        this.role = new RuleVm(role!);
    }
}