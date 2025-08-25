import { Injectable, CanActivate, ExecutionContext, Logger, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma, User } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';
import { PolicyRoleMetadata } from '../decorators/policies-roles.decorator';

@Injectable()
export class PoliciesRolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly logger: Logger) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.debug("entrou")
        // const required = this.reflector.get<{ policy: string; role: string }>('policyRole', context.getHandler());
        const required = this.reflector.get<PolicyRoleMetadata>(
            'policyRole',
            context.getHandler(),
        );
        if (!required) return true;

        const req = context.switchToHttp().getRequest();
        if (!req?.user)
            throw new ForbiddenException("Usuário não informado na requisição");

        const user: ({
            UserPolicyRule: ({
                policy: {
                    description: string | null;
                    name: string;
                    id: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
                rule: {
                    name: string;
                    id: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                userId: string;
                policyId: string;
                ruleId: string;
                assignedAt: Date;
            })[];
        } & {
            name: string;
            id: string;
            email: string;
            password: string;
            tenantId: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }) = await req.user;

        if (!user?.UserPolicyRule?.length)
            throw new ForbiddenException('User has no policies');

        const { policies = [], roles = [] } = required;

        // const hasAccess = user.UserPolicyRule.some(pr =>
        //     pr.policy?.name === required.policy &&
        //     pr.policy?.isActive &&
        //     pr.rule?.name === required.role &&
        //     pr.rule?.isActive
        // );


        // if (!hasAccess) {
        //     throw new ForbiddenException(`You don't have the required policy: ${required.policy} with role: ${required.role}`);
        // }
        const hasPolicy =
            policies.length === 0 ||
            user.UserPolicyRule.some((pr) =>
                policies.includes(pr.policy?.name) && pr.policy?.isActive,
            );

        const hasRole =
            roles.length === 0 ||
            user.UserPolicyRule.some((pr) =>
                roles.includes(pr.rule?.name) && pr.rule?.isActive,
            );

        if (!(hasPolicy && hasRole)) {
            throw new ForbiddenException(
                `Access denied. Required policies: [${policies.join(', ')}], roles: [${roles.join(', ')}]`,
            );
        }

        return true;

    }
}