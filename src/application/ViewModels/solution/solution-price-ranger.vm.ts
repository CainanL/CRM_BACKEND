import { SolutionPriceRanger } from ".prisma/tenant-client";

export class SolutionPriceRangerVm {
    id: string;
    title: string;
    description?: string;
    price?: number;
    ranger: number;
    unitOfMeasurement?: string;

    constructor(spr: SolutionPriceRanger) {
        this.id = spr.id;
        this.title = spr.title;
        this.description = spr.description!;
        if (spr?.price)
            this.price = Number(spr.price);
        if (spr?.ranger)
            this.ranger = Number(spr.ranger);
        this.unitOfMeasurement = spr.unitOfMeasurement!;
    }
}
