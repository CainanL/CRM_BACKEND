import { Prisma, SolutionFieldValue } from ".prisma/tenant-client";

export type SolutionFieldValueWithValues = Prisma.SolutionFieldValueGetPayload<{
    include: { settings: true }
}>;

export class SolutionFieldValueVM {
    public id: string;
    public title: string;
    public value?: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public dataType: string;
    public formatType: string;
    public mask?: string;
    public placeholder?: string;

    constructor(solutionFieldValue: SolutionFieldValueWithValues) {
        this.id = solutionFieldValue.id;
        this.title = solutionFieldValue.title;
        this.value = solutionFieldValue.value || undefined;
        this.isActive = solutionFieldValue.isActive;
        this.createdAt = solutionFieldValue.createdAt;
        this.updatedAt = solutionFieldValue.updatedAt;
        this.dataType = solutionFieldValue.settings.dataType;
        this.formatType = solutionFieldValue.settings.formatType;
        this.mask = solutionFieldValue.settings.mask || undefined;
        this.placeholder = solutionFieldValue.settings.placeholder || undefined;
    }
}