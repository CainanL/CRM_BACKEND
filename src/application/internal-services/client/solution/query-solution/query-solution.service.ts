import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QuerySolutionRequest } from "./query-solution.request";
import { SolutionVm } from "src/application/ViewModels/solution/solution.vm";

@Injectable()
export class QuerySolutionService extends HandlerBase<QuerySolutionRequest, SolutionVm> {

    protected async executeCore(request: QuerySolutionRequest, data?: any): Promise<SolutionVm> {
        const res = (await this.context.solution.findMany({
            where: {
                OR: [
                    { name: { contains: request.textSearch } },
                    { description: { contains: request.textSearch } }
                ]
            },
            include: { priceRanger: true },
            skip: request.skip,
            take: request.take,
        })).map(x => new SolutionVm(x));

        return res as any as SolutionVm;
    }

}