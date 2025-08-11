import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repos-base";
import { UserPolicyRule, Prisma } from ".prisma/master-client";

@Injectable()
export class UserPolicyRuleRepository extends BaseRepository<UserPolicyRule,
    Prisma.UserPolicyRuleCreateInput,
    Prisma.UserPolicyRuleUpdateInput,
    Prisma.UserPolicyRuleWhereInput> {
    protected get model() {
        return this.masterPrismaService.userPolicyRule;
    }
}