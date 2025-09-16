import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { ContentType } from "src/repos/enums/content-type.enum";

@Injectable()
export class GetContentTypeEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(ContentType, this.getContentTypeTranslation, this.getContentTypeColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getContentTypeTranslation(value: string): string {
        const translations = {
            'TEXT': 'Texto',
            'HTML': 'HTML',
            'IMAGE': 'Imagem',
            'VIDEO': 'Vídeo',
            'AUDIO': 'Áudio',
            'DOCUMENT': 'Documento',
            'PDF': 'PDF',
            'SPREADSHEET': 'Planilha',
            'PRESENTATION': 'Apresentação'
        };
        return translations[value] || value;
    }

    private getContentTypeColor(value: string): string {
        const colors = {
            'TEXT': '#6B7280',        // Cinza - Texto
            'HTML': '#F59E0B',        // Amarelo - HTML
            'IMAGE': '#8B5CF6',       // Roxo - Imagem
            'VIDEO': '#EF4444',       // Vermelho - Vídeo
            'AUDIO': '#10B981',       // Verde - Áudio
            'DOCUMENT': '#3B82F6',    // Azul - Documento
            'PDF': '#F44336',         // Vermelho - PDF
            'SPREADSHEET': '#4CAF50', // Verde - Planilha
            'PRESENTATION': '#FF9800' // Laranja - Apresentação
        };
        return colors[value] || '#6B7280';
    }
}