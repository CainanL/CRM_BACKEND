import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";

@Injectable()
export class GetInteractionStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(InteractionStatus, this.getInteractionStatusTranslation, this.getInteractionStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getInteractionStatusTranslation(value: string): string {
        const translations = {
            'PENDING': 'Pendente',
            'IN_PROGRESS': 'Em Andamento',
            'COMPLETED': 'Concluída',
            'CANCELLED': 'Cancelada',
            'FAILED': 'Falhou'
        };
        return translations[value] || value;
    }

    private getInteractionStatusColor(value: string): string {
        const colors = {
            'PENDING': '#F59E0B',     // Amarelo - Pendente
            'IN_PROGRESS': '#3B82F6', // Azul - Em andamento
            'COMPLETED': '#10B981',   // Verde - Concluída
            'CANCELLED': '#6B7280',   // Cinza - Cancelada
            'FAILED': '#F44336'       // Vermelho - Falhou
        };
        return colors[value] || '#6B7280';
    }
}