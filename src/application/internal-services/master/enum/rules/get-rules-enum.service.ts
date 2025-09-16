import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { Rules } from "src/repos/enums/rules.enum";

@Injectable()
export class GetRulesEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(Rules, this.getRulesTranslation, this.getRulesColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getRulesTranslation(value: string): string {
        const translations = {
            'CREATE': 'Criar',
            'READ': 'Ler',
            'UPDATE': 'Atualizar',
            'DELETE': 'Excluir',
            'EXECUTE': 'Executar'
        };
        return translations[value] || value;
    }

    private getRulesColor(value: string): string {
        const colors = {
            'CREATE': '#10B981',      // Verde - Criar
            'READ': '#3B82F6',        // Azul - Ler
            'UPDATE': '#F59E0B',      // Amarelo - Atualizar
            'DELETE': '#F44336',      // Vermelho - Excluir
            'EXECUTE': '#8B5CF6'      // Roxo - Executar
        };
        return colors[value] || '#6B7280';
    }
}