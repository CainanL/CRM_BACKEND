import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ApiResponse } from "./models/response/api.response";
import { BaseException } from "./exceptions/base-exception";
import { TenantService } from "src/infra/services/tenant.service";
import { PrismaClient as TenantClient } from '.prisma/tenant-client';
import { User } from ".prisma/master-client";

export interface IRequestWithTenant {
    tenantId?: string;
}

export interface IHandlerBase<TRequest, TResponse> {
    execute(request: TRequest, data?: unknown): Promise<ApiResponse<TResponse>>;
}

@Injectable()
export abstract class HandlerBase<TRequest, TResponse> implements IHandlerBase<TRequest, TResponse> {

    public readonly logger: Logger;
    private _dbClient: TenantClient | null = null;
    private _tenantId: string | null = null;
    private _dynamicTenantService: TenantService | null = null;
    private _user: User;
    public get user() {
        if (!this._user) throw new BaseException("User not implemented", 500);
        return this._user;
    }

    protected get tenantService(): TenantService {
        if (!this.tenantService && !this._dynamicTenantService) throw new BaseException("TenantService não iniciado");
        return this._tenantService! || this._dynamicTenantService!;
    }

    protected get context(): TenantClient {
        if (!this._dbClient) throw new BaseException("Contexto não inicializado", 500);
        return this._dbClient;
    }

    protected get tenantId(): string {
        if (!this._tenantId) throw new BaseException("TenantId não definido", 401);
        return this._tenantId;
    }


    constructor(
        protected readonly _tenantService?: TenantService,
        logger?: Logger) {
        this.logger = logger || new Logger(this.constructor.name);;
    }
    protected abstract executeCore(request: TRequest, data?: any): Promise<TResponse>;

    public async execute(request: TRequest, data?: unknown | any): Promise<ApiResponse<TResponse>> {
        if (data?.user) this._user = data.user;
        try {
            const tenantId = this.extractTenantId(request, data);
            if (tenantId)
                await this.initializeContext(tenantId);
            const response = await this.executeCore(request, data) as any;

            const message = response?.message ? response.message : "Success";
            const errors = response?.errors ? response.errors : null;

            return new ApiResponse<TResponse>({
                message,
                success: true,
                data: response,
                errors
            })
        } catch (error) {
            this.logger.error('Error during handler execution:', error);

            // Converte BaseException em HttpException
            if (error instanceof BaseException) {
                throw error.toHttpException();
            }
            // Para erros genéricos, lança uma HttpException 500
            throw new HttpException(
                error instanceof Error ? error.message : 'Erro interno do servidor',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private async initializeContext(tenantId?: string): Promise<void> {
        this._tenantId = tenantId || null;
        if (tenantId && this._tenantService)
            this._dbClient = await this._tenantService.getTenantClient(tenantId);
    }

    /**
     * Extrai o tenantId do request ou data
     */
    private extractTenantId(request: TRequest, data?: any): string | null {
        // Estratégia 1: Verificar se request tem tenantId
        if (request && typeof request === 'object' && 'tenantId' in request) {
            return (request as any).tenantId;
        }

        // Estratégia 2: Verificar se data tem tenantId
        if (data && typeof data === 'object' && 'tenantId' in data) {
            return data.tenantId;
        }

        // Estratégia 3: Verificar se request é do tipo IRequestWithTenant
        const requestWithTenant = request as unknown as IRequestWithTenant;
        if (requestWithTenant?.tenantId) {
            return requestWithTenant.tenantId;
        }

        // Estratégia 4: Extrair de headers (se data contém headers)
        if (data && typeof data === 'object' && 'headers' in data) {
            const headers = (data as any).headers;
            if (headers && headers['x-tenant-id']) {
                return headers['x-tenant-id'];
            }
        }

        return null;
    }

    /**
     * Limpeza opcional do context
     */
    protected cleanupContext(): void {
        // Não desconectamos aqui pois o TenantService gerencia o pool
        // Apenas limpamos as referências
        this._dbClient = null;
        this._tenantId = null;
    }

    /**
     * Método utilitário para handlers que precisam de transações
     */
    protected async transaction<T>(
        operation: (tx: TenantClient) => Promise<T>
    ): Promise<T> {
        return await this.context.$transaction(async (tx) => {
            return await operation(tx as TenantClient);
        });
    }

    /**
     * Método utilitário para logging com contexto
     */
    protected logWithContext(message: string, level: 'log' | 'error' | 'warn' | 'debug' = 'log'): void {
        const contextMessage = `[Tenant: ${this._tenantId}] ${message}`;
        this.logger[level](contextMessage);
    }

    protected setTenantService(tenantService: TenantService): void {
        this._dynamicTenantService = tenantService;
    }

    protected setTenantId(tenantId: string) {
        this._tenantId = tenantId;
    }

    protected setContext(context: TenantClient) {
        this._dbClient = context;
    }
}