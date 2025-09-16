import { Module } from "@nestjs/common";
import { GetEnumsService } from "./get-enums.service";
import { GetActivityStatusEnumService } from "./activity-status/get-activity-status-enum.service";
import { GetActivityTypeEnumService } from "./activity-type/get-activity-type-enum.service";
import { GetAiResponseTypeEnumService } from "./ai-response-type/get-ai-response-type-enum.service";
import { GetAutomationTypeEnumService } from "./automation-type/get-automation-type-enum.service";
import { GetCalendarProviderEnumService } from "./calendar-provider/get-calendar-provider-enum.service";
import { GetCampaignCategoryEnumService } from "./campaign-category/get-campaign-category-enum.service";
import { GetCampaignStatusEnumService } from "./campaign-status/get-campaign-status-enum.service";
import { GetCampaignTypeEnumService } from "./campaign-type/get-campaign-type-enum.service";
import { GetClientStatusEnumService } from "./client-status/get-client-status-enum.service";
import { GetClientTypeEnumService } from "./client-type/get-client-type-enum.service";
import { GetCommunicationChannelEnumService } from "./communication-channel/get-communication-channel-enum.service";
import { GetContactTypeEnumService } from "./contact-type/get-contact-type-enum.service";
import { GetContentTypeEnumService } from "./content-type/get-content-type-enum.service";
import { GetContractTypeEnumService } from "./contract-type/get-contract-type-enum.service";
import { GetConversationStatusEnumService } from "./conversation-status/get-conversation-status-enum.service";
import { GetEmployeeStatusEnumService } from "./employee-status/get-employee-status-enum.service";
import { GetEntityTypeEnumService } from "./entity-type/get-entity-type-enum.service";
import { GetGenderEnumService } from "./gender/get-gender-enum.service";
import { GetInteractionStatusEnumService } from "./interaction-status/get-interaction-status-enum.service";
import { GetInteractionTagEnumService } from "./interaction-tag/get-interaction-tag-enum.service";
import { GetInteractionTypeEnumService } from "./interaction-type/get-interaction-type-enum.service";
import { GetLeadStatusEnumService } from "./lead-status/get-lead-status-enum.service";
import { GetMessageDirectionEnumService } from "./message-direction/get-message-direction-enum.service";
import { GetMessagePriorityEnumService } from "./message-priority/get-message-priority-enum.service";
import { GetMessageStatusEnumService } from "./message-status/get-message-status-enum.service";
import { GetNotificationTypeEnumService } from "./notification-type/get-notification-type-enum.service";
import { GetOpportunityCloseReasonEnumService } from "./opportunity-close-reason/get-opportunity-close-reason-enum.service";
import { GetOpportunityStatusEnumService } from "./opportunity-status/get-opportunity-status-enum.service";
import { GetPoliciesEnumService } from "./policies/get-policies-enum.service";
import { GetPriorityEnumService } from "./priority/get-priority-enum.service";
import { GetRecipientStatusEnumService } from "./recipient-status/get-recipient-status-enum.service";
import { GetRecipientTypeEnumService } from "./recipient-type/get-recipient-type-enum.service";
import { GetRulesEnumService } from "./rules/get-rules-enum.service";

@Module({
    providers: [
        GetEnumsService,
        GetActivityStatusEnumService,
        GetActivityTypeEnumService,
        GetAiResponseTypeEnumService,
        GetAutomationTypeEnumService,
        GetCalendarProviderEnumService,
        GetCampaignCategoryEnumService,
        GetCampaignStatusEnumService,
        GetCampaignTypeEnumService,
        GetClientStatusEnumService,
        GetClientTypeEnumService,
        GetCommunicationChannelEnumService,
        GetContactTypeEnumService,
        GetContentTypeEnumService,
        GetContractTypeEnumService,
        GetConversationStatusEnumService,
        GetEmployeeStatusEnumService,
        GetEntityTypeEnumService,
        GetGenderEnumService,
        GetInteractionStatusEnumService,
        GetInteractionTagEnumService,
        GetInteractionTypeEnumService,
        GetLeadStatusEnumService,
        GetMessageDirectionEnumService,
        GetMessagePriorityEnumService,
        GetMessageStatusEnumService,
        GetNotificationTypeEnumService,
        GetOpportunityCloseReasonEnumService,
        GetOpportunityStatusEnumService,
        GetPoliciesEnumService,
        GetPriorityEnumService,
        GetRecipientStatusEnumService,
        GetRecipientTypeEnumService,
        GetRulesEnumService
    ],
    exports: [
        GetEnumsService,
        GetActivityStatusEnumService,
        GetActivityTypeEnumService,
        GetAiResponseTypeEnumService,
        GetAutomationTypeEnumService,
        GetCalendarProviderEnumService,
        GetCampaignCategoryEnumService,
        GetCampaignStatusEnumService,
        GetCampaignTypeEnumService,
        GetClientStatusEnumService,
        GetClientTypeEnumService,
        GetCommunicationChannelEnumService,
        GetContactTypeEnumService,
        GetContentTypeEnumService,
        GetContractTypeEnumService,
        GetConversationStatusEnumService,
        GetEmployeeStatusEnumService,
        GetEntityTypeEnumService,
        GetGenderEnumService,
        GetInteractionStatusEnumService,
        GetInteractionTagEnumService,
        GetInteractionTypeEnumService,
        GetLeadStatusEnumService,
        GetMessageDirectionEnumService,
        GetMessagePriorityEnumService,
        GetMessageStatusEnumService,
        GetNotificationTypeEnumService,
        GetOpportunityCloseReasonEnumService,
        GetOpportunityStatusEnumService,
        GetPoliciesEnumService,
        GetPriorityEnumService,
        GetRecipientStatusEnumService,
        GetRecipientTypeEnumService,
        GetRulesEnumService
    ]
})
export class EnumModule { }
