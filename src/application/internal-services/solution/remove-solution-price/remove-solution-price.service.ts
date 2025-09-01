import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { RemoveSolutionPriceRequest } from "./remove-solution-price.request";

@Injectable()
export class RemoveSolutionPriceService extends HandlerBase<RemoveSolutionPriceRequest, void> {
    protected async executeCore(request: RemoveSolutionPriceRequest, data?: any): Promise<void> {
        await this.context.solutionPriceRanger.delete({ where: { id: request.id } });
    }

}