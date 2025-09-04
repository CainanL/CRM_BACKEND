import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { QueryTemplatesRequest } from "./query-templates.request";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";
import { CampaignTemplateToListVM } from "src/application/ViewModels/automation/campaign-template.viewmodel";

@Injectable()
export class QueryTemplatesService extends HandlerBase<QueryTemplatesRequest, PaginatedResponse<CampaignTemplateToListVM>> {
    protected async executeCore(request: QueryTemplatesRequest, data?: any): Promise<PaginatedResponse<CampaignTemplateToListVM>> {
        
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

        if (request.templateType) {
            whereClause.templateType = request.templateType;
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

        // Buscar templates
        const templates = await this.context.campaignTemplate.findMany({
            where: whereClause,
            include: {
                createdByEmployee: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true
                    }
                }
            },
            orderBy,
            skip: request.skip,
            take: request.take
        });

        // Contar total
        const total = await this.context.campaignTemplate.count({
            where: whereClause
        });

        // Converter para ViewModels
        const templateVMs = templates.map(template => new CampaignTemplateToListVM(template));

        return new PaginatedResponse<CampaignTemplateToListVM>(
            templateVMs,
            request.page,
            request.take,
            total
        );
    }
}
