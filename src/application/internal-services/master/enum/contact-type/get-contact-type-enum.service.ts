import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ContactType } from "src/repos/enums/contact-type.enum";

@Injectable()
export class GetContactTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ContactType, this.getContactTypeTranslation, this.getContactTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getContactTypeTranslation(value: string): string {
        const translations = {
            'PRIMARY': 'Principal',
            'SECONDARY': 'Secundário',
            'EMERGENCY': 'Emergência',
            'BILLING': 'Cobrança',
            'TECHNICAL': 'Técnico',
            'SALES': 'Vendas'
        };
        return translations[value] || value;
    }

    private getContactTypeColor(value: string): string {
        const colors = {
            'PRIMARY': '#10B981',      // Verde - Principal
            'SECONDARY': '#3B82F6',    // Azul - Secundário
            'EMERGENCY': '#F44336',    // Vermelho - Emergência
            'BILLING': '#F59E0B',      // Amarelo - Cobrança
            'TECHNICAL': '#8B5CF6',    // Roxo - Técnico
            'SALES': '#EF4444'         // Vermelho - Vendas
        };
        return colors[value] || '#6B7280';
    }
}