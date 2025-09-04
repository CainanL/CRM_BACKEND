import { SolutionFieldValueVM } from "./solution-field-value.vm";
import { Prisma } from ".prisma/tenant-client";

type SolutionCapturedLeadWithValues = Prisma.SolutionCapturedLeadGetPayload<{
    include: { fielValues: { include: { settings: true } } }
}>;

export class SolutionCaptureLeadVM {
    id: string;
    status: string;
    name: string;
    email: string;
    phone: string;
    capturedAt: Date;
    fieldValues: SolutionFieldValueVM[] = [];

    constructor(data: SolutionCapturedLeadWithValues) {
        console.log("data", data);
        this.id = data.id;
        this.status = data?.status!;
        this.capturedAt = data.createdAt;
        data?.fielValues.forEach(x => {
            switch(x.title.toLowerCase()){
                case "name":
                    this.name = x.value!;
                    break;
                case "email":
                    this.email = x.value!;
                    break;
                case "phone":
                    this.phone = x.value!;
                    break;
                case "nome":
                    this.name = x.value!;
                    break;
                default:
                    this.fieldValues.push(new SolutionFieldValueVM(x));
                    break;
            }
        });
    }
}