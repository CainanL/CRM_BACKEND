import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { EntityType } from "src/repos/enums/entity-type.enum";

@Injectable()
export class GetEntityTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(EntityType, this.getEntityTypeTranslation, this.getEntityTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getEntityTypeTranslation(value: string): string {
        const translations = {
            'USER': 'Usuário',
            'CLIENT': 'Cliente',
            'LEAD': 'Lead',
            'OPPORTUNITY': 'Oportunidade',
            'CONTACT': 'Contato',
            'COMPANY': 'Empresa'
        };
        return translations[value] || value;
    }

    private getEntityTypeColor(value: string): string {
        const colors = {
            'USER': '#3B82F6',        // Azul - Usuário
            'CLIENT': '#10B981',      // Verde - Cliente
            'LEAD': '#F59E0B',        // Amarelo - Lead
            'OPPORTUNITY': '#8B5CF6', // Roxo - Oportunidade
            'CONTACT': '#06B6D4',     // Ciano - Contato
            'COMPANY': '#EF4444'      // Vermelho - Empresa
        };
        return colors[value] || '#6B7280';
    }
}