import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { SendMessageRequest } from "./send-message.request";
import { MessageVM } from "src/application/ViewModels/communication/message.viewmodel";
import { MessageDirection } from "src/repos/enums/message-direction.enum";
import { MessageStatus } from "src/repos/enums/message-status.enum";
import { MessagePriority } from "src/repos/enums/message-priority.enum";

@Injectable()
export class SendMessageService extends HandlerBase<SendMessageRequest, MessageVM> {
    protected async executeCore(request: SendMessageRequest, data?: any): Promise<MessageVM> {
        return await this.transaction<MessageVM>(async (tx) => {
            // Buscar canal ativo do tipo especificado
            const channel = await tx.communicationChannel.findFirst({
                where: {
                    channelType: request.channelType,
                    isActive: true
                }
            });

            if (!channel) {
                throw new Error(`No active channel found for type: ${request.channelType}`);
            }

            // Buscar ou criar conversa
            let conversation;
            if (request.conversationId) {
                conversation = await tx.conversation.findUnique({
                    where: { id: request.conversationId }
                });
                if (!conversation) {
                    throw new Error('Conversation not found');
                }
            } else {
                // Criar nova conversa automaticamente
                conversation = await tx.conversation.create({
                    data: {
                        title: `Conversation via ${request.channelType}`,
                        channelId: channel.id,
                        entityId: request.entityId,
                        entityType: request.entityType,
                        status: MessageStatus.SENT,
                        priority: MessagePriority.MEDIUM,
                        tags: []
                    }
                });
            }

            // Criar mensagem
            const message = await tx.message.create({
                data: {
                    content: request.content,
                    contentType: request.contentType ?? 'TEXT',
                    channelId: channel.id,
                    conversationId: conversation.id,
                    direction: MessageDirection.OUTBOUND,
                    status: MessageStatus.PENDING,
                    senderContact: request.senderContact ?? 'system',
                    senderContactType: request.senderContactType ?? 'EMAIL',
                    recipientContact: request.recipientContact,
                    recipientContactType: request.recipientContactType,
                    entityId: request.entityId,
                    entityType: request.entityType,
                    attachments: request.attachments,
                    metadata: request.metadata,
                },
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
                }
            });

            // TODO: Implementar envio real via provedor (WhatsApp API, SMTP, etc.)
            // Por enquanto, marcar como enviada
            await tx.message.update({
                where: { id: message.id },
                data: {
                    status: MessageStatus.SENT,
                    sentAt: new Date()
                }
            });

            // Atualizar conversa
            await tx.conversation.update({
                where: { id: conversation.id },
                data: {
                    updatedAt: new Date()
                }
            });

            // TODO: Registrar interação automaticamente
            // TODO: Enviar notificações em tempo real
            // TODO: Processar com IA se habilitado

            return new MessageVM(message);
        });
    }
}
