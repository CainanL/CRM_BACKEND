import { Prisma } from ".prisma/master-client";
import { SolutionFieldSettings } from ".prisma/tenant-client";

export class SolutionFieldSettingsVM {
    public id: string;
    public dataType: string;
    public formatType: string;
    public mask?: string;
    public title: string;
    public placeholder?: string;
    public isRequired: boolean;
    public order: number;


    constructor(solution: SolutionFieldSettings) {
        this.id = solution.id;
        this.dataType = solution.dataType;
        this.formatType = solution.formatType;
        this.mask = solution?.mask || undefined;
        this.placeholder = solution?.placeholder || undefined;
        this.title = solution.title;
        this.isRequired = solution.isRequired;
        this.order = solution.order;

    }
}