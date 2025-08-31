import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetSolutionByIdRequest } from "./get-solution-by-id.request";
import { SolutionVm } from "src/application/ViewModels/solution/solution.vm";

@Injectable()
export class GetSolutionByIdService extends HandlerBase<GetSolutionByIdRequest, SolutionVm> {
    protected async executeCore(request: GetSolutionByIdRequest, data?: any): Promise<SolutionVm> {
        return await this.context.solution.findFirst({ where: { id: request.id }, include: {
            fieldSettings: true,
            priceRanger: true
        } }).then(x => new SolutionVm(x!));
    }

}