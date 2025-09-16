import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { CalendarProvider } from "src/repos/enums/calendar-provider.enum";

@Injectable()
export class GetCalendarProviderEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(CalendarProvider, this.getCalendarProviderTranslation, this.getCalendarProviderColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getCalendarProviderTranslation(value: string): string {
        const translations = {
            'GOOGLE': 'Google Calendar',
            'OUTLOOK': 'Microsoft Outlook',
            'APPLE': 'Apple Calendar',
            'EXCHANGE': 'Exchange Server'
        };
        return translations[value] || value;
    }

    private getCalendarProviderColor(value: string): string {
        const colors = {
            'GOOGLE': '#4285F4',       // Azul Google
            'OUTLOOK': '#0078D4',      // Azul Microsoft
            'APPLE': '#000000',        // Preto Apple
            'EXCHANGE': '#0078D4'      // Azul Exchange
        };
        return colors[value] || '#6B7280';
    }
}