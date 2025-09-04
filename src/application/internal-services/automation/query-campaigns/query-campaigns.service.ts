import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryCampaignsRequest } from "./query-campaigns.request";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { MarketingCampaignToListVM } from "src/application/ViewModels/automation/marketing-campaign.viewmodel";

@Injectable()
export class QueryCampaignsService extends HandlerBase<QueryCampaignsRequest, PaginatedResponse<MarketingCampaignToListVM>> {
    protected async executeCore(request: QueryCampaignsRequest, data?: any): Promise<PaginatedResponse<MarketingCampaignToListVM>> {
        
        // Construir filtros
        const whereClause: any = {
            isActive: true
        };

        if (request.textSearch) {
            whereClause.OR = [
                { name: { contains: request.textSearch, mode: 'insensitive' } },
                { description: { contains: request.textSearch, mode: 'insensitive' } }
            ];
        }

        if (request.campaignType) {
            whereClause.campaignType = request.campaignType;
        }

        if (request.status) {
            whereClause.status = request.status;
        }

        if (request.category) {
            whereClause.category = request.category;
        }

        // Construir ordenação
        const orderBy: any = {};
        if (request.sortBy) {
            orderBy[request.sortBy] = request.sortOrder || 'desc';
        } else {
            orderBy.createdAt = 'desc';
        }

        // Buscar campanhas
        const campaigns = await this.context.marketingCampaign.findMany({
            where: whereClause,
            include: {
                createdByEmployee: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true
                    }
                },
                campaignExecutions: {
                    include: {
                        campaignRecipients: true,
                        campaignReport: true
                    },
                    orderBy: {
                        executionDate: 'desc'
                    },
                    take: 1 // Apenas a última execução para estatísticas
                }
            },
            orderBy,
            skip: request.skip,
            take: request.take
        });

        // Contar total
        const total = await this.context.marketingCampaign.count({
            where: whereClause
        });

        // Converter para ViewModels
        const campaignVMs = campaigns.map(campaign => new MarketingCampaignToListVM(campaign));

        return new PaginatedResponse<MarketingCampaignToListVM>(
            campaignVMs,
            request.page,
            request.take,
            total
        );
    }
}

