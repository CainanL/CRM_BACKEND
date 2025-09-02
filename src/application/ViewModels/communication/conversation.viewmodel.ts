import { Prisma } from '.prisma/tenant-client';

type ConversationWithValues = Prisma.ConversationGetPayload<{
  include: {
    channel: {
      select: {
        id: true,
        name: true,
        channelType: true
      }
    };
    assignedEmployee: {
      select: {
        id: true,
        fullName: true,
        email: true
      }
    };
  };
}>;

export class ConversationVM {
  id: string;
  title: string;
  description?: string;
  channelId: string;
  channel: {
    id: string;
    name: string;
    channelType: string;
  };
  status: string;
  entityId?: string;
  entityType?: string;
  assignedEmployeeId?: string;
  assignedEmployee?: {
    id: string;
    fullName: string;
    email: string;
  };
  priority: string;
  tags: string[];
  metadata?: any;

  // Campos calculados
  messageCount?: number;
  lastMessageAt?: Date;
  unreadCount?: number;

  constructor(conversation: ConversationWithValues) {
    this.id = conversation.id;
    this.title = conversation.title;
    this.description = conversation.description!;
    this.channelId = conversation.channelId;
    this.channel = conversation.channel;
    this.status = conversation.status!;
    this.entityId = conversation.entityId!;
    this.entityType = conversation.entityType!!;
    this.assignedEmployeeId = conversation.assignedEmployeeId!;
    this.assignedEmployee = conversation.assignedEmployee!;
    this.priority = conversation.priority!;
    this.tags = conversation.tags!;
    this.metadata = conversation.metadata!;
  }
}
