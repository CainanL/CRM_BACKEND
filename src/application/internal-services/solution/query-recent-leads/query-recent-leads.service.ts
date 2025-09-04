import { Injectable } from "@nestjs/common";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { QueryRecentLeadsRequest } from "./query-recent-leads.request";
import { HandlerBase } from "src/application/common/handle-base";
import { SolutionCaptureLeadVM } from "src/application/ViewModels/solution/solution-caputre-document.vm";

@Injectable()
export class QueryRecentLeadsService extends HandlerBase<QueryRecentLeadsRequest, PaginatedResponse<SolutionCaptureLeadVM>> {
    protected async executeCore(request: QueryRecentLeadsRequest, data?: any): Promise<PaginatedResponse<SolutionCaptureLeadVM>> {
        this.logger.debug("Querying recent leads for the last " + request.days + " days");
        
        // Calcula a data de 3 dias atrás
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - request.days);
        
        const res = await this.context.solutionCapturedLead.findMany({
            where: {
                createdAt: {
                    gte: threeDaysAgo
                },
                isActive: true
            },
            include: {
                fielValues: {
                    include: { 
                        settings: true  
                    }
                },
                solution: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            },
            skip: request.skip,
            take: request.take,
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        const count = await this.context.solutionCapturedLead.count({
            where: {
                createdAt: {
                    gte: threeDaysAgo
                },
                isActive: true
            }
        });
        
        return new PaginatedResponse<SolutionCaptureLeadVM>(
            res.map(x => new SolutionCaptureLeadVM(x)), 
            request.page, 
            request.size, 
            count
        );
    }
}
