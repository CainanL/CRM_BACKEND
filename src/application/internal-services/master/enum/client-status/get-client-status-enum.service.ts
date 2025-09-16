import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ClientStatus } from "src/repos/enums/client-status.enum";

@Injectable()
export class GetClientStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ClientStatus, this.getClientStatusTranslation, this.getClientStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getClientStatusTranslation(value: string): string {
        const translations = {
            'ACTIVE': 'Ativo',
            'INACTIVE': 'Inativo',
            'PENDING': 'Pendente',
            'BLOCKED': 'Bloqueado'
        };
        return translations[value] || value;
    }

    private getClientStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',       // Verde - Ativo
            'INACTIVE': '#6B7280',     // Cinza - Inativo
            'PENDING': '#F59E0B',      // Amarelo - Pendente
            'BLOCKED': '#F44336'       // Vermelho - Bloqueado
        };
        return colors[value] || '#6B7280';
    }
}