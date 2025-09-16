import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { Gender } from "src/repos/enums/gender.enum";

@Injectable()
export class GetGenderEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(Gender, this.getGenderTranslation, this.getGenderColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getGenderTranslation(value: string): string {
        const translations = {
            'MALE': 'Masculino',
            'FEMALE': 'Feminino',
            'OTHER': 'Outro'
        };
        return translations[value] || value;
    }

    private getGenderColor(value: string): string {
        const colors = {
            'MALE': '#3B82F6',        // Azul - Masculino
            'FEMALE': '#EC4899',      // Rosa - Feminino
            'OTHER': '#8B5CF6'        // Roxo - Outro
        };
        return colors[value] || '#6B7280';
    }
}