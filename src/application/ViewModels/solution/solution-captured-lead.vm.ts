import { Prisma, SolutionCapturedLead, SolutionFieldValue } from ".prisma/tenant-client";
import { SolutionFieldValueVM } from "./solution-field-value.vm";

type SolutionCapturedLeadWithValues = Prisma.SolutionCapturedLeadGetPayload<{
    include: { fielValues: {include: {settings: true  }} }
}>;

export class SolutionCapturedLeadVM {
    public id: string;
    public status: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public solutionId: string;
    public fielValues: SolutionFieldValueVM[] = [];

    constructor(lead: SolutionCapturedLeadWithValues) {
        this.id = lead.id;
        this.status = lead.status || 'NEW';
        this.isActive = lead.isActive;
        this.createdAt = lead.createdAt;
        this.updatedAt = lead.updatedAt;
        this.solutionId = lead.solutionId;
        this.fielValues = lead.fielValues?.map(x => new SolutionFieldValueVM(x)) || [];
    }
}
