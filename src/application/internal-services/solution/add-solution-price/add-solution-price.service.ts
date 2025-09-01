import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { AddSolutionPriceRequest } from "./add-solution-price.request";
import { SolutionPriceRangerVm } from "src/application/ViewModels/solution/solution-price-ranger.vm";

@Injectable()
export class AddSolutionPriceService extends HandlerBase<AddSolutionPriceRequest, SolutionPriceRangerVm> {
    protected async executeCore(request: AddSolutionPriceRequest, data?: any): Promise<SolutionPriceRangerVm> {
        return await this.context.solutionPriceRanger.create({ data: request })
            .then(x => new SolutionPriceRangerVm(x));
    }

}