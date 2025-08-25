import { SolutionPriceRangerVm } from "./solution-price-ranger.vm";
import { Solution, Prisma, SolutionPriceRanger } from ".prisma/tenant-client";

type SolutionProps = Solution & {
    priceRanger?: SolutionPriceRanger[];
};

export class SolutionVm {
    id: string;
    name: string;
    description?: string;
    ranger: SolutionPriceRangerVm[] = []

    constructor(s: SolutionProps) {
        this.id = s.id;
        this.name = s.name;
        this.description = s?.description!;
        this.ranger = s?.priceRanger?.map(x => new SolutionPriceRangerVm(x))!;
    }
}
