import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { RecipientStatus } from "src/repos/enums/recipient-status.enum";

@Injectable()
export class GetRecipientStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(RecipientStatus, this.getRecipientStatusTranslation, this.getRecipientStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getRecipientStatusTranslation(value: string): string {
        const translations = {
            'ACTIVE': 'Ativo',
            'INACTIVE': 'Inativo',
            'UNSUBSCRIBED': 'Descadastrado',
            'BOUNCED': 'Retornou',
            'COMPLAINED': 'Reclamou'
        };
        return translations[value] || value;
    }

    private getRecipientStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',      // Verde - Ativo
            'INACTIVE': '#6B7280',    // Cinza - Inativo
            'UNSUBSCRIBED': '#F59E0B', // Amarelo - Descadastrado
            'BOUNCED': '#F44336',     // Vermelho - Retornou
            'COMPLAINED': '#EF4444'   // Vermelho - Reclamou
        };
        return colors[value] || '#6B7280';
    }
}