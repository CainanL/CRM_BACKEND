import { Module } from "@nestjs/common";
import { CreateCommunicationChannelService } from "./create-communication-channel/create-communication-channel.service";
import { UpdateCommunicationChannelService } from "./update-communication-channel/update-communication-channel.service";
import { GetCommunicationChannelsService } from "./get-communication-channels/get-communication-channels.service";
import { GetCommunicationChannelByIdService } from "./get-communication-channel-by-id/get-communication-channel-by-id.service";
import { DeleteCommunicationChannelService } from "./delete-communication-channel/delete-communication-channel.service";
import { CreateConversationService } from "./create-conversation/create-conversation.service";
import { UpdateConversationService } from "./update-conversation/update-conversation.service";
import { GetConversationsService } from "./get-conversations/get-conversations.service";
import { GetConversationByIdService } from "./get-conversation-by-id/get-conversation-by-id.service";
import { SendMessageService } from "./send-message/send-message.service";
import { CreateMessageService } from "./create-message/create-message.service";
import { GetMessagesService } from "./get-messages/get-messages.service";
import { GetMessageByIdService } from "./get-message-by-id/get-message-by-id.service";
import { UpdateMessageService } from "./update-message/update-message.service";
import { GetCommunicationStatsService } from "./get-communication-stats/get-communication-stats.service";
import { DeleteConversationService } from "./delete-conversation/delete-conversation.service";
import { DeleteMessageService } from "./delete-message/delete-message.service";

@Module({
  providers: [
    // Communication Channel Services
    CreateCommunicationChannelService,
    UpdateCommunicationChannelService,
    GetCommunicationChannelsService,
    GetCommunicationChannelByIdService,
    DeleteCommunicationChannelService,
    
    // Conversation Services
    CreateConversationService,
    UpdateConversationService,
    GetConversationsService,
    GetConversationByIdService,
    
    // Message Services
    SendMessageService,
    CreateMessageService,
    GetMessagesService,
    GetMessageByIdService,
    UpdateMessageService,
    
    // Stats Services
    GetCommunicationStatsService,
    
    // Delete Services
    DeleteConversationService,
    DeleteMessageService
  ],
  exports: [
    // Communication Channel Services
    CreateCommunicationChannelService,
    UpdateCommunicationChannelService,
    GetCommunicationChannelsService,
    GetCommunicationChannelByIdService,
    DeleteCommunicationChannelService,
    
    // Conversation Services
    CreateConversationService,
    UpdateConversationService,
    GetConversationsService,
    GetConversationByIdService,
    
    // Message Services
    SendMessageService,
    CreateMessageService,
    GetMessagesService,
    GetMessageByIdService,
    UpdateMessageService,
    
    // Stats Services
    GetCommunicationStatsService,
    
    // Delete Services
    DeleteConversationService,
    DeleteMessageService
  ]
})
export class CommunicationModule {}
