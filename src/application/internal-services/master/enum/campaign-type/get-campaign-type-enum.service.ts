import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { CampaignType } from "src/repos/enums/campaign-type.enum";

@Injectable()
export class GetCampaignTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(CampaignType, this.getCampaignTypeTranslation, this.getCampaignTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getCampaignTypeTranslation(value: string): string {
        const translations = {
            'MARKETING': 'Marketing',
            'SALES': 'Vendas',
            'NURTURING': 'Nutrição de Lead',
            'RETENTION': 'Retenção',
            'REACTIVATION': 'Reativação',
            'PROMOTIONAL': 'Promocional'
        };
        return translations[value] || value;
    }

    private getCampaignTypeColor(value: string): string {
        const colors = {
            'MARKETING': '#8B5CF6',    // Roxo - Marketing
            'SALES': '#EF4444',        // Vermelho - Vendas
            'NURTURING': '#06B6D4',    // Ciano - Nutrição
            'RETENTION': '#10B981',    // Verde - Retenção
            'REACTIVATION': '#F59E0B', // Amarelo - Reativação
            'PROMOTIONAL': '#EC4899'   // Rosa - Promocional
        };
        return colors[value] || '#6B7280';
    }
}