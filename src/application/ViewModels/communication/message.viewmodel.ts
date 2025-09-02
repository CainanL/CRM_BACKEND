import { MessageDirection } from 'src/repos/enums/message-direction.enum';
import { MessageStatus } from 'src/repos/enums/message-status.enum';
import { ContactType } from 'src/repos/enums/contact-type.enum';
import { EntityType } from 'src/repos/enums/entity-type.enum';
import { AiResponseType } from 'src/repos/enums/ai-response-type.enum';
import { Prisma } from '.prisma/tenant-client';

type MessageWithRelations = Prisma.MessageGetPayload<{
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
}>;

export class MessageVM {
  id: string;
  content: string;
  contentType: string;
  channelId: string;
  channel: {
    id: string;
    name: string;
    channelType: string;
  };
  conversationId: string;
  conversation: {
    id: string;
    title: string;
  };
  direction: string;
  status: string;
  senderContact: string;
  senderContactType: string;
  recipientContact: string;
  recipientContactType: string;
  employeeId?: string;
  employee?: {
    id: string;
    fullName: string;
    email: string;
  };
  entityId?: string;
  entityType?: string;
  externalId?: string;
  attachments?: any // Array<{
  //   name: string;
  //   url: string;
  //   type: string;
  //   size?: number;
  // }>;
  metadata?: any //Record<string, any>;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  aiProcessed: boolean;
  aiResponseType?: string;
  aiConfidence?: number;
  aiAnalysis?: any //Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(message: MessageWithRelations) {
    this.id = message.id;
    this.content = message.content;
    this.contentType = message.contentType;
    this.channelId = message.channelId; 
    this.channel = message.channel;
    this.conversationId = message.conversationId;
    this.conversation = message.conversation;
    this.direction = message.direction;
    this.status = message.status;
    this.senderContact = message.senderContact;
    this.senderContactType = message.senderContactType;
    this.recipientContact = message.recipientContact;
    this.recipientContactType = message.recipientContactType;
    this.employeeId = message.employeeId!;
    this.employee = message?.employee!;
    this.entityId = message.entityId!;
    this.entityType = message.entityType!;
    this.externalId = message.externalId!;
    this.attachments = message.attachments!;
    this.metadata = message.metadata!;
    this.sentAt = message.sentAt!;
    this.deliveredAt = message.deliveredAt!;
    this.readAt = message.readAt!;
    this.aiProcessed = message.aiProcessed;
    this.aiResponseType = message.aiResponseType!;
    this.aiConfidence = message.aiConfidence!.toNumber();
    this.aiAnalysis = message.aiAnalysis!;
    this.isActive = message.isActive;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}
