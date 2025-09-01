import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteSolutionRequest } from "./delete-solution.request";

@Injectable()
export class DeleteSolutionService extends HandlerBase<DeleteSolutionRequest, void> {
    protected async executeCore(request: DeleteSolutionRequest, data?: any): Promise<void> {
        await this.context.solution.update({
            where: { id: request.id }, data: { isActive: false }
        });
    }

}