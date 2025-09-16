import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { OpportunityStatus } from "src/repos/enums/opportunity-status.enum";

@Injectable()
export class GetOpportunityStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(OpportunityStatus, this.getOpportunityStatusTranslation, this.getOpportunityStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getOpportunityStatusTranslation(value: string): string {
        const translations = {
            'NEW': 'Novo',
            'QUALIFIED': 'Qualificado',
            'PROPOSAL': 'Proposta',
            'NEGOTIATION': 'Negociação',
            'CLOSED_WON': 'Fechado - Ganho',
            'CLOSED_LOST': 'Fechado - Perdido'
        };
        return translations[value] || value;
    }

    private getOpportunityStatusColor(value: string): string {
        const colors = {
            'NEW': '#10B981',         // Verde - Novo
            'QUALIFIED': '#8B5CF6',   // Roxo - Qualificado
            'PROPOSAL': '#F59E0B',    // Amarelo - Proposta
            'NEGOTIATION': '#06B6D4', // Ciano - Negociação
            'CLOSED_WON': '#4CAF50',  // Verde - Fechado ganho
            'CLOSED_LOST': '#F44336'  // Vermelho - Fechado perdido
        };
        return colors[value] || '#6B7280';
    }
}