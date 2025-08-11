import { Injectable } from "@nestjs/common";
import { PrismaClient as MasterClient, User } from ".prisma/master-client";
import * as bcrypt from 'bcrypt';
import { TenantService } from "src/infra/services/tenant.service";
import { v4 as uuid } from "uuid";
import { HandlerBase } from "src/application/common/handle-base";
import { UserVm } from "src/application/ViewModels/user/user.vm";
import { UserRepository } from "src/repos/user/user.repository";
import { CreateUserManagerRequest } from "./create-user-manager.request";
import { EmailValidatorCodeRepository } from "src/repos/email-validator-code/email-validator-code.repository";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { TokenService } from "src/application/common/services/token.service";
import { PolicyRepository } from "src/repos/policy/policy.repository";
import { Policies } from "src/repos/enums/polices.enum";
import { RuleRepository } from "src/repos/rule/rule.repository";
import { Rules } from "src/repos/enums/rules.enum";
import { UserPolicyRuleRepository } from "src/repos/user-policy-rule/user-policy-rule.repository";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";

@Injectable()
export class CreateUserManagerService extends HandlerBase<CreateUserManagerRequest, UserVm> {

    //private masterClient = new MasterClient();

    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailValidatorCodeRepository: EmailValidatorCodeRepository,
        private readonly tokenService: TokenService,
        private readonly policyRepository: PolicyRepository,
        private readonly masterClient: MasterPrismaService,
        private readonly ruleRepository: RuleRepository,
        private readonly userPolicyRuleRepository: UserPolicyRuleRepository,
        private readonly tenantServiceInjected: TenantService
    ) {
        super();
    }

    protected async executeCore({ email, name, password }: CreateUserManagerRequest, data?: any): Promise<UserVm> {

        const tenantId = uuid(); // Generate a unique tenant ID

        const emailIsIsRegistred = await this.emailValidatorCodeRepository.findFirst({ email });
        if (!emailIsIsRegistred)
            throw new BaseException("E-mail utilizado não foi validado, solicite um código de validação e valide seu e-mail para registrar o usuário.");

        if (!emailIsIsRegistred.isActive)
            throw new BaseException(`Foi enviado um código para ${email}, porém o e-mail ainda não foi validado, valide o e-mail utilizando o código enviado ou solicite um novo código e tente novamente`);

        const userIsRegistred = await this.userRepository.exists({ email });
        if (userIsRegistred)
            throw new BaseException("Usuário já operante");

        this.logger.debug("Senha validada");

        const hashedPassword = await bcrypt.hash(password, 10);
        this.logger.debug("Hash da senha criada");

        const tenant = await this.masterClient.tenant.create({
            data: {
                id: tenantId,
                name: tenantId,
                isActive: true
            }
        });
        this.logger.debug(`Registro do tenant: ${tenantId}, criado`);

        const policy = await this.policyRepository.findFirst({
            name: Policies.ADMIN.toString()
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
                this.logger.debug(`Usuário criado: ${user.email}`);
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
            this.logger.debug(`✅ Regras e políticas atribuídas ao usuário ${user.email}`);


            // 4. Criar banco físico do tenant
            await this.tenantServiceInjected.createTenantDatabase(tenant.id);
            this.logger.debug(`✅ Banco de dados criado: ${tenant.id}`);

            // 5. Aplicar schema no banco do tenant
            await this.applyTenantSchemaAndSetupContext(tenant.id);
            this.logger.debug(`✅ schema aplicado para o tenant: ${tenant.id}`);

            this.logger.debug(`🎉 Setup completo para tenant: ${tenant.id}`);

            requestToken = this.tokenService.generateAccessToken(user);
            refreshToken = this.tokenService.generateRefreshToken(user);

        }, {
            maxWait: 5000,
            timeout: 10000
        });

        if (!requestToken || !refreshToken) throw new BaseException("Internal auth error", 500);
        return new UserVm(user, requestToken, refreshToken);
    }

    /**
     * Aplica o schema do tenant no novo banco
     */
    // private async applyTenantSchema(tenantId: string): Promise<void> {
    //     try {
    //         const tenantClient = await this.tenantServiceInjected!.getTenantClient(tenantId);

    //         // Executar uma query simples para forçar aplicação do schema
    //         await tenantClient.$executeRaw`SELECT 1`;

    //         this.logger.debug(`✅ Schema aplicado para tenant: ${tenantId}`);
    //     } catch (error) {
    //         this.logger.debug(`❌ Erro ao aplicar schema para tenant ${tenantId}:`, error);
    //         throw error;
    //     }
    // }
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

    /**
     * Busca usuário por email (para login)
     */
    async findUserByEmail(email: string) {
        return await this.masterClient.user.findUnique({
            where: { email },
            include: {
                tenant: true
            }
        });
    }

    /**
     * Verifica se ID já existe
     */
    async checkIdExists(id: string): Promise<boolean> {
        const tenant = await this.masterClient.tenant.findUnique({
            where: { id }
        });
        return !!tenant;
    }

    /**
     * Verifica se email já existe
     */
    async checkEmailExists(email: string): Promise<boolean> {
        const user = await this.masterClient.user.findUnique({
            where: { email }
        });
        return !!user;
    }
}