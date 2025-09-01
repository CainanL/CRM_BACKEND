import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/master/user.controller";
import { ApplicationModule } from "src/application/application.module";
import { SolutionController } from "./controllers/client/solutions/solution.controller";
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
  ]
})
export class ApiModule { }