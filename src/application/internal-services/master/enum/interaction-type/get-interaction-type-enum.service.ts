import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { InteractionType } from "src/repos/enums/interaction-type.enum";

@Injectable()
export class GetInteractionTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(InteractionType, this.getInteractionTypeTranslation, this.getInteractionTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getInteractionTypeTranslation(value: string): string {
        const translations = {
            'CALL': 'Ligação',
            'EMAIL': 'E-mail',
            'SMS': 'SMS',
            'MEETING': 'Reunião',
            'VISIT': 'Visita',
            'DEMO': 'Demonstração',
            'PRESENTATION': 'Apresentação'
        };
        return translations[value] || value;
    }

    private getInteractionTypeColor(value: string): string {
        const colors = {
            'CALL': '#3B82F6',        // Azul - Ligação
            'EMAIL': '#10B981',       // Verde - E-mail
            'SMS': '#06B6D4',         // Ciano - SMS
            'MEETING': '#8B5CF6',     // Roxo - Reunião
            'VISIT': '#F59E0B',       // Amarelo - Visita
            'DEMO': '#EF4444',        // Vermelho - Demonstração
            'PRESENTATION': '#FF9800' // Laranja - Apresentação
        };
        return colors[value] || '#6B7280';
    }
}