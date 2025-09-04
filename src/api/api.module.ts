import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/master/user.controller";
import { ApplicationModule } from "src/application/application.module";
import { InfraModule } from "src/infra/infra.module";
import { TenantController } from "./controllers/master/tenant.controller";
import { EmailController } from "./controllers/master/email.controller";
import { EmployeeController } from "./controllers/client/employee.controller";
import { ClientController } from "./controllers/client/client.controller";
import { ClientInteractionController } from "./controllers/client-interaction/client-interaction.controller";
import { PipelineGroupController } from "./controllers/pipeline/pipeline-group.controller";
import { PipelineController } from "./controllers/pipeline/pipeline.controller";
import { PipelineStageController } from "./controllers/pipeline/pipeline-stage.controller";
import { OpportunityController } from "./controllers/pipeline/opportunity.controller";
import { NotificationController } from "./controllers/schedule/notification.controller";
import { CalendarIntegrationController } from "./controllers/schedule/calendar-integration.controller";
import { ActivityReportController } from "./controllers/schedule/activity-report.controller";
import { ActivityController } from "./controllers/schedule/activity.controller";
import { CommunicationChannelController } from "./controllers/communication/communication-channel.controller";
import { ConversationController } from "./controllers/communication/conversation.controller";
import { MessageController } from "./controllers/communication/message.controller";
import { CommunicationStatsController } from "./controllers/communication/communication-stats.controller";
import { SolutionController } from "./controllers/solutions/solution.controller";
import { MarketingCampaignController } from "./controllers/automation/marketing-campaign.controller";
import { CampaignTemplateController } from "./controllers/automation/campaign-template.controller";
import { MigrationController } from "./controllers/master/migration.controller";

@Module({
    imports: [
        ApplicationModule,
        InfraModule
    ],
    exports: [],
    providers: [],
      controllers: [
    UsersController,
    SolutionController,
    TenantController,
    EmailController,
    EmployeeController,
    ClientController,
    ClientInteractionController,
    PipelineGroupController,
    PipelineController,
    PipelineStageController,
    OpportunityController,
    ActivityController,
    NotificationController,
    CalendarIntegrationController,
    ActivityReportController,
    CommunicationChannelController,
    ConversationController,
    MessageController,
    CommunicationStatsController,
    MarketingCampaignController,
    CampaignTemplateController,
    MigrationController,
  ]
})
export class ApiModule { }