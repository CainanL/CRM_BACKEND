import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { AutomationType } from "src/repos/enums/automation-type.enum";

@Injectable()
export class GetAutomationTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(AutomationType, this.getAutomationTypeTranslation, this.getAutomationTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getAutomationTypeTranslation(value: string): string {
        const translations = {
            'EMAIL_SEQUENCE': 'Sequência de E-mail',
            'SMS_SEQUENCE': 'Sequência de SMS',
            'CALL_REMINDER': 'Lembrete de Ligação',
            'FOLLOW_UP': 'Acompanhamento',
            'WELCOME': 'Boas-vindas',
            'NURTURING': 'Nutrição de Lead'
        };
        return translations[value] || value;
    }

    private getAutomationTypeColor(value: string): string {
        const colors = {
            'EMAIL_SEQUENCE': '#10B981',   // Verde - E-mail
            'SMS_SEQUENCE': '#3B82F6',     // Azul - SMS
            'CALL_REMINDER': '#F59E0B',    // Amarelo - Lembrete
            'FOLLOW_UP': '#EF4444',        // Vermelho - Acompanhamento
            'WELCOME': '#8B5CF6',          // Roxo - Boas-vindas
            'NURTURING': '#06B6D4'         // Ciano - Nutrição
        };
        return colors[value] || '#6B7280';
    }
}