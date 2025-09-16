import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

@Injectable()
export class GetCampaignStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(CampaignStatus, this.getCampaignStatusTranslation, this.getCampaignStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getCampaignStatusTranslation(value: string): string {
        const translations = {
            'DRAFT': 'Rascunho',
            'SCHEDULED': 'Agendada',
            'RUNNING': 'Em Execução',
            'PAUSED': 'Pausada',
            'COMPLETED': 'Concluída',
            'CANCELLED': 'Cancelada'
        };
        return translations[value] || value;
    }

    private getCampaignStatusColor(value: string): string {
        const colors = {
            'DRAFT': '#6B7280',        // Cinza - Rascunho
            'SCHEDULED': '#3B82F6',    // Azul - Agendada
            'RUNNING': '#10B981',      // Verde - Em execução
            'PAUSED': '#F59E0B',       // Amarelo - Pausada
            'COMPLETED': '#4CAF50',    // Verde - Concluída
            'CANCELLED': '#F44336'     // Vermelho - Cancelada
        };
        return colors[value] || '#6B7280';
    }
}