import { Injectable } from "@nestjs/common";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { QueryLeadsRequest } from "./query-leads.request";
import { HandlerBase } from "src/application/common/handle-base";
import { SolutionCaptureLeadVM } from "src/application/ViewModels/solution/solution-caputre-document.vm";

@Injectable()
export class QueryLeadsService extends HandlerBase<QueryLeadsRequest, PaginatedResponse<SolutionCaptureLeadVM>> {
    protected async executeCore(request: QueryLeadsRequest, data?: any): Promise<PaginatedResponse<SolutionCaptureLeadVM>> {
        this.logger.debug("request");
        const res = await this.context.solutionCapturedLead.findMany({
            where: {
                solutionId: request.solutionId
            },
            include: {
                fielValues: {include: {settings: true  }}
            },
            skip: request.skip,
            take: request.take
        });
        const count = await this.context.solutionCapturedLead.count({
            where: {
                solutionId: request.solutionId
            }
        });
        
        return new PaginatedResponse<SolutionCaptureLeadVM>(res.map(x => new SolutionCaptureLeadVM(x as any)), request.page, request.size, count);
    }
    
}