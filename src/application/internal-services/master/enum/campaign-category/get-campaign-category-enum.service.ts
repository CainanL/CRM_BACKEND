import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { CampaignCategory } from "src/repos/enums/campaign-category.enum";

@Injectable()
export class GetCampaignCategoryEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(CampaignCategory, this.getCampaignCategoryTranslation, this.getCampaignCategoryColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getCampaignCategoryTranslation(value: string): string {
        const translations = {
            'EMAIL': 'E-mail',
            'SMS': 'SMS',
            'SOCIAL_MEDIA': 'Rede Social',
            'DIRECT_MAIL': 'Correio Direto',
            'DIGITAL_ADS': 'Anúncios Digitais',
            'CONTENT': 'Conteúdo'
        };
        return translations[value] || value;
    }

    private getCampaignCategoryColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',        // Verde - E-mail
            'SMS': '#3B82F6',          // Azul - SMS
            'SOCIAL_MEDIA': '#8B5CF6', // Roxo - Social
            'DIRECT_MAIL': '#F59E0B',  // Amarelo - Correio
            'DIGITAL_ADS': '#EF4444',  // Vermelho - Anúncios
            'CONTENT': '#06B6D4'       // Ciano - Conteúdo
        };
        return colors[value] || '#6B7280';
    }
}