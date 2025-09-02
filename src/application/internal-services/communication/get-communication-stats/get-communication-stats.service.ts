import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetCommunicationStatsRequest } from "./get-communication-stats.request";
import { CommunicationStatsVM } from "src/application/ViewModels/communication/communication-stats.viewmodel";
import { ConversationStatus } from "src/repos/enums/conversation-status.enum";

@Injectable()
export class GetCommunicationStatsService extends HandlerBase<GetCommunicationStatsRequest, CommunicationStatsVM> {
    protected async executeCore(request: GetCommunicationStatsRequest, data?: any): Promise<CommunicationStatsVM> {
        return await this.transaction<CommunicationStatsVM>(async (tx) => {
            const where: any = {};
            
            if (request.startDate || request.endDate) {
                where.createdAt = {};
                if (request.startDate) {
                    where.createdAt.gte = new Date(request.startDate);
                }
                if (request.endDate) {
                    where.createdAt.lte = new Date(request.endDate);
                }
            }

            // Estatísticas básicas
            const [
                totalMessages,
                totalConversations,
                activeConversations,
                closedConversations,
                messagesByChannel,
                messagesByDirection,
                messagesByStatus,
                conversationsByStatus
            ] = await Promise.all([
                tx.message.count({ where }),
                tx.conversation.count({ where }),
                tx.conversation.count({ 
                    where: { 
                        ...where, 
                        status: { not: ConversationStatus.CLOSED } 
                    } 
                }),
                tx.conversation.count({ 
                    where: { 
                        ...where, 
                        status: ConversationStatus.CLOSED
                    } 
                }),
                tx.message.groupBy({
                    by: ['channelId'],
                    where,
                    _count: { id: true },
                    //_avg: { aiConfidence: true }
                }),
                tx.message.groupBy({
                    by: ['direction'],
                    where,
                    _count: { id: true }
                }),
                tx.message.groupBy({
                    by: ['status'],
                    where,
                    _count: { id: true }
                }),
                tx.conversation.groupBy({
                    by: ['status'],
                    where,
                    _count: { id: true }
                })
            ]);

            // Buscar canais para mapear IDs
            const channels = await tx.communicationChannel.findMany({
                select: { id: true, channelType: true, name: true }
            });
            const channelMap = new Map(channels.map(c => [c.id, c]));

            // Processar estatísticas por canal
            const messagesByChannelStats = messagesByChannel.map(item => {
                const channel = channelMap.get(item.channelId);
                return {
                    channelType: channel?.channelType || 'UNKNOWN',
                    count: item._count.id,
                    percentage: totalMessages > 0 ? (item._count.id / totalMessages) * 100 : 0
                };
            });

            // Processar estatísticas por direção
            const messagesByDirectionStats = messagesByDirection.map(item => ({
                direction: item.direction,
                count: item._count.id,
                percentage: totalMessages > 0 ? (item._count.id / totalMessages) * 100 : 0
            }));

            // Processar estatísticas por status de mensagem
            const messagesByStatusStats = messagesByStatus.map(item => ({
                status: item.status,
                count: item._count.id,
                percentage: totalMessages > 0 ? (item._count.id / totalMessages) * 100 : 0
            }));

            // Processar estatísticas por status de conversa
            const conversationsByStatusStats = conversationsByStatus.map(item => ({
                status: item.status,
                count: item._count.id,
                percentage: totalConversations > 0 ? (item._count.id / totalConversations) * 100 : 0
            }));

            // Top funcionários
            const topEmployees = await tx.message.groupBy({
                by: ['employeeId'],
                where: {
                    ...where,
                    employeeId: { not: null }
                },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
                take: 10
            });

            const employees = await tx.employee.findMany({
                where: {
                    id: { in: topEmployees.map(e => e.employeeId).filter(x => x !== null) }
                },
                select: { id: true, fullName: true, email: true }
            });
            const employeeMap = new Map(employees.map(e => [e.id, e]));

            const topEmployeesStats = topEmployees.map(item => {
                const employee = employeeMap.get(item.employeeId!);
                return {
                    employeeId: item.employeeId,
                    employeeName: employee?.fullName || 'Unknown',
                    messageCount: item._count.id,
                    conversationCount: 0 // TODO: Calcular conversas por funcionário
                };
            });

            // Estatísticas diárias (últimos 30 dias)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const dailyStats = await tx.message.groupBy({
                by: ['createdAt'],
                where: {
                    ...where,
                    createdAt: { gte: thirtyDaysAgo }
                },
                _count: { id: true },
                orderBy: { createdAt: 'asc' }
            });

            const dailyStatsFormatted = dailyStats.map(item => ({
                date: item.createdAt.toISOString().split('T')[0],
                messages: item._count.id,
                conversations: 0 // TODO: Calcular conversas por dia
            }));

            return new CommunicationStatsVM({
                totalMessages,
                totalConversations,
                activeConversations,
                closedConversations,
                messagesByChannel: messagesByChannelStats,
                messagesByDirection: messagesByDirectionStats,
                messagesByStatus: messagesByStatusStats,
                conversationsByStatus: conversationsByStatusStats,
                averageResponseTime: 0, // TODO: Calcular tempo médio de resposta
                averageResolutionTime: 0, // TODO: Calcular tempo médio de resolução
                topEmployees: topEmployeesStats.map(x => ({
                    employeeId: x.employeeId!,
                    employeeName: x.employeeName,
                    messageCount: x.messageCount,
                    conversationCount: x.conversationCount
                })),
                dailyStats: dailyStatsFormatted
            });
                
                       
        });
    }
}
