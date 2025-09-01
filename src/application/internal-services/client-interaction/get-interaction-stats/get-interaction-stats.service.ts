import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { InteractionStatsVM } from "src/application/ViewModels/client-interaction/interaction-stats.vm";

@Injectable()
export class GetInteractionStatsService extends HandlerBase<null, InteractionStatsVM> {
    protected async executeCore(request: null, data?: any): Promise<InteractionStatsVM> {

        return await this.transaction<InteractionStatsVM>(async (tx) => {

            const now = new Date();
            const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

            // Estatísticas gerais
            const [
                totalInteractions,
                interactionsByType,
                interactionsByStatus,
                interactionsByTag,
                interactionsByPriority,
                averageDuration,
                totalCost,
                interactionsThisMonth,
                interactionsLastMonth,
                topEmployees,
                topClients
            ] = await Promise.all([
                // Total de interações
                tx.clientInteraction.count({ where: { isActive: true } }),

                // Interações por tipo
                tx.clientInteraction.groupBy({
                    by: ['interactionType'],
                    where: { isActive: true },
                    _count: { interactionType: true }
                }),

                // Interações por status
                tx.clientInteraction.groupBy({
                    by: ['status'],
                    where: { isActive: true },
                    _count: { status: true }
                }),

                // Interações por tag (mais complexo, precisa desagregar arrays)
                tx.clientInteraction.findMany({
                    where: { isActive: true },
                    select: { tags: true }
                }),

                // Interações por prioridade
                tx.clientInteraction.groupBy({
                    by: ['priority'],
                    where: { isActive: true, priority: { not: null } },
                    _count: { priority: true }
                }),

                // Duração média
                tx.clientInteraction.aggregate({
                    where: { isActive: true, duration: { not: null } },
                    _avg: { duration: true }
                }),

                // Custo total
                tx.clientInteraction.aggregate({
                    where: { isActive: true, cost: { not: null } },
                    _sum: { cost: true }
                }),

                // Interações este mês
                tx.clientInteraction.count({
                    where: {
                        isActive: true,
                        interactionDate: { gte: firstDayThisMonth }
                    }
                }),

                // Interações mês passado
                tx.clientInteraction.count({
                    where: {
                        isActive: true,
                        interactionDate: { gte: firstDayLastMonth, lte: lastDayLastMonth }
                    }
                }),

                // Top funcionários
                tx.clientInteraction.groupBy({
                    by: ['employeeId'],
                    where: { isActive: true, employeeId: { not: null } },
                    _count: { employeeId: true },
                    orderBy: { _count: { employeeId: 'desc' } },
                    take: 5
                }),

                // Top clientes
                tx.clientInteraction.groupBy({
                    by: ['clientId'],
                    where: { isActive: true },
                    _count: { clientId: true },
                    orderBy: { _count: { clientId: 'desc' } },
                    take: 5
                })
            ]);

            // Processar tags (desagregar arrays)
            const tagCounts = new Map<string, number>();
            interactionsByTag.forEach(interaction => {
                interaction.tags.forEach(tag => {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                });
            });

            // Buscar nomes dos funcionários e clientes
            const employeeIds = topEmployees?.map(e => e.employeeId as string);
            const clientIds = topClients.map(c => c.clientId);

            const [employees, clients] = await Promise.all([
                tx.employee.findMany({
                    where: { id: { in: employeeIds } },
                    select: { id: true, fullName: true }
                }),
                tx.client.findMany({
                    where: { id: { in: clientIds } },
                    select: { id: true, fullName: true, companyName: true, tradeName: true, clientType: true }
                })
            ]);

            const statsData = {
                totalInteractions,
                interactionsByType: interactionsByType.map(item => ({
                    type: item.interactionType,
                    count: item._count.interactionType
                })),
                interactionsByStatus: interactionsByStatus.map(item => ({
                    status: item.status,
                    count: item._count.status
                })),
                interactionsByTag: Array.from(tagCounts.entries()).map(([tag, count]) => ({
                    tag,
                    count
                })),
                interactionsByPriority: interactionsByPriority.map(item => ({
                    priority: item.priority,
                    count: item._count.priority
                })),
                averageDuration: averageDuration._avg.duration || 0,
                totalCost: Number(totalCost._sum.cost) || 0,
                interactionsThisMonth,
                interactionsLastMonth,
                topEmployees: topEmployees.map(emp => {
                    const employee = employees.find(e => e.id === emp.employeeId);
                    return {
                        employeeId: emp.employeeId,
                        employeeName: employee?.fullName || 'N/A',
                        count: emp._count.employeeId
                    };
                }),
                topClients: topClients.map(client => {
                    const clientData = clients.find(c => c.id === client.clientId);
                    const clientName = clientData?.clientType === "INDIVIDUAL" 
                        ? clientData.fullName || 'N/A'
                        : clientData?.tradeName || clientData?.companyName || 'N/A';
                    return {
                        clientId: client.clientId,
                        clientName,
                        count: client._count.clientId
                    };
                })
            };

            return new InteractionStatsVM(statsData);
        });
    }
}
