import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { CommunicationChannel } from "src/repos/enums/communication-channel.enum";

@Injectable()
export class GetCommunicationChannelEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(CommunicationChannel, this.getCommunicationChannelTranslation, this.getCommunicationChannelColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getCommunicationChannelTranslation(value: string): string {
        const translations = {
            'EMAIL': 'E-mail',
            'PHONE': 'Telefone',
            'SMS': 'SMS',
            'WHATSAPP': 'WhatsApp',
            'FACEBOOK': 'Facebook',
            'INSTAGRAM': 'Instagram',
            'LINKEDIN': 'LinkedIn',
            'TWITTER': 'Twitter',
            'TELEGRAM': 'Telegram',
            'IN_PERSON': 'Presencial'
        };
        return translations[value] || value;
    }

    private getCommunicationChannelColor(value: string): string {
        const colors = {
            'EMAIL': '#10B981',        // Verde - E-mail
            'PHONE': '#3B82F6',        // Azul - Telefone
            'SMS': '#06B6D4',          // Ciano - SMS
            'WHATSAPP': '#25D366',     // Verde WhatsApp
            'FACEBOOK': '#1877F2',     // Azul Facebook
            'INSTAGRAM': '#E4405F',    // Rosa Instagram
            'LINKEDIN': '#0A66C2',     // Azul LinkedIn
            'TWITTER': '#1DA1F2',      // Azul Twitter
            'TELEGRAM': '#0088CC',     // Azul Telegram
            'IN_PERSON': '#8B5CF6'     // Roxo - Presencial
        };
        return colors[value] || '#6B7280';
    }
}