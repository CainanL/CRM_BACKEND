import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/master/user.controller";
import { ApplicationModule } from "src/application/application.module";
import { SolutionController } from "./controllers/client/solutions/solution.controller";
import { InfraModule } from "src/infra/infra.module";

@Module({
    imports: [ApplicationModule, InfraModule],
    exports: [],
    providers: [],
    controllers: [UsersController, SolutionController]
})
export class ApiModule { }