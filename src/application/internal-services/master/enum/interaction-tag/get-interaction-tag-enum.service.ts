import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";

@Injectable()
export class GetInteractionTagEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(InteractionTag, this.getInteractionTagTranslation, this.getInteractionTagColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getInteractionTagTranslation(value: string): string {
        const translations = {
            'HOT': 'Quente',
            'WARM': 'Morno',
            'COLD': 'Frio',
            'FOLLOW_UP': 'Acompanhamento',
            'URGENT': 'Urgente',
            'IMPORTANT': 'Importante'
        };
        return translations[value] || value;
    }

    private getInteractionTagColor(value: string): string {
        const colors = {
            'HOT': '#F44336',         // Vermelho - Quente
            'WARM': '#FF9800',        // Laranja - Morno
            'COLD': '#2196F3',        // Azul - Frio
            'FOLLOW_UP': '#F59E0B',   // Amarelo - Acompanhamento
            'URGENT': '#EF4444',      // Vermelho - Urgente
            'IMPORTANT': '#8B5CF6'    // Roxo - Importante
        };
        return colors[value] || '#6B7280';
    }
}