import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetMessagesRequest } from "./get-messages.request";
import { MessageVM } from "src/application/ViewModels/communication/message.viewmodel";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";

@Injectable()
export class GetMessagesService extends HandlerBase<GetMessagesRequest, PaginatedResponse<MessageVM>> {
    protected async executeCore(request: GetMessagesRequest, data?: any): Promise<PaginatedResponse<MessageVM>> {
        return await this.transaction<PaginatedResponse<MessageVM>>(async (tx) => {
                        
            const where: any = {
                isActive: true
            };

            if (request.textSearch) {
                where.content = { contains: request.textSearch, mode: 'insensitive' };
            }

            if (request.conversationId) {
                where.conversationId = request.conversationId;
            }

            if (request.channelId) {
                where.channelId = request.channelId;
            }

            if (request.channelType) {
                where.channel = { channelType: request.channelType };
            }

            if (request.direction) {
                where.direction = request.direction;
            }

            if (request.status) {
                where.status = request.status;
            }

            if (request.employeeId) {
                where.employeeId = request.employeeId;
            }

            if (request.entityId) {
                where.entityId = request.entityId;
            }

            if (request.entityType) {
                where.entityType = request.entityType;
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

            const [messages, total] = await Promise.all([
                tx.message.findMany({
                    where,
                    include: {
                        channel: {
                            select: {
                                id: true,
                                name: true,
                                channelType: true
                            }
                        },
                        conversation: {
                            select: {
                                id: true,
                                title: true
                            }
                        },
                        employee: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true
                            }
                        }
                    },
                    skip: request.skip,
                    take: request.take
                }),
                tx.message.count({ where })
            ]);

            return new PaginatedResponse<MessageVM>(messages.map(message => new MessageVM(message)), request.page, request.size, total);
        });
    }
}
