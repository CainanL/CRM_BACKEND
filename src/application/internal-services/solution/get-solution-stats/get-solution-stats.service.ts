import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetSolutionStatsRequest } from "./get-solution-stats.request";
import { SolutionStatsVm } from "src/application/ViewModels/solution/solution-stats.vm";

@Injectable()
export class GetSolutionStatsService extends HandlerBase<GetSolutionStatsRequest, SolutionStatsVm> {
    protected async executeCore(request: GetSolutionStatsRequest, data?: any): Promise<SolutionStatsVm> {
        // Verificar se a solução existe
        const solution = await this.context.solution.findFirst({
            where: { id: request.id }
        });

        if (!solution) {
            throw new Error("Solução não encontrada");
        }

        // Calcular data do último mês
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        // 1. Total de soluções
        const totalSolutions = await this.context.solution.count();

        // 2. Soluções ativas
        const activeSolutions = await this.context.solution.count({
            where: { isActive: true }
        });

        // 3. Taxa de conversão de leads no último mês (leads convertidos / total de leads)
        const lastMonthLeadsCount = await this.context.solutionCapturedLead.count({
            where: {
                solutionId: request.id,
                createdAt: {
                    gte: lastMonth
                }
            }
        });

        // Contar leads convertidos (assumindo que status diferente de "NEW" indica conversão)
        const convertedLeadsCount = await this.context.solutionCapturedLead.count({
            where: {
                solutionId: request.id,
                createdAt: {
                    gte: lastMonth
                },
                status: {
                    not: "NEW"
                }
            }
        });

        // Calcular taxa de conversão em porcentagem
        const conversionRate = lastMonthLeadsCount > 0 
            ? Math.round((convertedLeadsCount / lastMonthLeadsCount) * 100 * 100) / 100 // Arredondar para 2 casas decimais
            : 0;

        // 4. Leads gerados no último mês
        const lastMonthLeads = lastMonthLeadsCount;

        return new SolutionStatsVm({
            totalSolutions,
            activeSolutions,
            conversionRate,
            lastMonthLeads
        });
    }
}
