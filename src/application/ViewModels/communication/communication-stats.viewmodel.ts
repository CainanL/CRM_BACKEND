
export class CommunicationStatsVM {
  totalMessages: number;
  totalConversations: number;
  activeConversations: number;
  closedConversations: number;

  messagesByChannel: Array<{
    channelType: string;
    count: number;
    percentage: number;
  }>;

  messagesByDirection: Array<{
    direction: string;
    count: number;
    percentage: number;
  }>;

  messagesByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;

  conversationsByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;

  averageResponseTime: number; // em minutos
  averageResolutionTime: number; // em horas

  topEmployees: Array<{
    employeeId: string;
    employeeName: string;
    messageCount: number;
    conversationCount: number;
  }>;

  dailyStats: Array<{
    date: string;
    messages: number;
    conversations: number;
  }>;

  constructor(init: Partial<CommunicationStatsVM>) {
    this.totalMessages = init?.totalMessages ?? 0;
    this.totalConversations = init?.totalConversations ?? 0;
    this.activeConversations = init?.activeConversations ?? 0;
    this.closedConversations = init?.closedConversations ?? 0;

    this.messagesByChannel = init?.messagesByChannel ?? [];
    this.messagesByDirection = init?.messagesByDirection ?? [];
    this.messagesByStatus = init?.messagesByStatus ?? [];
    this.conversationsByStatus = init?.conversationsByStatus ?? [];

    this.averageResponseTime = init?.averageResponseTime ?? 0;
    this.averageResolutionTime = init?.averageResolutionTime ?? 0;

    this.topEmployees = init?.topEmployees ?? [];
    this.dailyStats = init?.dailyStats ?? [];
  }
}
