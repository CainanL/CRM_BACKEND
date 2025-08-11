export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];

    constructor(options: {
        success: boolean;
        message: string;
        data?: T;
        errors?: string[];
    }) {
        this.success = options.success;
        this.message = options.message;
        this.data = options.data;
        this.errors = options.errors;
    }

    static success<T>(data: T, message = 'Operação realizada com sucesso'): ApiResponse<T> {
        return new ApiResponse({ success: true, message, data });
    }

    static error<T>(message = 'Erro ao processar requisição', errors: string[] = []): ApiResponse<T> {
        return new ApiResponse({ success: false, message, errors });
    }
}