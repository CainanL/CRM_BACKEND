import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "src/application/common/services/token.service";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly tokenService: TokenService,
        private readonly masterClient: MasterPrismaService
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthorizedException('Token não informado');;

        const token = authHeader.split(' ')[1];

        if (!this.tokenService.isAccessTokenValid(token)) throw new UnauthorizedException('Token inválido ou expirado');

        const payload = this.tokenService.getPayload(token);

        if (!payload?.id) throw new UnauthorizedException('Payload inválido');

        const user = await this.masterClient.user.findFirst({
            where: { id: payload.id }, include: {
                UserPolicyRule: {
                    include: {
                        policy: true,
                        rule: true
                    }
                },
            }
        });
        const tenantId = req.headers['x-tenant-id'];
        if (!user) throw new UnauthorizedException('Usuário não encontrado');

        if (user.tenantId != tenantId) throw new UnauthorizedException('Acesso negado!');;

        req.user = user;

        return true
    }

}