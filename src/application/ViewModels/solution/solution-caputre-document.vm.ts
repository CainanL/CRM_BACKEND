import { SolutionFieldValueVM } from "./solution-field-value.vm";
import { Prisma } from ".prisma/tenant-client";

type SolutionCapturedLeadWithValues = Prisma.SolutionCapturedLeadGetPayload<{
    include: { fielValues: {include: {settings: true  }} }
}>;

export class SolutionCaptureLeadVM {
    id: string;
    status?: string;
    fieldValues: SolutionFieldValueVM[];

    constructor(data: SolutionCapturedLeadWithValues) {
        console.log("data", data);
        this.id = data.id;
        this.status = data?.status!;
        this.fieldValues = data?.fielValues.map(x => new SolutionFieldValueVM(x))!;
    }
}