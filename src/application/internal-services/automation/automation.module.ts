import { Module } from "@nestjs/common";
import { CommunicationModule } from "../communication/communication.module";
import { ClientModule } from "../client/client.module";
import { SolutionModule } from "../solution/solution.module";
import { EmailModule } from "../email/email.module";
import { CreateMarketingCampaignService } from "./create-marketing-campaign/create-marketing-campaign.service";
import { ExecuteCampaignService } from "./execute-campaign/execute-campaign.service";
import { GetCampaignStatsService } from "./get-campaign-stats/get-campaign-stats.service";
import { QueryCampaignsService } from "./query-campaigns/query-campaigns.service";
import { CreateCampaignTemplateService } from "./create-campaign-template/create-campaign-template.service";
import { CampaignCommunicationIntegrationService } from "./campaign-communication-integration/campaign-communication-integration.service";
import { GetCampaignByIdService } from "./get-campaign-by-id/get-campaign-by-id.service";
import { UpdateCampaignService } from "./update-campaign/update-campaign.service";
import { DeleteCampaignService } from "./delete-campaign/delete-campaign.service";
import { PauseCampaignService } from "./pause-campaign/pause-campaign.service";
import { ResumeCampaignService } from "./resume-campaign/resume-campaign.service";
import { QueryTemplatesService } from "./query-templates/query-templates.service";
import { GetTemplateByIdService } from "./get-template-by-id/get-template-by-id.service";
import { UpdateTemplateService } from "./update-template/update-template.service";
import { DeleteTemplateService } from "./delete-template/delete-template.service";

@Module({
  imports: [
    CommunicationModule,
    ClientModule,
    SolutionModule,
    EmailModule
  ],
  providers: [
    CreateMarketingCampaignService,
    ExecuteCampaignService,
    GetCampaignStatsService,
    QueryCampaignsService,
    CreateCampaignTemplateService,
    CampaignCommunicationIntegrationService,
    GetCampaignByIdService,
    UpdateCampaignService,
    DeleteCampaignService,
    PauseCampaignService,
    ResumeCampaignService,
    QueryTemplatesService,
    GetTemplateByIdService,
    UpdateTemplateService,
    DeleteTemplateService
  ],
  exports: [
    CreateMarketingCampaignService,
    ExecuteCampaignService,
    GetCampaignStatsService,
    QueryCampaignsService,
    CreateCampaignTemplateService,
    CampaignCommunicationIntegrationService,
    GetCampaignByIdService,
    UpdateCampaignService,
    DeleteCampaignService,
    PauseCampaignService,
    ResumeCampaignService,
    QueryTemplatesService,
    GetTemplateByIdService,
    UpdateTemplateService,
    DeleteTemplateService
  ]
})
export class AutomationModule {}
