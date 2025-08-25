import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { RefreshTokenRequest } from "./refresh-token.request";
import { UserVm } from "src/application/ViewModels/user/user.vm";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { TokenService } from "src/application/common/services/token.service";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class RefreshTokenService extends HandlerBase<RefreshTokenRequest, UserVm> {
    constructor(private readonly masterClient: MasterPrismaService,
        private readonly tokenService: TokenService,
    ) {
        super();
    }
    protected async executeCore(request: RefreshTokenRequest, data?: any): Promise<UserVm> {
        if (!this.tokenService.isRefreshTokenValid(request.refreshToken))
            throw new BaseException("Acesso negado", 401);

        const userPayload = this.tokenService.getPayload(request.refreshToken);
        const user = await this.masterClient.user.findFirst({ where: { id: userPayload.id } });
        if (!user)
            throw new BaseException("Acesso negado", 401);
        const token = await this.tokenService.generateAccessToken(user);
        return new UserVm(user, token, request.refreshToken);
    }

}