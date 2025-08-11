import { Injectable } from "@nestjs/common";
import { EmailService } from "src/application/internal-services/email/email.service";
import { EmailValidatorCodeRepository } from "src/repos/email-validator-code/email-validator-code.repository";
import { RequestEmailValidatorCodeRequest } from "./request-email-validator-code.request";
import { HandlerBase } from "src/application/common/handle-base";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { DateTimeHelper } from "src/application/common/helpers/date-time.helpers";
import { RandomHelpers } from "src/application/common/helpers/random.helpers";
import { TenantService } from "src/infra/services/tenant.service";

@Injectable()
export class RequestEmailValidatorCodeService extends HandlerBase<RequestEmailValidatorCodeRequest, null> {

    constructor(
        private readonly emailValidatorCodeRepository: EmailValidatorCodeRepository,
        private readonly emailService: EmailService
    ) { super(new TenantService()) }

    protected async executeCore({ email }: RequestEmailValidatorCodeRequest, data?: any): Promise<null> {

        const evc = await this.emailValidatorCodeRepository.findFirst({ email });
        if (evc) {
            const isExpired = DateTimeHelper.isDeadlineExpired(evc.createdAt);
            if (evc.isActive)
                throw new BaseException("O e-mail utilizado já esta em uso, tente um outro e-mail válido")
            if (!isExpired)
                throw new BaseException(`Você poderá solicitar um novo código após ${DateTimeHelper.getSecondsUntilFromTimestamp(evc.createdAt.getTime() + (1 * 60 * 1000))} segundos`);
            if (evc.attemp >= 5 && !isExpired)
                throw new BaseException(`Você já exedeu o limite de tentativas, tente novamente após ${DateTimeHelper.getSecondsUntilFromTimestamp(evc.createdAt.getTime() + (1 * 60 * 1000))} segundos`)
        }

        const code = RandomHelpers.generateRadomCode();

        await this.emailService.sendEmail({
            subject: "Código de validação de e-mail",
            to: email,
            text: `Seu código de validação de e-mail é: ${code}`,
        });

        await this.emailValidatorCodeRepository.createOrUpdate(
            { email },
            { code, email },
            { code, createdAt: new Date(), attemp: 0 }
        );

        return null;
    }


}