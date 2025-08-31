import { SolutionPriceRangerVm } from "./solution-price-ranger.vm";
import { Solution, Prisma, SolutionPriceRanger } from ".prisma/tenant-client";

type SolutionProps = Solution & {
    priceRanger?: SolutionPriceRanger[];
};

export class SolutionVm {
    id: string;
    name: string;
    description?: string;
    priceRanger: SolutionPriceRangerVm[] = []


    constructor(s: SolutionProps) {
        this.id = s.id;
        this.name = s.name;
        this.description = s?.description!;
        this.priceRanger = s?.priceRanger?.map(x => new SolutionPriceRangerVm(x))!;
    }
}
