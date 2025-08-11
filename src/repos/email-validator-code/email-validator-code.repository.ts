import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repos-base";
import { EmailValidatorCode, Prisma } from ".prisma/master-client";

@Injectable()
export class EmailValidatorCodeRepository
    extends BaseRepository<EmailValidatorCode,
        Prisma.EmailValidatorCodeCreateInput,
        Prisma.EmailValidatorCodeUpdateInput,
        Prisma.EmailValidatorCodeWhereInput> {

    protected get model() {
        return this.masterPrismaService.emailValidatorCode;
    }

    public async addAttemp(email: string) {
        this.model.update({ where: { email }, data: { attemp: { increment: 1 } } })
    }
}