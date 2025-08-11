import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(private reflector: Reflector,  private readonly logger: Logger) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
       /*  this.logger.log("PoliciesGuard");
        const requiredPolicies = this.reflector.getAllAndOverride<Policies[]>(POLICIES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPolicies || requiredPolicies.length === 0) return true;

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

        let aggreed = true;

        for (const policy of requiredPolicies) {
            let internalAggred = false;

            for (const userPolicy of userEntity.policies) {

                if (userPolicy.police === policy) {
                    internalAggred = true;
                    break; 
                }
            }

            if (!internalAggred) {
                this.logger.debug(`Policy ausente: ${policy}`);
                aggreed = false;
                break; 
            }
        }


        return aggreed; */
    }
}