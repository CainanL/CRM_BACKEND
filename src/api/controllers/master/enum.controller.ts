import { Controller, Get, Request, Param } from '@nestjs/common';
import { ApiTenant } from 'src/api/decorators/tenant.decorator';
import { GetActivityStatusEnumService } from 'src/application/internal-services/master/enum/activity-status/get-activity-status-enum.service';
import { GetActivityTypeEnumService } from 'src/application/internal-services/master/enum/activity-type/get-activity-type-enum.service';
import { GetAiResponseTypeEnumService } from 'src/application/internal-services/master/enum/ai-response-type/get-ai-response-type-enum.service';
import { GetAutomationTypeEnumService } from 'src/application/internal-services/master/enum/automation-type/get-automation-type-enum.service';
import { GetCalendarProviderEnumService } from 'src/application/internal-services/master/enum/calendar-provider/get-calendar-provider-enum.service';
import { GetCampaignCategoryEnumService } from 'src/application/internal-services/master/enum/campaign-category/get-campaign-category-enum.service';
import { GetCampaignStatusEnumService } from 'src/application/internal-services/master/enum/campaign-status/get-campaign-status-enum.service';
import { GetCampaignTypeEnumService } from 'src/application/internal-services/master/enum/campaign-type/get-campaign-type-enum.service';
import { GetClientStatusEnumService } from 'src/application/internal-services/master/enum/client-status/get-client-status-enum.service';
import { GetClientTypeEnumService } from 'src/application/internal-services/master/enum/client-type/get-client-type-enum.service';
import { GetCommunicationChannelEnumService } from 'src/application/internal-services/master/enum/communication-channel/get-communication-channel-enum.service';
import { GetContactTypeEnumService } from 'src/application/internal-services/master/enum/contact-type/get-contact-type-enum.service';
import { GetContentTypeEnumService } from 'src/application/internal-services/master/enum/content-type/get-content-type-enum.service';
import { GetContractTypeEnumService } from 'src/application/internal-services/master/enum/contract-type/get-contract-type-enum.service';
import { GetConversationStatusEnumService } from 'src/application/internal-services/master/enum/conversation-status/get-conversation-status-enum.service';
import { GetEmployeeStatusEnumService } from 'src/application/internal-services/master/enum/employee-status/get-employee-status-enum.service';
import { GetEntityTypeEnumService } from 'src/application/internal-services/master/enum/entity-type/get-entity-type-enum.service';
import { GetGenderEnumService } from 'src/application/internal-services/master/enum/gender/get-gender-enum.service';
import { GetInteractionStatusEnumService } from 'src/application/internal-services/master/enum/interaction-status/get-interaction-status-enum.service';
import { GetInteractionTagEnumService } from 'src/application/internal-services/master/enum/interaction-tag/get-interaction-tag-enum.service';
import { GetInteractionTypeEnumService } from 'src/application/internal-services/master/enum/interaction-type/get-interaction-type-enum.service';
import { GetLeadStatusEnumService } from 'src/application/internal-services/master/enum/lead-status/get-lead-status-enum.service';
import { GetMessageDirectionEnumService } from 'src/application/internal-services/master/enum/message-direction/get-message-direction-enum.service';
import { GetMessagePriorityEnumService } from 'src/application/internal-services/master/enum/message-priority/get-message-priority-enum.service';
import { GetMessageStatusEnumService } from 'src/application/internal-services/master/enum/message-status/get-message-status-enum.service';
import { GetNotificationTypeEnumService } from 'src/application/internal-services/master/enum/notification-type/get-notification-type-enum.service';
import { GetOpportunityCloseReasonEnumService } from 'src/application/internal-services/master/enum/opportunity-close-reason/get-opportunity-close-reason-enum.service';
import { GetOpportunityStatusEnumService } from 'src/application/internal-services/master/enum/opportunity-status/get-opportunity-status-enum.service';
import { GetPoliciesEnumService } from 'src/application/internal-services/master/enum/policies/get-policies-enum.service';
import { GetPriorityEnumService } from 'src/application/internal-services/master/enum/priority/get-priority-enum.service';
import { GetRecipientStatusEnumService } from 'src/application/internal-services/master/enum/recipient-status/get-recipient-status-enum.service';
import { GetRecipientTypeEnumService } from 'src/application/internal-services/master/enum/recipient-type/get-recipient-type-enum.service';
import { GetRulesEnumService } from 'src/application/internal-services/master/enum/rules/get-rules-enum.service';

