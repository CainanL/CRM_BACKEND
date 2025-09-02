import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetConversationsRequest } from "./get-conversations.request";
import { ConversationVM } from "src/application/ViewModels/communication/conversation.viewmodel";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";

@Injectable()
export class GetConversationsService extends HandlerBase<GetConversationsRequest, PaginatedResponse<ConversationVM>> {
    protected async executeCore(request: GetConversationsRequest, data?: any): Promise< PaginatedResponse<ConversationVM>> {
        return await this.transaction< PaginatedResponse<ConversationVM>>(async (tx) => {
            
            
            const where: any = {
                isActive: true
            };

            if (request.textSearch) {
                where.OR = [
                    { title: { contains: request.textSearch, mode: 'insensitive' } },
                    { description: { contains: request.textSearch, mode: 'insensitive' } }
                ];
            }

            if (request.status) {
                where.status = request.status;
            }

            if (request.channelType) {
                where.channel = { channelType: request.channelType };
            }

            if (request.channelId) {
                where.channelId = request.channelId;
            }

            if (request.assignedEmployeeId) {
                where.assignedEmployeeId = request.assignedEmployeeId;
            }

            if (request.entityType) {
                where.entityType = request.entityType;
            }

            if (request.entityId) {
                where.entityId = request.entityId;
            }

            if (request.tags && request.tags.length > 0) {
                where.tags = { hasSome: request.tags };
            }

            if (request.priority) {
                where.priority = request.priority;
            }

            if (request.startDate || request.endDate) {
                where.createdAt = {};
                if (request.startDate) {
                    where.createdAt.gte = new Date(request.startDate);
                }
                if (request.endDate) {
                    where.createdAt.lte = new Date(request.endDate);
                }
            }

            const [conversations, total] = await Promise.all([
                tx.conversation.findMany({
                    where,
                    include: {
                        channel: {
                            select: {
                                id: true,
                                name: true,
                                channelType: true
                            }
                        },
                        assignedEmployee: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true
                            }
                        },
                        _count: {
                            select: {
                                messages: true
                            }
                        }
                    },                    
                    skip: request.skip,
                    take: request.take
                }),
                tx.conversation.count({ where })
            ]);

            const conversationsWithStats = conversations.map(conversation => {
                const conversationVM = new ConversationVM(conversation);
                conversationVM.messageCount = conversation._count.messages;
                return conversationVM;
            });

            return new PaginatedResponse<ConversationVM>(conversationsWithStats, request.page, request.size, total);
        });
    }
}
