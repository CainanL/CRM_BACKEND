import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repos-base";
import { User, Prisma } from ".prisma/master-client";

@Injectable()
export class UserRepository extends BaseRepository<User,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput> {
    protected get model() {
        return this.masterPrismaService.user;
    }
}