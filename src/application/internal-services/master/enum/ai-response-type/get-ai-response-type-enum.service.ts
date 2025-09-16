import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { AiResponseType } from "src/repos/enums/ai-response-type.enum";

@Injectable()
export class GetAiResponseTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(AiResponseType, this.getAiResponseTypeTranslation, this.getAiResponseTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getAiResponseTypeTranslation(value: string): string {
        const translations = {
            'TEXT': 'Texto',
            'JSON': 'JSON',
            'HTML': 'HTML',
            'MARKDOWN': 'Markdown'
        };
        return translations[value] || value;
    }

    private getAiResponseTypeColor(value: string): string {
        const colors = {
            'TEXT': '#3B82F6',        // Azul - Texto
            'JSON': '#10B981',         // Verde - JSON
            'HTML': '#F59E0B',         // Amarelo - HTML
            'MARKDOWN': '#8B5CF6'      // Roxo - Markdown
        };
        return colors[value] || '#6B7280';
    }
}