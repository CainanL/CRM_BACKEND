import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CheckEmailValidatorCodeRequest } from "./check-email-validator-code.request";
import { EmailValidatorCodeRepository } from "src/repos/email-validator-code/email-validator-code.repository";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { DateTimeHelper } from "src/application/common/helpers/date-time.helpers";

@Injectable()
export class CheckEmailValidatorCodeService extends HandlerBase<CheckEmailValidatorCodeRequest, null> {

    constructor(private readonly emailValidatorCodeRepository: EmailValidatorCodeRepository) {
        super();
    }

    protected async executeCore({ email, code }: CheckEmailValidatorCodeRequest, data?: any): Promise<null> {
        const evc = await this.emailValidatorCodeRepository.findFirst({ email });

        if (!evc)
            throw new BaseException("E-mail inválido");

        const attemps = 5 - evc.attemp
        if (attemps <= 0)
            throw new BaseException("Número de tentativas expirada, solicite um novo código de validação");


        if (evc?.isActive)
            throw new BaseException("E-mail já está em uso")

        const isExpired = DateTimeHelper.isDeadlineExpired(evc.createdAt, 60);
        if (isExpired)
            throw new BaseException("Código de válidação expirado, gere outro código e tente novamente");

        this.emailValidatorCodeRepository.update(evc.id, { attemp: { increment: 1 } });

        if (evc.code != code)
            throw new BaseException(`Código de válidação inválido, você tem ${attemps - 1} tentativa${(attemps - 1) > 1 ? "s" : ""}`);


        this.emailValidatorCodeRepository.update(evc.id, { isActive: true });

        return null;
    }

}