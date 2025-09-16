import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { MessagePriority } from "src/repos/enums/message-priority.enum";

@Injectable()
export class GetMessagePriorityEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(MessagePriority, this.getMessagePriorityTranslation, this.getMessagePriorityColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getMessagePriorityTranslation(value: string): string {
        const translations = {
            'LOW': 'Baixa',
            'MEDIUM': 'Média',
            'HIGH': 'Alta',
            'URGENT': 'Urgente'
        };
        return translations[value] || value;
    }

    private getMessagePriorityColor(value: string): string {
        const colors = {
            'LOW': '#10B981',         // Verde - Baixa
            'MEDIUM': '#F59E0B',      // Amarelo - Média
            'HIGH': '#FF9800',        // Laranja - Alta
            'URGENT': '#F44336'       // Vermelho - Urgente
        };
        return colors[value] || '#6B7280';
    }
}