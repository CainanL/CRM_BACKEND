import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ContractType } from "src/repos/enums/contract-type.enum";

@Injectable()
export class GetContractTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ContractType, this.getContractTypeTranslation, this.getContractTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getContractTypeTranslation(value: string): string {
        const translations = {
            'SERVICE': 'Serviço',
            'PRODUCT': 'Produto',
            'SUBSCRIPTION': 'Assinatura',
            'MAINTENANCE': 'Manutenção',
            'SUPPORT': 'Suporte',
            'LICENSE': 'Licença'
        };
        return translations[value] || value;
    }

    private getContractTypeColor(value: string): string {
        const colors = {
            'SERVICE': '#10B981',     // Verde - Serviço
            'PRODUCT': '#3B82F6',     // Azul - Produto
            'SUBSCRIPTION': '#8B5CF6', // Roxo - Assinatura
            'MAINTENANCE': '#F59E0B', // Amarelo - Manutenção
            'SUPPORT': '#06B6D4',     // Ciano - Suporte
            'LICENSE': '#EF4444'      // Vermelho - Licença
        };
        return colors[value] || '#6B7280';
    }
}