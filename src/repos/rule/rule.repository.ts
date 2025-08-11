import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repos-base";
import { Rule, Prisma } from ".prisma/master-client";

@Injectable()
export class RuleRepository extends BaseRepository<Rule,
    Prisma.RuleCreateInput,
    Prisma.RuleUpdateInput,
    Prisma.RuleWhereInput> {
    protected get model() {
        return this.masterPrismaService.rule;
    }
}