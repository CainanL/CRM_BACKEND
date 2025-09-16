import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";

@Injectable()
export class GetConversationStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ConversationStatus, this.getConversationStatusTranslation, this.getConversationStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getConversationStatusTranslation(value: string): string {
        const translations = {
            'OPEN': 'Aberta',
            'CLOSED': 'Fechada',
            'PENDING': 'Pendente',
            'RESOLVED': 'Resolvida',
            'ESCALATED': 'Escalada'
        };
        return translations[value] || value;
    }

    private getConversationStatusColor(value: string): string {
        const colors = {
            'OPEN': '#10B981',        // Verde - Aberta
            'CLOSED': '#6B7280',      // Cinza - Fechada
            'PENDING': '#F59E0B',     // Amarelo - Pendente
            'RESOLVED': '#4CAF50',    // Verde - Resolvida
            'ESCALATED': '#F44336'    // Vermelho - Escalada
        };
        return colors[value] || '#6B7280';
    }
}