import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { OpportunityCloseReason } from "src/repos/enums/opportunity-close-reason.enum";

@Injectable()
export class GetOpportunityCloseReasonEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(OpportunityCloseReason, this.getOpportunityCloseReasonTranslation, this.getOpportunityCloseReasonColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getOpportunityCloseReasonTranslation(value: string): string {
        const translations = {
            'WON': 'Ganho',
            'LOST_PRICE': 'Perdido - Preço',
            'LOST_COMPETITION': 'Perdido - Concorrência',
            'LOST_NO_DECISION': 'Perdido - Sem Decisão',
            'LOST_OTHER': 'Perdido - Outro',
            'CANCELLED': 'Cancelado'
        };
        return translations[value] || value;
    }

    private getOpportunityCloseReasonColor(value: string): string {
        const colors = {
            'WON': '#4CAF50',         // Verde - Ganho
            'LOST_PRICE': '#F44336',  // Vermelho - Perdido preço
            'LOST_COMPETITION': '#EF4444', // Vermelho - Perdido concorrência
            'LOST_NO_DECISION': '#F59E0B', // Amarelo - Perdido sem decisão
            'LOST_OTHER': '#6B7280',  // Cinza - Perdido outro
            'CANCELLED': '#9E9E9E'    // Cinza - Cancelado
        };
        return colors[value] || '#6B7280';
    }
}