import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ActivityType } from "src/repos/enums/activity-type.enum";

@Injectable()
export class GetActivityTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ActivityType, this.getActivityTypeTranslation, this.getActivityTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getActivityTypeTranslation(value: string): string {
        const translations = {
            'CALL': 'Ligação',
            'EMAIL': 'E-mail',
            'MEETING': 'Reunião',
            'TASK': 'Tarefa',
            'NOTE': 'Nota',
            'FOLLOW_UP': 'Acompanhamento'
        };
        return translations[value] || value;
    }

    private getActivityTypeColor(value: string): string {
        const colors = {
            'CALL': '#3B82F6',        // Azul - Ligação
            'EMAIL': '#10B981',        // Verde - E-mail
            'MEETING': '#8B5CF6',      // Roxo - Reunião
            'TASK': '#F59E0B',         // Amarelo - Tarefa
            'NOTE': '#6B7280',         // Cinza - Nota
            'FOLLOW_UP': '#EF4444'     // Vermelho - Acompanhamento
        };
        return colors[value] || '#6B7280';
    }
}