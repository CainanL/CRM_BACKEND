import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { RecipientType } from "src/repos/enums/recipient-type.enum";

@Injectable()
export class GetRecipientTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(RecipientType, this.getRecipientTypeTranslation, this.getRecipientTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getRecipientTypeTranslation(value: string): string {
        const translations = {
            'LEAD': 'Lead',
            'CLIENT': 'Cliente',
            'PROSPECT': 'Prospect',
            'SUBSCRIBER': 'Assinante',
            'PARTNER': 'Parceiro'
        };
        return translations[value] || value;
    }

    private getRecipientTypeColor(value: string): string {
        const colors = {
            'LEAD': '#F59E0B',        // Amarelo - Lead
            'CLIENT': '#10B981',      // Verde - Cliente
            'PROSPECT': '#3B82F6',    // Azul - Prospect
            'SUBSCRIBER': '#8B5CF6',  // Roxo - Assinante
            'PARTNER': '#06B6D4'      // Ciano - Parceiro
        };
        return colors[value] || '#6B7280';
    }
}