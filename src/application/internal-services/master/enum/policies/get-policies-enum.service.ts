import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { Policies } from "src/repos/enums/polices.enum";

@Injectable()
export class GetPoliciesEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(Policies, this.getPoliciesTranslation, this.getPoliciesColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getPoliciesTranslation(value: string): string {
        const translations = {
            'ADMIN': 'Administrador',
            'USER': 'Usuário',
            'MANAGER': 'Gerente',
            'VIEWER': 'Visualizador',
            'EDITOR': 'Editor'
        };
        return translations[value] || value;
    }

    private getPoliciesColor(value: string): string {
        const colors = {
            'ADMIN': '#F44336',       // Vermelho - Administrador
            'USER': '#3B82F6',        // Azul - Usuário
            'MANAGER': '#8B5CF6',     // Roxo - Gerente
            'VIEWER': '#6B7280',      // Cinza - Visualizador
            'EDITOR': '#10B981'       // Verde - Editor
        };
        return colors[value] || '#6B7280';
    }
}