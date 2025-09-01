import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetByIdBase } from "src/application/common/get-by-id-base";
import { OpportunityVM } from "src/application/ViewModels/pipeline/opportunity.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { GetOpportunityByIdRequest } from "./get-opportunity-by-id.request";

@Injectable()
export class GetOpportunityByIdService extends HandlerBase<GetOpportunityByIdRequest, OpportunityVM> {
    protected async executeCore(request: GetOpportunityByIdRequest, data?: any): Promise<OpportunityVM> {

        return await this.transaction<OpportunityVM>(async (tx) => {

            const opportunity = await tx.opportunity.findUnique({
                where: { id: request.id },
                include: {
                    client: { include: { address: true } },
                    pipeline: { include: { group: true } },
                    stage: true,
                    assignedEmployee: { include: { address: true } }
                }
            });

            if (!opportunity) {
                throw new BaseException("Oportunidade não encontrada", 404);
            }

            return new OpportunityVM(opportunity);
        });
    }
}
