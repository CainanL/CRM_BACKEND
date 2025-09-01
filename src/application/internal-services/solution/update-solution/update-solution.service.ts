import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateSolutionRequest } from "./update-solution.request";
import { SolutionVm } from "src/application/ViewModels/solution/solution.vm";

@Injectable()
export class UpdateSolutionService extends HandlerBase<UpdateSolutionRequest, SolutionVm> {
    protected async executeCore(request: UpdateSolutionRequest, data?: any): Promise<SolutionVm> {
        return await this.context.solution.update({
            where: { id: request.id }, data: {
                description: request.description,
                name: request.name
            }
        }).then(x => new SolutionVm(x));
    }
}