@Controller('enums')
@ApiTenant()
export class EnumController {
  constructor(
    private readonly getActivityStatusEnumService: GetActivityStatusEnumService,
    private readonly getActivityTypeEnumService: GetActivityTypeEnumService,
    private readonly getAiResponseTypeEnumService: GetAiResponseTypeEnumService,
    private readonly getAutomationTypeEnumService: GetAutomationTypeEnumService,
    private readonly getCalendarProviderEnumService: GetCalendarProviderEnumService,
    private readonly getCampaignCategoryEnumService: GetCampaignCategoryEnumService,
    private readonly getCampaignStatusEnumService: GetCampaignStatusEnumService,
    private readonly getCampaignTypeEnumService: GetCampaignTypeEnumService,
    private readonly getClientStatusEnumService: GetClientStatusEnumService,
    private readonly getClientTypeEnumService: GetClientTypeEnumService,
    private readonly getCommunicationChannelEnumService: GetCommunicationChannelEnumService,
    private readonly getContactTypeEnumService: GetContactTypeEnumService,
    private readonly getContentTypeEnumService: GetContentTypeEnumService,
    private readonly getContractTypeEnumService: GetContractTypeEnumService,
    private readonly getConversationStatusEnumService: GetConversationStatusEnumService,
    private readonly getEmployeeStatusEnumService: GetEmployeeStatusEnumService,
    private readonly getEntityTypeEnumService: GetEntityTypeEnumService,
    private readonly getGenderEnumService: GetGenderEnumService,
    private readonly getInteractionStatusEnumService: GetInteractionStatusEnumService,
    private readonly getInteractionTagEnumService: GetInteractionTagEnumService,
    private readonly getInteractionTypeEnumService: GetInteractionTypeEnumService,
    private readonly getLeadStatusEnumService: GetLeadStatusEnumService,
    private readonly getMessageDirectionEnumService: GetMessageDirectionEnumService,
    private readonly getMessagePriorityEnumService: GetMessagePriorityEnumService,
    private readonly getMessageStatusEnumService: GetMessageStatusEnumService,
    private readonly getNotificationTypeEnumService: GetNotificationTypeEnumService,
    private readonly getOpportunityCloseReasonEnumService: GetOpportunityCloseReasonEnumService,
    private readonly getOpportunityStatusEnumService: GetOpportunityStatusEnumService,
    private readonly getPoliciesEnumService: GetPoliciesEnumService,
    private readonly getPriorityEnumService: GetPriorityEnumService,
    private readonly getRecipientStatusEnumService: GetRecipientStatusEnumService,
    private readonly getRecipientTypeEnumService: GetRecipientTypeEnumService,
    private readonly getRulesEnumService: GetRulesEnumService
  ) { }

  @Get('activity-status')
  async getActivityStatus(@Request() req) {
    return await this.getActivityStatusEnumService.execute(null, req);
  }

  @Get('activity-type')
  async getActivityType(@Request() req) {
    return await this.getActivityTypeEnumService.execute(null, req);
  }

  @Get('ai-response-type')
  async getAiResponseType(@Request() req) {
    return await this.getAiResponseTypeEnumService.execute(null, req);
  }

  @Get('automation-type')
  async getAutomationType(@Request() req) {
    return await this.getAutomationTypeEnumService.execute(null, req);
  }

  @Get('calendar-provider')
  async getCalendarProvider(@Request() req) {
    return await this.getCalendarProviderEnumService.execute(null, req);
  }

