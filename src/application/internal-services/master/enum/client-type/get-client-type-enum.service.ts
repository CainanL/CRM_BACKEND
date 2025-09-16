import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ClientType } from "src/repos/enums/client-type.enum";

@Injectable()
export class GetClientTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ClientType, this.getClientTypeTranslation, this.getClientTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getClientTypeTranslation(value: string): string {
        const translations = {
            'INDIVIDUAL': 'Pessoa Física',
            'COMPANY': 'Pessoa Jurídica',
            'GOVERNMENT': 'Governo',
            'NON_PROFIT': 'Sem Fins Lucrativos'
        };
        return translations[value] || value;
    }

    private getClientTypeColor(value: string): string {
        const colors = {
            'INDIVIDUAL': '#3B82F6',   // Azul - Pessoa Física
            'COMPANY': '#10B981',      // Verde - Pessoa Jurídica
            'GOVERNMENT': '#8B5CF6',   // Roxo - Governo
            'NON_PROFIT': '#F59E0B'    // Amarelo - Sem fins lucrativos
        };
        return colors[value] || '#6B7280';
    }
}