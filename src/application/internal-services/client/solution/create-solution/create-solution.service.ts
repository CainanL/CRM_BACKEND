import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateSolutionRequest } from "./create-solution.request";
import { SolutionVm } from "src/application/ViewModels/solution/solution.vm";

@Injectable()
export class CreateSolutionService extends HandlerBase<CreateSolutionRequest, SolutionVm> {

    protected async executeCore(request: CreateSolutionRequest, data?: any): Promise<SolutionVm> {
        const res = await this.transaction(async (tx) => {
            return await tx.solution.create({ data: request });
        });
        return new SolutionVm(res);
    }

}