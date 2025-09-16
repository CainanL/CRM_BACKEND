import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { MessageDirection } from "src/repos/enums/message-direction.enum";

@Injectable()
export class GetMessageDirectionEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(MessageDirection, this.getMessageDirectionTranslation, this.getMessageDirectionColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getMessageDirectionTranslation(value: string): string {
        const translations = {
            'INBOUND': 'Entrada',
            'OUTBOUND': 'Saída'
        };
        return translations[value] || value;
    }

    private getMessageDirectionColor(value: string): string {
        const colors = {
            'INBOUND': '#10B981',     // Verde - Entrada
            'OUTBOUND': '#3B82F6'     // Azul - Saída
        };
        return colors[value] || '#6B7280';
    }
}