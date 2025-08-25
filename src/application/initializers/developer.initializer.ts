import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UserRepository } from "src/repos/user/user.repository";
import { TokenService } from "../common/services/token.service";
import { PolicyRepository } from "src/repos/policy/policy.repository";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { RuleRepository } from "src/repos/rule/rule.repository";
import { UserPolicyRuleRepository } from "src/repos/user-policy-rule/user-policy-rule.repository";
import { TenantService } from "src/infra/services/tenant.service";
import { v4 as uuid } from "uuid";
import * as bcrypt from 'bcrypt';
import { Policies } from "src/repos/enums/polices.enum";
import { BaseException } from "../common/exceptions/base-exception";
import { Rules } from "src/repos/enums/rules.enum";
import { User } from "generated/prisma";
import { HandlerBase } from "../common/handle-base";

@Injectable()
export class DeveloperInitializer extends HandlerBase<null, null> implements OnApplicationBootstrap {
    protected async executeCore(request: null, data?: any): Promise<null> {
        const email = "developer@komput.com.br";
        const password = "caboHDMI123."
        const name = "DEVELOPER"

        const userAlreadyExists = await this.userRepository.exists({
            UserPolicyRule: {
                some: {
                    policy: {
                        name: Policies.DEVELOPER
                    }
                }
            }
        });

        if (userAlreadyExists)
            return null;

        const tenantId = uuid();
        const tenant = await this.masterClient.tenant.create({
            data: {
                id: tenantId,
                name: tenantId,
                isActive: true
            }
        });

        const policy = await this.policyRepository.findFirst({
            name: Policies.DEVELOPER.toString()
        });
        if (!policy) throw new BaseException("Policy ADMIN not Foud", 500);

        const rules = await this.ruleRepository.findMany({
            OR: Object.values(Rules).map(name => ({ name }))
        });
        if (!rules.length) throw new BaseException("No rules found", 500);

        const rulesObject = Object.values(Rules);

        await this.ruleRepository.findMany({
            OR: rulesObject.map(item => ({ name: item.toString() }))
        });

        let user: User | null = null;
        let requestToken: string | null = null;
        let refreshToken: string | null = null;

        await this.masterClient.$transaction(async (context) => {
            this.userRepository.setTransactionContext(context.user);
            this.userPolicyRuleRepository.setTransactionContext(context.userPolicyRule);
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                user = await context.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        name,
                        tenantId: tenant.id,
                        isActive: true,
                    }
                });

            } catch (error) {
                if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                    throw new BaseException(`Já existe um usuário cadastrado com o email: ${email}`);
                }
                throw error;
            }


            // 3. Criar os vínculos no UserPolicyRole
            for (const rule of rules) {
                await context.userPolicyRule.create({
                    data: {
                        userId: user.id,
                        policyId: policy.id,
                        ruleId: rule.id,
                    }
                });
            }
            // 4. Criar banco físico do tenant
            await this.tenantServiceInjected.createTenantDatabase(tenant.id);

            // 5. Aplicar schema no banco do tenant
            await this.applyTenantSchemaAndSetupContext(tenant.id);

        }, {
            maxWait: 5000,
            timeout: 10000
        });

        if (!requestToken || !refreshToken) throw new BaseException("Internal auth error", 500);
        return null;
    }
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
        private readonly policyRepository: PolicyRepository,
        private readonly masterClient: MasterPrismaService,
        private readonly ruleRepository: RuleRepository,
        private readonly userPolicyRuleRepository: UserPolicyRuleRepository,
        private readonly tenantServiceInjected: TenantService
    ) {
        super();
    }

    async onApplicationBootstrap() {
        await this.execute(null);
    }

    private async applyTenantSchemaAndSetupContext(tenantId: string): Promise<void> {
        try {
            // Configura o TenantService dinamicamente para poder usar this.context
            this.setTenantService(this.tenantServiceInjected);

            // Força a inicialização do context
            this.setTenantId(tenantId);
            const context = await this.tenantServiceInjected.getTenantClient(tenantId);
            if (!context) throw new Error("Contexto para esse banco não existe");
            this.setContext(context);

            // Executar uma query simples para forçar aplicação do schema
            await this.context.$executeRaw`SELECT 1`;

            this.logger.debug(`✅ Schema aplicado e context configurado para tenant: ${tenantId}`);
        } catch (error) {
            this.logger.debug(`❌ Erro ao aplicar schema para tenant ${tenantId}:`, error);
            // throw error;
        }
    }

    async findUserByEmail(email: string) {
        return await this.masterClient.user.findUnique({
            where: { email },
            include: {
                tenant: true
            }
        });
    }

    async checkIdExists(id: string): Promise<boolean> {
        const tenant = await this.masterClient.tenant.findUnique({
            where: { id }
        });
        return !!tenant;
    }

    async checkEmailExists(email: string): Promise<boolean> {
        const user = await this.masterClient.user.findUnique({
            where: { email }
        });
        return !!user;
    }

}