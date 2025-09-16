import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { LeadStatus } from "src/repos/enums/lead-status.enum";

@Injectable()
export class GetLeadStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(LeadStatus, this.getLeadStatusTranslation, this.getLeadStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getLeadStatusTranslation(value: string): string {
        const translations = {
            'HOT': 'Quente',
            'WARM': 'Morno',
            'COLD': 'Frio',
            'NEW': 'Novo',
            'CONTACTED': 'Contatado',
            'QUALIFIED': 'Qualificado',
            'PROPOSAL_SENT': 'Proposta Enviada',
            'NEGOTIATION': 'Em Negociação',
            'WON': 'Ganho',
            'LOST': 'Perdido'
        };
        return translations[value] || value;
    }

    private getLeadStatusColor(value: string): string {
        const colors = {
            'HOT': '#F44336',         // Vermelho - Quente
            'WARM': '#FF9800',        // Laranja - Morno
            'COLD': '#2196F3',        // Azul - Frio
            'NEW': '#10B981',         // Verde - Novo
            'CONTACTED': '#3B82F6',   // Azul - Contatado
            'QUALIFIED': '#8B5CF6',   // Roxo - Qualificado
            'PROPOSAL_SENT': '#F59E0B', // Amarelo - Proposta enviada
            'NEGOTIATION': '#06B6D4', // Ciano - Em negociação
            'WON': '#4CAF50',         // Verde - Ganho
            'LOST': '#F44336'         // Vermelho - Perdido
        };
        return colors[value] || '#6B7280';
    }
}