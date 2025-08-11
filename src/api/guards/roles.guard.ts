import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    // constructor(private reflector: Reflector, private readonly datasource: DataSource, private readonly logger: Logger) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
       /*  this.logger.log("RolesGuard");
        const requiredRoles = this.reflector.getAllAndOverride<Rules[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const userId = request.user?.sub || request.user?.id;

        if (!userId) return false;


        let userEntity: User | null;
        if (!request?.userEntity) {
            userEntity = await this.datasource.getRepository(User).findOne({ where: { id: userId }, relations: ['rules', 'policies'] });
            request.userEntity = userEntity;
        }
        else {
            userEntity = request.userEntity as User;
        }

        if (!userEntity) return false;

        let aggreed: boolean = true;
        
        for (const rule of requiredRoles) {
            let internalAggred = false;

            for (const userRule of userEntity.rules) {
                if (userRule.rule === rule) {
                    internalAggred = true;
                    break;
                }
            }

            if (!internalAggred) {
                this.logger.debug(`Role ausente: ${rule}`);
                aggreed = false;
                break; 
            } 
        }
        
        return aggreed; */
    }
}