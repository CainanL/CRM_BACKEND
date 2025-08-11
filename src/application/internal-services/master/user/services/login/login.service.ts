import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { LoginRequest } from "./login.request";
import { UserVm } from "src/application/ViewModels/user/user.vm";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { BaseException } from "src/application/common/exceptions/base-exception";
import * as bcrypt from 'bcrypt';
import { TokenService } from "src/application/common/services/token.service";

@Injectable()
export class LoginService extends HandlerBase<LoginRequest, UserVm> {

    constructor(private readonly masterClient: MasterPrismaService,
        private readonly tokenService: TokenService,
    ) {
        super();
    }

    protected async executeCore({ email, password }: LoginRequest, data?: any): Promise<UserVm> {
        const user = await this.masterClient.user.findFirst({
            where: {
                email
            }
        });

        if (!user) throw new BaseException("Username ou e-mail inválido", 401);

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) throw new BaseException("Senhá inválida", 401);

        let requestToken = this.tokenService.generateAccessToken(user);
        let refreshToken = this.tokenService.generateRefreshToken(user);

        return new UserVm(user, requestToken, refreshToken);
    }

}