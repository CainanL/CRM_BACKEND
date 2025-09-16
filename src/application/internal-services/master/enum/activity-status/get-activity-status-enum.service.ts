import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ActivityStatus } from "src/repos/enums/activity-status.enum";

@Injectable()
export class GetActivityStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ActivityStatus, this.getActivityStatusTranslation, this.getActivityStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getActivityStatusTranslation(value: string): string {
        const translations = {
            'PENDING': 'Pendente',
            'IN_PROGRESS': 'Em Andamento',
            'COMPLETED': 'Concluído',
            'OVERDUE': 'Atrasado',
            'CANCELLED': 'Cancelado'
        };
        return translations[value] || value;
    }

    private getActivityStatusColor(value: string): string {
        const colors = {
            'PENDING': '#FFA500',      // Laranja - Aguardando
            'IN_PROGRESS': '#2196F3',  // Azul - Em andamento
            'COMPLETED': '#4CAF50',    // Verde - Concluído
            'OVERDUE': '#F44336',      // Vermelho - Atrasado
            'CANCELLED': '#9E9E9E'     // Cinza - Cancelado
        };
        return colors[value] || '#6B7280';
    }
}