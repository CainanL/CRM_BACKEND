import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repos-base";
import { Policy, Prisma } from ".prisma/master-client";

@Injectable()
export class PolicyRepository extends BaseRepository<Policy,
    Prisma.PolicyCreateInput,
    Prisma.PolicyUpdateInput,
    Prisma.PolicyWhereInput> {
    protected get model() {
        return this.masterPrismaService.policy;
    }
}