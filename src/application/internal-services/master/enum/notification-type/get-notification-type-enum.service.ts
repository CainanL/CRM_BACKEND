import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { NotificationType } from "src/repos/enums/notification-type.enum";

@Injectable()
export class GetNotificationTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(NotificationType, this.getNotificationTypeTranslation, this.getNotificationTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getNotificationTypeTranslation(value: string): string {
        const translations = {
            'EMAIL': 'E-mail',
            'SMS': 'SMS',
            'PUSH': 'Push',
            'IN_APP': 'No Aplicativo',
            'WEBHOOK': 'Webhook'
        };
        return translations[value] || value;
    }

    private getNotificationTypeColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',       // Verde - E-mail
            'SMS': '#3B82F6',         // Azul - SMS
            'PUSH': '#8B5CF6',        // Roxo - Push
            'IN_APP': '#F59E0B',      // Amarelo - No aplicativo
            'WEBHOOK': '#06B6D4'      // Ciano - Webhook
        };
        return colors[value] || '#6B7280';
    }
}