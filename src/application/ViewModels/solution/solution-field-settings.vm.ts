import { Prisma } from ".prisma/master-client";
import { SolutionFieldSettings } from ".prisma/tenant-client";

export class SolutionFieldSettingsVM {
    public dataType: string;
    public formatType: string;
    public mask: string;
    public title: string;
    public placeholder?: string;

    constructor(solution: SolutionFieldSettings) {
        this.dataType = solution.dataType;
        this.formatType = solution.formatType;
        this.mask = solution?.mask!;
        this.placeholder = solution?.placeholder!;
        this.title = solution.title;
    }
}