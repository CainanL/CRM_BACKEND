import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { MessageStatus } from "src/repos/enums/message-status.enum";

@Injectable()
export class GetMessageStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(MessageStatus, this.getMessageStatusTranslation, this.getMessageStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getMessageStatusTranslation(value: string): string {
        const translations = {
            'DRAFT': 'Rascunho',
            'SENT': 'Enviada',
            'DELIVERED': 'Entregue',
            'READ': 'Lida',
            'FAILED': 'Falhou',
            'BOUNCED': 'Retornou'
        };
        return translations[value] || value;
    }

    private getMessageStatusColor(value: string): string {
        const colors = {
            'DRAFT': '#6B7280',       // Cinza - Rascunho
            'SENT': '#3B82F6',        // Azul - Enviada
            'DELIVERED': '#10B981',   // Verde - Entregue
            'READ': '#4CAF50',        // Verde - Lida
            'FAILED': '#F44336',      // Vermelho - Falhou
            'BOUNCED': '#EF4444'      // Vermelho - Retornou
        };
        return colors[value] || '#6B7280';
    }
}