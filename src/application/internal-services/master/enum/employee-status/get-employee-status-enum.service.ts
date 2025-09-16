import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { EnumItemVm } from "src/application/ViewModels/enum/enum.vm";
import { EmployeeStatus } from "src/repos/enums/employee-status.enum";

@Injectable()
export class GetEmployeeStatusEnumService extends HandlerBase<null, EnumItemVm[]> {

    protected async executeCore(request: null, data?: any): Promise<EnumItemVm[]> {
        return this.getEnumItems(EmployeeStatus, this.getEmployeeStatusTranslation, this.getEmployeeStatusColor);
    }

    private getEnumItems(enumObject: any, translationFunction: (value: string) => string, colorFunction: (value: string) => string): EnumItemVm[] {
        return Object.values(enumObject).map((value: string) => new EnumItemVm(value, translationFunction(value), colorFunction(value)));
    }

    private getEmployeeStatusTranslation(value: string): string {
        const translations = {
            'ACTIVE': 'Ativo',
            'INACTIVE': 'Inativo',
            'ON_LEAVE': 'Afastado',
            'TERMINATED': 'Demitido',
            'SUSPENDED': 'Suspenso'
        };
        return translations[value] || value;
    }

    private getEmployeeStatusColor(value: string): string {
        const colors = {
            'ACTIVE': '#10B981',      // Verde - Ativo
            'INACTIVE': '#6B7280',    // Cinza - Inativo
            'ON_LEAVE': '#F59E0B',    // Amarelo - Afastado
            'TERMINATED': '#F44336',  // Vermelho - Demitido
            'SUSPENDED': '#EF4444'    // Vermelho - Suspenso
        };
        return colors[value] || '#6B7280';
    }
}