  @Get('campaign-category')
  async getCampaignCategory(@Request() req) {
    return await this.getCampaignCategoryEnumService.execute(null, req);
  }

  @Get('campaign-status')
  async getCampaignStatus(@Request() req) {
    return await this.getCampaignStatusEnumService.execute(null, req);
  }

  @Get('campaign-type')
  async getCampaignType(@Request() req) {
    return await this.getCampaignTypeEnumService.execute(null, req);
  }

  @Get('client-status')
  async getClientStatus(@Request() req) {
    return await this.getClientStatusEnumService.execute(null, req);
  }

  @Get('client-type')
  async getClientType(@Request() req) {
    return await this.getClientTypeEnumService.execute(null, req);
  }

  @Get('communication-channel')
  async getCommunicationChannel(@Request() req) {
    return await this.getCommunicationChannelEnumService.execute(null, req);
  }

  @Get('contact-type')
  async getContactType(@Request() req) {
    return await this.getContactTypeEnumService.execute(null, req);
  }

  @Get('content-type')
  async getContentType(@Request() req) {
    return await this.getContentTypeEnumService.execute(null, req);
  }

  @Get('contract-type')
  async getContractType(@Request() req) {
    return await this.getContractTypeEnumService.execute(null, req);
  }

  @Get('conversation-status')
  async getConversationStatus(@Request() req) {
    return await this.getConversationStatusEnumService.execute(null, req);
  }

  @Get('employee-status')
  async getEmployeeStatus(@Request() req) {
    return await this.getEmployeeStatusEnumService.execute(null, req);
  }

  @Get('entity-type')
  async getEntityType(@Request() req) {
    return await this.getEntityTypeEnumService.execute(null, req);
  }

  @Get('gender')
  async getGender(@Request() req) {
    return await this.getGenderEnumService.execute(null, req);
  }

  @Get('interaction-status')
  async getInteractionStatus(@Request() req) {
    return await this.getInteractionStatusEnumService.execute(null, req);
  }

  @Get('interaction-tag')
  async getInteractionTag(@Request() req) {
    return await this.getInteractionTagEnumService.execute(null, req);
  }

  @Get('interaction-type')
  async getInteractionType(@Request() req) {
    return await this.getInteractionTypeEnumService.execute(null, req);
  }

  @Get('lead-status')
  async getLeadStatus(@Request() req) {
    return await this.getLeadStatusEnumService.execute(null, req);
  }

  @Get('message-direction')
  async getMessageDirection(@Request() req) {
    return await this.getMessageDirectionEnumService.execute(null, req);
  }

  @Get('message-priority')
  async getMessagePriority(@Request() req) {
    return await this.getMessagePriorityEnumService.execute(null, req);
  }

  @Get('message-status')
  async getMessageStatus(@Request() req) {
    return await this.getMessageStatusEnumService.execute(null, req);
  }

  @Get('notification-type')
  async getNotificationType(@Request() req) {
    return await this.getNotificationTypeEnumService.execute(null, req);
  }

  @Get('opportunity-close-reason')
  async getOpportunityCloseReason(@Request() req) {
    return await this.getOpportunityCloseReasonEnumService.execute(null, req);
  }

  @Get('opportunity-status')
  async getOpportunityStatus(@Request() req) {
    return await this.getOpportunityStatusEnumService.execute(null, req);
  }

  @Get('policies')
  async getPolicies(@Request() req) {
    return await this.getPoliciesEnumService.execute(null, req);
  }

  @Get('priority')
  async getPriority(@Request() req) {
    return await this.getPriorityEnumService.execute(null, req);
  }

  @Get('recipient-status')
  async getRecipientStatus(@Request() req) {
    return await this.getRecipientStatusEnumService.execute(null, req);
  }

  @Get('recipient-type')
  async getRecipientType(@Request() req) {
    return await this.getRecipientTypeEnumService.execute(null, req);
  }

  @Get('rules')
  async getRules(@Request() req) {
    return await this.getRulesEnumService.execute(null, req);
  }
}